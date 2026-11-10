'use client';
import { useState, useEffect } from 'react';
import { STORAGE_KEY, LEGACY_STORAGE_KEY, readSaved } from './storage';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { searchDocuments } from './search-index';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FieldSet, FieldLegend, FieldDescription, FieldGroup, Field, FieldLabel, FieldContent, FieldTitle, FieldError } from '@/components/ui/field';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, GitBranch, Compass, RotateCcw, Info, Search, X } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { CourseLinks } from '@/components/course-links';
import { questions } from './data';
import { buildPlan } from './plan';

const empty = { experience: [], proficiency: [], goal: [], idea: [], mode: [], officialMethod: [], context: [] };
const prompts = { ai:['和 AI 交流时，你通常会怎么做？','想想你是否试过补充背景、追问并检查回答。'], agent:['你让 AI 帮你执行过任务吗？','比如读取文件、执行命令，或者一步步完成一件事。'], editor:['你在造世界编辑器里走到哪一步了？','比如新建一个场景、摆放物件、保存和预览。'], art:['你做过哪些视觉或空间创作？','可以是画图、设计、建模或安排场景中的空间。'], design:['你曾经怎样设计过一个体验？','想想是否做过游戏、活动或虚拟世界的目标与规则。'], code:['你写过程序来实现想法吗？','例如写脚本、修改代码，或让一个交互功能运行起来。'], unity:['你用 Unity 做过什么？','比如打开、修改或独立运行一个 Unity 工程。'], html:['你做过网页或可玩的 HTML 原型吗？','不论是自己写，还是借助 AI 完成，都可以算。'] };
const names = { official:'A｜造世界官方能力', unity:'B｜造世界 Unity', html:'C｜HTML 原型 → Unity' };
function SearchPanel(){
 const [query,setQuery]=useState('');const matches=searchDocuments(query);const active=query.trim().length>0;
 return <section className="search-panel" aria-label="检索学习资料"><div className="search-heading"><Label htmlFor="resource-search">遇到问题？搜一下</Label><span>标题与标签匹配</span></div><div className="search-input-wrap"><Search aria-hidden="true"/><Input id="resource-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="例如：容量超限、校园复刻、Lua" autoComplete="off"/>{active&&<Button variant="ghost" size="icon-sm" onClick={()=>setQuery('')} aria-label="清除搜索"><X/></Button>}</div>{active&&<div className="search-results" aria-live="polite"><p className="search-count">{matches.length?`找到 ${matches.length} 条相关资料`:'没有找到匹配资料，试试其他关键词。'}</p>{matches.map(item=><a key={item.id} className="search-result" href={item.url} target="_blank" rel="noreferrer"><span className="search-result-main"><strong>{item.title}</strong><small>{item.source} · {item.parent} · {item.scope}</small></span><ArrowUpRight aria-hidden="true"/></a>)}<p className="search-note">仅检索资料标题和标签，不生成答案；内容以原文为准。</p></div>}</section>;
}
function ParallelPlan({plan}) {
 const core=plan.entries.filter(e=>e.kind==='core');
 const groups=[{id:'shared',name:'共同准备',items:core.filter(e=>e.lane==='shared'&&e.phase!=='finish')},...plan.ids.map(id=>({id,name:names[id],items:core.filter(e=>e.lane===id)})),{id:'finish',name:'共同验证与交付',items:core.filter(e=>e.phase==='finish')}].filter(group=>group.items.length);
 const ordered=groups.flatMap(g=>g.items); const attached=new Map();
 for(const entry of plan.entries.filter(e=>e.kind==='optional')){
  let target;
  if(entry.tag==='可选策划') target=ordered.find(e=>e.tag==='策划');
  if(entry.phase==='finish') target=ordered.find(e=>e.phase==='finish');
  if(entry.title==='向 AI 描述任务') target=ordered.find(e=>e.title.includes('AI')||e.title.includes('任务'));
  if(entry.title==='地形、环境与水体'||entry.title==='模型、物理与资源限制') target=ordered.find(e=>e.title.includes('场景')&&e.lane!=='shared');
  if(entry.title==='制作互动与玩法') target=ordered.find(e=>e.title.includes('互动')||e.title.includes('玩法'));
  if(entry.title==='星光与故障排查') target=ordered.find(e=>e.title.includes('编辑器'));

  if(entry.links.includes('pirate')) target=ordered.find(e=>e.title.includes('场景')&&e.lane!=='shared')||ordered.find(e=>e.title==='用 SDK 还原'||e.title==='创建最小工程');
  if(entry.links.includes('racing')) target=ordered.find(e=>e.title.includes('互动')||e.title.includes('玩法'));
  target ||= ordered.find(e=>e.phase!=='finish')||ordered[0];
  if(target) attached.set(target,[...(attached.get(target)||[]),entry]);
 }
 return <div className="parallel-plan"><p className="parallel-note">一条主工具路线；选修从对应任务分出，不影响主线。</p>{groups.map(group=><section className="lane" key={group.id}><div className="lane-header"><Badge variant="secondary">{group.name}</Badge><span>{group.id==='shared'?'共同准备':group.id==='finish'?'完成后回到这里':'当前选择的主路线'}</span></div><div className="lane-steps">{group.items.map((entry,i)=><div className="branch-row" key={entry.title+i}><div className="main-node"><span className="plan-number">{String(i+1).padStart(2,'0')}</span><div><div className="plan-tag">{entry.tag} · 建议必修</div><h4>{entry.title}</h4><p>{entry.desc}</p><CourseLinks links={entry.links} context={entry.title+entry.desc}/></div></div>{attached.has(entry)&&<div className="elective-branch"><div className="branch-label"><GitBranch aria-hidden="true"/>按需选修</div>{attached.get(entry).map((extra,j)=><div className="elective-node" key={j}><h4>{extra.title}</h4><p>{extra.desc}</p><CourseLinks links={extra.links} context={extra.title+extra.desc}/></div>)}</div>}</div>)}</div></section>)}</div>;
}
export default function Home(){
 const [step,setStep]=useState(0),[answers,setAnswers]=useState(empty),[assessed,setAssessed]=useState([]),[finished,setFinished]=useState(false),[open,setOpen]=useState(null),[error,setError]=useState(false),[storageReady,setStorageReady]=useState(false),[storageError,setStorageError]=useState(false);
 useEffect(()=>{try {const saved=readSaved(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY));if(saved){setAnswers(saved.answers);setAssessed(saved.assessed);setStep(saved.step);setFinished(saved.finished);}} catch {setStorageError(true)} finally {setStorageReady(true)}},[]);
 useEffect(()=>{if(!storageReady)return;try {localStorage.setItem(STORAGE_KEY,JSON.stringify({version:2,answers,assessed,step,finished}));setStorageError(false)} catch {setStorageError(true)}},[answers,assessed,step,finished,storageReady]);
 const experienceQuestion=questions.find(item=>item.key==='experience');
 const selectedSkills=experienceQuestion.options.filter(([id])=>id!=='none'&&answers.experience.includes(id));
 const steps=[questions.find(x=>x.key==='goal'),questions.find(x=>x.key==='idea'),experienceQuestion,...selectedSkills.map(([id,title])=>({key:'level',skill:id,title:prompts[id][0],desc:prompts[id][1],label:title})),questions.find(x=>x.key==='mode'),...(answers.mode[0]==='official'?[questions.find(x=>x.key==='officialMethod')]:[]),questions.find(x=>x.key==='context')];
 const q=steps[Math.min(step,steps.length-1)]; const options=q.options||[];
 const selected=q.key==='level'?(assessed.includes(q.skill)?(answers.proficiency.includes(q.skill)?'independent':'tried'):''):answers[q.key];
 const hasAnswers=answers.goal.length>0||answers.experience.length>0; const plan=hasAnswers?buildPlan(answers):null;
 function chooseValues(values){setError(false);setAnswers(prev=>{let list=values;const previous=prev[q.key];const last=list.find(x=>!previous.includes(x));if(['none','unsure','auto','solo'].includes(last)) list=[last]; else if(last) list=list.filter(x=>!['none','unsure','auto','solo'].includes(x)); const next={...prev,[q.key]:list};if(q.key==='experience'){next.proficiency=prev.proficiency.filter(x=>list.includes(x));setAssessed(old=>old.filter(x=>list.includes(x)));}return next;});}
 function setLevel(id,level){setError(false);setAssessed(old=>old.includes(id)?old:[...old,id]);setAnswers(prev=>({...prev,proficiency:level==='independent'?[...new Set([...prev.proficiency,id])]:prev.proficiency.filter(x=>x!==id)}));}
 function next(){if(step>=steps.length){setStep(steps.length-1);return} if(q.key==='level'?!selected:!selected.length){setError(true);return} if(step===steps.length-1){setFinished(true);return} setStep(s=>s+1);}
 function reset(){setAnswers(empty);setAssessed([]);setStep(0);setFinished(false);setError(false)}
 return <><SiteHeader/><main className="page-shell"><div className="page-intro"><Badge variant="outline">个性化学习路线</Badge><h1>先回答，再出发<span>.</span></h1><p>选择你的经验和目标，右侧实时生成学习路线。答案自动保存在本机浏览器。</p></div><div className="workspace"><Card className="quiz-card"><CardHeader><div className="quiz-top"><div><CardTitle>创作起点问卷</CardTitle><CardDescription>{storageError?'本地保存不可用':'本地自动保存'}</CardDescription></div><Badge variant="secondary">{finished?'已完成':`${String(step+1).padStart(2,'0')} / ${String(steps.length).padStart(2,'0')}`}</Badge></div><Progress value={finished?100:((step+1)/steps.length)*100} aria-label="问卷进度"/></CardHeader>{!finished?<><CardContent><FieldSet data-invalid={error}><FieldLegend>{q.key==='experience'?'为了找到合适的起点，你接触过哪些方向？':q.title}</FieldLegend><FieldDescription>{q.key==='experience'?'选择你接触过的方向；我们只会追问你选中的内容。':q.desc}</FieldDescription>{q.key==='level'?<RadioGroup value={selected} onValueChange={value=>setLevel(q.skill,value)} aria-label={q.title}><FieldLabel><Field orientation="horizontal"><RadioGroupItem value="tried" aria-invalid={error}/><FieldContent><FieldTitle>我接触过，希望有人带我走一遍</FieldTitle><FieldDescription>了解一些，但还需要参考步骤或示例。</FieldDescription></FieldContent></Field></FieldLabel><FieldLabel><Field orientation="horizontal"><RadioGroupItem value="independent" aria-invalid={error}/><FieldContent><FieldTitle>我可以独立完成</FieldTitle><FieldDescription>遇到常见问题时，也能自己调整和验证。</FieldDescription></FieldContent></Field></FieldLabel></RadioGroup>:q.multi?<FieldGroup className="gap-2">{options.map(([id,title,detail])=><FieldLabel key={id}><Field orientation="horizontal"><Checkbox checked={selected.includes(id)} aria-invalid={error} onCheckedChange={checked=>chooseValues(checked?[...selected,id]:selected.filter(x=>x!==id))}/><FieldContent><FieldTitle>{title}</FieldTitle><FieldDescription>{detail}</FieldDescription></FieldContent></Field></FieldLabel>)}</FieldGroup>:<RadioGroup value={selected[0]||''} onValueChange={value=>{setError(false);setAnswers(prev=>({...prev,[q.key]:[value],...(q.key==='mode' && value!=='official'?{officialMethod:[]}: {})}))}} aria-label={q.title}>{options.map(([id,title,detail])=><FieldLabel key={id}><Field orientation="horizontal"><RadioGroupItem value={id} aria-invalid={error}/><FieldContent><FieldTitle>{title}</FieldTitle><FieldDescription>{detail}</FieldDescription></FieldContent></Field></FieldLabel>)}</RadioGroup>}{error&&<FieldError>请先选择一个答案，再继续。</FieldError>}</FieldSet></CardContent><CardFooter className="quiz-footer"><Button variant="ghost" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}><ArrowLeft data-icon="inline-start"/>上一步</Button><Button onClick={next}>{step===steps.length-1?'完成问卷':'下一步'}<ArrowRight data-icon="inline-end"/></Button></CardFooter></>:<CardContent className="completion"><CheckCircle2 aria-hidden="true"/><h2>你的路线准备好了</h2><p>可以继续调整答案，学习路线会实时更新。</p><div className="completion-actions"><Button variant="outline" onClick={()=>{setFinished(false);setStep(0)}}><ArrowLeft data-icon="inline-start"/>修改答案</Button><Button variant="ghost" onClick={reset}><RotateCcw data-icon="inline-start"/>重新开始</Button><Button asChild variant="link"><Link href="/routes/">查看所有路线<ArrowUpRight data-icon="inline-end"/></Link></Button></div></CardContent>}</Card><Card className="result-card"><CardHeader><div className="result-header"><div><CardTitle>你的学习路线</CardTitle><CardDescription>根据回答实时调整</CardDescription></div>{plan&&<Badge variant="outline">{plan.entries.length} 个节点</Badge>}</div></CardHeader><Separator/><CardContent className="result-content"><SearchPanel/>{!plan?<Empty><EmptyHeader><EmptyMedia variant="icon"><Compass/></EmptyMedia><EmptyTitle>你的路线，正在这里展开</EmptyTitle><EmptyDescription>从左侧选择一个目标开始，学习路线会随着回答更新。</EmptyDescription></EmptyHeader></Empty>:<><p className="result-intro">{finished?'你的推荐路线':'当前初步推荐'}：<strong>{plan.ids.map(x=>names[x]).join('、')}</strong>。{finished?'已掌握的基础可以跳过。':'继续回答，清单会实时调整。'}</p><ParallelPlan plan={plan}/>{plan.ids.includes('official')&&answers.officialMethod[0]==='cli'&&<Alert><Info/><AlertDescription>CLI 的安装与具体能力仍待核实；相关自动化案例不等同于 CLI 教程。</AlertDescription></Alert>}</>}</CardContent></Card></div></main></>;
}
