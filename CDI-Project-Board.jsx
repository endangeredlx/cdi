import { useState } from "react";

const projectData = {
  completed: [
    {
      id: "c1",
      title: "CDI Brand Guide",
      category: "Branding",
      description: "Complete brand identity: stacked typography, Oswald font, black/white palette. Updated from Initiative → Institute.",
      date: "Jan 28, 2026",
      tags: ["Branding", "Design"],
    },
    {
      id: "c2",
      title: "CDI Partnership Pitch Deck",
      category: "Presentations",
      description: "11-slide deck covering mission, team, Ghana market, training program, equipment needs, partnership asks, 2026 roadmap.",
      date: "Jan 25, 2026",
      tags: ["Deck", "Partnerships"],
    },
    {
      id: "c3",
      title: "CDI × Illumin8 Partnership Framework",
      category: "Partnerships",
      description: "4-slide deck with finalized MOU terms: curriculum ownership, co-branding, equipment, financials, deployment schedule, exit provisions.",
      date: "Jan 25, 2026",
      tags: ["MOU", "Illumin8"],
    },
    {
      id: "c4",
      title: "Condensed 4-Page Partnership Deck",
      category: "Presentations",
      description: "Title, The Opportunity, The Partnership, 2026 Roadmap + Contact. Quick-share format.",
      date: "Jan 23, 2026",
      tags: ["Deck", "Partnerships"],
    },
    {
      id: "c5",
      title: "US-Adesu → CDI Rebrand Deck",
      category: "Branding",
      description: "Original 9-slide deck rebranded from US-Adesu to CDI logo and identity.",
      date: "Jan 25, 2026",
      tags: ["Branding", "Deck"],
    },
    {
      id: "c6",
      title: "Erica Hayes Bio / Pitch Deck",
      category: "Team",
      description: "Professional bio: Lighting Designer, IATSE 728, ICLS, CBU Professor. 15+ years experience.",
      date: "Project File",
      tags: ["Bio", "Team"],
    },
    {
      id: "c7",
      title: "Keith Bernard Bio",
      category: "Team",
      description: "3 versions (first person concise/detailed, third person). Lighting Designer & Visual Director.",
      date: "Jan 15, 2026",
      tags: ["Bio", "Team"],
    },
    {
      id: "c8",
      title: "Blake Brady Bio",
      category: "Team",
      description: "Full bio + ultra-tight version. Producer & Operations Leader, 10+ years.",
      date: "Jan 15, 2026",
      tags: ["Bio", "Team"],
    },
    {
      id: "c9",
      title: "WhatsApp Response to Nana Kwame",
      category: "Communications",
      description: "\"We love the plan and want to partner. Let's set up a call to align on next steps?\"",
      date: "Jan 26, 2026",
      tags: ["Comms", "Illumin8"],
    },
    {
      id: "c10",
      title: "MOU Terms Finalized",
      category: "Legal",
      description: "All 8 terms defined: scope, branding, equipment, financials, deployment, certification, term (2yr/30-day exit), disputes.",
      date: "Jan 25, 2026",
      tags: ["MOU", "Legal"],
    },
    {
      id: "c11",
      title: "Training Model Defined",
      category: "Curriculum",
      description: "Tier 1: 100 stagehands/quarter (free, 2-day). Tier 2: Specialized 3-day tracks (Lighting, Audio, Video). 2-week deployments.",
      date: "Jan 29, 2026",
      tags: ["Training", "Curriculum"],
    },
    {
      id: "c12",
      title: "Sponsorship Tiers Structure",
      category: "Funding",
      description: "Presenting Sponsor, Equipment Partner, Training Sponsor, Supporting Partner. Target lists for promoters, festivals, manufacturers.",
      date: "Jan 29, 2026",
      tags: ["Funding", "Strategy"],
    },
    {
      id: "c13",
      title: "Domain & Social Handles",
      category: "Digital",
      description: "crewdevelopment.org secured. @crewdevinitiative across platforms.",
      date: "Completed",
      tags: ["Digital", "Branding"],
    },
    {
      id: "c14",
      title: "Ghana Partnership Pitch (Updated)",
      category: "Presentations",
      description: "9-slide deck with Team slide, The Ask slide, equipment value ($150K-$300K), updated 2026 timeline.",
      date: "Jan 16, 2026",
      tags: ["Deck", "Ghana"],
    },
  ],
  inProgress: [
    {
      id: "p1",
      title: "MOU Document Drafting",
      category: "Legal",
      description: "Convert finalized 8-term framework into formal MOU document for Illumin8/Nana Kwame review.",
      priority: "high",
      tags: ["MOU", "Legal"],
      progress: 60,
    },
    {
      id: "p2",
      title: "501(c)(3) Establishment",
      category: "Legal",
      description: "File for nonprofit status. Required for tax-exempt donations and equipment sponsorships.",
      priority: "high",
      tags: ["Legal", "Tax"],
      progress: 15,
    },
    {
      id: "p3",
      title: "Equipment List Finalization",
      category: "Equipment",
      description: "Finalize specs: Moving lights (20-100), LED Fresnels (50-100), consoles (5-10), EcoFlow generators (100-200), truss, PA, LED wall.",
      priority: "high",
      tags: ["Equipment", "Procurement"],
      progress: 40,
    },
    {
      id: "p4",
      title: "Sponsorship Pitch Deck",
      category: "Funding",
      description: "Unified deck for manufacturers (ROE, Absen, MA Lighting, Elation, Robe, d&b, L-Acoustics) and promoters (Live Nation, AEG, BPC).",
      priority: "medium",
      tags: ["Funding", "Deck"],
      progress: 30,
    },
    {
      id: "p5",
      title: "Nana Kwame Follow-Up Call",
      category: "Partnerships",
      description: "Schedule alignment call to review MOU terms, confirm facility details, and finalize deployment timeline.",
      priority: "high",
      tags: ["Illumin8", "Comms"],
      progress: 20,
    },
    {
      id: "p6",
      title: "Government Outreach Strategy",
      category: "Government",
      description: "Target Minister Hon. Abla Dzifa Gomashie. Align with Creative Arts Fund and 'December in GH' initiatives.",
      priority: "medium",
      tags: ["Government", "Ghana"],
      progress: 10,
    },
  ],
  upcoming: [
    {
      id: "u1",
      title: "Vendor Partnerships / Equipment Procurement",
      category: "Equipment",
      quarter: "Q2 2026",
      description: "Secure manufacturer sponsorships. Procure lighting, audio, video, infrastructure equipment. $150K-$300K package.",
      tags: ["Equipment", "Procurement"],
    },
    {
      id: "u2",
      title: "Container Prep & Shipping",
      category: "Logistics",
      quarter: "Q2 2026",
      description: "Pack container in Baltimore. Ship to Accra (3-week transit). Target: June 2026 departure.",
      tags: ["Logistics", "Shipping"],
    },
    {
      id: "u3",
      title: "Illumin8 Facility Setup",
      category: "Operations",
      quarter: "Q3 2026",
      description: "Container arrival in Accra. Equipment inventory, storage setup at Illumin8 facility. Systems check.",
      tags: ["Operations", "Illumin8"],
    },
    {
      id: "u4",
      title: "Training Cohort Recruitment",
      category: "Training",
      quarter: "Q3 2026",
      description: "Recruit 100+ Tier 1 candidates and 15-30 per specialized track. Recent graduates, no experience required for Tier 1.",
      tags: ["Training", "Recruitment"],
    },
    {
      id: "u5",
      title: "First Training Deployment",
      category: "Training",
      quarter: "Q3 2026",
      description: "2-week deployment. Tier 1: Stagehand Fundamentals (2-day, 100 people). Tier 2: Lighting, Audio, Video tracks (3-day each).",
      tags: ["Training", "Deployment"],
    },
    {
      id: "u6",
      title: "December in GH Event Season",
      category: "Production",
      quarter: "Q4 2026",
      description: "2-3 confirmed events. Local trained crews lead shows. Production support for touring acts.",
      tags: ["Events", "Production"],
    },
    {
      id: "u7",
      title: "Local Staffing Hire",
      category: "Operations",
      quarter: "Q3 2026",
      description: "Program director, production coordinator, transportation coordinator, 10 PAs, media team (publicist, social, photo, video).",
      tags: ["Staffing", "Operations"],
    },
    {
      id: "u8",
      title: "Curriculum Documentation",
      category: "Curriculum",
      quarter: "Q2 2026",
      description: "Formalize all 3 tracks: Lighting (GrandMA3, Vectorworks), Audio (FOH, monitors), Video (Resolume, LED walls). Train-the-trainer module.",
      tags: ["Curriculum", "Training"],
    },
    {
      id: "u9",
      title: "Secure Event Commitments",
      category: "Partnerships",
      quarter: "Q2-Q3 2026",
      description: "Lock 2-3 Q4 2026 events for crew deployment. Target: Global Citizen, Rolling Loud, Afro Nation, or local Ghana events.",
      tags: ["Events", "Partnerships"],
    },
    {
      id: "u10",
      title: "Evaluation & Expansion Planning",
      category: "Strategy",
      quarter: "Q4 2026",
      description: "Assess Ghana pilot outcomes. Plan pan-African expansion: Lagos, Nairobi, Johannesburg. Year 2 roadmap.",
      tags: ["Strategy", "Expansion"],
    },
  ],
};

