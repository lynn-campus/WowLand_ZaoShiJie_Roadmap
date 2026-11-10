import test from 'node:test';
import assert from 'node:assert/strict';
import { masterclassReading } from '../app/reading-policy.js';
import { officialCatalog } from '../app/official-catalog.js';
import { officialReading, helpSection } from '../app/official-reading.js';
import { buildPlan } from '../app/plan.js';
test('作品案例整篇学习，FAQ 只选需要的小节',()=>{const project=masterclassReading('pirate','场景');assert.equal(project.scope,'whole');assert.ok(project.sections.length>2);const faq=masterclassReading('tips','AI 需求');assert.equal(faq.scope,'sections');assert.deepEqual(faq.sections.map(x=>x.title),['Q1：与AI对话的话术Tips']);assert.ok(faq.sections[0].url.endsWith('#ZUcsdB68YovX59xJzm2cBAkXnSg'));});
test('官方教程整篇与指定章节链接的阅读范围明确',()=>{assert.equal(officialReading('help:l1t696xj').scope,'whole');const id=helpSection('gcrhu9lj','二、用手机做真机预览');assert.equal(officialReading(id).scope,'section');assert.ok(officialReading(id).url.includes('#'));});
test('不展示完整目录但 16 篇官方教程均有学习挂点',()=>{const p=buildPlan({experience:['none'],proficiency:[],goal:['space'],idea:['vague'],mode:['official'],officialMethod:['editor'],context:['contest']});const linked=new Set(p.entries.flatMap(e=>e.links).filter(x=>x.startsWith('help:')).map(x=>x.split(':')[1]));const docIds=officialCatalog.flatMap(g=>g.children).map(d=>new URL(d.url).searchParams.get('doc'));assert.equal(docIds.length,16);for(const id of docIds)assert.ok(linked.has(id),id);});
