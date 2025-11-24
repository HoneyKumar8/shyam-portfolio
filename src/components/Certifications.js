import React from 'react';
import styled from 'styled-components';
import c1 from '../assets/images/cert1.jpg';
import b1 from '../assets/images/badge1.jpg';

const Section = styled.section`padding:56px 0;`;
const Grid = styled.div`
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`background:${({theme})=>theme.surface}; padding:14px; border-radius:10px; text-align:center;`;

export default function Certifications(){
  const certs = [
    {title:'Oracle APEX', org:'Oracle', img:c1},
    {title:'AWS Educate (ML Foundations)', org:'AWS', img:b1},
    {title:'Credly / NSDC', org:'Various', img:c1}
  ];
  return (
    <Section id="certifications">
      <div className="container">
        <p className="section-sub">CERTIFICATIONS</p>
        <h3 className="section-head">Achievements & Badges</h3>
        <Grid>
          {certs.map(c=>(
            <Card key={c.title}>
              <img src={c.img} alt={c.title} style={{width:'100%', height:140, objectFit:'cover', borderRadius:8}} />
              <h4 style={{marginTop:12}}>{c.title}</h4>
              <div style={{color:'rgba(255,255,255,0.8)'}}>{c.org}</div>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
