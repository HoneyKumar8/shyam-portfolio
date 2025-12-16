// src/components/Resume/Introduction.js
import React, { useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import { SubCard } from "./styles";

const UPLOADED_PREVIEW = "/mnt/data/229df605-b3af-4d49-aafb-694c96d0f020.png";

/* ---------------- Layout ---------------- */
const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 360px; /* 🔥 video gets more space */
  gap: 20px;
  align-items: start;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const VideoWrap = styled.div`
  width: 100%;
`;

const PreviewCard = styled.div`
  background: ${({ theme }) => theme?.surface || "#0b0b0b"};
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: ${({ theme }) =>
    theme?.cardShadow || "0 8px 28px rgba(0,0,0,0.45)"};
  border: 1px solid
    ${({ theme }) => theme?.glass || "rgba(255,255,255,0.03)"};

  .thumb {
    width: 100%;
    height: 220px;
    object-fit: contain;
    border-radius: 8px;
    background: #0b0b0b;
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
  }

  .open {
    background: ${({ theme }) => theme?.accent || "#ff2d6f"};
    color: #fff;
  }

  .download {
    background: transparent;
    border: 1px solid
      ${({ theme }) => theme?.glass || "rgba(255,255,255,0.06)"};
    color: var(--text);
  }

  .title {
    font-weight: 700;
  }

  .sub {
    color: var(--muted);
    font-size: 18px;
  }
`;

const IntroHeader = styled.div`
  margin-bottom: 12px;

  .subtitle {
    color: ${({ theme }) => theme?.accent || "#ff2d6f"};
    font-weight: 700;
    margin-bottom: 8px;
  }

  .title {
    font-weight: 800;
    margin-bottom: 12px;
  }

  .desc {
    color: var(--muted);
    font-size: 18px;
  }
`;

const resumeUrl = `${process.env.PUBLIC_URL}/resume.pdf`;

export default function Introduction({ resumePreview = UPLOADED_PREVIEW }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <SubCard data-reveal>
        <IntroHeader>
          <div className="subtitle">Introducing Myself</div>
          <h2 className="title">A Glimpse Into My Journey</h2>
          <p className="desc">
            This video offers a personal overview of my background, mindset, and professional goals.
          </p>
        </IntroHeader>
      </SubCard>

      <IntroGrid>
        {/* Video */}
        <VideoWrap data-reveal>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            }}
          >
            {showVideo ? (
              <div style={{ position: "absolute", inset: 0 }}>
                <YouTube
                  videoId="tYEZvpIFeYM"
                  iframeClassName="yt-iframe"
                  opts={{
                    playerVars: {
                      autoplay: 1,
                      rel: 0,
                      modestbranding: 1,
                    },
                  }}
                  onEnd={() => setShowVideo(false)}
                />
              </div>
            ) : (
              <>
                <img
                  src="https://img.youtube.com/vi/tYEZvpIFeYM/maxresdefault.jpg"
                  alt="Self Introduction"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <button
                  onClick={() => setShowVideo(true)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(0,0,0,0.65)",
                    border: "none",
                    color: "#fff",
                    fontSize: "20px",
                    padding: "16px 26px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  ▶ Play
                </button>
              </>
            )}
          </div>
        </VideoWrap>

        {/* Resume */}
        <PreviewCard data-reveal>
          <div>
            <div className="title">My Resume</div>
            <div className="sub">Open or download my resume</div>
          </div>

          <img
            className="thumb"
            src={resumePreview}
            alt="Resume preview"
            onError={(e) => (e.currentTarget.src = UPLOADED_PREVIEW)}
          />

          <div className="actions">
            <a className="btn open" href={resumeUrl} target="_blank" rel="noreferrer">
              Open Resume
            </a>
            <a className="btn download" href={resumeUrl} download>
              Download
            </a>
          </div>
        </PreviewCard>
      </IntroGrid>
    </>
  );
}
