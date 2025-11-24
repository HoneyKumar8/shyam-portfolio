// src/components/Resume/Certifications.js
import React, { useMemo, useState } from "react";
import { SubCard } from "./styles";
import styled from "styled-components";

/* ---------------- Helpers ---------------- */

/**
 * Parse a certificate src/path into { issuer, title }.
 * - Handles bundler names like: Name.2e4dc789e06f6e2853d5.jpg
 * - Conventions supported:
 *    Issuer_Title_With_Underscores.jpg
 *    Issuer Title With Spaces.jpg
 */
function parseCertFilename(src) {
  const raw = String(src).split("/").pop() || String(src);

  // Remove a bundler-inserted hash such as `.2e4dc789e06f6e2853d5` that
  // appears immediately before the final extension.
  // Example: "AI Agents.2e4dc789e06f6e2853d5.jpg" -> "AI Agents.jpg"
  const cleaned = raw.replace(/\.[0-9a-f]{6,}(?=\.[^.]+$)/i, "");

  // Now remove final extension
  const base = cleaned.replace(/\.[^/.]+$/, "");
  // Normalize separators
  const normalized = base.replace(/[-]+/g, " ").trim();

  // If name follows Issuer_Title convention, split on first underscore
  const firstUnd = normalized.indexOf("_");
  if (firstUnd > -1) {
    const issuer = normalized.slice(0, firstUnd).replace(/_/g, " ").trim();
    let title = normalized.slice(firstUnd + 1).replace(/_/g, " ").trim();
    // remove stray trailing dot/hash-like tokens if any remain
    title = title.replace(/\.[0-9a-f]{4,}$/, "").replace(/\.*$/, "").trim();
    return { issuer: issuer || "Unknown", title: title || base };
  }

  // Otherwise try splitting on the first occurrence of two or more spaces or a single space
  const parts = normalized.split(/\s+/);
  if (parts.length > 1) {
    // treat the first part as issuer and the rest as title (best-effort)
    const issuer = parts[0].trim();
    const title = parts.slice(1).join(" ").trim().replace(/\.[0-9a-f]{4,}$/, "").replace(/\.*$/, "").trim();
    return { issuer: issuer || "Unknown", title: title || base };
  }

  // fallback: everything is title
  const title = normalized.replace(/\.[0-9a-f]{4,}$/, "").replace(/\.*$/, "").trim();
  return { issuer: "Unknown", title: title || base };
}

/* ---------------- Styled Components ---------------- */

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin: 12px 0 8px 0;

  .search {
    flex: 1;
    min-width: 180px;
  }

  select, input[type="text"], .btn-filter {
    background: transparent;
    color: var(--muted);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 8px 10px;
    border-radius: 10px;
    font-weight: 600;
  }

  .btn-filter {
    cursor: pointer;
  }
`;

const CertGrid = styled.div`
  display: grid;
  gap: 22px;
  padding-top: 10px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const CertItem = styled.div`
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.06);
  transition: 0.28s ease;
  box-shadow: 0 10px 22px rgba(0,0,0,0.28);
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 18px 36px ${({ theme }) => theme.accent}33;
  }

  .thumb {
    width: 100%;
    height: 150px;
    object-fit: contain;
    border-radius: 8px;
    background: rgba(255,255,255,0.02);
  }

  .meta {
    margin-top: 10px;
    display:flex;
    flex-direction:column;
    gap:6px;
  }

  .title {
    font-weight: 800;
    font-size: 20px;
    color: var(--text);
    line-height: 1.2;
    word-break: break-word;
  }

  .issuer {
    font-size: 18px;
    color: var(--muted);
    font-weight: 600;
  }
`;

/* ---------------- Component ---------------- */

export default function Certifications({
  certSrcs = [],
  openModal,
  isPdf,
  certificationsFallback = []
}) {
  const rawItems = certSrcs.length > 0 ? certSrcs : certificationsFallback;

  const items = useMemo(
    () =>
      rawItems.map((src) => {
        if (typeof src === "object" && src !== null && src.src) {
          const issuer = src.issuer || parseCertFilename(src.src).issuer;
          const title = src.title || parseCertFilename(src.src).title;
          return { src: src.src, issuer, title };
        }

        const parsed = parseCertFilename(src);
        return { src, issuer: parsed.issuer, title: parsed.title };
      }),
    [rawItems]
  );

  const issuers = useMemo(() => {
    const set = new Set(items.map((it) => it.issuer || "Unknown"));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const [filterIssuer, setFilterIssuer] = useState("All");
  const [sortOrder, setSortOrder] = useState("az");
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    let list = items.filter((it) => {
      if (filterIssuer !== "All" && it.issuer !== filterIssuer) return false;
      if (!qLower) return true;
      return it.title.toLowerCase().includes(qLower) || it.issuer.toLowerCase().includes(qLower);
    });

    list.sort((a, b) => {
      if (sortOrder === "az") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return list;
  }, [items, filterIssuer, sortOrder, q]);

  return (
    <>
      <SubCard data-reveal>
        <h4 style={{ color: "var(--accent)", marginBottom: 6, fontSize:20 }}>
          Certifications
        </h4>

        <h2 style={{ margin: "0 0 6px 0", fontSize:22 }}>Verified Certifications & Achievements</h2>

        <p style={{ color: "var(--muted)", marginBottom: 0, fontSize:18 }}>
          Click any certificate to view it.
        </p>
      </SubCard>

      <Controls>
        <input
          className="search"
          type="text"
          placeholder="Search by title or issuer..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search certificates"
        />

        <select
          value={filterIssuer}
          onChange={(e) => setFilterIssuer(e.target.value)}
          aria-label="Filter by issuer"
        >
          {issuers.map((iss) => (
            <option key={iss} value={iss}>
              {iss}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Sort certificates"
        >
          <option value="az">Title: A → Z</option>
          <option value="za">Title: Z → A</option>
        </select>
      </Controls>

      <CertGrid>
        {visible.map((it, idx) => (
          <CertItem
            key={idx}
            data-reveal
            role="button"
            tabIndex={0}
            onClick={() => openModal(it.src)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openModal(it.src);
            }}
            title={`Open ${it.title}`}
            aria-label={`Open certificate "${it.title}" from ${it.issuer}`}
          >
            {!isPdf(it.src) ? (
              <img className="thumb" src={it.src} alt={it.title} loading="lazy" />
            ) : (
              <div className="thumb pdf-preview">PDF Certificate</div>
            )}

            <div className="meta">
              <div className="title">{it.title}</div>
              <div className="issuer">{it.issuer}</div>
            </div>
          </CertItem>
        ))}
      </CertGrid>
    </>
  );
}
