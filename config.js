// ===================================================================
// CONFIGURATIE BESTAND - Efteling Dashboard
// ===================================================================
// Hier kun je alle instellingen aanpassen zonder de code te wijzigen

// -------------------------------------------------------------------
// DATA BRON
// -------------------------------------------------------------------
// Zet op true om lokale dummydata te gebruiken
// Zet op false om live data van de API op te halen
const USE_DUMMY_DATA = false;

// -------------------------------------------------------------------
// LIVE API URL
// -------------------------------------------------------------------
// De URL van de Efteling live data API
const API_URL = "https://api.themeparks.wiki/v1/entity/21776b5a-1444-4924-8ab2-6c66d9219628/live";

// -------------------------------------------------------------------
// RIJKEN (PARK AREAS)
// -------------------------------------------------------------------
// De volgorde hier bepaalt de weergavevolgorde op de pagina
// Items die niet in een rijk zijn toegewezen komen in "Onbekend"
const RIJKEN = [
  "Marerijk", 
  "Reizenrijk", 
  "Ruigrijk", 
  "Anderrijk", 
  "Fantasierijk", 
  "Onbekend"
];

// -------------------------------------------------------------------
// RIJK KLEUREN
// -------------------------------------------------------------------
// Wijs elke rijk een kleur toe voor de sectie header
// Gebruik hex kleuren (bijv. "#006B7F") of CSS kleurnamen (bijv. "blue")
const RIJK_COLORS = {
  "Marerijk": "#006B7F",
  "Reizenrijk": "#8B4513",
  "Ruigrijk": "#2F4F4F",
  "Anderrijk": "#556B2F",
  "Fantasierijk": "#483D8B",
  "Onbekend": "#696969"
};

// -------------------------------------------------------------------
// RIJK NUMMER CIRCLE KLEUREN
// -------------------------------------------------------------------
// Achtergrondkleur en tekstkleur voor de nummercirkels per rijk
const RIJK_NUMBER_COLORS = {
  "Marerijk": { background: "#006B7F", text: "#ffffff" },
  "Reizenrijk": { background: "#8B4513", text: "#ffffff" },
  "Ruigrijk": { background: "#2F4F4F", text: "#ffffff" },
  "Anderrijk": { background: "#556B2F", text: "#ffffff" },
  "Fantasierijk": { background: "#483D8B", text: "#ffffff" },
  "Onbekend": { background: "#696969", text: "#ffffff" }
};

// -------------------------------------------------------------------
// RIJK AFBEELDINGEN
// -------------------------------------------------------------------
// Afbeelding die boven elke rijktabel wordt weergegeven
// Laat leeg ("") om geen afbeelding weer te geven
const RIJK_IMAGES = {
  "Marerijk": "https://www.efteling.com/nl/-/media/images/social-open-graph/1200x628-python-kurkentrekker.jpg",
  "Reizenrijk": "https://www.efteling.com/nl/-/media/images/social-open-graph/1200x628-python-kurkentrekker.jpg",
  "Ruigrijk": "https://www.efteling.com/nl/-/media/images/social-open-graph/1200x628-python-kurkentrekker.jpg",
  "Anderrijk": "https://www.efteling.com/nl/-/media/images/social-open-graph/1200x628-python-kurkentrekker.jpg",
  "Fantasierijk": "https://www.efteling.com/nl/-/media/images/social-open-graph/1200x628-python-kurkentrekker.jpg",
  "Onbekend": ""
};

// -------------------------------------------------------------------
// WEERGAVE INSTELLINGEN
// -------------------------------------------------------------------
// Bepaal welke rijen worden weergegeven in de tabellen
const SHOW_HEADER_ROW = false;      // Zet op false om de tabelkop (Naam | Wachttijd/Show) te verbergen
const SHOW_RIJK_TITLE = false;       // Zet op false om de rijknaam boven elke tabel te verbergen
const SHOW_ATTRACTION_ROWS = true;  // Zet op false om attractie-rijen te verbergen
const SHOW_SHOW_ROWS = true;        // Zet op false om show-rijen te verbergen