const categoryColors = {
  Branding: { bg: "#2D2520", text: "#D4AF37", border: "#D4AF37" },
  Presentations: { bg: "#1E2530", text: "#6BA3D6", border: "#6BA3D6" },
  Partnerships: { bg: "#1E2B26", text: "#5BAD7A", border: "#5BAD7A" },
  Team: { bg: "#2B1E30", text: "#B07DC9", border: "#B07DC9" },
  Communications: { bg: "#2D2825", text: "#D4956A", border: "#D4956A" },
  Legal: { bg: "#2D2020", text: "#D46A6A", border: "#D46A6A" },
  Curriculum: { bg: "#20282D", text: "#6AB5D4", border: "#6AB5D4" },
  Funding: { bg: "#2D2D20", text: "#C9C46A", border: "#C9C46A" },
  Digital: { bg: "#202D2D", text: "#6AD4C9", border: "#6AD4C9" },
  Equipment: { bg: "#2D2520", text: "#D4AF37", border: "#D4AF37" },
  Government: { bg: "#2B2030", text: "#9A6AD4", border: "#9A6AD4" },
  Logistics: { bg: "#2D2825", text: "#D4956A", border: "#D4956A" },
  Operations: { bg: "#1E2530", text: "#6BA3D6", border: "#6BA3D6" },
  Training: { bg: "#1E2B26", text: "#5BAD7A", border: "#5BAD7A" },
  Production: { bg: "#2D2020", text: "#D46A6A", border: "#D46A6A" },
  Strategy: { bg: "#2D2D20", text: "#C9C46A", border: "#C9C46A" },
};

