import { useMemo, useState } from "react";
import { ConstraintCard } from "./components/ConstraintCard";
import { EvaluationPanel } from "./components/EvaluationPanel";
import { RecallPanel } from "./components/RecallPanel";
import { TrainerControls } from "./components/TrainerControls";
import { VocabularyModeControl } from "./components/VocabularyModeControl";
import { chengyuFor } from "./data/chengyu";
import { levels, promptSetFor } from "./data/content";
import { displayChinese } from "./lib/chinese";
import { evaluateSentence } from "./lib/validation";
import type { ChengyuItem, Evaluation, GrammarItem, Level, PromptItem, PromptKind, Register, RevealState, Script, VocabularyMode } from "./lib/types";

const kinds: PromptKind[] = ["starters", "grammar", "endings", "words"];

function pick(length: number, previous?: number) {
  if (length < 2) return 0;
  let next = Math.floor(Math.random() * length);
  while (next === previous) next = Math.floor(Math.random() * length);
  return next;
}

function randomActiveMask() {
  const roll = Math.random();
  const requiredCount = roll < 0.25 ? 2 : roll < 0.75 ? 3 : 4;
  const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  return [0, 1, 2, 3].map(index => order.slice(0, requiredCount).includes(index));
}

const chengyuFrequency: Record<Level, number> = { beginner: 0.1, intermediate: 0.25, advanced: 0.4 };

function chooseChengyu(mode: VocabularyMode, level: Level) {
  if (mode === "chengyu") return true;
  if (mode === "word") return false;
  return Math.random() < chengyuFrequency[level];
}

const normalReveals: RevealState = { pinyin: true, meaning: true, collocations: false, model: false };
const hiddenReveals: RevealState = { pinyin: false, meaning: false, collocations: false, model: false };

