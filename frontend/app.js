async function analyze() {
    const results = document.getElementById("results");
    results.innerHTML = "<p>Running Gemini reasoning...</p>";
  
    try {
      const res = await fetch("http://127.0.0.1:8001/analyze");
      const data = await res.json();
  
      results.innerHTML = `
        ${renderRisks(data.emerging_risks)}
        ${renderNeeds(data.priority_needs)}
        ${renderSignals(data.coordination_signals)}
        ${renderReasoning(data.reasoning_explanation)}
      `;
    } catch (err) {
      results.innerHTML = "<p>Error fetching analysis</p>";
    }
  }
  
  function renderRisks(risks) {
    return `
      <h2>🚨 Emerging Risks</h2>
      <ul>
        ${risks.map(r => `
          <li>
            <strong>${r.risk}</strong>
            — Severity: <b>${r.severity}</b><br/>
            <small>Trigger: ${r.trigger}</small>
          </li>
        `).join("")}
      </ul>
    `;
  }
  
  function renderNeeds(needs) {
    return `
      <h2>🧩 Priority Needs</h2>
      <ul>
        ${needs.map(n => `
          <li>
            <strong>${n.need}</strong>
            — Urgency: <b>${n.urgency}</b><br/>
            <small>${n.justification}</small>
          </li>
        `).join("")}
      </ul>
    `;
  }
  
  function renderSignals(signals) {
    return `
      <h2>🤝 Coordination Signals</h2>
      <ul>
        ${signals.map(s => `
          <li>
            <strong>${s.signal}</strong>
            — Confidence: <b>${s.confidence}</b><br/>
            <small>${s.implication}</small>
          </li>
        `).join("")}
      </ul>
    `;
  }
  
  function renderReasoning(reasoning) {
    return `
      <h2>🧠 Why Gemini Thinks This</h2>
      <p>${reasoning}</p>
    `;
  }
  