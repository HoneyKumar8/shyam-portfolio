import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem;
  background: #262626;
  color: white;
`;

export default function Projects() {
  return (
    <Section id="projects">
      <h2>Projects</h2>
      <ul>
        <li><strong>Habit Tracker</strong> – Track habits, set timers, add motivational quotes, and sync with calendar.</li>
        <li><strong>Password Manager</strong> – Store credentials securely, export/import backups, and restrict access.</li>
      </ul>
    </Section>
  );
}
