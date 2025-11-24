// src/App.js
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Resume = lazy(() => import('./components/Resume'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const VALID_SECTIONS = ['home','about','services','resume','skills','projects','certifications','contact'];

function parseFromHash(hash) {
  if (!hash) return 'home';
  const h = hash.replace(/^#/, '');
  if (VALID_SECTIONS.includes(h.toLowerCase())) return h.toLowerCase();
  // support #section=projects format too
  if (h.includes('section=')) {
    const params = new URLSearchParams(h);
    const s = params.get('section');
    if (s && VALID_SECTIONS.includes(s.toLowerCase())) return s.toLowerCase();
  }
  return 'home';
}

export default function App(){
  // theme management
  const [themeName, setThemeName] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch { return 'dark'; }
  });
  useEffect(()=> localStorage.setItem('theme', themeName), [themeName]);
  const toggleTheme = () => setThemeName(t => t === 'dark' ? 'light' : 'dark');

  // active section
  const [active, setActive] = useState(() => parseFromHash(window.location.hash));

  useEffect(() => {
    const onHash = () => {
      const s = parseFromHash(window.location.hash);
      setActive(s);
      window.scrollTo(0,0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  function navigateTo(section) {
    if (!VALID_SECTIONS.includes(section)) section = 'home';
    const newHash = `#${section}`;
    if (window.location.hash !== newHash) history.pushState(null, '', newHash);
    setActive(section);
    window.scrollTo(0,0);
  }

  function renderSection(key){
    switch(key){
      case 'home': return <Hero />;
      case 'about': return <About />;
      case 'services': return <Services />;
      case 'resume': return <Resume />;
      case 'skills': return <Skills />;
      case 'projects': return <Projects />;
      case 'certifications': return <Certifications />;
      case 'contact': return <Contact />;
      default: return <Hero />;
    }
  }

  // Determine if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Transition timeout (skip or set to 0 if reduced motion)
  const timeout = prefersReducedMotion ? 0 : 420;

  return (
    <ThemeProvider theme={themeName === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Header themeName={themeName} toggleTheme={toggleTheme} active={active} onNavigate={navigateTo} />
      <main>
        <Suspense fallback={<div style={{minHeight:360,display:'flex',alignItems:'center',justifyContent:'center'}}>Loading…</div>}>

          {/* SwitchTransition + CSSTransition handles enter/exit animations.
              key={active} ensures new section replaces old one */}
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={active}
              addEndListener={(node, done) => {
                // allow CSSTransition to use transitionend
                node.addEventListener('transitionend', done, false);
              }}
              classNames="section"
              timeout={timeout}
            >
              <div style={{ minHeight: 360 }}>
                { renderSection(active) }
              </div>
            </CSSTransition>
          </SwitchTransition>

        </Suspense>
      </main>

      {/* Footer is optional; keep if you want it always present */}
      <Suspense fallback={null}><Footer /></Suspense>
    </ThemeProvider>
  );
}
