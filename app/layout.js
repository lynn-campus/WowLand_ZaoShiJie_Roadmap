import './style.css';
import { Agentation } from 'agentation';
export const metadata = { title: '造世界 · 创作地图', description: '找到适合你的造世界学习路线。' };
export default function Layout({ children }) { return <html lang="zh-CN"><body>{children}{process.env.NODE_ENV === "development" && <Agentation />}</body></html>; }
