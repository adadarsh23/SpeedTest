import React from 'react';

export default function LanguageSelector({ language, setLanguage, label }) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-2 rounded-full shadow">
      {/* Globe icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path stroke="currentColor" strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="bg-white dark:bg-gray-800 dark:text-white text-gray-900 text-sm font-medium rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={label}
        title={label}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
}