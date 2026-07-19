import * as OpenCC from "opencc-js";
import type { Script } from "./types";

const toTraditional = OpenCC.Converter({ from: "cn", to: "tw" });
const toSimplifiedConverter = OpenCC.Converter({ from: "tw", to: "cn" });

export function displayChinese(text: string, script: Script) {
  return script === "traditional" ? toTraditional(text) : text;
}

export function toSimplified(text: string) {
  return toSimplifiedConverter(text.normalize("NFKC"));
}

export function comparable(text: string) {
  return toSimplified(text)
    .replace(/……|…/g, "")
    .replace(/[\s，。！？；、：“”‘’（）,.!?;:'"()]/g, "")
    .trim();
}

export function countHanzi(text: string) {
  return (text.match(/[\u3400-\u9fff]/g) ?? []).length;
}
