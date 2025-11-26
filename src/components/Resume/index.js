// src/components/Resume/index.js
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import awsCloudOpsImg from "../../assets/images/Badges/Credly_AWS Cloud Ops.png";
import awsFoundationsImg from "../../assets/images/Badges/Credly_AWS Foundations.png";
import awsMLImg from "../../assets/images/Badges/Credly_AWS Machine Learning.png";
import glintImg from "../../assets/images/Badges/Glint_WNS Awareness.png";
import kaggleImg from "../../assets/images/Badges/Kaggle_Python.png";


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

// Assets (keep your existing imports; fallback to uploaded screenshot below)
import introVideo from "../../assets/images/Personal/SelfIntro.mp4";
import introPoster from "../../assets/images/backGround/selfIntroPreview.jpg";
import resumeThumbFromAssets from "../../assets/images/backGround/resumePreview.png";

// Local uploaded file you provided (will be transformed to URL by your environment)
const UPLOADED_IMAGE = "/mnt/data/cbfbde61-0cc5-4a73-85a3-0961ba3d409d.png";

/* ---------------- Helpers / utils ---------------- */
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

const isPdf = (url) => typeof url === "string" && url.toLowerCase().endsWith(".pdf");

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

/* ---------------- Local styled HorizontalNav (used on smaller screens) ---------------- */
const HorizontalNav = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 12px 0 18px 0;
  padding: 8px 0;
`;

const HorizontalNavItem = styled.button`
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 18px;
  background: transparent;
  color: var(--muted);
  border: none;
  transition: background 160ms, color 160ms, transform 120ms;
  user-select: none;

  &:hover { transform: translateY(-2px); }

  ${(props) =>
    props.active &&
    `
    color: ${props.theme?.name === "light" ? "#0b1220" : "#fff"};
    background: ${props.theme?.name === "light" ? `${props.theme?.accent || "#ff2d6f"}17` : 'rgba(255,255,255,0.02)'};
    transform: translateY(-1px);
    box-shadow: ${props.theme?.name === "light" ? '0 8px 18px rgba(43,123,233,0.06)' : '0 10px 28px rgba(0,0,0,0.45)'};
  `}
`;

/* ---------------- Main Component ---------------- */
export default function Resume() {
  const allowedSections = ["introduction", "education", "experience", "badges", "certifications"];

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
    if (typeof history !== "undefined") history.replaceState(null, "", `#resume?section=${s}`);
    setSection(s);
    const el = document.getElementById("resume-content");
    if (el) el.focus();
  };

  /* --------- detect very wide screens (>=1600) and update on resize --------- */
  const [isWide, setIsWide] = useState(() => (typeof window !== "undefined" ? window.innerWidth >= 1600 : false));
  useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth >= 1600);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  /* --------- SECTION TRANSITION --------- */
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

  /* --------- data / dynamic imports --------- */
  const education = [
    { title: "MERN Full Stack Training", institution: "NextWave CCBP", year: "2025", details: "MongoDB, Express.js, React.js, Node.js" },
    { title: "B.Sc Computer Science – MPCs", institution: "ACTS Degree College", year: "2023" },
    { title: "Diploma – HTCs", institution: "Frankfin IAHT", year: "2019" },
    { title: "Intermediate MPC", institution: "Sri Chaitanya Jr. College", year: "2018" },
    { title: "SSC", institution: "Sri Chaitanya Techno School", year: "2016" },
  ];
  const sortedEducation = [...education].sort((a, b) => b.year - a.year);

/* ---------------- explicit badge metadata (recommended) ---------------- */
const explicitBadges = [
  { file: "Credly_AWS_Cloud_Ops.png", issuer: "Credly", title: "AWS Cloud Ops", src: awsCloudOpsImg, verify: "https://www.credly.com/users/shyam-kumar-surakattula/badges#credly" },
  { file: "Credly_AWS_Foundations.png", issuer: "Credly", title: "AWS Foundations", src: awsFoundationsImg, verify: "https://www.credly.com/users/shyam-kumar-surakattula/badges#credly" },
  { file: "Credly_AWS_ML.png", issuer: "Credly", title: "AWS Machine Learning", src: awsMLImg, verify: "https://www.credly.com/users/shyam-kumar-surakattula/badges#credly" },
  { file: "Glint_WNS_Awareness.png", issuer: "Glint", title: "WNS Awareness", src: glintImg, verify: "https://glint.edcast.com/verify_badge/70dpH35SSP?user_id=5400471" },
  { file: "Kaggle_Python.png", issuer: "Kaggle", title: "Python", src: kaggleImg, verify: "https://www.kaggle.com/certification/badges/shyamkumar8/30" },
];

