import { recommend, routes } from './data.js';

export function buildPlan(a) {
 const ids = recommend(a), p = a.proficiency, tried = a.experience, entries = [];
 const useCli = ids.includes('official') && a.officialMethod?.[0] === 'cli';
 const add = (title,desc,links=[],tag='学习',lane='shared',phase='prepare') => entries.push({title,desc,links,tag,lane,phase,kind:['可选策划','可选参考','官方大师课'].includes(tag)?'optional':'core'});
 const level = key => p.includes(key) ? 'independent' : tried.includes(key) ? 'tried' : 'new';
 if (a.idea.length && a.idea[0] !== 'ready') {
   if (level('design') === 'independent') add('复核你的世界方案','你已有策划经验，可用一页方案检查核心体验与范围；郭子睿的 Skill 可作为可选的追问工具。', ['guo'], '可选策划');
   else add(level('design') === 'tried' ? '完善已有的策划想法' : '先把想法说清楚', '确定体验目标、参与者的操作和第一版范围，写下一页方案。'+(level('agent')==='new'?'可先用纸笔或普通 AI 对话，熟悉 Agent 后再尝试 Skill。':'可用郭子睿的 Skill 辅助提问和拆解。'), ['guo'], '策划');
 } else if (a.idea[0] === 'ready' && level('design') !== 'new') add('可选：复核已有方案','你可以直接制作；也可以用郭子睿的 Skill 检查范围和遗漏。',['guo'],'可选策划');
 if (ids.includes('official') && level('editor')!=='independent') add(level('editor')==='tried'?'复习编辑器基础':'认识造世界编辑器',level('editor')==='tried'?'练习独立创建、保存并预览场景，巩固基本操作。':'创建、保存并预览一个小场景，找到基本操作区域。',['official','zhao','tips'],'基础');
 if ((ids.includes('html') || useCli) && level('ai')!=='independent') add(level('ai')==='tried'?'练习细化 AI 需求':'认识 AI 协作','给出目标、背景和限制；检查结果，每次只调整一个问题。',[],'基础');
 if (useCli && level('agent')!=='independent') add(level('agent')==='tried'?'巩固 AI 助手与工具操作':'先熟悉 AI 助手与工具操作',level('agent')==='tried'?'独立完成一次小任务并核对结果，再尝试 CLI。':'练习描述任务、检查结果和操作文件；完成后再尝试 CLI。',[],'基础','official');
 if (a.context?.includes('team')) add('先约定分工和资产交接','官方指南建议一人负责主地图，其余成员制作资产；导出 GLB 交给主地图负责人导入，按团队实际情况安排。',['collaboration'],'团队协作');
 if ((ids.includes('unity')) && level('unity')!=='independent') add(level('unity')==='tried'?'巩固 Unity 基础':'按需补 Unity 基础','先独立创建、运行并保存一个小工程，再核对 SDK 要求。',[],'基础','unity');
 for (const id of ids) {
  const r=routes.find(x=>x.id===(id==='official' && useCli?'cli':id));
  for (let i=0;i<r.steps.length;i++) {
   let [title,desc,links]=r.steps[i];
   if (id==='official' && !useCli && i===0) continue;
   if (id==='html' && i===3 && level('unity')!=='independent') add(level('unity')==='tried'?'巩固 Unity 基础':'按需补 Unity 基础','HTML 原型完成后，先学会创建并运行 Unity 小工程，再核对 SDK 要求。',[],'基础','html');
   if (id==='ai' && i===1) {
    if(level('art')==='independent' && level('code')==='independent') {title='制作并接入你的样例';desc='利用已有美术和编程经验，先选一项素材或功能完成平台接入。';}
    else if(level('art')==='independent') {title='利用美术经验制作素材';desc='以熟悉的视觉方法做一个样例，再核对平台的尺寸与材质。'; links=['lu2'];}
    else if(level('code')==='independent') {title='利用编程经验制作功能';desc='先做一个可独立测试的功能，并核对平台接口。';links=['zhang'];}
    else if(level('art')==='tried'||level('code')==='tried') desc='基于已有经验选择素材或功能，先完成一个可验证的样例。';
   }
   if (id==='html' && i===1 && level('html')==='independent') {title='制作并迭代 HTML 原型';desc='利用已有网页经验做出可玩版本，逐轮验证规则和体验。';}
   else if(id==='html' && i===1 && level('html')==='tried') desc='在已有网页经验上完成可运行版本，先验证一个核心规则。';
   if (id==='official' && !useCli && i===1) links=links.filter(link=>link!=='pirate');
   if (id==='official' && !useCli && i===2) links=['component',...links];
   add(title,desc,links,(id==='official'?'A':r.letter)+' 路线',id,'route');
  }
 }
 if((a.goal.includes('game')||a.goal.includes('social')) && !ids.includes('official')) {
  if(level('design')==='independent') add('验证已有玩法设计','用试玩检查目标、操作、反馈和结束条件，不必重复学习基础概念。',['component','deng'],'专项');
  else add(level('design')==='tried'?'完善玩家引导与反馈':'补上玩家目标与互动反馈','明确玩家的操作、反馈和结束条件，先完成一个短闭环。',['component','chu','deng'],'专项');
 }
 if(a.goal.some(goal=>['space','campus'].includes(goal))) add('参考场景与玩法结合','从主题出发组织场景，用互动把空间串起来。',['pirate'],'官方大师课');
 if(a.goal.some(goal=>['game','social'].includes(goal))) add('拆解完整玩法案例','按兴趣参考驾驶计时或色彩收集玩法，观察规则与反馈如何实现。',['racing','colors'],'官方大师课');
 if(a.goal.includes('campus')) add('让地点容易辨认','从入口、地标和行走路线开始，先做好一个校园角落。',['hyz'],'专项');
 // Preserve capability-specific entry points even when a different route is selected.
 const abilityResources = [
  ['ai','AI 需求表达','aiGuide'], ['agent','AI 工具与任务执行','chen'],
  ['editor','造世界编辑器','official'], ['art','场景和美术','lu2'],
  ['design','世界策划','guo'], ['code','脚本和玩法','zhang'],
  ['unity','Unity 工程','xu'], ['html','HTML 原型','html'],
 ];
 const selectedAbilities = abilityResources.filter(([key])=>tried.includes(key));
 if (selectedAbilities.length) {
  const descriptions = selectedAbilities.map(([key,label])=>`${label}（${level(key)==='independent'?'可作为工具或选修参考':'可按需巩固'}）`);
  add('结合已有经验，按需查阅','这些不是必修课：'+descriptions.join('、')+'。策划 Skill 只用于方案梳理，已完成方案可跳过。', [...new Set(selectedAbilities.map(([, , link])=>link))], '可选参考');
 }
 add('试玩、修正并保存','从玩家视角走一遍，检查引导、互动、保存和重开，再分享给别人体验。',['optimization','deng'],'验收','shared','finish');
 if(a.context?.includes('contest')) add('准备活动提交','核对当前活动要求；该官方指南提示提交表单时同步发起上线审批，并使用开发版本二维码。',['submission'],'活动提交','shared','finish');
 return {ids,entries};
}
