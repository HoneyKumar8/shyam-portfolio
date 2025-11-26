// src/components/Resume/Education.js
import React from "react";
import styled from "styled-components";
import { SubCard } from "./styles";

/**
 * Decorative image uploaded by user (your environment will transform this local path to a URL).
 * Using the file path from the project assets you provided.
 */


/* ---------------- Styled components ---------------- */

const Wrap = styled.section`
  width: 100%;
  box-sizing: border-box;
`;

/* Header area (uses SubCard for consistent look) */
const HeaderCard = styled(SubCard)`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 18px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border: 1px solid ${({ theme }) => theme?.glass || "rgba(255,255,255,0.03)"};
  box-shadow: ${({ theme }) => theme?.cardShadow || "0 10px 30px rgba(0,0,0,0.5)"};

  .meta { flex: 1; }

  .eyebrow {
    color: ${({ theme }) => theme?.accent || "#ff2d6f"};
    font-weight: 800;
    margin-bottom: 6px;
    letter-spacing: 0.2px;    
  }

  .title {
    font-size: clamp(20px, 2.4vw, 26px);
    font-weight: 800;
    margin: 0 0 6px 0;
    line-height: 1.05;
  }

  .desc {
    color: var(--muted);
    margin: 0;
    font-size: clamp(18px, 1.4vw, 22px);
  }

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

/* Timeline container: draws the vertical line with ::before so it always aligns */
const Timeline = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 18px;
  position: relative;
  padding-left: 64px; /* space reserved for the year chip and the line */

  &::before {
    content: "";
    position: absolute;
    left: 36px; /* aligns with center of year chip */
    top: 10px;
    bottom: 10px;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(180deg, ${({ theme }) => (theme?.accent || "#ff2d6f")}66, transparent);
    opacity: 0.9;
  }

  @media (max-width: 860px) {
    padding-left: 18px;
    &::before { display: none; }
  }
`;

/* individual timeline row (card) */
const TimelineRow = styled.article`
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 20px;
  align-items: start;
  padding: 14px 18px;
  border-radius: 12px;
  background: ${({ theme }) => theme?.surface || "rgba(0,0,0,0.45)"};
  border: 1px solid ${({ theme }) => theme?.glass || "rgba(255,255,255,0.03)"};
  box-shadow: ${({ theme }) => theme?.cardShadow || "0 8px 28px rgba(0,0,0,0.45)"};
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.55);
  }

  .year {
    min-width: 76px;
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(255,255,255,0.01));
    color: ${({ theme }) => theme?.accent || "#ff2d6f"};
    font-weight: 800;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
    font-size: 18px;
  }

  .content {
    min-height: 64px;
  }

  h4 {
    margin: 0 0 6px 0;
    font-size: clamp(20px, 1.6vw, 22px);
    font-weight: 800;
  }

  .institution {
    color: var(--muted);
    font-size: 18px;
    margin-bottom: 8px;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    .year {
      justify-content: flex-start;
      padding: 8px 12px;
      width: auto;
      display: inline-block;
      border-radius: 8px;
      margin-bottom: 8px;
    }
  }
`;

/* ---------------- Component ---------------- */

export default function Education({ sortedEducation = [] }) {
  return (
    <Wrap>
      <HeaderCard data-reveal>
        <div className="meta">
          <div className="eyebrow" style={{fontSize:20}}>Academics &amp; Training</div>
          <h3 className="title">Formal education &amp; professional training</h3>
          <p className="desc">A summary of formal degrees, diplomas and vocational programs (most recent first).</p>
        </div>

       
      </HeaderCard>

      <Timeline data-reveal>
        {sortedEducation && sortedEducation.length > 0 ? (
          sortedEducation.map((item, idx) => (
            <TimelineRow key={`${item.title}-${item.year}-${idx}`} data-reveal>
              <div className="year" aria-hidden="true">{item.year || "—"}</div>

              <div className="content">
                <h4>{item.title}</h4>
                <div className="institution">{item.institution}</div>
              </div>
            </TimelineRow>
          ))
        ) : (
          <TimelineRow data-reveal>
            <div className="year">—</div>
            <div className="content">
              <h4>No records</h4>
              <div className="institution">No education entries found</div>
              <p className="details">Add your education items to the data source to display them here.</p>
            </div>
          </TimelineRow>
        )}
      </Timeline>
    </Wrap>
  );
}
