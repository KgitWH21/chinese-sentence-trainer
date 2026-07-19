import type { Register } from "../lib/types";

export const registers: { id: Register; label: string; zh: string; note: string; checkerTip: string }[] = [
  { id: "conversation", label: "Conversation", zh: "口语", note: "Natural, direct language for everyday speech", checkerTip: "Prefer shorter clauses, ordinary connectors, and language that could be spoken comfortably." },
  { id: "formal", label: "Formal essay", zh: "正式文章", note: "Clear claims, concessions, causes, and conclusions", checkerTip: "Make the logical relationship between clauses explicit and avoid unsupported absolutes." },
  { id: "literary", label: "Literary prose", zh: "文学散文", note: "Image, rhythm, implication, and emotional precision", checkerTip: "A literary marker works best when the image or emotional turn earns its formality." },
  { id: "fiction", label: "Fiction / narration", zh: "小说叙事", note: "Action, perception, scene movement, and interiority", checkerTip: "Anchor abstract language in an action, perception, setting detail, or character response." },
  { id: "business", label: "Business", zh: "商务", note: "Concise decisions, plans, risks, and measurable results", checkerTip: "Name the actor, action, deadline, or outcome whenever the context permits." },
  { id: "academic", label: "Academic", zh: "学术", note: "Qualified claims, evidence, definitions, and analysis", checkerTip: "Prefer qualified claims such as 可能、表明、在一定程度上 over universal conclusions." },
  { id: "classical", label: "Classical Chinese", zh: "文言文", note: "A compact, classical-inspired challenge for advanced learners", checkerTip: "Avoid heavily modern phrasing such as 因为…所以…, 这个, 我们, 的, and sentence-final 了 when a classical form is intended." },
];
