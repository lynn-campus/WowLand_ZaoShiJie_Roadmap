const peer = 'https://larkcommunity.feishu.cn/wiki/N7SVwNUJoiMd0UkJwrScomDln7b#doxcnvO5RARuh6kifhFlTlgTGdd';
export const courses = {
 aiGuide: ['参考','AI 基础与提问指南','https://p4r775i2r1.feishu.cn/docx/Tf3ediwftoWm1MxfkvvcyKr8nnd'],
 official: ['官方','造世界编辑器使用指南','https://bytedance.larkoffice.com/wiki/L62IwH7IViyqVjkcJtscVHwRndc'],
 collaboration: ['官方','编辑器协作与资产交接','https://bytedance.larkoffice.com/wiki/VktjwLhavi6xb3krwO2chynwnHd#I5gHdpKkdowvddxR2pucy1WynEg'],
 pirate: ['官方大师课','海贼岛：场景与玩法结合','https://bytedance.larkoffice.com/wiki/L5nbwWjAciiJ4lkn3LJcSungnnf'],
 tips: ['官方大师课','编辑器小妙招','https://bytedance.larkoffice.com/wiki/XKWQwWgp8if51lkqlG5cljEznCg'],
 racing: ['官方大师课','漠日飞车：驾驶与计时','https://bytedance.larkoffice.com/docx/X0ldd6QhJoMT0Lxpc6mcssQOn7b'],
 colors: ['官方大师课','色卡躲猫猫：玩法与提示词','https://bytedance.larkoffice.com/docx/VvoRdXANAohOAPx6dXZcP5Qnnic'],
 component: ['官方','互动组件如何修改','https://bytedance.larkoffice.com/docx/OX9Xd2yU5o2r8dx1s8OcKfpmnOf'],
 optimization: ['官方','地图优化指南','https://bytedance.larkoffice.com/docx/W2uwdt3FHooLVYx0ppVczPrJnEd'],
 submission: ['官方','作品提交提示（以最新活动要求为准）','https://bytedance.larkoffice.com/wiki/VktjwLhavi6xb3krwO2chynwnHd#Ip5Tdz6qyoMRNExIjAPc62iwnPe'],
 zhao: ['赵运铎','从零开始，造一个属于你的世界','https://ncnstwl0vb8s.feishu.cn/wiki/HjYywy3bPizrpxkcGLfcHUrUnrc'],
 qin: ['秦栋廷','小王子游戏制作案例','https://bytedance.larkoffice.com/docx/QD6ZdN5aCoA1rtxkCHVcQFAXnmh'],
 lu: ['路子豪','小小路创作小技巧',peer],
 guo: ['郭子睿','造世界 Skill：从点子到方案','https://my.feishu.cn/wiki/Ix2FwUllDiGlDGkOKFGcsjuGnuf'],
 lu2: ['鲁柯杏','用氛围感贴图节省生命的小技巧','https://miracleplus.feishu.cn/wiki/MuYSwuD3MiNzdUkMRRGcwtnOnGb'],
 zhang: ['张崇健','用外部 AI 写可玩的功能','https://lcnegmt37nqb.feishu.cn/wiki/FA9IwJSRyi9g71kTvoOcGe7bngb'],
 huang: ['黄孟阳','造世界内容组织与流程编排',peer],
 chen: ['陈敏鸿','Computer Use × 造世界','https://feishu.doubao.com/docx/RVxYd9xmBoNHe2xRPy4cXgn9nXb'],
 hyz: ['黄运樟','校园复刻全自动造世界 Skill','https://larkcommunity.feishu.cn/wiki/HzQ2wzg6SiUdq0k2xfocV4aknHe'],
 xu: ['徐鹏亮','Unity 一键造世界 Skill','https://bytedance.larkoffice.com/docx/FZYBdWdt5oK1s0xRMVUcgkf9nac'],
 html: ['徐鹏亮','《逃离黑洞》：HTML → Unity SDK','https://bytedance.larkoffice.com/docx/Ojond4OVWoldDix13JScEXP8n6d'],
 chu: ['褚天珩','从场景布局到交互迭代',peer],
 deng: ['邓启钰','把喜欢的世界做成可玩的体验',peer],
 li: ['李梓阳','从脑洞到可玩世界',peer],
 h: ['黄浚铭','《火陨王座》创作思路','https://ycnkznjbwrrg.feishu.cn/docx/CqJ6dBGQboKcnox0LDQcPki4njc']
};
export const routes = [
 {id:'official',letter:'A',icon:'✳',name:'造世界官方能力',subtitle:'编辑器与 CLI 创作',color:'mint',audience:'想边操作边理解，或第一次接触造世界',output:'一个能保存、重开并游览的小场景',steps:[['认识编辑器','创建、保存并预览一个项目。',['zhao']],['搭一个小场景','从地形、路径和少量物件开始。',['qin','lu','pirate']],['加入互动','让玩家知道可以做什么，并得到反馈。',['chu','deng']],['试玩与调整','自己走一遍，再请别人试一试。',['li']]]},
 {id:'ai',letter:'X',icon:'✦',name:'AI 辅助创作',subtitle:'把独特的想法做具体',color:'peach',audience:'希望 AI 帮忙生成素材或代码，自己接入和验证',output:'一组可用素材，或一个能测试的互动',steps:[['拆解目标','把想法分成素材、空间和规则。',[]],['制作一个样例','生成素材或功能，先验证一个。',['lu2','zhang']],['接入并检查','检查尺寸、绑定和运行效果。',['huang']],['迭代成体验','将零件串成玩家能理解的体验。',['chu','deng']]]},
 {id:'cli',letter:'X',icon:'⌘',name:'造世界 CLI',subtitle:'让 AI 协助执行任务',color:'lavender',audience:'熟悉 AI 助手和工具操作，不要求游戏制作经验',output:'一个由 AI 协助完成、可在编辑器中检查的小场景',steps:[['确认工具环境','先核对当前 CLI 的安装方式和可用能力。',[]],['描述一个小任务','说清位置、范围、限制和验收条件。',[]],['执行并检查','在实际场景中核对结果，再提出修改。',['huang']],['逐步扩大','先完成局部，再按需尝试批量操作。',['hyz','chen']]],note:'CLI 专门教程和具体能力仍待核实。校园 Skill、Computer Use 是相关自动化案例，并非 CLI 教程。'},
 {id:'unity',letter:'B',icon:'◇',name:'Unity SDK 创作',subtitle:'沿用熟悉的工程工作流',color:'butter',audience:'熟悉 Unity，或愿意学习工程与平台接入',output:'一个在目标环境中验证过的小型交互',steps:[['核对接入要求','确认 Unity 与官方 SDK 的适用版本。',[]],['创建最小工程','先验证场景能否进入目标环境。',['xu']],['实现一次交互','做一个可以单独检查的小功能。',[]],['验证与扩展','在目标环境运行，再逐步扩大。',['h']]]},
 {id:'html',letter:'C',icon:'↗',name:'HTML 原型 → SDK',subtitle:'先玩到想法，再还原它',color:'sky',audience:'想先用 AI 快速验证玩法，再做造世界版本',output:'一个可玩的 HTML 原型，以及 SDK 中的对应体验',steps:[['描述核心体验','用一句话讲清玩家要做什么。',['html']],['做 HTML 原型','让 AI 制作可运行版本，每次迭代一个问题。',['html']],['保留参考版本','确定画面、规则和操作体验。',['html']],['用 SDK 还原','按需补 Unity 基础，在目标环境验证。',['html','xu']]]}
];
export const questions=[
 {key:'experience',eyebrow:'01 / 你的能力',title:'你对这些事情熟悉吗？',desc:'按实际情况选择；没接触过的可以不选。',multi:true,options:[['ai','和 AI 聊过想法','会追问、修改要求，逐步改善结果'],['agent','用 AI 助手执行过任务','操作文件、运行命令或完成多步任务'],['editor','使用过造世界编辑器','创建、保存或预览过场景'],['art','做过美术或空间设计','画图、建模、设计或规划空间'],['design','做过游戏或世界策划','设计目标、规则、交互或流程'],['code','写过代码或脚本','让一个功能运行起来'],['unity','做过 Unity 工程','创建并运行过 Unity 项目'],['html','做过网页或 HTML 原型','制作或修改过网页、小游戏'],['none','以上都没有','我想从头开始']]},
 {key:'goal',eyebrow:'02 / 你的目标',title:'你想创造什么？',desc:'可以多选，也可以先带着模糊的想法出发。',multi:true,options:[['space','一个可以探索的空间','风景、展览或有氛围的场景'],['game','一个有规则的玩法','让玩家完成目标并得到反馈'],['campus','一个熟悉的地方','复刻校园、街区或真实场所'],['social','一场共同参与的体验','社交、活动或多人互动'],['prototype','先试试一个游戏点子','快速做一个可玩的原型'],['unsure','还没想好','先看看能做什么']]},
 {key:'idea',eyebrow:'03 / 你的想法',title:'你的想法到哪一步了？',desc:'选最接近的一项，我们会决定是否推荐策划帮助。',multi:false,options:[['none','还没有想法','想先看看方向'],['vague','有一个模糊的点子','还不知道怎么落地'],['partial','能说清体验，范围不确定','想把想法拆成可执行任务'],['ready','已有可执行方案','准备直接开始制作']]},
 {key:'mode',eyebrow:'04 / 你的方式',title:'你想选择哪条创作路线？',desc:'三条路线互斥，选择最适合当前目标的一条。',multi:false,options:[['official','A｜造世界官方能力','使用造世界编辑器，也可结合 CLI 协作'],['unity','B｜造世界 Unity','用 Unity 和官方 SDK 直接制作'],['html','C｜HTML 原型 → Unity','先制作可玩的 HTML，再用 Unity SDK 还原']]},
 {key:'officialMethod',eyebrow:'04 / 官方路线',title:'你更想怎样使用官方能力？',desc:'选择一个起点；CLI 路线也会用编辑器检查实际结果。',multi:false,options:[['editor','从编辑器开始','在界面里搭建与调整，按需借助 AI'],['cli','从 CLI 开始','借助 AI 执行任务，并在编辑器中验收']]},
 {key:'context',eyebrow:'05 / 创作场景',title:'这次是怎样创作的？',desc:'可多选；我们会加入相应的协作或提交指引。',multi:true,options:[['team','和团队一起做','需要分工、资产交接和整合'],['contest','参加活动或比赛','需要准备作品材料并核对提交要求'],['solo','自己做，暂不参赛','先专注完成自己的作品']]}
];
export function recommend(a) {
 const mode=a.mode?.[0];
 return [mode==='unity'?'unity':mode==='html'?'html':'official'];
}

export const masterclasses = [
 {id:'pirate',number:'01',category:'场景 × 玩法',description:'从主题规划到互动道具，看场景和玩法如何自然结合。'},
 {id:'tips',number:'02',category:'编辑器技巧',description:'从 AI 对话、组合节点到环境与交互点位的实用技巧。'},
 {id:'racing',number:'03',category:'竞速玩法',description:'学习驾驶体验、终点计时与重置逻辑的设计思路。'},
 {id:'colors',number:'04',category:'创意案例',description:'拆解色彩收集玩法、视觉提示词与场景生成顺序。'},
 {id:'component',number:'05',category:'互动组件',description:'从七类组件示例入手，探索如何修改和复用互动。'}
];
