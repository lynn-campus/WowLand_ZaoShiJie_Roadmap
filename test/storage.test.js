import test from 'node:test';
import assert from 'node:assert/strict';
import { readSaved } from '../app/storage.js';
const state={version:2,answers:{experience:['design'],proficiency:['design'],goal:['space'],idea:['ready'],mode:['official'],officialMethod:['editor'],context:['solo']},assessed:['design'],step:4,finished:true};
test('有效保存记录可以恢复',()=>{assert.deepEqual(readSaved(JSON.stringify(state)).answers,state.answers)});
test('拒绝损坏、未知版本和不支持的选项',()=>{assert.equal(readSaved('{'),null);assert.equal(readSaved(JSON.stringify({...state,version:9})),null);assert.equal(readSaved(JSON.stringify({...state,answers:{...state.answers,mode:['oops']}})),null)});
test('越界步骤被限制在实际问题内',()=>{assert.equal(readSaved(JSON.stringify({...state,step:100})).step,6)});
test('迁移旧版答案并重新确认互斥路线',()=>{const a={...state.answers,mode:['editor','html']};delete a.officialMethod;const result=readSaved(JSON.stringify({version:1,answers:a,assessed:['design'],step:4,finished:true}));assert.deepEqual(result.answers.mode,[]);assert.deepEqual(result.answers.goal,['space']);assert.equal(result.finished,false);});
