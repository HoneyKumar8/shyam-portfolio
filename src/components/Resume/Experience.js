// src/components/Resume/Experience.js
import React from "react";
import styled from "styled-components";
import { SubCard } from "./styles";

/**
 * Decorative image uploaded in the conversation (will be transformed to a URL by your environment).
 * Using a recently uploaded local file path from the conversation history.
 */


const Wrap = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

/* Header (consistent with Education SubCard style) */
const HeaderCard = styled(SubCard)`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;

  .meta {
    flex: 1;
  }

  .eyebrow {
    color: ${({ theme }) => theme?.accent || "#ff2d6f"};
    font-weight: 700;
    margin-bottom: 6px;
    font-size: 20px;
    letter-spacing: 0.2px;
  }

  .title {
    font-size: clamp(18px, 2.6vw, 22px);
    font-weight: 800;
    margin: 0 0 6px 0;
    line-height: 1.05;
  }

  .desc {
    color: var(--muted);
    margin: 0;
    font-size: 18px;
  }

  

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: stretch;
    
  }
`;

/* Container for job cards */
const Jobs = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 18px;
`;

/* Individual job card */
const JobCard = styled.article`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
  padding: 16px 18px;
  border-radius: 12px;
  background: ${({ theme }) => theme?.surface || "rgba(0,0,0,0.45)"};
  border: 1px solid ${({ theme }) => theme?.glass || "rgba(255,255,255,0.03)"};
  box-shadow: ${({ theme }) => theme?.cardShadow || "0 8px 28px rgba(0,0,0,0.45)"};
  align-items: start;
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.55);
  }

  .left {
    min-width: 0;
  }

  .role {
    font-weight: 800;
    margin: 0 0 6px 0;
    font-size: clamp(18px, 1.6vw, 22px);
  }

  .company {
    color: var(--muted);
    font-size: 18px;
    margin-bottom: 8px;
  }

  .desc {
    margin: 0;
    color: var(--muted);
    line-height: 1.6;
    font-size: 18px;
  }

  .date {
    align-self: start;
    background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.02));
    color: ${({ theme }) => theme?.accent || "#ff2d6f"};
    font-weight: 700;
    padding: 8px 12px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.45);
    white-space: nowrap;
    font-size: 18px;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    .date {
      justify-self: start;
      margin-top: 8px;
    }
  }
`;

const DEFAULT_EXPERIENCES = [
  {
    role: "WNS Global Services — Sr. Associate",
    period: "Mar 2024 – Sept 2025 (1 Year 6 Months)",
    company: "Visakhapatnam",
    summary:
      "Managed healthcare operations with quality and precision. Collaborated with cross-functional teams to streamline workflow, enforce compliance, and raise quality metrics.",
  },
  {
    role: "Renu Communications / Vision India — Associate",
    period: "Nov 2018 – May 2019 ( 6 Months )",
    company: "Visakhapatnam",
    summary:
      "Supported customer operations and data handling with excellent communication and accuracy. Improved process documentation and contributed to training initiatives.",
  },
];

export default function Experience({ experiences = DEFAULT_EXPERIENCES }) {
  return (
    <Wrap>
      <HeaderCard data-reveal>
        <div className="meta">
          <div className="eyebrow" style={{fontSize:20}}>Technical Experience</div>
          <h3 className="title">My professional work background</h3>
          <p className="desc">Experience rooted in efficiency, problem-solving, and a commitment to operational excellence.</p>
        </div>

        
      </HeaderCard>

      <Jobs>
        {experiences.map((job, i) => (
          <JobCard key={`${job.role}-${i}`} data-reveal>
            <div className="left">
              <h4 className="role">{job.role}</h4>
              <div className="company">{job.company}</div>
              <p className="desc">{job.summary}</p>
            </div>

            <div className="date" aria-label={`Date: ${job.period}`}>
              {job.period}
            </div>
          </JobCard>
        ))}
      </Jobs>
    </Wrap>
  );
}
