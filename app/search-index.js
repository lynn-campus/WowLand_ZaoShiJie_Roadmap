import { officialCatalog } from './official-catalog.js';
import { masterclassSections } from './masterclass-sections.js';
import { courses, routes, masterclasses } from './data.js';

// 标签服务于关键词召回，不代表课程作者的官方分类。
const peerTags={
 zhao:['新手','入门','编辑器','地图','模型','场景','发布'],
 qin:['场景','小王子','参考图','地图','资产','摆场'],
 lu:['场景','布局','模型','碰撞','灯光','氛围'],
 guo:['策划','方案','设计','想法','需求','玩法','skill'],
 lu2:['美术','贴图','材质','氛围','灯光','blender'],
 zhang:['脚本','lua','编程','玩法','交互','寻路','mcp'],
 huang:['团队','协作','流程','任务','编排','依赖','接入'],
 chen:['自动化','agent','电脑操作','computer use','场景'],
 hyz:['校园','复刻','自动化','agent','skill','场景'],
 xu:['unity','sdk','场景','自动化','skill'],
 html:['html','unity','sdk','原型','游戏','玩法','还原'],
 chu:['场景','布局','玩法','交互','迭代','需求'],
 deng:['玩法','交互','引导','试玩','上传','发布'],
 li:['案例','游戏','玩法','地图','竞速'],
 h:['案例','游戏','玩法','火山','组件']
};
const concepts=[
 ['容量','超限','超出','资源过多'],
 ['面数','顶点数'],
 ['卡顿','性能'],
 ['保存','存档','丢失','找回','备份'],
 ['发布','上线','上传','审核','提审','提交','驳回'],
 ['协作','合作','组队','团队','多人','交接'],
 ['模型','资产','素材','物件','道具','物品'],
 ['交互','互动','触发','操作','机关'],
 ['光照','灯光','照明','调亮','太暗','亮度','环境光'],
 ['地图','地形','场景','场地','世界'],
 ['预览','试玩','真机','测试','调试'],
 ['出生点','重生','复活','初始位置'],
 ['人工智能','智能体','agent','ai'],
 ['脚本','代码','编程','lua'],
 ['图片','照片','参考图','图生','贴图'],
 ['天空','天气','雾','雨','太阳'],
 ['水体','河流','湖泊','海水'],
 ['角色','玩家','用户','人物'],
 ['报错','错误','故障','失败','异常','bug'],
 ['提示词','指令','prompt','需求'],
 ['竞速','赛车','开车','车辆','驾驶'],
 ['跑酷','障碍','跳跃','闯关'],
 ['配额','星光','消耗','积分'],
 ['新手','入门','初学','零基础'],
];
const normalise=s=>s.toLowerCase().normalize('NFKC').replace(/[\s\p{P}\p{S}]+/gu,'');
function withConcepts(tags,title){const joined=normalise([title,...tags].join(' '));return [...new Set([...tags,...concepts.flatMap(group=>group.some(word=>joined.includes(normalise(word)))?group:[])])];}
const docTags={
 sfbm08fj:['新手','入门','账号','下载','权限'],l1t696xj:['编辑器','界面','快捷键'],arvm6ee6:['新手','入门','模板','材质','摆放'],gcrhu9lj:['保存','预览','真机','调试'],
 fmgy9043:['地形','地图','生成'], '6inqqa8b':['天气','光照','雾'], '06pvv22f':['水体','湖泊','河流'], '5v3rja56':['资产','模型','摆放'],ag16jzrq:['出生点','物理','碰撞','重力'],m3of8c4u:['容量','格式','面数','资源'],
 '9ogz06ef':['交互','模型','组合','玩法'], '7obzr0g6':['跑酷','关卡','玩法'],h56wvtfa:['发布','审核','自查'],cg24rtmr:['审核','合规','版权'],vsg6b86p:['星光','消耗','规则'], '00wq0ke2':['常见问题','FAQ','故障','排查']
};
// 复用页面中已有的课程简介和路线步骤，不将同一文档的简介套到每个小节。
const peerDescriptions = {
 zhao:'从创建项目开始，学习编辑器的基本操作、场景搭建和发布。',
 qin:'通过小王子游戏案例，参考场景构思、地图和资产摆放。',
 lu:'参考场景布局、模型、碰撞和灯光的创作技巧。',
 guo:'使用造世界 Skill 梳理创作想法、玩法需求与方案。',
 lu2:'使用氛围感贴图和材质丰富场景的视觉表现。',
 zhang:'借助外部 AI 编写和调整可玩的交互功能与脚本。',
 huang:'参考团队创作中的内容组织、任务拆分和流程编排。',
 chen:'探索使用 Computer Use 自动操作电脑进行场景创作。',
 hyz:'使用 Skill 辅助复刻校园空间和场景。',
 xu:'使用 Unity 和 Skill 辅助创建造世界项目。',
 html:'先用 HTML 制作游戏原型，再通过 Unity SDK 还原体验。',
 chu:'参考从场景布局到互动玩法的制作与迭代。',
 deng:'从玩法设计、试玩和调整入手，完成可玩的世界。',
 li:'通过完整作品参考游戏玩法与创作过程。',
 h:'参考《火陨王座》的玩法与世界创作思路。'
};
const descriptions = Object.fromEntries(Object.entries(peerDescriptions).map(([id,description])=>[id,new Set([description])]));
for (const route of routes) for (const [, description, ids] of route.steps) for (const id of ids) {
 (descriptions[id] ||= new Set()).add(description);
}
for (const item of masterclasses) (descriptions[item.id] ||= new Set()).add(item.description);
const descriptionFor = id => [...(descriptions[id] || [])].join(' ');
export function makeSearchIndex(){
 const out=[];
 for(const group of officialCatalog) for(const doc of group.children){
  const id=new URL(doc.url).searchParams.get('doc');const tags=docTags[id]||[];
  out.push({id:`doc:${id}`,title:doc.title,parent:group.title,source:'官方教程',url:doc.url,scope:'整篇',tags:withConcepts(tags,doc.title)});
  for(const section of doc.children){out.push({id:`section:${id}:${new URL(section.url).hash}`,title:section.title,parent:doc.title,source:'官方教程',url:section.url,scope:'指定小节',tags:withConcepts([],section.title)});}
 }
 for(const [id,tags] of Object.entries(peerTags)){
  const c=courses[id];if(!c)continue;out.push({id:`peer:${id}`,title:c[1],parent:c[0],source:'朋辈导师',url:c[2],scope:'课程资料',description:descriptionFor(id),tags:withConcepts(tags,c[1])});
 }
 for(const id of ['pirate','racing','colors']){const c=courses[id];out.push({id:`master:${id}`,title:c[1],parent:'完整作品案例',source:'官方大师课',url:c[2],scope:'整篇',description:descriptionFor(id),tags:withConcepts([],c[1])});}
 for(const id of ['tips','component'])for(const section of masterclassSections[id].filter(x=>x.level===1||(id==='component'&&x.level>=3))){
  out.push({id:`master-section:${section.id}`,title:section.title,parent:courses[id][1],source:'官方大师课',url:section.url,scope:'指定小节',tags:withConcepts(section.topics,section.title)});
 }
 return out;
}
export const searchIndex=makeSearchIndex();
const ignored=new Set(['怎么','如何','什么','可以','问题','哪里','一下','为什么','怎样','一个','的']);
export function searchDocuments(query,limit=8){
 const q=normalise(query);if(!q)return [];
 const pieces=[...new Set(query.toLowerCase().normalize('NFKC').split(/[\s\p{P}\p{S}]+/u).filter(Boolean).map(normalise))];
 const expanded=concepts.filter(group=>group.some(word=>{const n=normalise(word);return n.length>=2&&q.includes(n)})).flat();
 const bigrams=q.length>=4?[...new Set(Array.from({length:q.length-1},(_,i)=>q.slice(i,i+2)).filter(x=>!ignored.has(x)))]:[];
 return searchIndex.map(entry=>{
  const title=normalise(entry.title),description=normalise(entry.description||''),tags=entry.tags.map(normalise);let score=0;
  if(title.includes(q))score+=100;else if(q.includes(title)&&title.length>=3)score+=55;
  if(q.length>=2&&description.includes(q))score+=30;

  for(const part of pieces){if(part.length>=2&&title.includes(part))score+=20;if(part.length>=2&&part!==q&&description.includes(part))score+=10;if(part.length>=2&&tags.some(t=>t===part))score+=22;}
  const aliasMatches=expanded.filter(word=>tags.includes(normalise(word)));if(aliasMatches.length)score+=Math.min(24,aliasMatches.length*4);
  const hits=bigrams.filter(part=>title.includes(part));if(hits.length>=2&&hits.length/Math.max(1,bigrams.length)>=.3)score+=Math.min(24,hits.length*5);
  return {...entry,score};
 }).filter(entry=>entry.score>0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title,'zh-CN')).filter((entry,_,all)=>entry.score>=Math.max(8,all[0].score*.3)).slice(0,limit);
}
