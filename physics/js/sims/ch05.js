window.VLDC_SIMS = window.VLDC_SIMS || {};
window.VLDC_SIMS.ch05 = {
  mount: function (els) {
    const S = window.SimCore;
    const THREE = S.THREE;
    const handles = [];

    const c2 = S.createCanvas2D(els.box2d);
    let a = 0.30;
    let lam = 600;
    S.sliderRow(els.ctrl2d, "a hai khe (mm)", 0.15, 0.6, 0.01, a, function (v) { a = v; });
    S.sliderRow(els.ctrl2d, "λ (nm)", 400, 700, 5, lam, function (v) { lam = v; });
    S.legend(els.meta2d, [
      { color: "#ffd60a", label: "vân sáng" },
      { color: "#0a84ff", label: "khe S₁ S₂" },
      { color: "#f4f4f5", label: "màn" }
    ]);
    S.readBox(els.meta2d, "<strong>Đọc hình:</strong> I-âng (Young): $i=\\lambda D/a$. Tăng $a$ $\\Rightarrow$ vân dày hơn (khoảng vân nhỏ). DCCT: mô hình giao thoa hai khe.");

    function draw2d() {
      const ctx = c2.ctx;
      const w = c2.getW();
      const h = c2.getH();
      S.clear(ctx, w, h);
      const D = 1.2;
      const iV = (lam * 1e-9) * D / (a * 1e-3);
      const dy = 22 * iV / 0.0024; // Fixed pixel/metre scale: spacing is proportional to λD/a.

      ctx.fillStyle = "#0a84ff";
      ctx.fillRect(28, h * 0.5 - 18, 6, 8);
      ctx.fillRect(28, h * 0.5 + 10, 6, 8);
      ctx.fillStyle = "#f4f4f5";
      ctx.font = "12px Segoe UI, sans-serif";
      ctx.fillText("S₁", 8, h * 0.5 - 8);
      ctx.fillText("S₂", 8, h * 0.5 + 28);

      const mx = w - 70;
      ctx.strokeStyle = "#f4f4f5";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mx, 16);
      ctx.lineTo(mx, h - 16);
      ctx.stroke();

      for (let k = -8; k <= 8; k++) {
        const y = h * 0.5 - k * dy;
        if (y < 20 || y > h - 24) continue;
        const bright = k === 0 ? 1 : Math.max(0.25, 1 - Math.abs(k) * 0.08);
        ctx.fillStyle = "rgba(255, 214, 10," + bright + ")";
        ctx.fillRect(mx - 8, y - 3, 22, 6);
        if (k === 0) {
          ctx.fillStyle = "#30d158";
          ctx.fillText("k=0", mx + 18, y + 4);
        }
      }
      ctx.fillStyle = "#f4f4f5";
      ctx.fillText("i = " + (iV * 1000).toFixed(2) + " mm", 12, 22);
      ctx.fillStyle = "#8e8e93";
      ctx.fillText("D = 1,2 m  (cố định lab)", 12, 40);
    }
    const animation2D = S.animate2D(draw2d);
    handles.push({ dispose: function () { animation2D.dispose(); c2.dispose(); } });

    const s3 = S.createScene3D(els.box3d, { distance: 11, target: new THREE.Vector3(0, 0.6, 0) });
    function mirror() {
      return new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.06, 1.1),
        new THREE.MeshStandardMaterial({ color: 0xc7c7cc, metalness: 0.85, roughness: 0.15 })
      );
    }
    const m1 = mirror();
    const m2 = mirror();
    m1.position.set(0, 1.8, 0);
    m2.position.set(0, -1.8, 0);
    m1.rotation.z = -Math.PI / 4;
    m2.rotation.z = -Math.PI / 4;
    s3.scene.add(m1, m2);
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 3.4, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3c, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
    );
    s3.scene.add(tube);

    const rays = [];
    for (let i = 0; i < 3; i++) {
      const a = S.makeArrow(0x30d158, 1.4);
      s3.scene.add(a);
      rays.push(a);
    }
    S.legend(els.meta3d, [
      { color: "#c7c7cc", label: "gương 45°" },
      { color: "#30d158", label: "tia (phản xạ i′=i)" },
      { color: "#3a3a3c", label: "ống nhòm / tiềm vọng" }
    ]);
    S.readBox(els.meta3d, "<strong>Đọc hình:</strong> Kính tiềm vọng DCCT: hai gương $45^\\circ$, tia vào–ra song song, dịch trục. Ống nhòm: lăng kính TIR đảo ảnh. Kéo xoay 3D.");

    s3.setOnFrame(function () {
      S.updateArrow(rays[0], new THREE.Vector3(-1.6, 1.8, 0), new THREE.Vector3(1, 0, 0), 1.6, 1.6);
      S.updateArrow(rays[1], new THREE.Vector3(0, 1.8, 0), new THREE.Vector3(0, -1, 0), 3.6, 3.6);
      S.updateArrow(rays[2], new THREE.Vector3(0, -1.8, 0), new THREE.Vector3(1, 0, 0), 1.6, 1.6);
    });
    handles.push(s3);
    const m=(id,label,value,unit)=>({id,label,value,unit});
    S.observe({sample:function(){const a1=window.LabModels.young(a,lam);return [m('a','Khoảng cách hai khe',a1.a,'m'),m('lambda','Bước sóng',a1.lambda,'m'),m('spacing','Khoảng vân',a1.spacing,'m'),m('angle','Góc gương tiềm vọng',Math.PI/4,'rad')];},explain:function(){return 'Tăng λ làm khoảng vân rộng hơn; tăng a làm khoảng vân hẹp hơn, i = λD/a với D = 1,2 m. Thông số giữ nguyên thì biểu đồ nằm ngang. Hai gương 45° của kính tiềm vọng là hình tĩnh; bạn vẫn có thể xoay góc nhìn khi tạm dừng.';},reset:function(){}});
    return handles;
  }
};
