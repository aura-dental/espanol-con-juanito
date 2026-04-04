import type { GrammarConcept } from './types'

export const GRAMMAR_CONCEPTS: GrammarConcept[] = [
  {
    id: 'ser_estar',
    name: 'Ser vs Estar',
    explanation: 'Both mean "to be" — but ser describes permanent or defining characteristics (identity, origin, material), while estar describes temporary states, locations, and conditions. The classic trick: ser is about what something IS, estar is about how it\'s DOING right now.',
    examples: [
      { spanish: 'Es español pero está en Londres ahora.', english: 'He\'s Spanish (identity) but he\'s in London now (location/temporary).' },
      { spanish: 'La paella está buenísima hoy.', english: 'The paella is delicious today — how it IS today specifically.' },
      { spanish: 'Es una persona muy divertida.', english: 'She\'s a very funny person — a defining characteristic.' },
      { spanish: 'Está un poco raro últimamente, ¿no?', english: 'He\'s been a bit weird lately — a temporary state, not his identity.' },
    ],
    watchOut: 'Location: almost always estar — but "El concierto es en el teatro" (ser) because you\'re describing the event\'s defining feature. Dead people use estar: "Está muerto." Estado civil (marital status) uses estar: "Está casado."',
  },
  {
    id: 'reflexive_verbs',
    name: 'Verbos Reflexivos (Reflexive Verbs)',
    explanation: 'Reflexive verbs are verbs where the subject and object are the same person — the action bounces back to the doer. They use reflexive pronouns: me, te, se, nos, se. Many common daily-life verbs are reflexive: levantarse, irse, quedarse, ponerse, llamarse.',
    examples: [
      { spanish: 'Me levanto a las ocho y me ducho en diez minutos.', english: 'I get (myself) up at eight and shower (myself) in ten minutes.' },
      { spanish: '¿A qué hora te vas?', english: 'What time are you leaving? (ir vs irse — irse emphasises departure)' },
      { spanish: 'Se llama Jordi y se considera más catalán que español.', english: 'His name is Jordi and he considers himself more Catalan than Spanish.' },
      { spanish: 'Nos quedamos en casa esta noche.', english: 'We\'re staying in tonight.' },
    ],
    watchOut: 'Some verbs change meaning when made reflexive: ir (to go) → irse (to leave/take off); dormir (to sleep) → dormirse (to fall asleep); llevar (to carry/wear) → llevarse (to get along). Ponerse is a chameleon — ponerse + adjective = to become: se puso nervioso (he got nervous).',
  },
  {
    id: 'gustar_type',
    name: 'Verbos tipo "Gustar"',
    explanation: 'These verbs work backwards from English — the thing you like is the subject, and you are the indirect object. Gustar, molar, apetecer, encantar, dar igual, importar all follow this pattern. The verb agrees with what is liked, not with who likes it.',
    examples: [
      { spanish: 'Me mola mucho el plan.', english: 'I really like the plan. (the plan appeals to me)' },
      { spanish: '¿Te apetece salir esta noche?', english: 'Do you feel like going out tonight?' },
      { spanish: 'Le da igual — lo que sea.', english: 'He doesn\'t mind — whatever.' },
      { spanish: 'Nos encantan las terrazas en verano.', english: 'We love terraces in summer. (las terrazas is plural → encantan)' },
    ],
    watchOut: 'The verb agrees with what you like, not with who: "Me gusta el vino" (singular) vs "Me gustan los vinos" (plural). Molar and apetecer are very colloquial Spanish (especially Spain) — perfect for your register. Gustar with a person (te/le/les) needs "caer bien/mal" for liking personality: "Me cae muy bien" = I really like him (as a person).',
  },
  {
    id: 'direct_object_pronouns',
    name: 'Pronombres de Objeto Directo',
    explanation: 'Direct object pronouns replace the direct object of a verb: lo, la, los, las (him/it/them). Me, te, nos also exist for first/second person. They go before a conjugated verb, or attached to an infinitive or gerund.',
    examples: [
      { spanish: '¿Has visto a Jordi? — Sí, lo vi ayer.', english: 'Have you seen Jordi? — Yes, I saw him yesterday.' },
      { spanish: '¿Tienes las llaves? — No, las dejé en casa.', english: 'Have you got the keys? — No, I left them at home.' },
      { spanish: 'Voy a llamarte ahora. / Te voy a llamar ahora.', english: 'I\'m going to call you now. (both positions are correct)' },
      { spanish: 'Cómelo ya — se va a enfriar.', english: 'Eat it already — it\'s going to get cold.' },
    ],
    watchOut: 'Lo/la agreement: lo = masculine or unknown, la = feminine. "Lo veo" (I see him/it) vs "La veo" (I see her/it). In Spain, "le" is widely used for male people instead of "lo" (leísmo) — "Le vi ayer" is perfectly normal for "I saw him yesterday." Don\'t over-correct it.',
  },
  {
    id: 'indirect_object_pronouns',
    name: 'Pronombres de Objeto Indirecto',
    explanation: 'Indirect object pronouns indicate to whom or for whom: me, te, le, nos, les. They go in the same position as direct object pronouns. When both appear together, indirect comes first — and le/les become se before lo/la.',
    examples: [
      { spanish: '¿Le has dicho lo del plan?', english: 'Have you told him/her about the plan?' },
      { spanish: 'Me ha mandado un mensaje rarísimo.', english: 'He sent me a very strange message.' },
      { spanish: '¿Se lo digo o no? (le lo → se lo)', english: 'Shall I tell him/her or not?' },
      { spanish: 'Nos han dado una mesa fenomenal.', english: 'They\'ve given us a great table.' },
    ],
    watchOut: 'The le→se swap: when an indirect object pronoun (le/les) comes before a direct object pronoun (lo/la/los/las), le changes to se. "Le lo digo" is wrong — it must be "Se lo digo." This catches everyone out at first.',
  },
  {
    id: 'por_para',
    name: 'Por vs Para',
    explanation: 'Both can translate as "for" but they serve different purposes. Para points forward — destination, purpose, deadline, recipient, opinion. Por points backward or sideways — cause, duration, exchange, means, agent (in passive).',
    examples: [
      { spanish: 'Lo hago para ti. / Te lo mando para el lunes.', english: 'I\'m doing it for you (recipient). / I\'ll send it to you by Monday (deadline).' },
      { spanish: 'Lo dejé por el trabajo — estaba agotado.', english: 'I left it because of work — I was exhausted. (cause)' },
      { spanish: 'Hablamos por teléfono una hora.', english: 'We talked by phone for an hour. (means / duration)' },
      { spanish: 'Para ser extranjero, habla muy bien.', english: 'For a foreigner, he speaks very well. (opinion from a reference point)' },
    ],
    watchOut: 'The trickiest overlap: duration. "Estudié por dos horas" (completed duration, by means of hours spent) vs "Estudio para ser médico" (purpose — studying in order to be). When in doubt: para = purpose/destination, por = cause/exchange.',
  },
  {
    id: 'modal_verbs',
    name: 'Verbos Modales',
    explanation: 'Spanish modal verbs express ability, obligation, and possibility. They\'re followed by an infinitive and have distinct shades of meaning: poder (can/be able to), querer (to want to), deber (should/must), tener que (to have to), hay que (one must/you need to, impersonal).',
    examples: [
      { spanish: '¿Puedes bajar el volumen?', english: 'Can you turn the volume down? (ability/permission)' },
      { spanish: 'Deberías llamarle — lleva días sin saber nada.', english: 'You should call him — he hasn\'t heard from you in days. (moral obligation)' },
      { spanish: 'Tengo que irme ya.', english: 'I have to go now. (personal obligation)' },
      { spanish: 'Hay que reservar con antelación en ese sitio.', english: 'You need to book in advance at that place. (general rule, no subject)' },
    ],
    watchOut: 'Deber vs deber de: "Debe de ser verdad" (must be true — deduction) vs "Debes decirle la verdad" (you must tell him — obligation). The de marks deduction. In casual speech, deber is often used for both, so don\'t over-correct when you hear it.',
  },
  {
    id: 'personal_a',
    name: 'La "a" Personal',
    explanation: 'When a specific, definite person (or pet) is the direct object of a verb, Spanish requires an "a" before it. This "personal a" has no direct English equivalent — it\'s a marker that signals "this is a person, not a thing."',
    examples: [
      { spanish: '¿Conoces a Marta?', english: 'Do you know Marta? (Marta = specific person → personal a)' },
      { spanish: 'Llama al médico.', english: 'Call the doctor. (al = a + el, specific professional → personal a)' },
      { spanish: 'Busco una secretaria eficiente.', english: 'I\'m looking for an efficient secretary. (non-specific → no personal a)' },
      { spanish: 'Tengo a mi perro aquí.', english: 'I have my dog here. (pets get personal a in affectionate contexts)' },
    ],
    watchOut: 'The personal a is NOT used after tener: "Tengo dos hermanas" (no a). And non-specific people don\'t get it: "Busco un médico" (any doctor) vs "Busco al médico" (the specific doctor). This trips people up constantly.',
  },
  {
    id: 'hace_time',
    name: 'Hace + Expresiones de Tiempo',
    explanation: 'Hace + time is how Spanish expresses duration and how long ago something happened. Two key patterns: hace + time + que + verb (how long something has been happening), and verb in preterite + hace + time (how long ago something happened).',
    examples: [
      { spanish: 'Hace dos años que vivo en las Islas.', english: 'I\'ve been living on the Islands for two years. (present tense — still happening)' },
      { spanish: 'Hace un momento que se fue.', english: 'He left a moment ago.' },
      { spanish: 'Lo vi hace tres días.', english: 'I saw him three days ago.' },
      { spanish: '¿Cuánto tiempo hace que no le ves?', english: 'How long has it been since you\'ve seen him?' },
    ],
    watchOut: 'Hace + present for ongoing duration, hace + preterite for how long ago. "Hace dos años que vivo aquí" (I\'ve been living here 2 years — still living here) vs "Viví allí hace dos años" (I lived there 2 years ago — not anymore).',
  },
  {
    id: 'desde_hace',
    name: 'Desde Hace / Desde Que',
    explanation: '"Desde hace" means "for" (duration with a start point still relevant now), while "desde que" means "since" + an event. Both connect a past starting point to the present — they\'re alternatives to the hace construction.',
    examples: [
      { spanish: 'Vivo aquí desde hace diez años.', english: 'I\'ve been living here for ten years. (= hace diez años que vivo aquí)' },
      { spanish: 'Desde que llegué, todo ha cambiado.', english: 'Since I arrived, everything has changed.' },
      { spanish: 'No le veo desde el verano.', english: 'I haven\'t seen him since the summer.' },
      { spanish: 'Trabajamos juntos desde hace meses.', english: 'We\'ve been working together for months.' },
    ],
    watchOut: 'Desde hace + time span (desde hace tres meses), desde + specific point (desde el lunes, desde 2020, desde que...). Mixing them up ("desde tres meses") is a classic learner error.',
  },
  {
    id: 'negatives',
    name: 'Palabras Negativas',
    explanation: 'Spanish uses double negation — unlike English, using two negative words is correct and required. "No sé nada" (I don\'t know anything) is not wrong — it\'s the only way to say it. Key negative words: nunca, nadie, nada, tampoco, ninguno.',
    examples: [
      { spanish: 'No he visto a nadie en todo el día.', english: 'I haven\'t seen anyone all day.' },
      { spanish: 'Nunca voy a ese sitio — me parece horrible.', english: 'I never go to that place — I find it horrible.' },
      { spanish: 'A mí tampoco me apetece.', english: 'I don\'t feel like it either. (tampoco = neither/nor either)' },
      { spanish: 'No quiero ninguno de los dos.', english: 'I don\'t want either of them.' },
    ],
    watchOut: 'Nunca and nadie can go before the verb without "no": "Nunca he estado allí" and "Nadie lo sabe" — when the negative word comes first, the "no" disappears. When it comes after: "No he estado allí nunca."',
  },
  {
    id: 'relative_clauses',
    name: 'Cláusulas Relativas',
    explanation: 'Relative clauses link information to a noun using que (that/which/who), quien (who — for people after prepositions), donde (where), and lo que (what/the thing that). Que is far and away the most common.',
    examples: [
      { spanish: 'El bar que me gusta está en el barrio de Gràcia.', english: 'The bar (that) I like is in the Gràcia neighbourhood.' },
      { spanish: 'La chica con quien quedé es diseñadora.', english: 'The girl I met up with is a designer. (quien after preposition)' },
      { spanish: 'No entiendo lo que me dices.', english: 'I don\'t understand what you\'re saying to me.' },
      { spanish: 'El piso donde viven es enorme.', english: 'The flat where they live is enormous.' },
    ],
    watchOut: 'Unlike English, Spanish cannot drop the relative pronoun: "The film I saw" must be "La película que vi" — never *"La película vi." Lo que (what/that which) is for concepts or things not previously mentioned: "Lo que me molesta es que..." (What bothers me is that...).',
  },
  {
    id: 'pronominal_change',
    name: 'Verbos Pronominales de Cambio',
    explanation: 'Pronominal verbs (with se) are used to describe changes of state or becoming. Spanish has multiple ways to express becoming, each with subtle differences: quedarse + adj (to end up/remain as), volverse + adj (gradual change), hacerse + noun/adj (deliberate becoming), ponerse + adj (sudden involuntary change).',
    examples: [
      { spanish: 'Se quedó sin palabras cuando lo oyó.', english: 'He was left speechless when he heard it. (quedarse = to end up in a state)' },
      { spanish: 'Se está volviendo un poco raro.', english: 'He\'s getting a bit strange. (volverse = gradual change)' },
      { spanish: 'Se ha hecho muy famoso en poco tiempo.', english: 'He\'s become very famous in a short time. (hacerse = often deliberate achievement)' },
      { spanish: 'Se pone nervioso cuando le hablan de trabajo.', english: 'He gets nervous when they talk to him about work. (ponerse = sudden/involuntary)' },
    ],
    watchOut: 'These overlap in casual speech and native speakers don\'t always distinguish them rigidly. The most common: ponerse for sudden states (se puso rojo), quedarse for resulting states (se quedó sola), volverse for gradual personality changes (se volvió insoportable).',
  },
  {
    id: 'comparatives',
    name: 'Comparativos y Superlativos',
    explanation: 'Comparisons in Spanish use más/menos + adjective + que (more/less...than), tan + adjective + como (as...as), and the superlative el/la más + adjective + de (the most...in). A handful of adjectives have irregular comparative forms.',
    examples: [
      { spanish: 'Este restaurante es más caro pero mucho mejor.', english: 'This restaurant is more expensive but much better.' },
      { spanish: 'No es tan malo como parece.', english: 'It\'s not as bad as it looks.' },
      { spanish: 'Es el sitio más bonito de toda la costa.', english: 'It\'s the most beautiful place on the entire coast.' },
      { spanish: 'Cuanto más lo pienso, menos lo entiendo.', english: 'The more I think about it, the less I understand it.' },
    ],
    watchOut: 'Irregular forms: bueno → mejor (better/best), malo → peor (worse/worst), grande → mayor (older/greater), pequeño → menor (younger/lesser). Mayor/menor are usually used for age or importance, not physical size. "Más grande" is still used for physical size.',
  },
  {
    id: 'adverbs_mente',
    name: 'Adverbios en -mente',
    explanation: 'Spanish adverbs are often formed by adding -mente to the feminine singular form of an adjective. It\'s the equivalent of English -ly. When two -mente adverbs appear together, only the last one takes the suffix.',
    examples: [
      { spanish: 'Habló tranquilamente y con mucha calma.', english: 'He spoke calmly and with great composure.' },
      { spanish: 'Llegó tarde, total y absolutamente tarde.', english: 'He arrived late, totally and absolutely late. (only the second gets -mente)' },
      { spanish: 'Claramente no ha entendido nada.', english: 'Clearly he hasn\'t understood anything.' },
      { spanish: 'Finalmente llegaron — pensé que no venían.', english: 'Finally they arrived — I thought they weren\'t coming.' },
    ],
    watchOut: 'Some common -mente adverbs are overused in Spanish: básicamente, literalmente, evidentemente. They\'re perfectly natural but learn the full set so you sound varied. Also note: "sólo" (only) and "solamente" are interchangeable, but the accent on sólo is now optional in modern Spanish.',
  },
  {
    id: 'prepositions_movement',
    name: 'Preposiciones de Movimiento y Lugar',
    explanation: 'Spanish prepositions of movement and location: a (to/at — destination or specific moment), en (in/on/at — location or general period), hacia (towards), desde (from), hasta (until/as far as), por (through/along/around), para (towards — figurative, heading to).',
    examples: [
      { spanish: 'Voy a Barcelona el viernes — llegaré hacia las seis.', english: 'I\'m going to Barcelona on Friday — I\'ll arrive around six.' },
      { spanish: 'Fui desde el aeropuerto hasta el hotel andando.', english: 'I walked from the airport to the hotel.' },
      { spanish: 'Pasamos por el barrio gótico y acabamos en el Borne.', english: 'We went through the Gothic Quarter and ended up in El Born.' },
      { spanish: 'Estamos en casa — pasa cuando quieras.', english: 'We\'re at home — come over whenever you like.' },
    ],
    watchOut: 'A vs en for location: "Estoy en el bar" (I\'m at the bar) vs "Voy al bar" (I\'m going to the bar). The movement vs static distinction. Por vs para for movement: por = moving through/along a space, para = heading towards a destination (often figurative).',
  },
  {
    id: 'diminutives',
    name: 'Diminutivos',
    explanation: 'Diminutives (-ito/-ita, -illo/-illa) are massively common in everyday Spanish, especially in Spain and Latin America. They express smallness, affection, or softness — and they\'re a key part of sounding natural rather than textbook. You\'ve been hearing them for years.',
    examples: [
      { spanish: 'Espera un momentito — ahora mismo voy.', english: 'Wait just a sec — I\'m coming right now.' },
      { spanish: '¿Tomamos un cafecito?', english: 'Shall we grab a little coffee? (affectionate, casual)' },
      { spanish: 'Dame un besito. / Está un poco cansadito.', english: 'Give me a little kiss. / He\'s a tiny bit tired. (softening)' },
      { spanish: 'Vivo aquí cerquita — a cinco minutitos andando.', english: 'I live right nearby — five minutes\' walk. (approximation softened)' },
    ],
    watchOut: 'Diminutives are not just "small" — they carry warmth, irony, or softening. "Un momentito" from a waiter means "I\'ll be a while." Context is everything. The -illo form (ratillo, momentillo) is slightly more rustic/regional. The -ito form is universal.',
  },
  {
    id: 'exclamatives',
    name: 'Estructuras Exclamativas e Intensificadoras',
    explanation: 'Spanish has rich exclamative structures that go far beyond simple adjectives. Key patterns: qué + noun/adjective (what a...!), lo + adjective + que (how... it is), menudo/a + noun (what a...!), and the intensifier -ísimo/-ísima.',
    examples: [
      { spanish: '¡Qué tarde es ya! / ¡Qué frío hace!', english: 'How late it is already! / How cold it is!' },
      { spanish: 'No sabes lo cansado que estoy.', english: 'You have no idea how tired I am. (lo + adj + que)' },
      { spanish: '¡Menudo lío! / ¡Menuda noche!', english: 'What a mess! / What a night! (menudo = what a — often ironic)' },
      { spanish: 'Está buenísimo. / Es tardísimo.', english: 'It\'s absolutely delicious. / It\'s incredibly late. (-ísimo intensifier)' },
    ],
    watchOut: 'Lo + adjective + que is often overlooked but constantly used: "Lo tarde que es" (how late it is), "Lo bien que lo pasamos" (how much fun we had). It\'s more emphatic than just qué. Menudo is almost always ironic or hyperbolic — menuda historia = quite the story (usually a complicated one).',
  },
  {
    id: 'passive_voice',
    name: 'Voz Pasiva (Reconocimiento)',
    explanation: 'Spanish passive voice (ser + participio) is used but much less than in English. Spanish strongly prefers active constructions or the "se pasivo" instead. Focus here is recognition — understanding it when you see it, not producing it.',
    examples: [
      { spanish: 'El proyecto fue aprobado por el ayuntamiento.', english: 'The project was approved by the council. (formal/written passive)' },
      { spanish: 'La reunión ha sido cancelada.', english: 'The meeting has been cancelled. (passive without agent — common in notices)' },
      { spanish: 'Se canceló la reunión.', english: 'The meeting was cancelled. (se pasivo — far more natural in speech)' },
      { spanish: 'Se dice que va a cerrar.', english: 'It\'s said that it\'s going to close. (impersonal se — very common)' },
    ],
    watchOut: 'In speech, Spanish overwhelmingly uses se pasivo or active constructions instead of ser + participio. "Se venden pisos" is much more natural than "Los pisos son vendidos." Ser passive sounds formal and appears mainly in writing, journalism, and official contexts.',
  },
  {
    id: 'se_impersonal',
    name: 'Se Impersonal / Se Pasivo',
    explanation: 'The "se" construction is one of the most useful and versatile in Spanish. Se impersonal is the equivalent of English "one," "you" (general), or "they" (unspecified). Se pasivo replaces a passive construction. Both are constant in daily Spanish.',
    examples: [
      { spanish: 'Aquí se come muy bien.', english: 'You eat very well here. / The food here is great. (se impersonal)' },
      { spanish: 'Se habla mucho de ese tema últimamente.', english: 'That topic is talked about a lot lately. (se pasivo)' },
      { spanish: 'En España se cena tarde — sobre las diez.', english: 'In Spain, dinner is eaten late — around ten.' },
      { spanish: 'Se buscan camareros con experiencia.', english: 'Experienced waiters wanted. (literal: waiters are sought)' },
    ],
    watchOut: 'The se agrees with the noun in se pasivo: "Se vende piso" (singular) vs "Se venden pisos" (plural). This trips people up — the se looks like a reflexive pronoun but it\'s not doing a reflexive job here. It\'s functioning as a grammatical tool to avoid naming an agent.',
  },
  {
    id: 'si_clauses',
    name: 'Oraciones Condicionales (Si + Indicativo)',
    explanation: 'Real conditionals — things that are actually possible — use si + present indicative, then future or present in the result. These are the Level 1 si clauses. (Hypothetical si clauses with subjuntivo are Level 2.)',
    examples: [
      { spanish: 'Si llegas antes de las ocho, te esperamos.', english: 'If you arrive before eight, we\'ll wait for you.' },
      { spanish: 'Si tienes tiempo, pasa a vernos.', english: 'If you have time, come and see us.' },
      { spanish: 'Si quieres, quedamos mañana.', english: 'If you want, we can meet up tomorrow.' },
      { spanish: 'Si no funciona, lo devolvemos.', english: 'If it doesn\'t work, we\'ll return it.' },
    ],
    watchOut: 'Real conditionals never use future after si: "Si vendrás" is wrong — always si + present: "Si vienes." This is one of the most consistent rules in Spanish. The confusion comes from English ("if you will come") — in Spanish, after si, it\'s always present indicative for real conditions.',
  },
]

export const GRAMMAR_CONCEPT_IDS = GRAMMAR_CONCEPTS.map(c => c.id)

export function getNextGrammarConcept(seenConceptIds: string[]): GrammarConcept {
  const unseen = GRAMMAR_CONCEPTS.filter(c => !seenConceptIds.includes(c.id))
  if (unseen.length > 0) return unseen[0]
  // All seen — cycle back to start
  return GRAMMAR_CONCEPTS[0]
}
