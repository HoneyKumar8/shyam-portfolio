// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 80;
  background: ${({ theme }) => `${theme.surface}b8`};
  backdrop-filter: blur(6px);
  border-bottom: 1px solid ${({ theme }) => theme.glass};
`;

const Inner = styled.div`
  max-width: 2400px;
  margin: 0 auto;
  padding: 30px 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

/* Brand */
const Brand = styled.a`
  font-family: "Pacifico", cursive;
  font-size: clamp(18px, 1.6rem + 0.8vw, 42px);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;
  transition: transform 0.22s ease, text-shadow 0.22s ease;
  user-select: none;
  line-height: 1;

  span:first-child {
    color: ${({ theme }) => theme.text};
    opacity: 0.95;
  }

  span:last-child {
    color: var(--accent);
    margin-left: 6px;
    letter-spacing: 0.6px;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
    transition: width 0.32s ease;
    box-shadow: 0 0 6px var(--accent), 0 0 12px var(--accent);
    opacity: 0.95;
  }

  &:hover {
    transform: scale(1.04);
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.18),
      0 0 10px rgba(214, 51, 108, 0.15);
  }

  &:hover:after {
    width: 100%;
  }

  @media (max-width: 640px) {
    font-size: clamp(16px, 1.2rem + 1vw, 22px);
  }
`;

/* Desktop navigation */
const NavLinks = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }

  /* shared link styles */
  button.link,
  a {
    color: ${({ theme }) => theme.muted};
    padding: 8px 10px;
    border-radius: 8px;
    font-size: clamp(20px, 0.5rem + 1.0vw, 42px);
    position: relative;
    transition: transform 0.22s ease, text-shadow 0.22s ease;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 160ms ease, background 160ms ease;
    text-decoration: none;
  }

  button.link:hover,
  a:hover {
    color: ${({ theme }) => theme.text};
  }

  /* active state: neon glow + underline */
  a[data-active="true"] {
    color: ${({ theme }) => theme.text};
    box-shadow: 0 6px 20px rgba(255, 0, 95, 0.08);
    text-shadow: 0 0 8px rgba(255, 0, 95, 0.14), 0 0 18px rgba(255, 0, 95, 0.10);
  }
  a[data-active="true"]::after {
    content: "";
    display: block;
    position: absolute;
    left: 6px;
    right: 6px;
    bottom: -8px;
    height: 3px;
    background: linear-gradient(90deg, rgba(255,0,95,0.9), rgba(255,120,170,0.75));
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(255, 0, 95, 0.25), 0 0 18px rgba(255, 0, 95, 0.18);
  }
`;

/* Right cluster (theme toggle + mobile menu) */
const RightCluster = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

/* theme toggle */
const ThemeBtn = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.glass};
  color: ${({ theme }) => theme.muted};
  padding: 8px 10px;
  border-radius: 8px;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  font-size: clamp(8px, 0.5rem + 0.8vw, 42px);
  position: relative;
  transition: transform 0.22s ease, text-shadow 0.22s ease;
`;

/* mobile hamburger */
const MobileBtn = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.muted};
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: 900px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

/* mobile sliding panel */
const MobilePanel = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.surface};
    border-top: 1px solid ${({ theme }) => theme.glass};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    z-index: 79;
    transition: transform 260ms cubic-bezier(.2,.9,.3,1), opacity 180ms ease;
    transform-origin: top;
    max-height: calc(100vh - 62px);
    overflow: auto;
  }

  &.closed {
    transform: scaleY(0.98);
    opacity: 0;
    pointer-events: none;
  }

  &.open {
    transform: scaleY(1);
    opacity: 1;
    pointer-events: auto;
  }
`;

/* mobile nav list */
const MobileList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 14px;
  display: grid;
  gap: 6px;

  li {
    border-radius: 8px;
  }

  button,
  a {
    width: 100%;
    text-align: left;
    padding: 12px 14px;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    cursor: pointer;
  }

  button:hover,
  a:hover {
    background: rgba(0, 0, 0, 0.04);
    color: var(--accent);
  }

  /* active mobile item */
  button[data-active="true"] {
    color: var(--accent);
    font-weight: 700;
  }
`;

