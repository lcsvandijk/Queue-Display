// ===================================================================
// CONFIGURATIE BESTAND - Efteling Dashboard
// ===================================================================
// Hier kun je alle instellingen aanpassen zonder de code te wijzigen

// -------------------------------------------------------------------
// DATA BRON
// -------------------------------------------------------------------
// Zet op true om lokale dummydata te gebruiken
// Zet op false om live data van de API op te halen
const USE_DUMMY_DATA = true;

// -------------------------------------------------------------------
// LIVE API URL
// -------------------------------------------------------------------
// De URL van de Efteling live data API
const API_URL = "https://api.themeparks.wiki/v1/entity/21776b5a-1444-4924-8ab2-6c66d9219628/live";

// -------------------------------------------------------------------
// ACHTERGROND AFBEELDING
// -------------------------------------------------------------------
// URL naar een achtergrondafbeelding voor de hele pagina
// Laat leeg ("") of null voor effen kleur (#EFE3CB)
// De afbeelding wordt altijd volledig ingezoomd om het scherm te vullen
const BACKGROUND_IMAGE = "";

// -------------------------------------------------------------------
// RIJKEN (PARK AREAS)
// -------------------------------------------------------------------
// De volgorde hier bepaalt de weergavevolgorde op de pagina
// Items die niet in een rijk zijn toegewezen worden NIET weergegeven
const RIJKEN = [
  "Reizenrijk", 
  "Marerijk", 
  "Sprookjesbos",
  "Ruigrijk", 
  "Fantasierijk",
  "Anderrijk", 
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
  "Sprookjesbos": "#483D8B",
};

// -------------------------------------------------------------------
// RIJK TABEL ACHTERGRONDKLEUREN
// -------------------------------------------------------------------
// Achtergrondkleur voor de tabelcellen per rijk
const RIJK_TABLE_COLORS = {
  "Marerijk": "#DFF0E5",
  "Reizenrijk": "#FBEAD1",
  "Ruigrijk": "#FBE3E5",
  "Anderrijk": "#E4F4F8",
  "Fantasierijk": "#F8E9F1",
  "Sprookjesbos": "#F0F2D9",
};

// -------------------------------------------------------------------
// RIJK BORDER KLEUREN
// -------------------------------------------------------------------
// Kleur van de lijnen tussen attracties per rijk
const RIJK_BORDER_COLORS = {
  "Marerijk": "#7da8b0",
  "Reizenrijk": "#b88d5d",
  "Ruigrijk": "#ffffffff",
  "Anderrijk": "#9aab7f",
  "Fantasierijk": "#9a91ba",
  "Sprookjesbos": "#9a91ba",
};

// -------------------------------------------------------------------
// RIJK TABEL RAND STYLING
// -------------------------------------------------------------------
// Styling voor de rand rondom elke tabel per rijk
// Format: { color: "kleur", width: "dikte" }
const RIJK_TABLE_BORDER = {
  "Marerijk": { color: "#24663F", width: "1px" },
  "Reizenrijk": { color: "#D57912", width: "1px" },
  "Ruigrijk": { color: "#961D24", width: "1px" },
  "Anderrijk": { color: "#016A80", width: "1px" },
  "Fantasierijk": { color: "#8C406D", width: "1px" },
  "Sprookjesbos": { color: "#8A8B48", width: "1px" },
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
  "Sprookjesbos": { background: "#483D8B", text: "#ffffff" },
};

// -------------------------------------------------------------------
// RIJK AFBEELDINGEN
// -------------------------------------------------------------------
// Afbeelding die boven elke rijktabel wordt weergegeven
// Laat leeg ("") om geen afbeelding weer te geven
const RIJK_IMAGES = {
  "Marerijk": "../images/marerijk.png",
  "Reizenrijk": "../images/reizenrijk.png",
  "Ruigrijk": "../images/ruigrijk.png",
  "Anderrijk": "../images/anderrijk.png",
  "Fantasierijk": "../images/fantasierijk.png",
  "Sprookjesbos": "../images/sprookjesbos.png",
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
  "DOWN": { text: "Tijdelijk buiten werking", style: "grijs" },
  "OPERATING": null,  // null = toon normale wachttijd/showtijd
  "OPERATING_NULL": { text: "Geopend", style: "geel" },
  "NO_MORE_SHOWS": { text: "Vandaag geen shows meer", style: "grijs" },
  "NO_SHOWS_TODAY": { text: "Vandaag geen voorstellingen", style: "grijs" },
};

