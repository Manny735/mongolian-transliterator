# Mongolian Reverse Transliterator (MVP) 🇲🇳

A React-based web application for converting Latin-script Mongolian into Cyrillic using a high-performance 100k-word mapping system and frequency-based auto-selection.

## 🚀 How to Run Locally
1. Clone this repository.
2. Open your terminal in the project folder.
3. Run `npm install` (This downloads the necessary libraries).
4. Run `npm run dev` to start the local server.
5. Open `http://localhost:5173` in your browser.

## 🎨 Visual Indicators
- **Orange Underline:** **Ambiguity Detected.** Multiple Cyrillic mappings exist. The app has auto-selected the most frequent version, but you can click the word to switch to an alternative.
- **Blue Dotted Underline:** **Phonetic Fallback.** No exact match was found in the 100k dictionary; the app performed a letter-by-letter transliteration.

## 🛠️ Features
- **100k+ Word Dictionary json file:** High-speed lookup for common Mongolian stems and suffixes.
- **Contextual Memory:** Remembers your manual overrides for ambiguous words during your current session.
- **Copy to Clipboard:** One-click functionality to copy the finalized Cyrillic text.

## 📝 Sample Latin Mongolian Text
Copy and paste the text below to test the mapping and ambiguity features:

> Uv soyol, ulamjlal, yos zanshlaa erhemlen deedelj, uyes, uyed uvluulen tugeej, hugjin devshij bui kazah tumnii Narnii bayar buyu Nauryziin bayar Suhbaatariin talbaid unuudur bolj baina. Yerunhii said G.Zandanshatar Nauryziin bayariin neelted oroltsoj, bayar hurgej ug helev. Terbeer "Ekh orniihoo ungursun bolon unuudur, ireeduin hugjil, devshliin tuluu hudulmurch kazakiin ard tumnii oruulsan huvi nemriig unelj barshgui. Uls ornii hugjliin buteen baiguulalt urnusun gazar buhend busdiig ulgerlen urialan duudaj chaddag, aldar gavyaa amjiltiin ezed bilee.