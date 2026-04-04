import type { TenseData, TenseId, Verb, VerbClass } from './types'

// ============================================================
// VERB POOLS
// ============================================================

export const AR_VERBS: Verb[] = [
  { infinitive: 'hablar',    class: 'ar', stem: 'habl',    english: 'to speak' },
  { infinitive: 'llamar',    class: 'ar', stem: 'llam',    english: 'to call' },
  { infinitive: 'quedar',    class: 'ar', stem: 'qued',    english: 'to meet up / stay' },
  { infinitive: 'llegar',    class: 'ar', stem: 'lleg',    english: 'to arrive' },
  { infinitive: 'tomar',     class: 'ar', stem: 'tom',     english: 'to take / have a drink' },
  { infinitive: 'dejar',     class: 'ar', stem: 'dej',     english: 'to leave / let' },
  { infinitive: 'pasar',     class: 'ar', stem: 'pas',     english: 'to pass / happen / spend time' },
  { infinitive: 'pensar',    class: 'ar', stem: 'pens',    english: 'to think' },
  { infinitive: 'mirar',     class: 'ar', stem: 'mir',     english: 'to look at' },
  { infinitive: 'escuchar',  class: 'ar', stem: 'escuch',  english: 'to listen' },
  { infinitive: 'esperar',   class: 'ar', stem: 'esper',   english: 'to wait / hope' },
  { infinitive: 'contar',    class: 'ar', stem: 'cont',    english: 'to count / tell' },
  { infinitive: 'trabajar',  class: 'ar', stem: 'trabaj',  english: 'to work' },
  { infinitive: 'buscar',    class: 'ar', stem: 'busc',    english: 'to look for' },
  { infinitive: 'comprar',   class: 'ar', stem: 'compr',   english: 'to buy' },
  { infinitive: 'bailar',    class: 'ar', stem: 'bail',    english: 'to dance' },
  { infinitive: 'cenar',     class: 'ar', stem: 'cen',     english: 'to have dinner' },
  { infinitive: 'descansar', class: 'ar', stem: 'descans', english: 'to rest' },
  { infinitive: 'cambiar',   class: 'ar', stem: 'cambi',   english: 'to change' },
  { infinitive: 'recordar',  class: 'ar', stem: 'record',  english: 'to remember' },
]

export const ER_VERBS: Verb[] = [
  { infinitive: 'comer',     class: 'er', stem: 'com',     english: 'to eat' },
  { infinitive: 'beber',     class: 'er', stem: 'beb',     english: 'to drink' },
  { infinitive: 'tener',     class: 'er', stem: 'ten',     english: 'to have' },
  { infinitive: 'querer',    class: 'er', stem: 'quer',    english: 'to want / love' },
  { infinitive: 'poder',     class: 'er', stem: 'pod',     english: 'to be able to' },
  { infinitive: 'saber',     class: 'er', stem: 'sab',     english: 'to know (facts)' },
  { infinitive: 'ver',       class: 'er', stem: 'v',       english: 'to see' },
  { infinitive: 'leer',      class: 'er', stem: 'le',      english: 'to read' },
  { infinitive: 'correr',    class: 'er', stem: 'corr',    english: 'to run' },
  { infinitive: 'coger',     class: 'er', stem: 'cog',     english: 'to take / catch' },
  { infinitive: 'entender',  class: 'er', stem: 'entend',  english: 'to understand' },
  { infinitive: 'volver',    class: 'er', stem: 'volv',    english: 'to return' },
  { infinitive: 'conocer',   class: 'er', stem: 'conoc',   english: 'to know (people/places)' },
  { infinitive: 'parecer',   class: 'er', stem: 'parec',   english: 'to seem' },
  { infinitive: 'responder', class: 'er', stem: 'respond', english: 'to reply' },
  { infinitive: 'meter',     class: 'er', stem: 'met',     english: 'to put in' },
  { infinitive: 'romper',    class: 'er', stem: 'romp',    english: 'to break' },
  { infinitive: 'deber',     class: 'er', stem: 'deb',     english: 'to owe / should' },
  { infinitive: 'hacer',     class: 'er', stem: 'hac',     english: 'to do / make' },
  { infinitive: 'poner',     class: 'er', stem: 'pon',     english: 'to put' },
]

export const IR_VERBS: Verb[] = [
  { infinitive: 'vivir',     class: 'ir', stem: 'viv',     english: 'to live' },
  { infinitive: 'salir',     class: 'ir', stem: 'sal',     english: 'to go out' },
  { infinitive: 'ir',        class: 'ir', stem: 'i',       english: 'to go' },
  { infinitive: 'venir',     class: 'ir', stem: 'ven',     english: 'to come' },
  { infinitive: 'decir',     class: 'ir', stem: 'dec',     english: 'to say / tell' },
  { infinitive: 'pedir',     class: 'ir', stem: 'ped',     english: 'to ask for / order' },
  { infinitive: 'seguir',    class: 'ir', stem: 'sigu',    english: 'to follow / continue' },
  { infinitive: 'sentir',    class: 'ir', stem: 'sent',    english: 'to feel' },
  { infinitive: 'dormir',    class: 'ir', stem: 'dorm',    english: 'to sleep' },
  { infinitive: 'reír',      class: 'ir', stem: 'reí',     english: 'to laugh' },
  { infinitive: 'escribir',  class: 'ir', stem: 'escrib',  english: 'to write' },
  { infinitive: 'abrir',     class: 'ir', stem: 'abr',     english: 'to open' },
  { infinitive: 'subir',     class: 'ir', stem: 'sub',     english: 'to go up / upload' },
  { infinitive: 'repetir',   class: 'ir', stem: 'repit',   english: 'to repeat' },
  { infinitive: 'servir',    class: 'ir', stem: 'sirv',    english: 'to serve' },
  { infinitive: 'preferir',  class: 'ir', stem: 'prefier', english: 'to prefer' },
  { infinitive: 'conseguir', class: 'ir', stem: 'consig',  english: 'to get / achieve' },
  { infinitive: 'producir',  class: 'ir', stem: 'produc',  english: 'to produce' },
  { infinitive: 'construir', class: 'ir', stem: 'constru', english: 'to build' },
  { infinitive: 'sonreír',   class: 'ir', stem: 'sonreí',  english: 'to smile' },
]

export const ALL_VERBS: Verb[] = [...AR_VERBS, ...ER_VERBS, ...IR_VERBS]

export function getRegularVerbsForSession(sessionIndex: number): [Verb, Verb, Verb] {
  const arIndex = sessionIndex % AR_VERBS.length
  const erIndex = sessionIndex % ER_VERBS.length
  const irIndex = sessionIndex % IR_VERBS.length
  return [
    AR_VERBS[arIndex],
    ER_VERBS[erIndex],
    IR_VERBS[irIndex],
  ]
}

// ============================================================
// TENSE ROTATION
// ============================================================

