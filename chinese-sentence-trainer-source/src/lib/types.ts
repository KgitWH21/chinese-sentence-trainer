export type Level = "beginner" | "intermediate" | "advanced";
export type Register = "conversation" | "formal" | "literary" | "fiction" | "business" | "academic" | "classical";
export type Script = "simplified" | "traditional";
export type PromptKind = "starters" | "grammar" | "endings" | "words";
export type VocabularyMode = "word" | "chengyu" | "mixed";

export type PromptItem = {
  zh: string;
  py: string;
  en: string;
  tag?: string;
  collocations?: string[];
};

export type GrammarItem = PromptItem & {
  id: string;
  pattern: string;
  example: string;
  examplePy: string;
  exampleEn: string;
  review?: string[];
};

export type ChengyuItem = PromptItem & {
  entryType: "chengyu";
  literal: string;
  registerNote: string;
  usageRole: string;
  commonFrames: string[];
  origin: string;
  warning: string;
  example: string;
  examplePy: string;
  minLevel: Level;
  review: string[];
  registers?: Register[];
};

export type PromptSet = {
  starters: PromptItem[];
  grammar: GrammarItem[];
  endings: PromptItem[];
  words: PromptItem[];
};

export type RevealState = {
  pinyin: boolean;
  meaning: boolean;
  collocations: boolean;
  model: boolean;
};

export type CheckResult = {
  id: "starter" | "grammar" | "ending" | "word";
  label: string;
  passed: boolean;
  required: boolean;
  detail: string;
  correction?: string;
};

export type Evaluation = {
  checks: CheckResult[];
  wordOrder: string;
  grammar: string;
  naturalness: string;
  registerTip: string;
  chengyuReview?: string[];
  chengyuUsage?: string;
};
