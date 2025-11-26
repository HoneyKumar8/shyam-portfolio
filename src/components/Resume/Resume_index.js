// src/components/Resume/index.js
import React, { useEffect, useState, useRef } from "react";

// Shared styled components
import {
  Section,
  Container,
  Layout,
  Sidebar,
  Content,
  Panel,
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseBtn,
  ModalContent,
} from "./styles";

// Child components
import Introduction from "./Introduction";
import Education from "./Education";
import Experience from "./Experience";
import Badges from "./Badges";
import Certifications from "./Certifications";

// Assets
import introVideo from "../../assets/images/Personal/SelfIntro.mp4";
import introPoster from "../../assets/images/backGround/selfIntroPreview.jpg";
import resumeThumb from "../../assets/images/backGround/resumePreview.png";

/* ---------------- intersection reveal ---------------- */
function observeRevealElements(selector = "[data-reveal]", options = { threshold: 0.12 }) {
  const els = Array.from(document.querySelectorAll(selector));
  if (!els.length) return () => {};

  const io = new IntersectionObserver((entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add("revealed");
        io.unobserve(ent.target);
      }
    });
  }, options);

  els.forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    io.observe(el);
  });

  return () => io.disconnect();
}

/* ---------------- Helper: PDF detection ---------------- */
const isPdf = (url) => typeof url === "string" && url.toLowerCase().endsWith(".pdf");

/* ---------------- Helper: Badge filename parser ---------------- */
function parseBadgeFilename(filenameWithPath) {
  let raw = filenameWithPath.split("/").pop();
  let base = raw.replace(/\.[^.]+$/, "");

  let verify = null;
  const match = base.match(
    /\(?\s*-\s*\(?\s*(https?:\/\/[^\)\]]+)\s*\)?$| \(\s*(https?:\/\/[^\)]+)\s*\)$/i
  );

  if (match) {
    verify = match[1] || match[2] || null;
    base = base.replace(match[0], "").trim();
    base = base.replace(/[-–—\s]+$/, "").trim();
  }

  const firstUnderscore = base.indexOf("_");
  let issuer = "";
  let title = base;

  if (firstUnderscore > -1) {
    issuer = base.slice(0, firstUnderscore).replace(/_/g, " ").trim();
    title = base.slice(firstUnderscore + 1).replace(/_/g, " ").trim();
  } else {
    title = base.replace(/_/g, " ").trim();
  }

  return { issuer, title, filename: base, verify };
}

