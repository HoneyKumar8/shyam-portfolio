// src/components/Contact.js
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {  
  FaLinkedin,
  FaEnvelope,  
  FaDiscord,
  FaPhone,
} from "react-icons/fa";

/*
  Background image included from local path (you provided):
  /mnt/data/6c6e72d5-8661-42ff-90dc-0a58af552b1a.png
  The environment will transform this path to a usable URL for the site build.
*/
const BACKGROUND_IMAGE = '/mnt/data/6c6e72d5-8661-42ff-90dc-0a58af552b1a.png';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const toastIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Section = styled.section`
  padding: 72px 0;
  background-image: url('${BACKGROUND_IMAGE}');
  background-size: cover;
  background-position: center;
  position: relative;
  color: var(--text);

  &::before {
    /* subtle overlay to ensure text contrast */
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(20,14,26,0.75), rgba(10,6,10,0.82));
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 2;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 28px;
  .section-sub {
    color: var(--accent);
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 8px;
    font-size: 22px;
  }
  .section-head {
    font-size: 26px;
    margin: 0;
    color: var(--text);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 34px;
  align-items: start;
  animation: ${fadeUp} 420ms ease both;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.surface || "rgba(255,255,255,0.02)"};
  border-radius: 16px;
  padding: 22px;
  box-shadow: ${({ theme }) => theme.cardShadow || "0 10px 30px rgba(0,0,0,0.6)"};
  border: 1px solid rgba(255,255,255,0.03);
`;

const ContactTitle = styled.h3`
  margin: 0;
  color: var(--text);
  font-size: 24px;
  font-weight: 700;
`;

const Muted = styled.p`
  margin-top: 12px;
  color: var(--muted);
  line-height: 1.5;
  font-size: 18px;
`;

const InfoRow = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text);
  font-weight: 600;
  font-size: 22px;
  svg { color: var(--accent); min-width: 18px; }
`;

const Small = styled.div`
  font-size: 20px;
  color: var(--muted);
  margin-top: 8px;
  display:flex;
  gap:8px;
  align-items:center;
`;

const Social = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 14px;

  a {
    display: inline-flex;
    align-items:center;
    justify-content:center;
    width:56px;
    height:56px;
    border-radius: 10px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.03);
    color: var(--text);
    transition: transform .15s ease, color .15s ease, box-shadow .15s ease;
    text-decoration: none;
  }

  a:hover, a:focus {
    transform: translateY(-6px);
    color: white;
    box-shadow: 0 8px 24px rgba(255, 0, 95, 0.14);
    outline: none;
  }
`;

const Form = styled.form`
  display:block;
`;

const Label = styled.label`
  font-size: 22px;
  color: var(--muted);
  display:block;
  margin-bottom: 8px;
`;

const Control = styled.input`
  width:100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.06);
  background: ${({ theme }) => (theme?.name === "light" ? "rgba(16,22,26,0.03)" : "rgba(255,255,255,0.02)")};
  color: var(--text);
  margin-bottom: 12px;
  &:focus { box-shadow: 0 0 0 6px ${({ theme }) => theme?.ringColor || "rgba(255,0,95,0.07)"}; outline:none; border-color: var(--accent); }
  font-size: 20px;
`;

const TextArea = styled.textarea`
  width:100%;
  min-height:110px;
  padding: 12px 14px;
  font-size: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.06);
  background: ${({ theme }) => (theme?.name === "light" ? "rgba(16,22,26,0.03)" : "rgba(255,255,255,0.02)")};
  color: var(--text);
  margin-bottom: 12px;
  resize: vertical;
  &:focus { box-shadow: 0 0 0 6px ${({ theme }) => theme?.ringColor || "rgba(255,0,95,0.07)"}; outline:none; border-color: var(--accent); }
`;

const ActionRow = styled.div`
  display:flex;
  align-items:center;
  gap:12px;
  margin-top:6px;
`;

const Button = styled.button`
  background: var(--accent);
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(255, 0, 95, 0.14);
  transition: transform .12s ease, box-shadow .12s ease;
  &:hover { transform: translateY(-4px); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform:none; box-shadow:none; }
`;

const Chip = styled.button`
  padding: 8px 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.03);
  color: var(--text);
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  display:inline-flex;
  gap:8px;
  align-items:center;
  svg { color: var(--accent); }
  &:hover { transform: translateY(-4px); }
`;

const Feedback = styled.div`
  margin-left:6px;
  font-size: 22px;
  color: ${({ success }) => (success ? "#86efac" : "#f87171")};
  font-weight: 600;
`;

