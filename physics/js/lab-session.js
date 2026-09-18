(function(){
 'use strict';
 function format(n){return Number.isFinite(n)?(n!==0&&(Math.abs(n)<.001||Math.abs(n)>=10000)?n.toExponential(4):Number(n.toFixed(5)).toString()):'—';}
 function create(root){
  const box=document.createElement('section');box.className='lab-console';
  box.innerHTML='<h3>Điều khiển thí nghiệm</h3><div class="actions"><button class="btn btn-primary" data-lab-toggle>Tạm dừng</button><button class="btn" data-lab-step>Chạy một bước +0,05 s</button><button class="btn" data-lab-reset>Đặt lại thông số</button></div><p><output id="labClock" aria-label="Thời gian minh họa">0.00 s</output> · <span id="labRunState">Đang chạy</span></p><p class="hint">Đồng hồ là thời gian minh họa. Mô hình tĩnh không tự biến đổi; các chuyển động làm chậm được ghi rõ bên dưới. Kéo thanh điều khiển sẽ bắt đầu một lượt đo mới.</p><div class="lab-readings" id="labReadings"></div><h4>Điều gì đang thay đổi?</h4><p id="labExplanation" role="status"></p><label>Đại lượng trên biểu đồ<select id="labSeries"></select></label><canvas id="labHistory" height="210" role="img" aria-label="Biểu đồ dữ liệu theo thời gian minh họa"></canvas><p class="hint" id="labChartCaption"></p>';
  root.insertBefore(box,root.querySelector('.lab-grid'));
  const frames=new Set(),sliders=[],canvas=box.querySelector('canvas'),ctx=canvas.getContext('2d');
  let time=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,disposed=false,observer=null,history=[],last=performance.now(),raf=0,lastSample=-1,selected='',latestInput='';
  function values(){return observer?observer.sample():[];}
  function paintChart(rows){
   const width=Math.max(240,canvas.clientWidth),height=210,dpr=Math.min(devicePixelRatio||1,2);
   if(canvas.width!==Math.round(width*dpr)){canvas.width=Math.round(width*dpr);canvas.height=height*dpr;}ctx.setTransform(dpr,0,0,dpr,0,0);
   ctx.clearRect(0,0,width,height);const row=rows.find(x=>x.id===selected)||rows[0];if(!row)return;
   const points=history.map(p=>[p.t,p.values[row.id]]).filter(p=>Number.isFinite(p[1]));
   const lo=Math.min(0,...points.map(p=>p[1])),hi=Math.max(0,...points.map(p=>p[1]));const gap=(hi-lo)*.1||Math.max(Math.abs(row.value)*.1,1e-12),min=lo-gap,max=hi+gap;
   const start=Math.max(0,time-20),end=Math.max(start+1,time),left=82,right=width-15,top=22,bottom=175;
   ctx.strokeStyle='#536480';ctx.beginPath();ctx.moveTo(left,top);ctx.lineTo(left,bottom);ctx.lineTo(right,bottom);ctx.stroke();
   ctx.font='11px system-ui';ctx.fillStyle='#bdcbe0';ctx.fillText(format(max),2,top+4);ctx.fillText(format(min),2,bottom);ctx.fillText(start.toFixed(1),left,194);ctx.fillText(end.toFixed(1)+' s',right-48,194);
   ctx.strokeStyle='#92baff';ctx.lineWidth=2;ctx.beginPath();points.forEach(([t,v],i)=>{const x=left+(t-start)/(end-start)*(right-left),y=bottom-(v-min)/(max-min)*(bottom-top);if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.stroke();
   if(points.length===1){ctx.fillStyle='#92baff';ctx.beginPath();ctx.arc(left,bottom-(points[0][1]-min)/(max-min)*(bottom-top),3,0,Math.PI*2);ctx.fill();}
   const caption=row.label+' ('+row.unit+') theo t minh họa (s) · '+points.length+' mẫu gần nhất. Giá trị hiện tại: '+format(row.value)+' '+row.unit+'.';
   box.querySelector('#labChartCaption').textContent=caption;canvas.setAttribute('aria-label',caption);
  }
  function refresh(sample){
   const rows=values();if(!rows.length)return;
   if(sample||!history.length){history.push({t:time,values:Object.fromEntries(rows.map(x=>[x.id,x.value]))});history=history.filter(p=>p.t>=time-20).slice(-401);lastSample=time;}
   const select=box.querySelector('#labSeries');if(!select.options.length){rows.forEach(row=>{const opt=document.createElement('option');opt.value=row.id;opt.textContent=row.label+' ('+row.unit+')';select.appendChild(opt);});selected=rows[0].id;}
   const readings=box.querySelector('#labReadings');if(!readings.children.length)rows.forEach(row=>{const el=document.createElement('div');el.className='lab-reading';const name=document.createElement('span'),out=document.createElement('output');name.textContent=row.label;out.dataset.measure=row.id;el.append(name,out);readings.appendChild(el);});
   rows.forEach(row=>{const out=readings.querySelector('[data-measure="'+row.id+'"]');out.previousElementSibling.textContent=row.label;out.textContent=format(row.value)+' '+row.unit;out.dataset.value=String(row.value);});
   const explanation=(latestInput?latestInput+' — ':'')+observer.explain();
   if(box.querySelector('#labExplanation').textContent!==explanation)box.querySelector('#labExplanation').textContent=explanation;
   box.querySelector('#labClock').textContent=time.toFixed(2)+' s';box.querySelector('#labClock').dataset.time=String(time);
   box.querySelector('#labRunState').textContent=paused?'Đã tạm dừng':'Đang chạy';box.querySelector('[data-lab-toggle]').textContent=paused?'Tiếp tục':'Tạm dừng';box.dataset.paused=String(paused);
   paintChart(rows);
  }
  function advance(dt){if(disposed)return;time+=dt;frames.forEach(fn=>fn(dt));refresh(dt>0&&time-lastSample>=.049);}
  function loop(now){if(disposed)return;raf=requestAnimationFrame(loop);const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;advance(paused||document.hidden?0:dt);}
  function restart(){time=0;history=[];lastSample=-1;if(observer?.reset)observer.reset();advance(0);}
  const api={subscribe(fn){frames.add(fn);return ()=>frames.delete(fn);},registerSlider(input){sliders.push(input);},changed(label){latestInput=label;restart();},observe(config){observer=config;refresh(true);},getTime:()=>time,
   dispose(){disposed=true;cancelAnimationFrame(raf);frames.clear();resize.disconnect();if(window.LabSession.active===api)window.LabSession.active=null;box.remove();}};
  box.querySelector('[data-lab-toggle]').onclick=()=>{paused=!paused;last=performance.now();refresh(false);};
  box.querySelector('[data-lab-step]').onclick=()=>{paused=true;advance(.05);};
  box.querySelector('[data-lab-reset]').onclick=()=>{sliders.forEach(input=>{input.value=input.dataset.initial;input.dispatchEvent(new Event('input',{bubbles:true}));});latestInput='Đã khôi phục thông số ban đầu';restart();};
  box.querySelector('#labSeries').onchange=e=>{selected=e.target.value;paintChart(values());};
  const resize=new ResizeObserver(()=>paintChart(values()));resize.observe(canvas);
  window.LabSession.active=api;raf=requestAnimationFrame(loop);return api;
 }
 window.LabSession={active:null,create,format};
})();
