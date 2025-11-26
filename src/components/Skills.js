// src/components/Skills.js
import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaJsSquare, FaPython, FaReact, FaNodeJs,
  FaDocker, FaGitAlt, FaHtml5, FaCss3Alt
} from "react-icons/fa";
import {
  SiTypescript, SiPostgresql, SiMongodb, SiFigma,
  SiOracle, SiExpress, SiStyledcomponents, SiBootstrap
} from "react-icons/si";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

const Section = styled.section`
  padding: 80px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 10px;
  color: var(--text);
  font-weight: 700;
`;

const CategoryWrapper = styled.div`
  margin: 50px 0;
  animation: ${fadeIn} 0.6s ease forwards;
`;

const CategoryTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--accent);
  letter-spacing: 0.5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 22px;
`;

const SkillCard = styled.div`
  background: ${({ theme }) => theme.glass};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  backdrop-filter: blur(14px);
  box-shadow: 0 0 14px rgba(255, 0, 95, 0.18);
  transition: all 0.25s ease;
  border: 1px solid rgba(255,255,255,0.06);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 25px rgba(255, 0, 95, 0.35);
  }

  &:hover svg {
    animation: ${pulse} 0.5s ease;
  }
`;

const IconWrap = styled.div`
  font-size: 28px;
  color: var(--accent);
`;

const Label = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
`;

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
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "MongoDB", icon: <SiMongodb /> }
      ]
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Git", icon: <FaGitAlt /> },
        { name: "Docker", icon: <FaDocker /> },
        { name: "AWS (Educate)", icon: <FaDocker /> }
      ]
    },
    {
      title: "Design & Others",
      skills: [
        { name: "Python", icon: <FaPython /> },
        { name: "Figma", icon: <SiFigma /> },
        { name: "Oracle APEX", icon: <SiOracle /> }
      ]
    }
  ];

  return (
    <Section id="skills">
      <div className="container">
        <p className="section-sub">MY TALENT</p>
        <SectionTitle>Professional Skills</SectionTitle>

        {categories.map(cat => (
          <CategoryWrapper key={cat.title}>
            <CategoryTitle>{cat.title}</CategoryTitle>

            <Grid>
              {cat.skills.map(s => (
                <SkillCard key={s.name}>
                  <IconWrap>{s.icon}</IconWrap>
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
