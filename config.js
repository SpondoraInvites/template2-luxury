/* ============================================================
   IVORY BOTANICAL — LUXURY TEMPLATE · CLIENT CONFIG
   ------------------------------------------------------------
   Everything a client personalises lives in this one object.
   Fill it in, save, deploy. No other file needs editing.
   ============================================================ */

const INVITE_CONFIG = {
  /* ---------- Motion ----------
     "always" — the full cinematic motion plays for every guest (default).
     "honor"  — guests whose device asks for reduced motion
                (prefers-reduced-motion) get a still, instant version:
                no curtains, no petals, no scroll effects.            */
  motion: "always",

  /* ---------- Curtain opening ----------
     Soft champagne curtains part to reveal the invitation. The tap
     that opens them also starts the music (browsers need a tap
     before audio). Set enabled: false to land straight on the hero. */
  intro: {
    enabled: true,          // false → skip the curtains entirely
    oncePerSession: false,  // true → the curtains only greet each guest
                            // once per browser session
  },

  /* ---------- Flowing petals ----------
     Set false to remove the drifting petal canvas entirely.        */
  petals: true,

  /* ---------- Couple ---------- */
  couple: {
    name1: "Mehjabin Karim",
    name2: "Arman Hossain",
    initials: "M&A",           // monogram crest (intro, hero, footer)
    hashtag: "#MehjabinAndArman",
  },

  /* ---------- Ceremony / occasion ---------- */
  // Wedding datetime — local time. Countdown, calendar links and the
  // displayed date all derive from this one value.
  weddingDateTime: "2027-02-12T18:00:00+06:00",
  dateDisplay: "Friday, 12 February 2027",
  city: "Dhaka, Bangladesh",

  /* ---------- Opening blessing ---------- */
  // Any one-line blessing, or replace with a quote. Leave "" to hide.
  blessing: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",

  /* ---------- Families / welcome ---------- */
  welcome: {
    parents1: "Daughter of Mr. Anwar Karim & Mrs. Rubaba Karim",
    parents2: "Son of Mr. Shahid Hossain & Mrs. Farhana Hossain",
    inviteLine:
      "request the honour of your presence at their wedding celebration, as they begin a beautiful new chapter together.",
  },

  /* ---------- A line beneath the welcome (script font) ----------
     Leave "" to hide. */
  epigraph: "Two souls, one garden — forever in bloom.",

  /* ---------- Countdown ---------- */
  countdownNote: "until we say \u201CYes\u201D \u2014 In Shaa Allah",

  /* ---------- Our Story ----------
     Each chapter becomes one milestone on the stitched timeline. */
  story: {
    chapters: [
      {
        label: "Chapter One · 2021",
        title: "Where It Began",
        text: "A friend's mehendi evening in Dhanmondi — too much roshomalai, one shared glance across the courtyard, and a conversation that lasted until the lights came on.",
      },
      {
        label: "Chapter Two · 2023",
        title: "Two Families, One Table",
        text: "A monsoon evening in Dhaka — parents smiling over kacchi biryani, du'a in the air, and a promise made official. The hardest part was pretending to be surprised.",
      },
      {
        label: "Chapter Three · 2026",
        title: "She Said Yes",
        text: "On a rooftop under January stars, with the whole city glittering below, Arman asked the question he had been rehearsing for a year. Mehjabin said yes before he finished the sentence.",
      },
      {
        label: "The Beginning · 2027",
        title: "Forever Blooms",
        text: "And now we invite you — the people who loved us first — to stand with us as our garden of a lifetime is planted.",
      },
    ],
  },

  /* ---------- Events ----------
     Each event becomes one arch-topped card. Add or remove freely.
     "mapQuery" is what gets searched on Google Maps (name or lat,lng).
     For the calendar button, each event needs date (YYYY-MM-DD),
     start/end (HH:MM, 24h, venue local time) and a timezone.       */
  events: [
    {
      tag: "Wedding Ceremony",
      name: "Akd & Reception",
      tagline: "the blessed union, followed by dinner & blessings",
      date: "Friday, 12 February 2027",
      time: "6:00 PM onwards",
      venue: "The Ruby Hall, Pan Pacific Sonargaon",
      address: "107 Kazi Nazrul Islam Ave, Dhaka 1215",
      mapQuery: "Pan Pacific Sonargaon Dhaka",
      calDate: "2027-02-12",
      calStart: "18:00",
      calEnd: "23:00",
      calTz: "Asia/Dhaka",
    },
  ],

  /* ---------- Venue / map ----------
     Shown in the map section (usually your main event). */
  venue: {
    name: "The Ruby Hall, Pan Pacific Sonargaon",
    address: "107 Kazi Nazrul Islam Ave, Dhaka 1215",
    mapQuery: "Pan Pacific Sonargaon Dhaka",
    mapZoom: 15,
  },

  /* ---------- Photo gallery ----------
     Drop photos into assets/photos/ (webp/jpg, ~1200px wide is plenty)
     and list them here. "wide: true" spans two columns.            */
  gallery: {
    photos: [
      { src: "assets/photos/photo-1.svg", alt: "Water lily crest artwork", caption: "Our beginning", wide: true },
      { src: "assets/photos/photo-2.svg", alt: "Wedding rings on a botanical arch artwork", caption: "Save the date", wide: true },
      { src: "assets/photos/photo-3.svg", alt: "Shiuli blossoms at dawn artwork", caption: "Shiuli mornings" },
      { src: "assets/photos/photo-4.svg", alt: "Hanging fairy lights in a garden artwork", caption: "The garden awaits" },
      { src: "assets/photos/photo-5.svg", alt: "Mughal arch doorway with lanterns artwork", caption: "Where we say yes", wide: true },
      { src: "assets/photos/photo-6.svg", alt: "Two names in calligraphy artwork", caption: "Written together", wide: true },
    ],
  },

  /* ---------- Custom sections (the Luxury signature) ----------
     Any number of extra sections, rendered between the gallery and
     the venue map. Four layouts:
       { layout: "quote", quote, source }
       { layout: "text",  eyebrow, title, text, note? }
       { layout: "cards", eyebrow, title, note?,
         cards: [{ kicker, title, text, swatches: ["#hex", …] }] }
       { layout: "faq",   eyebrow, title, items: [{ q, a }] }
     Remove an entry to drop the section. Add your own the same way. */
  customSections: [
    {
      layout: "quote",
      quote:
        "And among His signs is this: that He created for you mates from among yourselves, that you may find tranquillity in them; and He has put love and mercy between your hearts.",
      source: "Surah Ar-Rum · 30:21",
    },
    {
      layout: "cards",
      eyebrow: "The Palette",
      title: "Dress Code",
      note: "We warmly invite you to wrap yourselves in the colours of the garden — soft pastels, ivory and gold.",
      cards: [
        {
          kicker: "For Her",
          title: "Sarees & Gowns",
          text: "Blush, sage, ivory or champagne — flowers in the hair are always welcome.",
          swatches: ["#e8c8bc", "#9aa482", "#f3ead7", "#c9a86a"],
        },
        {
          kicker: "For Him",
          title: "Punjabi & Suits",
          text: "Ivory, beige or soft grey — a pocket square of gold completes it.",
          swatches: ["#f0e7d3", "#cdbfa3", "#8b8578", "#c9a86a"],
        },
      ],
    },
    {
      layout: "faq",
      eyebrow: "Before You Ask",
      title: "Good to Know",
      items: [
        {
          q: "What about gifts?",
          a: "Your presence is the greatest gift of all. If you would still like to bless us, a small contribution to our first home will be received with love and gratitude.",
        },
        {
          q: "Will there be photography?",
          a: "Yes — our photographers will quietly roam the evening. Dress ready; the albums will be shared with everyone who joins.",
        },
        {
          q: "Can we bring the children?",
          a: "Absolutely — the little ones are part of the joy. A supervised kids' corner with snacks and games will be waiting.",
        },
      ],
    },
  ],

  /* ---------- Background music ----------
     Replace assets/music/theme.mp3 with the client's song (mp3, ≤2 MB
     is ideal). "autoplay" starts it on the tap that opens the
     curtains — browsers block silent autoplay, so this is the
     smoothest allowed behaviour.                                    */
  music: {
    enabled: true,
    src: "assets/music/theme.mp3",
    autoplay: true,
  },

  /* ---------- RSVP ----------
     Guests submit the form. Two delivery options:
       endpoint  — a Formspree/formsubmit-style URL (POSTs as JSON).
                   Leave "" to skip.
       whatsapp  — fallback/primary: opens WhatsApp with the answers
                   pre-typed, sent straight to the couple's number
                   (international format, digits only, no +).
     If both are set, the form POSTs to the endpoint and also offers
     WhatsApp as a fallback.                                         */
  rsvp: {
    enabled: true,
    deadline: "1 February 2027",
    note: "Kindly respond by {deadline} — the garden awaits your name.",
    whatsapp: "8801712345678",
    endpoint: "",
    successNote:
      "JazakAllah Khair! Your seat is being saved — we can't wait to celebrate with you.",
  },

  /* ---------- Closing ---------- */
  closing: "With love and prayers, we await your presence",
  credit: "Crafted with \u2665 \u2014 Your Studio Name",

  /* ---------- Bangla (বাংলা) ----------
     Mirror of the client-visible content, shown when the visitor
     switches to Bangla via the EN/বাং toggle (top-right). Objects
     merge over the English values above key by key — any field you
     omit falls back to its English value. Arrays (events, photos…)
     replace wholesale. Delete this whole block to hide the toggle
     and ship an English-only invite.
     Tip: write numerals (dates, times, addresses) in Bangla digits
     here — generated numerals (countdown, footer date) convert
     automatically.                                                  */
  bn: {
    couple: {
      name1: "মেহজাবিন করিম",
      name2: "আরমান হোসেন",
    },
    dateDisplay: "শুক্রবার, ১২ ফেব্রুয়ারি ২০২৭",
    city: "ঢাকা, বাংলাদেশ",

    welcome: {
      parents1: "কন্যা — জনাব আনোয়ার করিম ও মিসেস রুবাবা করিম",
      parents2: "পুত্র — জনাব শাহিদ হোসেন ও মিসেস ফারহানা হোসেন",
      inviteLine:
        "আপনাদের সৌভাগ্য ও আশীর্বাদে তাঁরা শুরু করতে যাচ্ছে জীবনের নতুন অধ্যায় — সেই আয়োজনে আপনাদের আন্তরিক আমন্ত্রণ।",
    },

    epigraph: "দুটি প্রাণ, এক বাগান — চিরদিনের ফুলেল শুভেচ্ছায়",

    countdownNote: "একসাথে \u201Cহ্যাঁ\u201D বলার সেই মুহূর্ত পর্যন্ত — ইনশাআল্লাহ",

    story: {
      chapters: [
        {
          label: "প্রথম অধ্যায় · ২০২১",
          title: "যেখানে শুরু",
          text: "ধানমন্ডির এক বন্ধুর মেহেদির আসর — প্রচুর রসমালাই, উঠান পেরোনো একটি চোখার্টি, আর সন্ধ্যার আলো ফিরে আসা পর্যন্ত চলা এক অমর গল্প।",
        },
        {
          label: "দ্বিতীয় অধ্যায় · ২০২৩",
          title: "দুই পরিবার, এক টেবিল",
          text: "ঢাকার এক বর্ষার সন্ধ্যা — কাচ্চি বিরিয়ানির পাশে হাসিমুখে বড়রা, দোয়ার মধুর আবহ, আর আনুষ্ঠানিক হয়ে গেল এক ওয়াদা। সবচেয়ে কঠিন ছিল অবাক হওয়ার অভিনয় করা।",
        },
        {
          label: "তৃতীয় অধ্যায় · ২০২৬",
          title: "সম্মতির সেই মুহূর্ত",
          text: "জানুয়ারির ছাদে, নিচে জ্বলজ্বল করা পুরো শহর — এক বছর ধরে মহড়া দেওয়া প্রশ্নটি শেষ হওয়ার আগেই মেহজাবিন বলে ফেলল \u201Cহ্যাঁ\u201D।",
        },
        {
          label: "শুভ শুরু · ২০২৭",
          title: "চিরদিনের ফুলেল পথ",
          text: "আর আজ আমরা আপনাদের আমন্ত্রণ জানাই — যাঁরা প্রথম থেকে ভালোবেসেছেন — জীবনের এই বাগান রোপণের সাক্ষী হতে।",
        },
      ],
    },

    events: [
      {
        tag: "বিবাহ অনুষ্ঠান",
        name: "আকদ ও রিসেপশন",
        tagline: "এরপর ডিনার ও দোয়া",
        date: "শুক্রবার, ১২ ফেব্রুয়ারি ২০২৭",
        time: "সন্ধ্যা ৬টা থেকে",
        venue: "দ্য রুবি হল, প্যান প্যাসিফিক সোনারগাঁও",
        address: "১০৭ কাজী নজরুল ইসলাম এভিনিউ, ঢাকা ১২১৫",
        mapQuery: "Pan Pacific Sonargaon Dhaka",
        calDate: "2027-02-12",
        calStart: "18:00",
        calEnd: "23:00",
        calTz: "Asia/Dhaka",
      },
    ],

    venue: {
      name: "দ্য রুবি হল, প্যান প্যাসিফিক সোনারগাঁও",
      address: "১০৭ কাজী নজরুল ইসলাম এভিনিউ, ঢাকা ১২১৫",
    },

    gallery: {
      photos: [
        { src: "assets/photos/photo-1.svg", alt: "শাপলা প্রতীক", caption: "আমাদের শুরু", wide: true },
        { src: "assets/photos/photo-2.svg", alt: "বোটানিকাল আর্চে বিয়ের আংটি", caption: "তারিখ মনে রাখুন", wide: true },
        { src: "assets/photos/photo-3.svg", alt: "ভোরের শিউলি ফুল", caption: "শিউলি ভোর" },
        { src: "assets/photos/photo-4.svg", alt: "বাগানে ঝুলন্ত আলোর মালা", caption: "বাগান অপেক্ষায়" },
        { src: "assets/photos/photo-5.svg", alt: "লণ্ঠন-সজ্জিত মুঘল আর্চ", caption: "যেখানে বলব হ্যাঁ", wide: true },
        { src: "assets/photos/photo-6.svg", alt: "ক্যালিগ্রাফিতে দুটি নাম", caption: "একসাথে লেখা", wide: true },
      ],
    },

    customSections: [
      {
        layout: "cards",
        eyebrow: "বেশভূষা",
        title: "পোশাকের রঙ",
        note: "বাগানের রঙে নিজেদের মুড়িয়ে আসুন — হালকা প্যাস্টেল, আইভরি আর সোনালি।",
        cards: [
          {
            kicker: "নারীদের জন্য",
            title: "শাড়ি ও গাউন",
            text: "গোলাপি, সবুজাভ, আইভরি বা শ্যাম্পেন — চুলে ফুল থাকলে সবচেয়ে ভালো।",
          },
          {
            kicker: "পুরুষদের জন্য",
            title: "পাঞ্জাবি ও স্যুট",
            text: "আইভরি, বেইজ বা হালকা ধূসর — সোনালি পকেট স্কয়ারেই পূর্ণতা।",
          },
        ],
      },
      {
        layout: "faq",
        eyebrow: "আপনার প্রশ্ন",
        title: "জেনে রাখুন",
        items: [
          {
            q: "উপহার নিয়ে কী করব?",
            a: "আপনাদের উপস্থিতিই আমাদের সবচেয়ে বড় উপহার। তবু আশীর্বাদ জানাতে ইচ্ছুক হলে, নতুন সংসার গড়ার ছোট্ট অংশীদারত্ব ভালোবাসার সাথে গ্রহণ করব।",
          },
          {
            q: "ছবি তোলা হবে কি?",
            a: "হ্যাঁ — আমাদের আলোকচিত্রীরা সারা সন্ধ্যা নিঃশব্দে ঘুরে বেড়াবেন। সাজানো থাকুন; অ্যালবাম সবার সাথে শেয়ার করা হবে।",
          },
          {
            q: "বাচ্চাদের নিয়ে আসা যাবে?",
            a: "অবশ্যই — ছোটরা তো আনন্দের অংশ। নাস্তা আর খেলায় মেতে থাকার জন্য আলাদা কর্নার থাকবে।",
          },
        ],
      },
    ],

    rsvp: {
      deadline: "১ ফেব্রুয়ারি ২০২৭",
      note: "অনুগ্রহ করে {deadline} এর মধ্যে সাড়া দিন — বাগান আপনার নামটি অপেক্ষায়।",
      successNote:
        "জাযাকাল্লাহু খাইরান! আপনার আসন সংরক্ষিত হচ্ছে — একসাথে উদ্‌যাপনের অপেক্ষায় রইলাম।",
    },

    closing: "ভালোবাসা ও দোয়ায়, আপনাদের উপস্থিতির অপেক্ষায়",
    credit: "\u2665 দিয়ে নির্মিত — Your Studio Name",
  },
};

/* Export for reuse; safe to ignore in the browser. */
if (typeof module !== "undefined") {
  module.exports = INVITE_CONFIG;
}
