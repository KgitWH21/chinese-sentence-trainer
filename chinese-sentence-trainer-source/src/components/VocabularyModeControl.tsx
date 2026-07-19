import type { Level, VocabularyMode } from "../lib/types";

const modes: { id: VocabularyMode; label: string; zh: string }[] = [
  { id: "word", label: "Words", zh: "词语" },
  { id: "chengyu", label: "Chengyu", zh: "成语" },
  { id: "mixed", label: "Mixed", zh: "混合" },
];

const frequency: Record<Level, number> = { beginner: 10, intermediate: 25, advanced: 40 };

export function VocabularyModeControl({ mode, level, onChange }: { mode: VocabularyMode; level: Level; onChange: (mode: VocabularyMode) => void }) {
  return <section className="vocabulary-mode">
    <div><span>VOCABULARY FOCUS · 词汇重点</span><p>{mode === "mixed" ? `At ${level} level, approximately ${frequency[level]}% of target draws are Chengyu.` : mode === "chengyu" ? "Every target draw uses the curated Chengyu collection." : "Target draws use the level-based word collection."}</p></div>
    <div className="mode-buttons">{modes.map(item => <button key={item.id} className={mode === item.id ? "active" : ""} onClick={() => onChange(item.id)} aria-pressed={mode === item.id}><b>{item.label}</b><small>{item.zh}</small></button>)}</div>
  </section>;
}
