import { masterclassSections } from './masterclass-sections.js';
const caseIds=new Set(['pirate','racing','colors']);
export function masterclassReading(id,context='') {
 const sections=masterclassSections[id]; if(!sections)return null;
 if(caseIds.has(id))return {scope:'whole',sections};
 let selected=[];
 if(id==='tips') {
  if(/AI|需求|策划|生成|提示词/.test(context)) selected.push('ZUcsdB68YovX59xJzm2cBAkXnSg');
  if(/场景|地图|模型|资产|搭建|编辑器/.test(context)) selected.push('SviTdZJAxo0KbfxT0Tbct3BtnFf','Wp5WdT1qnoeO7Gx9ywicNFK8nDg');
  if(/组合|批量/.test(context)) selected.push('XDlpdoohjoYijRxE2LjcnKFYnhd');
  if(/试玩|预览|互动/.test(context)) selected.push('LzDvdXEPnowqPGxHG8VcNPu9nYe');
  if(!selected.length)selected=['ZUcsdB68YovX59xJzm2cBAkXnSg'];
 } else if(id==='component') selected=['doxcnNUQyTHDOXSU4FHOJinpHuf','doxcn48uuctf32WHOVd5PweVNmg'];
 return {scope:'sections',sections:sections.filter(section=>selected.includes(section.id))};
}