const priorityColors = {
  high: "#D46A6A",
  medium: "#D4AF37",
  low: "#5BAD7A",
};

export default function CDIProjectBoard() {
  const [activeView, setActiveView] = useState("board");
  const [expandedCard, setExpandedCard] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const allCategories = [
    "All",
    ...new Set([
      ...projectData.completed.map((i) => i.category),
      ...projectData.inProgress.map((i) => i.category),
      ...projectData.upcoming.map((i) => i.category),
    ]),
  ].sort();

  const filterItems = (items) => {
    if (filterCategory === "All") return items;
    return items.filter((i) => i.category === filterCategory);
  };

  const completedFiltered = filterItems(projectData.completed);
  const inProgressFiltered = filterItems(projectData.inProgress);
  const upcomingFiltered = filterItems(projectData.upcoming);

  const stats = {
    completed: projectData.completed.length,
    inProgress: projectData.inProgress.length,
    upcoming: projectData.upcoming.length,
    total:
      projectData.completed.length +
      projectData.inProgress.length +
      projectData.upcoming.length,
  };

  const completionPct = Math.round((stats.completed / stats.total) * 100);

  return (
    <div
      style={{
        fontFamily: "'Oswald', 'Segoe UI', sans-serif",
        background: "#0A0A0A",
        minHeight: "100vh",
        color: "#E8E8E8",
        padding: "0",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1510 100%)",
          borderBottom: "2px solid #D4AF37",
          padding: "24px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "4px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Oswald",
                    fontWeight: 700,
                    fontSize: "28px",
                    letterSpacing: "3px",
                    lineHeight: 1,
                    color: "#FFFFFF",
                  }}
                >
                  CREW
                </div>
                <div
                  style={{
                    fontFamily: "Oswald",
                    fontWeight: 700,
                    fontSize: "28px",
                    letterSpacing: "3px",
                    lineHeight: 1,
                    color: "#FFFFFF",
                  }}
                >
                  DEVELOPMENT
                </div>
                <div
                  style={{
                    fontFamily: "Oswald",
                    fontWeight: 700,
                    fontSize: "28px",
                    letterSpacing: "3px",
                    lineHeight: 1,
                    color: "#FFFFFF",
                  }}
                >
                  INSTITUTE
                </div>
              </div>
              <div
                style={{
                  width: "2px",
                  height: "80px",
                  background: "#D4AF37",
                  margin: "0 8px",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "Oswald",
                    fontWeight: 300,
                    fontSize: "14px",
                    letterSpacing: "4px",
                    color: "#D4AF37",
                    textTransform: "uppercase",
                  }}
                >
                  Project Management Board
                </div>
                <div
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontSize: "13px",
                    color: "#888",
                    marginTop: "4px",
                  }}
                >
                  Ghana Partnership &bull; 2026 Roadmap
                </div>
                <div
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontSize: "12px",
                    color: "#666",
                    marginTop: "2px",
                  }}
                >
                  Diaspora-Driven &bull; Local Crews &bull; Global Standards
                </div>
              </div>
            </div>
          </div>

          {/* STATS BAR */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Oswald",
                  fontSize: "32px",
                  fontWeight: 600,
                  color: "#5BAD7A",
                }}
              >
                {stats.completed}
              </div>
              <div
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#888",
                  textTransform: "uppercase",
                }}
              >
                Completed
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Oswald",
                  fontSize: "32px",
                  fontWeight: 600,
                  color: "#D4AF37",
                }}
              >
                {stats.inProgress}
              </div>
              <div
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#888",
                  textTransform: "uppercase",
                }}
              >
                In Progress
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Oswald",
                  fontSize: "32px",
                  fontWeight: 600,
                  color: "#6BA3D6",
                }}
              >
                {stats.upcoming}
              </div>
              <div
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#888",
                  textTransform: "uppercase",
                }}
              >
                Upcoming
              </div>
            </div>
            <div
              style={{
                width: "1px",
                height: "40px",
                background: "#333",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Oswald",
                  fontSize: "32px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                {completionPct}%
              </div>
              <div
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#888",
                  textTransform: "uppercase",
                }}
              >
                Complete
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div
          style={{
            marginTop: "16px",
            height: "4px",
            background: "#1A1A1A",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${completionPct}%`,
              background: "linear-gradient(90deg, #5BAD7A, #D4AF37)",
              borderRadius: "2px",
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div
        style={{
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #1A1A1A",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "4px" }}>
          {["board", "timeline"].map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              style={{
                fontFamily: "Oswald",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "8px 20px",
                background: activeView === v ? "#D4AF37" : "transparent",
                color: activeView === v ? "#0A0A0A" : "#888",
                border: `1px solid ${activeView === v ? "#D4AF37" : "#333"}`,
                borderRadius: "2px",
                cursor: "pointer",
                fontWeight: activeView === v ? 600 : 400,
                transition: "all 0.2s",
              }}
            >
              {v === "board" ? "◫ Board" : "▸ Timeline"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                fontFamily: "Source Sans Pro",
                fontSize: "11px",
                padding: "4px 12px",
                background:
                  filterCategory === cat
                    ? categoryColors[cat]?.bg || "#D4AF37"
                    : "transparent",
                color:
                  filterCategory === cat
                    ? categoryColors[cat]?.text || "#0A0A0A"
                    : "#666",
                border: `1px solid ${
                  filterCategory === cat
                    ? categoryColors[cat]?.border || "#D4AF37"
                    : "#222"
                }`,
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BOARD VIEW */}
      {activeView === "board" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0",
            padding: "0",
            minHeight: "calc(100vh - 220px)",
          }}
        >
          {/* COMPLETED COLUMN */}
          <div
            style={{
              borderRight: "1px solid #1A1A1A",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#5BAD7A",
                }}
              />
              <span
                style={{
                  fontFamily: "Oswald",
                  fontSize: "14px",
                  letterSpacing: "3px",
                  fontWeight: 500,
                  color: "#5BAD7A",
                }}
              >
                COMPLETED
              </span>
              <span
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "12px",
                  color: "#555",
                  marginLeft: "auto",
                }}
              >
                {completedFiltered.length}
              </span>
            </div>
            {completedFiltered.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setExpandedCard(expandedCard === item.id ? null : item.id)
                }
                style={{
                  background: "#111111",
                  borderLeft: `3px solid ${
                    categoryColors[item.category]?.border || "#5BAD7A"
                  }`,
                  borderRadius: "2px",
                  padding: "14px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  opacity: 0.85,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#E0E0E0",
                      lineHeight: 1.3,
                      flex: 1,
                    }}
                  >
                    ✓ {item.title}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontSize: "10px",
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  {item.date}
                </div>
                {expandedCard === item.id && (
                  <div
                    style={{
                      marginTop: "10px",
                      paddingTop: "10px",
                      borderTop: "1px solid #222",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Source Sans Pro",
                        fontSize: "12px",
                        color: "#AAA",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        flexWrap: "wrap",
                        marginTop: "8px",
                      }}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "9px",
                            letterSpacing: "1px",
                            padding: "2px 8px",
                            background: "#1A1A1A",
                            color: "#888",
                            borderRadius: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* IN PROGRESS COLUMN */}
          <div
            style={{
              borderRight: "1px solid #1A1A1A",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#D4AF37",
                  boxShadow: "0 0 6px #D4AF3766",
                }}
              />
              <span
                style={{
                  fontFamily: "Oswald",
                  fontSize: "14px",
                  letterSpacing: "3px",
                  fontWeight: 500,
                  color: "#D4AF37",
                }}
              >
                IN PROGRESS
              </span>
              <span
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "12px",
                  color: "#555",
                  marginLeft: "auto",
                }}
              >
                {inProgressFiltered.length}
              </span>
            </div>
            {inProgressFiltered.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setExpandedCard(expandedCard === item.id ? null : item.id)
                }
                style={{
                  background: "#131310",
                  borderLeft: `3px solid ${
                    categoryColors[item.category]?.border || "#D4AF37"
                  }`,
                  borderRadius: "2px",
                  padding: "14px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1A1714")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#131310")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#E8E0D0",
                      lineHeight: 1.3,
                      flex: 1,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: priorityColors[item.priority],
                      marginLeft: "8px",
                      marginTop: "4px",
                      flexShrink: 0,
                    }}
                    title={`${item.priority} priority`}
                  />
                </div>
                {/* PROGRESS BAR */}
                <div
                  style={{
                    marginTop: "8px",
                    height: "3px",
                    background: "#1A1A1A",
                    borderRadius: "1px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${item.progress}%`,
                      background: priorityColors[item.priority],
                      borderRadius: "1px",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontSize: "10px",
                    color: "#666",
                    marginTop: "4px",
                    textAlign: "right",
                  }}
                >
                  {item.progress}%
                </div>
                {expandedCard === item.id && (
                  <div
                    style={{
                      marginTop: "8px",
                      paddingTop: "10px",
                      borderTop: "1px solid #222",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Source Sans Pro",
                        fontSize: "12px",
                        color: "#AAA",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        flexWrap: "wrap",
                        marginTop: "8px",
                      }}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "9px",
                            letterSpacing: "1px",
                            padding: "2px 8px",
                            background: "#1A1A1A",
                            color: "#888",
                            borderRadius: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* UPCOMING COLUMN */}
          <div style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#6BA3D6",
                }}
              />
              <span
                style={{
                  fontFamily: "Oswald",
                  fontSize: "14px",
                  letterSpacing: "3px",
                  fontWeight: 500,
                  color: "#6BA3D6",
                }}
              >
                UPCOMING
              </span>
              <span
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "12px",
                  color: "#555",
                  marginLeft: "auto",
                }}
              >
                {upcomingFiltered.length}
              </span>
            </div>
            {upcomingFiltered.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setExpandedCard(expandedCard === item.id ? null : item.id)
                }
                style={{
                  background: "#0F1115",
                  borderLeft: `3px solid ${
                    categoryColors[item.category]?.border || "#6BA3D6"
                  }`,
                  borderRadius: "2px",
                  padding: "14px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  opacity: 0.75,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#C0C8D8",
                      lineHeight: 1.3,
                      flex: 1,
                    }}
                  >
                    {item.title}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Oswald",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color:
                      item.quarter === "Q2 2026"
                        ? "#D4AF37"
                        : item.quarter === "Q3 2026"
                        ? "#6BA3D6"
                        : "#5BAD7A",
                    marginTop: "6px",
                  }}
                >
                  {item.quarter}
                </div>
                {expandedCard === item.id && (
                  <div
                    style={{
                      marginTop: "10px",
                      paddingTop: "10px",
                      borderTop: "1px solid #1A1A1A",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Source Sans Pro",
                        fontSize: "12px",
                        color: "#999",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        flexWrap: "wrap",
                        marginTop: "8px",
                      }}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "9px",
                            letterSpacing: "1px",
                            padding: "2px 8px",
                            background: "#1A1A1A",
                            color: "#666",
                            borderRadius: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIMELINE VIEW */}
      {activeView === "timeline" && (
        <div style={{ padding: "32px" }}>
          {["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"].map((quarter) => {
            const qColor =
              quarter === "Q1 2026"
                ? "#D4AF37"
                : quarter === "Q2 2026"
                ? "#D4956A"
                : quarter === "Q3 2026"
                ? "#6BA3D6"
                : "#5BAD7A";

            const qLabel =
              quarter === "Q1 2026"
                ? "Planning & Foundation"
                : quarter === "Q2 2026"
                ? "Procurement & Shipping"
                : quarter === "Q3 2026"
                ? "Setup & First Training"
                : "Event Season & Evaluation";

            return (
              <div key={quarter} style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Oswald",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: qColor,
                      letterSpacing: "2px",
                    }}
                  >
                    {quarter}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: `linear-gradient(90deg, ${qColor}44, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontSize: "12px",
                      color: "#666",
                      letterSpacing: "1px",
                    }}
                  >
                    {qLabel}
                  </div>
                </div>

                {quarter === "Q1 2026" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    {projectData.inProgress.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          background: "#131310",
                          borderLeft: `3px solid ${priorityColors[item.priority]}`,
                          borderRadius: "2px",
                          padding: "12px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#E8E0D0",
                          }}
                        >
                          ◉ {item.title}
                        </div>
                        <div
                          style={{
                            marginTop: "6px",
                            height: "3px",
                            background: "#1A1A1A",
                            borderRadius: "1px",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${item.progress}%`,
                              background: priorityColors[item.priority],
                              borderRadius: "1px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "10px",
                            color: "#666",
                            marginTop: "4px",
                          }}
                        >
                          {item.progress}% &bull;{" "}
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "8px",
                  }}
                >
                  {projectData.upcoming
                    .filter(
                      (i) =>
                        i.quarter === quarter ||
                        i.quarter?.includes(quarter.split(" ")[0])
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        style={{
                          background: "#0F1115",
                          borderLeft: `3px solid ${
                            categoryColors[item.category]?.border || qColor
                          }`,
                          borderRadius: "2px",
                          padding: "12px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#C0C8D8",
                          }}
                        >
                          ○ {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "Source Sans Pro",
                            fontSize: "11px",
                            color: "#777",
                            marginTop: "4px",
                            lineHeight: 1.4,
                          }}
                        >
                          {item.description}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FOOTER */}
      <div
        style={{
          borderTop: "1px solid #1A1A1A",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div
          style={{
            fontFamily: "Source Sans Pro",
            fontSize: "11px",
            color: "#444",
          }}
        >
          CDI &bull; Building Crews Who Build Shows &bull; Updated Feb 2026
        </div>
        <div
          style={{
            fontFamily: "Source Sans Pro",
            fontSize: "11px",
            color: "#444",
          }}
        >
          Target Launch: Q4 2026 &bull; Accra, Ghana
        </div>
      </div>
    </div>
  );
}
