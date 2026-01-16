// src/components/Skills.js
import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaJsSquare,
  FaPython,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaAws,
  FaKaggle,
  FaProjectDiagram
} from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiFigma,
  SiOracle,
  SiExpress,
  SiStyledcomponents,
  SiBootstrap,
  SiVisualstudiocode
} from "react-icons/si";

/* Animations */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

/* Layout */
const Section = styled.section`
  padding: 80px 0;
`;

const SectionTitle = styled.h2`
  font-size: clamp(18px, 1.4vw, 24px);
  margin-bottom: 2px;
  color: var(--text);
  font-weight: 700;
`;

const CategoryWrapper = styled.div`
  margin: 24px 0;
  animation: ${fadeIn} 0.6s ease both;
`;

const CategoryTitle = styled.h3`
  font-size: clamp(16px, 1.4vw, 22px);
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--accent);
  letter-spacing: 0.5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 18px;
`;

/* Skill Card */
const SkillCard = styled.div`
  background: ${({ theme }) => theme.glass};
  border-radius: 16px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 14px;
  backdrop-filter: blur(14px);
  box-shadow: 0 0 14px rgba(255, 0, 95, 0.18);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid rgba(255,255,255,0.06);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 25px rgba(255, 0, 95, 0.35);
  }

  &:hover svg {
    animation: ${pulse} 0.45s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    &:hover svg {
      animation: none;
    }
  }
`;

const IconWrap = styled.div`
  font-size: clamp(16px, 1.4vw, 24px);
  color: var(--accent);
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-size: clamp(14px, 0.6vw, 18px);
  font-weight: 600;
  color: var(--text);
`;

/* Component */
export default function Skills() {
  const categories = [
    {
      title: "Frontend",
      skills: [
        { name: "JavaScript", icon: <FaJsSquare /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "React", icon: <FaReact /> },
        { name: "Styled Components", icon: <SiStyledcomponents /> },
        { name: "HTML", icon: <FaHtml5 /> },
        { name: "CSS", icon: <FaCss3Alt /> },
        { name: "Bootstrap", icon: <SiBootstrap /> }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "SQL", icon: <SiPostgresql /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Python", icon: <FaPython /> },
        { name: "Agentic AI / ML", icon: <FaProjectDiagram /> }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: <FaGitAlt /> },
        { name: "VS Code", icon: <SiVisualstudiocode /> },
        { name: "Kaggle", icon: <FaKaggle /> }
      ]
    },
    {
      title: "Design & Others",
      skills: [
        { name: "Figma", icon: <SiFigma /> },
        { name: "Oracle APEX", icon: <SiOracle /> },
        { name: "AWS (Foundations)", icon: <FaAws /> }
      ]
    }
  ];

  return (
    <Section id="skills" aria-label="Skills">
      <div className="container">
        <p className="section-sub">SKILLSET</p>
        <SectionTitle>What I Work With</SectionTitle>

        {categories.map((cat) => (
          <CategoryWrapper key={cat.title}>
            <CategoryTitle>{cat.title}</CategoryTitle>

            <Grid>
              {cat.skills.map((s) => (
                <SkillCard key={s.name} aria-label={s.name}>
                  <IconWrap aria-hidden>{s.icon}</IconWrap>
                  <Label>{s.name}</Label>
                </SkillCard>
              ))}
            </Grid>
          </CategoryWrapper>
        ))}
      </div>
    </Section>
  );
}
