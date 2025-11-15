import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem;
  background: #181818;
  color: white;
`;

export default function Resume() {
  return (
    <Section id="resume">
      <h2>Resume</h2>
      <h3>Professional Summary</h3>
      <p>Full-stack developer with hands-on experience in JavaScript, React, Node.js, and cloud foundations.</p>

      <h3>Technical Experience</h3>
      <ul>
        <li>WNS Global Services – Sr. Associate (2024–2025)</li>
        <li>Renu Communication – Associate (2019)</li>
      </ul>

      <h3>Education</h3>
      <ul>
        <li>B.Sc – MPCs, ACTS Degree College, 2023</li>
        <li>Intermediate – MPC, Sri Chaitanya Jr. College, 2019</li>
        <li>SSC, Sri Chaitanya Techno School, 2016</li>
      </ul>

      <h3>Certifications</h3>
      <p>Oracle APEX, AWS, NSDC, NextWave, Programming Hub, Kaggle, LinkedIn Learning</p>
    </Section>
  );
}
