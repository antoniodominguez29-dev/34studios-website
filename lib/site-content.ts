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

export type BookingData = Record<BookingDataKey, string>;

export type BookingStepContent = {
  key: BookingDataKey;
  label: string;
  prompt: string;
  kind: "select" | "text" | "date" | "number" | "textarea";
  options?: string[];
};

export type LeadContent = BookingData & {
  id: string;
  status: LeadStatus;
  createdAt: string;
  briefing: string;
};

type LeadStatusContent = {
  value: LeadStatus;
  label: string;
};

export const brandContact = {
  name: "34Studios",
  handle: "@34studios",
  email: "34studios.photo@gmail.com",
  phone: "+49 1624804647",
  whatsappHref: "https://wa.me/491624804647",
  instagramHref: "https://instagram.com/34studios",
  base: "Mosbach / Baden-Württemberg / Deutschland"
};

export const siteContent = {
  storageKey: "34studios-de-leads-v1",
  brand: brandContact,
  metadata: {
    title: "34Studios | Bild als Sprache",
    description:
      "34Studios ist ein visuelles Studio für editoriale Produktionen, leise Porträts und visuelle Narrative aus Identität, Präsenz und menschlicher Beobachtung."
  },
  header: {
    ctaLabel: "Anfrage"
  },
  navItems: [
    { href: "#work", label: "Arbeiten" },
    { href: "#about", label: "Über mich" },
    { href: "#collaborations", label: "Zusammenarbeit" },
    { href: "#briefing", label: "Anfrage" },
    { href: "#contact", label: "Kontakt" }
  ],
  sectionLabels: {
    home: "Titel",
    work: "Ausgewählte Arbeiten",
    about: "Über mich",
    collaborations: "Zusammenarbeit",
    briefing: "Editorial Briefing",
    "studio-ledger": "Studio Archiv",
    contact: "Kontakt"
  },
  editionRail: {
    code: "34S / 001"
  },
  hero: {
    backgroundWord: "STUDIOS",
    eyebrowLeft: "34Studios / Ausgabe 001",
    eyebrowRight: "Mosbach / Deutschland",
    deck: "Visuelle Erzählungen aus Beobachtung, Identität und leiser menschlicher Nähe.",
    titleTop: "34",
    titleBottom: "Studios",
    image: "/images/34studios-cover-portrait.jpg",
    imageAlt: "Schwarz-weißes Editorial-Porträt einer Frau mit Fächer auf offenem Feld",
    captionLeft: "Identität / Präsenz / Bild als Sprache",
    captionRight: "Ausgabe 001",
    primaryCta: { label: "Ausgabe ansehen", href: "#work" },
    secondaryCta: { label: "Zusammenarbeit anfragen", href: "#briefing" }
  },
  work: {
    kicker: "Ausgewählte Arbeiten",
    title: "Bilder, die Raum für Identität, Stille und Deutung lassen.",
    intro:
      "Eine reduzierte Auswahl aus Porträts, Körperstudien und visuellen Erzählungen. Geformt durch Distanz, Licht und Richtung.",
    items: [
      {
        category: "Porträt",
        image: "/images/34studios-work-editorial.jpg",
        imageAlt: "Nahes Editorial-Porträt mit direktem Blick und zurückhaltendem Licht",
        title: "Gesicht als Atmosphäre",
        note: "Leise Porträtarbeit, kontrollierter Blick, keine Dekoration.",
        issue: "Motiv 01"
      },
      {
        category: "Körperstudie",
        image: "/images/34studios-work-figure.jpg",
        imageAlt: "Reduzierte Körperstudie mit Haltung, Haut und negativem Raum",
        title: "Körper als Linie",
        note: "Eine Studie über Haltung, Haut, Stille und editoriale Zurückhaltung.",
        issue: "Motiv 02"
      },
      {
        category: "Rotstudie",
        image: "/images/34studios-work-red-study.jpg",
        imageAlt: "Editoriales Porträt in rotem Licht mit kontrollierter emotionaler Spannung",
        title: "Roter Raum",
        note: "Farbe als Druck, nicht als Schmuck. Eine bewusst gehaltene Temperatur.",
        issue: "Motiv 03"
      },
      {
        category: "Identität",
        image: "/images/34studios-work-outerwear.jpg",
        imageAlt: "Frontale Porträtstudie mit Mantel, Distanz und Präsenz",
        title: "Äußere Schicht",
        note: "Stil, Abstand und Präsenz in einem direkten Bild.",
        issue: "Motiv 04"
      }
    ]
  },
  about: {
    kicker: "Über mich",
    title: "Ich habe gelernt, hinzusehen, bevor ich es Fotografie nannte.",
    statement:
      "Ich wurde in Barcelona geboren und lebe seit 2021 in Deutschland. Meine Bilder entstehen aus Beobachtung, kultureller Spannung und Nähe zum Menschen.",
    image: "/images/34studios-about-antonio.jpg",
    imageAlt: "Porträt von Abraham Antonio Marzouk Domínguez sitzend in einem Auto",
    meta: ["Barcelona", "Deutschland seit 2021", "Pflege / Menschlichkeit", "Autodidaktisches Lernen"],
    chapters: [
      {
        label: "Nähe",
        text:
          "Bevor die Fotografie einen Namen bekam, war da die Pflege: ein Alltag nah am Menschen, an Verletzlichkeit, Verantwortung und Momenten, in denen man wirklich aufmerksam sein muss."
      },
      {
        label: "Wurzeln",
        text:
          "Meine Herkunft ist kein einzelner Ort. Sie ist ein Geflecht aus Sprachen, Traditionen und Blickwinkeln. Genau daraus entsteht meine Freiheit, Identität nicht festzuhalten, sondern in Bewegung zu zeigen."
      },
      {
        label: "Blick",
        text:
          "Ich habe mir Fotografie autodidaktisch angeeignet, nicht aus Distanz, sondern aus einem Bedürfnis heraus: Gesichter, Pausen, Gesten und das Ungesagte zwischen Menschen sichtbar zu machen."
      },
      {
        label: "Sprache",
        text:
          "Mit 34Studios suche ich visuelle Narrative, die Emotion und Identität verbinden - für Magazine mit Haltung, kulturelle Projekte und Menschen, die nicht dekoriert, sondern gesehen werden wollen."
      }
    ]
  },
  collaborations: {
    kicker: "Interessen & Zusammenarbeit",
    title: "Für Redaktionen, Magazine und kulturelle Projekte, die Bild als Sprache verstehen.",
    image: "/images/34studios-collaboration-reportage.jpg",
    imageAlt: "Schwarz-weißes Porträt von unten durch eine hölzerne Struktur gesehen",
    paragraphs: [
      "Ich arbeite mit Redaktionen, Magazinen und kulturellen Projekten, die visuelle Qualität, Haltung und eine klare fotografische Sprache suchen.",
      "Im Mittelpunkt stehen editoriale Produktionen, Porträts und visuelle Reportagen, in denen Fotografie nicht nur illustriert, sondern erzählt.",
      "Verfügbar für redaktionelle Aufträge, Porträts und projektbasierte Zusammenarbeit in Baden-Württemberg und bundesweit."
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
    kicker: "Editorial Briefing",
    title: "Eine erste Notiz für Geschichten mit Tiefe.",
    intro: "Reduziert in der Form, präzise im Inhalt. Ein leiser Anfang vor dem Gespräch.",
    progressLabel: "Frage",
    liveBriefLabel: "Erstes Briefing",
    emptyBrief: "Das Briefing entsteht, sobald die Anfrage vollständig ist.",
    successMessage: "Danke. Deine Anfrage wurde als erstes Briefing gespeichert. Ich melde mich persönlich.",
    requiredError: "Diese Angabe fehlt noch.",
    submitLabel: "Briefing erstellen",
    continueLabel: "Weiter",
    backLabel: "Zurück",
    chooseOptionLabel: "Wählen",
    selectedOptionLabel: "Ausgewählt",
    selectedAriaLabel: "ausgewählt",
    createBriefing: (data: BookingData) =>
      `${data.sessionType} in ${data.location}, geplant für ${data.date}, mit ${data.people} Person(en) im Bild. Visuelle Richtung: ${data.style}. Produktionsrahmen: ${data.budget}. Kontakt: ${data.name}, ${data.contact}.`,
    steps: [
      {
        key: "sessionType",
        label: "Art der Zusammenarbeit",
        prompt: "Welche visuelle Erzählung entsteht hier?",
        kind: "select",
        options: [
          "Editoriale Produktion",
          "Porträt / leise Porträtarbeit",
          "Visuelle Reportage",
          "Kulturelles Projekt",
          "Hochzeit / privates Ritual"
        ]
      },
      {
        key: "date",
        label: "Wunschdatum",
        prompt: "Wann soll sie stattfinden?",
        kind: "text"
      },
      {
        key: "location",
        label: "Ort",
        prompt: "Wo findet die Geschichte statt?",
        kind: "text"
      },
      {
        key: "people",
        label: "Menschen",
        prompt: "Wie viele Menschen stehen im Bild?",
        kind: "number"
      },
      {
        key: "style",
        label: "Atmosphäre",
        prompt: "Welche Atmosphäre soll das Bild tragen?",
        kind: "textarea"
      },
      {
        key: "budget",
        label: "Rahmen",
        prompt: "Welcher Produktionsrahmen ist vorgesehen?",
        kind: "select",
        options: ["Unter 500 EUR", "500 - 1.000 EUR", "1.000 - 2.500 EUR", "2.500 EUR+"]
      },
      {
        key: "name",
        label: "Name",
        prompt: "An wen darf ich mich wenden?",
        kind: "text"
      },
      {
        key: "contact",
        label: "E-Mail / Telefon",
        prompt: "Wie kann ich antworten?",
        kind: "text"
      }
    ] satisfies BookingStepContent[]
  },
  ledger: {
    kicker: "Studio Archiv",
    title: "Anfragen, leise geordnet.",
    countLabel: (count: number) => `${count} ${count === 1 ? "Anfrage" : "Anfragen"}`,
    emptyText: "Noch keine Anfragen. Vollständige Briefings erscheinen hier als interne Studio-Notizen.",
    statusLabel: "Status",
    contactLabel: "Kontakt",
    requestLabel: "Anfrage",
    initialStatus: "New" as LeadStatus,
    statusOptions: [
      { value: "New", label: "Eingang" },
      { value: "Contacted", label: "In Gespräch" },
      { value: "Booked", label: "Bestätigt" },
      { value: "Delivered", label: "Abgeschlossen" }
    ] satisfies LeadStatusContent[]
  },
  demoLeads: [] satisfies LeadContent[],
  contact: {
    kicker: "Kontakt",
    title: "Schreib eine erste Notiz. Das Bild kann folgen.",
    image: "/images/34studios-contact-portrait.jpg",
    imageAlt: "Warmes Editorial-Porträt mit Sonnenbrille und Seidentuch",
    intro:
      "Offen für editoriale Produktionen, Porträts und projektbasierte Zusammenarbeit in Baden-Württemberg und bundesweit.",
    lines: [
      { label: "Instagram", value: brandContact.handle, href: brandContact.instagramHref },
      { label: "E-Mail", value: brandContact.email, href: `mailto:${brandContact.email}` },
      { label: "WhatsApp", value: brandContact.phone, href: brandContact.whatsappHref },
      { label: "Ort", value: "Mosbach / Deutschland" }
    ]
  },
  footer: {
    left: "34Studios",
    center: "Bild als Sprache / Visuelle Narrative",
    right: "Ausgabe 001 / Digitale Präsenz"
  }
};
