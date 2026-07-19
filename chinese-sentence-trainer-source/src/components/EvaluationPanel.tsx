import type { Evaluation, GrammarItem, Script } from "../lib/types";
import { displayChinese } from "../lib/chinese";

export function EvaluationPanel({ evaluation, grammar, script }: { evaluation: Evaluation; grammar: GrammarItem; script: Script }) {
  const required = evaluation.checks.filter(check => check.required);
  const passed = required.filter(check => check.passed).length;
  return <section className="evaluation" aria-live="polite">
    <div className="evaluation-heading"><div><span>STRUCTURAL FEEDBACK · 结构反馈</span><h3>{passed} of {required.length} active constraints detected</h3></div><strong>{passed}/{required.length}</strong></div>
    <p className="honesty-note">This rule-based check can verify the challenge and flag likely issues. It cannot prove that unrestricted Chinese is fully grammatical or natural.</p>
    <div className="check-grid">{evaluation.checks.map(check => <article key={check.id} className={!check.required ? "skipped" : check.passed ? "pass" : "revise"}>
      <span>{!check.required ? "—" : check.passed ? "✓" : "↗"}</span><div><b>{check.label}</b><p>{check.detail}</p>{check.correction && <em>Light correction: {check.correction}</em>}</div>
    </article>)}</div>
    <div className="feedback-notes">
      <div><b>Grammar</b><p>{evaluation.grammar}</p></div>
      <div><b>Word order</b><p>{evaluation.wordOrder}</p></div>
      <div><b>Naturalness & register</b><p>{evaluation.naturalness}</p><em>{evaluation.registerTip}</em></div>
    </div>
    {evaluation.chengyuUsage && <div className="chengyu-feedback"><b>Chengyu usage check</b><p>{evaluation.chengyuUsage}</p>{evaluation.chengyuReview?.map(question => <label key={question}><input type="checkbox" /> {question}</label>)}</div>}
    {evaluation.checks.find(check => check.id === "grammar")?.required && grammar.review && <div className="self-review"><b>Ask yourself</b>{grammar.review.map(question => <label key={question}><input type="checkbox" /> {question}</label>)}</div>}
    <div className="pattern-reminder">PATTERN <code>{displayChinese(grammar.pattern, script)}</code></div>
  </section>;
}
