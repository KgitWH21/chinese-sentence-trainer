import { registers } from "../data/registers";
import { comparable, countHanzi, toSimplified } from "./chinese";
import type { ChengyuItem, Evaluation, GrammarItem, PromptItem, Register } from "./types";

type GrammarRule = { markers?: string[]; minimum?: number; resultMarkers?: string[]; custom?: (sentence: string) => boolean; orderTip: string };

const rules: Record<string, GrammarRule> = {
  svo: { minimum: 6, orderTip: "Look for a clear actor, action, and object in that order." },
  shi: { markers: ["是"], orderTip: "Place the item being identified before 是 and its identity or category after it." },
  hen: { markers: ["很"], orderTip: "Place 很 before the adjective or state." },
  location: { markers: ["在"], orderTip: "In the prompted pattern, place 在 + location before the main action." },
  want: { custom: s => s.includes("想") || s.includes("要"), orderTip: "Place 想 or 要 before the action you intend to perform." },
  sequence: { markers: ["先", "然后"], orderTip: "The action after 先 should occur before the action after 然后." },
  ba: { markers: ["把"], resultMarkers: ["完", "好", "到", "在", "成", "给", "掉", "走", "开", "清楚", "了"], orderTip: "Use subject + 把 + specific object + action + result. The checker also looks for a result or completion marker." },
  bei: { markers: ["被"], orderTip: "Place the affected person or thing before 被, then the agent or action." },
  yibian: { custom: s => (s.match(/一边/g) ?? []).length >= 2, orderTip: "Give each 一边 its own simultaneous action." },
  budan: { markers: ["不但", "而且"], orderTip: "Place the first quality after 不但 and the added or stronger quality after 而且." },
  yuelaiyue: { markers: ["越来越"], orderTip: "Place the changing quality immediately after 越来越." },
  chule: { markers: ["除了", "以外", "还"], orderTip: "Name the original category after 除了, close it with 以外, then add something after 还." },
  reason: { markers: ["之所以", "是因为"], orderTip: "Put the known result after 之所以 and its explanation after 是因为." },
  yuqi: { markers: ["与其", "不如"], orderTip: "Put the rejected option after 与其 and the preferred option after 不如." },
  napa: { markers: ["哪怕", "也"], orderTip: "Put the extreme condition after 哪怕 and the unchanged outcome after 也." },
  feidan: { markers: ["非但", "反而"], orderTip: "State the failed expectation after 非但 and the contrary outcome after 反而." },
  wulun: { markers: ["无论", "都"], orderTip: "Put the variable condition after 无论 and the stable result after 都." },
  jiran: { markers: ["既然", "就"], orderTip: "Place the accepted fact after 既然 and its logical response after 就." },
  chengran: { markers: ["诚然", "然而"], orderTip: "Concede a genuine point after 诚然, then make the more important turn after 然而." },
  wuning: { markers: ["与其说", "毋宁说"], orderTip: "Place the surface interpretation after 与其说 and the deeper reinterpretation after 毋宁说." },
  weichang: { markers: ["未尝不"], orderTip: "Keep 未尝不 together before the restrained affirmation." },
  hechang: { markers: ["何尝不是"], orderTip: "Use 何尝不是 before the interpretation you are rhetorically affirming." },
  yize: { markers: ["一则", "二则"], orderTip: "Give one distinct reason after each marker." },
  ruofei: { markers: ["若非", "恐怕"], orderTip: "Put the absent condition after 若非 and the feared counterfactual result after 恐怕." },
  yijiu: { markers: ["一", "就"], orderTip: "Place the triggering event after 一 and its immediate result after 就." },
  yifang: { markers: ["一方面", "另一方面"], orderTip: "Give each side of the issue a separate, parallel clause." },
  fangfo: { markers: ["仿佛", "一般"], orderTip: "Put the comparison image between 仿佛 and 一般." },
  zhidao: { markers: ["直到", "才"], orderTip: "Place the delaying event after 直到 and the eventual result after 才." },
  yidan: { markers: ["一旦", "便"], orderTip: "Put the condition after 一旦 and its consequence after 便." },
  zaikuangjia: { markers: ["在", "框架下"], orderTip: "Name the theory or analytical system between 在 and 框架下." },
  suiran_classical: { markers: ["虽", "然"], orderTip: "State the concession after 虽 and the contrasting judgment after 然." },
  feiye: { markers: ["非", "也"], orderTip: "Place the rejected identification between 非 and sentence-final 也." },
};

function markersInOrder(sentence: string, markers: string[]) {
  let cursor = 0;
  for (const marker of markers) {
    const index = sentence.indexOf(marker, cursor);
    if (index < 0) return false;
    cursor = index + marker.length;
  }
  return true;
}

function hasClauseContent(sentence: string, markers: string[]) {
  if (markers.length < 2) return true;
  let cursor = sentence.indexOf(markers[0]) + markers[0].length;
  for (let i = 1; i < markers.length; i++) {
    const next = sentence.indexOf(markers[i], cursor);
    if (next < 0 || comparable(sentence.slice(cursor, next)).length < 1) return false;
    cursor = next + markers[i].length;
  }
  return comparable(sentence.slice(cursor)).length >= 1;
}