// -------------------------------------------------------------------
// SINGLE RIDER STATUS BERICHTEN
// -------------------------------------------------------------------
// Custom berichten voor single rider wachttijden
// Deze worden gebruikt als de single rider waitTime een specifieke waarde heeft
// Format: waitTime waarde -> { text: "Bericht", style: "geel" of "grijs" }
// BELANGRIJK: Grijze berichten (style: "grijs") overschrijven altijd gele berichten
const SINGLE_RIDER_WAIT_TIME_MESSAGES = {
  null: { text: "Niet beschikbaar", style: "geel" },
  // Voeg meer toe indien nodig, bijvoorbeeld:
  // 0: { text: "Geen wachttijd", style: "geel" }
};

// Status bericht voor single rider als main attractie niet OPERATING is
const SINGLE_RIDER_CLOSED_MESSAGE = { text: "Gesloten", style: "grijs" };

// -------------------------------------------------------------------
// WACHTTIJD OPMAAK
// -------------------------------------------------------------------
// Configureer wat er voor en na het wachttijdgetal komt
const WAIT_TIME_FORMAT = {
  prefix: "± ",        // Wat komt er VOOR het getal (bijv. "± " of "~")
  suffix: " min"       // Wat komt er NA het getal (bijv. " min" of " minuten")
};

// -------------------------------------------------------------------
// SHOWTIJD INSTELLINGEN
// -------------------------------------------------------------------
// Hoeveel showtijden maximaal weergeven (rest gaat in "+X" bubble)
const MAX_SHOWTIMES_DISPLAY = 4;

