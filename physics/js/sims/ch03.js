window.VLDC_SIMS = window.VLDC_SIMS || {};
window.VLDC_SIMS.ch03 = {
  mount: function (els) {
    const S = window.SimCore;
    const THREE = S.THREE;
    const handles = [];

    const c2 = S.createCanvas2D(els.box2d);
    let magX = 0.22;
    let vMag = 0.04;
    S.sliderRow(els.ctrl2d, "v nam châm (m/s)", -0.12, 0.12, 0.005, vMag, function (v) { vMag = v; });
    S.legend(els.meta2d, [
      { color: "#ff453a", label: "N" },
      { color: "#0a84ff", label: "S" },
      { color: "#ffd60a", label: "vòng / I cảm ứng" },
      { color: "#30d158", label: "Φ(t)" }
    ]);
    S.readBox(els.meta2d, "<strong>Đọc hình:</strong> Mô hình trường trục hiệu dụng: Φ = 0,002[1+(d/0,15)²]⁻³ᐟ² Wb; d tính m, điện trở vòng 10 Ω. Cực N tiến tới vòng thì mặt vòng gần nam châm là N; khi rút ra thì là S. Bỏ tự cảm và quá độ. Nam châm dừng ở biên; đảo vận tốc hoặc đặt lại để tiếp tục. Mũi tên minh họa hướng.");

    function draw2d(dt) {
      const ctx = c2.ctx;
      const w = c2.getW();
      const h = c2.getH();
      S.clear(ctx, w, h);
      magX = Math.max(.08,Math.min(.44,magX+vMag*dt));
      const loopX=w*.62,loopY=h*.42,mx=w*magX,my=loopY;
      const vEffective=(magX>=.44&&vMag>0)||(magX<=.08&&vMag<0)?0:vMag;
      const model=window.LabModels.induction(magX,vEffective),Phi=model.phi;
      const Isgn=model.emf< -1e-12?1:model.emf>1e-12?-1:0;

      ctx.strokeStyle = "#ffd60a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(loopX, loopY, 16, 48, 0, 0, 6.28);
      ctx.stroke();
      ctx.fillStyle = "#f4f4f5";
      ctx.font = "12px Segoe UI, sans-serif";
      ctx.fillText("vòng kín", loopX - 24, loopY - 36);

      ctx.fillStyle = "#0a84ff";
      ctx.fillRect(mx - 18, my - 10, 18, 20);
      ctx.fillStyle = "#ff453a";
      ctx.fillRect(mx, my - 10, 18, 20);
      ctx.fillStyle = "#f4f4f5";
      ctx.fillText("S", mx - 14, my + 5);
      ctx.fillText("N", mx + 5, my + 5);
      S.drawArrow2D(ctx, mx, my - 22, mx + vEffective * 400, my - 22, "#30d158", "v");

      if (Isgn) {
        ctx.strokeStyle = Isgn > 0 ? "#30d158" : "#ff453a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(loopX, loopY, 12, 36, 0, 0.2, 4.5);
        ctx.stroke();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.font = "12px Segoe UI, sans-serif";
        ctx.fillText(Isgn > 0 ? "Mặt gần: N (đẩy)" : "Mặt gần: S (hút)", loopX - 48, loopY + 68);
      } else {
        ctx.fillStyle = "#8e8e93";
        ctx.fillText("I = 0  (Φ không đổi)", loopX - 50, loopY + 48);
      }

      const gx0 = 16;
      const gy0 = h - 28;
      ctx.fillStyle = "#8e8e93";
      ctx.fillText("Φ", gx0, gy0 - 52);
      ctx.fillStyle = "#3a3a3c";
      ctx.fillRect(gx0, gy0 - 48, 120, 10);
      ctx.fillStyle = "#30d158";
      ctx.fillRect(gx0, gy0 - 48, Math.min(118, Phi / .002 * 118), 10);
      ctx.fillStyle = "#f4f4f5";
      ctx.font = "11px Segoe UI, sans-serif";
      ctx.fillText("ℰ ∝ −dΦ/dt", gx0, gy0 - 8);
    }
    const animation2D = S.animate2D(draw2d);
    handles.push({ dispose: function () { animation2D.dispose(); c2.dispose(); } });

    const s3 = S.createScene3D(els.box3d, { distance: 8 });
    const Bfield = S.makeArrow(0x0a84ff, 2.4);
    s3.scene.add(Bfield);
    S.updateArrow(Bfield, new THREE.Vector3(0, 0, -2.2), new THREE.Vector3(0, 0, 1), 2, 2.4);

    const loop = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.05, 8, 48),
      new THREE.MeshStandardMaterial({ color: 0xffd60a })
    );
    s3.scene.add(loop);
    const nArr = S.makeArrow(0x30d158, 1.2);
    s3.scene.add(nArr);

    let omega = 1.1;
    let th = 0;
    S.sliderRow(els.ctrl3d, "ω khung (rad/s)", 0.2, 2.5, 0.05, omega, function (v) { omega = v; });
    S.legend(els.meta3d, [
      { color: "#0a84ff", label: "B⃗ phần cảm" },
      { color: "#ffd60a", label: "khung (phần ứng)" },
      { color: "#30d158", label: "pháp tuyến n̂" }
    ]);
    S.readBox(els.meta3d, "<strong>Đọc hình:</strong> Từ thông mỗi vòng $\\Phi=BA\\cos\\omega t$; móc vòng $\\Psi=N\\Phi$. Máy phát: $\\mathcal{E}=-d\\Psi/dt=NBA\\omega\\sin\\omega t$. Đèn quay tay cùng nguyên lý.");

    s3.setOnFrame(function (dt) {
      th += omega * dt;
      loop.rotation.y = th;
      const n = new THREE.Vector3(Math.sin(th), 0, Math.cos(th));
      S.updateArrow(nArr, new THREE.Vector3(0, 0, 0), n, 1.1, 1.4);
    });
    handles.push(s3);
    const m=(id,label,value,unit)=>({id,label,value,unit});
    S.observe({sample:function(){const v=(magX>=.44&&vMag>0)||(magX<=.08&&vMag<0)?0:vMag,a=window.LabModels.induction(magX,v),g=window.LabModels.generator(th,omega);return [m('x','Vị trí nam châm',magX,'m'),m('phi','Φ qua vòng (2D)',a.phi,'Wb'),m('emf','Suất điện động (2D)',a.emf,'V'),m('I','Dòng qua R = 10 Ω',a.current,'A'),m('generator','Suất điện động máy phát',g.emf,'V')];},explain:function(){const stopped=(magX>=.44&&vMag>0)||(magX<=.08&&vMag<0)||vMag===0;return (stopped?'Nam châm đang dừng: Φ không đổi và suất điện động 2D bằng 0. ':'')+'Vận tốc dương đưa nam châm lại gần vòng, Φ tăng và e = −dΦ/dt âm theo pháp tuyến đã chọn. Đảo v làm đảo e. Máy phát 3D: N = 100, B = 0,2 T, S = 0,01 m²; tăng ω làm biên độ e = NBSω tăng. Khung 3D được vẽ phóng đại; dùng S đã ghi để tính. Biên mô hình 2D: x từ 0,08 đến 0,44 m.';},reset:function(){magX=.22;th=0;}});
    return handles;
  }
};