/* Toast (popup) shown bottom-right */
const Toast = styled.div`
  position: fixed;
  right: 24px;
  bottom: 28px;
  min-width: 240px;
  max-width: 360px;
  padding: 12px 16px;
  background: ${({ success }) => (success ? "linear-gradient(90deg,#0ea5a4,#86efac)" : "linear-gradient(90deg,#fb7185,#f97316)")};
  color: #021;
  border-radius: 12px;
  box-shadow: 0 12px 36px rgba(2,6,23,0.6);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${toastIn} 260ms ease;
  z-index: 9999;
`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [clipboardMsg, setClipboardMsg] = useState("");
  const [toast, setToast] = useState(null); // { type: 'success'|'error', text }

  const FS_ENDPOINT = "https://formspree.io/f/movzaaed"; // your Formspree endpoint

  // auto-dismiss toast after a few seconds
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return false;
    // basic email check
    const re = /\S+@\S+\.\S+/;
    if (!re.test(form.email)) return false;
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      setToast({ type: "error", text: "Please fill all fields with a valid email." });
      return;
    }

    setLoading(true);
    setStatus(null);

    // Build FormData to avoid Content-Type / CORS boundary issues
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("_replyto", form.email); // Formspree recognizes _replyto
    fd.append("message", form.message);

    try {
      const response = await fetch(FS_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" }, // do NOT set Content-Type when sending FormData
        body: fd,
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setToast({ type: "success", text: "Message sent — thank you!" });
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus("error");
        setToast({ type: "error", text: "Submission failed. Please try again." });
        console.error("Form submit error:", data);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setToast({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
      setTimeout(() => setClipboardMsg(""), 3000);
    }
  }

  async function copyToClipboard(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setClipboardMsg(`${label} copied`);
      // clear message after 2.5s
      setTimeout(() => setClipboardMsg(""), 2500);
    } catch {
      setClipboardMsg("Copy failed");
      setTimeout(() => setClipboardMsg(""), 2500);
    }
  }

  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeader>
          <div className="section-sub">CONTACT</div>
          <h2 id="contact-heading" className="section-head">Let's Build Something Together</h2>
        </SectionHeader>

        <Grid>
          {/* Left card: Contact details */}
          <div>
            <Card aria-labelledby="contact-details-title">
              <ContactTitle id="contact-details-title">Contact Details</ContactTitle>
              <Muted>Feel free to reach out for Hiring, freelance work, collaborations.</Muted>

              <InfoRow>
                <FaEnvelope aria-hidden />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700 }}>s.shyam_kumar@outlook.com</span>
                    <Chip
                      type="button"
                      aria-label="Copy email to clipboard"
                      onClick={() => copyToClipboard("s.shyam_kumar@outlook.com", "Email")}
                    >
                      <FaEnvelope /> Copy
                    </Chip>
                  </div>
                  <Small>Preferred response within 24 - 48 hours</Small>
                </div>
              </InfoRow>

              <InfoRow>
                <FaPhone aria-hidden />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700 }}>+91 76660893848</span>
                    <Chip
                      type="button"
                      aria-label="Copy phone number to clipboard"
                      onClick={() => copyToClipboard("+91 76660893848", "Phone")}
                    >
                      <FaPhone /> Copy
                    </Chip>
                  </div>
                  <Small>WhatsApp / Call</Small>
                </div>
              </InfoRow>

              <Social aria-label="Social links">
                <a
                  href="https://www.linkedin.com/in/shyam-kumar-surakattula-278ba826b"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn profile"
                >
                  <FaLinkedin />
                </a>
                <a href="mailto:s.shyam_kumar@outlook.com" aria-label="Send an email">
                  <FaEnvelope />
                </a>                
                <a
                  href="https://discord.gg/SnWs8knT"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Discord invite"
                >
                  <FaDiscord />
                </a>
              </Social>

              {clipboardMsg && (
                <Small role="status" aria-live="polite" style={{ marginTop: 12 }}>
                  {clipboardMsg}
                </Small>
              )}
            </Card>
          </div>

          {/* Right card: Contact form */}
          <Card aria-labelledby="contact-form-title">
            <ContactTitle id="contact-form-title">Send a Message</ContactTitle>

            <Form onSubmit={handleSubmit} noValidate>
              <div style={{ marginTop: 14 }}>
                <Label htmlFor="name">Your Name</Label>
                <Control
                  id="name"
                  name="name"
                  placeholder="John Appleseed"
                  value={form.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />

                <Label htmlFor="email">Your Email</Label>
                <Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />

                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  placeholder="Convey your Message here"
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />

                <ActionRow>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  {/* keep inline feedback for screen readers (visually visible as before is optional) */}
                  <span style={{ display: "none" }} aria-live="polite">
                    {status === "success" ? "Message sent — thank you!" : status === "error" ? "Please check the fields and try again." : ""}
                  </span>
                </ActionRow>

                <Small style={{ marginTop: 12 }}>
                  By sending a message you agree to be contacted regarding your request. No spam — ever.
                </Small>
              </div>
            </Form>
          </Card>
        </Grid>
      </div>

      {/* Toast notification - appears on success/error and auto-dismisses */}
      {toast && (
        <Toast success={toast.type === "success"} role="status" aria-live="polite">
          <div style={{ fontWeight: 800 }}>{toast.type === "success" ? "Success" : "Error"}</div>
          <div style={{ opacity: 0.95 }}>{toast.text}</div>
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={() => setToast(null)}
              style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", fontWeight:700 }}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        </Toast>
      )}
    </Section>
  );
}
