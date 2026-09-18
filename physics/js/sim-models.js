(function(){
 'use strict';
 const c=299792458,h=6.62607015e-34,e=1.602176634e-19,me=9.1093837139e-31;
 window.LabModels={c,h,e,
  electric(qNano,cage){return {q:qNano*1e-9,E:cage?0:9e9*Math.abs(qNano*1e-9)/3.2**2};},
  magnetic(I,B,vParallel){const charge=1.6e-6,mass=1e-6,vPerp=1.84;return {Bwire:2e-7*Math.abs(I)/.08,H:Math.abs(I)/(2*Math.PI*.08),charge,mass,vPerp,radius:mass*vPerp/(charge*B),period:2*Math.PI*mass/(charge*B),speed:Math.hypot(vPerp,vParallel),force:charge*vPerp*B};},
  induction(x,v){const d=.62-x,a=.15,phi0=.002,den=1+(d/a)**2;const phi=phi0/den**1.5,emf=-3*phi0*d*v/(a*a*den**2.5);return {phi,emf,current:emf/10};},
  generator(angle,omega){return {phi:.2*.01*Math.cos(angle),linkage:100*.2*.01*Math.cos(angle),emf:100*.2*.01*omega*Math.sin(angle)};},
  rlc(omega,t){const I0=1/Math.hypot(.4,omega-1/omega),Uc0=I0/omega;return {I0,Uc0,u:Uc0*Math.cos(omega*t),i:-I0*Math.sin(omega*t),frequency:omega/(2*Math.PI)};},
  wave(k,t){return {lambda:2*Math.PI/k,omega:c*k,E:.9*Math.cos(-3.2*k*t),B:.9/c*Math.cos(-3.2*k*t),physicalTime:3.2*t/c};},
  young(aMm,lambdaNm){return {a:aMm*1e-3,lambda:lambdaNm*1e-9,spacing:lambdaNm*1e-9*1.2/(aMm*1e-3)};},
  quantum(fTHz,T){const f=fTHz*1e12,A=2.28*e,K=h*f-A;return {f,A,photon:h*f,threshold:A/h,emits:K>=0,K:Math.max(0,K),speed:Math.sqrt(2*Math.max(0,K)/me),wien:2.9e-3/T};}
 };
})();
