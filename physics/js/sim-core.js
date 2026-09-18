(function (global) {
  const THREE = global.THREE;
  if (!THREE) {
    console.error("Three.js chưa tải.");
    return;
  }

  function addOrbit(camera, dom, target) {
    target = target || new THREE.Vector3(0, 0, 0);
    const sph = { theta: 0.7, phi: 1.15, r: 8 };
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function apply() {
      camera.position.set(
        target.x + sph.r * Math.sin(sph.phi) * Math.cos(sph.theta),
        target.y + sph.r * Math.cos(sph.phi),
        target.z + sph.r * Math.sin(sph.phi) * Math.sin(sph.theta)
      );
      camera.lookAt(target);
    }
    apply();

    function onDown(e) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onMove(e) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      sph.theta -= dx * 0.01;
      sph.phi -= dy * 0.01;
      sph.phi = Math.max(0.15, Math.min(Math.PI - 0.15, sph.phi));
      apply();
    }
    function onUp() { dragging = false; }
    function onWheel(e) {
      e.preventDefault();
      sph.r *= e.deltaY > 0 ? 1.08 : 0.92;
      sph.r = Math.max(3, Math.min(20, sph.r));
      apply();
    }
    dom.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    dom.addEventListener("wheel", onWheel, { passive: false });
    return {
      apply: apply,
      sph: sph,
      dispose: function () {
        dom.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        dom.removeEventListener("wheel", onWheel);
      }
    };
  }

  function createScene3D(container, options) {
    options = options || {};
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(options.bg || 0x141416);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true }); }
    catch (_) {
      const notice=document.createElement('p');notice.setAttribute('role','status');notice.textContent='Thiết bị không bật được 3D (WebGL). Mô hình 2D, số liệu và biểu đồ vẫn sử dụng được.';container.appendChild(notice);
      renderer={domElement:document.createElement('canvas'),setPixelRatio(){},setSize(){},render(){},dispose(){}};
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x2c2c2e, 1.05);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.55);
    dir.position.set(4, 8, 3);
    scene.add(dir);

    if (options.grid !== false) {
      const grid = new THREE.GridHelper(8, 8, 0x3a3a3c, 0x2c2c2e);
      scene.add(grid);
    }
    if (options.axes !== false) {
      scene.add(new THREE.AxesHelper(options.axisLen || 2.2));
    }

    const orbit = addOrbit(camera, renderer.domElement, options.target);
    if (options.distance) {
      orbit.sph.r = options.distance;
      orbit.apply();
    }

    function resize() {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight || 340);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let raf = 0;
    let onFrame = function () {};
    function frame(dt) { onFrame(dt); renderer.render(scene,camera); }
    function loop() {
      raf = requestAnimationFrame(loop);
      frame(0.016);
    }
    const session=global.LabSession?.active;
    const unsubscribe=session?session.subscribe(frame):null;
    if(!session)loop();

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      orbit: orbit,
      setOnFrame: function (fn) { onFrame = fn || function () {}; },
      resize: resize,
      dispose: function () {
        cancelAnimationFrame(raf);
        if(unsubscribe)unsubscribe();
        ro.disconnect();
        orbit.dispose();
        scene.traverse(function(object){if(object.geometry)object.geometry.dispose();if(object.material)(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>m.dispose());});
        renderer.dispose();
        if(renderer.forceContextLoss)renderer.forceContextLoss();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }

  function makeArrow(color, len) {
    return new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      len || 1,
      color,
      0.18,
      0.1
    );
  }

  function updateArrow(helper, origin, vec, scale, maxLen) {
    scale = scale == null ? 1 : scale;
    maxLen = maxLen == null ? 2.8 : maxLen;
    const v = vec.clone();
    const mag = v.length();
    if (mag < 1e-5) {
      helper.visible = false;
      return;
    }
    helper.visible = true;
    helper.position.copy(origin);
    helper.setDirection(v.multiplyScalar(1 / mag));
    const L = Math.min(maxLen, Math.max(0.25, mag * scale));
    helper.setLength(L, Math.min(0.22, L * 0.22), Math.min(0.14, L * 0.14));
  }

  function createCanvas2D(container) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let w = 1;
    let h = 1;
    function resize() {
      w = Math.max(1, container.clientWidth);
      h = Math.max(1, container.clientHeight || 340);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return {
      canvas: canvas,
      ctx: ctx,
      getW: function () { return w; },
      getH: function () { return h; },
      resize: resize,
      dispose: function () {
        ro.disconnect();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  }

  function clear(ctx, w, h, color) {
    ctx.fillStyle = color || "#141416";
    ctx.fillRect(0, 0, w, h);
  }

  function drawArrow2D(ctx, x0, y0, x1, y1, color, label) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    if (len < 4) return;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    const ang = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - 9 * Math.cos(ang - 0.4), y1 - 9 * Math.sin(ang - 0.4));
    ctx.lineTo(x1 - 9 * Math.cos(ang + 0.4), y1 - 9 * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
    if (label) {
      ctx.font = "12px Segoe UI, sans-serif";
      ctx.fillText(label, x1 + 6, y1 - 4);
    }
  }

  function drawPlot(ctx, w, h, pad, xLabel, yLabel, series, xMin, xMax, yMin, yMax) {
    ctx.strokeStyle = "#8e8e93";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - 12, h - pad);
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(pad, 12);
    ctx.stroke();
    ctx.fillStyle = "#8e8e93";
    ctx.font = "11px Segoe UI, sans-serif";
    ctx.fillText(xLabel, w - 36, h - pad + 14);
    ctx.fillText(yLabel, 8, 14);
    function X(x) { return pad + (x - xMin) / (xMax - xMin) * (w - pad - 16); }
    function Y(y) { return h - pad - (y - yMin) / (yMax - yMin) * (h - pad - 20); }
    series.forEach(function (s) {
      if (!s.pts.length) return;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      s.pts.forEach(function (p, i) {
        const xx = X(p[0]);
        const yy = Y(p[1]);
        if (i === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      });
      ctx.stroke();
      ctx.fillStyle = s.color;
      ctx.fillText(s.name, w - 70, 18 + series.indexOf(s) * 14);
    });
  }

  function sliderRow(parent, label, min, max, step, value, onChange) {
    const wrap = document.createElement("label");
    const top = document.createElement("span");
    const input = document.createElement("input");
    input.type = "range";
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    input.value = String(value);
    input.dataset.initial=String(value);
    function paint() {
      top.textContent = label + ": " + Number(input.value).toFixed((String(step).split('.')[1] || '').length);
    }
    paint();
    input.addEventListener("input", function () {
      paint();
      onChange(Number(input.value));
      if(global.LabSession?.active)global.LabSession.active.changed(label);
    });
    wrap.appendChild(top);
    wrap.appendChild(input);
    parent.appendChild(wrap);
    if(global.LabSession?.active)global.LabSession.active.registerSlider(input);
    return input;
  }

  function legend(parent, items) {
    const el = document.createElement("div");
    el.className = "legend";
    items.forEach(function (it) {
      const span = document.createElement("span");
      span.innerHTML = '<i class="swatch" style="background:' + it.color + '"></i>' + it.label;
      el.appendChild(span);
    });
    parent.appendChild(el);
  }

  function readBox(parent, html) {
    const el = document.createElement("div");
    el.className = "read";
    el.innerHTML = html;
    parent.appendChild(el);
  }

  global.SimCore = {
    animate2D: function(fn){const session=global.LabSession?.active;if(session)return {dispose:session.subscribe(fn)};let raf=0;function loop(){raf=requestAnimationFrame(loop);fn(.016);}loop();return {dispose(){cancelAnimationFrame(raf);}};},
    observe: function(config){if(global.LabSession?.active)global.LabSession.active.observe(config);},
    THREE: THREE,
    createScene3D: createScene3D,
    createCanvas2D: createCanvas2D,
    makeArrow: makeArrow,
    updateArrow: updateArrow,
    clear: clear,
    drawArrow2D: drawArrow2D,
    drawPlot: drawPlot,
    sliderRow: sliderRow,
    legend: legend,
    readBox: readBox
  };
})(window);
