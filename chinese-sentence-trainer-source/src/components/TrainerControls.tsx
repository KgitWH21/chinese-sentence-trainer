import { levels } from "../data/content";
import { registers } from "../data/registers";
import type { Level, Register, Script } from "../lib/types";

export function TrainerControls({ level, register, script, onLevel, onRegister }: { level: Level; register: Register; script: Script; onLevel: (level: Level) => void; onRegister: (register: Register) => void }) {
  const currentRegister = registers.find(item => item.id === register)!;
  return <div className="control-stack">
    <div className="level-panel" aria-label="Choose difficulty">
      <div className="level-heading"><span>Choose your level</span><strong>{levels.findIndex(x => x.id === level) + 1}<i>/3</i></strong></div>
      <div className="levels">{levels.map((option, i) => <button key={option.id} onClick={() => onLevel(option.id)} className={level === option.id ? "active" : ""} aria-pressed={level === option.id}>
        <span className="level-num">0{i + 1}</span><span><b>{option.label}</b><small>{option.zh}</small></span>
      </button>)}</div>
      <p>{levels.find(x => x.id === level)?.note}</p>
    </div>
    <div className="register-control">
      <label htmlFor="register">Writing register · 文体</label>
      <select id="register" value={register} onChange={event => onRegister(event.target.value as Register)}>
        {registers.map(item => <option key={item.id} value={item.id}>{item.label} · {item.zh}</option>)}
      </select>
      <p>{currentRegister.note}{register === "classical" && level !== "advanced" ? ` · Classical mode uses its own advanced prompt pool.` : ""}</p>
      <span className="script-readout">Displaying {script} characters</span>
    </div>
  </div>;
}
