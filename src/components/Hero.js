// src/components/Hero.js
import React from 'react';
import styled from 'styled-components';
import heroImg from '../assets/images/shyamHomepage.jpg';

const Section = styled.section`
  padding-top: 48px;
  padding-bottom: 126px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 48px;
  align-items: center;
  width: 100%;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 22px;
    text-align: center;
  }
`;

/* left column — translucent card to improve readability over background */
const LeftCard = styled.div`
  background: ${({ theme }) =>
    theme.name === 'light'
      ? 'rgba(255,255,255,0.76)'
      : 'rgba(255,255,255,0.03)'};
  
  padding: 42px 38px;                /* increased from ~28px */
  border-radius: 16px;               /* larger radius */
  box-shadow: ${({ theme }) => theme.cardShadow};
  backdrop-filter: ${({ theme }) =>
    theme.name === 'light' ? 'saturate(120%) blur(6px)' : 'none'};
  border: ${({ theme }) =>
    theme.name === 'light'
      ? '1px solid rgba(16,24,40,0.06)'
      : '1px solid rgba(255,255,255,0.06)'};

  transform: scale(1.05);             /* slight size increase */
  transform-origin: left top;

  @media (max-width: 980px) {
    padding: 32px 26px;
    transform: none;
  }
`;


const Right = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.muted};
  font-size: 18px;
  margin: 0 0 8px;
`;

const Name = styled.h1`
  font-size: clamp(42px, 4vw, 64px);
  margin: 0 0 12px;
  color: var(--text);
  letter-spacing: 0.6px;
`;

const Title = styled.h2`
  font-size: clamp(22px, 2vw, 28px);
  color: var(--accent);
  margin: 6px 0 18px;
  font-weight: 700;
`;

const Desc = styled.p`
  max-width: 720px;
  color: var(--text);
  line-height: 1.9;
  font-size: clamp(18px, 1.4vw, 22px);
  margin-bottom: 18px;
`;

const Actions = styled.div`
  margin-top: 26px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 980px) {
    justify-content: center;
  }
`;

const Btn = styled.a`
  padding: 12px 16px;
  border-radius: 10px;
  display: inline-block;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 700;
  background: ${(p) => (p.ghost ? 'transparent' : 'var(--accent)')};
  color: ${(p) => (p.ghost ? 'var(--accent)' : '#fff')};
  border: 1px solid rgba(0, 0, 0, 0.06);
  &:hover {
    transform: translateY(-3px);
  }
`;

export default function Hero() {
  return (
    <Section id="home">
      <div className="container">
        <Wrapper>
          <LeftCard>
            <Sub>HELLO, I'M</Sub>
            <Name>S. SHYAM KUMAR</Name>
            <Title>Versatile Full-Stack Developer</Title>

            <Desc>
              Versatile full-stack developer with hands-on experience across frontend and backend technologies.
              Proficient in JavaScript  , Python and building scalable web applications. Currently building a Habit Tracker and Password Manager.
            </Desc>

            <Actions>
              <Btn href="/resume.pdf" target="_blank" rel="noreferrer">Download Resume</Btn>
              <Btn ghost href="#contact">Contact Me</Btn>
            </Actions>
          </LeftCard>

          <Right>
            <div className="profile-wrap">
              {/* pulsing ring (global styles add the ::after glow) */}
              <div className="profile-ring"></div>

              {/* circular image block — keep relative positioning so ring sits under it */}
              <div style={{
                width: 360,
                height: 360,
                borderRadius: '999px',
                overflow: 'hidden',
                border: '4px solid rgba(255,255,255,0.04)',
                boxShadow: '0 8px 36px rgba(0,0,0,0.24)',
                background: 'var(--surface)'
              }}>
                <img src={heroImg} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </Right>
        </Wrapper>
      </div>
    </Section>
  );
}