// Verberg attracties/shows met specifieke condities
const HIDE_NULL_WAIT_TIME = false;  // Verberg attracties waar waitTime null is
const HIDE_OPERATING_NULL = false;  // Verberg attracties met status OPERATING maar waitTime null
const HIDE_REFURBISHMENT = false;   // Verberg attracties met status REFURBISHMENT
const HIDE_CLOSED = false;          // Verberg attracties met status CLOSED

// -------------------------------------------------------------------
// STATUS BERICHTEN
// -------------------------------------------------------------------
// Berichten die worden weergegeven voor verschillende statussen
// Format: { text: "Bericht", style: "geel" of "grijs" }
const STATUS_MESSAGES = {
  "REFURBISHMENT": { text: "Vandaag Gesloten", style: "grijs" },
  "CLOSED": { text: "Gesloten", style: "grijs" },
  "OPERATING": null,  // null = toon normale wachttijd/showtijd
  "OPERATING_NULL": { text: "Momenteel gesloten", style: "grijs" },
  "NO_MORE_SHOWS": { text: "Vandaag geen shows meer", style: "grijs" }
};

// -------------------------------------------------------------------
// WACHTTIJD OPMAAK
// -------------------------------------------------------------------
// Configureer wat er voor en na het wachttijdgetal komt
const WAIT_TIME_FORMAT = {
  prefix: "± ",        // Wat komt er VOOR het getal (bijv. "± " of "~")
  suffix: " min"       // Wat komt er NA het getal (bijv. " min" of " minuten")
};

