import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { ResourceSearch } from '@/components/resource-search';

export function SiteHeader() {
 return <header className="site-header"><div className="site-header-inner"><Link className="site-brand" href="/">造世界 <span>/</span> 创作地图</Link><nav className="site-nav" aria-label="主导航"><Button asChild variant="ghost"><Link href="/">找到我的路线</Link></Button><Button asChild variant="ghost"><Link href="/routes/">探索全部路线</Link></Button><Button asChild variant="ghost"><Link href="/official/">官方学习路线</Link></Button><Button asChild variant="outline"><a href="https://my.feishu.cn/wiki/BkBowSDoMix2rDkXHxWcyCzKnOe" target="_blank" rel="noreferrer">飞书学习地图 <ArrowUpRight data-icon="inline-end"/></a></Button><ResourceSearch/></nav></div></header>;
}
