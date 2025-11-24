// src/components/Resume.js
import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// optional local media imports (keep if your bundler supports them)
import introVideo from '../assets/images/Personal/SelfIntro.mp4';
import introPoster from '../assets/images/backGround/selfIntroPreview.jpg';
import resumeThumb from '../assets/images/backGround/resumePreview.png';

/* ---------------- animations ---------------- */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.06); transform: scale(1); }
  70% { box-shadow: 0 0 0 10px rgba(255,255,255,0); transform: scale(1.04); }
  100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); transform: scale(1); }
`;

/* ---------------- layout & components ---------------- */
const Section = styled.section`
  padding: 72px 0;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

/* Sidebar */
const Sidebar = styled.aside`
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .tab {
    cursor: pointer;
    padding: 12px 14px;
    border-radius: 10px;
    color: var(--muted);
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 700;
    font-size: clamp(18px, 1.4vw, 26px);
    user-select: none;
    transition: background 180ms, color 180ms, transform 180ms;
    background: ${({ theme }) => (theme?.name === 'light' ? 'rgba(16,24,40,0.02)' : 'transparent')};
  }

  .tab.active {
    color: ${({ theme }) => (theme?.name === 'light' ? '#0b1220' : '#fff')};
    background: ${({ theme }) => (theme?.name === 'light' ? `${theme.accent}17` : 'rgba(255,255,255,0.02)')};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => (theme?.name === 'light' ? '0 8px 18px rgba(43,123,233,0.06)' : '0 10px 28px rgba(0,0,0,0.45)')};
  }

  .tab::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 10px;
    bottom: 10px;
    width: 6px;
    border-radius: 6px;
    background: transparent;
    transition: all 200ms;
  }

  .tab.active::before {
    background: ${({ theme }) => theme?.accent || '#ff2d6f'};
    box-shadow: 0 6px 18px ${({ theme }) => `${theme?.accent || '#ff2d6f'}33`};
  }

  @media (max-width: 920px) {
    position: relative;
    top: 0;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 12px;
    gap: 10px;

    .tab {
      white-space: nowrap;
      padding: 8px 12px;
      font-size: clamp(18px, 1.4vw, 20px);
    }
  }
`;

/* Content / Panel / Card etc. */
const Content = styled.div`
  position: relative;
  min-height: 220px;
`;
const Panel = styled.div`
  will-change: opacity, transform;
  transition: opacity 360ms ease, transform 360ms cubic-bezier(.2,.9,.3,1);
  opacity: 0;
  transform: translateY(10px);
  &.enter {
    opacity: 1;
    transform: translateY(0);
  }
  &.exit {
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
  }
`;
const Card = styled.div`
  background: ${({ theme }) => theme?.surface || 'rgba(0,0,0,0.55)'};
  padding: 22px;
  border-radius: 12px;
  margin-bottom: 20px;
  color: var(--text);
  box-shadow: ${({ theme }) => theme?.cardShadow};
  font-size: clamp(18px, 1.4vw, 26px);
`;
const TopRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:24px;
  .sec-head { font-size: clamp(28px,1.6vw,40px); }
  .download {
    background: ${({ theme }) => theme?.accent};
    color:#fff;
    padding:10px 18px;
    border-radius:10px;
    font-weight:700;
    text-decoration:none;
    box-shadow: 0 10px 28px ${({ theme }) => `${theme?.ringColor || '#000'}22`};
  }
`;
const SubCard = styled.div`
  background: ${({ theme }) => (theme?.name === 'light' ? 'rgba(16,24,40,0.02)' : 'transparent')};
  padding: 18px;
  font-size: clamp(18px, 1.4vw, 26px);
  border-radius: 10px;
  margin-bottom: 14px;
  border: 1px solid ${({ theme }) => theme?.glass || 'rgba(255,255,255,0.03)'};
