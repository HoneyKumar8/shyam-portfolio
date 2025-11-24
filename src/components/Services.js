// src/components/Services.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGlobe, FaPaintBrush, FaMobileAlt, FaCogs, FaCreditCard, FaChalkboardTeacher } from 'react-icons/fa';

const Section = styled.section`
  padding: 40px 0;
`;

/* keep using your page container so padding/width matches the rest of the site */
const Inner = styled.div`
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 20px;
`;

const pop = keyframes`
  from { transform: translateY(8px); opacity:0 }
  to   { transform: translateY(0); opacity:1 }
`;

/* Desktop: responsive grid.
   Mobile (<= 880px): FLEX vertical stack (forces one-by-one regardless of overrides) */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 18px;
`;

/* CTA area wrapper — on wide screens it positions to the right, on mobile it stacks & centers */
const CTAWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
  align-items: center;
  margin-top: 22px;

  /* when there's only one column (mobile), center the CTA */
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 14px;
  }
`;

/* If you want the CTA to appear visually connected to the grid on desktop,
   we keep them inside the same parent (Inner) and place CTA below the grid. */

const Card = styled.div`
  background: ${({theme}) => theme.surface};
  padding: 18px;
  border-radius: 12px;
  text-align: center;
  box-shadow: ${({theme}) => theme.cardShadow};
  animation: ${pop} .45s ease both;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  min-height: 140px;

  h4 {
    margin: 10px 0 6px;
    color: var(--text);
    font-size: 15px;
    font-weight: 700;
  }

  p {
    color: ${({theme}) => theme.muted};
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    max-width: 36ch;
  }

  @media (max-width: 880px) {
    width: 100%;
    max-width: 520px;
    text-align: left;
    align-items: flex-start;
    padding: 16px;
  }
`;

const IconWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.02));
  color: var(--accent);
  font-size: 20px;

  @media (max-width: 880px) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
`;

/* subtle pulse used on primary button so it's noticeable */
const pulse = keyframes`
  0% { transform: translateY(0); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
  50% { transform: translateY(-3px); box-shadow: 0 18px 36px rgba(0,0,0,0.14); }
  100% { transform: translateY(0); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
`;

/* Primary CTA */
const PrimaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 30px ${({ theme }) => `${theme.ringColor}22`};
  transition: transform .18s ease, box-shadow .18s ease, opacity .12s ease;
  will-change: transform, box-shadow;

  &:hover, &:focus {
    transform: translateY(-3px);
    box-shadow: 0 20px 48px ${({ theme }) => `${theme.ringColor}33`};
  }

  /* keep a gentle idle pulse to attract attention; reduce intensity on hover */
  animation: ${pulse} 4.2s ease-in-out infinite;
  &:hover { animation-duration: 1.2s; }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Secondary link (subtle) */
const Secondary = styled.a`
  color: ${({ theme }) => theme.accent};
  font-weight: 700;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 10px;

  &:hover { text-decoration: underline; }
`;

/* helper to place CTA to the right visually on wide screens:
   we use an empty spacer element that keeps the grid balanced */
const Spacer = styled.div`
  @media (max-width: 880px) { display: none; }
`;

export default function Services(){
  const data = [
    {title:'Web Development', desc:'Modern, responsive websites and SPAs', icon:<FaGlobe/>},
    {title:'UI/UX Design', desc:'User-focused interfaces and prototypes', icon:<FaPaintBrush/>},
    {title:'App Development', desc:'Mobile and PWA development', icon:<FaMobileAlt/>},
    {title:'API Design', desc:'Secure, scalable REST APIs', icon:<FaCogs/>},
    {title:'Payment Integration', desc:'Payment gateways and flows', icon:<FaCreditCard/>},
    {title:'Mentorship', desc:'Technical mentoring & upskilling', icon:<FaChalkboardTeacher/>},
  ];

  return (
    <Section id="services">
      <Inner>
        <p className="section-sub">I LIKE TO MAKE THINGS EASY AND FUN</p>
        <h2 className="section-head">My Special Services For Business Development</h2>

        <Grid as="div" role="list" aria-label="Services list">
          {data.map(s=>(
            <Card key={s.title} role="article" aria-label={s.title}>
              <IconWrap aria-hidden>{s.icon}</IconWrap>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </Card>
          ))}
        </Grid>

        {/* CTA area: spacer (left) + buttons (right) on desktop; stacked and centered on mobile */}
        <CTAWrap>
          <Spacer />{/* keeps CTA to the right on wide screens */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'flex-end' }}>
            <PrimaryCTA href="#projects" aria-label="See Projects">See Projects →</PrimaryCTA>
            <Secondary href="#contact" aria-label="Contact me">Contact</Secondary>
          </div>
        </CTAWrap>
      </Inner>
    </Section>
  );
}
