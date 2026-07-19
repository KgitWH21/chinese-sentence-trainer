import type { Level, PromptSet, Register } from "../lib/types";

export const levels: { id: Level; label: string; zh: string; note: string }[] = [
  { id: "beginner", label: "Beginner", zh: "初级", note: "Clear subjects, verbs, objects, time and place" },
  { id: "intermediate", label: "Intermediate", zh: "中级", note: "Linked clauses, comparisons, 把 / 被 and aspect" },
  { id: "advanced", label: "Advanced", zh: "高级", note: "Formal connectors, emphasis and nuanced logic" },
];

export const content: Record<Level, PromptSet> = {
  beginner: {
    starters: [
      { zh: "我", py: "wǒ", en: "I" }, { zh: "我的朋友", py: "wǒ de péngyou", en: "my friend" },
      { zh: "今天早上，我", py: "jīntiān zǎoshang, wǒ", en: "this morning, I" }, { zh: "下课以后，我们", py: "xiàkè yǐhòu, wǒmen", en: "after class, we" },
      { zh: "星期六，我的家人", py: "xīngqīliù, wǒ de jiārén", en: "on Saturday, my family" }, { zh: "在学校，老师", py: "zài xuéxiào, lǎoshī", en: "at school, the teacher" },
    ],
    grammar: [
      { id: "svo", zh: "主语 + 动词 + 宾语", py: "zhǔyǔ + dòngcí + bīnyǔ", en: "Subject + verb + object. Keep the action direct and clear.", pattern: "谁 + 做什么 + 什么", example: "我每天学习中文。", examplePy: "Wǒ měitiān xuéxí Zhōngwén.", exampleEn: "I study Chinese every day.", review: ["Can you identify who acts, the action, and what receives the action?"] },
      { id: "shi", zh: "主语 + 是 + 名词", py: "zhǔyǔ + shì + míngcí", en: "Use 是 to identify or classify a person or thing.", pattern: "A + 是 + B", example: "王老师是我的中文老师。", examplePy: "Wáng lǎoshī shì wǒ de Zhōngwén lǎoshī.", exampleEn: "Teacher Wang is my Chinese teacher." },
      { id: "hen", zh: "主语 + 很 + 形容词", py: "zhǔyǔ + hěn + xíngróngcí", en: "In a simple description, 很 naturally links the subject and adjective.", pattern: "谁/什么 + 很 + 怎么样", example: "今天的天气很好。", examplePy: "Jīntiān de tiānqì hěn hǎo.", exampleEn: "Today's weather is nice." },
      { id: "location", zh: "主语 + 在 + 地点 + 动词", py: "zhǔyǔ + zài + dìdiǎn + dòngcí", en: "Put the location before the action.", pattern: "谁 + 在哪里 + 做什么", example: "我们在图书馆看书。", examplePy: "Wǒmen zài túshūguǎn kàn shū.", exampleEn: "We read at the library." },
      { id: "want", zh: "主语 + 想 / 要 + 动词", py: "zhǔyǔ + xiǎng / yào + dòngcí", en: "Use 想 for a wish and 要 for a firmer intention.", pattern: "谁 + 想/要 + 做什么", example: "我想买一本新书。", examplePy: "Wǒ xiǎng mǎi yì běn xīn shū.", exampleEn: "I want to buy a new book." },
      { id: "sequence", zh: "先……，然后……", py: "xiān…, ránhòu…", en: "Place two actions in a simple sequence: first, then.", pattern: "先 + 动作一，然后 + 动作二", example: "我先吃饭，然后做作业。", examplePy: "Wǒ xiān chīfàn, ránhòu zuò zuòyè.", exampleEn: "First I eat, then I do homework." },
    ],
    endings: [
      { zh: "……在家。", py: "…zài jiā.", en: "…at home." }, { zh: "……每天。", py: "…měitiān.", en: "…every day." },
      { zh: "……和我的朋友一起。", py: "…hé wǒ de péngyou yìqǐ.", en: "…together with my friend." }, { zh: "……因为很好吃。", py: "…yīnwèi hěn hǎochī.", en: "…because it is delicious." },
      { zh: "……但是今天不行。", py: "…dànshì jīntiān bù xíng.", en: "…but today won't work." }, { zh: "……晚上八点。", py: "…wǎnshang bā diǎn.", en: "…at eight in the evening." },
    ],
    words: [
      { zh: "喜欢", py: "xǐhuan", en: "to like", collocations: ["喜欢看书", "很喜欢", "喜欢的人"] }, { zh: "准备", py: "zhǔnbèi", en: "to prepare", collocations: ["准备考试", "准备好", "正在准备"] },
      { zh: "觉得", py: "juéde", en: "to feel / think", collocations: ["我觉得", "觉得很难", "你觉得呢"] }, { zh: "一起", py: "yìqǐ", en: "together", collocations: ["一起吃饭", "和朋友一起", "一起学习"] },
      { zh: "重要", py: "zhòngyào", en: "important", collocations: ["很重要", "重要的事情", "最重要的是"] }, { zh: "有时候", py: "yǒushíhou", en: "sometimes", collocations: ["有时候会", "我有时候", "有时候也"] },
    ],
  },
  intermediate: {
    starters: [
      { zh: "虽然大家都很累，", py: "suīrán dàjiā dōu hěn lèi,", en: "although everyone was tired," }, { zh: "跟以前相比，", py: "gēn yǐqián xiāngbǐ,", en: "compared with before," },
      { zh: "为了提高中文水平，", py: "wèile tígāo Zhōngwén shuǐpíng,", en: "in order to improve my Chinese," }, { zh: "听到这个消息以后，", py: "tīngdào zhège xiāoxi yǐhòu,", en: "after hearing this news," },
      { zh: "如果明天天气好的话，", py: "rúguǒ míngtiān tiānqì hǎo de huà,", en: "if the weather is good tomorrow," }, { zh: "对我来说，", py: "duì wǒ láishuō,", en: "as far as I am concerned," },
    ],
    grammar: [
      { id: "ba", zh: "把字句", py: "bǎ zìjù", en: "Use 把 when the action changes, moves, or deals with a specific object.", pattern: "主语 + 把 + 宾语 + 动词 + 结果", example: "我把报告写完了。", examplePy: "Wǒ bǎ bàogào xiěwán le.", exampleEn: "I finished writing the report.", review: ["Is the object after 把 specific or already known?", "Does the action produce a result?"] },
      { id: "bei", zh: "被字句", py: "bèi zìjù", en: "Use 被 to foreground the person or thing affected by an action.", pattern: "受事 + 被 + 人 + 动词", example: "我的自行车被弟弟骑走了。", examplePy: "Wǒ de zìxíngchē bèi dìdi qízǒu le.", exampleEn: "My bicycle was ridden away by my younger brother." },
      { id: "yibian", zh: "一边……一边……", py: "yìbiān… yìbiān…", en: "Describe two actions happening at the same time.", pattern: "一边 + 动作一，一边 + 动作二", example: "她一边做饭，一边听播客。", examplePy: "Tā yìbiān zuòfàn, yìbiān tīng bōkè.", exampleEn: "She listens to a podcast while cooking." },
      { id: "budan", zh: "不但……而且……", py: "búdàn… érqiě…", en: "Add a second, usually stronger, related point.", pattern: "不但 + 情况一，而且 + 情况二", example: "这本书不但有趣，而且很实用。", examplePy: "Zhè běn shū búdàn yǒuqù, érqiě hěn shíyòng.", exampleEn: "This book is not only interesting but also practical." },
      { id: "yuelaiyue", zh: "越来越……", py: "yuèláiyuè…", en: "Show a continuing change in degree.", pattern: "主语 + 越来越 + 形容词", example: "我觉得发音越来越自然了。", examplePy: "Wǒ juéde fāyīn yuèláiyuè zìrán le.", exampleEn: "I feel my pronunciation is becoming more natural." },
      { id: "chule", zh: "除了……以外，还……", py: "chúle… yǐwài, hái…", en: "Add something beyond the first item.", pattern: "除了 + A + 以外，还 + B", example: "除了中文以外，他还会说日语。", examplePy: "Chúle Zhōngwén yǐwài, tā hái huì shuō Rìyǔ.", exampleEn: "Besides Chinese, he also speaks Japanese." },
    ],
    endings: [
      { zh: "……才发现自己错了。", py: "…cái fāxiàn zìjǐ cuò le.", en: "…only then realized I was wrong." }, { zh: "……结果比预想的好。", py: "…jiéguǒ bǐ yùxiǎng de hǎo.", en: "…and the result was better than expected." },
      { zh: "……连老师都很惊讶。", py: "…lián lǎoshī dōu hěn jīngyà.", en: "…even the teacher was surprised." }, { zh: "……所以只好改变计划。", py: "…suǒyǐ zhǐhǎo gǎibiàn jìhuà.", en: "…so there was no choice but to change the plan." },
      { zh: "……已经有两年了。", py: "…yǐjīng yǒu liǎng nián le.", en: "…for two years already." }, { zh: "……对未来更有信心了。", py: "…duì wèilái gèng yǒu xìnxīn le.", en: "…became more confident about the future." },
    ],
    words: [
      { zh: "适应", py: "shìyìng", en: "to adapt", collocations: ["适应环境", "逐渐适应", "难以适应"] }, { zh: "经验", py: "jīngyàn", en: "experience", collocations: ["工作经验", "积累经验", "根据经验"] },
      { zh: "顺利", py: "shùnlì", en: "smoothly", collocations: ["进展顺利", "顺利完成", "一切顺利"] }, { zh: "值得", py: "zhíde", en: "to be worth", collocations: ["值得考虑", "值得一看", "不值得"] },
      { zh: "逐渐", py: "zhújiàn", en: "gradually", collocations: ["逐渐习惯", "逐渐增加", "逐渐意识到"] }, { zh: "解决", py: "jiějué", en: "to solve", collocations: ["解决问题", "彻底解决", "及时解决"] },
    ],
  },
  advanced: {
    starters: [
      { zh: "从长远来看，", py: "cóng chángyuǎn láikàn,", en: "in the long run," }, { zh: "不可否认的是，", py: "bùkě fǒurèn de shì,", en: "what cannot be denied is that…" },
      { zh: "乍一看，", py: "zhà yí kàn,", en: "at first glance," }, { zh: "考虑到现实情况，", py: "kǎolǜ dào xiànshí qíngkuàng,", en: "considering the actual circumstances," },
      { zh: "与其说这是失败，", py: "yǔqí shuō zhè shì shībài,", en: "rather than calling this a failure," }, { zh: "在某种程度上，", py: "zài mǒu zhǒng chéngdù shàng,", en: "to a certain extent," },
      { zh: "殊不知，", py: "shū bù zhī,", en: "little did they know…", tag: "Literary prose · 文学表达" }, { zh: "诚然，", py: "chéngrán,", en: "admittedly…", tag: "Literary prose · 文学表达" },
      { zh: "倘若当初……", py: "tǎngruò dāngchū…", en: "if, back then…", tag: "Literary prose · 文学表达" }, { zh: "时至今日，", py: "shí zhì jīnrì,", en: "now that matters have reached the present day…", tag: "Literary prose · 文学表达" },
    ],
    grammar: [
      { id: "reason", zh: "之所以……是因为……", py: "zhī suǒyǐ… shì yīnwèi…", en: "Emphasize the reason for a known result.", pattern: "之所以 + 结果，是因为 + 原因", example: "他之所以进步得快，是因为每天都练习。", examplePy: "Tā zhī suǒyǐ jìnbù de kuài, shì yīnwèi měitiān dōu liànxí.", exampleEn: "The reason he improves quickly is that he practices every day." },
      { id: "yuqi", zh: "与其……不如……", py: "yǔqí… bùrú…", en: "Reject one option in favor of another.", pattern: "与其 + 选择一，不如 + 选择二", example: "与其一直担心，不如马上行动。", examplePy: "Yǔqí yìzhí dānxīn, bùrú mǎshàng xíngdòng.", exampleEn: "Rather than worry continuously, it would be better to act now." },
      { id: "napa", zh: "哪怕……也……", py: "nǎpà… yě…", en: "State that an outcome holds even under an extreme condition.", pattern: "哪怕 + 极端条件，也 + 不变结果", example: "哪怕只有十分钟，我也会坚持练习。", examplePy: "Nǎpà zhǐyǒu shí fēnzhōng, wǒ yě huì jiānchí liànxí.", exampleEn: "Even if I have only ten minutes, I will keep practicing." },
      { id: "feidan", zh: "非但……反而……", py: "fēidàn… fǎn'ér…", en: "Show that the outcome is the reverse of what was expected.", pattern: "非但 + 没有预期结果，反而 + 相反结果", example: "这次争论非但没有解决问题，反而加深了误会。", examplePy: "Zhè cì zhēnglùn fēidàn méiyǒu jiějué wèntí, fǎn'ér jiāshēn le wùhuì.", exampleEn: "The argument deepened the misunderstanding instead of solving it." },
      { id: "wulun", zh: "无论……都……", py: "wúlùn… dōu…", en: "State that the result stays true across every condition.", pattern: "无论 + 条件/疑问词，都 + 结果", example: "无论别人怎么评价，他都坚持自己的判断。", examplePy: "Wúlùn biérén zěnme píngjià, tā dōu jiānchí zìjǐ de pànduàn.", exampleEn: "No matter how others judge him, he sticks to his judgment." },
      { id: "jiran", zh: "既然……就……", py: "jìrán… jiù…", en: "Treat the first clause as an accepted fact and draw a logical response.", pattern: "既然 + 已知事实，就 + 决定/结论", example: "既然方向已经明确，就没有必要再犹豫。", examplePy: "Jìrán fāngxiàng yǐjīng míngquè, jiù méiyǒu bìyào zài yóuyù.", exampleEn: "Since the direction is clear, there is no need to hesitate." },
      { id: "chengran", zh: "诚然……然而……", py: "chéngrán… rán'ér…", en: "Concede a truth, then pivot to a complicating truth.", pattern: "诚然 + 让步，然而 + 转折", example: "诚然，记忆会褪色；然而，有些声音从未真正消失。", examplePy: "Chéngrán, jìyì huì tuìsè; rán'ér, yǒuxiē shēngyīn cóngwèi zhēnzhèng xiāoshī.", exampleEn: "Admittedly, memories fade; yet some voices never truly disappear.", tag: "Literary prose · 文学表达", review: ["Does the first clause genuinely concede something?", "Does the second clause complicate rather than merely repeat it?"] },
      { id: "wuning", zh: "与其说……毋宁说……", py: "yǔqí shuō… wúnìng shuō…", en: "Formally revise an interpretation.", pattern: "与其说 + 表面解释，毋宁说 + 更深解释", example: "与其说他害怕失败，毋宁说他害怕希望再次落空。", examplePy: "Yǔqí shuō tā hàipà shībài, wúnìng shuō tā hàipà xīwàng zàicì luòkōng.", exampleEn: "Rather than fearing failure, he feared having his hopes dashed again.", tag: "Literary prose · 文学表达" },
      { id: "weichang", zh: "未尝不……", py: "wèicháng bù…", en: "Use a restrained double negative to suggest that something is true.", pattern: "主语 + 未尝不 + 动词/形容词", example: "她的沉默未尝不是一种回答。", examplePy: "Tā de chénmò wèicháng bú shì yì zhǒng huídá.", exampleEn: "Her silence was, in its way, an answer.", tag: "Literary prose · 文学表达" },
      { id: "hechang", zh: "何尝不是……", py: "hécháng bú shì…", en: "Pose a rhetorical question that strongly implies agreement.", pattern: "事实 + 何尝不是 + 评价/解释", example: "一次体面的告别，何尝不是另一种成全？", examplePy: "Yí cì tǐmiàn de gàobié, hécháng bú shì lìng yì zhǒng chéngquán?", exampleEn: "How is a dignified farewell not also another form of grace?", tag: "Literary prose · 文学表达" },
      { id: "yize", zh: "一则……二则……", py: "yīzé… èrzé…", en: "Present two parallel reasons in a compact rhythm.", pattern: "一则 + 理由一，二则 + 理由二", example: "他迟迟没有动身，一则放心不下家人，二则仍对故乡心存眷恋。", examplePy: "Tā chíchí méiyǒu dòngshēn, yīzé fàngxin bú xià jiārén, èrzé réng duì gùxiāng xīncún juànliàn.", exampleEn: "He delayed leaving because of both family and attachment to home.", tag: "Literary prose · 文学表达" },
      { id: "ruofei", zh: "若非……恐怕……", py: "ruòfēi… kǒngpà…", en: "Use a literary-leaning counterfactual.", pattern: "若非 + 关键条件，恐怕 + 相反结果", example: "若非那封信及时寄到，他恐怕早已离开这座城。", examplePy: "Ruòfēi nà fēng xìn jíshí jìdào, tā kǒngpà zǎoyǐ líkāi zhè zuò chéng.", exampleEn: "Had the letter not arrived, he probably would have left.", tag: "Literary prose · 文学表达" },
    ],
    endings: [
      { zh: "……未必能从根本上解决问题。", py: "…wèibì néng cóng gēnběn shàng jiějué wèntí.", en: "…may not solve the problem at its root." }, { zh: "……反而暴露了更深层的矛盾。", py: "…fǎn'ér bàolù le gèng shēncéng de máodùn.", en: "…instead exposed a deeper contradiction." },
      { zh: "……这并不意味着我们应该放弃。", py: "…zhè bìng bù yìwèizhe wǒmen yīnggāi fàngqì.", en: "…this does not mean that we should give up." }, { zh: "……其影响至今仍不容忽视。", py: "…qí yǐngxiǎng zhìjīn réng bùróng hūshì.", en: "…its influence still cannot be ignored today." },
      { zh: "……最终取决于我们如何定义成功。", py: "…zuìzhōng qǔjué yú wǒmen rúhé dìngyì chénggōng.", en: "…ultimately depends on how we define success." }, { zh: "……也算是一种意料之外的收获。", py: "…yě suàn shì yì zhǒng yìliào zhī wài de shōuhuò.", en: "…can count as an unexpected gain." },
      { zh: "……仿佛一切从未发生。", py: "…fǎngfú yíqiè cóngwèi fāshēng.", en: "…as though none of it had ever happened.", tag: "Literary prose · 文学表达" }, { zh: "……徒留一室寂静。", py: "…tú liú yí shì jìjìng.", en: "…leaving behind only a roomful of silence.", tag: "Literary prose · 文学表达" },
    ],
    words: [
      { zh: "权衡", py: "quánhéng", en: "to weigh / balance", collocations: ["权衡利弊", "反复权衡", "综合权衡"] }, { zh: "局限", py: "júxiàn", en: "limitation", collocations: ["存在局限", "突破局限", "自身的局限"] },
      { zh: "忽视", py: "hūshì", en: "to overlook", collocations: ["不容忽视", "容易忽视", "忽视风险"] }, { zh: "前提", py: "qiántí", en: "premise / precondition", collocations: ["基本前提", "以此为前提", "前提条件"] },
      { zh: "取决于", py: "qǔjué yú", en: "to depend on", collocations: ["取决于情况", "最终取决于", "在很大程度上取决于"] }, { zh: "矛盾", py: "máodùn", en: "contradiction", collocations: ["内在矛盾", "产生矛盾", "化解矛盾"] },
      { zh: "眷恋", py: "juànliàn", en: "deep attachment", tag: "Literary diction · 文学用语", collocations: ["眷恋故乡", "心存眷恋", "无限眷恋"] }, { zh: "怅然", py: "chàngrán", en: "wistful and lost", tag: "Literary diction · 文学用语", collocations: ["怅然若失", "不免怅然", "怅然而归"] },
      { zh: "悄然", py: "qiǎorán", en: "quietly / without notice", tag: "Literary diction · 文学用语", collocations: ["悄然离去", "悄然发生", "悄然改变"] }, { zh: "恍若", py: "huǎngruò", en: "as if / seemingly", tag: "Literary diction · 文学用语", collocations: ["恍若隔世", "恍若梦境", "恍若昨日"] },
    ],
  },
};

