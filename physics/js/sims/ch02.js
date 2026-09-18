window.VLDC_SIMS = window.VLDC_SIMS || {};
window.VLDC_SIMS.ch02 = {
  mount: function (els) {
    const S = window.SimCore;
    const THREE = S.THREE;
    const handles = [];

    const c2 = S.createCanvas2D(els.box2d);
    let I = 2;
    S.sliderRow(els.ctrl2d, "I (A), + ra giấy", -4, 4, 0.1, I, function (v) { I = v; });
    S.legend(els.meta2d, [
      { color: "#f4f4f5", label: "dây ⊙/⊗" },
      { color: "#0a84ff", label: "B⃗" },
      { color: "#ffd60a", label: "H⃗ ∥ B⃗" }
    ]);
    S.readBox(els.meta2d, "<strong>Đọc hình:</strong> $B=\\mu\\mu_0 I/(2\\pi a)$, $H=I/(2\\pi a)$ (A/m). Nắm tay phải: ngón cái theo $I$, bốn ngón là $\\vec{B}$. Lực Lorentz: bàn tay trái.");

    function draw2d() {
      const ctx = c2.ctx;
      const w = c2.getW();
      const h = c2.getH();
      S.clear(ctx, w, h);
      const cx = w * 0.42;
      const cy = h * 0.52;
      const dir = I > 0 ? -1 : 1; // Canvas y grows downward: outward current is counterclockwise.
      ctx.strokeStyle = "#0a84ff";
      ctx.lineWidth = 2;
      for (let r = 22; r <= 130; r += 22) {
        if (I === 0) break;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 6.28);
        ctx.stroke();
        const ang = dir > 0 ? 0.35 : Math.PI + 0.35;
        const x = cx + r * Math.cos(ang);
        const y = cy + r * Math.sin(ang);
        const tx = -Math.sin(ang) * dir;
        const ty = Math.cos(ang) * dir;
        S.drawArrow2D(ctx, x - 6 * tx, y - 6 * ty, x + 14 * tx, y + 14 * ty, "#0a84ff", r === 66 ? "B" : "");
      }
      ctx.fillStyle = "#f4f4f5";
      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, 6.28);
      ctx.fill();
      ctx.fillStyle = "#141416";
      ctx.font = "15px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(I === 0 ? "0" : I > 0 ? "⊙" : "⊗", cx, cy + 5);
      ctx.textAlign = "start";
      ctx.fillStyle = "#f4f4f5";
      ctx.font = "12px Segoe UI, sans-serif";
      const a = 0.08;
      const B = 2e-7 * Math.abs(I) / a;
      const Hv = Math.abs(I) / (2 * Math.PI * a);
      ctx.fillText("a = 8 cm  (mẫu)", 12, 20);
      ctx.fillStyle = "#30d158";
      ctx.fillText("B ≈ " + B.toExponential(2) + " T", 12, 38);
      ctx.fillStyle = "#ffd60a";
      ctx.fillText("H ≈ " + Hv.toFixed(1) + " A/m", 12, 56);
    }
    const animation2D = S.animate2D(draw2d);
    handles.push({ dispose: function () { animation2D.dispose(); c2.dispose(); } });

    const s3 = S.createScene3D(els.box3d, { distance: 9 });
    const Barrow = S.makeArrow(0x0a84ff, 2.6);
    s3.scene.add(Barrow);
    S.updateArrow(Barrow, new THREE.Vector3(0, -1.2, 0), new THREE.Vector3(0, 2.4, 0), 1, 2.6);

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 14, 14),
      new THREE.MeshStandardMaterial({ color: 0x30d158 })
    );
    s3.scene.add(ball);
    const trailGeom = new THREE.BufferGeometry();
    const trailN = 180;
    const trailPos = new Float32Array(trailN * 3);
    trailGeom.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
    const trail = new THREE.Line(trailGeom, new THREE.LineBasicMaterial({ color: 0x30d158 }));
    s3.scene.add(trail);

    const arrV = S.makeArrow(0xffd60a, 0.8);
    const arrF = S.makeArrow(0xff453a, 0.8);
    s3.scene.add(arrV, arrF);

    let Bmag = 1.2;
    let vpar = 0.55;
    let t = 0;
    S.sliderRow(els.ctrl3d, "B (T)", 0.4, 2.2, 0.05, Bmag, function (v) { Bmag = v; });
    S.sliderRow(els.ctrl3d, "v∥ (m/s)", 0, 1.4, 0.05, vpar, function (v) { vpar = v; });
    S.legend(els.meta3d, [
      { color: "#0a84ff", label: "B⃗" },
      { color: "#ffd60a", label: "v⃗" },
      { color: "#ff453a", label: "F_L⃗ ⊥ v" },
      { color: "#30d158", label: "quỹ đạo" }
    ]);
    S.readBox(els.meta3d, "<strong>Đọc hình:</strong> $|v|$ không đổi. $v_\\perp$ quay, $v_\\parallel$ tạo bước helix $h=v_\\parallel T$, $T=2\\pi m/(|q|B)$.");

    const hist = [];
    s3.setOnFrame(function (dt) {
      t += dt;
      const R = 1.15 / Math.max(Bmag, 0.3);
      const om = 1.6 * Bmag;
      const x = R * Math.cos(om * t);
      const z = R * Math.sin(om * t);
      const y = ((vpar * t) % 4) - 2;
      ball.position.set(x, y, z);
      if(dt>0)hist.push(x, y, z);
      if (hist.length > trailN * 3) hist.splice(0, 3);
      trailPos.fill(0);
      for (let i = 0; i < hist.length; i++) trailPos[i] = hist[i];
      trailGeom.attributes.position.needsUpdate = true;
      const vx = -R * om * Math.sin(om * t);
      const vz = R * om * Math.cos(om * t);
      const v = new THREE.Vector3(vx, vpar, vz);
      const Bv = new THREE.Vector3(0, 1, 0);
      const F = new THREE.Vector3().crossVectors(v, Bv);
      S.updateArrow(arrV, ball.position, v, 0.25, 1.3);
      S.updateArrow(arrF, ball.position, F, 0.35, 1.1);
      S.updateArrow(Barrow, new THREE.Vector3(0, -1.2, 0), new THREE.Vector3(0, 2.4, 0), 1, 2.6);
    });
    handles.push(s3);
    const m=(id,label,value,unit)=>({id,label,value,unit});
    S.observe({sample:function(){const a=window.LabModels.magnetic(I,Bmag,vpar);return [m('Bwire','|B| cách dây 0,08 m',a.Bwire,'T'),m('H','|H| cách dây 0,08 m',a.H,'A/m'),m('B','B trên quỹ đạo',Bmag,'T'),m('R','Bán kính xoắn ốc',a.radius,'m'),m('T','Chu kỳ quay',a.period,'s'),m('F','Độ lớn lực Lorentz',a.force,'N')];},explain:function(){return 'Tăng |I| làm B và H quanh dây tăng. Đổi dấu I làm đảo chiều B. Tăng B trên quỹ đạo làm R và T giảm; v song song tăng làm bước xoắn tăng. Hạt dương lý tưởng: q = 1,6 × 10⁻⁶ C, m = 10⁻⁶ kg, v vuông góc = 1,84 m/s. Trục 3D tính m; hình nối lại khi ra khỏi vùng xem.';},reset:function(){t=0;hist.length=0;}});
    return handles;
  }
};
