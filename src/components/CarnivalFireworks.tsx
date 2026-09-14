import { useEffect, useRef, useState } from 'react';
/** A finite, silent pair of firework blooms. Never flashes the full screen. */
export function CarnivalFireworks(){
 const canvas=useRef<HTMLCanvasElement>(null);
 const [play,setPlay]=useState(0);
 const [running,setRunning]=useState(false);
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  if(preference.matches)return;
  const ctx=el.getContext('2d');if(!ctx)return;
  let frame=0,start=0,stopped=false;
  const rect=el.getBoundingClientRect(),width=rect.width,height=rect.height,dpr=Math.min(devicePixelRatio||1,1.5);
  el.width=width*dpr;el.height=height*dpr;ctx.scale(dpr,dpr);
  const blooms=[{x:width*.3,y:height*.23,time:200,color:'245,209,137'},{x:width*.74,y:height*.35,time:1000,color:'239,176,199'}];
  function stop(){stopped=true;cancelAnimationFrame(frame);ctx!.clearRect(0,0,width,height);setRunning(false);}
  function tick(now:number){if(stopped)return;if(!start)start=now;const elapsed=now-start;ctx!.clearRect(0,0,width,height);
   for(const bloom of blooms){const age=(elapsed-bloom.time)/1000;if(age<0||age>2)continue;const opacity=Math.max(0,1-age/2);const radius=Math.min(width*.24,105)*(1-Math.exp(-age*2.4));
    for(let i=0;i<44;i++){const angle=i*Math.PI*2/44;const variation=.72+(i%5)*.065;const x=bloom.x+Math.cos(angle)*radius*variation,y=bloom.y+Math.sin(angle)*radius*variation+age*age*15;const tail=Math.max(1,8*(1-age/2));ctx!.beginPath();ctx!.strokeStyle='rgba('+bloom.color+','+opacity*.8+')';ctx!.lineWidth=i%3===0?1.4:.8;ctx!.moveTo(x-Math.cos(angle)*tail,y-Math.sin(angle)*tail);ctx!.lineTo(x,y);ctx!.stroke();ctx!.fillStyle='rgba(255,242,204,'+opacity+')';ctx!.fillRect(x,y,1.4,1.4);}
   }
   if(elapsed<3200)frame=requestAnimationFrame(tick);else stop();
  }
  const onVisibility=()=>{if(document.hidden)stop();};
  frame=requestAnimationFrame(tick);preference.addEventListener('change',stop);document.addEventListener('visibilitychange',onVisibility);
  return()=>{stopped=true;cancelAnimationFrame(frame);preference.removeEventListener('change',stop);document.removeEventListener('visibilitychange',onVisibility);ctx.clearRect(0,0,width,height);};
 },[play]);
 return <><canvas ref={canvas} className="carnival-fireworks" aria-hidden="true"/><button type="button" className="carnival-replay" disabled={running} onClick={()=>{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){setRunning(true);setPlay(n=>n+1);}}} aria-label="Replay the brief Carnival fireworks">A little Rio magic <span aria-hidden="true">✧</span></button></>;
}
