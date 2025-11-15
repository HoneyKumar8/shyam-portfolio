import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem;
  background: #333;
  color: white;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
  input, textarea {
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
  }
`;

export default function Contact() {
  return (
    <Section id="contact">
      <h2>Contact Me</h2>
      <p>Phone: +91 76660893848 | Email: s.shyam_kumar@outlook.com</p>
      <Form>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Subject" />
        <textarea rows="4" placeholder="Message"></textarea>
        <button type="submit">Send Message</button>
      </Form>
    </Section>
  );
}