// -------------------------------------------------------------------
// CUSTOM RIJK TOEWIJZINGEN
// -------------------------------------------------------------------
// Wijs attracties en shows toe aan rijken via hun externalId
// Format: "externalId": { rijk: "Rijknaam", nummer: 1, afbeelding: "url" }
// 
// BELANGRIJK: 
// - Gebruik exact dezelfde rijknaam als in RIJKEN array
// - Voor SHOWS: nummer en afbeelding zijn optioneel, laat weg of zet op null om te verbergen
// - Als een attractie/show NIET in deze lijst staat, wordt deze NIET weergegeven
// - Als nummer of afbeelding null is, wordt de default afbeelding gebruikt
const CUSTOM_PARK_AREA_MAP = {
  // MARERIJK
  "villavolta": { rijk: "Marerijk", nummer: 1, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "kinderspoor": { rijk: "Marerijk", nummer: 3, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "gondoletta": { rijk: "Marerijk", nummer: 4, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "droomvlucht": { rijk: "Marerijk", nummer: 5, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "kleuterhof": { rijk: "Marerijk", nummer: 6, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "archipel": { rijk: "Marerijk", nummer: 7, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "speelbosnest": { rijk: "Marerijk", nummer: 8, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "stoomtreinm": { rijk: "Marerijk", nummer: 9, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "sprookjesbos": { rijk: "Marerijk", nummer: 10, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "stoomcarrousel": { rijk: "Marerijk", nummer: 11, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "kindervreugd": { rijk: "Marerijk", nummer: 12, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  
  // REIZENRIJK
  "sirocco": { rijk: "Reizenrijk", nummer: 1, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "fatamorgana": { rijk: "Reizenrijk", nummer: 2, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "halvemaen": { rijk: "Reizenrijk", nummer: 3, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "carnavalfestival": { rijk: "Reizenrijk", nummer: 4, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "pagode": { rijk: "Reizenrijk", nummer: 5, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "caro": { rijk: "Reizenrijk", nummer: 0, afbeelding: null },  // Show
  "stoomtreinr": { rijk: "Reizenrijk", nummer: 7, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  
  // RUIGRIJK
  "devliegendehollander": { rijk: "Ruigrijk", nummer: 1, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "python": { rijk: "Ruigrijk", nummer: 2, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "baron1898": { rijk: "Ruigrijk", nummer: 3, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "jorisendedraak": { rijk: "Ruigrijk", nummer: 4, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  
  // ANDERRIJK
  "volkvanlaaf": { rijk: "Anderrijk", nummer: 1, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "volkvanlaafmonorail": { rijk: "Anderrijk", nummer: 2, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "raveleijn": { rijk: "Anderrijk", nummer: null, afbeelding: null },  // Show
  "diorama": { rijk: "Anderrijk", nummer: 4, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  "fabula": { rijk: "Anderrijk", nummer: 5, afbeelding: "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png" },
  
  // FANTASIERIJK
  
  "jokieenjet": { rijk: "Fantasierijk", nummer: 1, afbeelding: null },  // Show
  "ontmoeteftelingbewoners": { rijk: "Fantasierijk", nummer: 1, afbeelding: null },  // Show
  "eftelingmuseum": { rijk: "Fantasierijk", nummer: 4, afbeelding: null },
  "doudetuffer": { rijk: "Fantasierijk", nummer: 5, afbeelding: null },
  "carrouselsantonpieckplein": { rijk: "Fantasierijk", nummer: 6, afbeelding: null },
  "aquanura": { rijk: "Fantasierijk", nummer: 1, afbeelding: null },  // Show
  "sprookjessprokkelaar": { rijk: "Fantasierijk", nummer: 1, afbeelding: null },  // Show
  "pirana": { rijk: "Fantasierijk", nummer: 9, afbeelding: null },
  "vogelrok": { rijk: "Fantasierijk", nummer: 1, afbeelding: null },
  "antonpieckpleinpoppenkasttheater": { rijk: "Fantasierijk", nummer: 1, afbeelding: null },  // Show
  "dansemacabre": { rijk: "Fantasierijk", nummer: 12, afbeelding: null },
  "symbolica": { rijk: "Fantasierijk", nummer: 13, afbeelding: null },
  "maxmoritz": { rijk: "Fantasierijk", nummer: 14, afbeelding: null },
  "virginieenottocharlatan": { rijk: "Fantasierijk", nummer: 1, afbeelding: null },  // Show
  "pardoesdetovernar": { rijk: "Fantasierijk", nummer: 69, afbeelding: null },  // Show zonder nummer/afbeelding

  // SPROOKJESBOS
  "sprookjesboomerwaseens": { rijk: "Sprookjesbos", nummer: 1, afbeelding: null },  // Show
};

// DEFAULT AFBEELDING
// Deze afbeelding wordt gebruikt als nummer of afbeelding null is
const DEFAULT_ATTRACTION_IMAGE = "https://i.ibb.co/BV5XqKDw/Chat-GPT-Image-6-okt-2025-21-31-57-removebg-preview.png";

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
  attractionName: "AlegreyaSans-Medium",      // Font voor attractienamen
  singleRider: "AlegreyaSans-Regular",         // Font voor "Single rider" tekst
  bubbleText: "AlegreyaSans-Regular",          // Font voor tekst in de wachttijd bubbels
  numberCircle: "AlegreyaSans-Regular",        // Font voor nummers in de cirkels
  sectionHeader: "AlegreyaSans-Regular"        // Font voor rijk titels
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
  singleRiderMarginTop: "-10px"  // Ruimte tussen hoofdattractie en single rider rij
                                 // Negatieve waarden zorgen voor overlap
                                 // "0px" = direct tegen elkaar aan
                                 // "-10px" = 10px overlap
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
// Alleen wachttijden, showtijden en statussen worden geüpdatet
const REFRESH_INTERVAL_MINUTES = 1;

// -------------------------------------------------------------------
// STYLING OPTIES
// -------------------------------------------------------------------
// Deze kun je aanpassen in style.css voor meer geavanceerde styling
// Zie style.css voor uitgebreide notaties over kleuren, fonts, etc.