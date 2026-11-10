import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { courses } from '@/app/data';
export function CourseLinks({links}) {
 if(!links.length) return null;
 return <div className="course-resources"><p>相关资料 · 按需选读</p><div className="course-links">{links.map(id=>{const c=courses[id];return <Badge asChild variant="secondary" key={id}><a href={c[2]} target="_blank" rel="noreferrer"><BookOpen/>{c[0]} · {c[1]}<ArrowUpRight/></a></Badge>})}</div></div>;
}
