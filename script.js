// script.js
const container = document.getElementById("tablesContainer");
const statusEl = document.getElementById("status");

/**
 * Helper: return data object — ofwel dummyData, ofwel fetched API data.
 */
async function loadData() {
  if (typeof USE_DUMMY_DATA === "undefined") {
    throw new Error("USE_DUMMY_DATA niet gevonden — controleer config.js");
  }

  if (USE_DUMMY_DATA) {
    console.log("Gebruik dummy data");
    statusEl.textContent = "Status: dummy data actief";
    return dummyData;
  }

  // live API
  statusEl.textContent = "Status: ophalen live API…";
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error(`API returned ${resp.status}: ${txt}`);
    }
    const json = await resp.json();
    statusEl.textContent = "Status: live data geladen";
    return json;
  } catch (err) {
    statusEl.textContent = "Status: fout bij live API ophalen (zie console)";
    console.error("Fout bij fetch API:", err);
    throw err;
  }
}

/**
 * Bepaal 'rijk' van een item.
 * - Eerst: CUSTOM_PARK_AREA_MAP[externalId]
 * - Daarna: item.parkArea (als aanwezig)
 * - Anders: 'Onbekend'
 *
 * Je kunt CUSTOM_PARK_AREA_MAP in config.js vullen met mappings.
 */
function getParkArea(item) {
  if (!item) return "Onbekend";
  const ext = item.externalId;
  if (ext && typeof CUSTOM_PARK_AREA_MAP === "object" && CUSTOM_PARK_AREA_MAP[ext]) {
    return CUSTOM_PARK_AREA_MAP[ext];
  }
  if (item.parkArea) return item.parkArea;
  // fallback: try parkId mapping? (not set) => Onbekend
  return "Onbekend";
}

/**
 * Rendert een sectie (rijk) met een tabel.
 */
function renderParkAreaTable(rijk, items) {
  const section = document.createElement("section");
  section.className = "park-section";

  const header = document.createElement("div");
  header.className = "section-header";
  header.textContent = rijk;
  section.appendChild(header);

  const wrap = document.createElement("div");
  wrap.className = "table-wrap";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = `<tr><th>Naam</th><th>Wachttijd / Show</th></tr>`;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  // Sort items alphabetically by name
  items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  items.forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.classList.add("standard-row");

    const nameTd = document.createElement("td");
    nameTd.textContent = item.name || "(onbekend)";
    tr.appendChild(nameTd);

    const dataTd = document.createElement("td");

    if (item.entityType === "SHOW") {
      // show => zoek eerstvolgende startTime
      const showtimes = item.showtimes || [];
      if (showtimes.length > 0) {
        const now = new Date();
        // parse startTimes robust
        const upcoming = showtimes
          .map(s => ({ raw: s, time: s.startTime ? new Date(s.startTime) : null }))
          .filter(x => x.time instanceof Date && !isNaN(x.time) && x.time > now)
          .sort((a, b) => a.time - b.time);

        if (upcoming.length > 0) {
          const next = upcoming[0].time;
          const timeStr = next.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
          const bubble = document.createElement("span");
          bubble.className = "bubble future";
          bubble.textContent = timeStr;
          dataTd.appendChild(bubble);
        } else {
          const bubble = document.createElement("span");
          bubble.className = "bubble past";
          bubble.textContent = "Vandaag geen shows meer";
          dataTd.appendChild(bubble);
        }
      } else {
        // geen showtimes array of leeg
        const bubble = document.createElement("span");
        bubble.className = "bubble past";
        bubble.textContent = "Vandaag geen shows meer";
        dataTd.appendChild(bubble);
      }
    } else if (item.entityType === "ATTRACTION") {
      // attractie => literal STANDBY waitTime (can be null)
      const standby = item.queue && item.queue.STANDBY ? item.queue.STANDBY.waitTime : undefined;
      const bubble = document.createElement("span");
      bubble.className = "bubble queue";
      // Show literally the value or the string "null" if null, or "undefined" if missing
      if (standby === null) bubble.textContent = "null";
      else if (standby === undefined) bubble.textContent = "undefined";
      else bubble.textContent = `${standby} min`;
      dataTd.appendChild(bubble);
    } else {
      dataTd.textContent = "-";
    }

    tr.appendChild(dataTd);
    tbody.appendChild(tr);

    // single rider row (if present)
    if (item.queue && item.queue.SINGLE_RIDER) {
      const srTr = document.createElement("tr");
      srTr.className = "single-rider-row";
      const srNameTd = document.createElement("td");
      srNameTd.textContent = "Single rider";
      srTr.appendChild(srNameTd);

      const srDataTd = document.createElement("td");
      const srWait = item.queue.SINGLE_RIDER.waitTime;
      const srBubble = document.createElement("span");
      srBubble.className = "bubble queue";
      if (srWait === null) srBubble.textContent = "null";
      else if (srWait === undefined) srBubble.textContent = "undefined";
      else srBubble.textContent = `${srWait} min`;
      srDataTd.appendChild(srBubble);
      srTr.appendChild(srDataTd);

      tbody.appendChild(srTr);
    }
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  section.appendChild(wrap);
  container.appendChild(section);
}

/**
 * Main loader: groeperen per rijk en renderen
 */
async function loadDashboard() {
  container.innerHTML = ""; // clear
  try {
    const data = await loadData();
    if (!data || !Array.isArray(data.liveData)) {
      container.innerHTML = `<div class="error-box">Data heeft geen liveData array.</div>`;
      return;
    }

    // Filter only SHOW and ATTRACTION
    const allItems = data.liveData.filter(it => it.entityType === "SHOW" || it.entityType === "ATTRACTION");

    // Build map: rijk -> items
    const groups = {};
    // init groups from RIJKEN
    (Array.isArray(RIJKEN) ? RIJKEN : ["Onbekend"]).forEach(r => groups[r] = []);

    allItems.forEach(item => {
      const area = getParkArea(item);
      if (!groups[area]) groups[area] = [];
      groups[area].push(item);
    });

    // render in order of RIJKEN, then any additional
    const ordered = Array.isArray(RIJKEN) ? RIJKEN.concat(Object.keys(groups).filter(k => !RIJKEN.includes(k))) : Object.keys(groups);
    let anyRendered = false;
    ordered.forEach(rijk => {
      const items = groups[rijk] || [];
      if (items.length > 0) {
        renderParkAreaTable(rijk, items);
        anyRendered = true;
      }
    });

    if (!anyRendered) {
      container.innerHTML = `<div class="error-box">Geen shows of attracties gevonden in de dataset.</div>`;
    }
  } catch (err) {
    console.error("Error loadDashboard:", err);
    container.innerHTML = `<div class="error-box">Fout bij laden: ${err.message || err}</div>`;
  }
}

/* start */
loadDashboard();
/* refresh iedere 60 seconden */
setInterval(loadDashboard, 60 * 1000);
