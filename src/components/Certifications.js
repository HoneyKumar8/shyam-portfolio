import React from 'react';
import styled from 'styled-components';
import cert1 from '../assets/images/cert1.jpg';
import badge1 from '../assets/images/badge1.jpg';

const Section = styled.section`
  padding: 2rem;
  background: #2e2e2e;
  color: white;
`;

const Grid = styled.div`
  display: flex;
  gap: 1rem;
  img {
    width: 150px;
    border: 2px solid #ff007f;
    border-radius: 8px;
  }
`;

export default function Certifications() {
  return (
    <Section id="certifications">
      <h2>Certifications & Badges</h2>
      <Grid>
        <img src={cert1} alt="Certification 1" />
        <img src={badge1} alt="Badge 1" />
      </Grid>
    </Section>
  );
}
