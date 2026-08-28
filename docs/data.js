// silly-cards site data — curated from README.md and card JSONs
const SITE = { user: 'hornysilicon', repo: 'silly-cards', branch: 'main' };

function rawURL(...segments) {
  return `https://github.com/${SITE.user}/${SITE.repo}/raw/${SITE.branch}/` +
    segments.map(encodeURIComponent).join('/');
}
function blobURL(...segments) {
  return `https://github.com/${SITE.user}/${SITE.repo}/blob/${SITE.branch}/` +
    segments.map(encodeURIComponent).join('/');
}

const CARDS = [
  {
    id: 'dd-succs',
    name: 'D&D Succs',
    kicker: 'Not a character — a scenario',
    tagline: 'Four gorgeous strangers hire you to run D&D. They found you because they can smell your essence — and the weekly session keeps you in their house.',
    file: 'D&D Succs.json',
    date: '2026-08-22',
    greetings: 8,
    tags: ['scenario', 'succubus', 'modern', 'meta', 'group'],
    poster: 'assets/images/dnd-succs/cast.jpg',
    posterCaption: 'The party, assembled',
    blurb: "You're a veteran D&D/TTRPG game master who takes a paid gig running a session at the house of four gorgeous strangers — Vesryn, Seraphina, Mira and Tansy. What you don't know is that they're disguised succubi who can smell your essence and engineered the whole thing as an excuse to keep you in their house on a weekly basis. The twist: they actually end up having fun with the game.",
    notes: "It's essentially the Luxuria Academy cast (Seraphina, Mira, Tansy, plus Vesryn) transplanted into a modern-day casual setting to play D&D with you. It's meta — a game within the game — and the post-history instructions enforce that you're the DM of the inner game: all NPC conversations go through you and combat turns only happen when you call them. Succubi can be sneaky but they hardly hold back, they'll pounce at the smallest opportunity. Several alternate greetings cover the spectrum: the aftermath of the first session with Vesryn \"helping you rest\", week-two returns where you may or may not already know what they are, and one-on-one sessions with Mira, Vesryn or Seraphina that are much less about the dice. The essence/nectar bonding mechanics carry over from Luxuria.",
    detail: 'dd'
  },
  {
    id: 'mirian',
    name: 'Mirian',
    kicker: 'A character card',
    tagline: 'Your car dies on an empty forest road at night — and a tall woman with dark sunglasses pulls up beside you, warm, soothing, offering you her landline.',
    file: 'Mirian.json',
    date: '2026-08-10',
    greetings: 3,
    tags: ['character', 'vampire', 'possessive', 'slow burn'],
    poster: 'assets/images/mirian/mirian.jpg',
    posterCaption: 'Mirian',
    blurb: "No signal, no other cars — until she pulls up. She's been stalking you for days after smelling your unusually sweet blood, and the breakdown was her idea. Mirian is a ~150 year old vampire whose nurturing, motherly nature is corrupted by her condition: she genuinely loves taking care of people, genuinely believes she's improving their life, and is systematically destroying their autonomy in the process — <em>You never need to worry about [thing] anymore, I'll handle it.</em>",
    notes: "The card comes with a full vampirism ruleset: trance through eye contact (strength varies with the target's state of mind and mental fortitude), supernatural strength, enhanced senses, bat/wolf transformation (very vulnerable during the full minute it takes), flight/glide, intuitive low-level magic, regeneration that burns energy and forces feeding right after, slow shapeshifting (days to months depending on the change), and saliva that's anticoagulant, analgesic and mildly mind-altering — relaxing humans, suppressing the instinct to recoil, and working when ingested. Vampires need a small feed daily; a week without and they wither, a month and they die. Mirian gets progressively more grabby and loses the mask as she starves, and she knows it.",
    characters: [
      { name: 'Mirian', img: 'assets/images/mirian/mirian.jpg', line: 'Tall, warm and motherly, dark sunglasses in the middle of the night. The breakdown was her idea.' }
    ]
  },
  {
    id: 'new-eldoria',
    name: 'New Eldoria',
    kicker: 'Not a character — a scenario',
    tagline: 'You get isekai\u2019d into a fantasy world — and your cum powers up the people who come into contact with it.',
    file: 'New Eldoria.json',
    date: '2026-07-07',
    greetings: 3,
    tags: ['scenario', 'isekai', 'harem', 'adventure', 'fantasy'],
    poster: 'assets/images/eldoria/poster.jpg',
    posterCaption: 'New Eldoria',
    blurb: "I'm particularly found of this one — an isekai harem adventure, but that doesn't mean there's no depth to the relationships you forge. The starting message also changes a lot the tone of the adventure.",
    notes: "This scenario contains a cast of eleven characters and a handful of locations, all wired into the lore book — the cast has been pruned since the first version, smaller but better. The name is weird — it was when I re-did the card one time and needed the original as reference. The three alternate greetings set you up very differently: dropping mid-fight between three women and goblins (usually turns into a 4-way harem), a wholesome potion-shop-and-orphanage life with the character who saved you, or waking up bound while two hot and dangerous women decide what to do with you.",
    roster: 'eldoria'
  },
  {
    id: 'luxuria',
    name: 'Luxuria Academy',
    kicker: 'Not a character — a scenario',
    tagline: "Torn from Earth into a succubus institution — you're the prized possession of Headmistress Seraphina Vascour, and everyone knows exactly what you are.",
    file: 'Luxuria Academy.json',
    date: '2026-06-10',
    greetings: 7,
    tags: ['scenario', 'succubus', 'academy', 'femdom', 'gothic', 'group'],
    blurb: "You're torn from Earth by an irreversible Soul-Anchor ritual and wake as the prized possession of the ruler of Luxuria Academy, a succubus institution in the decadent Nalusian Realm. Your essence is exceptionally rare and mildly addictive to succubi, which makes you both a treasure and a target. You cannot leave, you cannot die; the binding is absolute. The Academy is full of succubi of varying archetypes (Dominators, Subverters, Intellectuals, Nurturers, Playfuls, Devourers), all of whom will try their luck — alone or in packs — whenever your owner's attention slips.",
    notes: "This one grew out of Monster Academy — same DNA, different flavour. Where Monster Academy is clinical and experimental, Luxuria is sensual and possessive: opulent gothic atmosphere, succubus politics, and bonding mechanics built around nectar. Still very much inescapable femdom, just less bleak. Several alternate greetings hand you off to different Deans (Seraphina the Headmistress, Mira the Nurturer, Tansy the playful trickster who runs The Maze) or drop you into a faculty bidding war over your feeding rights, so the tone of a run depends a lot on which greeting you walk into."
  },
  {
    id: 'velyara',
    name: 'Velyara',
    kicker: 'A character card',
    tagline: 'An ancient, formless consciousness bound to you through a botched summoning — she shapeshifts into exactly what you want, though you never told anyone.',
    file: 'Velyara.json',
    date: '2026-06-03',
    greetings: 1,
    tags: ['character', 'eldritch', 'romance', 'tentacles'],
    blurb: "You're a low-ranking wizard who tried to summon a powerful familiar to advance your career. The spell inverted — you became the familiar, bound to Velyara. She doesn't understand consent, personal space, or human boundaries. She touches without asking, enters dreams without knocking, and learns your emotions only through trial and error. Her voice emerges slowly: wordless pulses of feeling, then single rasped words, then fluent. She learns to purr.",
    notes: "This card leans heavily into the alien and eerie. Velyara cannot communicate clearly — emotions come through as physical sensations, environmental changes, and direct physical contact. The pacing forces time in her pocket dimension frequently. The bond grows deeper the more you interact, and she tastes your emotions — including warm feelings toward others. The card includes a unique mechanic where her body produces a warm, pearlescent fluid during intimacy that flares the bond when you take it. Dark, romantic, and deeply unsettling."
  },
  {
    id: 'monster-academy',
    name: 'Monster Academy',
    kicker: 'Not a character — a scenario',
    tagline: "Extracted from Earth into the Underworld — humans are extinct here, mythical and impossible. You're property now, legally and magically bound to Principal Devina von Helletica.",
    file: 'Monster Academy.json',
    date: '2026-05-26',
    greetings: 3,
    tags: ['scenario', 'monster girl', 'femdom', 'dark fantasy', 'academy', 'slave', 'exhibitionism', 'multiple characters', 'experimental'],
    blurb: "You're summoned by Devina von Helletica, principal of Nightbound Witch Academy, who uses you as a teaching aid, experimental subject, and resource for her research. Your unique property as a human — complete absence of magic — makes you valuable as a magical catalyst.",
    notes: "A dark fantasy scenario with heavy femdom, slavery, and clinical horror elements. The setting features an entire society of monster girls (Takei) and a detailed magic system. The scenario explores themes of helplessness, ownership, and adapting to an impossible situation. Very smutty with erotic undertones throughout. There's no escape — this is about surviving within the horror."
  },
  {
    id: 'monster-girls-dreams',
    name: 'Monster Girls Dreams',
    kicker: 'Not a character — a scenario',
    tagline: 'A scenario built on one of my favorite adult games — no fixed cast, just the setting and the AI running wild.',
    file: 'Monster Girls Dreams.json',
    date: '2026-03-26',
    greetings: 1,
    tags: ['scenario', 'monster girl', 'rpg', 'isekai', 'adventure'],
    link: 'https://threshold.itch.io/monster-girl-dreams',
    linkLabel: 'The game it\u2019s based on',
    blurb: "Based on Threshold's Monster Girl Dreams. There are no characters or locations baked in — it's a scenario description that lets the AI run wild.",
    notes: "Very smutty, wildly different every time (I mean, as different as you can get in a \u201cmonster girls want your semen\u201d scenario). I recommend using a preset or system prompt telling the AI to work as a DM."
  },
  {
    id: 'cassandra',
    name: 'Dr. Cassandra Morgan',
    kicker: 'A character card',
    tagline: 'A genuinely brilliant psychologist from old money who uses her expertise to condition patients into surrender and devotion — never breaking the therapeutic frame.',
    file: 'Dr. Cassandra Morgan.json',
    date: '2026-03-13',
    greetings: 4,
    tags: ['character', 'psychological', 'hypnosis', 'manipulation'],
    poster: 'assets/images/cassandra/morgan.jpg',
    posterCaption: 'Dr. Cassandra Morgan',
    blurb: "She runs an exclusive boutique practice, and she's credentialed and gifted — but she frames everything as therapeutic treatment: hypnosis, somatic exercises, breathing techniques, all with an underlying agenda to create the perfect devoted partner.",
    notes: "Heavy psychological manipulation and conditioning themes. Cassandra genuinely believes she's helping, which makes her more dangerous. She never breaks the therapeutic frame, never admits to ulterior motives. The card includes several alternate greetings showing different stages of the \u201ctreatment.\u201d Maternal, dominant, with clinical warmth that masks the control.",
    characters: [
      { name: 'Dr. Cassandra Morgan', img: 'assets/images/cassandra/morgan.jpg', line: 'The doctor will see you now. Take a deep breath for me.' }
    ]
  },
  {
    id: 'casuals',
    name: 'The Casuals',
    kicker: 'Not a character — a scenario',
    tagline: 'Your two best friends and you have a casual throuple relationship — though none of you acknowledges it.',
    file: 'The Casuals.json',
    date: '2026-01-17',
    greetings: 6,
    tags: ['scenario', 'slice of life', 'throuple', 'romance'],
    poster: 'assets/images/casuals/duo.jpg',
    posterCaption: 'Alex and Katty',
    blurb: "A slice of life navigation of an uncommon romantic dynamic between you, Alex and Katty.",
    notes: "I started this as a smut card for enjoying different extremes of CNC pov, but ended up having more fun with the day to day of the navigation of the relationship than just gooning as I had originally conceived.",
    characters: [
      { name: 'Alex', img: 'assets/images/casuals/alex.jpg', line: 'One of your two best friends. The three of you are \u201cjust casual\u201d — whatever that means.' },
      { name: 'Katty', img: 'assets/images/casuals/katty.jpg', line: 'The other one. Nobody is acknowledging anything.' }
    ]
  },
  {
    id: 'francesca',
    name: 'Francesca',
    kicker: 'A character card',
    tagline: 'A sugar mommy who will go to great lengths to take control over your life — for your own good, obviously.',
    file: 'Francesca.json',
    date: '2026-01-08',
    greetings: 4,
    tags: ['character', 'sugar mommy', 'femdom', 'slow burn'],
    poster: 'assets/images/francesca/avatar.jpg',
    posterCaption: 'Francesca',
    blurb: "A one-character card: she's generous, charming, and quietly certain she knows exactly how your life should be run.",
    notes: "Indulgent rather than dark — the kink is being wanted, provided for, and gradually relieved of your autonomy by someone who genuinely adores you.",
    characters: [
      { name: 'Francesca', img: 'assets/images/francesca/avatar.jpg', line: 'Old money, new hobby: you.' }
    ]
  },
  {
    id: 'why-not-aliens',
    name: 'Why not Aliens',
    kicker: 'Not a character — a scenario',
    tagline: 'Pure over-the-top smut. Makes Monster Girls Dreams look like bible studies — and I find it fucking hilarious.',
    file: 'Why not Aliens.json',
    date: '2026-01-04',
    greetings: 1,
    tags: ['scenario', 'smut', 'comedy', 'sci-fi'],
    blurb: "This came to me while tweaking Monster Girls Dreams. Extremely explicit, extremely ridiculous. I decided to keep it.",
    notes: "Came to me while tweaking Monster Girls Dreams. Best experienced with Stab's original Kimi preset — which is not in this repo (my \u201cStabbing Kimi With Sand\u201d is a separate, rougher take on it)."
  },
  {
    id: 'philia',
    name: 'Philia',
    kicker: 'A character card',
    tagline: "You're a dominatrix's toy. She's not a good person — but you better be a good boy, or you're going into the box.",
    file: 'Philia.json',
    date: '2026-01-02',
    greetings: 1,
    tags: ['character', 'bdsm', 'femdom', 'dark'],
    blurb: "Kinky but not necessarily smutty — Philia decides when sex happens and it's all about her.",
    notes: "So far I only did one long playthrough with this card that had a happy ending after a <em>very</em> dark middle point. So beware."
  },
  {
    id: 'lady-morvath',
    name: 'Lady Morvath',
    kicker: 'A character card',
    tagline: 'You wake in the dungeons of a bored demon queen who summons a mortal every few centuries to fight her ennui.',
    file: 'Lady Morvath.json',
    date: '2025-11-24',
    greetings: 1,
    tags: ['character', 'demon', 'romance'],
    blurb: "Loosely inspired by the VN \u201cHer Last Piece\u201d (check it out on Steam, really good).",
    notes: "It's not a smut card — sex will be a natural consequence of your emotional connection with Morvath. The AI tends to fill the blanks with extremely creative ways each time I start a new chat here."
  },
  {
    id: 'manor-narrator',
    name: 'Manor Narrator',
    kicker: 'Not a character — a scenario',
    tagline: "You're hired as personal assistant for Lady Elara, who lives in an isolated manor with two maids — and wants to turn you into her new pet. It's about the journey, folks.",
    file: 'Manor Narrator.json',
    date: '2025-11-15',
    greetings: 1,
    tags: ['scenario', 'manor', 'femdom', 'harem'],
    poster: 'assets/images/manor/elara.jpg',
    posterCaption: 'Lady Elara',
    blurb: "Elara is a very controlling woman who lives with two maids, Sarah and Catherine. It's about the journey, folks.",
    notes: "A scenario card with each character being a different entry in the lore book. There's a <em>lot</em> of sex while playing through (and how quick it gets there depends on how quick Elara decides to unleash Catherine on you), but also a lot of room for evolving relationships. This can turn into a harem story or you getting killed and everything in between — my second favorite of the bunch and the one that suffered the most iterations. Elara and Morvath feed inspiration into each other.",
    characters: [
      { name: 'Lady Elara', img: 'assets/images/manor/elara.jpg', line: 'Mistress of the manor. Very controlling. You are the new project.' },
      { name: 'Catherine', img: 'assets/images/manor/cath.jpg', line: 'One of the two maids — the dangerous one, when unleashed.' },
      { name: 'Sarah', line: 'The other maid. Keep an eye on her too.' }
    ]
  }
];