const builtBadges = explicitBadges;



  const certificationsFallback = [
    { name: "AWS Educate — ML Foundations", src: resumeThumbFromAssets },
    { name: "Oracle APEX", src: resumeThumbFromAssets },
  ];

  let certSrcs = [];
  try {
    const ctx = require.context("../../assets/images/certifications", true, /\.(png|jpe?g|gif|webp|pdf)$/i);
    certSrcs = ctx
      .keys()
      .map((key) => ctx(key).default || ctx(key))
      .sort();
  } catch (err) {}

  /* --------- Header helper (keeps layout tidy) --------- */
  const ResumeHeader = ({ title, subtitle, downloadHref }) => (
    <div style={{ margin: "0 0 18px 0", padding: 0 }}>
      <p className="section-sub muted" style={{ marginBottom: 6 }}>
        {subtitle}
      </p>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        marginBottom: "10px",
        flexWrap: "wrap"
      }}>
        <h2 className="section-head sec-head" style={{ margin: 0 }}>
          {title}
        </h2>

        <a
          className="download"
          href={downloadHref}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "var(--accent)",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "10px",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 10px 28px rgba(0,0,0,0.22)"
          }}
        >
          Download Resume
        </a>
      </div>
    </div>
  );

  /* --------- RENDER --------- */
  const resumePreviewFallback = resumeThumbFromAssets || UPLOADED_IMAGE || null;
  const posterSrc = introPoster || resumePreviewFallback;
  const videoSrc = introVideo;

  return (
    // add top padding so fixed site header doesn't overlap
    <Section id="resume" style={{ paddingTop: 10 }}>
      <Container>
        {/* Header (inside Container so container padding applies) */}
        <ResumeHeader
          title="Journey Through Learning & Impact"
          subtitle="My Development Story"
          downloadHref="/resume.pdf"
        />

        {/* NOTE: reversed behaviour per your request:
             - isWide (>=1600px) => show vertical Sidebar (normal)
             - smaller widths => use HorizontalNav above content */}
        {isWide ? (
          /* Wide screens: show Sidebar (vertical) layout */
          <Layout>
            <Sidebar aria-label="Resume sections">
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

            <Content id="resume-content" tabIndex={-1}>
              <Panel className={animState} key={section}>
                {section === "introduction" && (
                  <Introduction
                    videoRef={videoRef}
                    isPlaying={isPlaying}
                    posterSrc={posterSrc}
                    videoSrc={videoSrc}
                    resumePreview={resumePreviewFallback}
                  />
                )}

                {section === "education" && (
                  <Education sortedEducation={sortedEducation} />
                )}

                {section === "experience" && <Experience />}

                {section === "badges" && (
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
        ) : (
          /* Compact mode: horizontal nav + single-column content (no hidden sidebar) */
          <>
            <HorizontalNav aria-label="Resume sections (compact)" role="tablist">
              {allowedSections.map((s) => (
                <HorizontalNavItem
                  key={s}
                  role="tab"
                  aria-selected={section === s}
                  active={section === s}
                  onClick={() => goto(s)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goto(s); } }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </HorizontalNavItem>
              ))}
            </HorizontalNav>

            {/* Use Layout but override to single-column so Content takes full width */}
            <Layout style={{ gridTemplateColumns: "1fr" }}>
              <Content id="resume-content" tabIndex={-1} style={{ width: "100%" }}>
                <Panel className={animState} key={section}>
                  {section === "introduction" && (
                    <Introduction
                      videoRef={videoRef}
                      isPlaying={isPlaying}
                      posterSrc={posterSrc}
                      videoSrc={videoSrc}
                      resumePreview={resumePreviewFallback}
                    />
                  )}

                  {section === "education" && (
                    <Education sortedEducation={sortedEducation} />
                  )}

                  {section === "experience" && <Experience />}

                  {section === "badges" && (
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
          </>
        )}
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