function evaluateGrammar(sentence: string, grammar: GrammarItem) {
  const rule = rules[grammar.id] ?? { minimum: 5, orderTip: `Follow this order: ${grammar.pattern}` };
  if (rule.custom) return { passed: rule.custom(sentence), detail: rule.orderTip };
  if (rule.minimum && countHanzi(sentence) < rule.minimum) return { passed: false, detail: rule.orderTip };
  if (rule.markers && (!markersInOrder(sentence, rule.markers) || !hasClauseContent(sentence, rule.markers))) return { passed: false, detail: rule.orderTip };
  if (rule.resultMarkers && !rule.resultMarkers.some(marker => sentence.includes(marker))) return { passed: false, detail: rule.orderTip };
  return { passed: true, detail: rule.orderTip };
}

function registerNaturalness(sentence: string, register: Register) {
  const simplified = toSimplified(sentence);
  const registerTip = registers.find(item => item.id === register)?.checkerTip ?? "Review whether the register matches your intended reader.";
  if (register === "classical" && ["因为", "所以", "这个", "我们", "觉得"].some(word => simplified.includes(word))) {
    return { naturalness: "The construction may be structurally complete, but the sentence contains conspicuously modern phrasing for a Classical Chinese challenge.", registerTip };
  }
  if (register === "conversation" && ["毋宁", "未尝", "一则", "二则"].some(word => simplified.includes(word))) {
    return { naturalness: "No hard grammar error is proven, but these formal or literary markers may sound elevated in ordinary conversation.", registerTip };
  }
  if (!/[。！？；.!?]$/.test(sentence.trim())) {
    return { naturalness: "No obvious register conflict was detected. Consider adding final punctuation so the sentence reads as complete written Chinese.", registerTip };
  }
  return { naturalness: "No obvious register conflict was detected by the rule-based checker. Read the sentence aloud and use the review prompt below to judge meaning and rhythm.", registerTip };
}

export function evaluateSentence(answer: string, starter: PromptItem, grammar: GrammarItem, ending: PromptItem, word: PromptItem | ChengyuItem, register: Register, activeCards: boolean[]): Evaluation {
  const sentence = toSimplified(answer).trim();
  const cleanSentence = comparable(sentence);
  const starterText = comparable(starter.zh);
  const endingText = comparable(ending.zh);
  const wordText = comparable(word.zh);
  const grammarResult = evaluateGrammar(sentence, grammar);

  const starterPassed = cleanSentence.startsWith(starterText);
  const endingPassed = cleanSentence.endsWith(endingText);
  const wordPassed = cleanSentence.includes(wordText);
  const isChengyu = "entryType" in word && word.entryType === "chengyu";
  const separatedChengyu = isChengyu && !wordPassed && [...wordText].every(character => cleanSentence.includes(character));
  const followedByDe = isChengyu && sentence.includes(`${word.zh}的`);
  const naturalness = registerNaturalness(answer, register);

  return {
    checks: [
      { id: "starter" as const, label: "Sentence starter", passed: starterPassed, required: activeCards[0], detail: starterPassed ? `The sentence begins with ${starter.zh.replace(/[…，。]/g, "")}.` : "The required opening was not detected.", correction: starterPassed ? undefined : `Keep your wording, but restore “${starter.zh.replace(/…/g, "")}” at the beginning.` },
      { id: "grammar" as const, label: "Construction", passed: grammarResult.passed, required: activeCards[1], detail: grammarResult.passed ? `The surface markers for ${grammar.zh} appear in a workable order.` : "The required markers or clause order were not fully detected.", correction: grammarResult.passed ? undefined : grammarResult.detail },
      { id: "ending" as const, label: "Sentence ending", passed: endingPassed, required: activeCards[2], detail: endingPassed ? `The required ending is present.` : "The required final wording was not detected.", correction: endingPassed ? undefined : `Preserve your sentence and finish with “${ending.zh.replace(/…/g, "")}”.` },
      { id: "word" as const, label: isChengyu ? "Target Chengyu" : "Target word", passed: wordPassed, required: activeCards[3], detail: wordPassed ? `${isChengyu ? "The Chengyu" : "The target word"} ${word.zh} appears intact.` : separatedChengyu ? `All four characters appear, but ${word.zh} was not found as one intact expression.` : `${isChengyu ? "The Chengyu" : "The target word"} ${word.zh} was not detected.`, correction: wordPassed ? undefined : isChengyu ? `Keep the four characters together as “${word.zh}” and place the complete expression where its meaning fits.` : `Add “${word.zh}” where its meaning fits; do not rebuild the entire sentence around it.` },
    ].map(check => check.required ? check : { ...check, passed: true, detail: "This card was optional for this challenge.", correction: undefined }),
    wordOrder: activeCards[1] ? grammarResult.detail : "The construction card was optional, so its marker order was not scored.",
    grammar: activeCards[1] ? grammar.en : "The construction was optional this round. You may still use it for extra practice.",
    naturalness: naturalness.naturalness,
    registerTip: naturalness.registerTip,
    chengyuReview: isChengyu && activeCards[3] ? word.review : undefined,
    chengyuUsage: isChengyu && activeCards[3] ? `${wordPassed ? "The four-character expression is intact. " : "The complete expression still needs to be inserted. "}${word.usageRole}${followedByDe && !word.usageRole.toLowerCase().includes("attributive") ? " The checker noticed 的 immediately after the Chengyu; confirm that an attributive use is natural for this expression." : ""} Misuse warning: ${word.warning}` : undefined,
  };
}
