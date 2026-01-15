// src/components/About.js
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import aboutHero from "../assets/images/about-hero.png";

/* subtle reveal */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ---------- Layout Styles ---------- */
const Section = styled.section`
  padding: 0px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(520px, 1.2fr);
  gap: 36px;
  align-items: start;
  margin: 50px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

const ImagePanel = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 100%;

  &.visible {
    animation: ${fadeUp} 480ms both;
  }

  img {
    width: 100%;
    max-width: 520px;
    height: auto;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 1200px) {
    padding: 12px;
  }
`;

/* ---------- Right Side Card ---------- */
const ContentWrap = styled.div`
  display: flex;
`;

const Card = styled.article`
  width: 100%;
  background: ${({ theme }) =>
    theme.name === "light"
      ? "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.92))"
      : "rgba(255,255,255,0.02)"};
  border-radius: 14px;
  padding: 28px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  border: 1px solid ${({ theme }) => theme.glass};
  position: relative;

  &.visible {
    animation: ${fadeUp} 480ms both;
  }

  @media (max-width: 1200px) {
    padding: 22px;
  }
`;

/* ---------- Accent Bar (STATIC) ---------- */
const AccentBar = styled.div`
  height: 6px;
  width: 100%;
  border-radius: 6px;
  margin-bottom: 16px;
  background: ${({ theme }) => (theme && theme.accent ? `${theme.accent}cc` : "#ff2d6dcc")};
`;

/* ---------- Text + Blocks ---------- */
const Title = styled.h2`
  font-size: clamp(18px, 1.6vw, 28px);
  color: var(--accent);
  margin-bottom: 16px;
`;

const Summary = styled.p`
  color: ${({ theme }) => (theme.name === "light" ? "#1b2836" : "var(--muted)")};
  line-height: 1.4;
  margin-bottom: 14px;
  font-size: clamp(12px, 1.4vw, 18px);
`;

const Chips = styled.div`
  display: flex;
  gap: 10px;
  margin: 14px 0;
  flex-wrap: wrap;
`;

const Chip = styled.span`
  background: ${({ theme }) => theme.surface};
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.glass};
  font-size: clamp(8px, 1.4vw, 12px);
`;

const Blocks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Block = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.glass};
  box-shadow: ${({ theme }) => theme.cardShadow};

  h4 {
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--text);
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.muted};
    font-size: 12px;
    line-height: 1.4;
  }
`;

/* ---------- Action Buttons ---------- */
const Actions = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 20px;
  flex-wrap: wrap;
`;



/* ---------- Component ---------- */
export default function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 90);
    return () => clearTimeout(t);
  }, []);

  return (
    <Section id="about" className="container">
      <Grid>
        {/* LEFT — IMAGE */}
        <ImagePanel className={visible ? "visible" : ""}>
          <img src={aboutHero} alt="About illustration" />
        </ImagePanel>

        {/* RIGHT — CARD */}
        <ContentWrap>
          <Card className={visible ? "visible" : ""}>
            <AccentBar />

            <Title>About Me</Title>

            <Summary>
             I’m Shyam, a full-stack developer who focuses on building maintainable systems through clean architecture, reusable components and disciplined problem solving skills. I enjoy designing consistent UI patterns, debugging thoughtfully, and improving workflows through better tooling. Alongside full-stack development, I explore AI-assisted and agent-based approaches to build practical, automation-driven solutions aligned with real-world needs.
            </Summary>

            <Chips aria-hidden>
              <Chip>React.js</Chip>
              <Chip>AI / ML</Chip>
              <Chip>JavaScript</Chip>
              <Chip>Python</Chip>
              <Chip>SQL</Chip>
              <Chip>MongoDB</Chip>
              <Chip>Node.js</Chip>
              <Chip>AI Agents</Chip>
              <Chip>Kaggle Notebooks</Chip>
              <Chip>GitHub Pages</Chip>
            </Chips>

            <Blocks>
              <Block>
                <h4>Experience</h4>
                <p>
                  Hands on experience building and deploying real world web applications using React and modern styling systems. I focus on writing clean, readable code, structuring components for reuse, and debugging issues logically by understanding root causes rather than applying quick fixes. Comfortable using Git-based workflows and iterating on features based on practical constraints.
                </p>
              </Block>

              <Block>
                <h4>Learning</h4>
                <p>
                  Continuously strengthening my understanding of system design fundamentals, scalable frontend architecture, and modern AI-agent workflows. I’m particularly interested in how better component design, tooling, and automation can improve developer productivity and application reliability as systems grow.
                </p>
              </Block>
            </Blocks>

            <Actions>              
              <a
                href="https://www.kaggle.com/shyamkumar8"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--accent)", fontWeight: 700 }}
              >
                Kaggle Profile →
              </a>
              <a
                href="https://www.linkedin.com/in/shyam-kumar-dev"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--accent)", fontWeight: 700 }}
              >
                LinkedIn →
              </a> 
            </Actions>
          </Card>
        </ContentWrap>
      </Grid>
    </Section>
  );
}