/* small helper to render nav items consistently */
const NavItem = ({ id, label, activeItem, onClick }) => {
  const isActive = activeItem === id;
  return (
    <a
      role="button"
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "true" : "false"}
      onClick={() => onClick(id)}
      tabIndex={0}
    >
      {label}
    </a>
  );
};

export default function Header({ themeName, toggleTheme, active = "home", onNavigate }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(active || "home");
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  // keep activeItem in sync when parent prop changes
  useEffect(() => {
    if (active) setActiveItem(active);
  }, [active]);

  // close mobile panel on resize > 900
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 900 && open) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // update active item when user changes hash manually (support deep links)
  useEffect(() => {
    function onHash() {
      const h = (window.location.hash || "").replace("#", "");
      if (h) setActiveItem(h);
      setOpen(false);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // manage focus when mobile panel opens/closes
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const el = panelRef.current?.querySelector("button, a, input");
      if (el) el.focus();
    } else {
      document.body.style.overflow = "";
      if (btnRef.current) btnRef.current.focus();
    }
  }, [open]);

  const go = (s) => {
    // reflect the selection immediately in UI
    setActiveItem(s);

    // inform parent if provided, otherwise change hash
    if (onNavigate) onNavigate(s);
    else window.location.hash = `#${s}`;

    // close mobile panel if open
    setOpen(false);
  };

  return (
    <Nav>
      <Inner>
        <Brand onClick={() => go("home")} aria-label="Home">
        <i>
          <span>Shyam</span>
          <span>Kumar</span>
        </i>
        </Brand>

        <NavLinks aria-label="Primary">
          <NavItem id="about" label="About" activeItem={activeItem} onClick={go} />
          <NavItem id="services" label="Services" activeItem={activeItem} onClick={go} />
          <NavItem id="resume" label="Resume" activeItem={activeItem} onClick={go} />
          <NavItem id="skills" label="Skills" activeItem={activeItem} onClick={go} />
          <NavItem id="projects" label="Projects" activeItem={activeItem} onClick={go} />
          <NavItem id="contact" label="Contact" activeItem={activeItem} onClick={go} />
        </NavLinks>

        <RightCluster>
          <ThemeBtn aria-pressed={themeName === "dark"} onClick={toggleTheme} title="Toggle theme">
            {themeName === "dark" ? <FaMoon /> : <FaSun />}{" "}
            <span style={{ fontSize: 12, marginLeft: 6 }}>{themeName === "dark" ? "Dark" : "Light"}</span>
          </ThemeBtn>

          <MobileBtn
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            ref={btnRef}
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </MobileBtn>
        </RightCluster>
      </Inner>

      <MobilePanel id="mobile-nav" ref={panelRef} className={open ? "open" : "closed"} role="dialog" aria-modal="true" aria-hidden={!open}>
        <MobileList>
          <li><button data-active={activeItem === "about"} onClick={() => go("about")}>About</button></li>
          <li><button data-active={activeItem === "services"} onClick={() => go("services")}>Services</button></li>
          <li><button data-active={activeItem === "resume"} onClick={() => go("resume")}>Resume</button></li>
          <li><button data-active={activeItem === "skills"} onClick={() => go("skills")}>Skills</button></li>
          <li><button data-active={activeItem === "projects"} onClick={() => go("projects")}>Projects</button></li>
          <li><button data-active={activeItem === "contact"} onClick={() => go("contact")}>Contact</button></li>
          <li>
            <div style={{ padding: "12px 14px", display: "flex", gap: 8, alignItems: "center" }}>
              <ThemeBtn aria-pressed={themeName === "dark"} onClick={toggleTheme} title="Toggle theme">
                {themeName === "dark" ? <FaMoon /> : <FaSun />} <span style={{ fontSize: 13, marginLeft: 8 }}>{themeName === "dark" ? "Dark" : "Light"}</span>
              </ThemeBtn>
            </div>
          </li>
        </MobileList>
      </MobilePanel>
    </Nav>
  );
}