export default function App() {
  const [level, setLevel] = useState<Level>("beginner");
  const [register, setRegister] = useState<Register>("conversation");
  const [script, setScript] = useState<Script>("simplified");
  const [indices, setIndices] = useState([0, 0, 0, 0]);
  const [cardLevels, setCardLevels] = useState<Level[]>(["beginner", "beginner", "beginner", "beginner"]);
  const [mixed, setMixed] = useState(false);
  const [locks, setLocks] = useState([false, false, false, false]);
  const [activeCards, setActiveCards] = useState([true, true, true, true]);
  const [vocabularyMode, setVocabularyMode] = useState<VocabularyMode>("mixed");
  const [targetIsChengyu, setTargetIsChengyu] = useState(false);
  const [recall, setRecall] = useState(false);
  const [reveals, setReveals] = useState<RevealState>(normalReveals);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const currentSet = promptSetFor(level, register);
  const items = useMemo(() => kinds.map((kind, index) => {
    const sourceSet = promptSetFor(cardLevels[index], register);
    if (index === 3 && targetIsChengyu) return chengyuFor(cardLevels[3], register)[indices[3]];
    return sourceSet[kind][indices[index]];
  }), [cardLevels, indices, register, targetIsChengyu]);

  const starter = items[0] as PromptItem;
  const grammar = items[1] as GrammarItem;
  const ending = items[2] as PromptItem;
  const word = items[3] as PromptItem | ChengyuItem;
  const isChengyu = "entryType" in word && word.entryType === "chengyu";
  const chengyuTarget = isChengyu ? word as ChengyuItem : null;

  function resetExercise(nextLevel: Level, nextRegister: Register) {
    const nextSet = promptSetFor(nextLevel, nextRegister);
    const useChengyu = chooseChengyu(vocabularyMode, nextLevel);
    setTargetIsChengyu(useChengyu);
    setIndices(kinds.map((kind, index) => pick(index === 3 && useChengyu ? chengyuFor(nextLevel, nextRegister).length : nextSet[kind].length)));
    setCardLevels([nextLevel, nextLevel, nextLevel, nextLevel]);
    setMixed(false);
    setLocks([false, false, false, false]);
    setActiveCards([true, true, true, true]);
    setAnswer("");
    setEvaluation(null);
    setReveals(recall ? hiddenReveals : normalReveals);
  }

  function changeVocabularyMode(next: VocabularyMode) {
    const useChengyu = chooseChengyu(next, cardLevels[3]);
    setVocabularyMode(next);
    setTargetIsChengyu(useChengyu);
    setIndices(old => old.map((value, index) => index === 3 ? pick(useChengyu ? chengyuFor(cardLevels[3], register).length : promptSetFor(cardLevels[3], register).words.length, value) : value));
    setLocks(old => old.map((value, index) => index === 3 ? false : value));
    setEvaluation(null);
    setReveals(recall ? hiddenReveals : normalReveals);
  }

  function changeLevel(next: Level) {
    setLevel(next);
    resetExercise(next, register);
  }

  function changeRegister(next: Register) {
    const nextLevel = next === "classical" ? "advanced" : level;
    setRegister(next);
    if (next === "classical") setLevel("advanced");
    resetExercise(nextLevel, next);
  }

  function roll() {
    const useChengyu = locks[3] ? targetIsChengyu : chooseChengyu(vocabularyMode, level);
    setTargetIsChengyu(useChengyu);
    setIndices(old => old.map((value, index) => locks[index] ? value : pick(index === 3 && useChengyu ? chengyuFor(level, register).length : currentSet[kinds[index]].length, value)));
    setCardLevels(old => old.map((source, index) => locks[index] ? source : level));
    setMixed(false);
    setActiveCards(randomActiveMask());
    setEvaluation(null);
    setReveals(recall ? hiddenReveals : normalReveals);
  }

  function rollAllLevels() {
    const sources = cardLevels.map((source, index) => locks[index] ? source : levels[Math.floor(Math.random() * levels.length)].id);
    setCardLevels(sources);
    const useChengyu = locks[3] ? targetIsChengyu : chooseChengyu(vocabularyMode, sources[3]);
    setTargetIsChengyu(useChengyu);
    setIndices(old => old.map((value, index) => locks[index] ? value : pick(index === 3 && useChengyu ? chengyuFor(sources[3], register).length : promptSetFor(sources[index], register)[kinds[index]].length)));
    setMixed(true);
    setActiveCards(randomActiveMask());
    setEvaluation(null);
    setReveals(recall ? hiddenReveals : normalReveals);
  }

  function toggleRecall() {
    setRecall(current => {
      setReveals(current ? normalReveals : hiddenReveals);
      return !current;
    });
  }

  function toggleReveal(key: keyof RevealState) {
    setReveals(current => ({ ...current, [key]: !current[key] }));
  }

  function checkSentence() {
    if (!answer.trim()) return;
    setEvaluation(evaluateSentence(answer, starter, grammar, ending, word, register, activeCards));
  }

  const grammarLevel = cardLevels[1];
  const targetLength = grammarLevel === "beginner" ? 18 : grammarLevel === "intermediate" ? 32 : 48;
  const score = answer.trim().length ? Math.min(100, Math.round(answer.replace(/\s/g, "").length / targetLength * 100)) : 0;

  return <main>
    <header className="topbar">
      <a className="brand" href="#top"><span className="seal">句</span><span>Chinese Sentence Trainer<small>{displayChinese("中文造句练习", script)}</small></span></a>
      <div className="header-controls">
        <div className="script-toggle" aria-label="Chinese character set">
          <button className={script === "simplified" ? "active" : ""} onClick={() => setScript("simplified")}>简</button>
          <button className={script === "traditional" ? "active" : ""} onClick={() => setScript("traditional")}>繁</button>
        </div>
        <span className={`recall-indicator ${recall ? "on" : ""}`}>{recall ? "Recall on" : "Study mode"}</span>
      </div>
    </header>

    <section id="top" className="hero">
      <div className="hero-copy"><p className="eyebrow">DAILY CONSTRUCTION PRACTICE · {displayChinese("每日造句", script)}</p><h1>Build one sentence.<br/><em>Write great Chinese.</em></h1><p>Draw a starter, a grammar construction, an ending, and a word. There are countless right answers—the constraint is the teacher.</p></div>
      <TrainerControls level={level} register={register} script={script} onLevel={changeLevel} onRegister={changeRegister} />
    </section>

    <section className="workspace">
      <RecallPanel recall={recall} reveals={reveals} onRecall={toggleRecall} onReveal={toggleReveal} />
      <VocabularyModeControl mode={vocabularyMode} level={level} onChange={changeVocabularyMode} />
      <div className="challenge-head">
        <div><p className="eyebrow">TODAY’S CHALLENGE {mixed && `· ${displayChinese("全级随机", script)}`}</p><h2>{activeCards.every(Boolean) ? "Use all four constraints" : `Use ${activeCards.filter(Boolean).length} of 4 constraints`}</h2></div>
        <div className="draw-actions"><button className="roll all-levels" onClick={rollAllLevels} disabled={register === "classical"} title={register === "classical" ? "Classical Chinese uses its own dedicated advanced pool" : undefined}><span>✦</span> Random from all levels</button><button className="roll" onClick={roll}><span>↻</span> Draw new challenge</button></div>
      </div>

      <div className="cards">
        <ConstraintCard number="01" label="Sentence starter" item={starter} sourceLevel={cardLevels[0]} showLevel={mixed} reveals={reveals} script={script} locked={locks[0]} active={activeCards[0]} onToggleActive={() => { setActiveCards(old => old.map((v, i) => i === 0 ? !v : v)); setEvaluation(null); }} onLock={() => setLocks(old => old.map((v, i) => i === 0 ? !v : v))} />
        <ConstraintCard number="02" label="Construction" item={grammar} sourceLevel={cardLevels[1]} showLevel={mixed} reveals={reveals} script={script} locked={locks[1]} active={activeCards[1]} onToggleActive={() => { setActiveCards(old => old.map((v, i) => i === 1 ? !v : v)); setEvaluation(null); }} onLock={() => setLocks(old => old.map((v, i) => i === 1 ? !v : v))} grammar />
        <ConstraintCard number="03" label="Sentence ending" item={ending} sourceLevel={cardLevels[2]} showLevel={mixed} reveals={reveals} script={script} locked={locks[2]} active={activeCards[2]} onToggleActive={() => { setActiveCards(old => old.map((v, i) => i === 2 ? !v : v)); setEvaluation(null); }} onLock={() => setLocks(old => old.map((v, i) => i === 2 ? !v : v))} />
        <ConstraintCard number="04" label={isChengyu ? "Target Chengyu" : "Target word"} item={word} sourceLevel={cardLevels[3]} showLevel={mixed} reveals={reveals} script={script} locked={locks[3]} active={activeCards[3]} onToggleActive={() => { setActiveCards(old => old.map((v, i) => i === 3 ? !v : v)); setEvaluation(null); }} onLock={() => setLocks(old => old.map((v, i) => i === 3 ? !v : v))} accent />
      </div>

      <div className={`grammar-note ${recall && !reveals.meaning ? "concealed" : ""}`}><div className="book-icon">文</div><div><span>HOW THIS CONSTRUCTION WORKS</span>{recall && !reveals.meaning ? <p>Grammar explanation hidden for recall.</p> : <><p>{grammar.en}</p><code>{displayChinese(grammar.pattern, script)}</code></>}</div></div>

      <div className="writing-card">
        <div className="writing-top"><div><p className="eyebrow">YOUR SENTENCE · {displayChinese("你的句子", script)}</p><h2>Make the pieces your own.</h2></div><span className="soft-score">{score}% length target</span></div>
        <textarea value={answer} onChange={event => { setAnswer(event.target.value); setEvaluation(null); }} placeholder={displayChinese("在这里写你的句子……", script)} aria-label="Write your Chinese sentence" />
        <div className="writing-actions"><span>{answer.replace(/\s/g, "").length} characters</span><div><button className="example-button" onClick={() => toggleReveal("model")}>{reveals.model ? "Hide" : "Reveal"} model sentence</button><button className="check-button" onClick={checkSentence} disabled={!answer.trim()}>Check my sentence</button></div></div>
        {reveals.model && <div className="example"><span>{chengyuTarget ? "CHENGYU MODEL" : "CONSTRUCTION MODEL"}</span><div><b>{displayChinese(chengyuTarget ? chengyuTarget.example : grammar.example, script)}</b>{reveals.pinyin && <small>{chengyuTarget ? chengyuTarget.examplePy : grammar.examplePy}</small>}{reveals.meaning && <p>{chengyuTarget ? `${chengyuTarget.en} · ${chengyuTarget.warning}` : grammar.exampleEn}</p>}</div></div>}
      </div>

      {evaluation && <EvaluationPanel evaluation={evaluation} grammar={grammar} script={script} />}
    </section>
    <footer><span>句</span><p>One sentence a day is still a body of work.<small>{displayChinese("每日一句，也能积少成多。", script)}</small></p></footer>
  </main>;
}
