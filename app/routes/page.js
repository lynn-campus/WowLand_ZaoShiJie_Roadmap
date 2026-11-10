'use client';
import Link from 'next/link';
import { ArrowUpRight, Compass, Wrench, PanelsTopLeft } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { CourseLinks } from '@/components/course-links';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { routes } from '../data';
const icons={official:Compass,unity:Wrench,html:PanelsTopLeft};
export default function RoutesPage(){return <><SiteHeader/><main className="wide-shell"><div className="page-intro"><Badge variant="outline">探索地图</Badge><h1>选择你的创作方式<span>.</span></h1><p>三条工具路线各有不同的起点。展开查看步骤与学习资料。</p></div><div className="routes-grid">{routes.filter(r=>['official','unity','html'].includes(r.id)).map(route=>{const Icon=icons[route.id];return <Card key={route.id}><CardHeader><div className="route-card-title"><div className="icon-box"><Icon aria-hidden="true"/></div><Badge variant="secondary">路线 {route.letter}</Badge></div><CardTitle>{route.name}</CardTitle><CardDescription>{route.subtitle}</CardDescription></CardHeader><CardContent><p className="route-audience">适合：{route.audience}</p><Accordion type="single" collapsible><AccordionItem value="steps"><AccordionTrigger>查看学习步骤</AccordionTrigger><AccordionContent>{route.id==='official'&&<p>也可从 CLI 入手：先核对可用能力，通过小任务验证，再在编辑器中检查结果。</p>}<div className="route-timeline">{route.steps.map(([title,desc,links],i)=><div className="route-step" key={title}><Badge variant="outline">{String(i+1).padStart(2,'0')}</Badge><div><strong>{title}</strong><p>{desc}</p><CourseLinks links={links} context={title+desc}/></div></div>)}</div></AccordionContent></AccordionItem></Accordion></CardContent><CardFooter><span>成果：{route.output}</span></CardFooter></Card>})}</div><Card className="official-callout"><CardHeader><CardTitle>官方学习路线与大师课</CardTitle><CardDescription>从编辑器准备、协作到作品案例，集中浏览官方资料。</CardDescription></CardHeader><CardContent><Button asChild variant="outline"><Link href="/official/">查看官方路线<ArrowUpRight data-icon="inline-end"/></Link></Button></CardContent></Card></main></>}
