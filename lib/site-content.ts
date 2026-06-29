export type LeadStatus = "New" | "Contacted" | "Booked" | "Delivered";

export type BookingDataKey =
  | "sessionType"
  | "date"
  | "location"
  | "people"
  | "style"
  | "budget"
  | "name"
  | "contact";

export type BookingStepContent = {
  key: BookingDataKey;
  label: string;
  prompt: string;
  kind: "select" | "text" | "date" | "number" | "textarea";
  options?: string[];
};

export type LeadContent = {
  id: string;
  status: LeadStatus;
  sessionType: string;
  date: string;
  location: string;
  people: string;
  style: string;
  budget: string;
  name: string;
  contact: string;
  createdAt: string;
  briefing: string;
};

export const brandContact = {
  name: "34Studios",
  handle: "@34studios",
  email: "antoniodominguez29@icloud.com",
  phone: "+49 1624804647",
  whatsappHref: "https://wa.me/491624804647",
  instagramHref: "https://instagram.com/34studios",
  base: "Mosbach / Baden-Württemberg / Germany"
};

export const siteContent = {
  storageKey: "34studios-production-leads-v1",
  brand: brandContact,
  navItems: [
    { href: "#work", label: "Work" },
    { href: "#about", label: "Über mich" },
    { href: "#collaborations", label: "Collaborations" },
    { href: "#briefing", label: "Briefing" },
    { href: "#studio-ledger", label: "Ledger" },
    { href: "#contact", label: "Contact" }
  ],
  sectionLabels: {
    home: "Cover",
    work: "Selected Work",
    about: "Über mich",
    collaborations: "Zusammenarbeit",
    briefing: "Briefing",
    "studio-ledger": "Studio Ledger",
    contact: "Contact"
  },
  hero: {
    backgroundWord: "STUDIOS",
    eyebrowLeft: "34Studios / Issue 001",
    eyebrowRight: "Based in Mosbach / Germany",
    deck: "Visual narratives shaped by observation, identity and quiet human detail.",
    titleTop: "34",
    titleBottom: "Studios",
    image: "/images/34studios-cover-portrait.jpg",
    imageAlt: "Black-and-white editorial portrait of a woman holding a fan in an open field",
    captionLeft: "Identity / Presence / Image as language",
    captionRight: "Issue 001",
    primaryCta: { label: "Enter the issue", href: "#work" },
    secondaryCta: { label: "Start a collaboration", href: "#briefing" }
  },
  work: {
    kicker: "Selected Work",
    title: "Images that leave room for identity, silence and interpretation.",
    intro:
      "A restrained selection of portraiture, figure studies and visual stories shaped by distance, light and direction.",
    items: [
      {
        category: "Portrait",
        image: "/images/34studios-work-editorial.jpg",
        imageAlt: "Close editorial portrait with direct gaze and restrained light",
        title: "Face as Atmosphere",
        note: "Quiet portraiture, controlled gaze, a refusal to decorate.",
        issue: "Frame 01"
      },
      {
        category: "Figure",
        image: "/images/34studios-work-figure.jpg",
        imageAlt: "Minimal figure study shaped by posture, skin and negative space",
        title: "Body as Line",
        note: "A study in posture, skin, silence and editorial restraint.",
        issue: "Frame 02"
      },
      {
        category: "Red Study",
        image: "/images/34studios-work-red-study.jpg",
        imageAlt: "Editorial portrait in red light with a controlled emotional tone",
        title: "Red Room",
        note: "Color as pressure, not ornament. A controlled emotional temperature.",
        issue: "Frame 03"
      },
      {
        category: "Identity",
        image: "/images/34studios-work-outerwear.jpg",
        imageAlt: "Frontal portrait study with outerwear, distance and presence",
        title: "Outer Layer",
        note: "Style, distance and presence held in a single frontal frame.",
        issue: "Frame 04"
      }
    ]
  },
  about: {
    kicker: "Über mich",
    title: "I learned to look before I learned to call it photography.",
    statement:
      "Born in Barcelona and based in Germany since 2021, Abraham Antonio Marzouk Domínguez builds images from observation, culture and human proximity.",
    image: "/images/34studios-about-antonio.jpg",
    imageAlt: "Portrait of Abraham Antonio Marzouk Domínguez seated in a car",
    paragraphs: [
      "Before photography, his path led into Pflege. Not as a brand story, but as a human chapter: closeness, responsibility and the need to act where help was missing.",
      "His origin is not a single place. It is a mosaic of roots, languages and traditions. What could feel divided becomes freedom: a way of seeing identity as movement.",
      "Photography became the tool for what had always been there: small nuances, background faces, the unsaid between two people. Self-taught by conviction, he looks for depth rather than validation.",
      "34Studios exists for visual narratives that connect emotion and identity - for magazines with Haltung, brands seeking authenticity and people who want to be seen, not decorated."
    ]
  },
  collaborations: {
    kicker: "Interessen & Zusammenarbeit",
    title: "For editors, magazines and cultural projects that understand image as language.",
    image: "/images/34studios-collaboration-reportage.jpg",
    imageAlt: "Black-and-white portrait seen from below through a wooden structure",
    paragraphs: [
      "34Studios is open to redaktionen, magazines and cultural projects that value visual quality, Haltung and a clear photographic language.",
      "The focus is on editorial productions, portraits and visual reportages where photography does not simply illustrate, but tells.",
      "Available for redaktionelle Aufträge, portraits and project-based collaborations in Baden-Württemberg and bundesweit."
    ],
    areas: [
      "Redaktionen",
      "Magazine",
      "Kulturelle Projekte",
      "Editoriale Produktionen",
      "Porträts",
      "Visuelle Reportagen",
      "Baden-Württemberg / bundesweit"
    ]
  },
  booking: {
    kicker: "Commission Briefing",
    title: "A first note for stories with depth.",
    intro: "Sparse by design, precise by necessity. A quiet beginning before the conversation.",
    progressLabel: "Question",
    liveBriefLabel: "Live brief",
    emptyBrief: "The studio brief will appear once the request is complete.",
    requiredError: "This detail is required.",
    submitLabel: "Create briefing",
    continueLabel: "Continue",
    backLabel: "Back",
    steps: [
      {
        key: "sessionType",
        label: "Collaboration type",
        prompt: "What kind of visual narrative is this?",
        kind: "select",
        options: [
          "Editorial Commission",
          "Portrait / Quiet Portraiture",
          "Visual Reportage",
          "Cultural Project",
          "Wedding / Private Ritual"
        ]
      },
      {
        key: "date",
        label: "Desired date",
        prompt: "When should it exist?",
        kind: "text"
      },
      {
        key: "location",
        label: "City / place",
        prompt: "Where does the story happen?",
        kind: "text"
      },
      {
        key: "people",
        label: "People",
        prompt: "How many people are in frame?",
        kind: "number"
      },
      {
        key: "style",
        label: "Desired atmosphere",
        prompt: "Describe the visual language.",
        kind: "textarea"
      },
      {
        key: "budget",
        label: "Approx. budget",
        prompt: "What is the production range?",
        kind: "select",
        options: ["Under 500 EUR", "500 - 1,000 EUR", "1,000 - 2,500 EUR", "2,500 EUR+"]
      },
      {
        key: "name",
        label: "Name",
        prompt: "Who should be addressed?",
        kind: "text"
      },
      {
        key: "contact",
        label: "Email / phone",
        prompt: "Where can 34Studios reply?",
        kind: "text"
      }
    ] satisfies BookingStepContent[]
  },
  demoLeads: [] satisfies LeadContent[],
  contact: {
    kicker: "Contact",
    title: "Begin with a note. The image can follow.",
    image: "/images/34studios-contact-portrait.jpg",
    imageAlt: "Warm editorial portrait with sunglasses and a silk scarf",
    intro:
      "Available for editorial commissions, portraits and project-based collaborations in Baden-Württemberg and bundesweit.",
    lines: [
      { label: "Instagram", value: brandContact.handle, href: brandContact.instagramHref },
      { label: "Email", value: brandContact.email, href: `mailto:${brandContact.email}` },
      { label: "WhatsApp", value: brandContact.phone, href: brandContact.whatsappHref },
      { label: "Base", value: "Mosbach / Germany" }
    ]
  },
  footer: {
    left: "34Studios",
    center: "Image as language / Visual narratives",
    right: "Issue 001 / Digital Presence"
  }
};
