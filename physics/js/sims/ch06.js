window.VLDC_SIMS = window.VLDC_SIMS || {};
window.VLDC_SIMS.ch06 = {
  mount: function (els) {
    const S = window.SimCore;
    const THREE = S.THREE;
    const handles = [];

    const c2 = S.createCanvas2D(els.box2d);
    let fTHz = 800;
    const Aev = 2.28;
    const heV = 4.135667696e-3; // eV/THz
    const f0 = Aev / heV;
    S.sliderRow(els.ctrl2d, "f (THz)", 300, 1200, 10, fTHz, function (v) { fTHz = v; });
    S.legend(els.meta2d, [
      { color: "#30d158", label: "K_max (eV)" },
      { color: "#ff453a", label: "ngưỡng f₀" },
      { color: "#ffd60a", label: "hf = A + K" }
    ]);
    S.readBox(els.meta2d, "<strong>Đọc hình:</strong> $K_{\\max}=hf-A$ khi $hf\\ge A$. Dưới ngưỡng không có quang electron, nên không gán động năng cho electron chưa được phát ra. $f_0=A/h\\approx551{,}30$ THz.");

    function draw2d() {
      const ctx = c2.ctx;
      const w = c2.getW();
      const h = c2.getH();
      S.clear(ctx, w, h);
      const narrow = w < 520;
      const plotW = narrow ? w : w * 0.72;
      const plotH = narrow ? h - 85 : h - 8;
      const infoX = narrow ? 12 : w * 0.72 + 8;
      const infoY = narrow ? h - 61 : 36;
      const pts = [[f0, 0]];
      for (let f = 560; f <= 1200; f += 20) {
        const K = heV * f - Aev;
        pts.push([f, K]);
      }
      S.drawPlot(ctx, plotW, plotH, 32, "f", "K", [
        { name: "Kmax", color: "#30d158", pts: pts }
      ], 280, 1220, -0.2, 3.2);

      const x0 = 32 + (f0 - 280) / (1220 - 280) * (plotW - 48);
      ctx.strokeStyle = "#ff453a";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x0, 20);
      ctx.lineTo(x0, plotH - 32);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#ff453a";
      ctx.font = "12px Segoe UI, sans-serif";
      ctx.fillText("f₀", x0 + 4, 32);

      const Know = Math.max(0, heV * fTHz - Aev);
      ctx.fillStyle = "#f4f4f5";
      ctx.fillText("f = " + fTHz + " THz", infoX, infoY);
      ctx.fillStyle = "#ffd60a";
      ctx.fillText("A = 2,28 eV (công thoát)", infoX, infoY + 16);
      ctx.fillStyle = "#30d158";
      ctx.fillText(fTHz < f0 ? "Không có quang electron" : "Kmax = " + Know.toFixed(2) + " eV", infoX, infoY + 32);
      ctx.fillStyle = "#8e8e93";
      ctx.font = "11px Segoe UI, sans-serif";
      ctx.fillText(fTHz < f0 ? "dưới ngưỡng — không electron" : "có quang điện", infoX, infoY + 48);
    }
    const animation2D = S.animate2D(draw2d);
    handles.push({ dispose: function () { animation2D.dispose(); c2.dispose(); } });

    const s3 = S.createScene3D(els.box3d, { distance: 8 });
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.08, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x8e8e93, metalness: 0.6 })
    );
    plate.position.y = -0.4;
    s3.scene.add(plate);
    const electrons = [];
    for (let i = 0; i < 14; i++) {
      const e = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x0a84ff, emissive: 0x003355 })
      );
      s3.scene.add(e);
      electrons.push({ m: e, ph: Math.random() * 6.28, r: 0.3 + Math.random() * 0.5 });
    }
    let Tstar = 4800;
    S.sliderRow(els.ctrl3d, "T sao (K) · Wien", 3000, 8000, 50, Tstar, function (v) { Tstar = v; });
    S.legend(els.meta3d, [
      { color: "#8e8e93", label: "kim loại (A công thoát)" },
      { color: "#0a84ff", label: "quang electron" },
      { color: "#ffd60a", label: "λ_max Wien" }
    ]);
    S.readBox(els.meta3d, "<strong>Đọc hình:</strong> Electron bật ra theo tần số ánh sáng ở thanh f phía trên; nhiệt độ T bên dưới chỉ dùng tính cực đại phổ Wien $\\lambda_{\\max}=b/T$, không quyết định ngưỡng quang điện của chùm đơn sắc. Hình chuyển động minh họa, không theo tỷ lệ SI.");

    const wienLive = document.createElement("p");
    wienLive.style.color = "#ffd60a";
    wienLive.style.margin = "6px 0 0";
    wienLive.style.fontSize = "13px";
    els.meta3d.appendChild(wienLive);

    let t3 = 0;
    s3.setOnFrame(function (dt) {
      t3 += dt;
      const lnm = Math.round(2.9e-3 / Tstar * 1e9);
      wienLive.textContent = "λ_max ≈ " + lnm + " nm  (T = " + Math.round(Tstar) + " K)";
      const energy = heV * fTHz - Aev;
      const emit = energy > 0;
      electrons.forEach(function (o, i) {
        const up = (t3 * (0.55 + o.r) + o.ph) % 2.2;
        o.m.position.set((i % 5 - 2) * 0.35, -0.3 + up * Math.sqrt(Math.max(0, energy)), ((i / 5) | 0) * 0.35 - 0.35);
        o.m.visible = emit;
      });
    });
    handles.push(s3);
    const m=(id,label,value,unit)=>({id,label,value,unit});
    S.observe({sample:function(){const a=window.LabModels.quantum(fTHz,Tstar);return [m('f','Tần số chùm sáng',a.f,'Hz'),m('photon','Năng lượng photon',a.photon,'J'),m('K',a.emits?'Kmax quang electron':'Kmax (không phát electron)',a.K,'J'),m('speed','vmax quang electron',a.speed,'m/s'),m('T','Nhiệt độ sao',Tstar,'K'),m('wien','Cực đại phổ Wien',a.wien,'m')];},explain:function(){return 'Tăng f làm năng lượng photon tăng. '+(fTHz*1e12<window.LabModels.quantum(fTHz,Tstar).threshold?'Đang dưới ngưỡng: không có quang electron; số 0 trong bảng là quy ước hiển thị khi không phát ra.':'Đang trên ngưỡng: Kmax = hf − A; vận tốc cực đại tăng theo căn Kmax.')+' Đổi T chỉ đổi λ cực đại của phổ sao theo Wien, không đổi chùm sáng đang chiếu. Chuyển động electron là minh họa, không theo tốc độ SI.';},reset:function(){t3=0;}});
    return handles;
  }
};
