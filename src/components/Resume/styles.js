// src/components/Resume/styles.js
import styled, { keyframes, css } from "styled-components";

/* ---------------- animations ---------------- */
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.06); transform: scale(1); }
  70% { box-shadow: 0 0 0 10px rgba(255,255,255,0); transform: scale(1.04); }
  100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); transform: scale(1); }
`;

/* ---------------- layout containers ---------------- */
export const Section = styled.section`
  padding: 72px 0;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 124px;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

/* Sidebar */
export const Sidebar = styled.aside`
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .tab {
    cursor: pointer;
    padding: 12px 14px;
    border-radius: 10px;
    color: var(--muted);
    font-weight: 700;
    font-size: clamp(18px, 1.4vw, 26px);
    transition: background 180ms, color 180ms, transform 180ms;
  }

  .tab.active {
    color: #fff;
    background: ${({ theme }) => theme?.accent}33;
    transform: translateY(-1px);
  }
`;

/* Content / panel */
export const Content = styled.div`
  position: relative;
  min-height: 220px;
`;

export const Panel = styled.div`
  transition: opacity 360ms ease, transform 360ms ease;
  opacity: 0;
  transform: translateY(10px);
  &.enter {
    opacity: 1;
    transform: translateY(0);
  }
  &.exit {
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme?.surface || "#111"};
  padding: 22px;
  border-radius: 12px;
  margin-bottom: 20px;
  color: var(--text);
`;

export const SubCard = styled.div`
  background: ${({ theme }) =>
    theme?.name === "light" ? "rgba(16,24,40,0.05)" : "rgba(22, 35, 43, 0.47)"};
  padding: 18px;
  border-radius: 10px;
  margin: 24px;
`;

/* ---------------- Modal ---------------- */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:9999;
  padding: 28px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  background: ${({ theme }) => theme?.surface || "#111"};
  border-radius: 12px;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const CloseBtn = styled.button`
  background: ${({ theme }) => theme?.accent};
  color: #fff;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  padding: 14px;
  display:flex;
  justify-content:center;
  align-items:center;

  img, iframe, object {
    max-width:100%;
    max-height: calc(90vh - 120px);
  }
`;

