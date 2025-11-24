// src/components/Resume/Introduction.js
import React from "react";
import styled from "styled-components";
import { SubCard } from "./styles";

// fallback preview image (local uploaded file — will be transformed to a usable URL by your environment)
const UPLOADED_PREVIEW = "/mnt/data/229df605-b3af-4d49-aafb-694c96d0f020.png";

/* ---------------- Styled pieces local to this component ---------------- */
/* Desktop: fixed video width 720px, preview 360px.
   Below breakpoint the layout stacks (video above preview). */
const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 720px 360px;
  gap: 20px;
  align-items: start;
  justify-content: center;

  /* If container gets too narrow, stack items vertically */
  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }
`;

const VideoWrap = styled.div`
  position: relative;
  background: ${({ theme }) => theme?.surface || "#0b0b0b"};
  border-radius: 12px;
  padding: 10px;
  box-shadow: ${({ theme }) => theme?.cardShadow || "0 8px 28px rgba(0,0,0,0.5)"};
  overflow: hidden;
  /* ensure the wrapper keeps the fixed width on wide screens, but can shrink inside stacked layout */
  width: 720px;
  max-width: 100%;

  video {
    width: 720px;        /* fixed width */
    max-width: 100%;     /* allow it to scale down if parent forces smaller width (stacked mode) */
    height: auto;
    display: block;
    border-radius: 8px;
    background: #000;
    outline: none;
  }

  .play-overlay {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 6;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 28px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    cursor: pointer;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  }
`;

const PreviewCard = styled.div`
  background: ${({ theme }) => theme?.surface || "#0b0b0b"};
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
  box-shadow: ${({ theme }) => theme?.cardShadow || "0 8px 28px rgba(0,0,0,0.45)"};
  border: 1px solid ${({ theme }) => theme?.glass || "rgba(255,255,255,0.03)"};
  width: 360px;
  max-width: 100%;

  .thumb {
    width: 100%;
    height: 220px;
    object-fit: contain;
    border-radius: 8px;
    background: #0b0b0b;
    display: block;
  }

  .actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: auto;
  }

  .btn {
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .open {
    background: ${({ theme }) => theme?.accent || "#ff2d6f"};
    color: #fff;
  }

  .download {
    background: transparent;
    border: 1px solid ${({ theme }) => theme?.glass || "rgba(255,255,255,0.06)"};
    color: var(--text);
  }

  .title {
    font-weight: 700;
    margin-bottom: 6px;
  }

  .sub {
    color: var(--muted);
    font-size: 18px;
  }
`;

/* heading block inside intro area; flexible sizes applied via clamp */
const IntroHeader = styled.div`
  margin-bottom: 12px;

  .subtitle {
    color: ${({ theme }) => theme?.accent || "#ff2d6f"};
    font-weight: 700;
    margin-bottom: 8px;
    font-size: clamp(20px, 1.2vw, 26px);
  }

  .title {
    font-weight: 800;
    margin: 0 0 12px 0;
    line-height: 1.05;
    font-size: clamp(20px, 3.2vw, 30px);
  }

  .desc {
    color: var(--muted);
    font-size: clamp(18px, 1.6vw, 26px);
    margin: 0;
  }
`;

/* ---------------- Main component ---------------- */
export default function Introduction({
  videoRef,
  isPlaying,
  posterSrc,
  videoSrc,
  resumePreview = UPLOADED_PREVIEW,
}) {
  return (
    <>
      <SubCard data-reveal>
        <IntroHeader>
          <div className="subtitle">Introducing Myself</div>
          <h2 className="title">A Glimpse Into My Journey</h2>
          <p className="desc">This video offers a personal overview of my background, mindset, and professional goals.</p>
        </IntroHeader>
      </SubCard>

      <IntroGrid>
        <VideoWrap data-reveal aria-label="Introduction video card">
          <video
            ref={videoRef}
            muted
            playsInline
            controls
            loop
            controlsList="nodownload noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            poster={posterSrc || resumePreview}
            src={videoSrc}
            preload="metadata"
            aria-label="Self introduction video"
          />
          {!isPlaying && (
            <button
              type="button"
              className="play-overlay"
              aria-label="Play introduction video"
              onClick={async () => {
                try {
                  await videoRef.current.play();
                } catch {
                  videoRef.current.controls = true;
                  videoRef.current.play().catch(() => {});
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  videoRef.current
                    .play()
                    .catch(() => {
                      videoRef.current.controls = true;
                    });
                }
              }}
            >
              ►
            </button>
          )}
        </VideoWrap>

        <PreviewCard data-reveal aria-label="Resume preview card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="title">My Resume</div>
              <div className="sub">Open the Resume to view it or download the PDF</div>
            </div>
          </div>

          <img
            className="thumb"
            src={resumePreview}
            alt="Resume preview"
            onError={(e) => {
              if (resumePreview !== UPLOADED_PREVIEW) e.currentTarget.src = UPLOADED_PREVIEW;
            }}
          />

          <div className="actions">
            <a
              className="btn open"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Open Resume
            </a>

            <a
              className="btn download"
              href="/resume.pdf"
              download
              aria-label="Download resume PDF"
            >
              Download
            </a>
          </div>
        </PreviewCard>
      </IntroGrid>
    </>
  );
}
