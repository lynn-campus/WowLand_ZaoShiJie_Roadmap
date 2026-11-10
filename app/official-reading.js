import { officialCatalog } from './official-catalog.js';
const docs=officialCatalog.flatMap(group=>group.children);
const slug=doc=>new URL(doc.url).searchParams.get('doc');
export function officialReading(id) {
 if(!id.startsWith('help:'))return null;
 const [,docId,hash]=id.split(':');const doc=docs.find(item=>slug(item)===docId);if(!doc)return null;
 if(hash){const section=doc.children.find(item=>new URL(item.url).hash.slice(1)===hash);return section?{title:section.title,url:section.url,scope:'section',parent:doc.title}:null;}
 return {title:doc.title,url:doc.url,scope:'whole',parent:null};
}
export function helpSection(docId,title) {
 const doc=docs.find(item=>slug(item)===docId);const section=doc?.children.find(item=>item.title===title);
 if(!section)throw new Error(`官方教程小节不存在：${docId} ${title}`);
 return `help:${docId}:${new URL(section.url).hash.slice(1)}`;
}
