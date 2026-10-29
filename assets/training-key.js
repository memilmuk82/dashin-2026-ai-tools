/* The organizer authorized temporary public distribution until the stated time. */
(()=>{'use strict';
const deadline=Date.parse('2026-10-29T19:00:00+09:00');
const asset=new URL('training-key.json',document.currentScript.src||new URL('assets/',document.baseURI).href);
function refresh(){if(Date.now()<deadline)return;document.querySelectorAll('[data-training-key-copy]').forEach(b=>{b.disabled=true;if(b.textContent!=='연수용 키 배포 종료')b.textContent='연수용 키 배포 종료';const p=b.closest('.training-key')?.querySelector('[data-training-key-status]');if(p&&p.textContent!=='예시 모드 또는 Solar Chat으로 계속할 수 있습니다.')p.textContent='예시 모드 또는 Solar Chat으로 계속할 수 있습니다.'})}
document.addEventListener('click',async e=>{
 const b=e.target.closest('[data-training-key-copy]');if(!b)return;
 const status=b.closest('.training-key').querySelector('[data-training-key-status]');
 if(Date.now()>=deadline){refresh();return}
 b.disabled=true;status.textContent='연수용 키를 준비하고 있습니다.';
 let key='';
 try{
  const response=await fetch(asset,{cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer'});
  if(!response.ok)throw new Error('unavailable');
  const data=await response.json();
  if(Date.now()>=Math.min(deadline,Date.parse(data.expiresAt)||deadline)){refresh();return}
  if(typeof data.key!=='string'||!data.key.trim()){status.textContent='연수용 키를 준비 중입니다. 강사의 안내를 확인해 주세요.';return}
  key=data.key.trim();await navigator.clipboard.writeText(key);
  status.textContent='복사했습니다. 앱의 API 키 입력칸을 클릭하고 Ctrl+V로 붙여 넣으세요.';
 }catch{status.textContent='복사하지 못했습니다. Chrome 또는 Edge에서 연수자료의 https 주소를 열고 다시 눌러 주세요.'}
 finally{key='';b.disabled=Date.now()>=deadline;refresh()}
});
new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});
setTimeout(refresh,Math.max(0,Math.min(deadline-Date.now(),2147483647)));refresh();
})();
