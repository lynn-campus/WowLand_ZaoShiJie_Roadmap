import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { courses } from '@/app/data';
import { masterclassReading } from '@/app/reading-policy';
import { officialReading } from '@/app/official-reading';

function SectionLink({section}){return <a className="section-link" href={section.url} target="_blank" rel="noreferrer" title={section.title}><BookOpen aria-hidden="true"/><span>{section.title}</span><ArrowUpRight aria-hidden="true"/></a>}
export function CourseLinks({links,context=''}) {
 if(!links.length) return null;
 return <div className="course-resources"><p>相关资料 · 按需选读</p><div className="course-links">{links.map(id=>{
  const help=officialReading(id);
  if(help)return <Badge asChild variant="secondary" key={id}><a href={help.url} target="_blank" rel="noreferrer"><BookOpen/>{help.scope==='whole'?'整篇':'指定小节'} · {help.title}<ArrowUpRight/></a></Badge>;
  const c=courses[id];if(!c)return null;
  const reading=masterclassReading(id,context);const sections=reading?.sections;
  if(!sections?.length)return <Badge asChild variant="secondary" key={id}><a href={c[2]} target="_blank" rel="noreferrer"><BookOpen/>查看资料 · {c[0]} · {c[1]}<ArrowUpRight/></a></Badge>;
  if(reading.scope==='sections') {
   return <div className="section-resource" key={id}><span className="section-source">只看指定小节 · {c[1]}</span>{sections.map(section=><SectionLink key={section.id} section={section}/>)}</div>;
  }
  return <Badge asChild variant="secondary" key={id}><a href={c[2]} target="_blank" rel="noreferrer"><BookOpen/>整篇 · {c[1]}<ArrowUpRight/></a></Badge>;
 })}</div></div>;
}
