import test from 'node:test';
import assert from 'node:assert/strict';
import { searchIndex, searchDocuments } from '../app/search-index.js';
test('官方教程与朋辈导师均有索引',()=>{assert.ok(searchIndex.some(x=>x.source==='官方教程'));assert.equal(searchIndex.filter(x=>x.source==='朋辈导师').length,15)});
test('FAQ 命中具体标题与锚点',()=>{const matches=searchDocuments('容量满了');assert.ok(matches.some(x=>x.title.includes('世界容量满了')&&x.url.includes('#')))});
test('用标签查找朋辈课程',()=>{assert.ok(searchDocuments('校园复刻').some(x=>x.source==='朋辈导师'&&x.parent==='黄运樟'));assert.ok(searchDocuments('Lua').some(x=>x.parent==='张崇健'))});
test('作品案例整篇、FAQ 小节分别标记',()=>{assert.equal(searchIndex.find(x=>x.id==='master:pirate').scope,'整篇');assert.equal(searchIndex.find(x=>x.title==='Q1：与AI对话的话术Tips').scope,'指定小节')});
test('空查询和没有匹配时不返回全部资料',()=>{assert.deepEqual(searchDocuments(''),[]);assert.deepEqual(searchDocuments('zzzzzzzz'),[])});
test('具体问题不被宽泛主题和相邻小节淹没',()=>{const matches=searchDocuments('容量满了');assert.equal(matches[0].title,'Q4. 世界容量满了怎么办？');assert.ok(!matches.some(x=>x.title.includes('顶点数与面数')));assert.ok(matches.length<=8)});