export const registerPrompts: Record<Register, Partial<PromptSet>> = {
  conversation: {
    starters: [{ zh: "说实话，", py: "shuō shíhuà,", en: "honestly speaking," }],
    grammar: [{ id: "yijiu", zh: "一……就……", py: "yī… jiù…", en: "Show that one event happens immediately after another.", pattern: "一 + 条件/动作，就 + 结果", example: "我一回家就给你打电话。", examplePy: "Wǒ yì huí jiā jiù gěi nǐ dǎ diànhuà.", exampleEn: "I'll call you as soon as I get home." }],
    endings: [{ zh: "……你觉得呢？", py: "…nǐ juéde ne?", en: "…what do you think?" }],
    words: [{ zh: "顺便", py: "shùnbiàn", en: "by the way / conveniently", collocations: ["顺便问一下", "顺便买", "顺便看看"] }],
  },
  formal: {
    starters: [{ zh: "综合以上因素，", py: "zōnghé yǐshàng yīnsù,", en: "considering the above factors together," }],
    grammar: [{ id: "yifang", zh: "一方面……另一方面……", py: "yì fāngmiàn… lìng yì fāngmiàn…", en: "Present two dimensions of an issue in parallel.", pattern: "一方面 + 观点一，另一方面 + 观点二", example: "一方面要提高效率，另一方面也要控制风险。", examplePy: "Yì fāngmiàn yào tígāo xiàolǜ, lìng yì fāngmiàn yě yào kòngzhì fēngxiǎn.", exampleEn: "We must improve efficiency while also controlling risk." }],
    endings: [{ zh: "……仍有进一步讨论的必要。", py: "…réng yǒu jìnyíbù tǎolùn de bìyào.", en: "…still warrants further discussion." }],
    words: [{ zh: "考量", py: "kǎoliáng", en: "consideration", collocations: ["综合考量", "现实考量", "出于安全考量"] }],
  },
  literary: {
    starters: [{ zh: "暮色渐沉，", py: "mùsè jiàn chén,", en: "as dusk gradually deepened," }],
    grammar: [{ id: "fangfo", zh: "仿佛……一般", py: "fǎngfú… yìbān", en: "Create a sustained comparison with an as-if quality.", pattern: "本体 + 仿佛 + 喻体 + 一般", example: "旧日的声音在走廊里回荡，仿佛潮水一般。", examplePy: "Jiùrì de shēngyīn zài zǒuláng lǐ huídàng, fǎngfú cháoshuǐ yìbān.", exampleEn: "Old voices echoed in the corridor like a tide." }],
    endings: [{ zh: "……终究没有说出口。", py: "…zhōngjiū méiyǒu shuō chūkǒu.", en: "…was ultimately left unsaid." }],
    words: [{ zh: "余韵", py: "yúyùn", en: "lingering resonance", collocations: ["余韵未尽", "留下余韵", "悠长的余韵"] }],
  },
  fiction: {
    starters: [{ zh: "门打开的那一刻，", py: "mén dǎkāi de nà yí kè,", en: "the moment the door opened," }],
    grammar: [{ id: "zhidao", zh: "直到……才……", py: "zhídào… cái…", en: "Delay the realization or event until a particular moment.", pattern: "直到 + 时间/事件，才 + 迟来的结果", example: "直到脚步声消失，她才敢回头。", examplePy: "Zhídào jiǎobùshēng xiāoshī, tā cái gǎn huítóu.", exampleEn: "Only after the footsteps vanished did she dare look back." }],
    endings: [{ zh: "……他这才意识到有人一直在看着他。", py: "…tā zhè cái yìshí dào yǒurén yìzhí zài kànzhe tā.", en: "…only then did he realize someone had been watching him." }],
    words: [{ zh: "凝视", py: "níngshì", en: "to gaze intently", collocations: ["默默凝视", "凝视远方", "长久地凝视"] }],
  },
  business: {
    starters: [{ zh: "鉴于目前的进展，", py: "jiànyú mùqián de jìnzhǎn,", en: "given the current progress," }],
    grammar: [{ id: "yidan", zh: "一旦……便……", py: "yídàn… biàn…", en: "State the consequence that follows once a condition is met.", pattern: "一旦 + 条件，便 + 结果", example: "一旦方案获得批准，团队便可开始执行。", examplePy: "Yídàn fāng'àn huòdé pīzhǔn, tuánduì biàn kě kāishǐ zhíxíng.", exampleEn: "Once the plan is approved, the team can begin execution." }],
    endings: [{ zh: "……并在周五之前完成。", py: "…bìng zài Zhōuwǔ zhīqián wánchéng.", en: "…and complete it before Friday." }],
    words: [{ zh: "落实", py: "luòshí", en: "to implement / put into effect", collocations: ["落实方案", "落实责任", "逐步落实"] }],
  },
  academic: {
    starters: [{ zh: "现有研究表明，", py: "xiànyǒu yánjiū biǎomíng,", en: "existing research indicates that…" }],
    grammar: [{ id: "zaikuangjia", zh: "在……框架下", py: "zài… kuàngjià xià", en: "Locate an argument inside a named analytical framework.", pattern: "在 + 理论/分析 + 框架下 + 论点", example: "在这一理论框架下，个体选择并非完全独立。", examplePy: "Zài zhè yī lǐlùn kuàngjià xià, gètǐ xuǎnzé bìngfēi wánquán dúlì.", exampleEn: "Under this framework, individual choice is not fully independent." }],
    endings: [{ zh: "……但这一结论仍需更多证据支持。", py: "…dàn zhè yī jiélùn réng xū gèng duō zhèngjù zhīchí.", en: "…but this conclusion still requires further evidence." }],
    words: [{ zh: "变量", py: "biànliàng", en: "variable", collocations: ["控制变量", "关键变量", "因变量"] }],
  },
  classical: {
    starters: [{ zh: "夫学者，", py: "fú xuézhě,", en: "as for one who studies…" }, { zh: "昔有一人，", py: "xī yǒu yī rén,", en: "long ago there was a person…" }],
    grammar: [{ id: "suiran_classical", zh: "虽……然……", py: "suī… rán…", en: "Concede one fact, then affirm a contrasting conclusion in compact classical style.", pattern: "虽 + 让步，然 + 结论", example: "路虽远，然志不可夺。", examplePy: "Lù suī yuǎn, rán zhì bùkě duó.", exampleEn: "Though the road is long, resolve cannot be taken away." }, { id: "feiye", zh: "非……也", py: "fēi… yě", en: "Form a compact classical nominal negation.", pattern: "主语 + 非 + 判断 + 也", example: "此非勇也，乃无谋也。", examplePy: "Cǐ fēi yǒng yě, nǎi wú móu yě.", exampleEn: "This is not courage, but lack of foresight." }],
    endings: [{ zh: "……故众人皆服。", py: "…gù zhòngrén jiē fú.", en: "…therefore everyone was convinced." }, { zh: "……遂不复言。", py: "…suì bù fù yán.", en: "…and thereafter spoke no more." }],
    words: [{ zh: "遂", py: "suì", en: "thereupon / consequently", collocations: ["遂行", "遂去", "遂不复言"] }, { zh: "亦", py: "yì", en: "also", collocations: ["亦可", "亦然", "亦不知"] }],
  },
};

export function promptSetFor(level: Level, register: Register): PromptSet {
  const base = content[level];
  const extra = registerPrompts[register];
  if (register === "classical") return {
    starters: extra.starters ?? base.starters,
    grammar: extra.grammar ?? base.grammar,
    endings: extra.endings ?? base.endings,
    words: extra.words ?? base.words,
  };
  return {
    starters: [...base.starters, ...(extra.starters ?? [])],
    grammar: [...base.grammar, ...(extra.grammar ?? [])],
    endings: [...base.endings, ...(extra.endings ?? [])],
    words: [...base.words, ...(extra.words ?? [])],
  };
}
