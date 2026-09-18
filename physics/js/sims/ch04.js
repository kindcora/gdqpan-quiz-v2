window.VLDC_SIMS = window.VLDC_SIMS || {};
window.VLDC_SIMS.ch04 = {
  mount: function (els) {
    const S = window.SimCore;
    const THREE = S.THREE;
    const handles = [];

    const c2 = S.createCanvas2D(els.box2d);
    let drive = 1;
    let t = 0;
    S.sliderRow(els.ctrl2d, "ω / ω₀ (cưỡng bức)", 0.4, 1.8, 0.02, drive, function (v) { drive = v; t = 0; });
    S.legend(els.meta2d, [
      { color: "#30d158", label: "u_C" },
      { color: "#0a84ff", label: "i" },
      { color: "#ffd60a", label: "cộng hưởng ω=ω₀" }
    ]);
    S.readBox(els.meta2d, "<strong>Đọc hình:</strong> RLC nối tiếp ở trạng thái cưỡng bức ổn định; L = 1 H, C = 1 F, U₀ = 1 V, R = 0,4 Ω. $I_0=U_0/\\sqrt{R^2+(\\omega L-1/(\\omega C))^2}$, $U_{C0}=I_0/(\\omega C)$. Dòng cực đại tại ω/ω₀=1; cực đại điện áp tụ có thể lệch cộng hưởng dòng. i sớm pha π/2 so với u_C.");

    function draw2d(dt) {
      t += dt;
      const ctx = c2.ctx;
      const w = c2.getW();
      const h = c2.getH();
      S.clear(ctx, w, h);
      const w0 = 1;
      const amp = 1 / Math.hypot(0.4, drive - 1 / drive);
      const capacitorAmp = amp / drive;
      const ptsU = [];
      const ptsI = [];
      for (let i = 0; i <= 80; i++) {
        const ti = Math.max(0,t-6) + i / 12;
        ptsU.push([ti, capacitorAmp * Math.cos(drive * w0 * ti)]);
        ptsI.push([ti, -amp * Math.sin(drive * w0 * ti)]);
      }
      S.drawPlot(ctx, w, h * 0.72, 28, "t (s)", "V; A", [
        { name: "uC", color: "#30d158", pts: ptsU },
        { name: "i", color: "#0a84ff", pts: ptsI }
      ], Math.max(0,t-6), Math.max(0,t-6)+6.6, -3.2, 3.2);

      ctx.fillStyle = Math.abs(drive - 1) < 0.04 ? "#ffd60a" : "#f4f4f5";
      ctx.font = "13px Segoe UI, sans-serif";
      ctx.fillText(Math.abs(drive - 1) < 0.04 ? "CỘNG HƯỞNG  ω = ω₀" : "lệch cộng hưởng  |ω−ω₀| > 0", 16, h - 18);
      ctx.fillStyle = "#8e8e93";
      ctx.font = "11px Segoe UI, sans-serif";
      ctx.fillText("T₀ = 2π√(LC)   f₀ = 1/(2π√(LC))", 16, h - 4);
    }
    const animation2D = S.animate2D(draw2d);
    handles.push({ dispose: function () { animation2D.dispose(); c2.dispose(); } });

    const s3 = S.createScene3D(els.box3d, { distance: 10 });
    const eArr = [];
    const bArr = [];
    for (let i = 0; i < 12; i++) {
      const ea = S.makeArrow(0x30d158, 1);
      const ba = S.makeArrow(0x0a84ff, 1);
      s3.scene.add(ea, ba);
      eArr.push(ea);
      bArr.push(ba);
    }
    let k = 1.1;
    S.sliderRow(els.ctrl3d, "k (rad/m)", 0.5, 2, 0.05, k, function (v) { k = v; });
    S.legend(els.meta3d, [
      { color: "#30d158", label: "E⃗" },
      { color: "#0a84ff", label: "B⃗" },
      { color: "#ffd60a", label: "phương truyền" }
    ]);
    S.readBox(els.meta3d, "<strong>Đọc hình:</strong> Sóng phẳng: E và B cùng pha, vuông góc nhau và phương truyền. Mũi tên dùng thang riêng cho E và B; trong SI $E/B=c$. Trong SI ω=ck. Hình được làm chậm: 1 s minh họa tương ứng 3,2/c s thực; trục tọa độ tính m.");

    const prop = S.makeArrow(0xffd60a, 3.2);
    s3.scene.add(prop);
    let t3 = 0;
    s3.setOnFrame(function (dt) {
      t3 += dt;
      S.updateArrow(prop, new THREE.Vector3(-3.2, 0, 0), new THREE.Vector3(1, 0, 0), 3, 3.4);
      for (let i = 0; i < 12; i++) {
        const x = -2.8 + i * 0.5;
        const phase = k * (x - 3.2 * t3);
        const Ey = 0.9 * Math.cos(phase);
        const Bz = 0.9 * Math.cos(phase);
        S.updateArrow(eArr[i], new THREE.Vector3(x, 0, 0), new THREE.Vector3(0, Ey, 0), 1, 1.3);
        S.updateArrow(bArr[i], new THREE.Vector3(x, 0, 0), new THREE.Vector3(0, 0, Bz), 1, 1.3);
      }
    });
    handles.push(s3);
    const m=(id,label,value,unit)=>({id,label,value,unit});
    S.observe({sample:function(){const a=window.LabModels.rlc(drive,t),b=window.LabModels.wave(k,t3);return [m('u','Điện áp tụ uC',a.u,'V'),m('i','Dòng RLC',a.i,'A'),m('I0','Biên độ dòng',a.I0,'A'),m('E','E sóng tại x = 0',b.E,'V/m'),m('B','B sóng tại x = 0',b.B,'T'),m('waveTime','Thời gian thực của sóng',b.physicalTime,'s')];},explain:function(){return 'L = 1 H, C = 1 F, R = 0,4 Ω, U nguồn cực đại = 1 V. '+(Math.abs(drive-1)<.001?'Đang cộng hưởng dòng: I₀ = 2,5 A.':'Đổi ω làm trở kháng và biên độ dòng thay đổi.')+' Sóng 3D có E/B = c; được làm chậm c/3,2 lần để quan sát, hai mũi tên dùng thang riêng.';},reset:function(){t=0;t3=0;}});
    return handles;
  }
};
