// script.js
const container = document.getElementById("tablesContainer");
const statusEl = document.getElementById("status");

/**
 * Helper: return data object – ofwel dummyData, ofwel fetched API data.
 */
async function loadData() {
  if (typeof USE_DUMMY_DATA === "undefined") {
    throw new Error("USE_DUMMY_DATA niet gevonden – controleer config.js");
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
 * Bepaal 'rijk' van een item op basis van CUSTOM_PARK_AREA_MAP
 */
function getParkArea(item) {
  if (!item) return "Onbekend";
  const ext = item.externalId;
  if (ext && typeof CUSTOM_PARK_AREA_MAP === "object" && CUSTOM_PARK_AREA_MAP[ext]) {
    return CUSTOM_PARK_AREA_MAP[ext].rijk || "Onbekend";
  }
  if (item.parkArea) return item.parkArea;
  return "Onbekend";
}

/**
 * Haal attractie informatie op (nummer en afbeelding)
 */
function getAttractionInfo(item) {
  if (!item || !item.externalId) return null;
  const ext = item.externalId;
  if (typeof CUSTOM_PARK_AREA_MAP === "object" && CUSTOM_PARK_AREA_MAP[ext]) {
    return {
      nummer: CUSTOM_PARK_AREA_MAP[ext].nummer || null,
      afbeelding: CUSTOM_PARK_AREA_MAP[ext].afbeelding || null,
      rijk: CUSTOM_PARK_AREA_MAP[ext].rijk || "Onbekend"
    };
  }
  return null;
}

/**
 * Bepaal de status message op basis van item status
 * Returns: { text: string, style: "geel" | "grijs" } of null
 */
function getStatusMessage(item) {
  if (!item || !item.status) return null;
  const status = item.status;
  
  // Check voor OPERATING met null waitTime
  if (status === "OPERATING" && item.queue && item.queue.STANDBY && item.queue.STANDBY.waitTime === null) {
    if (typeof STATUS_MESSAGES === "object" && STATUS_MESSAGES["OPERATING_NULL"]) {
      return STATUS_MESSAGES["OPERATING_NULL"];
    }
  }
  
  if (typeof STATUS_MESSAGES === "object" && STATUS_MESSAGES[status]) {
    return STATUS_MESSAGES[status];
  }
  
  return null;
}

/**
 * Check of alle shows voorbij zijn en return custom message
 */
function getNoMoreShowsMessage(item) {
  if (!item || item.entityType !== "SHOW") return null;
  
  const showtimes = item.showtimes || [];
  if (showtimes.length === 0) return null;
  
  const now = new Date();
  const upcoming = showtimes
    .map(s => ({ raw: s, time: s.startTime ? new Date(s.startTime) : null }))
    .filter(x => x.time instanceof Date && !isNaN(x.time) && x.time > now);
  
  if (upcoming.length === 0) {
    // Alle shows zijn voorbij
    if (typeof STATUS_MESSAGES === "object" && STATUS_MESSAGES["NO_MORE_SHOWS"]) {
      return STATUS_MESSAGES["NO_MORE_SHOWS"];
    }
    return { text: "Vandaag geen shows meer", style: "grijs" };
  }
  
  return null;
}

/**
 * Check of een item verborgen moet worden op basis van configuratie
 */
function shouldHideItem(item) {
  if (!item) return true;
  
  const status = item.status;
  const isAttraction = item.entityType === "ATTRACTION";
  const waitTime = isAttraction && item.queue && item.queue.STANDBY ? item.queue.STANDBY.waitTime : undefined;
  
  // Check HIDE_NULL_WAIT_TIME
  if (typeof HIDE_NULL_WAIT_TIME !== "undefined" && HIDE_NULL_WAIT_TIME && waitTime === null) {
    return true;
  }
  
  // Check HIDE_OPERATING_NULL
  if (typeof HIDE_OPERATING_NULL !== "undefined" && HIDE_OPERATING_NULL && status === "OPERATING" && waitTime === null) {
    return true;
  }
  
  // Check HIDE_REFURBISHMENT
  if (typeof HIDE_REFURBISHMENT !== "undefined" && HIDE_REFURBISHMENT && status === "REFURBISHMENT") {
    return true;
  }
  
  // Check HIDE_CLOSED
  if (typeof HIDE_CLOSED !== "undefined" && HIDE_CLOSED && status === "CLOSED") {
    return true;
  }
  
  return false;
}

/**
 * Rendert een sectie (rijk) met een tabel.
 */
function renderParkAreaTable(rijk, items) {
  const section = document.createElement("section");
  section.className = "park-section";

  // Container voor afbeelding + tabel (voor overlap positioning)
  const contentWrapper = document.createElement("div");
  contentWrapper.className = "content-wrapper";

  // Voeg rijk afbeelding toe als deze bestaat
  if (typeof RIJK_IMAGES === "object" && RIJK_IMAGES[rijk]) {
    const imgWrap = document.createElement("div");
    imgWrap.className = "rijk-image-container";
    
    // Pas styling toe vanuit config
    if (typeof IMAGE_STYLING === "object") {
      if (IMAGE_STYLING.overlapMode) {
        imgWrap.style.position = "relative";
        imgWrap.style.zIndex = "10";
        imgWrap.style.marginBottom = IMAGE_STYLING.overlapOffset || "0px";
      } else {
        if (IMAGE_STYLING.marginTop) imgWrap.style.marginTop = IMAGE_STYLING.marginTop;
        if (IMAGE_STYLING.marginBottom) imgWrap.style.marginBottom = IMAGE_STYLING.marginBottom;
      }
    }
    
    const img = document.createElement("img");
    img.src = RIJK_IMAGES[rijk];
    img.alt = rijk;
    img.className = "rijk-image";
    
    // Pas image styling toe
    if (typeof IMAGE_STYLING === "object") {
      if (IMAGE_STYLING.maxWidth) img.style.maxWidth = IMAGE_STYLING.maxWidth;
      if (IMAGE_STYLING.maxHeight) img.style.maxHeight = IMAGE_STYLING.maxHeight;
      if (IMAGE_STYLING.borderRadius) img.style.borderRadius = IMAGE_STYLING.borderRadius;
    }
    
    imgWrap.appendChild(img);
    contentWrapper.appendChild(imgWrap);
  }

  const tableWrapper = document.createElement("div");
  tableWrapper.className = "table-with-header";

  // Voeg header toe als SHOW_RIJK_TITLE true is
  if (typeof SHOW_RIJK_TITLE === "undefined" || SHOW_RIJK_TITLE === true) {
    const header = document.createElement("div");
    header.className = "section-header";
    header.textContent = rijk;
    
    // Pas de achtergrondkleur aan op basis van RIJK_COLORS
    if (typeof RIJK_COLORS === "object" && RIJK_COLORS[rijk]) {
      header.style.backgroundColor = RIJK_COLORS[rijk];
    }
    
    // Pas font aan
    if (typeof FONTS === "object" && FONTS.sectionHeader) {
      header.style.fontFamily = FONTS.sectionHeader;
    }
    
    tableWrapper.appendChild(header);
  }

  const wrap = document.createElement("div");
  wrap.className = "table-wrap";

  const table = document.createElement("table");
  
  // Voeg class toe voor styling wanneer header row verborgen is
  if (typeof SHOW_HEADER_ROW !== "undefined" && SHOW_HEADER_ROW === false) {
    table.classList.add("no-header-row");
  }
  
  // Alleen thead toevoegen als SHOW_HEADER_ROW true is
  if (typeof SHOW_HEADER_ROW === "undefined" || SHOW_HEADER_ROW === true) {
    const thead = document.createElement("thead");
    thead.innerHTML = `<tr><th>Naam</th><th>Wachttijd / Show</th></tr>`;
    table.appendChild(thead);
  }

  const tbody = document.createElement("tbody");

  // Sort items alphabetically by name
  items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  items.forEach((item, idx) => {
    // Check of we deze rij moeten verbergen
    if (shouldHideItem(item)) return;
    
    // Check of we deze rij moeten tonen op basis van entityType
    const isShow = item.entityType === "SHOW";
    const isAttraction = item.entityType === "ATTRACTION";
    
    const shouldShowRow = (isShow && (typeof SHOW_SHOW_ROWS === "undefined" || SHOW_SHOW_ROWS === true)) ||
                         (isAttraction && (typeof SHOW_ATTRACTION_ROWS === "undefined" || SHOW_ATTRACTION_ROWS === true));
    
    if (!shouldShowRow) return;
    
    const tr = document.createElement("tr");
    tr.classList.add("standard-row");

    const nameTd = document.createElement("td");
    nameTd.className = "name-cell";
    
    // Voeg attractie/show info toe (nummer en afbeelding)
    const info = getAttractionInfo(item);
    
    if (info) {
      // Nummer cirkel (alleen als nummer niet null is)
      if (info.nummer !== null) {
        const numCircle = document.createElement("div");
        numCircle.className = "number-circle";
        numCircle.textContent = info.nummer;
        
        // Pas kleuren aan per rijk
        if (typeof RIJK_NUMBER_COLORS === "object" && RIJK_NUMBER_COLORS[rijk]) {
          numCircle.style.backgroundColor = RIJK_NUMBER_COLORS[rijk].background;
          numCircle.style.color = RIJK_NUMBER_COLORS[rijk].text;
        }
        
        // Pas font aan
        if (typeof FONTS === "object" && FONTS.numberCircle) {
          numCircle.style.fontFamily = FONTS.numberCircle;
        }
        
        nameTd.appendChild(numCircle);
      }
      
      // Afbeelding cirkel (alleen als afbeelding niet null is)
      if (info.afbeelding) {
        const imgCircle = document.createElement("div");
        imgCircle.className = "image-circle";
        
        const img = document.createElement("img");
        img.src = info.afbeelding;
        img.alt = item.name || "";
        
        imgCircle.appendChild(img);
        nameTd.appendChild(imgCircle);
      }
    }
    
    // Naam tekst
    const nameText = document.createElement("span");
    nameText.className = "name-text";
    nameText.textContent = item.name || "(onbekend)";
    
    // Pas font aan
    if (typeof FONTS === "object" && FONTS.attractionName) {
      nameText.style.fontFamily = FONTS.attractionName;
    }
    
    nameTd.appendChild(nameText);
    tr.appendChild(nameTd);

    const dataTd = document.createElement("td");

    // Check eerst of er een status message is
    const statusMessage = getStatusMessage(item);
    
    // Voor shows: check of alle shows voorbij zijn
    const noMoreShowsMessage = isShow ? getNoMoreShowsMessage(item) : null;
    
    if (noMoreShowsMessage) {
      // Toon "geen shows meer" message
      const bubble = document.createElement("span");
      bubble.className = noMoreShowsMessage.style === "geel" ? "bubble queue" : "bubble past";
      bubble.textContent = noMoreShowsMessage.text;
      
      // Pas font aan
      if (typeof FONTS === "object" && FONTS.bubbleText) {
        bubble.style.fontFamily = FONTS.bubbleText;
      }
      
      dataTd.appendChild(bubble);
    } else if (statusMessage) {
      // Toon status message in plaats van normale data
      const bubble = document.createElement("span");
      bubble.className = statusMessage.style === "geel" ? "bubble queue" : "bubble past";
      bubble.textContent = statusMessage.text;
      
      // Pas font aan
      if (typeof FONTS === "object" && FONTS.bubbleText) {
        bubble.style.fontFamily = FONTS.bubbleText;
      }
      
      dataTd.appendChild(bubble);
    } else if (isShow) {
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
          
          // Pas font aan
          if (typeof FONTS === "object" && FONTS.bubbleText) {
            bubble.style.fontFamily = FONTS.bubbleText;
          }
          
          dataTd.appendChild(bubble);
        }
      }
    } else if (isAttraction) {
      // attractie => STANDBY waitTime met configureerbare opmaak
      const standby = item.queue && item.queue.STANDBY ? item.queue.STANDBY.waitTime : undefined;
      const bubble = document.createElement("span");
      bubble.className = "bubble queue";
      
      // Gebruik WAIT_TIME_FORMAT voor opmaak
      const prefix = (typeof WAIT_TIME_FORMAT === "object" && WAIT_TIME_FORMAT.prefix) || "";
      const suffix = (typeof WAIT_TIME_FORMAT === "object" && WAIT_TIME_FORMAT.suffix) || " min";
      
      if (standby === null) bubble.textContent = "null";
      else if (standby === undefined) bubble.textContent = "undefined";
      else bubble.textContent = `${prefix}${standby}${suffix}`;
      
      // Pas font aan
      if (typeof FONTS === "object" && FONTS.bubbleText) {
        bubble.style.fontFamily = FONTS.bubbleText;
      }
      
      dataTd.appendChild(bubble);
    } else {
      dataTd.textContent = "-";
    }

    tr.appendChild(dataTd);
    tbody.appendChild(tr);

    // single rider row (if present and attraction row is shown)
    if (isAttraction && shouldShowRow && item.queue && item.queue.SINGLE_RIDER) {
      const srTr = document.createElement("tr");
      srTr.className = "single-rider-row";
      
      // Pas spacing aan
      if (typeof SPACING === "object" && SPACING.singleRiderMarginTop) {
        srTr.style.marginTop = SPACING.singleRiderMarginTop;
      }
      
      const srNameTd = document.createElement("td");
      srNameTd.className = "name-cell";
      
      // Voeg lege cirkels toe voor uitlijning (met display:none)
      const info = getAttractionInfo(item);
      if (info) {
        if (info.nummer !== null) {
          const emptyCircle = document.createElement("div");
          emptyCircle.className = "number-circle empty-circle";
          srNameTd.appendChild(emptyCircle);
        }
        if (info.afbeelding) {
          const emptyCircle = document.createElement("div");
          emptyCircle.className = "image-circle empty-circle";
          srNameTd.appendChild(emptyCircle);
        }
      }
      
      const srText = document.createElement("span");
      srText.className = "name-text single-rider-text";
      srText.textContent = "Single rider";
      
      // Pas font aan
      if (typeof FONTS === "object" && FONTS.singleRider) {
        srText.style.fontFamily = FONTS.singleRider;
      }
      
      srNameTd.appendChild(srText);
      srTr.appendChild(srNameTd);

      const srDataTd = document.createElement("td");
      
      // Check ook voor single rider of er een status message is
      if (statusMessage) {
        const srBubble = document.createElement("span");
        srBubble.className = statusMessage.style === "geel" ? "bubble queue" : "bubble past";
        srBubble.textContent = statusMessage.text;
        
        // Pas font aan
        if (typeof FONTS === "object" && FONTS.bubbleText) {
          srBubble.style.fontFamily = FONTS.bubbleText;
        }
        
        srDataTd.appendChild(srBubble);
      } else {
        const srWait = item.queue.SINGLE_RIDER.waitTime;
        const srBubble = document.createElement("span");
        srBubble.className = "bubble queue";
        
        // Gebruik WAIT_TIME_FORMAT voor opmaak
        const prefix = (typeof WAIT_TIME_FORMAT === "object" && WAIT_TIME_FORMAT.prefix) || "";
        const suffix = (typeof WAIT_TIME_FORMAT === "object" && WAIT_TIME_FORMAT.suffix) || " min";
        
        if (srWait === null) srBubble.textContent = "null";
        else if (srWait === undefined) srBubble.textContent = "undefined";
        else srBubble.textContent = `${prefix}${srWait}${suffix}`;
        
        // Pas font aan
        if (typeof FONTS === "object" && FONTS.bubbleText) {
          srBubble.style.fontFamily = FONTS.bubbleText;
        }
        
        srDataTd.appendChild(srBubble);
      }
      
      srTr.appendChild(srDataTd);
      tbody.appendChild(srTr);
    }
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  tableWrapper.appendChild(wrap);
  contentWrapper.appendChild(tableWrapper);
  section.appendChild(contentWrapper);
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

    // Filter only SHOW and ATTRACTION based on config
    const allItems = data.liveData.filter(it => {
      const isShow = it.entityType === "SHOW";
      const isAttraction = it.entityType === "ATTRACTION";
      const showShows = typeof SHOW_SHOW_ROWS === "undefined" || SHOW_SHOW_ROWS === true;
      const showAttractions = typeof SHOW_ATTRACTION_ROWS === "undefined" || SHOW_ATTRACTION_ROWS === true;
      
      return (isShow && showShows) || (isAttraction && showAttractions);
    });

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