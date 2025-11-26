// src/styles/GlobalStyles.js
import { createGlobalStyle, keyframes } from "styled-components";

/*
  This file expects the image available at /light-halftone.jpg (public root).
  Make sure you copied the image into public/light-halftone.jpg.
*/

const ringPulse = keyframes`
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.03); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
`;

const GlobalStyles = createGlobalStyle`

  :root {
    --accent: ${({ theme }) => theme.accent};
    --container-width: 1400px;

    --bg: ${({ theme }) => (typeof theme.bg === "string" ? theme.bg : "#ffffff")};
    --surface: ${({ theme }) => theme.surface};
    --text: ${({ theme }) => theme.text};
    --muted: ${({ theme }) => theme.muted};
    --ring: ${({ theme }) => theme.ringColor};
    --card-shadow: ${({ theme }) => theme.cardShadow};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

/* wrapper */
.profile-wrap {
  position: relative;
  display: inline-block;
  border-radius: 999px;
}

/* ring behind image */
.profile-ring {
  position: absolute;
  inset: -10px;              /* distance from image → thickness of glow */
  border-radius: 999px;
  pointer-events: none;
}

/* Always-on pulse (kept) */
  .profile-ring::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 999px;
    box-shadow:
      0 0 50px ${({theme}) => theme.ringColor},
      0 0 30px ${({theme}) => theme.ringColor};
    opacity: 0.6;
    animation: ${ringPulse} 4.5s ease-in-out infinite;
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.text};
    font-family: Inter, system-ui, sans-serif;
    line-height: 1.7;

    /* Light Theme: use public image at /light-halftone.jpg */
    ${({ theme }) => theme.name === "light" ? `
      /* place the image first so the gradient overlays it (we'll use blend-mode) */
  background-image:
    url('/light-halftone.jpg'),
    linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,249,252,0.98));
  /* size the image to a large width so dots are visible, let gradient cover */
  background-size: cover;
  background-position: center 18%, center center;
  background-repeat: no-repeat, no-repeat;
  /* blend image and gradient to get subtle but visible halftone */
  background-blend-mode: normal;
  /* fallback color */
  background-color: #fbfdff !important;
` : `
      /* Dark Theme Neon Background (unchanged) */
      ${
        theme.useNeonBG
          ? `
        background:
          radial-gradient(600px 380px at 78% 12%,
            rgba(255,45,109,0.32),
            rgba(255,45,109,0.06),
            transparent 80%
          ),
          radial-gradient(600px 420px at 18% 82%,
            rgba(43,123,233,0.32),
            rgba(43,123,233,0.06),
            transparent 95%
          ),
          radial-gradient(circle at 50% 50%,
            rgba(160,40,150,0.20),
            transparent 85%
          ),
          linear-gradient(
            180deg,
            #0b0c10 0%,
            #0d0d12 38%,
            #0f0f11 100%
          );
      `
          : `background: ${theme.bg};`
      }
    `}

    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a { color: inherit; text-decoration: none; }

  .container {
    width: 100%;
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-sub { font-size: 22px; font-weight: 700; color: var(--accent); margin-bottom: 6px; letter-spacing: 1px; }
  .section-head { font-size: clamp(28px, 4vw, 36px); font-weight: 800; margin-bottom: 22px; color: var(--text); }

  .card {
    background: var(--surface);
    padding: 30px;
    border-radius: 12px;
    box-shadow: var(--card-shadow);
  }

  /* fixed footer */
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    padding: 18px 0;
    background: ${({ theme }) => theme.surface};
    border-top: 1px solid ${({ theme }) => theme.glass};
    box-shadow: 0 -4px 22px rgba(0,0,0,0.25);
    z-index: 999;
  }

  main { padding-bottom: 120px; } /* prevent footer overlap */
`;

export default GlobalStyles;
