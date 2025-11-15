import React from 'react';
import styled from 'styled-components';
import heroImage from '../assets/images/shyamHomepage.jpg';

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  padding: 2rem;
  background: #1a1a1a;
`;

const Text = styled.div`
  flex: 1;
  color: white;
  h1 {
    color: #ff007f;
  }
`;

const Image = styled.img`
  width: 250px;
  border-radius: 50%;
  border: 4px solid #ff007f;
`;

export default function Hero() {
  return (
    <HeroSection>
      <Text>
        <h1>Surakattula Shyam Kumar</h1>
        <p>Versatile full-stack developer with a passion for modular systems and habit-driven design.</p>
        <button>Download Resume</button>
        <button>Contact Me</button>
      </Text>
      <Image src={heroImage} alt="Shyam Kumar" />
    </HeroSection>
  );
}
