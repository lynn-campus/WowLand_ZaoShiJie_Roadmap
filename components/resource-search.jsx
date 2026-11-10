'use client';
import { useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { searchDocuments } from '@/app/search-index';

export function ResourceSearch(){
 const [query,setQuery]=useState('');
 const active=query.trim().length>0;
 const matches=active?searchDocuments(query):[];
 return <Dialog><DialogTrigger asChild><Button className="search-trigger" variant="outline" aria-label="搜索学习资料"><Search data-icon="inline-start"/><span>搜索资料</span></Button></DialogTrigger><DialogContent className="resource-dialog"><DialogHeader><DialogTitle>搜索学习资料</DialogTitle><DialogDescription>输入问题关键词，查找官方教程和朋辈导师课程。</DialogDescription></DialogHeader><div className="search-input-wrap"><Search aria-hidden="true"/><Input aria-label="搜索关键词" value={query} onChange={e=>setQuery(e.target.value)} placeholder="例如：容量超限、校园复刻、Lua" autoComplete="off"/>{active&&<Button variant="ghost" size="icon-sm" onClick={()=>setQuery('')} aria-label="清除搜索"><X/></Button>}</div><div className="search-results" aria-live="polite">{active?<><p className="search-count">{matches.length?`找到 ${matches.length} 条相关资料`:'没有找到匹配资料，试试其他关键词。'}</p>{matches.map(item=><a key={item.id} className="search-result" href={item.url} target="_blank" rel="noreferrer"><span className="search-result-main"><strong>{item.title}</strong><small>{item.source} · {item.parent}</small>{item.description&&<small>{item.description}</small>}</span><ArrowUpRight aria-hidden="true"/></a>)}</>:<p className="search-note">按标题、简介和标签匹配，点击结果查看原文。</p>}</div></DialogContent></Dialog>;
}
