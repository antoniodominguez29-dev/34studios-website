"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { siteContent, type BookingStepContent, type LeadContent, type LeadStatus } from "../lib/site-content";

type WorkCategory = string;

type BookingData = {
  sessionType: string;
  date: string;
  location: string;
  people: string;
  style: string;
  budget: string;
  name: string;
  contact: string;
};
type Lead = LeadContent;

type BookingStep = BookingStepContent;

const storageKey = siteContent.storageKey;
const navItems = siteContent.navItems;
const workItems = siteContent.work.items;
const bookingSteps = siteContent.booking.steps;
const demoLeads = siteContent.demoLeads;

const emptyBooking: BookingData = {
  sessionType: "",
  date: "",
  location: "",
  people: "",
  style: "",
  budget: "",
  name: "",
  contact: ""
};

function generateBriefing(data: BookingData) {
  return `${data.sessionType} in ${data.location} on ${data.date} for ${data.people} people. Desired direction: ${data.style}. Approx. budget: ${data.budget}. Contact: ${data.name}, ${data.contact}.`;
}

export default function Home() {
  const [activeWork, setActiveWork] = useState<WorkCategory>(workItems[0].category);
  const [activeSection, setActiveSection] = useState("home");
  const [stepIndex, setStepIndex] = useState(0);
  const [booking, setBooking] = useState<BookingData>(emptyBooking);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasLoadedLeads, setHasLoadedLeads] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const currentStep = bookingSteps[stepIndex];
  const selectedWork = workItems.find((item) => item.category === activeWork) ?? workItems[0];

  const draftBriefing = useMemo(() => {
    const completed = Object.values(booking).every(Boolean);
    return completed ? generateBriefing(booking) : "";
  }, [booking]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (!saved) {
      setLeads(demoLeads);
      setHasLoadedLeads(true);
      return;
    }

    try {
      setLeads(JSON.parse(saved) as Lead[]);
    } catch {
      setLeads(demoLeads);
    } finally {
      setHasLoadedLeads(true);
    }
  }, []);

  useEffect(() => {
    if (hasLoadedLeads) {
      window.localStorage.setItem(storageKey, JSON.stringify(leads));
    }
  }, [hasLoadedLeads, leads]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0.12, 0.35, 0.62] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function updateBooking(value: string) {
    setBooking((current) => ({ ...current, [currentStep.key]: value }));
    setFieldError("");
  }

  function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = booking[currentStep.key].trim();

    if (!value) {
      setFieldError(siteContent.booking.requiredError);
      return;
    }

    if (stepIndex < bookingSteps.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }

    const briefing = generateBriefing(booking);
    const lead: Lead = {
      ...booking,
      id: crypto.randomUUID(),
      status: "New",
      briefing,
      createdAt: new Date().toISOString()
    };

    setLeads((current) => [lead, ...current]);
    setBooking(emptyBooking);
    setStepIndex(0);
    setFieldError("");

    window.location.hash = "studio-ledger";
  }

  function updateLeadStatus(id: string, status: LeadStatus) {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f2ec] text-[#070707]">
      <ScrollProgress />
      <Header activeSection={activeSection} />
      <EditionRail activeSection={activeSection} />

      <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#f4f2ec]">
        <motion.p
          aria-hidden="true"
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -left-[2vw] -top-[2vw] z-0 whitespace-nowrap font-editorial text-[26vw] font-black leading-[0.76] text-[#080808]"
        >
          {siteContent.hero.backgroundWord}
        </motion.p>

        <div className="relative z-10 grid min-h-[100svh] grid-rows-[auto_1fr_auto] px-5 pb-5 pt-24 sm:px-8 lg:px-14">
          <Reveal className="flex items-start justify-between border-t border-[#080808] pt-5 text-[11px] uppercase text-[#080808]/62">
            <p>{siteContent.hero.eyebrowLeft}</p>
            <p className="hidden sm:block">{siteContent.hero.eyebrowRight}</p>
          </Reveal>

          <div className="grid items-center gap-8 py-10 sm:gap-10 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-16 xl:py-20">
            <Reveal className="max-w-3xl self-center">
              <p className="mb-7 max-w-sm text-sm leading-6 text-[#080808]/58">
                {siteContent.hero.deck}
              </p>
              <h1 className="text-[17vw] font-medium leading-[0.84] tracking-normal text-[#080808] sm:text-[14vw] lg:text-[9.5vw]">
                {siteContent.hero.titleTop}<br />{siteContent.hero.titleBottom}
              </h1>
            </Reveal>

            <Reveal delay={0.15} className="relative ml-auto aspect-[4/3] w-full max-w-[720px] overflow-hidden bg-[#0a0a0a] sm:aspect-[4/5] lg:h-[64svh] lg:max-h-[620px] lg:min-h-[420px] lg:aspect-auto">
              <CinematicImage
                src={siteContent.hero.image}
                alt={siteContent.hero.imageAlt}
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="grayscale object-[50%_24%]"
              />
              <div className="absolute inset-0 bg-black/18" />
              <div className="absolute bottom-0 left-0 right-0 hidden items-end justify-between p-4 text-[11px] uppercase text-white/72 sm:flex sm:p-6">
                <span>{siteContent.hero.captionLeft}</span>
                <span>{siteContent.hero.captionRight}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="grid gap-4 border-t border-[#080808] pt-5 text-[11px] uppercase sm:grid-cols-[1fr_auto]">
            <a href={siteContent.hero.primaryCta.href} className="editorial-link text-[#080808]">
              {siteContent.hero.primaryCta.label}
            </a>
            <a href={siteContent.hero.secondaryCta.href} className="editorial-link text-[#080808]">
              {siteContent.hero.secondaryCta.label}
            </a>
          </Reveal>
        </div>
      </section>

      <section id="work" className="bg-[#070707] px-5 py-24 text-[#f4f2ec] sm:px-8 sm:py-32 lg:px-14">
        <Reveal className="grid gap-8 border-t border-white/24 pt-6 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionHeader kicker={siteContent.work.kicker} title={siteContent.work.title} />
          <p className="max-w-2xl text-xl leading-8 text-white/64 lg:text-2xl lg:leading-10">
            {siteContent.work.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid min-w-0 gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-14">
          <Reveal className="self-end">
            <div className="space-y-0 border-t border-white/22">
              {workItems.map((item, index) => (
                <button
                  key={item.category}
                  onMouseEnter={() => setActiveWork(item.category)}
                  onClick={() => setActiveWork(item.category)}
                  className="archive-button group grid w-full grid-cols-[48px_1fr] items-center border-b border-white/22 py-5 text-left transition"
                >
                  <span className="text-[11px] text-white/40">0{index + 1}</span>
                  <span className="flex items-baseline justify-between gap-4">
                    <span
                      className={`text-3xl leading-none transition sm:text-5xl ${
                        activeWork === item.category ? "text-white" : "text-white/38 group-hover:text-white/78"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="hidden text-[11px] uppercase text-white/38 sm:block">{item.issue}</span>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-6 lg:grid-cols-[1fr_0.32fr]">
            <div className="group relative aspect-[3/4] overflow-hidden bg-black sm:aspect-[16/10] lg:aspect-[5/4]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedWork.image}
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <CinematicImage
                    src={selectedWork.image}
                    alt={selectedWork.imageAlt}
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="grayscale transition duration-700 group-hover:scale-[1.015]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-col justify-between border-t border-white/22 pt-5 lg:border-b lg:pb-5">
              <div>
                <p className="text-[11px] uppercase text-white/42">{selectedWork.issue}</p>
                <p className="mt-4 text-4xl leading-none">{selectedWork.title}</p>
              </div>
              <p className="mt-8 max-w-sm text-sm leading-6 text-white/58">{selectedWork.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="bg-[#f4f2ec] px-5 py-24 text-[#070707] sm:px-8 sm:py-36 lg:px-14">
        <Reveal className="grid gap-12 border-t border-[#080808] pt-6 lg:grid-cols-[0.42fr_1.58fr]">
          <div>
            <p className="mb-8 text-[11px] uppercase text-[#080808]/42">{siteContent.about.kicker}</p>
            <p className="max-w-sm text-sm leading-7 text-[#080808]/58">{siteContent.about.statement}</p>
          </div>
          <div>
            <p className="max-w-6xl text-4xl leading-[1.03] sm:text-6xl lg:text-[6.2rem]">
              {siteContent.about.title}
            </p>
            <div className="mt-14 grid gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#080808]">
                <CinematicImage
                  src={siteContent.about.image}
                  alt={siteContent.about.imageAlt}
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="grayscale"
                />
              </div>
              <div className="grid gap-7 text-base leading-8 text-[#080808]/62">
                {siteContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="collaborations" className="bg-[#f4f2ec] px-5 pb-28 text-[#070707] sm:px-8 sm:pb-40 lg:px-14">
        <Reveal className="border-t border-[#080808] pt-6">
          <SectionHeader kicker={siteContent.collaborations.kicker} title={siteContent.collaborations.title} />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative mt-16 aspect-[4/3] overflow-hidden bg-[#080808] sm:aspect-[16/7]">
            <CinematicImage
              src={siteContent.collaborations.image}
              alt={siteContent.collaborations.imageAlt}
              sizes="100vw"
              className="grayscale"
            />
          </div>
        </Reveal>
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.58fr_1.42fr]">
          <Reveal className="grid gap-7 text-base leading-8 text-[#080808]/62">
            {siteContent.collaborations.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <div className="border-t border-[#080808]/24">
            {siteContent.collaborations.areas.map((area, index) => (
              <Reveal key={area} delay={index * 0.035}>
                <article className="commission-row grid gap-6 border-b border-[#080808]/24 py-6 md:grid-cols-[90px_1fr] md:items-center">
                  <p className="text-[11px] text-[#080808]/42">0{index + 1}</p>
                  <h3 className="text-3xl leading-none md:text-5xl">{area}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="briefing" className="bg-[#070707] px-5 py-24 text-[#f4f2ec] sm:px-8 sm:py-36 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <SectionHeader kicker={siteContent.booking.kicker} title={siteContent.booking.title} />
            <p className="mt-8 max-w-md text-sm leading-7 text-white/56">
              {siteContent.booking.intro}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="border-t border-white/24 pt-6">
              <div className="mb-12 flex items-center justify-between text-[11px] uppercase text-white/44">
                <p>
                  {siteContent.booking.progressLabel} {stepIndex + 1} / {bookingSteps.length}
                </p>
                <p>{currentStep.label}</p>
              </div>
              <div className="mb-12 h-px bg-white/14">
                <motion.div
                  className="h-px origin-left bg-white"
                  animate={{ scaleX: (stepIndex + 1) / bookingSteps.length }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <form onSubmit={handleBookingSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.key}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <label
                      className="block max-w-4xl text-5xl leading-[1.02] sm:text-7xl"
                      htmlFor={`booking-${currentStep.key}`}
                    >
                      {currentStep.prompt}
                    </label>

                    <BookingInput step={currentStep} value={booking[currentStep.key]} onChange={updateBooking} />
                  </motion.div>
                </AnimatePresence>

                {fieldError ? <p className="mt-4 text-sm text-white/62">{fieldError}</p> : null}

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <button type="submit" className="editorial-button editorial-button-light">
                    {stepIndex === bookingSteps.length - 1
                      ? siteContent.booking.submitLabel
                      : siteContent.booking.continueLabel}
                  </button>
                  {stepIndex > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStepIndex((current) => current - 1)}
                      className="editorial-button editorial-button-dark"
                    >
                      {siteContent.booking.backLabel}
                    </button>
                  ) : null}
                </div>
              </form>

              <div className="mt-16 grid gap-5 border-t border-white/24 pt-6 md:grid-cols-[0.32fr_1fr]">
                <p className="text-[11px] uppercase text-white/40">{siteContent.booking.liveBriefLabel}</p>
                <p className="min-h-20 text-sm leading-7 text-white/58">
                  {draftBriefing || siteContent.booking.emptyBrief}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="studio-ledger" className="bg-[#f4f2ec] px-5 py-24 text-[#070707] sm:px-8 sm:py-36 lg:px-14">
        <Reveal className="mb-14 grid gap-8 border-t border-[#080808] pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeader kicker="Studio Ledger" title="Private requests, held with editorial restraint." />
          <p className="text-sm text-[#080808]/52">
            {leads.length} private request{leads.length === 1 ? "" : "s"}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-t border-[#080808]/24">
            {leads.length === 0 ? (
              <p className="border-b border-[#080808]/18 py-10 text-base leading-8 text-[#080808]/52">
                No private requests yet. Completed briefings will appear here as studio records.
              </p>
            ) : (
              leads.map((lead, index) => (
                <motion.article
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.48, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
                  className="ledger-record grid gap-8 border-b border-[#080808]/18 py-7 lg:grid-cols-[0.34fr_1fr]"
                >
                  <div className="grid gap-5 sm:grid-cols-[0.65fr_1fr] lg:block">
                    <div>
                      <p className="mb-2 text-[10px] uppercase text-[#080808]/38">State</p>
                      <select
                        value={lead.status}
                        onChange={(event) => updateLeadStatus(lead.id, event.target.value as LeadStatus)}
                        className="h-9 w-32 border-0 border-b border-[#080808]/24 bg-transparent px-0 text-sm text-[#070707] outline-none transition focus:border-[#080808]"
                      >
                        {(["New", "Contacted", "Booked", "Delivered"] as LeadStatus[]).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="lg:mt-8">
                      <p className="mb-2 text-[10px] uppercase text-[#080808]/38">Contact</p>
                      <p className="text-sm text-[#070707]">{lead.name}</p>
                      <p className="text-sm text-[#080808]/54">{lead.contact}</p>
                    </div>
                  </div>

                  <div className="grid gap-7 md:grid-cols-[0.42fr_1fr]">
                    <div>
                      <p className="mb-3 text-[10px] uppercase text-[#080808]/38">Request 0{index + 1}</p>
                      <h3 className="text-3xl leading-none text-[#070707]">{lead.sessionType}</h3>
                      <p className="mt-4 text-sm text-[#080808]/54">{lead.date}</p>
                    </div>
                    <p className="max-w-3xl text-base leading-8 text-[#080808]/58">{lead.briefing}</p>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </Reveal>
      </section>

      <section id="contact" className="relative min-h-[100svh] overflow-hidden bg-[#070707] text-white">
        <CinematicImage
          src={siteContent.contact.image}
          alt={siteContent.contact.imageAlt}
          sizes="100vw"
          className=""
        />
        <div className="absolute inset-0 bg-black/58" />
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 py-20 sm:px-8 lg:px-14">
          <Reveal className="max-w-6xl">
            <p className="mb-8 text-[11px] uppercase text-white/50">{siteContent.contact.kicker}</p>
            <h2 className="text-6xl leading-[0.92] sm:text-8xl lg:text-[10vw]">{siteContent.contact.title}</h2>
            <p className="mt-8 max-w-xl text-sm leading-7 text-white/62">{siteContent.contact.intro}</p>
          </Reveal>

          <Reveal delay={0.12} className="grid gap-5 border-t border-white/32 pt-6 text-white md:grid-cols-4">
            {siteContent.contact.lines.map((line) => (
              <ContactLine key={line.label} label={line.label} value={line.value} href={line.href} />
            ))}
          </Reveal>
        </div>
      </section>

      <footer className="grid gap-10 bg-[#070707] px-5 py-10 text-[11px] uppercase text-white/42 sm:px-8 md:grid-cols-[1fr_auto_1fr] lg:px-14">
        <p>{siteContent.footer.left}</p>
        <p className="text-center">{siteContent.footer.center}</p>
        <p className="md:text-right">{siteContent.footer.right}</p>
      </footer>
    </main>
  );
}

function Header({ activeSection }: { activeSection: string }) {
  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-5 py-5 text-[11px] uppercase text-current mix-blend-difference sm:px-8 lg:px-14"
    >
      <nav className="flex items-center justify-between gap-6 text-white">
        <a href="#home" className="editorial-link font-medium">
          {siteContent.brand.name}
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`editorial-link ${
                activeSection === item.href.slice(1) ? "text-white" : "text-white/62 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a href="#briefing" className="editorial-link text-white">
          Collaborate
        </a>
      </nav>
    </motion.header>
  );
}

function EditionRail({ activeSection }: { activeSection: string }) {
  const labels: Record<string, string> = siteContent.sectionLabels;

  return (
    <motion.aside
      className="pointer-events-none fixed bottom-7 left-5 z-40 hidden mix-blend-difference sm:left-8 md:block lg:left-14"
      animate={{ opacity: activeSection === "home" ? 0 : 0.42 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 text-[10px] uppercase text-white/58">
        <motion.span
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {labels[activeSection] ?? "34Studios"}
        </motion.span>
        <span className="h-px w-8 bg-white/34" />
        <span>34S / 001</span>
      </div>
    </motion.aside>
  );
}

function CinematicImage({
  src,
  alt,
  sizes,
  priority = false,
  className = ""
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-6, 6]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.018, 1.006]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="relative h-full w-full" style={{ y, scale }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-cover ${className}`} />
      </motion.div>
    </div>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="mb-5 text-[11px] uppercase opacity-50">{kicker}</p>
      <h2 className="max-w-4xl text-4xl font-normal leading-[1.03] sm:text-6xl lg:text-7xl">{title}</h2>
    </div>
  );
}

function BookingInput({
  step,
  value,
  onChange
}: {
  step: BookingStep;
  value: string;
  onChange: (value: string) => void;
}) {
  const baseClass =
    "mt-10 w-full border-0 border-b border-white/32 bg-transparent px-0 py-5 text-xl text-white outline-none transition focus:border-white sm:text-2xl";

  if (step.kind === "select") {
    return (
      <div
        id={`booking-${step.key}`}
        role="radiogroup"
        aria-label={step.label}
        className="mt-10 border-t border-white/24"
      >
        {step.options?.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            aria-label={`${option}${value === option ? ", selected" : ""}`}
            onClick={() => onChange(option)}
            className={`brief-option ${value === option ? "text-white" : "text-white/42"}`}
          >
            <span>{option}</span>
            <span aria-hidden="true">{value === option ? "Selected" : "Choose"}</span>
          </button>
        ))}
      </div>
    );
  }

  if (step.kind === "textarea") {
    return (
      <textarea
        id={`booking-${step.key}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className={`${baseClass} resize-none leading-8`}
      />
    );
  }

  return (
    <input
      id={`booking-${step.key}`}
      type={step.kind}
      min={step.kind === "number" ? 1 : undefined}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={baseClass}
    />
  );
}

function ContactLine({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="group min-h-20 border-t border-white/28 py-5 transition hover:border-white">
      <p className="mb-3 text-[11px] uppercase text-white/46">{label}</p>
      <p className="text-base text-white transition group-hover:translate-x-1">{value}</p>
    </div>
  );

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.35 });

  return <motion.div className="fixed left-0 top-0 z-[70] h-px w-full origin-left bg-current mix-blend-difference" style={{ scaleX }} />;
}
