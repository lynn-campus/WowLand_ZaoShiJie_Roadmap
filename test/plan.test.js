import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPlan } from '../app/plan.js';
const base = { experience:['none'], proficiency:[], goal:['game'], idea:['vague'], mode:['official'], officialMethod:['editor'], context:['solo'] };
function plan(capability, level, changes={}) { return buildPlan({...base,...changes, experience:level==='new'?['none']:[capability], proficiency:level==='independent'?[capability]:[]}); }
const titles=p=>p.entries.map(x=>x.title);
for (const [capability,changes] of [
 ['ai',{}], ['agent',{mode:['official'],officialMethod:['cli']}], ['editor',{mode:['official'],officialMethod:['editor']}], ['art',{mode:['official'], officialMethod:['editor']}],
 ['design',{}], ['code',{mode:['official'], officialMethod:['editor']}], ['unity',{mode:['unity']}], ['html',{mode:['html']}],
]) test(`${capability} 不同熟练度改变对应学习内容`,()=>{
 const variants=['new','tried','independent'].map(l=>JSON.stringify(plan(capability,l,changes).entries));
 assert.notEqual(variants[0],variants[1]); assert.notEqual(variants[1],variants[2]);
});
test('有独立策划经验时 Skill 可选，不强制基础课',()=>{const p=plan('design','independent'); assert.equal(p.entries[0].tag,'可选策划');assert.ok(p.entries[0].links.includes('guo'));assert.ok(!titles(p).includes('先把想法说清楚'));});
test('方案已确定时无策划经验不强推 Skill',()=>{const p=plan('design','new',{idea:['ready']});assert.ok(!p.entries.some(e=>e.links.includes('guo')));});
test('团队和参赛才加入官方协作及提交',()=>{const solo=buildPlan(base), team=buildPlan({...base,context:['team','contest']});assert.ok(!titles(solo).includes('先约定分工和资产交接'));assert.ok(titles(team).includes('先约定分工和资产交接'));assert.ok(titles(team).includes('准备活动提交'));});
test('HTML 路线先做原型再补 Unity',()=>{const p=plan('unity','new',{mode:['html']});assert.ok(titles(p).indexOf('做 HTML 原型')<titles(p).indexOf('按需补 Unity 基础'));});
test('目标对应官方大师课',()=>{const spatial=buildPlan({...base,goal:['space']});assert.ok(spatial.entries.some(e=>e.links.includes('pirate')));const game=buildPlan({...base,goal:['game']});assert.ok(game.entries.some(e=>e.links.includes('racing')&&e.links.includes('colors')));assert.ok(!spatial.entries.some(e=>e.links.includes('racing')));});
test('编辑器基础包含官方编辑器技巧',()=>{const p=buildPlan({...base,mode:['official'],officialMethod:['editor']});assert.ok(p.entries.some(e=>e.links.includes('tips')));});
test('主线与选修分组正确',()=>{const p=buildPlan({...base,experience:['design'],proficiency:['design'],goal:['game']});assert.equal(p.entries.find(e=>e.tag==='可选策划').kind,'optional');assert.equal(p.entries.find(e=>e.tag==='官方大师课').kind,'optional');assert.equal(p.entries.find(e=>e.title==='试玩、修正并保存').kind,'core');});
test('三条路线互斥，HTML 不混入 Unity 主线',()=>{for(const mode of ['official','unity','html']){const p=buildPlan({...base,mode:[mode]});assert.deepEqual(p.ids,[mode]);assert.ok(!p.entries.some(e=>e.phase==='route'&&e.lane!==mode));} const html=buildPlan({...base,mode:['html']});assert.equal(html.entries.find(e=>e.title==='按需补 Unity 基础').lane,'html');});
test('官方路线的 CLI 与编辑器使用不同任务，但保留同一主路线',()=>{const editor=buildPlan({...base,mode:['official'],officialMethod:['editor']});const cli=buildPlan({...base,mode:['official'],officialMethod:['cli']});assert.deepEqual(editor.ids,['official']);assert.deepEqual(cli.ids,['official']);assert.ok(titles(editor).includes('搭一个小场景'));assert.ok(!titles(editor).includes('确认工具环境'));assert.ok(titles(cli).includes('确认工具环境'));assert.ok(!titles(cli).includes('搭一个小场景'));});
