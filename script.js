/* ============================================================
   IVORY BOTANICAL — Luxury Wedding Invitation behaviour
   All content comes from INVITE_CONFIG (config.js).

   0. Language / i18n (EN ⇄ বাংলা)     6. Gallery + lightbox
   1. Content hydration                 7. Custom sections
   2. Curtain opening                   8. Map
   3. Our Story (stitched timeline)     9. Countdown
   4. Event cards                      10. Background music
   5. Fit names on one line            11. RSVP
                                       12. Share · petals · scroll FX
   ============================================================ */
(function () {
  "use strict";

  // Top-level `const` in config.js creates a global lexical binding, not a
  // window property — so read the binding directly and only fall back to window.
  var cfg = typeof INVITE_CONFIG !== "undefined" ? INVITE_CONFIG : window.INVITE_CONFIG;
  if (!cfg) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* Motion default: "always" — the full experience plays for every guest.
     Set INVITE_CONFIG.motion = "honor" so guests whose device asks for
     reduced motion get a still, instant version instead. */
  var honorReducedMotion = cfg.motion === "honor";
  var reduced = honorReducedMotion && !!prefersReducedMotion();
  if (reduced) {
    document.body.classList.add("reduced");
    document.documentElement.classList.add("motion-reduced");
  }

  var introEl = $("#intro");
  var introActive = !!(introEl && (!cfg.intro || cfg.intro.enabled !== false) && !reduced);
  var musicKick = null; // set by the music module; called when the curtains part

  /* ============ 0. Language / i18n ============
     English is the default. First-time visitors whose browser language
     starts with "bn" get Bangla; the choice is remembered in localStorage.
     UI chrome strings live in UI below. Client content is localised via the
     optional "bn" block in config.js (missing keys fall back to English).
     With no "bn" block the toggle hides itself and the site stays English. */
  var LANG_KEY = "invite-lang";

  var UI = {
    en: {
      documentTitleSuffix: "Wedding Invitation",
      nameSep: "&",
      heroAmp: "&",
      eyebrowWedding: "The Wedding of",
      welcomeEyebrow: "Together with their families",
      introEyebrow: "You are cordially invited to",
      introLine: "a celebration of love, laughter & forever",
      introEnter: "Open the Invitation",
      introSkip: "Skip",
      scroll: "Scroll",
      saveTheDate: "Save the Date",
      countdownTitle: "Counting Down<br /><em>to Forever</em>",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      countdownAria: "Countdown to the wedding",
      storyEyebrow: "How It Began",
      storyTitle: "Our <em>Story</em>",
      whenWhere: "When & Where",
      eventsTitle: "The <em>Celebration</em>",
      galleryEyebrow: "Captured Moments",
      galleryTitle: "Our <em>Gallery</em>",
      galleryHint: "Tap a photo to view it close-up",
      theVenue: "The Venue",
      venueTitle: "Find Us <em>There</em>",
      openInMaps: "Open in Google Maps \u2197",
      viewOnMap: "View on Map \u2197",
      addToCalendar: "Add to Calendar \u2197",
      labelDate: "Date",
      labelTime: "Time",
      labelVenue: "Venue",
      labelAddress: "Address",
      rsvpEyebrow: "Will You Join Us?",
      rsvpTitle: "Kindly <em>Respond</em>",
      yourName: "Your Name",
      namePlaceholder: "e.g. Rahim Uddin & family",
      attendingQ: "Will you be attending?",
      joyfullyYes: "Joyfully, yes",
      regretfullyNo: "Regretfully, no",
      guestsLabel: "Number of Guests",
      whichEvents: "Which events will you attend?",
      messageLabel: "A Message for the Couple",
      optionalLabel: "(optional)",
      messagePlaceholder: "Your wishes, duas & blessings\u2026",
      sendRsvp: "Send RSVP",
      rsvpWaOpened: "We opened WhatsApp with your answers \u2014 just press send.",
      rsvpError: "Something went wrong sending your RSVP \u2014 please try again.",
      waTitle: "RSVP",
      waName: "Name",
      waEvents: "Events",
      waMessage: "Message",
      guestWord: "guest",
      guestsWord: "guests",
      linkCopied: "Link copied to clipboard",
      shareInvitation: "Share this Invitation",
      shareAria: "Share this invitation",
      share: "Share",
      shareText: "You\u2019re invited \u2014 {names} \u00B7 {date} \u00B7 {city}",
      calendarDetails: "We would be honoured by your presence. {hashtag}",
      switchTo: "Switch to Bangla",
      musicPlay: "Play background music",
      musicPause: "Pause background music",
      lightboxAria: "Photo viewer",
      lbClose: "Close photo viewer",
      lbPrev: "Previous photo",
      lbNext: "Next photo",
      viewPhoto: "View photo",
    },
    bn: {
      documentTitleSuffix: "বিয়ের আমন্ত্রণ",
      nameSep: "ও",
      heroAmp: "ও",
      eyebrowWedding: "বিবাহবন্ধনে",
      welcomeEyebrow: "উভয় পরিবারের আন্তরিক আমন্ত্রণে",
      introEyebrow: "আপনাদের আন্তরিক আমন্ত্রণ",
      introLine: "ভালোবাসা, হাসি ও চিরকালের উদ্‌যাপন",
      introEnter: "আমন্ত্রণ খুলুন",
      introSkip: "এড়িয়ে যান",
      scroll: "নিচে দেখুন",
      saveTheDate: "তারিখটি মনে রাখুন",
      countdownTitle: "মুহূর্ত গুনছি<br /><em>চিরকালের জন্য</em>",
      days: "দিন",
      hours: "ঘণ্টা",
      minutes: "মিনিট",
      seconds: "সেকেন্ড",
      countdownAria: "বিয়ের কাউন্টডাউন",
      storyEyebrow: "গল্পের শুরু",
      storyTitle: "আমাদের <em>গল্প</em>",
      whenWhere: "কখন ও কোথায়",
      eventsTitle: "<em>উদ্‌যাপন</em>",
      galleryEyebrow: "মুহূর্তের ছবি",
      galleryTitle: "আমাদের <em>গ্যালারি</em>",
      galleryHint: "ছবিতে চাপ দিলে বড় করে দেখা যাবে",
      theVenue: "স্থান",
      venueTitle: "আমাদের খুঁজুন <em>এখানে</em>",
      openInMaps: "গুগল ম্যাপে খুলুন \u2197",
      viewOnMap: "মানচিত্রে দেখুন \u2197",
      addToCalendar: "ক্যালেন্ডারে যোগ করুন \u2197",
      labelDate: "তারিখ",
      labelTime: "সময়",
      labelVenue: "স্থান",
      labelAddress: "ঠিকানা",
      rsvpEyebrow: "আপনি কি আসছেন?",
      rsvpTitle: "অনুগ্রহ করে <em>সাড়া দিন</em>",
      yourName: "আপনার নাম",
      namePlaceholder: "যেমন — রহিম উদ্দিন ও পরিবার",
      attendingQ: "আপনি কি উপস্থিত থাকবেন?",
      joyfullyYes: "আনন্দের সাথে, হ্যাঁ",
      regretfullyNo: "দুঃখিত, আসতে পারব না",
      guestsLabel: "অতিথির সংখ্যা",
      whichEvents: "কোন কোন অনুষ্ঠানে উপস্থিত থাকবেন?",
      messageLabel: "দম্পতির জন্য বার্তা",
      optionalLabel: "(ঐচ্ছিক)",
      messagePlaceholder: "আপনার শুভেচ্ছা, দোয়া ও ভালোবাসা…",
      sendRsvp: "আরএসভিপি পাঠান",
      rsvpWaOpened: "উইহ্যাটসঅ্যাপে আপনার উত্তর প্রস্তুত — শুধু পাঠিয়ে দিন।",
      rsvpError: "আরএসভিপি পাঠানো গেল না — আবার চেষ্টা করুন।",
      waTitle: "আরএসভিপি",
      waName: "নাম",
      waEvents: "অনুষ্ঠান",
      waMessage: "বার্তা",
      guestWord: "জন",
      guestsWord: "জন",
      linkCopied: "লিংক কপি হয়েছে",
      shareInvitation: "এই আমন্ত্রণটি শেয়ার করুন",
      shareAria: "এই আমন্ত্রণটি শেয়ার করুন",
      share: "শেয়ার",
      shareText: "আপনি আমন্ত্রিত — {names} · {date} · {city}",
      calendarDetails: "আপনাদের উপস্থিতিই আমাদের সৌভাগ্য। {hashtag}",
      switchTo: "ইংরেজিতে পরিবর্তন করুন",
      musicPlay: "ব্যাকগ্রাউন্ড মিউজিক চালান",
      musicPause: "মিউজিক বন্ধ করুন",
      lightboxAria: "ছবি দেখার পর্দা",
      lbClose: "ছবি বন্ধ করুন",
      lbPrev: "আগের ছবি",
      lbNext: "পরের ছবি",
      viewPhoto: "ছবিটি দেখুন",
    },
  };

  var BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  var bnAvailable = !!(cfg.bn && typeof cfg.bn === "object" && !Array.isArray(cfg.bn));
  var lang = "en";
  var t = UI.en;       // current UI strings
  var c = cfg;         // current content config (English, or merged with cfg.bn)
  var revealIO = null; // created lazily by observeReveal()
  var langHooks = [];  // modules that need a re-label on language switch

  function isPlainObject(o) {
    return !!o && typeof o === "object" && !Array.isArray(o);
  }

  // Merge the Bangla mirror over the English config. Plain objects merge
  // key by key (a bn block may localise only some fields); arrays replace.
  function deepMerge(base, over) {
    var out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
    Object.keys(over).forEach(function (k) {
      out[k] = isPlainObject(base && base[k]) && isPlainObject(over[k])
        ? deepMerge(base[k], over[k])
        : over[k];
    });
    return out;
  }

  // Localise generated numerals (countdown, footer date, guests) to Bangla digits.
  function L(value) {
    var s = String(value);
    if (lang !== "bn") return s;
    return s.replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
  }

  function initialLang() {
    if (!bnAvailable) return "en";
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === "bn" || saved === "en") return saved;
    } catch (e) { /* storage unavailable (private mode etc.) */ }
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    return String(nav).toLowerCase().indexOf("bn") === 0 ? "bn" : "en";
  }

  function setLang(next, persist) {
    lang = UI[next] ? next : "en";
    t = UI[lang];
    c = (lang === "bn" && bnAvailable) ? deepMerge(cfg, cfg.bn) : cfg;
    if (persist) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
    }
    applyLanguage();
  }

  /* ============ 1. Content hydration ============ */
  function hydrateContent() {
    var slots = {
      "data-initials": c.couple.initials,
      "data-name1": c.couple.name1,
      "data-name2": c.couple.name2,
      "data-date-display": c.dateDisplay,
      "data-city": c.city,
      "data-blessing": c.blessing,
      "data-parents1": c.welcome.parents1,
      "data-parents2": c.welcome.parents2,
      "data-invite-line": c.welcome.inviteLine,
      "data-epigraph": c.epigraph,
      "data-countdown-note": c.countdownNote,
      "data-venue-name": c.venue.name,
      "data-venue-address": (c.venue.address || ""),
      "data-closing": c.closing,
      "data-footer-names": c.couple.name1 + " " + t.nameSep + " " + c.couple.name2,
      "data-footer-date": L(formatDateShort()) + " \u00B7 " + c.city.replace(/,.*/, ""),
      "data-hashtag": c.couple.hashtag,
      "data-credit": c.credit,
      "data-rsvp-note": c.rsvp && c.rsvp.note
        ? String(c.rsvp.note).replace("{deadline}", c.rsvp.deadline || "")
        : "",
      "data-rsvp-success": c.rsvp && c.rsvp.successNote,
    };

    Object.keys(slots).forEach(function (attr) {
      if (slots[attr] == null) return;
      $$("[" + attr + "]").forEach(function (el) { el.textContent = slots[attr]; });
    });

    // The epigraph disappears entirely when left empty.
    $$("[data-epigraph]").forEach(function (el) { el.hidden = !c.epigraph; });

    // Document title & social meta follow the couple and the language.
    var title = c.couple.name1 + " " + t.nameSep + " " + c.couple.name2 + " \u2014 " + t.documentTitleSuffix;
    document.title = title;
    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
  }

  function formatDateShort() {
    // "12 · 02 · 2027" from weddingDateTime (manual parse, venue-local).
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(cfg.weddingDateTime);
    return m ? m[3] + " \u00B7 " + m[2] + " \u00B7 " + m[1] : "";
  }

  // Reveal helper used by every rendered list (chapters, cards, photos…).
  function observeReveal(el) {
    if (!("IntersectionObserver" in window) || reduced) {
      el.classList.add("is-in");
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            revealIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    }
    revealIO.observe(el);
  }

  // If every current card is already revealed, re-rendered ones appear
  // instantly instead of animating in a second time.
  function alreadyIn(selector) {
    var els = $$(selector);
    return els.length > 0 && els.every(function (el) { return el.classList.contains("is-in"); });
  }

  /* ============ 3. Our Story (stitched timeline) ============ */
  var storyList = $("#storyList");

  function renderStory() {
    if (!storyList || !c.story || !c.story.chapters) return;
    var chapters = c.story.chapters;
    if (!chapters.length) { storyList.innerHTML = ""; return; }
    var wasIn = alreadyIn(".chapter");
    storyList.innerHTML =
      '<span class="story__rail" id="storyRail" aria-hidden="true"></span>' +
      chapters.map(function (ch) {
        return (
          '<article class="chapter">' +
          '<span class="chapter__dot" aria-hidden="true"></span>' +
          (ch.label ? '<p class="chapter__label">' + esc(ch.label) + "</p>" : "") +
          '<h3 class="chapter__title">' + esc(ch.title) + "</h3>" +
          '<p class="chapter__text">' + esc(ch.text) + "</p>" +
          "</article>"
        );
      }).join("");
    $$(".chapter", storyList).forEach(function (el) {
      if (wasIn) el.classList.add("is-in");
      else observeReveal(el);
    });
    if (typeof pickActiveChapter === "function") pickActiveChapter();
  }

  // Gently illuminate the chapter the guest is reading: whichever
  // chapter's centre sits nearest the middle of the viewport (rAF-gated).
  var pickActiveChapter = null;
  (function initChapterGlow() {
    if (!storyList || reduced) return;
    var picking = false;
    pickActiveChapter = function () {
      picking = false;
      var chapters = $$(".chapter", storyList);
      if (!chapters.length) return;
      var vh = window.innerHeight;
      var best = null, bestDist = Infinity;
      chapters.forEach(function (ch) {
        var r = ch.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        var d = Math.abs(r.top + r.height / 2 - vh / 2);
        if (d < bestDist) { bestDist = d; best = ch; }
      });
      chapters.forEach(function (ch) { ch.classList.toggle("is-active", ch === best); });
    };
    window.addEventListener("scroll", function () {
      if (!picking) { picking = true; requestAnimationFrame(pickActiveChapter); }
    }, { passive: true });
  })();

  /* ============ 4. Event cards ============ */
  var ICONS = {
    date: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>',
    time: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 13.5"/></svg>',
    pin: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  };

  var list = $("#eventList");

  function renderEvents() {
    if (!list) return;
    if (!c.events || !c.events.length) { list.innerHTML = ""; return; }
    var wasIn = alreadyIn(".event-card");
    list.innerHTML = c.events.map(renderEvent).join("");
    $$(".event-card").forEach(function (el) {
      if (wasIn) el.classList.add("is-in");
      else observeReveal(el);
    });
  }

  function renderEvent(ev) {
    var mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ev.mapQuery || ev.venue || "");
    var calUrl = buildCalendarUrl(ev);
    return (
      '<article class="event-card">' +
      '<p class="event-card__tag">' + esc(ev.tag) + "</p>" +
      '<h3 class="event-card__name">' + esc(ev.name) + "</h3>" +
      (ev.tagline ? '<p class="event-card__tagline">' + esc(ev.tagline) + "</p>" : "") +
      '<div class="event-card__divider" aria-hidden="true"></div>' +
      '<dl class="event-card__rows">' +
      row(ICONS.date, t.labelDate, ev.date) +
      row(ICONS.time, t.labelTime, ev.time) +
      row(ICONS.pin, t.labelVenue, ev.venue) +
      (ev.address ? row('<span class="row__dot" aria-hidden="true"></span>', t.labelAddress, ev.address) : "") +
      "</dl>" +
      '<div class="event-card__actions">' +
      '<a class="link-btn" href="' + mapUrl + '" target="_blank" rel="noopener">' + esc(t.viewOnMap) + "</a>" +
      (calUrl ? '<a class="link-btn link-btn--calendar" href="' + calUrl + '" target="_blank" rel="noopener">' + esc(t.addToCalendar) + "</a>" : "") +
      "</div></article>"
    );
  }

  function row(icon, label, value) {
    return '<div class="row"><dt>' + icon + "<span>" + label + "</span></dt><dd>" + esc(value) + "</dd></div>";
  }

  function buildCalendarUrl(ev) {
    if (!ev.calDate || !ev.calStart || !ev.calEnd) return "";
    var start = ev.calDate.replace(/-/g, "") + "T" + ev.calStart.replace(":", "") + "00";
    var end = ev.calDate.replace(/-/g, "") + "T" + ev.calEnd.replace(":", "") + "00";
    var params = {
      action: "TEMPLATE",
      text: c.couple.name1 + " " + t.nameSep + " " + c.couple.name2 + " \u2014 " + ev.name,
      dates: start + "/" + end,
      details: t.calendarDetails.replace("{hashtag}", c.couple.hashtag),
      location: [ev.venue, ev.address].filter(Boolean).join(", "),
    };
    if (ev.calTz) params.ctz = ev.calTz;
    return "https://calendar.google.com/calendar/render?" + Object.keys(params)
      .map(function (k) { return k + "=" + encodeURIComponent(params[k]); })
      .join("&");
  }

  /* ============ 6. Gallery + lightbox ============ */
  var galleryGrid = $("#galleryGrid");
  var lb = $("#lightbox");
  var lbImg = $("#lbImg"), lbCap = $("#lbCaption"), lbCount = $("#lbCount");
  var lbCurrent = 0;
  var lbLastFocus = null;

  function renderGallery() {
    if (!galleryGrid) return;
    var photos = (c.gallery && c.gallery.photos) || [];
    if (!photos.length) { galleryGrid.innerHTML = ""; return; }
    var wasIn = alreadyIn(".g-photo");
    galleryGrid.innerHTML = photos.map(function (p, i) {
      var cls = "g-photo" + (p.wide ? " g-photo--wide" : "");
      return (
        '<button class="' + cls + '" type="button" data-index="' + i + '" aria-label="' +
        esc(t.viewPhoto + ": " + (p.alt || p.caption || "")) + '">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy" decoding="async" />' +
        (p.caption ? '<span class="g-photo__cap">' + esc(p.caption) + "</span>" : "") +
        "</button>"
      );
    }).join("");
    $$(".g-photo", galleryGrid).forEach(function (el) {
      if (wasIn) el.classList.add("is-in");
      else observeReveal(el);
      el.addEventListener("click", function () {
        openLightbox(parseInt(el.getAttribute("data-index"), 10) || 0);
      });
    });
  }

  function lbRender() {
    var photos = (c.gallery && c.gallery.photos) || [];
    var p = photos[lbCurrent] || {};
    lbImg.src = p.src || "";
    lbImg.alt = p.alt || "";
    lbCap.textContent = p.caption || "";
    lbCount.textContent = L(lbCurrent + 1) + " / " + L(photos.length);
    // Replay the gentle zoom-in on each photo.
    lbImg.style.animation = "none";
    void lbImg.offsetWidth;
    lbImg.style.animation = "";
  }

  function openLightbox(i) {
    var photos = (c.gallery && c.gallery.photos) || [];
    if (!lb || !photos.length) return;
    lbCurrent = i;
    lbRender();
    lbLastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    void lb.offsetWidth;
    lb.classList.add("is-open");
    $("#lbClose").focus();
  }

  function closeLightbox() {
    if (!lb || lb.hidden) return;
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () { lb.hidden = true; }, 320);
    if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
  }

  function lbStep(d) {
    var photos = (c.gallery && c.gallery.photos) || [];
    if (!photos.length) return;
    lbCurrent = (lbCurrent + d + photos.length) % photos.length;
    lbRender();
  }

  if (lb) {
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", function () { lbStep(-1); });
    $("#lbNext").addEventListener("click", function () { lbStep(1); });

    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("lightbox__stage")) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") lbStep(-1);
      else if (e.key === "ArrowRight") lbStep(1);
    });

    // Touch swipe
    var touchX = null;
    lb.addEventListener("touchstart", function (e) {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) lbStep(dx > 0 ? -1 : 1);
      touchX = null;
    }, { passive: true });
  }

  /* ============ 7. Custom sections (the Luxury signature) ============ */
  var customWrap = $("#customSections");

  function renderCustom() {
    if (!customWrap) return;
    var sections = (c.customSections || []).filter(function (s) { return s && s.layout; });
    if (!sections.length) { customWrap.innerHTML = ""; return; }
    var wasIn = alreadyIn(".custom__section");
    customWrap.innerHTML = sections.map(renderCustomSection).join("");
    $$(".custom__section", customWrap).forEach(function (el) {
      if (wasIn) el.classList.add("is-in");
      else observeReveal(el);
    });
    $$(".c-card", customWrap).forEach(function (el) {
      if (wasIn) el.classList.add("is-in");
      else observeReveal(el);
    });

    // Accordion behaviour (height animated via scrollHeight).
    $$(".faq__q", customWrap).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var ans = item.querySelector(".faq__a");
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        ans.style.maxHeight = open ? ans.scrollHeight + "px" : "";
      });
    });
  }

  function customHead(s) {
    return (
      (s.eyebrow ? '<p class="eyebrow eyebrow--rose">' + esc(s.eyebrow) + "</p>" : "") +
      (s.title ? '<h2 class="section-title">' + esc(s.title) + "</h2>" : "") +
      '<div class="stitch" aria-hidden="true"><span></span><i></i><span></span></div>'
    );
  }

  function renderCustomSection(s) {
    switch (s.layout) {
      case "quote":
        return (
          '<section class="custom__section custom__section--quote">' +
          '<span class="custom__quote-mark" aria-hidden="true">\u201C</span>' +
          '<p class="custom__quote">' + esc(s.quote || "") + "</p>" +
          (s.source ? '<p class="custom__quote-source">' + esc(s.source) + "</p>" : "") +
          "</section>"
        );
      case "text":
        return (
          '<section class="custom__section custom__section--text">' +
          customHead(s) +
          (s.text ? '<p class="custom__body">' + esc(s.text) + "</p>" : "") +
          (s.note ? '<p class="custom__note">' + esc(s.note) + "</p>" : "") +
          "</section>"
        );
      case "cards":
        return (
          '<section class="custom__section custom__section--cards">' +
          customHead(s) +
          (s.note ? '<p class="custom__note">' + esc(s.note) + "</p>" : "") +
          '<div class="c-cards">' +
          (s.cards || []).map(function (card) {
            return (
              '<div class="c-card">' +
              (card.kicker ? '<p class="c-card__kicker">' + esc(card.kicker) + "</p>" : "") +
              (card.title ? '<h3 class="c-card__title">' + esc(card.title) + "</h3>" : "") +
              (card.text ? '<p class="c-card__text">' + esc(card.text) + "</p>" : "") +
              (card.swatches && card.swatches.length
                ? '<div class="c-card__swatches" aria-hidden="true">' +
                  card.swatches.map(function (hex) { return '<i style="background:' + esc(hex) + '"></i>'; }).join("") +
                  "</div>"
                : "") +
              "</div>"
            );
          }).join("") +
          "</div></section>"
        );
      case "faq":
        return (
          '<section class="custom__section custom__section--faq">' +
          customHead(s) +
          '<div class="faq">' +
          (s.items || []).map(function (item, i) {
            return (
              '<div class="faq__item">' +
              '<button class="faq__q" type="button" aria-expanded="false" aria-controls="faqA' + i + '">' +
              "<span>" + esc(item.q) + "</span>" +
              '<span class="faq__q-icon" aria-hidden="true"></span>' +
              "</button>" +
              '<div class="faq__a" id="faqA' + i + '" role="region">' +
              '<p class="faq__a-inner">' + esc(item.a) + "</p>" +
              "</div></div>"
            );
          }).join("") +
          "</div></section>"
        );
      default:
        return "";
    }
  }

  /* ============ 8. Map ============ */
  var mapFrame = $("#venueMap");
  if (mapFrame && cfg.venue.mapQuery) {
    var zoom = cfg.venue.mapZoom || 15;
    mapFrame.src =
      "https://maps.google.com/maps?q=" + encodeURIComponent(cfg.venue.mapQuery) +
      "&z=" + zoom + "&output=embed";
  }
  $$("[data-directions]").forEach(function (a) {
    if (cfg.venue.mapQuery) {
      a.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(cfg.venue.mapQuery);
    }
  });

  /* ============ 9. Countdown ============ */
  var target = new Date(cfg.weddingDateTime).getTime();
  var cd = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMinutes"), s: $("#cdSeconds") };
  var refreshCountdown = null;

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  // Swap a digit only when it changed, and let it settle in softly
  // instead of hard-swapping every second.
  function setNum(el, val) {
    if (!el || el.textContent === val) return;
    el.textContent = val;
    if (reduced) return;
    el.classList.remove("is-settling");
    void el.offsetWidth; // restart the settle animation
    el.classList.add("is-settling");
  }

  function tick() {
    var diff = target - Date.now();
    var done = diff <= 0;
    setNum(cd.d, done ? L("00") : L(pad(Math.floor(diff / 864e5))));
    setNum(cd.h, done ? L("00") : L(pad(Math.floor(diff / 36e5) % 24)));
    setNum(cd.m, done ? L("00") : L(pad(Math.floor(diff / 6e4) % 60)));
    setNum(cd.s, done ? L("00") : L(pad(Math.floor(diff / 1e3) % 60)));
  }
  if (!isNaN(target)) {
    refreshCountdown = tick;
    tick();
    setInterval(tick, 1000);
  }

  /* ============ 10. Background music ============ */
  (function initMusic() {
    var btn = $("#musicBtn");
    if (!btn || !cfg.music || !cfg.music.enabled || !cfg.music.src) return;

    var audio = new Audio(cfg.music.src);
    audio.loop = true;
    audio.preload = "auto";

    var fading = null;

    function label() {
      btn.setAttribute("aria-label", audio.paused ? t.musicPlay : t.musicPause);
    }
    langHooks.push(label);

    function fadeTo(vol, done) {
      if (fading) clearInterval(fading);
      var from = audio.volume, i = 0, steps = 20, dur = 700;
      fading = setInterval(function () {
        i += 1;
        audio.volume = Math.min(1, Math.max(0, from + (vol - from) * (i / steps)));
        if (i >= steps) {
          clearInterval(fading);
          fading = null;
          if (done) done();
        }
      }, dur / steps);
    }

    function play() {
      var p = audio.play();
      if (p && p.catch) p.catch(function () { /* still blocked; user can tap the button */ });
      audio.volume = 0;
      fadeTo(0.55);
      btn.classList.add("is-playing");
      btn.setAttribute("aria-pressed", "true");
      label();
    }

    function pause() {
      fadeTo(0, function () { audio.pause(); });
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-pressed", "false");
      label();
    }

    // Only reveal the control once we know the track loads.
    audio.addEventListener("canplaythrough", function () { btn.hidden = false; }, { once: true });
    audio.addEventListener("error", function () { btn.hidden = true; }, { once: true });
    audio.load();

    btn.addEventListener("click", function () {
      if (audio.paused) play();
      else pause();
    });

    if (cfg.music.autoplay && !reduced) {
      if (introActive) {
        // The tap that parts the curtains starts the soundtrack.
        musicKick = play;
      } else {
        // Browsers block silent autoplay — start on the guest's first gesture.
        var startOnce = function () {
          if (audio.paused) play();
          window.removeEventListener("pointerdown", startOnce);
          window.removeEventListener("keydown", startOnce);
        };
        window.addEventListener("pointerdown", startOnce);
        window.addEventListener("keydown", startOnce);
      }
    }

    // Pause politely when the tab is hidden.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && !audio.paused) pause();
    });
  })();

  /* ============ 11. RSVP ============ */
  (function initRsvp() {
    var section = $(".rsvp");
    var form = $("#rsvpForm");
    var done = $("#rsvpDone");
    if (!form) return;
    if (!cfg.rsvp || !cfg.rsvp.enabled) {
      if (section) section.style.display = "none";
      return;
    }

    var eventsWrap = $("#rsvpEvents");
    var guestsWrap = $("#rsvpGuestsWrap");
    var eventsWrapField = $("#rsvpEventsWrap");

    function guestLabel(n) {
      if (lang === "bn") return L(n) + " " + t.guestWord;
      return n + " " + (n === 1 ? t.guestWord : t.guestsWord);
    }

    function renderGuestOptions() {
      var sel = $("#rsvpGuests");
      if (!sel) return;
      var selected = sel.value || "2";
      sel.innerHTML = [1, 2, 3, 4, 5].map(function (n) {
        return '<option value="' + n + '"' + (String(n) === selected ? " selected" : "") + ">" + guestLabel(n) + "</option>";
      }).join("") +
        '<option value="6"' + (selected === "6" ? " selected" : "") + ">" +
        (lang === "bn" ? "৬+ " + t.guestWord : "6+ " + t.guestsWord) + "</option>";
    }

    function renderRsvpEvents() {
      if (!eventsWrap || !c.events || !c.events.length) return;
      eventsWrap.innerHTML = c.events.map(function (ev, i) {
        return (
          '<label class="choice__opt">' +
          '<input type="checkbox" name="events" value="' + esc(ev.name) + '" ' + (i === 0 ? "" : "checked") + " />" +
          "<span>" + esc(ev.name) + "</span>" +
          "</label>"
        );
      }).join("");
    }

    function syncAttendance() {
      var attending = (form.querySelector('input[name="attending"]:checked') || {}).value === "yes";
      if (guestsWrap) guestsWrap.hidden = !attending;
      if (eventsWrapField) eventsWrapField.hidden = !attending;
    }
    $$('input[name="attending"]', form).forEach(function (r) {
      r.addEventListener("change", syncAttendance);
    });
    syncAttendance();
    langHooks.push(function () { renderGuestOptions(); renderRsvpEvents(); });

    function collect() {
      return {
        couple: c.couple.name1 + " " + t.nameSep + " " + c.couple.name2,
        name: ($("#rsvpName") || {}).value || "",
        attending: (form.querySelector('input[name="attending"]:checked') || {}).value || "yes",
        guests: ($("#rsvpGuests") || {}).value || "",
        events: $$('input[name="events"]:checked', form).map(function (chk) { return chk.value; }),
        message: ($("#rsvpMessage") || {}).value || "",
      };
    }

    function whatsappUrl(data) {
      var yes = data.attending === "yes";
      var lines = [
        t.waTitle + " \u2014 " + data.couple,
        t.waName + ": " + data.name,
        yes
          ? t.joyfullyYes + " (" + guestLabel(parseInt(data.guests, 10) || 1) + ")"
          : t.regretfullyNo,
      ];
      if (yes && data.events.length) lines.push(t.waEvents + ": " + data.events.join(", "));
      if (data.message.trim()) lines.push(t.waMessage + ": " + data.message.trim());
      return "https://wa.me/" + String(cfg.rsvp.whatsapp).replace(/[^\d]/g, "") +
        "?text=" + encodeURIComponent(lines.join("\n"));
    }

    function showDone(msg) {
      var successEl = $("[data-rsvp-success]");
      if (successEl && msg) successEl.textContent = msg;
      form.hidden = true;
      done.hidden = false;
      done.classList.add("reveal", "is-in");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameEl = $("#rsvpName");
      if (!nameEl.value.trim()) {
        nameEl.focus();
        if (nameEl.reportValidity) nameEl.reportValidity();
        return;
      }

      var data = collect();
      var submitBtn = $("#rsvpSubmit");
      if (submitBtn) submitBtn.disabled = true;

      var finish = function (msg) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove("is-sending");
        }
        showDone(msg);
      };

      if (cfg.rsvp.endpoint) {
        if (submitBtn) submitBtn.classList.add("is-sending");
        fetch(cfg.rsvp.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data),
        })
          .then(function (r) {
            if (!r.ok) throw new Error("HTTP " + r.status);
            return r.json ? r.json() : {};
          })
          .then(function () { finish(c.rsvp.successNote); })
          .catch(function () {
            if (cfg.rsvp.whatsapp) {
              window.open(whatsappUrl(data), "_blank", "noopener");
              finish(t.rsvpWaOpened);
            } else {
              finish(t.rsvpError);
            }
          });
        return;
      }

      if (cfg.rsvp.whatsapp) {
        window.open(whatsappUrl(data), "_blank", "noopener");
        finish(t.rsvpWaOpened);
        return;
      }

      finish(c.rsvp.successNote);
    });
  })();

  /* ============ 12a. Share ============ */
  var toast = $("#toast");
  var toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2600);
  }

  function share() {
    var data = {
      title: document.title,
      text: t.shareText
        .replace("{names}", c.couple.name1 + " " + t.nameSep + " " + c.couple.name2)
        .replace("{date}", c.dateDisplay)
        .replace("{city}", c.city),
      url: location.origin === "null" || location.protocol === "file:"
        ? "https://your-invite-link.example"
        : location.href,
    };
    if (navigator.share) {
      navigator.share(data).catch(function () { /* user dismissed */ });
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data.url).then(
        function () { showToast(t.linkCopied); },
        function () { fallbackCopy(data.url); }
      );
      return;
    }
    fallbackCopy(data.url);
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(t.linkCopied);
    } catch (e) {
      showToast(text);
    }
    document.body.removeChild(ta);
  }

  ["#shareBtn", "#shareFab"].forEach(function (sel) {
    var btn = $(sel);
    if (btn) btn.addEventListener("click", share);
  });

  // Floating share pill appears after the hero.
  var fab = $("#shareFab");
  var hero = $(".hero");
  if (fab && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        fab.classList.toggle("is-visible", !e.isIntersecting);
      });
    }, { rootMargin: "-72px 0px 0px 0px" }).observe(hero);
  } else if (fab) {
    fab.classList.add("is-visible");
  }

  /* ============ 12b. Flowing petals — decorative canvas ============
     A fixed, pointer-transparent canvas floats blush & gold petals down
     the viewport — shiuli-blossom buds, petal pairs and tiny florets.
     Everything is randomised per petal; a slow shared breeze keeps the
     field from ever looking like a looping cycle. */
  (function initPetals() {
    // `reduced` covers motion: "honor" + OS reduce-motion. With the default
    // motion: "always" the petals play for everyone, as configured.
    if (cfg.petals === false || reduced) return;

    var canvas = document.createElement("canvas");
    canvas.className = "petal-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    if (!ctx) { document.body.removeChild(canvas); return; }

    var W = 0, H = 0, MAX = 14;
    var petals = [];
    var rafId = 0, last = 0, nextSpawn = 0, windX = 0;

    function rand(a, b) { return a + Math.random() * (b - a); }

    /* ---- Sprites: pre-rendered once, drawn as images (cheap per frame) ---- */

    var TINTS = [
      { lite: "#f6ddd3", deep: "#e0a993", line: "rgba(158, 102, 86, 0.5)" },   // blush rose
      { lite: "#f2e4bb", deep: "#d8bc7c", line: "rgba(150, 120, 64, 0.5)" },    // antique gold
      { lite: "#f7efe0", deep: "#dcc79d", line: "rgba(150, 124, 80, 0.45)" },   // warm cream
    ];

    // Pointed-oval petal, base at (0,0), tip at (0,-len).
    function budPath(c2, len, wid) {
      c2.beginPath();
      c2.moveTo(0, 0);
      c2.bezierCurveTo(wid * 0.58, -len * 0.3, wid * 0.5, -len * 0.72, 0, -len);
      c2.bezierCurveTo(-wid * 0.5, -len * 0.72, -wid * 0.58, -len * 0.3, 0, 0);
      c2.closePath();
    }

    function paintBud(c2, len, wid, tint, vein) {
      var g = c2.createLinearGradient(0, 0, 0, -len);
      g.addColorStop(0, tint.deep);
      g.addColorStop(1, tint.lite);
      budPath(c2, len, wid);
      c2.fillStyle = g;
      c2.fill();
      c2.lineWidth = 0.7;
      c2.strokeStyle = tint.line;
      c2.stroke();
      if (vein) {
        c2.beginPath();
        c2.moveTo(0, -len * 0.12);
        c2.quadraticCurveTo(wid * 0.1, -len * 0.5, 0, -len * 0.86);
        c2.lineWidth = 0.55;
        c2.stroke();
      }
    }

    function makeSprite(w, h, painter) {
      var PAD = 3, SS = 2; // padded, drawn at 2x for crisp rotation
      var cv = document.createElement("canvas");
      cv.width = Math.ceil((w + PAD * 2) * SS);
      cv.height = Math.ceil((h + PAD * 2) * SS);
      var c2 = cv.getContext("2d");
      c2.scale(SS, SS);
      c2.translate(PAD + w / 2, PAD + h / 2);
      painter(c2);
      return { img: cv, w: w + PAD * 2, h: h + PAD * 2 };
    }

    var KINDS = [
      {
        w: 56, dw: 12, dh: 22,
        paint: function (c2, tint) { c2.translate(0, 10); paintBud(c2, 20, 6.4, tint, true); },
      },
      {
        w: 24, dw: 30, dh: 26,
        paint: function (c2, tint) {
          c2.rotate(0.08);
          c2.save(); c2.rotate(0.52); paintBud(c2, 19, 6.4, tint, false); c2.restore();
          c2.save(); c2.rotate(-0.52); paintBud(c2, 19, 6.4, tint, false); c2.restore();
        },
      },
      {
        w: 14, dw: 22, dh: 20,
        paint: function (c2, tint) {
          for (var i = 0; i < 5; i++) {
            c2.save();
            c2.rotate(i * Math.PI * 2 / 5 + 0.3);
            paintBud(c2, 7.5, 3.6, tint, false);
            c2.restore();
          }
          c2.beginPath();
          c2.arc(0, 0, 1.8, 0, Math.PI * 2);
          c2.fillStyle = tint.deep;
          c2.fill();
        },
      },
    ];

    var SPRITES = [];
    TINTS.forEach(function (tint, ti) {
      var tintWeight = [1.15, 1, 0.8][ti];
      KINDS.forEach(function (k) {
        SPRITES.push({ s: makeSprite(k.dw, k.dh, function (c2) { k.paint(c2, tint); }), w: k.w * tintWeight });
      });
    });

    function pickSprite() {
      var total = 0, i;
      for (i = 0; i < SPRITES.length; i++) total += SPRITES[i].w;
      var r = Math.random() * total;
      for (i = 0; i < SPRITES.length; i++) {
        r -= SPRITES[i].w;
        if (r <= 0) return SPRITES[i].s;
      }
      return SPRITES[0].s;
    }

    function spawnX() {
      if (W > 760 && Math.random() < 0.6) return W / 2 + rand(-320, 320);
      return rand(-30, W + 30);
    }

    function spawn(seeded) {
      var fromCorner = !seeded && Math.random() < 0.3;
      var side = Math.random() < 0.5 ? -1 : 1;
      var x, y, vx;

      if (seeded) {
        var band = Math.random() < 0.22 ? rand(0.3, 0.7)
          : (Math.random() < 0.5 ? rand(0.05, 0.28) : rand(0.72, 0.95));
        x = band * W;
        y = rand(0.06, 0.5) * H;
        vx = rand(-8, 8);
      } else if (fromCorner) {
        x = side < 0 ? rand(-30, W * 0.1) : rand(W * 0.9, W + 30);
        y = rand(-40, H * 0.12);
        vx = side < 0 ? rand(6, 22) : -rand(6, 22);
      } else {
        x = spawnX();
        y = -rand(30, 110);
        vx = rand(-8, 8);
      }

      petals.push({
        spr: pickSprite(),
        scale: rand(0.8, 1.35) * (W < 620 ? 0.9 : 1),
        x: x, y: y, vx: vx,
        vy: rand(20, 46),
        swayAmp: rand(12, 40),
        om: Math.PI * 2 * rand(0.16, 0.4),
        ph: rand(0, Math.PI * 2),
        rot0: rand(0, Math.PI * 2),
        rotV: rand(-0.16, 0.16),
        tilt: rand(0.05, 0.18),
        alpha: rand(0.3, 0.55),
        wf: rand(0.5, 1.4),
        age: 0,
      });
    }

    function scheduleNext(now) {
      nextSpawn = now + (W < 620 ? rand(1800, 3800) : rand(1200, 2600));
    }

    function frame(now) {
      rafId = requestAnimationFrame(frame);
      var dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      var tNow = now / 1000;

      // Slow shared breeze — two incommensurate sines, never quite repeats.
      windX = 6 * Math.sin(tNow * 0.1) + 3.5 * Math.sin(tNow * 0.047 + 2.3);

      if (now >= nextSpawn && petals.length < MAX) {
        spawn(false);
        scheduleNext(now);
      }

      ctx.clearRect(0, 0, W, H);
      for (var i = petals.length - 1; i >= 0; i--) {
        var p = petals[i];
        p.age += dt;
        p.y += p.vy * dt;
        p.x += p.vx * dt;
        if (p.y > H + 110) { petals.splice(i, 1); continue; }

        var sway = Math.sin(p.age * p.om + p.ph);
        var x = p.x + p.swayAmp * sway + windX * p.wf;
        var rot = p.rot0 + p.rotV * p.age + p.tilt * Math.cos(p.age * p.om + p.ph);

        var lifeA = Math.min(1, Math.max(0, p.y / 130)) * Math.max(0, Math.min(1, (H + 90 - p.y) / 190));

        ctx.save();
        ctx.globalAlpha = p.alpha * lifeA;
        ctx.translate(x, p.y);
        ctx.rotate(rot);
        ctx.drawImage(p.spr.img, -p.spr.w * p.scale / 2, -p.spr.h * p.scale / 2, p.spr.w * p.scale, p.spr.h * p.scale);
        ctx.restore();
      }
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      MAX = W < 620 ? 8 : 14;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(W * dpr);
      canvas.height = Math.ceil(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    function start() {
      if (!rafId) {
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    }

    function stop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    resize();
    var seed = W < 620 ? 5 : 7;
    for (var i = 0; i < seed; i++) spawn(true);
    nextSpawn = performance.now() + rand(900, 1800);
    start();
  })();

  /* ============ 12c. Scroll FX — progress · rail · scroll cue ============ */
  (function initScrollFx() {
    var scrollCue = $(".hero__scroll");

    if (reduced) return; // rail stands full via .motion-reduced; bar hidden below

    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY || 0;
      var vh = window.innerHeight;
      var doc = document.documentElement;

      var progress = $("#progressBar");
      var scrollCue = $(".hero__scroll");

      // Scroll progress
      if (progress) {
        var max = (doc.scrollHeight - vh) || 1;
        progress.style.transform = "scaleX(" + Math.min(1, y / max).toFixed(4) + ")";
      }

      // The scroll cue bows out once the guest starts moving.
      if (scrollCue) scrollCue.classList.toggle("is-hidden", y > 60);

      // Story rail draws as the guest reads (clip-path, so the dashes
      // stay crisp instead of squashing under a scaleY). Looked up fresh
      // each pass — renderStory() re-creates the element on language swap.
      var rail = $("#storyRail");
      if (rail && storyList) {
        var rect = storyList.getBoundingClientRect();
        var p = Math.max(0, Math.min(1, (vh * 0.72 - rect.top) / rect.height));
        rail.style.clipPath = "inset(0 0 " + ((1 - p) * 100).toFixed(2) + "% 0)";
      }
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  })();

  /* ============ 5. Fit names on one line ============
     Keep each script name on a single line: shrink the font until it
     fits. Below 20px, give up and allow wrapping (very long names). */
  function fitNames() {
    $$(".script-name").forEach(function (el) {
      el.style.whiteSpace = "nowrap";
      el.style.fontSize = "";
      // Measure against the names block (the inline .name-wrap would just
      // shrink-wrap to the name itself).
      var holder = el.closest("h1");
      var max = holder ? holder.clientWidth - 16 : 0;
      if (!max) return;
      var size = parseFloat(window.getComputedStyle(el).fontSize);
      var guard = 30;
      while (size > 20 && el.scrollWidth > max && guard-- > 0) {
        size -= 1;
        el.style.fontSize = size + "px";
      }
      if (el.scrollWidth > max) el.style.whiteSpace = "";
    });
  }
  window.addEventListener("resize", fitNames);
  if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
    document.fonts.ready.then(fitNames);
  }

  /* ============ Language application & init ============ */
  function applyLanguage() {
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach(function (el) {
      var v = t[el.getAttribute("data-i18n")];
      if (typeof v === "string") el.textContent = v;
    });
    $$("[data-i18n-html]").forEach(function (el) {
      var v = t[el.getAttribute("data-i18n-html")];
      if (typeof v === "string") el.innerHTML = v;
    });
    $$("[data-i18n-aria]").forEach(function (el) {
      var v = t[el.getAttribute("data-i18n-aria")];
      if (typeof v === "string") el.setAttribute("aria-label", v);
    });
    $$("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr").split(":");
      var v = t[spec[1]];
      if (spec[0] && typeof v === "string") el.setAttribute(spec[0], v);
    });

    if (toast) toast.textContent = t.linkCopied;
    var lbEl = $("#lightbox");
    if (lbEl) lbEl.setAttribute("aria-label", t.lightboxAria);

    hydrateContent();
    renderStory();
    renderEvents();
    renderGallery();
    renderCustom();
    fitNames();
    updateToggleUI();
    langHooks.forEach(function (fn) { fn(); });
    if (typeof refreshCountdown === "function") refreshCountdown();
  }

  var langToggle = $("#langToggle");

  function updateToggleUI() {
    if (!langToggle) return;
    var enOpt = langToggle.querySelector("[data-lang-opt='en']");
    var bnOpt = langToggle.querySelector("[data-lang-opt='bn']");
    if (enOpt) enOpt.classList.toggle("is-active", lang === "en");
    if (bnOpt) bnOpt.classList.toggle("is-active", lang === "bn");
    langToggle.setAttribute("aria-label", t.switchTo);
  }

  if (langToggle) {
    if (bnAvailable) {
      langToggle.addEventListener("click", function () {
        setLang(lang === "bn" ? "en" : "bn", true);
      });
    } else {
      // No Bangla content configured — hide the toggle, English-only site.
      langToggle.hidden = true;
    }
  }

  /* ============ 2. Curtain opening ============
     Choreography:
       t=0     guest taps → music starts, content bows out, bloom swells
       t≈500ms the drapes part and scrolling unlocks; the hero cascade
               begins in step (its delays carry: blessing → crest →
               eyebrow → names + scribbles → rule → date → place)
       t≈2.15s the overlay is dropped entirely
     Skip (before or during) lands straight on the hero. */
  (function initIntro() {
    var openedBefore = false;
    try { openedBefore = sessionStorage.getItem("invite-opened") === "1"; } catch (e) { /* ignore */ }
    var oncePerSession = !!(cfg.intro && cfg.intro.oncePerSession);

    function skipStraightToSite() {
      try { sessionStorage.setItem("invite-opened", "1"); } catch (e) { /* ignore */ }
      if (introEl && introEl.parentNode) introEl.parentNode.removeChild(introEl);
      document.body.classList.remove("is-locked");
      document.body.classList.add("is-live");
      var main = $("#invite");
      if (main) {
        main.setAttribute("tabindex", "-1");
        try { main.focus({ preventScroll: true }); } catch (e) { main.focus(); }
      }
    }

    if (!introActive || (openedBefore && oncePerSession)) {
      skipStraightToSite();
      return;
    }

    // A session flag exists but oncePerSession is off — the early-boot
    // script hid the curtains; bring them back for this visit.
    document.documentElement.classList.remove("no-intro");

    var openBtn = $("#introOpen");
    var skipBtn = $("#introSkip");
    var opened = false;

    function open() {
      if (opened) return;
      opened = true;
      try { sessionStorage.setItem("invite-opened", "1"); } catch (e) { /* ignore */ }
      if (skipBtn) skipBtn.hidden = true;

      introEl.classList.add("is-opening");
      if (typeof musicKick === "function") musicKick();

      setTimeout(function () {
        introEl.classList.add("is-open");
        document.body.classList.remove("is-locked");
        // The hero starts hidden and enters while the curtains part.
        document.body.classList.add("is-live");
        fitNames();
      }, 500);

      setTimeout(function () {
        introEl.classList.add("is-done");
        // Hand focus into the page now that the invitation is open.
        var main = $("#invite");
        if (main) {
          main.setAttribute("tabindex", "-1");
          try { main.focus({ preventScroll: true }); } catch (e) { main.focus(); }
        }
      }, 2150);
    }

    if (openBtn) openBtn.addEventListener("click", open);
    if (skipBtn) skipBtn.addEventListener("click", skipStraightToSite);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !opened) skipStraightToSite();
    });
  })();

  /* ============ Static reveals (sections that don't re-render) ============ */
  (function initStaticReveals() {
    var selectors = [
      ".welcome", ".countdown__panel", ".venue__info", ".venue__frame",
      ".rsvp__panel", ".footer__inner",
    ];
    if ("IntersectionObserver" in window && !reduced) {
      selectors.forEach(function (sel) {
        $$(sel).forEach(function (el) {
          el.classList.add("reveal");
          observeReveal(el);
        });
      });
    } else {
      $$(selectors.join(", ")).forEach(function (el) { el.classList.add("is-in"); });
    }
  })();

  // Boot the language (renders everything once), then settle names.
  setLang(initialLang(), false);
  fitNames();
})();