// Returns the TenseId for a given date (0 = challenge start)
export function getTenseForDate(date: Date, challengeStart: Date, level: number): TenseId | 'review' | 'rest' {
  const daysDiff = Math.floor((date.getTime() - challengeStart.getTime()) / (1000 * 60 * 60 * 24))
  const dayOfWeek = (daysDiff % 7 + 7) % 7 // 0=Mon, 6=Sun

  if (dayOfWeek === 6) return 'rest'
  if (dayOfWeek === 5) return 'review'

  const level1Rotation: TenseId[] = ['presente', 'indefinido', 'imperfecto', 'futuro', 'condicional']
  const level2Rotation: TenseId[] = ['presente', 'indefinido', 'imperfecto', 'futuro', 'condicional']
  // Level 2 would add subjuntivo — stub for v1

  const rotation = level >= 1 ? level1Rotation : level1Rotation
  return rotation[dayOfWeek]
}

export function getTodayTense(challengeStart: Date | null, level: number): TenseId {
  if (!challengeStart) return 'presente'
  const today = new Date()
  const tense = getTenseForDate(today, challengeStart, level)
  if (tense === 'review' || tense === 'rest') return 'indefinido' // fallback for review/rest
  return tense
}

// ============================================================
// TENSE DATA
// ============================================================

