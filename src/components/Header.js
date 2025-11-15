import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #0f0f0f;
  color: white;
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
  a {
    color: #ff007f;
    font-weight: bold;
  }
`;

export default function Header() {
  return (
    <Nav>
      <h2>Shyam Kumar</h2>
      <Links>
        <a href="#about">About</a>
        <a href="#resume">Resume</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#certifications">Certifications</a>
        <a href="#contact">Contact</a>
        <a href="#hire">Hire Me</a>
      </Links>
    </Nav>
  );
}
