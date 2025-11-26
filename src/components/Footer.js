// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaCertificate, FaDiscord, FaKaggle } from 'react-icons/fa';

const F = styled.footer`
  padding: 28px 0;
  border-top: 1px solid ${({theme}) => theme.glass};
  margin-top: 24px;
`;
const Row = styled.div`
  max-width: 2400px;
  margin: 0 auto;
  padding: 0px 46px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
`;
const Social = styled.div`
  display:flex;
  gap:14px;
  align-items:center;
  .icon {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:40px; height:40px; border-radius:999px;
    background: ${({theme}) => (theme.accent ? `${theme.accent}22` : 'rgba(0,0,0,0.04)')};
    transition: transform .14s ease, background .14s ease, box-shadow .14s ease;
    color: ${({theme}) => theme.text};
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
  }
  .icon:hover {
    transform: translateY(-6px) scale(1.04);
    background: ${({theme}) => (theme.accent ? `${theme.accent}44` : 'rgba(0,0,0,0.08)')};
    color: #fff;
    box-shadow: 0 12px 28px ${({theme}) => (theme.accent ? `${theme.accent}31` : 'rgba(0,0,0,0.18)')};
  }
`;

const FooterName = styled.div`
  font-size: clamp(8px, 0.6rem + 0.8vw, 22px);
  position: relative;
  transition: transform 0.22s ease, text-shadow 0.22s ease;
  color: var(--muted);
`;

export default function Footer(){
  return (
    <F>
      <Row>
        <FooterName>© {new Date().getFullYear()} S. Shyam Kumar</FooterName>
        <Social className="social-icons">
          <a className="icon" href="https://github.com/HoneyKumar8" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={22}/></a>
          <a className="icon" href="https://www.linkedin.com/in/shyam-kumar-surakattula-278ba826b" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={22}/></a>
          <a className="icon" href="mailto:s.shyam_kumar@outlook.com" aria-label="Email"><FaEnvelope size={22}/></a>
          <a className="icon" href="https://www.credly.com/users/shyam-kumar-surakattula" target="_blank" rel="noreferrer" aria-label="Credly"><FaCertificate size={22}/></a>
          <a className="icon" href="https://discord.gg/SnWs8knT" target="_blank" rel="noreferrer" aria-label="Discord"><FaDiscord size={22}/></a>
          <a className="icon" href="https://www.kaggle.com/shyamkumar8" target="_blank" rel="noreferrer" aria-label="Kaggle"><FaKaggle size={22}/></a>
          
        </Social>
      </Row>
    </F>
  );
}
