import React, { useState, useEffect } from 'react';
import SpeedTest from './Components/SpeedTest';
import ThemeToggle from './Components/ThemeToggle';
import LanguageSelector from './Components/LanguageSelector';
import './App.css';

// All translations for the UI
const translations = {
  en: {
    speedTest: "Internet Speed Test",
    download: "Download",
    upload: "Upload",
    ping: "Ping",
    startTest: "Start Test",
    testingDownload: "Testing download...",
    testingUpload: "Testing upload...",
    testingPing: "Testing latency...",
    fetchingIP: "Fetching IP details...",
    runningTests: "Running tests...",
    testComplete: "Test complete.",
    ip: "IP",
    location: "Location",
    isp: "ISP",
    asn: "ASN",
    hostname: "Hostname",
    timezone: "Timezone",
    utcOffset: "UTC Offset",
    postal: "Postal Code",
    latitude: "Latitude",
    longitude: "Longitude",
    inEU: "In EU",
    yes: "Yes",
    no: "No",
    callingCode: "Calling Code",
    currency: "Currency",
    countryArea: "Country Area",
    population: "Population",
    network: "Network",
    downloadSpeed: "Download Speed",
    uploadSpeed: "Upload Speed",
    latency: "Latency",
    loading: "Loading",
    selectLanguage: "Select language",
    theme: "Toggle theme"
  },
  hi: {
    speedTest: "इंटरनेट स्पीड टेस्ट",
    download: "डाउनलोड",
    upload: "अपलोड",
    ping: "पिंग",
    startTest: "टेस्ट शुरू करें",
    testingDownload: "डाउनलोड परीक्षण...",
    testingUpload: "अपलोड परीक्षण...",
    testingPing: "लेटेंसी परीक्षण...",
    fetchingIP: "आईपी विवरण ला रहे हैं...",
    runningTests: "परीक्षण चल रहे हैं...",
    testComplete: "परीक्षण पूर्ण।",
    ip: "आईपी",
    location: "स्थान",
    isp: "आईएसपी",
    asn: "एएसएन",
    hostname: "होस्टनेम",
    timezone: "समय क्षेत्र",
    utcOffset: "यूटीसी ऑफसेट",
    postal: "डाक कोड",
    latitude: "अक्षांश",
    longitude: "देशांतर",
    inEU: "ईयू में",
    yes: "हाँ",
    no: "नहीं",
    callingCode: "कॉलिंग कोड",
    currency: "मुद्रा",
    countryArea: "देश का क्षेत्रफल",
    population: "जनसंख्या",
    network: "नेटवर्क",
    downloadSpeed: "डाउनलोड स्पीड",
    uploadSpeed: "अपलोड स्पीड",
    latency: "लेटेंसी",
    loading: "लोड हो रहा है",
    selectLanguage: "भाषा चुनें",
    theme: "थीम बदलें"
  },
  fr: {
    speedTest: "Test de Vitesse Internet",
    download: "Téléchargement",
    upload: "Téléversement",
    ping: "Ping",
    startTest: "Démarrer le test",
    testingDownload: "Test du téléchargement...",
    testingUpload: "Test du téléversement...",
    testingPing: "Test de latence...",
    fetchingIP: "Récupération des infos IP...",
    runningTests: "Tests en cours...",
    testComplete: "Test terminé.",
    ip: "IP",
    location: "Emplacement",
    isp: "FAI",
    asn: "ASN",
    hostname: "Nom d'hôte",
    timezone: "Fuseau horaire",
    utcOffset: "Décalage UTC",
    postal: "Code postal",
    latitude: "Latitude",
    longitude: "Longitude",
    inEU: "Dans l'UE",
    yes: "Oui",
    no: "Non",
    callingCode: "Indicatif",
    currency: "Devise",
    countryArea: "Superficie",
    population: "Population",
    network: "Réseau",
    downloadSpeed: "Vitesse de téléchargement",
    uploadSpeed: "Vitesse de téléversement",
    latency: "Latence",
    loading: "Chargement",
    selectLanguage: "Choisir la langue",
    theme: "Changer le thème"
  },
  es: {
    speedTest: "Prueba de Velocidad de Internet",
    download: "Descarga",
    upload: "Subida",
    ping: "Ping",
    startTest: "Iniciar prueba",
    testingDownload: "Probando descarga...",
    testingUpload: "Probando subida...",
    testingPing: "Probando latencia...",
    fetchingIP: "Obteniendo detalles de IP...",
    runningTests: "Ejecutando pruebas...",
    testComplete: "Prueba completa.",
    ip: "IP",
    location: "Ubicación",
    isp: "ISP",
    asn: "ASN",
    hostname: "Nombre de host",
    timezone: "Zona horaria",
    utcOffset: "Desfase UTC",
    postal: "Código postal",
    latitude: "Latitud",
    longitude: "Longitud",
    inEU: "En la UE",
    yes: "Sí",
    no: "No",
    callingCode: "Código de país",
    currency: "Moneda",
    countryArea: "Área del país",
    population: "Población",
    network: "Red",
    downloadSpeed: "Velocidad de descarga",
    uploadSpeed: "Velocidad de subida",
    latency: "Latencia",
    loading: "Cargando",
    selectLanguage: "Seleccionar idioma",
    theme: "Cambiar tema"
  },
  de: {
    speedTest: "Internet-Geschwindigkeitstest",
    download: "Download",
    upload: "Upload",
    ping: "Ping",
    startTest: "Test starten",
    testingDownload: "Download wird getestet...",
    testingUpload: "Upload wird getestet...",
    testingPing: "Latenz wird getestet...",
    fetchingIP: "IP-Details werden abgerufen...",
    runningTests: "Tests laufen...",
    testComplete: "Test abgeschlossen.",
    ip: "IP",
    location: "Standort",
    isp: "ISP",
    asn: "ASN",
    hostname: "Hostname",
    timezone: "Zeitzone",
    utcOffset: "UTC-Versatz",
    postal: "Postleitzahl",
    latitude: "Breitengrad",
    longitude: "Längengrad",
    inEU: "In der EU",
    yes: "Ja",
    no: "Nein",
    callingCode: "Vorwahl",
    currency: "Währung",
    countryArea: "Landesfläche",
    population: "Bevölkerung",
    network: "Netzwerk",
    downloadSpeed: "Download-Geschwindigkeit",
    uploadSpeed: "Upload-Geschwindigkeit",
    latency: "Latenz",
    loading: "Lädt",
    selectLanguage: "Sprache wählen",
    theme: "Thema wechseln"
  },
  ja: {
    speedTest: "インターネット速度テスト",
    download: "ダウンロード",
    upload: "アップロード",
    ping: "ピング",
    startTest: "テスト開始",
    testingDownload: "ダウンロードをテスト中...",
    testingUpload: "アップロードをテスト中...",
    testingPing: "レイテンシをテスト中...",
    fetchingIP: "IP情報を取得中...",
    runningTests: "テストを実行中...",
    testComplete: "テスト完了。",
    ip: "IP",
    location: "場所",
    isp: "ISP",
    asn: "ASN",
    hostname: "ホスト名",
    timezone: "タイムゾーン",
    utcOffset: "UTCオフセット",
    postal: "郵便番号",
    latitude: "緯度",
    longitude: "経度",
    inEU: "EU内",
    yes: "はい",
    no: "いいえ",
    callingCode: "国番号",
    currency: "通貨",
    countryArea: "国土面積",
    population: "人口",
    network: "ネットワーク",
    downloadSpeed: "ダウンロード速度",
    uploadSpeed: "アップロード速度",
    latency: "レイテンシ",
    loading: "読み込み中",
    selectLanguage: "言語を選択",
    theme: "テーマ切替"
  }
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="flex justify-between items-center p-4 shadow-md bg-gray-100 dark:bg-gray-800">
        <ThemeToggle theme={theme} setTheme={setTheme} label={t.theme} />
        <LanguageSelector language={language} setLanguage={setLanguage} label={t.selectLanguage} />
      </header>
      <main className="p-4 flex justify-center items-center">
        <SpeedTest theme={theme} language={language} t={t} />
      </main>
    </div>
  );
}

export default App;