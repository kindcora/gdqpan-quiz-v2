(function () {
  'use strict';
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/\s+/g,' ').trim();
  const matches = (text, query) => normalize(query).split(/\s+/).filter(Boolean).every(word => normalize(text).includes(word));
  function shuffle(list) {
    const result=list.slice();
    for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
    return result;
  }
  function sample(list,number,balanced,key) {
    if(!balanced)return shuffle(list).slice(0,number);
    const groups=new Map();
    shuffle(list).forEach(q=>{const k=key(q);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(q);});
    const buckets=shuffle([...groups.values()]),result=[];
    while(result.length<Math.min(number,list.length)){
      for(const bucket of buckets)if(bucket.length&&result.length<number)result.push(bucket.pop());
    }
    return shuffle(result);
  }
  function summary(results) {
    const correct=results.filter(r=>r==='correct').length,blank=results.filter(r=>r==='blank').length,total=results.length;
    return {total,correct,blank,wrong:total-correct-blank,score:total?(correct*10/total).toFixed(2):'0.00'};
  }
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.ExamTools={normalize,matches,shuffle,sample,summary,esc};
})();
