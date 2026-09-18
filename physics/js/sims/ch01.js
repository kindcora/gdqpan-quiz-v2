window.VLDC_SIMS = window.VLDC_SIMS || {};
window.VLDC_SIMS.ch01 = {
  mount: function (els) {
    const S = window.SimCore;
    const THREE = S.THREE;
    const handles = [];

    const c2 = S.createCanvas2D(els.box2d);
    let qOut = 2;
    let cageOn = 1;
    S.sliderRow(els.ctrl2d, "q ngoài (nC)", -3, 3, 0.1, qOut, function (v) { qOut = v; });
    S.sliderRow(els.ctrl2d, "màn điện (0 tắt / 1 bật)", 0, 1, 1, cageOn, function (v) { cageOn = v; });
    S.legend(els.meta2d, [
      { color: "#ff453a", label: "q > 0" },
      { color: "#0a84ff", label: "q < 0" },
      { color: "#30d158", label: "E⃗" },
      { color: "#ffd60a", label: "vỏ dẫn (lồng)" }
    ]);
    S.readBox(els.meta2d, "<strong>Đọc hình:</strong> Mặt cắt qua tâm một vỏ cầu dẫn nối đất, khoang rỗng không chứa điện tích: E=0 trong khoang. Trường ngoài tính bằng phương pháp điện tích ảnh cho cầu nối đất. Mũi tên chỉ hướng, không biểu diễn độ lớn theo SI.");

    function Exy(x, y, w, h) {
      const cx = w * 0.38;
      const cy = h * 0.5;
      const qx = w * 0.78;
      const qy = h * 0.5;
      const R = w * 0.20;
      const k = 900;
      const dx = x - qx;
      const dy = y - qy;
      const r = Math.max(2, Math.hypot(dx, dy));
      let ex = k * qOut * dx / (r * r * r);
      let ey = k * qOut * dy / (r * r * r);
      if (cageOn > 0.5) {
        const dxc = x - cx;
        const dyc = y - cy;
        const rc = Math.hypot(dxc, dyc);
        if (rc <= R) {
          ex = 0;
          ey = 0;
        } else {
          const sourceDistance = qx - cx;
          const imageCharge = -qOut * R / sourceDistance;
          const imageX = cx + R * R / sourceDistance;
          const idx = x - imageX, idy = y - cy;
          const ir = Math.max(2, Math.hypot(idx, idy));
          ex += k * imageCharge * idx / (ir * ir * ir);
          ey += k * imageCharge * idy / (ir * ir * ir);
        }
      }
      return { x: ex, y: ey };
    }

    function draw2d() {
      const ctx = c2.ctx;
      const w = c2.getW();
      const h = c2.getH();
      S.clear(ctx, w, h);
      const cx = w * 0.38;
      const cy = h * 0.5;
      const qx = w * 0.78;
      const qy = h * 0.5;
      const R = w * 0.20;

      ctx.strokeStyle = "rgba(48, 209, 88, 0.7)";
      ctx.lineWidth = 1.3;
      for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 8; j++) {
          const x = (w * i) / 10;
          const y = (h * j) / 8;
          const e = Exy(x, y, w, h);
          const m = Math.hypot(e.x, e.y) + 1e-9;
          const L = 13;
          S.drawArrow2D(ctx, x, y, x + e.x / m * L, y + e.y / m * L, "#30d158");
        }
      }

      if (cageOn > 0.5) {
        ctx.strokeStyle = "#ffd60a";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 6.28);
        ctx.stroke();
        ctx.fillStyle = "#f4f4f5";
        ctx.font = "12px Segoe UI, sans-serif";
        ctx.fillText("lòng E≈0", cx - 28, cy + 4);
        ctx.fillStyle = "#ffd60a";
        ctx.fillText("vỏ dẫn", cx - 18, cy - R - 8);
      }

      ctx.fillStyle = qOut >= 0 ? "#ff453a" : "#0a84ff";
      ctx.beginPath();
      ctx.arc(qx, qy, 9, 0, 6.28);
      ctx.fill();
      ctx.fillStyle = "#f4f4f5";
      ctx.font = "13px Segoe UI, sans-serif";
      ctx.fillText(qOut >= 0 ? "q+" : "q−", qx + 12, qy - 8);
    }

    const animation2D = S.animate2D(draw2d);
    handles.push({ dispose: function () { animation2D.dispose(); c2.dispose(); } });

    const s3 = S.createScene3D(els.box3d, { distance: 8, grid: true });
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 32, 24),
      new THREE.MeshStandardMaterial({
        color: 0xffd60a,
        metalness: 0.4,
        roughness: 0.35,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide
      })
    );
    s3.scene.add(shell);
    const charge = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xff453a, emissive: 0x661111 })
    );
    charge.position.set(3.2, 0.4, 0);
    s3.scene.add(charge);

    const arrows = [];
    function addArrow(pos, dir, col) {
      const a = S.makeArrow(col, 0.7);
      s3.scene.add(a);
      arrows.push({ a: a, pos: pos, dir: dir });
    }
    for (let i = 0; i < 10; i++) {
      const th = (i / 10) * Math.PI * 2;
      const p = new THREE.Vector3(2.3 * Math.cos(th), 0.2, 2.3 * Math.sin(th));
      addArrow(p, p.clone().normalize(), 0x30d158);
    }
    const inner = S.makeArrow(0xff453a, 0.35);
    s3.scene.add(inner);

    let q3 = 1.4;
    S.sliderRow(els.ctrl3d, "q ngoài (nC)", 0.4, 3, 0.1, q3, function (v) { q3 = v; });
    S.legend(els.meta3d, [
      { color: "#30d158", label: "E⃗ ngoài vỏ" },
      { color: "#ffd60a", label: "vỏ dẫn rỗng" },
      { color: "#ff453a", label: "E⃗ trong (≈0)" }
    ]);
    S.readBox(els.meta3d, "<strong>Đọc hình:</strong> Vỏ cầu nối đất, khoang không chứa điện tích. Trong khoang E=0 do thành đẳng thế và tính duy nhất của nghiệm điện thế; riêng điều kiện tổng điện tích bao trong bằng 0 chưa đủ. Trường ngoài dùng phương pháp điện tích ảnh, độ dài mũi tên được giới hạn để dễ xem.");

    s3.setOnFrame(function () {
      const distance = charge.position.length();
      const imagePosition = charge.position.clone().multiplyScalar(1.6 * 1.6 / (distance * distance));
      const imageQ = -q3 * 1.6 / distance;
      arrows.forEach(function (it) {
        const direct = it.pos.clone().sub(charge.position);
        const induced = it.pos.clone().sub(imagePosition);
        direct.multiplyScalar(q3 / Math.pow(direct.length(), 3));
        induced.multiplyScalar(imageQ / Math.pow(induced.length(), 3));
        S.updateArrow(it.a, it.pos, direct.add(induced), 0.9, 1.35);
      });
      inner.visible = false;
      charge.scale.setScalar(0.7 + q3 * 0.25);
    });
    handles.push(s3);
    const m=(id,label,value,unit)=>({id,label,value,unit});
    S.observe({sample:function(){const a=window.LabModels.electric(qOut,cageOn);return [m('q','Điện tích ngoài (2D)',a.q,'C'),m('E','|E| tại tâm khoang (2D)',a.E,'V/m'),m('q3','Điện tích ngoài (3D)',q3*1e-9,'C')];},explain:function(){return 'q đổi thì E bên ngoài đổi tỉ lệ với q. '+(cageOn?'Vỏ dẫn nối đất che chắn: E tại tâm khoang bằng 0.':'Tắt vỏ: |E| tại tâm = k|q|/d² với d = 3,2 m.')+' Bán kính cầu 1,6 m; hình và độ dài mũi tên minh họa, không phải thước đo.';},reset:function(){}});
    return handles;
  }
};
