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
// CUSTOM RIJK TOEWIJZINGEN
// -------------------------------------------------------------------
// Wijs attracties en shows toe aan rijken via hun externalId
// Format: "externalId": "Rijknaam"
// 
// BELANGRIJK: Gebruik exact dezelfde rijknaam als in RIJKEN array
// Als een attractie single rider heeft, gaat die automatisch mee
const CUSTOM_PARK_AREA_MAP = {
  // MARERIJK
  "villavolta": "Marerijk",
  "pardoesdetovernar": "Marerijk",
  "kinderspoor": "Marerijk",
  "gondoletta": "Marerijk",
  "droomvlucht": "Marerijk",
  "kleuterhof": "Marerijk",
  "archipel": "Marerijk",
  "speelbosnest": "Marerijk",
  "stoomtreinm": "Marerijk",
  "sprookjesbos": "Marerijk",
  "stoomcarrousel": "Marerijk",
  "kindervreugd": "Marerijk",
  
  // REIZENRIJK
  "sirocco": "Reizenrijk",
  "fatamorgana": "Reizenrijk",
  "halvemaen": "Reizenrijk",
  "carnavalfestival": "Reizenrijk",
  "pagode": "Reizenrijk",
  "caro": "Reizenrijk",
  "stoomtreinr": "Reizenrijk",
  
  // RUIGRIJK
  "devliegendehollander": "Ruigrijk",
  "python": "Ruigrijk",
  "baron1898": "Ruigrijk",
  "jorisendedraak": "Ruigrijk",
  
  // ANDERRIJK
  "volkvanlaaf": "Anderrijk",
  "volkvanlaafmonorail": "Anderrijk",
  "raveleijn": "Anderrijk",
  "diorama": "Anderrijk",
  "fabula": "Anderrijk",
  
  // FANTASIERIJK
  "sprookjesboomerwaseens": "Fantasierijk",
  "jokieenjet": "Fantasierijk",
  "ontmoeteftelingbewoners": "Fantasierijk",
  "eftelingmuseum": "Fantasierijk",
  "doudetuffer": "Fantasierijk",
  "carrouselsantonpieckplein": "Fantasierijk",
  "aquanura": "Fantasierijk",
  "sprookjessprokkelaar": "Fantasierijk",
  "pirana": "Fantasierijk",
  "vogelrok": "Fantasierijk",
  "antonpieckpleinpoppenkasttheater": "Fantasierijk",
  "dansemacabre": "Fantasierijk",
  "symbolica": "Fantasierijk",
  "maxmoritz": "Fantasierijk",
  "virginieenottocharlatan": "Fantasierijk"
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
// Zie style.css voor uitgebreide notities over kleuren, fonts, etc.