`;

/* ---------------- Intro (video + preview) ---------------- */
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 480;
const RESUME_WIDTH = 420;
const BREAKPOINT = VIDEO_WIDTH + RESUME_WIDTH + 120;

const IntroWrap = styled.div`
  display: grid;
  grid-template-columns: ${VIDEO_WIDTH}px ${RESUME_WIDTH}px;
  gap: 20px;
  align-items: start;
  justify-content: center;

  @media (max-width: ${BREAKPOINT}px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const GlassCard = styled.div`
  position: relative;
  border-radius: 14px;
  padding: 14px;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow:
    0 8px 24px rgba(0,0,0,0.6),
    0 0 36px rgba(255,45,111,0.06);

  &:before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 16px;
    pointer-events: none;
    z-index: 2;
    background: linear-gradient(90deg, rgba(255,45,111,0.16), rgba(66,153,225,0.12));
    filter: blur(18px);
    opacity: 0.9;
    mix-blend-mode: screen;
  }
`;

const VideoCard = styled(GlassCard)`
  display: block;
  min-height: 260px;

  video {
    width: 100%;
    height: 100%;
    min-height: ${VIDEO_HEIGHT}px;
    border-radius: 8px;
    display:block;
    object-fit: cover;
  }

  .play-overlay {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: 28px;
    border: 1px solid rgba(255,255,255,0.06);
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0,0,0,0.45);
  }
`;

const PreviewCard = styled(GlassCard)`
  display:flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;

  .thumb {
    width: 100%;
    height: 320px;
    object-fit: contain;
    border-radius: 8px;
    background: ${({ theme }) => (theme?.name === 'light' ? 'rgba(16,24,40,0.02)' : '#0b0b0b')};
    border: 1px solid rgba(255,255,255,0.02);
  }

  .actions {
    display:flex;
    gap:10px;
    margin-top:auto;
  }

  .btn { padding:10px 14px; border-radius:8px; text-decoration:none; font-weight:700; }
  .open { background: ${({theme}) => theme?.accent || '#ff2d6f'}; color:#fff; box-shadow: 0 8px 22px rgba(0,0,0,0.45); }
  .download { background:transparent; border:1px solid ${({theme}) => theme?.glass || 'rgba(255,255,255,0.06)'}; color:var(--text); }
`;

/* ---------------- Timeline (animated) ---------------- */
const TimelineWrap = styled.div`
  position: relative;
  padding-left: 28px;
  margin-top: 4px;

  &:before {
    content: '';
    position:absolute;
    left:12px;
    top:0;
    bottom:0;
    width:2px;
    background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
    border-radius:2px;
    transform-origin: top;
    animation: ${css`${fadeInUp} 520ms ease both`};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 26px;
  padding: 8px 16px;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 420ms ease, transform 420ms ease;
  &.revealed { opacity: 1; transform: translateY(0); }

  .dot {
    position:absolute;
    left:-3px;
    top:10px;
    width:12px;
    height:12px;
    border-radius:50%;
    background: ${({ theme }) => theme?.accent || '#ff2d6f'};
    box-shadow: 0 6px 16px ${({ theme }) => `${theme?.accent || '#ff2d6f'}33`};
    border: 2px solid ${({ theme }) => (theme?.name === 'light' ? '#fff' : 'rgba(0,0,0,0.2)')};
    animation: ${css`${pulse} 2000ms infinite ease`};
  }

  h4 { margin:0 0 4px 0; font-size: clamp(18px, 1.4vw, 28px); }
  .meta { color: var(--muted); font-size: clamp(16px, 1.2vw, 20px); }
`;

/* ---------------- Badges (dynamic + responsive) ---------------- */
const BadgesGrid = styled.div`
  display: grid;
  gap: 18px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(220px, 220px));

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BadgeItem = styled.button`
  display: flex;
  gap: 12px;
  align-items: center;
  background: ${({theme}) => theme?.name === 'light' ? 'rgba(16,24,40,0.02)' : 'transparent'};
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme?.glass || 'rgba(255,255,255,0.03)'};
  transition: box-shadow 180ms ease, transform 160ms ease;
  cursor: pointer;
  color: inherit;
  text-align: left;
  overflow: hidden;

  flex-direction: column;
  justify-content: flex-start;
  text-align: center;

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    border-radius: 8px;
    display: block;
    margin-bottom: 10px;
  }

  .meta-wrap {
    margin-top: 6px;
  }

  .title { font-weight: 700; font-size: 16px; }
  .sub { color: var(--muted); font-size: 14px; margin-top: 6px; }

  &:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(0,0,0,0.6); }
  &:focus { outline: 3px solid rgba(255,255,255,0.06); outline-offset: 6px; }

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: center;
    text-align: left;
    padding: 12px 16px;

    img {
      width: 96px;
      height: 96px;
      margin-bottom: 0;
      flex-shrink: 0;
    }

    .meta-wrap {
      margin-top: 0;
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

/* Certifications styles */
const CertGrid = styled.div`
  display:grid;
  gap:16px;
  grid-template-columns: repeat(auto-fit,minmax(160px,1fr));
`;
const CertItem = styled.button`
  display:block;
  border-radius:10px;
  overflow:hidden;
  background: ${({ theme }) => theme?.surface || 'rgba(0,0,0,0.45)'};
  padding:10px;
  border:1px solid ${({ theme }) => theme?.glass || 'rgba(255,255,255,0.03)'};
  text-decoration:none;
  color:inherit;
  cursor:pointer;
  img { width:100%; height:140px; object-fit:contain; display:block; border-radius:6px; }
`;

/* Modal overlay & content (single set used by both badges & certs) */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display:flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 28px;
`;

const ModalContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  max-height: 90vh;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme?.surface || '#0b0b0b'};
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  position: relative;
`;

const ModalHeader = styled.div`
  display:flex;
  justify-content: flex-end;
  padding: 10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
`;

const CloseBtn = styled.button`
  background: ${({ theme }) => theme?.accent || '#ff2d6f'};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight:700;
  cursor:pointer;
  box-shadow: 0 8px 28px rgba(0,0,0,0.5);
`;

const ModalContent = styled.div`
  padding: 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: ${({ theme }) => theme?.surface || '#0b0b0b'};
  min-height: 60vh;

  img {
    max-width: 100%;
    max-height: calc(90vh - 120px);
    object-fit: contain;
    border-radius: 6px;
  }
  iframe, object {
    width: 100%;
    height: calc(90vh - 120px);
    border: none;
  }

  .pdf-placeholder {
    width: 100%;
    height: calc(90vh - 120px);
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:700;
    color: #ddd;
    background:#111;
  }
`;

/* ---------------- IntersectionObserver helper (NOT a hook) ---------------- */
function observeRevealElements(selector = '[data-reveal]', options = { threshold: 0.12 }) {
  const els = Array.from(document.querySelectorAll(selector));
  if (!els.length) return () => {};
  const io = new IntersectionObserver((entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add('revealed');
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

/* ---------------- Main component ---------------- */
export default function Resume() {
  // video UI state (inside component)
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // modal state for images/pdf/external-URL (used by both certs & badges)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);
  const [modalType, setModalType] = useState('image'); // 'image' | 'pdf' | 'iframe'
  const lastActiveEl = useRef(null);

  // section state
  const [section, setSection] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
    const allowed = ['introduction', 'education', 'experience', 'skills', 'certifications'];
    if (!hash) return 'introduction';
    if (hash.includes('?')) {
      const p = new URLSearchParams(hash.split('?')[1]).get('section');
      if (p && allowed.includes(p)) return p;
    }
    return allowed.includes(hash) ? hash : 'introduction';
  });

  const [animState, setAnimState] = useState('enter');
  const prevSection = useRef(section);

  useEffect(() => {
    const cleanup = observeRevealElements();
    return () => cleanup && cleanup();
  }, []);

  useEffect(() => {
    const onHash = () => {
      const s = window.location.hash.replace(/^#/, '');
      if (s.includes('?')) {
        const p = new URLSearchParams(s.split('?')[1]).get('section');
        if (p) setSection(p);
      } else if (s) {
        setSection(s);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (prevSection.current === section) return;
    setAnimState('exit');
    const t = setTimeout(() => {
      setAnimState('enter');
      prevSection.current = section;
      requestAnimationFrame(() => {
        const els = document.querySelectorAll('[data-reveal]');
        els.forEach((el) => el.classList.remove('revealed'));
        setTimeout(() => observeRevealElements(), 40);
      });
    }, 200);
    return () => clearTimeout(t);
  }, [section]);

  useEffect(() => {
    // keep isPlaying state synced with actual video element events
    const v = videoRef.current;
    if (!v) return undefined;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, [videoRef.current]);

  const goto = (s) => {
    if (typeof history !== 'undefined') history.replaceState(null, '', `#resume?section=${s}`);
    setSection(s);
    const el = document.getElementById('resume-content');
    if (el) el.focus();
  };

  const handleKeyGoto = (s) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goto(s);
    }
  };

  /* ---------- Data ---------- */
  const education = [
    { title: 'MERN Full Stack Training', institution: 'NextWave CCBP Intensive 4.0', year: '2025', details: 'MongoDB, Express.js, React.js, Node.js' },
    { title: 'Bachelor of Computer Science (B.Sc) – MPCs', institution: 'ACTS Degree College, Visakhapatnam', year: '2023', details: '' },
    { title: 'Diploma – HTCs', institution: 'Frankfin-IAHT, Visakhapatnam', year: '2019', details: '' },
    { title: 'Intermediate (10+2) – MPC', institution: 'Sri Chaitanya Jr. College, Visakhapatnam', year: '2018', details: '' },
    { title: 'SSC (10th)', institution: 'Sri Chaitanya Techno School, Visakhapatnam', year: '2016', details: '' },
  ];
  const sortedEducation = [...education].sort((a, b) => (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0));

  // fallback badges array (kept for environments where require.context isn't available)
  const fallbackBadges = [
    {
      file: 'Credly_AWS_Cloud_Ops_Raw.png',
      issuer: 'Credly',
      title: 'AWS Cloud Ops',
      src: resumeThumb,
      verify: 'https://www.credly.com/users/shyam-kumar-surakattula/badges#credly',
    },
    {
      file: 'Credly_AWS_Foundations_Raw.png',
      issuer: 'Credly',
      title: 'AWS Foundations',
      src: resumeThumb,
      verify: 'https://www.credly.com/users/shyam-kumar-surakattula/badges#credly',
    },
    {
      file: 'Credly_AWS_Machine_Learning_Raw.png',
      issuer: 'Credly',
      title: 'AWS ML',
      src: resumeThumb,
      verify: 'https://www.credly.com/users/shyam-kumar-surakattula/badges#credly',
    },
    { file: 'Glint_WNS_Awareness_Raw.png', issuer: 'Glint', title: 'WNS Awareness', src: resumeThumb, verify: 'https://glint.edcast.com/verify_badge/70dpH35SSP?user_id=5400471&timestamp=1756818435324&edCast?latest' },
    { file: 'Kaggle_Python_Raw.png', issuer: 'Kaggle', title: 'Python', src: resumeThumb, verify: 'https://www.kaggle.com/certification/badges/shyamkumar8/30' },
  ];

  const certificationsFallback = [
    { name: 'AWS Educate — ML Foundations', sub: '', src: resumeThumb },
    { name: 'Oracle APEX', sub: '', src: resumeThumb },
  ];

  // map of verify links for badge filenames (used when dynamic imports are present)
  const verifyLinksMap = {
    'Credly_AWS_Cloud_Ops_Raw.png': 'https://www.credly.com/users/shyam-kumar-surakattula/badges#credly',
    'Credly_AWS_Foundations_Raw.png': 'https://www.credly.com/users/shyam-kumar-surakattula/badges#credly',
    'Credly_AWS_Machine_Learning_Raw.png': 'https://www.credly.com/users/shyam-kumar-surakattula/badges#credly',
    'Glint_WNS_Awareness_Raw.png': 'https://glint.edcast.com/verify_badge/70dpH35SSP?user_id=5400471&timestamp=1756818435324&edCast?latest',
    'Kaggle_Python_Raw.png': 'https://www.kaggle.com/certification/badges/shyamkumar8/30'
  };

  // optional company links for Experience section
  const companyLinks = {
    'WNS Global Services': 'https://www.wns.com/',
    'Renu Communications / Vision India': 'https://visionindia.co.in/'
  };

  /* ---------------- Dynamic import for certifications folder ---------------- */
  const importAll = (r) => r.keys().map((key) => ({ key, mod: r(key) }));
  let certSrcs = [];
  try {
    const context = require.context('../assets/images/certifications', true, /\.(png|jpe?g|webp|gif|pdf)$/i);
    const modules = importAll(context);
    certSrcs = modules
      .map(({ key, mod }) => {
        const resolved = mod && mod.default ? mod.default : mod;
        return { key, src: resolved };
      })
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((m) => m.src);
  } catch (err) {
    certSrcs = [];
  }

  /* ---------------- Dynamic import for badges folder (same pattern) ---------------- */
  const importBadges = (r) => r.keys().map((key) => ({ key, mod: r(key) }));
  let badgeEntries = [];
  try {
    const contextBadges = require.context('../assets/images/Badges', true, /\.(png|jpe?g|webp|gif|svg|pdf)$/i);
    const modules = importBadges(contextBadges);
    badgeEntries = modules
      .map(({ key, mod }) => {
        const resolved = mod && mod.default ? mod.default : mod;
        // derive filename part (without leading ./)
        const filename = key.replace(/^\.\//, '');
        return { key: filename, src: resolved };
      })
      .sort((a, b) => a.key.localeCompare(b.key));
  } catch (err) {
    badgeEntries = [];
  }

  const resumePreviewFallback = resumeThumb;
  const posterSrc = introPoster || resumePreviewFallback;
  const videoSrc = introVideo;

  /* ---------------- helpers ---------------- */
  const isPdf = (u) => typeof u === 'string' && /\.pdf$/i.test(u);

  /**
   * parseBadgeFilename
   *
   * Accepts filenameWithPath (e.g. "Linkedin Learning_AI Agents (https://... ).png")
   * Expected patterns (examples user will use):
   *
   *   Heading_Para (URL).ext
   *   Issuer_Title (https://example.com).png
   *   NxtWave_100Days_Code_Challenge - (https://s3...png)
   *
   * Behavior:
   *  - extract URL inside parentheses at end (if present) -> verify
   *  - remove trailing parenthetical URL from base name
   *  - split remaining base on first underscore:
   *      issuerRaw = before first underscore (underscores become spaces)
   *      titlePart  = rest after first underscore (underscores become spaces)
   *  - trim and return { issuer, title, filename, verify }
   */
  function parseBadgeFilename(filenameWithPath) {
    // extract just the filename (no directories), and remove extension
    let raw = String(filenameWithPath).split('/').pop();
    const dotIndex = raw.lastIndexOf('.');
    let base = dotIndex > -1 ? raw.slice(0, dotIndex) : raw;

    let verify = null;

    // Look for a parenthetical URL at the end: e.g. "Some_Name (https://...)" or "Name -(https://...)"
    // Accept some spacing and optional hyphen before the parentheses.
    const parenUrlMatch = base.match(/\(?\s*-\s*\(?\s*(https?:\/\/[^\)\]]+)\s*\)?\s*\)?$| \(\s*(https?:\/\/[^\)]+)\s*\)\s*$/i);
    if (parenUrlMatch) {
      // pick whichever capture matched
      verify = parenUrlMatch[1] || parenUrlMatch[2] || null;
      // remove the matched parenthetical (and any trailing hyphen/space) from base
      base = base.replace(parenUrlMatch[0], '').trim();
      // also remove trailing hyphens or separators left over
      base = base.replace(/[-–—\s]+$/g, '').trim();
    }

    // Now base should be something like "Issuer_Title_Part..."
    // Split on first underscore
    const firstUnderscore = base.indexOf('_');
    let issuer = '';
    let title = base;

    if (firstUnderscore > -1) {
      issuer = base.slice(0, firstUnderscore).replace(/_/g, ' ').trim();
      title = base.slice(firstUnderscore + 1).replace(/_/g, ' ').trim();
    } else {
      // no underscore: treat whole as title
      issuer = '';
      title = base.replace(/_/g, ' ').trim();
    }

    // If verify was not present and this is the first badge, for dev/demo we'll
    // optionally attach UPLOADED_FILE_URL elsewhere; normally user will include (URL) in filename.
    return {
      issuer,
      title,
      filename: base,
      verify,
    };
  }

  /* ---------------- modal handlers ---------------- */
  /**
   * Open the modal for:
   *  - external verify URL (iframe)
   *  - pdf (object) preview
   *  - image preview
   *
   * If `type === 'iframe'` we will show an iframe with the provided URL.
   */
  const openModalFor = ({ src, type = 'image' }) => {
    lastActiveEl.current = document.activeElement;
    setModalSrc(src);
    setModalType(type); // 'iframe' | 'pdf' | 'image'
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const openModal = (src) => openModalFor({ src, type: isPdf(src) ? 'pdf' : 'image' });

  const closeModal = () => {
    setModalOpen(false);
    setModalSrc(null);
    setModalType('image');
    document.body.style.overflow = '';
    if (lastActiveEl.current && typeof lastActiveEl.current.focus === 'function') {
      lastActiveEl.current.focus();
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && modalOpen) closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  /* ---------------- rendering helpers ---------------- */
  // Build a badge data array from dynamic import results (or fallback)
  // Parse each filename for issuer/title/verify
  const builtBadges = badgeEntries.length > 0
    ? badgeEntries.map((b, idx) => {
        const parsed = parseBadgeFilename(b.key);
        // prefer explicitly mapped verify URLs, else parsed.verify
        const verify = verifyLinksMap[b.key] || parsed.verify || null;
        return {
          file: parsed.filename,
          issuer: parsed.issuer,
          title: parsed.title,
          src: b.src,
          verify,
        };
      })
    : fallbackBadges;

  return (
    <Section id="resume">
      <Container>
        <p className="section-sub muted">My Development Story</p>

        <TopRow>
          <h2 className="section-head sec-head">Journey Through Learning & Impact</h2>
          <a className="download" href="/resume.pdf" target="_blank" rel="noreferrer">
            Download Resume
          </a>
        </TopRow>

        <Layout>
          <Sidebar aria-label="Resume sections">
            <div role="button" tabIndex={0} onClick={() => goto('introduction')} className={`tab ${section === 'introduction' ? 'active' : ''}`}>
              Introduction
            </div>
            <div role="button" tabIndex={0} onClick={() => goto('education')} className={`tab ${section === 'education' ? 'active' : ''}`}>
              Education
            </div>
            <div role="button" tabIndex={0} onClick={() => goto('experience')} className={`tab ${section === 'experience' ? 'active' : ''}`}>
              Experience
            </div>
            <div role="button" tabIndex={0} onClick={() => goto('skills')} className={`tab ${section === 'skills' ? 'active' : ''}`}>
              Badges
            </div>
            <div role="button" tabIndex={0} onClick={() => goto('certifications')} className={`tab ${section === 'certifications' ? 'active' : ''}`}>
              Certifications
            </div>
          </Sidebar>

          <Content id="resume-content" tabIndex={-1}>
            <Panel key={section} className={animState === 'enter' ? 'enter' : 'exit'}>
              {/* ---------- Introduction ---------- */}
              {section === 'introduction' && (
                <>
                  <SubCard data-reveal>
                    <h4>Introduction</h4>
                    <div style={{ color: 'var(--muted)', fontSize: 18 }}>
                      Click the large play button to watch my self-introduction. Resume preview is beside the video on wider screens.
                    </div>
                  </SubCard>

                  <IntroWrap>
                    <VideoCard data-reveal aria-label="Introduction video">
                      <video
                        ref={videoRef}
                        muted
                        playsInline
                        controls
                        loop
                        controlsList="nodownload nofullscreen noremoteplayback"
                        onContextMenu={(e) => e.preventDefault()}
                        poster={posterSrc}
                        src={videoSrc}
                        preload="metadata"
                      />
                      {!isPlaying && (
                        <button
                          type="button"
                          className="play-overlay"
                          aria-label="Play introduction video"
                          onClick={async () => {
                            try {
                              await videoRef.current.play();
                              setIsPlaying(true);
                            } catch (err) {
                              videoRef.current.controls = true;
                              setIsPlaying(true);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              videoRef.current
                                .play()
                                .then(() => setIsPlaying(true))
                                .catch(() => {
                                  videoRef.current.controls = true;
                                  setIsPlaying(true);
                                });
                            }
                          }}
                        >
                          ►
                        </button>
                      )}
                    </VideoCard>

                    <PreviewCard data-reveal aria-label="Resume preview">
                      <div style={{ fontWeight: 700 }}>Resume Preview</div>

                      <img
                        className="thumb"
                        src={resumePreviewFallback}
                        alt="Resume preview"
                        style={{
                          width: `${RESUME_WIDTH}px`,
                          maxWidth: '100%',
                          height: 320,
                          objectFit: 'contain',
                          borderRadius: 8,
                        }}
                      />

                      <div className="actions">
                        <a className="btn open" href="/resume.pdf" target="_blank" rel="noreferrer">
                          Open Full Resume
                        </a>
                        <a className="btn download" href="/resume.pdf" download>
                          Download PDF
                        </a>
                      </div>
                    </PreviewCard>
                  </IntroWrap>
                </>
              )}

              {/* ---------- Education ---------- */}
              {section === 'education' && (
                <>
                  <SubCard data-reveal>
                    <h4>Academics & Training</h4>
                    <div style={{ color: 'var(--muted)', fontSize: 18 }}>Formal education and vocational training (most recent first)</div>
                  </SubCard>

                  <TimelineWrap>
                    {sortedEducation.map((e, i) => (
                      <TimelineItem key={e.title + e.year} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                        <span className="dot" />
                        <h4>{e.title}</h4>
                        <div className="meta">{e.institution} — {e.year}</div>
                        {e.details && <p>{e.details}</p>}
                      </TimelineItem>
                    ))}
                  </TimelineWrap>
                </>
              )}

              {/* ---------- Experience ---------- */}
              {section === 'experience' && (
                <>
                  <SubCard data-reveal>
                    <h4>Technical Experience</h4>
                    <div style={{ color: 'var(--muted)', fontSize: 18 }}>My technical work across roles</div>
                  </SubCard>

                  <Card data-reveal>
                    <h4>
                      <a href={companyLinks['WNS Global Services']} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        WNS Global Services
                      </a>
                      {' '}— Sr. Associate
                    </h4>
                    <div style={{ color: 'var(--muted)', fontSize: 16 }}>Mar 2024 - Sept 2025 (1-Year, 6 Months)</div>
                    <p style={{ marginTop: 8 }}>
                      Managed healthcare process workflows with precision and compliance. Developed strong attention to detail and collaborative troubleshooting skills; worked across teams to ensure high-quality deliverables and process improvements.
                    </p>
                  </Card>

                  <Card data-reveal>
                    <h4>
                      <a href={companyLinks['Renu Communications / Vision India']} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Renu Communications / Vision India
                      </a>
                      {' '}— Associate
                    </h4>
                    <div style={{ color: 'var(--muted)', fontSize: 16 }}>Nov 2018 - May 2025 (6 Months)</div>
                    <p style={{ marginTop: 8 }}>
                      Supported customer operations and data handling with accuracy and adaptability. Built strong communication skills and process discipline.
                    </p>
                  </Card>
                </>
              )}

              {/* ---------- Badges (Skills) ---------- */}
              {section === 'skills' && (
                <>
                  <SubCard data-reveal>
                    <h4 style={{ fontSize: 20 }}>Skills & Badges</h4>
                    <div style={{ color: 'var(--muted)', fontSize: 18 }}>Official badges and micro-credentials — click to open verification page if included in filename</div>
                  </SubCard>

                  <BadgesGrid>
                    {builtBadges.map((b, i) => (
                      <BadgeItem
                        key={`${b.file || b.title}-${i}`}
                        onClick={() => {
                          // If parsed verify URL exists (from filename or our map), open in iframe modal.
                          // Otherwise fall back to image/pdf preview.
                          if (b.verify) {
                            openModalFor({ src: b.verify, type: 'iframe' });
                          } else if (isPdf(b.src)) {
                            openModalFor({ src: b.src, type: 'pdf' });
                          } else {
                            openModalFor({ src: b.src, type: 'image' });
                          }
                        }}
                        data-reveal
                        style={{ transitionDelay: `${i * 40}ms` }}
                        aria-label={`Open badge ${b.title || b.file}`}
                      >
                        {isPdf(b.src) ? (
                          <div style={{ width: 120, height: 120, borderRadius: 8, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ddd' }}>
                            PDF
                          </div>
                        ) : (
                          <img src={b.src} alt={b.title || b.file} />
                        )}

                        <div className="meta-wrap">
                          <div className="title">{b.title || parseBadgeFilename(b.file).title}</div>
                          { (b.issuer || parseBadgeFilename(b.file).issuer) && <div className="sub">{b.issuer || parseBadgeFilename(b.file).issuer}</div> }
                        </div>
                      </BadgeItem>
                    ))}
                  </BadgesGrid>
                </>
              )}

              {/* ---------- Certifications ---------- */}
              {section === 'certifications' && (
                <>
                  <SubCard data-reveal>
                    <h4 style={{ fontSize: 20 }}>Certifications & Achievements</h4>
                    <div style={{ color: 'var(--muted)', fontSize: 18 }}>Verified certifications and credentials — click any certificate to view full size</div>
                  </SubCard>

                  {certSrcs && certSrcs.length > 0 ? (
                    <CertGrid>
                      {certSrcs.map((src, idx) => {
                        const filename = typeof src === 'string' ? src.split('/').pop() : `certificate-${idx + 1}`;
                        return (
                          <CertItem
                            key={`${String(src)}-${idx}`}
                            onClick={() => openModal(src)}
                            data-reveal
                            style={{ transitionDelay: `${idx * 30}ms` }}
                            aria-label={`Open certification ${idx + 1}`}
                          >
                            {isPdf(src) ? (
                              <div style={{ width: '100%', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#ddd', borderRadius: 6 }}>PDF</div>
                            ) : (
                              <img src={src} alt={`Certification ${idx + 1}`} />
                            )}
                          </CertItem>
                        );
                      })}
                    </CertGrid>
                  ) : (
                    <CertGrid>
                      {certificationsFallback.map((c, i) => (
                        <CertItem key={c.name} onClick={() => openModal(c.src)} data-reveal style={{ transitionDelay: `${i * 40}ms` }}>
                          {isPdf(c.src) ? (
                            <div style={{ width: '100%', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#ddd', borderRadius: 6 }}>PDF</div>
                          ) : (
                            <img src={c.src} alt={c.name} />
                          )}
                        </CertItem>
                      ))}
                    </CertGrid>
                  )}
                </>
              )}
            </Panel>
          </Content>
        </Layout>
      </Container>

      {/* Modal — used for badges (iframe for verify URLs) & cert previews */}
      {modalOpen && (
        <ModalOverlay role="dialog" aria-modal="true" onClick={() => closeModal()}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseBtn aria-label="Close preview" onClick={() => closeModal()}>Close</CloseBtn>
            </ModalHeader>

            <ModalContent>
              {modalType === 'iframe' ? (
                // open verify/redirect URL inside iframe
                <iframe
                  src={modalSrc}
                  title="Badge verification"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : modalType === 'pdf' ? (
                <object data={modalSrc} type="application/pdf" aria-label="Preview PDF">
                  <div className="pdf-placeholder">PDF Preview not available — <a href={modalSrc} target="_blank" rel="noreferrer">Open in new tab</a></div>
                </object>
              ) : (
                <img src={modalSrc} alt="Full preview" />
              )}
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Section>
  );
}