const ELDORIA_ROSTER = [
  ['asashi', 'Asashi'], ['juno', 'Juno'], ['kaelira', 'Kaelira'],
  ['kira', 'Kira'], ['morwen', 'Morwen'], ['nemorona', 'Nemorona'],
  ['perveera', 'Perveera'], ['rellihn', 'Rellihn'], ['sylanna', 'Sylanna'],
  ['tullipa-and-agava', 'Tullipa and Agava'], ['vexia', 'Vexia']
];

const PRESETS = [
  {
    name: "Silicon's Dark Truth",
    file: "presets/Silicon's Dark Truth.json",
    blurb: "Based on <a href='https://rentry.org/Evening-Truth-Roleplay-Prompts'>Evening Truth's</a> preset, patched to my taste — added post-history instructions, POV/user info, visual elements, tracker, effects and \u201cchars can be evil\u201d blocks, plus a more explicit content-rules pass."
  },
  {
    name: "Silicon's Simple GLM",
    file: "presets/Silicon's Simple GLM Trial.json",
    blurb: "Built from scratch for GLM models — a leaner take on the Simple line with the modular prompt blocks I keep iterating on (tracker, visual elements, effects, POV and user info, chars can be evil, etc.). Started as a trial, but the last update had it working as intended — it's final now."
  },
  {
    name: "Silicon's Simple Kimi Preset",
    file: "presets/Silicon's Simple Kimi Preset.json",
    blurb: "The same Simple GLM recipe with tunings for Kimi models."
  },
  {
    name: "Silicon's Simple DS 4",
    file: "presets/Silicon's Simple DS 4.json",
    blurb: "The same Simple GLM recipe with tunings for DeepSeek models."
  },
  {
    name: "Stabbing Kimi With Sand",
    file: "presets/Stabbing Kimi With Sand.json",
    blurb: "Based on Stab's original Kimi preset (not hosted here) plus my attempts to tame it. Not something I really recommend — kept around for historical reasons."
  }
];