// -------------------------------------------------------------------
// CUSTOM RIJK TOEWIJZINGEN
// -------------------------------------------------------------------
// Wijs attracties en shows toe aan rijken via hun externalId
// Format: "externalId": { rijk: "Rijknaam", nummer: 1, afbeelding: "url" }
// 
// BELANGRIJK: 
// - Gebruik exact dezelfde rijknaam als in RIJKEN array
// - Voor SHOWS: nummer en afbeelding zijn optioneel, laat weg of zet op null om te verbergen
// - Als een attractie single rider heeft, gaat die automatisch mee
const CUSTOM_PARK_AREA_MAP = {
  // MARERIJK
  "villavolta": { rijk: "Marerijk", nummer: 1, afbeelding: "https://www.efteling.com/nl/-/media/images/social-open-graph/1200x628-python-kurkentrekker.jpg" },
  "pardoesdetovernar": { rijk: "Marerijk", nummer: null, afbeelding: null },  // Show zonder nummer/afbeelding
  "kinderspoor": { rijk: "Marerijk", nummer: 3, afbeelding: "https://via.placeholder.com/40" },
  "gondoletta": { rijk: "Marerijk", nummer: 4, afbeelding: "https://via.placeholder.com/40" },
  "droomvlucht": { rijk: "Marerijk", nummer: 5, afbeelding: "https://via.placeholder.com/40" },
  "kleuterhof": { rijk: "Marerijk", nummer: 6, afbeelding: "https://via.placeholder.com/40" },
  "archipel": { rijk: "Marerijk", nummer: 7, afbeelding: "https://via.placeholder.com/40" },
  "speelbosnest": { rijk: "Marerijk", nummer: 8, afbeelding: "https://via.placeholder.com/40" },
  "stoomtreinm": { rijk: "Marerijk", nummer: 9, afbeelding: "https://via.placeholder.com/40" },
  "sprookjesbos": { rijk: "Marerijk", nummer: 10, afbeelding: "https://via.placeholder.com/40" },
  "stoomcarrousel": { rijk: "Marerijk", nummer: 11, afbeelding: "https://via.placeholder.com/40" },
  "kindervreugd": { rijk: "Marerijk", nummer: 12, afbeelding: "https://via.placeholder.com/40" },
  
  // REIZENRIJK
  "sirocco": { rijk: "Reizenrijk", nummer: 1, afbeelding: "https://via.placeholder.com/40" },
  "fatamorgana": { rijk: "Reizenrijk", nummer: 2, afbeelding: "https://via.placeholder.com/40" },
  "halvemaen": { rijk: "Reizenrijk", nummer: 3, afbeelding: "https://via.placeholder.com/40" },
  "carnavalfestival": { rijk: "Reizenrijk", nummer: 4, afbeelding: "https://via.placeholder.com/40" },
  "pagode": { rijk: "Reizenrijk", nummer: 5, afbeelding: "https://via.placeholder.com/40" },
  "caro": { rijk: "Reizenrijk", nummer: null, afbeelding: null },  // Show
  "stoomtreinr": { rijk: "Reizenrijk", nummer: 7, afbeelding: "https://via.placeholder.com/40" },
  
  // RUIGRIJK
  "devliegendehollander": { rijk: "Ruigrijk", nummer: 1, afbeelding: "https://via.placeholder.com/40" },
  "python": { rijk: "Ruigrijk", nummer: 2, afbeelding: "https://via.placeholder.com/40" },
  "baron1898": { rijk: "Ruigrijk", nummer: 3, afbeelding: "https://via.placeholder.com/40" },
  "jorisendedraak": { rijk: "Ruigrijk", nummer: 4, afbeelding: "https://via.placeholder.com/40" },
  
  // ANDERRIJK
  "volkvanlaaf": { rijk: "Anderrijk", nummer: 1, afbeelding: "https://via.placeholder.com/40" },
  "volkvanlaafmonorail": { rijk: "Anderrijk", nummer: 2, afbeelding: "https://via.placeholder.com/40" },
  "raveleijn": { rijk: "Anderrijk", nummer: null, afbeelding: null },  // Show
  "diorama": { rijk: "Anderrijk", nummer: 4, afbeelding: "https://via.placeholder.com/40" },
  "fabula": { rijk: "Anderrijk", nummer: 5, afbeelding: "https://via.placeholder.com/40" },
  
  // FANTASIERIJK
  "sprookjesboomerwaseens": { rijk: "Fantasierijk", nummer: null, afbeelding: null },  // Show
  "jokieenjet": { rijk: "Fantasierijk", nummer: null, afbeelding: null },  // Show
  "ontmoeteftelingbewoners": { rijk: "Fantasierijk", nummer: null, afbeelding: null },  // Show
  "eftelingmuseum": { rijk: "Fantasierijk", nummer: 4, afbeelding: "https://via.placeholder.com/40" },
  "doudetuffer": { rijk: "Fantasierijk", nummer: 5, afbeelding: "https://via.placeholder.com/40" },
  "carrouselsantonpieckplein": { rijk: "Fantasierijk", nummer: 6, afbeelding: "https://via.placeholder.com/40" },
  "aquanura": { rijk: "Fantasierijk", nummer: null, afbeelding: null },  // Show
  "sprookjessprokkelaar": { rijk: "Fantasierijk", nummer: null, afbeelding: null },  // Show
  "pirana": { rijk: "Fantasierijk", nummer: 9, afbeelding: "https://via.placeholder.com/40" },
  "vogelrok": { rijk: "Fantasierijk", nummer: 10, afbeelding: "https://via.placeholder.com/40" },
  "antonpieckpleinpoppenkasttheater": { rijk: "Fantasierijk", nummer: null, afbeelding: null },  // Show
  "dansemacabre": { rijk: "Fantasierijk", nummer: 12, afbeelding: "https://via.placeholder.com/40" },
  "symbolica": { rijk: "Fantasierijk", nummer: 13, afbeelding: "https://via.placeholder.com/40" },
  "maxmoritz": { rijk: "Fantasierijk", nummer: 14, afbeelding: "https://via.placeholder.com/40" },
  "virginieenottocharlatan": { rijk: "Fantasierijk", nummer: 6, afbeelding: "https://via.placeholder.com/40" }  // Show
};