export const TENSES: Record<TenseId, TenseData> = {

  // ──────────────────────────────────────────────────────────
  // PRESENTE DE INDICATIVO
  // ──────────────────────────────────────────────────────────
  presente: {
    id: 'presente',
    name: 'Presente de Indicativo',
    shortName: 'Presente',
    conceptualWhy: 'The present tense — the tense you already know from immersion. Today we make the unconscious conscious: you\'ll see why it works the way it does, and nail down the forms you\'ve been saying on instinct.',
    patternRule: {
      ar: 'stem + -o / -as / -a / -amos / -an',
      er: 'stem + -o / -es / -e / -emos / -en',
      ir: 'stem + -o / -es / -e / -imos / -en',
      note: '-er and -ir are identical except for nosotros: -emos vs -imos.',
    },
    phase1: {
      why: 'You already use the present tense constantly from immersion. Today we\'re making the unconscious conscious — you\'ll see why it works the way it does, and lock in the forms you\'ve been saying on instinct.',
      socratiQuestion: 'You know the verb hablar (to speak). The stem is habl-. The -ar ending for yo is -o. So what do you think "yo hablo" looks like? And what about tú — the ending is -as?',
      socratiAnswer: 'yo hablo, tú hablas. The stem stays the same — you just swap the ending. Every regular -ar verb works exactly like this.',
      patternRuleDisplay: '-ar: habl + -o / -as / -a / -amos / -an\n-er: com + -o / -es / -e / -emos / -en\n-ir: viv + -o / -es / -e / -imos / -en\n\n⚡ -er and -ir share all endings except nosotros (-emos vs -imos)',
      examples: [
        { spanish: '¿Quedamos mañana para tomar algo?', contextNote: 'Plan for tomorrow — classic present use' },
        { spanish: 'Trabaja en el centro, pero vive en Gràcia.', contextNote: 'Ongoing facts about someone' },
        { spanish: 'No entiendo por qué hace eso.', contextNote: 'Right now, in this moment' },
      ],
    },
    modelVerbs: {
      hablar: { yo: 'hablo', tú: 'hablas', 'él/ella': 'habla', nosotros: 'hablamos', 'ellos/ellas': 'hablan' },
      comer:  { yo: 'como',  tú: 'comes',  'él/ella': 'come',  nosotros: 'comemos',  'ellos/ellas': 'comen' },
      vivir:  { yo: 'vivo',  tú: 'vives',  'él/ella': 'vive',  nosotros: 'vivimos',  'ellos/ellas': 'viven' },
    },
    irregulars: [
      {
        verb: 'ser',
        why: 'Ser is a merger of two completely different Latin verbs — esse and sedere. That\'s why it looks nothing like a regular verb. Think of it as an ancient relic that stopped playing by the rules centuries ago.',
        whyIsInvented: false,
        socratiHint: 'Ser is wildly irregular — but you know it from immersion. Can you fill in: yo ___, tú ___, él ___?',
        forms: { yo: 'soy', tú: 'eres', 'él/ella': 'es', nosotros: 'somos', 'ellos/ellas': 'son' },
      },
      {
        verb: 'estar',
        why: 'Estar comes from Latin stare (to stand). The irregularity in yo (estoy) follows a common pattern — several common verbs add -oy to yo: soy, doy, voy, estoy.',
        whyIsInvented: false,
        socratiHint: 'Estar\'s yo form adds -oy like soy and voy. Can you guess: yo ___? The rest are more regular: tú ___, él ___?',
        forms: { yo: 'estoy', tú: 'estás', 'él/ella': 'está', nosotros: 'estamos', 'ellos/ellas': 'están' },
      },
      {
        verb: 'ir',
        why: 'Ir is the most irregular verb in Spanish — it comes from three different Latin verbs (ire, vadere, esse) that merged together. The present tense uses the vadere root, which is why it looks completely unlike the infinitive.',
        whyIsInvented: false,
        socratiHint: 'Ir is a complete outlier — it doesn\'t look like its infinitive at all. You know this from immersion: ¿A dónde vas? Voy al bar. Can you complete the table?',
        forms: { yo: 'voy', tú: 'vas', 'él/ella': 'va', nosotros: 'vamos', 'ellos/ellas': 'van' },
      },
      {
        verb: 'tener',
        why: 'Tener has a "yo-go" irregularity (tengo) — a group of verbs that add a -g- in the yo form only. Others: poner→pongo, salir→salgo, venir→vengo, hacer→hago, decir→digo. Learn one, recognize the pattern in all of them.',
        whyIsInvented: false,
        socratiHint: 'Tener adds a -g- in the yo form. If poner makes pongo, what does tener make? Then the rest is almost regular.',
        forms: { yo: 'tengo', tú: 'tienes', 'él/ella': 'tiene', nosotros: 'tenemos', 'ellos/ellas': 'tienen' },
        mnemonic: 'YO-GO verbs: tenGO, ponGO, salGO, venGO, haGO, diGO — they all add a G in yo.',
      },
      {
        verb: 'hacer',
        why: 'Hacer follows the yo-go pattern (hago). The rest of the present is regular except the spelling — the c becomes g in yo to keep the soft sound before -o.',
        whyIsInvented: false,
        socratiHint: 'Hacer is a yo-go verb. What\'s the yo form? And the tú form follows the regular -er pattern...',
        forms: { yo: 'hago', tú: 'haces', 'él/ella': 'hace', nosotros: 'hacemos', 'ellos/ellas': 'hacen' },
      },
    ],
    signalWords: {
      strong: ['ahora', 'hoy', 'siempre', 'normalmente', 'todos los días', 'a veces', 'nunca', 'generalmente'],
      weak: ['este mes', 'esta semana', 'últimamente'],
    },
    phase4Exercises: [
      {
        pronoun: 'yo', verb: 'quedar', tense: 'presente',
        sentenceFrame: '______  con Pablo esta tarde para tomar algo.',
        expected: 'Quedo',
        signalWord: 'esta tarde',
        feedback: 'Esta tarde = a plan for today. The present tense describes current habits and plans.',
        isContrastPair: false,
      },
      {
        pronoun: 'él/ella', verb: 'trabajar', tense: 'presente',
        sentenceFrame: 'Mi pareja ______ en el centro pero ______ en Gràcia.',
        expected: 'trabaja',
        signalWord: 'ongoing fact',
        feedback: 'A current, ongoing fact about someone — present tense.',
        isContrastPair: false,
      },
      {
        pronoun: 'nosotros', verb: 'cenar', tense: 'presente',
        sentenceFrame: 'Normalmente ______ tarde, sobre las diez.',
        expected: 'cenamos',
        signalWord: 'normalmente',
        feedback: 'Normalmente describes a current habit → present tense.',
        isContrastPair: false,
      },
      {
        pronoun: 'tú', verb: 'entender', tense: 'presente',
        sentenceFrame: '¿______ lo que te digo?',
        expected: 'entiendes',
        signalWord: 'question about right now',
        feedback: 'A question about comprehension in this moment → present.',
        isContrastPair: false,
      },
      {
        pronoun: 'ellos/ellas', verb: 'salir', tense: 'presente',
        sentenceFrame: '______ todos los viernes a bailar.',
        expected: 'Salen',
        signalWord: 'todos los viernes',
        feedback: 'Todos los viernes = a regular current habit → present tense.',
        isContrastPair: false,
      },
      {
        pronoun: 'yo', verb: 'buscar', tense: 'presente',
        sentenceFrame: '______ piso en el centro, ¿conoces alguno?',
        expected: 'Busco',
        signalWord: 'ongoing current situation',
        feedback: 'An ongoing current situation — you\'re actively looking right now → present.',
        isContrastPair: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // PRETÉRITO INDEFINIDO
  // ──────────────────────────────────────────────────────────
  indefinido: {
    id: 'indefinido',
    name: 'Pretérito Indefinido',
    shortName: 'Indefinido',
    conceptualWhy: 'This is the tense of completed, countable events — the camera flash, not the rolling film. One moment, click, done. The ending tells you exactly when something finished.',
    patternRule: {
      ar: 'stem + -é / -aste / -ó / -amos / -aron',
      er: 'stem + -í / -iste / -ió / -imos / -ieron',
      ir: 'stem + -í / -iste / -ió / -imos / -ieron',
      note: '-er and -ir verbs share identical indefinido endings.',
    },
    phase1: {
      why: 'The indefinido is the tense of completed, countable events — the camera flash, not the rolling film. One moment, click, done. When you\'re telling a story — "I went, I saw, I called" — this is the tense doing the work.',
      socratiQuestion: 'The -ar ending for yo in the indefinido is -é. You know the verb llamar (stem: llam-). What\'s the yo form? And the tú ending is -aste — so tú ___?',
      socratiAnswer: 'yo llamé, tú llamaste. Notice the accent on yo (llamé) — that accent is load-bearing. Without it, it would be present tense (llame, the subjuntivo). The accent = past.',
      patternRuleDisplay: '-ar: llam + -é / -aste / -ó / -amos / -aron\n-er/-ir: com/viv + -í / -iste / -ió / -imos / -ieron\n\n⚡ -er and -ir share the same endings — one less thing to learn\n⚠️  yo needs an accent: -é / -í (without it = subjuntivo)',
      examples: [
        { spanish: 'Ayer quedé con Pablo y lo pasamos genial.', contextNote: 'Ayer = specific past moment, completed event' },
        { spanish: 'El sábado salimos de fiesta y volvimos tardísimo.', contextNote: 'El sábado = defined past event, completed' },
        { spanish: '¿Te llamé anoche o lo soñé?', contextNote: 'Completed actions being questioned' },
      ],
    },
    modelVerbs: {
      hablar: { yo: 'hablé', tú: 'hablaste', 'él/ella': 'habló', nosotros: 'hablamos', 'ellos/ellas': 'hablaron' },
      comer:  { yo: 'comí',  tú: 'comiste',  'él/ella': 'comió',  nosotros: 'comimos',  'ellos/ellas': 'comieron' },
      vivir:  { yo: 'viví',  tú: 'viviste',  'él/ella': 'vivió',  nosotros: 'vivimos',  'ellos/ellas': 'vivieron' },
    },
    irregulars: [
      {
        verb: 'ir / ser',
        why: 'Ir and ser share identical indefinido forms — fui, fuiste, fue, fuimos, fueron. Why? Two completely different Latin verbs that happened to merge into the same forms over centuries. Context always makes it clear: "fui al bar" vs "fui presidente". Nobody is ever confused.',
        whyIsInvented: false,
        socratiHint: 'These two completely different verbs share the same indefinido. You know "fui al supermercado" — that\'s ir. And "fue una noche increíble" — that\'s ser. Same form, different meaning. Can you list all 5?',
        forms: { yo: 'fui', tú: 'fuiste', 'él/ella': 'fue', nosotros: 'fuimos', 'ellos/ellas': 'fueron' },
        mnemonic: 'FUI — think of it as one tiny word that carries two huge verbs.',
      },
      {
        verb: 'hacer',
        why: 'Hacer changes its stem to hic- in the indefinido, plus the 3rd person singular contracts further: hizo (not hició). The z is a Spanish spelling rule — c before e/i becomes z.',
        whyIsInvented: false,
        socratiHint: 'The stem becomes hic- in the indefinido. Yo hice, tú hiciste... but él doesn\'t follow — it\'s hizo, not hició. Why? Spelling rule: c before o → z.',
        forms: { yo: 'hice', tú: 'hiciste', 'él/ella': 'hizo', nosotros: 'hicimos', 'ellos/ellas': 'hicieron' },
      },
      {
        verb: 'tener',
        why: 'A group of verbs completely replace their stem in the indefinido — these are called "pretérito grave" or strong preterites. Tener becomes tuv-. The endings are the same: -e, -iste, -o, -imos, -ieron (no accent on yo).',
        whyIsInvented: false,
        socratiHint: 'Tener\'s indefinido stem is tuv-. And strong preterites have no accent on yo — it\'s tuve, not tuvé. Can you build the full table from there?',
        forms: { yo: 'tuve', tú: 'tuviste', 'él/ella': 'tuvo', nosotros: 'tuvimos', 'ellos/ellas': 'tuvieron' },
        mnemonic: 'Strong preterites (no accent on yo): tuve, estuve, anduve, pude, puse, quise, supe, vine, dije, traje.',
      },
      {
        verb: 'estar',
        why: 'Same strong preterite pattern as tener — the stem becomes estuv-. No accent on yo: estuve.',
        whyIsInvented: false,
        socratiHint: 'Estar\'s indefinido stem is estuv-. Following the strong preterite pattern (no accent): yo ___?',
        forms: { yo: 'estuve', tú: 'estuviste', 'él/ella': 'estuvo', nosotros: 'estuvimos', 'ellos/ellas': 'estuvieron' },
      },
      {
        verb: 'poder',
        why: 'Another strong preterite — stem pud-. Remember: pude means "I managed to" (I succeeded), while podía means "I was capable of" (general ability). That distinction will come up in Phase 4.',
        whyIsInvented: false,
        socratiHint: 'Poder\'s stem is pud- in the indefinido. Strong preterite = no accent on yo. Build the table.',
        forms: { yo: 'pude', tú: 'pudiste', 'él/ella': 'pudo', nosotros: 'pudimos', 'ellos/ellas': 'pudieron' },
      },
      {
        verb: 'decir',
        why: 'Decir\'s indefinido stem is dij-. The ellos/ellas ending drops the i: dijeron (not dijieron). This happens with all j-stem verbs — a phonetic rule to avoid the i after j.',
        whyIsInvented: false,
        socratiHint: 'Decir stem = dij-. But the ellos form loses the i: not dijieron but ___? Phonetic rule: no i after j.',
        forms: { yo: 'dije', tú: 'dijiste', 'él/ella': 'dijo', nosotros: 'dijimos', 'ellos/ellas': 'dijeron' },
      },
    ],
    signalWords: {
      strong: ['ayer', 'el lunes', 'el sábado', 'el año pasado', 'una vez', 'de repente', 'al final', 'en ese momento', 'aquella noche', 'la semana pasada', 'entonces', 'de golpe'],
      weak: ['cuando', 'después', 'antes de', 'por fin'],
    },
    phase4Exercises: [
      {
        pronoun: 'yo', verb: 'quedar', tense: 'indefinido',
        sentenceFrame: 'Ayer ______ con Pablo para tomar algo.',
        expected: 'quedé',
        signalWord: 'Ayer',
        feedback: 'Ayer = a specific, completed past event. Camera flash — it happened once, it\'s done.',
        isContrastPair: true,
      },
      {
        pronoun: 'yo', verb: 'llamar', tense: 'indefinido',
        sentenceFrame: 'Te ______ tres veces pero no cogiste.',
        expected: 'llamé',
        signalWord: 'tres veces',
        feedback: 'Tres veces = three completed, countable acts. You can count them. Indefinido.',
        isContrastPair: false,
      },
      {
        pronoun: 'nosotros', verb: 'salir', tense: 'indefinido',
        sentenceFrame: 'El viernes ______ de fiesta y volvimos tardísimo.',
        expected: 'salimos',
        signalWord: 'El viernes',
        feedback: 'El viernes = a specific, defined past event. You went out once on that Friday.',
        isContrastPair: true,
      },
      {
        pronoun: 'él/ella', verb: 'conocer', tense: 'indefinido',
        sentenceFrame: 'La ______ en la fiesta de Marta.',
        expected: 'conoció',
        signalWord: 'en la fiesta de',
        feedback: 'Meeting someone for the first time = a specific moment, completed. Conocí = "I met".',
        isContrastPair: true,
      },
      {
        pronoun: 'yo', verb: 'estar', tense: 'indefinido',
        sentenceFrame: '______ en Barcelona todo el fin de semana.',
        expected: 'Estuve',
        signalWord: 'todo el fin de semana',
        feedback: 'A completed, bounded period — you were there for a specific time, now it\'s over.',
        isContrastPair: true,
      },
      {
        pronoun: 'ellos/ellas', verb: 'llegar', tense: 'indefinido',
        sentenceFrame: 'De repente ______ todos a la vez.',
        expected: 'llegaron',
        signalWord: 'De repente',
        feedback: 'De repente = a sudden, completed moment. Camera flash.',
        isContrastPair: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // PRETÉRITO IMPERFECTO
  // ──────────────────────────────────────────────────────────
  imperfecto: {
    id: 'imperfecto',
    name: 'Pretérito Imperfecto',
    shortName: 'Imperfecto',
    conceptualWhy: 'This is the tense of background, habit, and ongoing states — think of it as a camera rolling. No defined start or end, just a scene playing out. The endings are beautifully regular: -ar verbs get -aba, -er/-ir verbs get -ía. Almost nothing is irregular.',
    patternRule: {
      ar: 'stem + -aba / -abas / -aba / -ábamos / -aban',
      er: 'stem + -ía / -ías / -ía / -íamos / -ían',
      ir: 'stem + -ía / -ías / -ía / -íamos / -ían',
      note: '-er and -ir verbs share the same imperfecto endings. Almost no irregulars — only 3 in the whole language.',
    },
    phase1: {
      why: 'The imperfecto is the tense of background, habit, and ongoing states. Think of it as a camera rolling. No defined start or end — just a scene playing out. When you describe how things used to be, or what was happening when something else occurred, this is your tense.',
      socratiQuestion: 'The imperfecto -ar ending for yo is -aba. You know hablar (stem: habl-). What\'s the yo form? Now the -er/-ir ending is -ía — for comer (stem: com-), what\'s the yo form?',
      socratiAnswer: 'yo hablaba, yo comía. Notice that -er and -ir verbs share the same ending — one less thing to learn. And here\'s the beautiful news: the imperfecto has only 3 irregular verbs in the entire Spanish language. Everything else is perfectly regular.',
      patternRuleDisplay: '-ar: habl + -aba / -abas / -aba / -ábamos / -aban\n-er: com + -ía / -ías / -ía / -íamos / -ían\n-ir: viv + -ía / -ías / -ía / -íamos / -ían\n\n⚡ Good news: only 3 irregular verbs in the ENTIRE imperfecto',
      examples: [
        { spanish: 'Cuando era pequeño, siempre quedaba con mis amigos en la plaza.', contextNote: 'Era pequeño + siempre = ongoing background habit in childhood' },
        { spanish: 'Vivía en Barcelona y lo pasaba increíble.', contextNote: 'Ongoing state (where you lived), ongoing experience — no defined end' },
        { spanish: '¿Qué hacías cuando te llamé?', contextNote: 'The rolling background action (hacías) interrupted by a flash event (llamé)' },
      ],
    },
    modelVerbs: {
      hablar: { yo: 'hablaba', tú: 'hablabas', 'él/ella': 'hablaba', nosotros: 'hablábamos', 'ellos/ellas': 'hablaban' },
      comer:  { yo: 'comía',   tú: 'comías',   'él/ella': 'comía',   nosotros: 'comíamos',   'ellos/ellas': 'comían' },
      vivir:  { yo: 'vivía',   tú: 'vivías',   'él/ella': 'vivía',   nosotros: 'vivíamos',   'ellos/ellas': 'vivían' },
    },
    irregulars: [
      {
        verb: 'ser',
        why: 'Ser is one of only 3 irregular imperfecto verbs. The form era comes from Latin erat. It sounds strange until you realise: when you\'re describing how things were (era pequeño, era divertido), you\'ll hear and say era constantly.',
        whyIsInvented: false,
        socratiHint: 'Ser is irregular in the imperfecto. You know "cuando era pequeño" — that\'s the yo/él form. Can you build the full table from era?',
        forms: { yo: 'era', tú: 'eras', 'él/ella': 'era', nosotros: 'éramos', 'ellos/ellas': 'eran' },
        mnemonic: 'ERA — the era-form. yo era, tú eras, él era, nosotros éramos, ellos eran.',
      },
      {
        verb: 'ir',
        why: 'Ir is the second of the 3 irregular imperfecto verbs. The form iba comes from Latin ibat. You\'ll use it constantly: "iba al mercado todos los sábados" — I used to go to the market every Saturday.',
        whyIsInvented: false,
        socratiHint: 'Ir is irregular — the stem becomes ib-. You know "antes iba al gimnasio todos los días." Can you build the full table?',
        forms: { yo: 'iba', tú: 'ibas', 'él/ella': 'iba', nosotros: 'íbamos', 'ellos/ellas': 'iban' },
        mnemonic: 'IBA — the iba-form. yo iba, tú ibas, él iba, nosotros íbamos, ellos iban.',
      },
      {
        verb: 'ver',
        why: 'Ver is the third and final irregular imperfecto verb. It\'s almost regular — it just keeps the full stem ve- instead of dropping to v- like you\'d expect. So instead of vía (which would look like the noun "vía"), it\'s veía.',
        whyIsInvented: false,
        socratiHint: 'Ver keeps its full stem ve- in the imperfecto, then adds the normal -er endings (-ía). Yo veía, tú ___? It\'s almost regular once you see the pattern.',
        forms: { yo: 'veía', tú: 'veías', 'él/ella': 'veía', nosotros: 'veíamos', 'ellos/ellas': 'veían' },
        mnemonic: 'VE + ía: veía. Unlike other -er verbs (comía), ver keeps the full stem to avoid confusion with "vía" (road).',
      },
    ],
    signalWords: {
      strong: ['siempre', 'antes', 'de niño', 'de pequeño', 'todos los días', 'cuando era', 'normalmente', 'solía', 'cada semana', 'a menudo', 'por aquella época'],
      weak: ['cuando', 'mientras', 'en aquel momento', 'a veces'],
    },
    phase4Exercises: [
      {
        pronoun: 'yo', verb: 'quedar', tense: 'imperfecto',
        sentenceFrame: 'De pequeño siempre ______ con mis amigos en la plaza.',
        expected: 'quedaba',
        signalWord: 'De pequeño siempre',
        feedback: 'De pequeño + siempre = ongoing habit from childhood. The camera was rolling, no defined moment.',
        isContrastPair: true,
      },
      {
        pronoun: 'nosotros', verb: 'salir', tense: 'imperfecto',
        sentenceFrame: 'Antes ______ todos los fines de semana.',
        expected: 'salíamos',
        signalWord: 'Antes … todos los fines de semana',
        feedback: 'Antes + todos los fines de semana = a repeated past habit with no defined start or end.',
        isContrastPair: true,
      },
      {
        pronoun: 'él/ella', verb: 'conocer', tense: 'imperfecto',
        sentenceFrame: 'La ______ de antes — éramos del mismo barrio.',
        expected: 'conocía',
        signalWord: 'de antes',
        feedback: 'Knowing someone from before = an ongoing state, not a defined moment. Conocía = "I knew (already)".',
        isContrastPair: true,
      },
      {
        pronoun: 'yo', verb: 'estar', tense: 'imperfecto',
        sentenceFrame: '______ muy cansado cuando me llamaste.',
        expected: 'Estaba',
        signalWord: 'cuando me llamaste',
        feedback: 'Estaba describes an ongoing state (how you felt) when a completed event interrupted it.',
        isContrastPair: true,
      },
      {
        pronoun: 'ellos/ellas', verb: 'vivir', tense: 'imperfecto',
        sentenceFrame: 'Cuando los conocí, ______ en el Eixample.',
        expected: 'vivían',
        signalWord: 'Cuando los conocí',
        feedback: 'Where they lived = an ongoing background state that was already in progress when you met them.',
        isContrastPair: false,
      },
      {
        pronoun: 'tú', verb: 'trabajar', tense: 'imperfecto',
        sentenceFrame: '¿No ______ en Madrid antes de venir aquí?',
        expected: 'trabajabas',
        signalWord: 'antes de venir aquí',
        feedback: 'An ongoing past situation (where you used to work) with no defined end point.',
        isContrastPair: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // FUTURO SIMPLE
  // ──────────────────────────────────────────────────────────
  futuro: {
    id: 'futuro',
    name: 'Futuro Simple',
    shortName: 'Futuro',
    conceptualWhy: 'Spanish future is actually a survival of the Latin verb habere (to have) glued to the infinitive — hablar + he = hablaré. You\'re literally saying "I have to speak." The infinitive stays completely intact — you just add the ending on the end.',
    latinEtymology: 'From Latin: hablar + (h)e → hablaré. The infinitive is preserved whole — the future "grew" onto the end of the verb rather than replacing the ending.',
    patternRule: {
      ar: 'infinitive + -é / -ás / -á / -emos / -án',
      er: 'infinitive + -é / -ás / -á / -emos / -án',
      ir: 'infinitive + -é / -ás / -á / -emos / -án',
      note: 'All three verb classes use identical endings — the infinitive is always kept intact.',
    },
    phase1: {
      why: 'The futuro is built by gluing the Latin verb habere (to have) onto the end of the infinitive. "Hablaré" literally meant "I have to speak" — then it became "I will speak." The infinitive stays 100% intact. No stem, just the whole infinitive + ending.',
      latinEtymology: 'Latin: hablar + habeo (I have) → hablar + é → hablaré. The future literally means "I have to [do this thing]." Same logic in English: "I have to go" → future intention.',
      socratiQuestion: 'The futuro yo ending is -é. The infinitive of hablar stays intact. So yo hablar + é = ? And tú gets -ás: hablar + ás = ?',
      socratiAnswer: 'hablaré, hablarás. The infinitive is completely unchanged — you\'re just adding a suffix. This works identically for -ar, -er, and -ir verbs. One rule for all three classes.',
      patternRuleDisplay: 'ALL verbs: [infinitive] + -é / -ás / -á / -emos / -án\n\nhablaré / hablarás / hablará / hablaremos / hablarán\ncomeré / comerás / comerá / comeremos / comerán\nviviré / vivirás / vivirá / viviremos / vivirán\n\n⚡ All three verb classes — identical endings, full infinitive preserved',
      examples: [
        { spanish: '¿Quedaremos el viernes o prefieres el sábado?', contextNote: 'Making plans for the future' },
        { spanish: 'El año que viene viviré en otro sitio, ya verás.', contextNote: 'Future prediction / intention' },
        { spanish: 'Si sigue así, lo dejará todo.', contextNote: 'Future consequence of current behaviour' },
      ],
    },
    modelVerbs: {
      hablar: { yo: 'hablaré', tú: 'hablarás', 'él/ella': 'hablará', nosotros: 'hablaremos', 'ellos/ellas': 'hablarán' },
      comer:  { yo: 'comeré',  tú: 'comerás',  'él/ella': 'comerá',  nosotros: 'comeremos',  'ellos/ellas': 'comerán' },
      vivir:  { yo: 'viviré',  tú: 'vivirás',  'él/ella': 'vivirá',  nosotros: 'viviremos',  'ellos/ellas': 'vivirán' },
    },
    irregulars: [
      {
        verb: 'tener',
        why: 'The futuro irregulars shorten or modify the infinitive before adding the ending. Tener drops its -e- and inserts a -d-: tener → tendr-. Learn this group together — they all follow the same trick.',
        whyIsInvented: false,
        socratiHint: 'Tener\'s future stem is tendr-. So yo tendr + é = ? These irregular stems all take the same endings as regular futures.',
        forms: { yo: 'tendré', tú: 'tendrás', 'él/ella': 'tendrá', nosotros: 'tendremos', 'ellos/ellas': 'tendrán' },
        mnemonic: 'tenDRé, ponDRé, salDRé, venDRé — the -dr- group. They all insert -dr- where the infinitive\'s vowel was.',
      },
      {
        verb: 'poder',
        why: 'Poder drops its -e-: poder → podr-. Same pattern as tener but simpler — just the vowel disappears.',
        whyIsInvented: false,
        socratiHint: 'Poder drops the -e-: podr-. Build the future from there.',
        forms: { yo: 'podré', tú: 'podrás', 'él/ella': 'podrá', nosotros: 'podremos', 'ellos/ellas': 'podrán' },
      },
      {
        verb: 'querer',
        why: 'Querer drops both vowels from the ending: querer → querr-. A double r appears — the r was always there (que-r-er), now it\'s exposed.',
        whyIsInvented: false,
        socratiHint: 'Querer drops the -e-: querr- (double r). Build the future.',
        forms: { yo: 'querré', tú: 'querrás', 'él/ella': 'querrá', nosotros: 'querremos', 'ellos/ellas': 'querrán' },
      },
      {
        verb: 'saber',
        why: 'Saber drops its -e-: saber → sabr-. Clean and simple.',
        whyIsInvented: false,
        socratiHint: 'Saber drops the -e-: sabr-. Future yo?',
        forms: { yo: 'sabré', tú: 'sabrás', 'él/ella': 'sabrá', nosotros: 'sabremos', 'ellos/ellas': 'sabrán' },
      },
      {
        verb: 'hacer',
        why: 'Hacer contracts dramatically: hacer → har-. The whole middle disappears. This is one of the most common verbs in Spanish — worth memorising as a standalone.',
        whyIsInvented: false,
        socratiHint: 'Hacer contracts to just har-. One syllable. Future yo?',
        forms: { yo: 'haré', tú: 'harás', 'él/ella': 'hará', nosotros: 'haremos', 'ellos/ellas': 'harán' },
        mnemonic: 'haré — "I\'ll do/make it." Three letters. One of the most useful future forms.',
      },
      {
        verb: 'decir',
        why: 'Decir contracts to dir-. Another dramatic contraction — the full verb loses its middle syllable.',
        whyIsInvented: false,
        socratiHint: 'Decir → dir-. Short and sharp. Future yo?',
        forms: { yo: 'diré', tú: 'dirás', 'él/ella': 'dirá', nosotros: 'diremos', 'ellos/ellas': 'dirán' },
      },
    ],
    signalWords: {
      strong: ['mañana', 'el próximo', 'la próxima semana', 'el año que viene', 'en el futuro', 'pronto', 'algún día', 'dentro de'],
      weak: ['si', 'cuando (+ subjuntivo)', 'en cuanto', 'hasta que'],
    },
    phase4Exercises: [
      {
        pronoun: 'nosotros', verb: 'quedar', tense: 'futuro',
        sentenceFrame: '¿______ el viernes o prefieres el sábado?',
        expected: 'Quedaremos',
        signalWord: 'el viernes',
        feedback: 'A plan for a specific future day.',
        isContrastPair: false,
      },
      {
        pronoun: 'yo', verb: 'llamar', tense: 'futuro',
        sentenceFrame: 'Te ______ en cuanto llegue.',
        expected: 'llamaré',
        signalWord: 'en cuanto llegue',
        feedback: 'En cuanto + subjuntivo = future conditional — describing what will happen.',
        isContrastPair: false,
      },
      {
        pronoun: 'él/ella', verb: 'volver', tense: 'futuro',
        sentenceFrame: 'Dice que ______ en mayo.',
        expected: 'volverá',
        signalWord: 'en mayo (future)',
        feedback: 'In mayo (a future date) — this is a reported intention for the future.',
        isContrastPair: false,
      },
      {
        pronoun: 'ellos/ellas', verb: 'llegar', tense: 'futuro',
        sentenceFrame: 'Si siguen así, ______ tarde.',
        expected: 'llegarán',
        signalWord: 'Si siguen así',
        feedback: 'A future consequence of a current situation.',
        isContrastPair: false,
      },
      {
        pronoun: 'tú', verb: 'saber', tense: 'futuro',
        sentenceFrame: 'Mañana ______ los resultados.',
        expected: 'sabrás',
        signalWord: 'Mañana',
        feedback: 'Mañana = tomorrow, future. Irregular: saber → sabr-.',
        isContrastPair: false,
      },
      {
        pronoun: 'yo', verb: 'hacer', tense: 'futuro',
        sentenceFrame: 'El próximo verano ______ un curso de cocina.',
        expected: 'haré',
        signalWord: 'El próximo verano',
        feedback: 'El próximo verano = future time marker. Hacer → har- (irregular).',
        isContrastPair: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // CONDICIONAL SIMPLE
  // ──────────────────────────────────────────────────────────
  condicional: {
    id: 'condicional',
    name: 'Condicional Simple',
    shortName: 'Condicional',
    conceptualWhy: 'Same Latin logic as the futuro, but using the past form of habere — "I would have to speak." The infinitive stays intact, same irregular stems as futuro. Learn one, you know the other.',
    latinEtymology: 'Same as futuro but using the past form of habere (habebam → -ía). "Hablaría" = "I would have to speak." The parallel with futuro is perfect — same stems, different set of endings.',
    patternRule: {
      ar: 'infinitive + -ía / -ías / -ía / -íamos / -ían',
      er: 'infinitive + -ía / -ías / -ía / -íamos / -ían',
      ir: 'infinitive + -ía / -ías / -ía / -íamos / -ían',
      note: 'Same irregular stems as futuro (tendr-, podr-, querr-, etc.) — only the endings change. Endings look like imperfecto -er/-ir endings.',
    },
    phase1: {
      why: 'The condicional is the "would" tense — same Latin root as the futuro, but using the past form of habere. If futuro says "I have to speak," condicional says "I would have to speak." Same stems, new endings.',
      latinEtymology: 'Latin: hablar + habebam (I used to have) → hablaría. Same infinitive, same irregular stems as futuro — only the endings differ. Master the futuro irregulars and you already know the condicional irregulars.',
      socratiQuestion: 'The futuro yo ending is -é. The condicional yo ending is -ía (like imperfecto -er/-ir). So if hablaré is future, what\'s the conditional? hablar + ía = ?',
      socratiAnswer: 'hablaría. And here\'s the bonus: the irregular stems are identical to the futuro. tendré → tendría, haré → haría, podré → podría. Learn one, you have both.',
      patternRuleDisplay: 'ALL verbs: [infinitive] + -ía / -ías / -ía / -íamos / -ían\n\nhablaría / hablarías / hablaría / hablaríamos / hablarían\n\n⚡ Same irregular stems as futuro: tendr-, podr-, querr-, sabr-, har-, dir-\n⚡ Endings look like imperfecto -er/-ir (-ía, -ías...)',
      examples: [
        { spanish: '¿Podrías ayudarme con esto?', contextNote: 'Polite request — softer than ¿Puedes...?' },
        { spanish: 'Yo en tu lugar lo haría diferente.', contextNote: 'Hypothetical — what you would do in their situation' },
        { spanish: 'Dijo que vendría pero no apareció.', contextNote: 'Reported speech — what he said he would do' },
      ],
    },
    modelVerbs: {
      hablar: { yo: 'hablaría', tú: 'hablarías', 'él/ella': 'hablaría', nosotros: 'hablaríamos', 'ellos/ellas': 'hablarían' },
      comer:  { yo: 'comería',  tú: 'comerías',  'él/ella': 'comería',  nosotros: 'comeríamos',  'ellos/ellas': 'comerían' },
      vivir:  { yo: 'viviría',  tú: 'vivirías',  'él/ella': 'viviría',  nosotros: 'viviríamos',  'ellos/ellas': 'vivirían' },
    },
    irregulars: [
      {
        verb: 'tener',
        why: 'Exact same stem as futuro — tendr-. Only the ending changes: tendré (futuro) → tendría (condicional).',
        whyIsInvented: false,
        socratiHint: 'If tendré is the future, what\'s the conditional? Same stem + -ía.',
        forms: { yo: 'tendría', tú: 'tendrías', 'él/ella': 'tendría', nosotros: 'tendríamos', 'ellos/ellas': 'tendrían' },
        mnemonic: 'tendría / pondría / saldría / vendría — the -dría group. Same stems as futuro, -ía endings.',
      },
      {
        verb: 'poder',
        why: 'Podr- stem (same as futuro). Most commonly heard in ¿Podrías...? — the polite request form.',
        whyIsInvented: false,
        socratiHint: '¿Podrías ayudarme? — you\'ve heard this. Podría is stem podr- + -ía.',
        forms: { yo: 'podría', tú: 'podrías', 'él/ella': 'podría', nosotros: 'podríamos', 'ellos/ellas': 'podrían' },
      },
      {
        verb: 'hacer',
        why: 'Har- stem (same as futuro). Yo lo haría diferente — I would do it differently. Extremely common.',
        whyIsInvented: false,
        socratiHint: 'Hacer → har- (futuro: haré). Conditional: haría. Can you build the full table?',
        forms: { yo: 'haría', tú: 'harías', 'él/ella': 'haría', nosotros: 'haríamos', 'ellos/ellas': 'harían' },
      },
      {
        verb: 'querer',
        why: 'Querr- stem (same as futuro). Querría is the polite way to express wanting something — softer than quiero.',
        whyIsInvented: false,
        socratiHint: 'Querer → querr- (futuro: querré). Conditional: querría.',
        forms: { yo: 'querría', tú: 'querrías', 'él/ella': 'querría', nosotros: 'querríamos', 'ellos/ellas': 'querrían' },
      },
    ],
    signalWords: {
      strong: ['si pudiera', 'en tu lugar', 'yo que tú', 'con más tiempo', 'si tuviera'],
      weak: ['dijo que', 'pensé que', 'creía que'],
    },
    phase4Exercises: [
      {
        pronoun: 'tú', verb: 'poder', tense: 'condicional',
        sentenceFrame: '¿______ ayudarme con esto un momento?',
        expected: 'Podrías',
        signalWord: 'polite request',
        feedback: 'A polite request uses the conditional to soften the ask. More courteous than ¿Puedes?',
        isContrastPair: false,
      },
      {
        pronoun: 'yo', verb: 'hacer', tense: 'condicional',
        sentenceFrame: 'Yo en tu lugar lo ______ diferente.',
        expected: 'haría',
        signalWord: 'en tu lugar',
        feedback: 'En tu lugar = a hypothetical situation. What you WOULD do if you were them.',
        isContrastPair: false,
      },
      {
        pronoun: 'él/ella', verb: 'venir', tense: 'condicional',
        sentenceFrame: 'Dijo que ______ pero no apareció.',
        expected: 'vendría',
        signalWord: 'Dijo que',
        feedback: 'Dijo que + conditional = reported speech about a past future intention.',
        isContrastPair: false,
      },
      {
        pronoun: 'nosotros', verb: 'quedar', tense: 'condicional',
        sentenceFrame: 'Si no estuvieras tan ocupado, ______ más.',
        expected: 'quedaríamos',
        signalWord: 'Si no estuvieras',
        feedback: 'Si + imperfecto subjuntivo → conditional result. A hypothetical situation.',
        isContrastPair: false,
      },
      {
        pronoun: 'yo', verb: 'querer', tense: 'condicional',
        sentenceFrame: '______ un café, si no es molestia.',
        expected: 'Querría',
        signalWord: 'si no es molestia',
        feedback: 'A polite expression of desire — querría is softer and more refined than quiero.',
        isContrastPair: false,
      },
      {
        pronoun: 'ellos/ellas', verb: 'salir', tense: 'condicional',
        sentenceFrame: 'Con mejor tiempo, ______ a tomar algo fuera.',
        expected: 'saldrían',
        signalWord: 'Con mejor tiempo',
        feedback: 'A hypothetical — what they would do if the conditions were different.',
        isContrastPair: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // PRETÉRITO PERFECTO (stub — used in level 1 but less daily focus)
  // ──────────────────────────────────────────────────────────
  perfecto: {
    id: 'perfecto',
    name: 'Pretérito Perfecto',
    shortName: 'Perfecto',
    conceptualWhy: 'The "have done" tense — haber (present) + participio. Used for recent past events with a connection to the present, or when using time markers like hoy, esta semana, este año.',
    patternRule: {
      ar: 'he/has/ha/hemos/han + -ado (hablado)',
      er: 'he/has/ha/hemos/han + -ido (comido)',
      ir: 'he/has/ha/hemos/han + -ido (vivido)',
      note: '-er and -ir verbs share the -ido participio ending.',
    },
    phase1: {
      why: 'The perfecto is "I have done" — two parts: the present tense of haber + the past participle. Haber is not ser or estar here — it\'s a standalone auxiliary. The participle never changes. He comido, has comido, ha comido — comido stays the same throughout.',
      socratiQuestion: 'Haber in the present: he, has, ha, hemos, han. The -ar participio ending is -ado. Hablar → ¿hablado? Yes. So "I have spoken" in Spanish = ?',
      socratiAnswer: 'He hablado. The auxiliary (he/has/ha/hemos/han) carries the person, the participle is fixed. Nothing between them — no "siempre he nunca hablado." The two parts stay together.',
      patternRuleDisplay: 'he/has/ha/hemos/han + participio\n\n-ar → -ado: hablar → hablado\n-er → -ido: comer → comido\n-ir → -ido: vivir → vivido\n\nIrregular participios: hecho (hacer), dicho (decir), visto (ver),\npuesto (poner), vuelto (volver), roto (romper), abierto (abrir)',
      examples: [
        { spanish: 'Hoy he quedado con Marta para comer.', contextNote: 'Hoy = today, still in the current day' },
        { spanish: '¿Has visto lo que ha pasado?', contextNote: 'Recent event relevant to the current moment' },
        { spanish: 'Este año hemos viajado mucho.', contextNote: 'Este año = within the current year frame' },
      ],
    },
    modelVerbs: {
      hablar: { yo: 'he hablado', tú: 'has hablado', 'él/ella': 'ha hablado', nosotros: 'hemos hablado', 'ellos/ellas': 'han hablado' },
      comer:  { yo: 'he comido',  tú: 'has comido',  'él/ella': 'ha comido',  nosotros: 'hemos comido',  'ellos/ellas': 'han comido' },
      vivir:  { yo: 'he vivido',  tú: 'has vivido',  'él/ella': 'ha vivido',  nosotros: 'hemos vivido',  'ellos/ellas': 'han vivido' },
    },
    irregulars: [
      {
        verb: 'hacer',
        why: 'Hacer\'s participio is hecho — completely irregular. Group with other common irregular participios: dicho, visto, puesto, vuelto, roto, abierto, escrito.',
        whyIsInvented: false,
        socratiHint: '¿Qué has hecho hoy? — you know this. Hecho is the participio of hacer. Irregular.',
        forms: { yo: 'he hecho', tú: 'has hecho', 'él/ella': 'ha hecho', nosotros: 'hemos hecho', 'ellos/ellas': 'han hecho' },
        mnemonic: 'HeChO DiCho ViSto PueSto VueLto RoTo AbierTo — the "he cho" irregular participios.',
      },
    ],
    signalWords: {
      strong: ['hoy', 'esta mañana', 'este año', 'esta semana', 'ya', 'todavía no', 'alguna vez', 'nunca'],
      weak: ['recientemente', 'últimamente', 'hace poco'],
    },
    phase4Exercises: [
      {
        pronoun: 'yo', verb: 'hablar', tense: 'perfecto',
        sentenceFrame: 'Hoy ya ______ con él por teléfono.',
        expected: 'he hablado',
        signalWord: 'Hoy ya',
        feedback: 'Hoy ya = within today, a recent completed action with present relevance.',
        isContrastPair: false,
      },
      {
        pronoun: 'tú', verb: 'ver', tense: 'perfecto',
        sentenceFrame: '¿______ la nueva temporada ya?',
        expected: 'has visto',
        signalWord: 'ya (question about experience)',
        feedback: 'Ya = already? Asking about an experience up to now → perfecto.',
        isContrastPair: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // PLUSCUAMPERFECTO (stub for v1)
  // ──────────────────────────────────────────────────────────
  pluscuamperfecto: {
    id: 'pluscuamperfecto',
    name: 'Pluscuamperfecto',
    shortName: 'Pluscuamperfecto',
    conceptualWhy: 'The "had done" tense — imperfecto of haber + participio. For actions that happened before another past action: "Cuando llegué, ya se había ido."',
    patternRule: {
      ar: 'había/habías/había/habíamos/habían + -ado',
      er: 'había/habías/había/habíamos/habían + -ido',
      ir: 'había/habías/había/habíamos/habían + -ido',
      note: 'Same participios as perfecto. Same irregular participios apply.',
    },
    phase1: {
      why: 'The pluscuamperfecto is the "had done" tense — one step further back in the past than indefinido. "Cuando llegué (indefinido), ya se había ido (pluscuamperfecto)." It\'s the same structure as perfecto but with the imperfecto of haber instead of the present.',
      socratiQuestion: 'Perfecto uses: he/has/ha/hemos/han + participio. Pluscuamperfecto uses the imperfecto of haber: había/habías/había/habíamos/habían. So "I had spoken" = ?',
      socratiAnswer: 'Había hablado. The participio is identical — only the auxiliary changes from present to imperfecto haber.',
      patternRuleDisplay: 'había/habías/había/habíamos/habían + participio\n\nCuando llegué, ya se había ido.\n(When I arrived, he had already left.)',
      examples: [
        { spanish: 'Cuando llegué a la fiesta, ya se había ido.', contextNote: 'Two past events — the leaving happened before the arriving' },
        { spanish: 'Nunca había comido tan bien.', contextNote: 'Up to that point in the past — experience before a past moment' },
      ],
    },
    modelVerbs: {
      hablar: { yo: 'había hablado', tú: 'habías hablado', 'él/ella': 'había hablado', nosotros: 'habíamos hablado', 'ellos/ellas': 'habían hablado' },
      comer:  { yo: 'había comido',  tú: 'habías comido',  'él/ella': 'había comido',  nosotros: 'habíamos comido',  'ellos/ellas': 'habían comido' },
      vivir:  { yo: 'había vivido',  tú: 'habías vivido',  'él/ella': 'había vivido',  nosotros: 'habíamos vivido',  'ellos/ellas': 'habían vivido' },
    },
    irregulars: [],
    signalWords: {
      strong: ['ya', 'cuando', 'nunca antes', 'todavía no', 'antes de que'],
      weak: ['después de que', 'una vez que'],
    },
    phase4Exercises: [],
  },
}

// ============================================================
// TENSE LIST FOR UI
// ============================================================

export const TENSE_ORDER: TenseId[] = [
  'presente',
  'indefinido',
  'imperfecto',
  'futuro',
  'condicional',
  'perfecto',
  'pluscuamperfecto',
]

export const LEVEL_1_TENSES: TenseId[] = ['presente', 'indefinido', 'imperfecto', 'futuro', 'condicional', 'perfecto', 'pluscuamperfecto']

// ============================================================
// CONJUGATION HELPERS
// ============================================================

export function conjugateRegular(verb: Verb, tenseId: TenseId): Record<string, string> | null {
  const tense = TENSES[tenseId]
  if (!tense) return null

  const result: Record<string, string> = {}
  const pronouns = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos/ellas']

  // Simple conjugation for display purposes — real app uses pre-defined tables
  // for irregular verbs. This handles regular forms only.
  const { modelVerbs } = tense
  if (verb.infinitive === 'hablar') return modelVerbs.hablar as unknown as Record<string, string>
  if (verb.infinitive === 'comer') return modelVerbs.comer as unknown as Record<string, string>
  if (verb.infinitive === 'vivir') return modelVerbs.vivir as unknown as Record<string, string>

  return null // Falls back to derived conjugation in the session component
}