/* ---------------- Main ---------------- */
export default function Resume() {
  /* --------- SECTION NAVIGATION --------- */
  const allowedSections = ["introduction", "education", "experience", "skills", "certifications"];

  const getInitialSection = () => {
    if (typeof window === "undefined") return "introduction";
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return "introduction";

    if (hash.includes("?")) {
      const p = new URLSearchParams(hash.split("?")[1]).get("section");
      return allowedSections.includes(p) ? p : "introduction";
    }

    return allowedSections.includes(hash) ? hash : "introduction";
  };

  const [section, setSection] = useState(getInitialSection);
  const [animState, setAnimState] = useState("enter");
  const prevSection = useRef(section);

  const goto = (s) => {
    history.replaceState(null, "", `#resume?section=${s}`);
    setSection(s);
    const el = document.getElementById("resume-content");
    if (el) el.focus();
  };

  /* --------- VIDEO --------- */
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  /* --------- MODAL --------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);
  const [modalType, setModalType] = useState("image");
  const lastActiveEl = useRef(null);

  const openModalFor = ({ src, type }) => {
    lastActiveEl.current = document.activeElement;
    setModalSrc(src);
    setModalType(type);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const openModal = (src) => openModalFor({ src, type: isPdf(src) ? "pdf" : "image" });

  const closeModal = () => {
    setModalOpen(false);
    setModalSrc(null);
    document.body.style.overflow = "";
    if (lastActiveEl.current?.focus) lastActiveEl.current.focus();
  };

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && modalOpen && closeModal();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  /* --------- HASH CHANGE --------- */
  useEffect(() => {
    const onHash = () => {
      const s = window.location.hash.replace(/^#/, "");
      if (s.includes("?")) {
        const p = new URLSearchParams(s.split("?")[1]).get("section");
        if (allowedSections.includes(p)) setSection(p);
      } else if (allowedSections.includes(s)) {
        setSection(s);
      }
    };

    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* --------- SECTION ANIMATION --------- */
  useEffect(() => {
    if (prevSection.current === section) return;

    setAnimState("exit");
    const timeout = setTimeout(() => {
      setAnimState("enter");
      prevSection.current = section;

      requestAnimationFrame(() => {
        const els = document.querySelectorAll("[data-reveal]");
        els.forEach((el) => el.classList.remove("revealed"));
        setTimeout(() => observeRevealElements(), 40);
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [section]);

  /* --------- EDUCATION DATA --------- */
  const education = [
    { title: "MERN Full Stack Training", institution: "NextWave CCBP", year: "2025", details: "MongoDB, Express.js, React.js, Node.js" },
    { title: "B.Sc Computer Science – MPCs", institution: "ACTS Degree College", year: "2023" },
    { title: "Diploma – HTCs", institution: "Frankfin IAHT", year: "2019" },
    { title: "Intermediate MPC", institution: "Sri Chaitanya Jr. College", year: "2018" },
    { title: "SSC", institution: "Sri Chaitanya Techno School", year: "2016" },
  ];

  const sortedEducation = [...education].sort((a, b) => b.year - a.year);

  /* --------- BADGES (dynamic import fallback) --------- */
  const fallbackBadges = [
    {
      file: "Credly_AWS_Cloud_Ops_Raw.png",
      issuer: "Credly",
      title: "AWS Cloud Ops",
      src: resumeThumb,
      verify: "https://www.credly.com/users/shyam-kumar-surakattula/badges#credly",
    },
    {
      file: "Credly_AWS_Foundations_Raw.png",
      issuer: "Credly",
      title: "AWS Foundations",
      src: resumeThumb,
      verify: "https://www.credly.com/users/shyam-kumar-surakattula/badges#credly",
    },
    {
      file: "Credly_AWS_Machine_Learning_Raw.png",
      issuer: "Credly",
      title: "AWS ML",
      src: resumeThumb,
      verify: "https://www.credly.com/users/shyam-kumar-surakattula/badges#credly",
    },
    {
      file: "Glint_WNS_Awareness_Raw.png",
      issuer: "Glint",
      title: "WNS Awareness",
      src: resumeThumb,
      verify:
        "https://glint.edcast.com/verify_badge/70dpH35SSP?user_id=5400471",
    },
    {
      file: "Kaggle_Python_Raw.png",
      issuer: "Kaggle",
      title: "Python",
      src: resumeThumb,
      verify:
        "https://www.kaggle.com/certification/badges/shyamkumar8/30",
    },
  ];

  /* --------- Dynamic import badges --------- */
  let badgeEntries = [];
  try {
    const ctx = require.context("../../assets/images/Badges", true, /\.(png|jpe?g|webp|gif|svg|pdf)$/i);
    badgeEntries = ctx
      .keys()
      .map((key) => ({ key: key.replace("./", ""), src: ctx(key).default || ctx(key) }))
      .sort((a, b) => a.key.localeCompare(b.key));
  } catch (err) {}

  const builtBadges =
    badgeEntries.length > 0
      ? badgeEntries.map((b) => {
          const parsed = parseBadgeFilename(b.key);
          return {
            file: parsed.filename,
            issuer: parsed.issuer,
            title: parsed.title,
            verify: parsed.verify,
            src: b.src,
          };
        })
      : fallbackBadges;

  /* --------- CERTIFICATIONS (dynamic import fallback) --------- */
  const certificationsFallback = [
    { name: "AWS Educate — ML Foundations", src: resumeThumb },
    { name: "Oracle APEX", src: resumeThumb },
  ];

  let certSrcs = [];
  try {
    const ctx = require.context("../../assets/images/certifications", true, /\.(png|jpe?g|gif|webp|pdf)$/i);
    certSrcs = ctx
      .keys()
      .map((key) => ctx(key).default || ctx(key))
      .sort();
  } catch (err) {}

  /* --------- RENDER --------- */
  return (
    <Section id="resume">
      <Container>
        <h2 style={{ marginBottom: 24 }}>Journey Through Learning & Impact</h2>

        <Layout>
          {/* --------- SIDEBAR --------- */}
          <Sidebar>
            {allowedSections.map((s) => (
              <div
                key={s}
                role="button"
                tabIndex={0}
                className={`tab ${section === s ? "active" : ""}`}
                onClick={() => goto(s)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? goto(s) : null)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </div>
            ))}
          </Sidebar>

          {/* --------- CONTENT --------- */}
          <Content id="resume-content" tabIndex={-1}>
            <Panel className={animState} key={section}>
              {section === "introduction" && (
                <Introduction
                  videoRef={videoRef}
                  isPlaying={isPlaying}
                  posterSrc={introPoster}
                  videoSrc={introVideo}
                  resumePreview={resumeThumb}
                />
              )}

              {section === "education" && (
                <Education sortedEducation={sortedEducation} />
              )}

              {section === "experience" && <Experience />}

              {section === "skills" && (
                <Badges
                  builtBadges={builtBadges}
                  openModalFor={openModalFor}
                  isPdf={isPdf}
                />
              )}

              {section === "certifications" && (
                <Certifications
                  certSrcs={certSrcs}
                  isPdf={isPdf}
                  openModal={openModal}
                  certificationsFallback={certificationsFallback}
                />
              )}
            </Panel>
          </Content>
        </Layout>
      </Container>

      {/* --------- MODAL --------- */}
      {modalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseBtn onClick={closeModal}>Close</CloseBtn>
            </ModalHeader>

            <ModalContent>
              {modalType === "iframe" ? (
                <iframe
                  src={modalSrc}
                  title="Badge verification"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              ) : modalType === "pdf" ? (
                <object data={modalSrc} type="application/pdf" />
              ) : (
                <img src={modalSrc} alt="Preview" />
              )}
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Section>
  );
}
