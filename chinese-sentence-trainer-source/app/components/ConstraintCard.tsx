import { displayChinese } from "../lib/chinese";
import type { ChengyuItem, Level, PromptItem, RevealState, Script } from "../lib/types";

export function ConstraintCard({ number, label, item, sourceLevel, showLevel, reveals, script, locked, active, onLock, onToggleActive, grammar = false, accent = false }: {
  number: string; label: string; item: PromptItem | ChengyuItem; sourceLevel: Level; showLevel: boolean; reveals: RevealState; script: Script; locked: boolean; active: boolean; onLock: () => void; onToggleActive: () => void; grammar?: boolean; accent?: boolean;
}) {
  const isChengyu = "entryType" in item && item.entryType === "chengyu";
  return <article className={`constraint ${accent ? "accent" : ""} ${active ? "active" : "inactive"}`}>
    <div className="constraint-top"><span>{number} / {label}</span><div className="card-controls"><button onClick={onToggleActive} className={`use-button ${active ? "in-use" : "skipped"}`} aria-pressed={active}>{active ? "Use" : "Skipped"}</button><button onClick={onLock} className={`lock-button ${locked ? "locked" : ""}`} aria-label={`${locked ? "Unlock" : "Lock"} ${label}`} title={`${locked ? "Unlock" : "Lock"} this card`}><span aria-hidden="true">{locked ? "🔒" : "🔓"}</span>{locked ? "Locked" : "Lock"}</button></div></div>
    <div className="constraint-content">
      {showLevel && <span className={`source-level ${sourceLevel}`}>{sourceLevel}</span>}
      {isChengyu && <span className="chengyu-tag">CHENGYU · 成语</span>}
      {item.tag && <span className="literary-tag">{item.tag}</span>}
      <h3 className={grammar ? "grammar-title" : ""}>{displayChinese(item.zh, script)}</h3>
      {reveals.pinyin ? <p className="romanization">{item.py}</p> : <p className="recall-hidden">Pinyin hidden</p>}
      {reveals.meaning ? <><p className="translation">{item.en}</p>{isChengyu && <div className="chengyu-meaning"><span>LITERAL IMAGE</span><p>{item.literal}</p><span>REGISTER & ROLE</span><p>{item.registerNote} {item.usageRole}</p></div>}</> : <p className="recall-hidden">Meaning hidden</p>}
      {accent && reveals.collocations && (isChengyu ? item.commonFrames : item.collocations) && <div className="collocations"><span>{isChengyu ? "COMMON FRAMES" : "COLLOCATIONS"}</span>{(isChengyu ? item.commonFrames : item.collocations ?? []).map(value => <b key={value}>{displayChinese(value, script)}</b>)}</div>}
    </div>
    <span className="corner">{active ? (locked ? "REQUIRED · LOCKED" : "REQUIRED THIS ROUND") : "OPTIONAL · CLICK USE TO ADD"}</span>
  </article>;
}
