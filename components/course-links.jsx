import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { courses } from '@/app/data';
import { masterclassReading } from '@/app/reading-policy';
import { officialReading } from '@/app/official-reading';

function SectionLink({section}){return <Badge asChild variant="secondary"><a href={section.url} target="_blank" rel="noreferrer" title={section.title}><BookOpen aria-hidden="true"/>{section.title}<ArrowUpRight aria-hidden="true"/></a></Badge>}
export function CourseLinks({links,context=''}) {
 if(!links.length) return null;
 return <div className="course-resources"><p>相关资料 · 按需选读</p><div className="course-links">{links.map(id=>{
  const help=officialReading(id);
  if(help)return <Badge asChild variant="secondary" key={id}><a href={help.url} target="_blank" rel="noreferrer"><BookOpen/>{help.title}<ArrowUpRight/></a></Badge>;
  const c=courses[id];if(!c)return null;
  const reading=masterclassReading(id,context);const sections=reading?.sections;
  if(!sections?.length)return <Badge asChild variant="secondary" key={id}><a href={c[2]} target="_blank" rel="noreferrer"><BookOpen/>{c[0]} · {c[1]}<ArrowUpRight/></a></Badge>;
  if(reading.scope==='sections') {
   return sections.map(section=><SectionLink key={section.id} section={section}/>);
  }
  return <Badge asChild variant="secondary" key={id}><a href={c[2]} target="_blank" rel="noreferrer"><BookOpen/>{c[1]}<ArrowUpRight/></a></Badge>;
 })}</div></div>;
}
