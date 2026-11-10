'use client';
import { useState } from 'react';
import { ArrowUpRight, BookOpen, Search } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { courses } from '@/app/data';
import { searchIndex } from '@/app/search-index';

const peerIds=['zhao','qin','lu','guo','lu2','zhang','huang','chen','hyz','xu','html','chu','deng','li','h'];
const masterIds=['pirate','tips','racing','colors','component'];
const otherIds=['aiGuide','official','collaboration','optimization','submission'];
const indexedById=new Map(searchIndex.map(item=>[item.id,item]));
const catalog=[
 ...searchIndex.filter(item=>item.id.startsWith('doc:')).map(item=>({...item,category:'官方教程'})),
 ...masterIds.map(id=>({id,title:courses[id][1],url:courses[id][2],parent:courses[id][0],category:'官方大师课',description:indexedById.get(`master:${id}`)?.description||''})),
 ...peerIds.map(id=>({...indexedById.get(`peer:${id}`),category:'朋辈导师'})),
 ...otherIds.map(id=>({id,title:courses[id][1],parent:courses[id][0],url:courses[id][2],category:id==='aiGuide'?'其他参考':'官方教程'})),
];
const filters=['全部资料','官方教程','官方大师课','朋辈导师','其他参考'];
export function ResourceIndex(){
 const [filter,setFilter]=useState('全部资料'),[query,setQuery]=useState('');
 const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 const results=catalog.filter(item=>(filter==='全部资料'||item.category===filter)&&words.every(word=>[item.title,item.parent,item.description,...(item.tags||[])].join(' ').toLowerCase().includes(word)));
 return <><SiteHeader/><main className="index-shell"><aside className="index-sidebar"><Card><CardHeader><CardTitle>资料分类</CardTitle><CardDescription>按来源筛选</CardDescription></CardHeader><CardContent><nav className="index-filters" aria-label="资料来源">{filters.map(item=><Button key={item} variant={filter===item?'secondary':'ghost'} size="sm" onClick={()=>setFilter(item)} aria-pressed={filter===item}>{item}</Button>)}</nav></CardContent></Card></aside><div className="index-main"><div className="roadmap-heading"><div><Badge variant="outline">资料索引</Badge><h1>找到需要的资料<span>.</span></h1><p>浏览官方教程、大师课和朋辈导师的创作经验。</p></div><Badge variant="secondary">{results.length} 项资料</Badge></div><div className="index-search"><Search aria-hidden="true"/><Input value={query} onChange={event=>setQuery(event.target.value)} placeholder="搜索标题、简介、标签或导师" aria-label="筛选资料"/></div><div className="index-mobile-filters" aria-label="资料来源">{filters.map(item=><Button key={item} variant={filter===item?'default':'outline'} size="sm" onClick={()=>setFilter(item)} aria-pressed={filter===item}>{item}</Button>)}</div><div className="index-list">{results.length?results.map(item=><Card key={`${item.category}:${item.id}`}><CardContent><a className="index-item" href={item.url} target="_blank" rel="noreferrer"><BookOpen aria-hidden="true"/><span><strong>{item.title}</strong><small>{item.category} · {item.parent}</small>{item.description&&<p>{item.description}</p>}</span><ArrowUpRight aria-hidden="true"/></a></CardContent></Card>):<p className="index-empty">没有找到匹配的资料，试试其他关键词或分类。</p>}</div></div></main></>;
}
