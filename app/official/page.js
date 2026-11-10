import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CourseLinks } from '@/components/course-links';
import { courses, masterclasses } from '../data';
import { helpSection } from '../official-reading';
const stages=[
 {number:'01',title:'准备与认识编辑器',description:'核对账号和编辑器使用权限，认识界面、创建并保存场景。',links:[helpSection('sfbm08fj','如何开始？'),'help:l1t696xj','help:arvm6ee6','tips']},
 {number:'02',title:'搭建场景与互动',description:'规划空间，制作或导入资产，再从互动组件开始构建体验。',links:[helpSection('fmgy9043','1.AI生成地图'),helpSection('6inqqa8b','快速上手'),helpSection('06pvv22f','2.3.1 湖泊'),helpSection('5v3rja56','模块一：AI 提示词生成模型'),helpSection('ag16jzrq','模块一：用户出生点'),helpSection('m3of8c4u','模块一：资源格式与基础限制'),helpSection('9ogz06ef','三、MIX：把资产组合成复杂玩法'),'help:7obzr0g6','component','pirate']},
 {number:'03',title:'团队协作与资产交接',description:'组队时参考官方建议：明确主地图负责人，其他成员制作资产并交接导入。',links:['collaboration']},
 {number:'04',title:'试玩与优化',description:'检查玩家引导和实际互动，收集反馈并修正问题。',links:[helpSection('gcrhu9lj','一、先保存当前创作进度'),helpSection('gcrhu9lj','二、用手机做真机预览'),helpSection('gcrhu9lj','三、在编辑器里做本地调试'),helpSection('vsg6b86p','三、星光消耗规则'),helpSection('00wq0ke2','Q4. 世界容量满了怎么办？'),'optimization']},
 {number:'05',title:'活动提交（按需）',description:'如参加活动，以当期官方指南为准核对材料、审核及开发版本二维码。',links:['help:h56wvtfa','help:cg24rtmr','submission']}
];
export const metadata={title:'官方学习路线 · 造世界创作地图'};
export default function Official(){return <><SiteHeader/><main className="wide-shell"><div className="page-intro"><Badge variant="outline">官方学习路线</Badge><h1>从准备到交付<span>.</span></h1><p>按需要查阅官方指南和大师课。</p></div><div className="official-grid">{stages.map(stage=><Card key={stage.number}><CardHeader><Badge variant="secondary">阶段 {stage.number}</Badge><CardTitle>{stage.title}</CardTitle><CardDescription>{stage.description}</CardDescription></CardHeader><CardContent><CourseLinks links={stage.links} context={stage.title+stage.description}/></CardContent></Card>)}</div><section className="master-section"><h2>官方大师课</h2><p>从真实作品中选择适合自己的案例。</p><div className="master-grid">{masterclasses.map(item=>{const c=courses[item.id];return <Card key={item.id}><CardHeader><Badge variant="secondary">{item.category}</Badge><CardTitle>{c[1]}</CardTitle><CardDescription>{item.description}</CardDescription></CardHeader><CardContent><CourseLinks links={[item.id]}/></CardContent></Card>})}</div></section></main></>}
