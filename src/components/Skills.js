import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem;
  background: #202020;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

export default function Skills() {
  const skills = [
    'JavaScript', 'TypeScript', 'Python', 'SQL', 'React', 'Node.js',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Oracle APEX', 'Styled Components'
  ];

  return (
    <Section id="skills">
      <h2>Skills</h2>
      <Grid>
        {skills.map(skill => <div key={skill}>{skill}</div>)}
      </Grid>
    </Section>
  );
}
