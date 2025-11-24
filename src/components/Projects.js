// src/components/Projects.js
import React from 'react';
import styled from 'styled-components';
import habitImg from '../assets/images/habitTracker.jpg';
import passwordImg from '../assets/images/passwordManager.jpg';
import editorImg from '../assets/images/textEditor.jpg';
import apiImg from '../assets/images/apiProject.jpg';

const Section = styled.section` padding:40px 0; `;
const Grid = styled.div`
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
`;
const Card = styled.div`
  background: var(--surface);
  padding: 20px;
  border-radius: 12px;
  box-shadow: ${({theme}) => theme.cardShadow};
  transition: transform .22s ease;
  &:hover { transform: translateY(-8px); }
`;
const ImgWrap = styled.div`
  width: 100%; height:200px; overflow:hidden; border-radius:10px; margin-bottom:14px;
  img{ width:100%; height:100%; object-fit:cover; }
`;
const Tag = styled.div` font-size:13px; color:var(--accent); font-weight:700; margin-bottom:8px; `;
const Title = styled.h3` margin:0 0 8px; color:var(--text); `;
const Desc = styled.p` margin:0; color:var(--muted); line-height:1.5; `;

export default function Projects(){
  const list = [
    { id:1, title:"React Text Editor App", tag:"Frontend / React", desc:"A responsive editor with formatting tools and live preview.", img: editorImg },
    { id:2, title:"Portfolio API (Node + PostgreSQL)", tag:"Backend / API", desc:"REST API with JWT auth, Docker and Postman-tested workflows.", img: apiImg },
    { id:3, title:"Habit Tracker (In Progress)", tag:"Planned", desc:"Daily habit tracking, streaks and analytics.", img: habitImg },
    { id:4, title:"Password Manager (In Progress)", tag:"Planned", desc:"Secure password storage with encryption and generator.", img: passwordImg },
  ];

  return (
    <Section id="projects">
      <div className="container">
        <p className="section-sub">MY WORK</p>
        <h2 className="section-head">Recent Projects & Ongoing Builds</h2>

        <Grid>
          {list.map(p => (
            <Card key={p.id}>
              <ImgWrap><img src={p.img} alt={p.title} /></ImgWrap>
              <Tag>{p.tag}</Tag>
              <Title>{p.title}</Title>
              <Desc>{p.desc}</Desc>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
