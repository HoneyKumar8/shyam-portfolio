// src/components/Resume/Badges.js
import React from "react";
import { SubCard } from "./styles";
import styled from "styled-components";

/* ---------------- Styled Components ---------------- */

const Grid = styled.div`
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  padding-top: 10px;
`;

const BadgeCard = styled.div`
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  padding: 20px 16px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: 0.35s ease;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.35);

  &:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 16px 36px ${({ theme }) => theme.accent}44;
  }

  .badge-img {
    width: 130px;
    height: 130px;
    object-fit: contain;
    margin: 0 auto 16px auto;
    display: block;
    transition: 0.3s ease;
    background: rgba(255,255,255,0.02);
    padding: 8px;
    border-radius: 8px;
  }

  &:hover .badge-img {
    transform: scale(1.08);
  }

  h4 {
    font-size: 20px;
    margin: 0;
    font-weight: 700;
  }

  .issuer {
    color: var(--muted);
    margin-top: 4px;
    font-size: 18px;
  }

`;

/* ---------------- Main Component ---------------- */

export default function Badges({ builtBadges = [], openModalFor, isPdf }) {
  const openVerification = (url) => {
    // open in new tab, avoid potential opener attacks
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClick = (b) => {
    // If a verification URL exists → open in new tab
    if (b.verify) {
      openVerification(b.verify);
      return;
    }

    // Otherwise → preview image/pdf in modal
    const type = isPdf(b.src) ? "pdf" : "image";
    openModalFor({ src: b.src, type });
  };

  const handleKeyDown = (e, b) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(b);
    }
  };

  return (
    <>
      <SubCard data-reveal>
        <h4 style={{ color: "var(--accent)", marginBottom: 6, fontSize:20 }}>
          Skills & Achievements
        </h4>
        <h2 style={{ margin: "0 0 4px 0" , fontSize:24}}>Verified Badges & Credentials</h2>
        <p style={{ color: "var(--muted)" , fontSize:18}}>
          Click a badge to open its official Badge page.
        </p>
      </SubCard>

      <Grid>
        {builtBadges.map((b, i) => (
          <BadgeCard
            key={i}
            data-reveal
            role="button"
            tabIndex={0}
            onClick={() => handleClick(b)}
            onKeyDown={(e) => handleKeyDown(e, b)}
            aria-label={b.title + (b.verify ? " — opens verification page" : " — preview")}
            title={b.title}
          >
            {!isPdf(b.src) ? (
              <img src={b.src} alt={b.title} className="badge-img" />
            ) : (
              <div style={{ height: 130, lineHeight: "130px" }}>PDF</div>
            )}

            <h4>{b.title}</h4>
            <div className="issuer">{b.issuer}</div>

            
          </BadgeCard>
        ))}
      </Grid>
    </>
  );
}
