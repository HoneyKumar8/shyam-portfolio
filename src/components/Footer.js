import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
  text-align: center;
  padding: 1rem;
  background: #111;
  color: white;
`;

export default function Footer() {
  return (
    <Foot>
      © {new Date().getFullYear()} Surakattula Shyam Kumar
    </Foot>
  );
}
