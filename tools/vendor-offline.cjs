// Fetch pinned, MIT-licensed browser dependencies. No package scripts are executed.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
async function copy(url,file){const r=await fetch(url);if(!r.ok)throw Error(url+': '+r.status);const bytes=Buffer.from(await r.arrayBuffer());fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),bytes);return bytes.toString();}
(async()=>{
 const base='https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/';
 const css=await copy(base+'katex.min.css','vendor/katex/katex.min.css');
 await copy(base+'katex.min.js','vendor/katex/katex.min.js');
 await copy(base+'contrib/auto-render.min.js','vendor/katex/auto-render.min.js');
 const fonts=[...new Set([...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]))];
 for(let i=0;i<fonts.length;i+=6)await Promise.all(fonts.slice(i,i+6).map(f=>copy(base+f,'vendor/katex/'+f)));
 await copy('https://cdn.jsdelivr.net/npm/katex@0.16.11/LICENSE','vendor/katex/LICENSE');
 await copy('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js','vendor/three/three.min.js');
 await copy('https://cdn.jsdelivr.net/npm/three@0.160.0/LICENSE','vendor/three/LICENSE');
 console.log('Vendored KaTeX 0.16.11, '+fonts.length+' font files and Three.js 0.160.0.');
})().catch(e=>{console.error(e);process.exit(1);});
