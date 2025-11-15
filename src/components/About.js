import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem;
  background: #121212;
  color: white;
`;

export default function About() {
  return (
    <Section id="about">
      <h2>About Me</h2>
      <p>
        I'm Shyam Kumar, a systems-oriented beginner transitioning from operations to software engineering.
        I specialize in building scalable web applications and secure APIs, and I'm currently focused on
        developing a Habit Tracker and Password Manager.
      </p>
    </Section>
  );
}
