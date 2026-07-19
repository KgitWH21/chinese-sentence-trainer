import type { RevealState } from "../lib/types";

const revealOptions: { key: keyof RevealState; label: string }[] = [
  { key: "pinyin", label: "Pinyin" }, { key: "meaning", label: "Meaning" },
  { key: "collocations", label: "Collocations" }, { key: "model", label: "Model sentence" },
];

export function RecallPanel({ recall, reveals, onRecall, onReveal }: { recall: boolean; reveals: RevealState; onRecall: () => void; onReveal: (key: keyof RevealState) => void }) {
  return <div className={`recall-panel ${recall ? "active" : ""}`}>
    <div><span>RECALL MODE · 回忆模式</span><p>{recall ? "Clues begin hidden. Reveal only what you need." : "Turn recall mode on to hide every clue before writing."}</p></div>
    <button className="recall-switch" onClick={onRecall} aria-pressed={recall}>{recall ? "On" : "Off"}</button>
    <div className="reveal-buttons">{revealOptions.map(option => <button key={option.key} className={reveals[option.key] ? "revealed" : ""} onClick={() => onReveal(option.key)}>{reveals[option.key] ? "Hide" : "Reveal"} {option.label}</button>)}</div>
  </div>;
}