// -------------------------------------------------------------------
// FONTS
// -------------------------------------------------------------------
// Custom fonts voor verschillende elementen
// Gebruik Google Fonts of lokale fonts
// Voorbeeld: "Roboto, sans-serif" of "'Courier New', monospace"
// 
// Om Google Fonts te gebruiken:
// 1. Ga naar https://fonts.google.com/
// 2. Selecteer een font (bijv. "Roboto")
// 3. Kopieer de import link (bijv. @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');)
// 4. Plak deze in style.css bovenaan (zie de @import sectie)
// 5. Gebruik hier de fontnaam: "Roboto, sans-serif"

const FONTS = {
  attractionName: "Arial, sans-serif",      // Font voor attractienamen
  singleRider: "Arial, sans-serif",         // Font voor "Single rider" tekst
  bubbleText: "Arial, sans-serif",          // Font voor tekst in de wachttijd bubbels
  numberCircle: "Arial, sans-serif",        // Font voor nummers in de cirkels
  sectionHeader: "Arial, sans-serif"        // Font voor rijk titels
};

// -------------------------------------------------------------------
// AFBEELDING STYLING
// -------------------------------------------------------------------
// Positionering en styling van de rijk afbeeldingen
const IMAGE_STYLING = {
  marginTop: "15px",      // Ruimte boven de afbeelding (wordt genegeerd bij overlap mode)
  marginBottom: "15px",   // Ruimte onder de afbeelding (wordt genegeerd bij overlap mode)
  maxWidth: "600px",      // Maximum breedte van de afbeelding
  maxHeight: "150px",     // Maximum hoogte van de afbeelding
  borderRadius: "8px",    // Afronding van de hoeken (0px = geen afronding)
  
  // OVERLAP MODE: Afbeelding overlapt tabel
  overlapMode: true,          // true = afbeelding overlapt tabel, false = normale positie
  overlapOffset: "-75px"      // Hoeveel de afbeelding naar beneden verschuift (negatief = omhoog)
                              // Dit bepaalt de positie t.o.v. de tabel
                              // Bijv: "-75px" plaatst midden afbeelding op lijn eerste attractie
};

// -------------------------------------------------------------------
// SPACING INSTELLINGEN
// -------------------------------------------------------------------
const SPACING = {
  singleRiderMarginTop: "0px"  // Ruimte tussen hoofdattractie en single rider rij (bijv. "2px", "5px", "10px")
};

// -------------------------------------------------------------------
// AUTO-SCROLL INSTELLINGEN
// -------------------------------------------------------------------
// Wanneer je ?scroll achter de URL typt, scrollt de pagina automatisch
// Snelheid in pixels per seconde (hogere waarde = sneller scrollen)
const SCROLL_SPEED = 50;

// Hoeveel seconden wachten boven voordat naar beneden wordt gescrold
const SCROLL_PAUSE_TOP = 2;

// Hoeveel seconden wachten beneden voordat terug naar boven wordt gesprongen
const SCROLL_PAUSE_BOTTOM = 2;

// -------------------------------------------------------------------
// REFRESH INTERVAL
// -------------------------------------------------------------------
// Hoe vaak de data wordt ververst (in minuten)
// Let op: refresh gebeurt vloeiend zonder de pagina opnieuw te laden
const REFRESH_INTERVAL_MINUTES = 5;

// -------------------------------------------------------------------
// STYLING OPTIES
// -------------------------------------------------------------------
// Deze kun je aanpassen in style.css voor meer geavanceerde styling
// Zie style.css voor uitgebreide notaties over kleuren, fonts, etc.