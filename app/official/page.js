import { ArrowUpRight, BookOpen } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { courses, masterclasses } from '../data';
const stages=[
 {number:'01',title:'准备与认识编辑器',description:'核对账号和编辑器使用权限，认识界面、创建并保存场景。',links:['official','tips']},
 {number:'02',title:'搭建场景与互动',description:'规划空间，制作或导入资产，再从互动组件开始构建体验。',links:['component','pirate']},
 {number:'03',title:'团队协作与资产交接',description:'组队时参考官方建议：明确主地图负责人，其他成员制作资产并交接导入。',links:['collaboration']},
 {number:'04',title:'试玩与优化',description:'检查玩家引导和实际互动，收集反馈并修正问题。',links:['optimization']},
 {number:'05',title:'活动提交（按需）',description:'如参加活动，以当期官方指南为准核对材料、审核及开发版本二维码。',links:['submission']}
];
export const metadata={title:'官方学习路线 · 造世界创作地图'};
export default function Official(){return <><SiteHeader/><main className="wide-shell"><div className="page-intro"><Badge variant="outline">官方学习路线</Badge><h1>从准备到交付<span>.</span></h1><p>按需要查阅官方指南和大师课。</p></div><div className="official-grid">{stages.map(stage=><Card key={stage.number}><CardHeader><Badge variant="secondary">阶段 {stage.number}</Badge><CardTitle>{stage.title}</CardTitle><CardDescription>{stage.description}</CardDescription></CardHeader><CardContent className="official-resources">{stage.links.map(id=>{const c=courses[id];return <Button asChild variant="outline" key={id}><a href={c[2]} target="_blank" rel="noreferrer"><BookOpen data-icon="inline-start"/>{c[1]}<ArrowUpRight data-icon="inline-end"/></a></Button>})}</CardContent></Card>)}</div><section className="master-section"><h2>官方大师课</h2><p>从真实作品中选择适合自己的案例。</p><div className="master-grid">{masterclasses.map(item=>{const c=courses[item.id];return <Card key={item.id}><CardHeader><Badge variant="secondary">{item.category}</Badge><CardTitle>{c[1]}</CardTitle><CardDescription>{item.description}</CardDescription></CardHeader><CardContent><Button asChild variant="outline"><a href={c[2]} target="_blank" rel="noreferrer">查看课程<ArrowUpRight data-icon="inline-end"/></a></Button></CardContent></Card>})}</div></section></main></>}
