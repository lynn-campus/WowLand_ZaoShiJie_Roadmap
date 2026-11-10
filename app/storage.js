import { questions } from './data.js';
export const STORAGE_KEY='world-learning:v2';
export const LEGACY_STORAGE_KEY='world-learning:v1';
export function readSaved(raw) {
 try {
  const x=JSON.parse(raw); if(![1,2].includes(x?.version) || !x.answers || typeof x.answers!=='object') return null;
  const keys=['experience','proficiency','goal','idea','mode','officialMethod','context'];
  if(x.version===1){
   const old=Array.isArray(x.answers.mode)?x.answers.mode:[];
   const mapped=old.length===1 ? ({editor:'official',ai:'official',cli:'official',unity:'unity',html:'html'})[old[0]] : null;
   x.answers.mode=mapped?[mapped]:[];
   x.answers.officialMethod=old.length===1&&mapped==='official'?[old[0]==='cli'?'cli':'editor']:[];
   x.finished=false;x.step=0;
  }
  if(!keys.every(k=>Array.isArray(x.answers[k]) && x.answers[k].every(v=>typeof v==='string'))) return null;
  if(!Array.isArray(x.assessed)||!x.assessed.every(v=>typeof v==='string')) return null;
  const skillIds=questions.find(q=>q.key==='experience').options.map(([id])=>id).filter(id=>id!=='none');
  for(const key of keys){const allowed=key==='proficiency'?skillIds:questions.find(q=>q.key===key).options.map(([id])=>id);if(!x.answers[key].every(v=>allowed.includes(v)))return null;}
  if(x.answers.mode.length>1||x.answers.officialMethod.length>1||x.answers.idea.length>1)return null;
  if(x.answers.mode[0]!=='official'&&x.answers.officialMethod.length)return null;
  if(!x.answers.proficiency.every(id=>x.answers.experience.includes(id)) || !x.assessed.every(id=>skillIds.includes(id)&&x.answers.experience.includes(id))) return null;
  const count=5+x.answers.experience.filter(id=>id!=='none').length+(x.answers.mode[0]==='official'?1:0);
  return {answers:Object.fromEntries(keys.map(k=>[k,x.answers[k]])),assessed:x.assessed,step:Number.isInteger(x.step)&&x.step>=0?Math.min(x.step,count-1):0,finished:x.finished===true};
 } catch { return null; }
}
