import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import mappings from './data/mappings.json';

const letterMap = {
  // Diphthongs / Special Combos
  'ch': 'ч', 'sh': 'ш', 'ts': 'ц', 'ye': 'е', 'yo': 'ё', 'yu': 'ю', 'ya': 'я',
  'ii': 'ий', 'oi': 'ой', 'ui': 'уй', 'wi': 'үй', 'qi': 'өй',
  // Single Letters
  'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'э', 'z': 'з', 
  'i': 'и', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'q': 'ө', 
  'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'w': 'ү', 'f': 'ф', 
  'h': 'х', 'y': 'я', 'j': 'ж', 'kh': 'х'
};

function transliterateFallback(text) {
  let result = '';
  let i = 0;
  const lowerText = text.toLowerCase();
  while (i < lowerText.length) {
    let char2 = lowerText.substring(i, i + 2);
    if (letterMap[char2]) {
      result += letterMap[char2]; i += 2;
    } else {
      let char1 = lowerText[i];
      result += letterMap[char1] || char1; i++;
    }
  }
  return result;
}

function App() {
  const [inputText, setInputText] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [selections, setSelections] = useState({});
  const [copyStatus, setCopyStatus] = useState('Copy Text');

  useEffect(() => {
    const handleGlobalClick = () => setActiveMenu(null);
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const translatedWords = useMemo(() => {
    if (!inputText) return [];
    return inputText.split(/(\s+)/).map((part, index) => {
      if (/\s+/.test(part)) return { type: 'space', value: part };
      const cleanWord = part.toLowerCase().replace(/[.,!?;:]/g, '');
      const puncMatch = part.match(/[.,!?;:]+$/);
      const punctuation = puncMatch ? puncMatch[0] : '';
      const options = mappings[cleanWord];

      if (options) {
        const uniqueId = `${index}-${cleanWord}`;
        const selectedValue = selections[uniqueId] || options[0];
        return {
          type: options.length > 1 ? 'multi' : 'exact',
          value: selectedValue + punctuation,
          options: options,
          id: uniqueId
        };
      }
      return {
        type: 'fallback',
        value: transliterateFallback(cleanWord) + punctuation,
        id: index
      };
    });
  }, [inputText, selections]);

  // Function to copy the flat text from the output
  const handleCopy = () => {
    const fullText = translatedWords.map(w => w.value).join('');
    navigator.clipboard.writeText(fullText).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Text'), 2000);
    });
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Mongolian Reverse Transliterator</h1>
        <div className="legend">
          <span className="dot orange"></span> Multiple Options 
          <span className="dot blue"></span> Letter-by-Letter
        </div>
      </div>

      <div className="main-content">
        <textarea
          spellCheck="false" 
          placeholder="Type Latin Mongolian..."
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setActiveMenu(null);
            if (e.target.value === "") setSelections({});
          }}
        />

        <div className="output-wrapper">
          <div className="output-container">
            {translatedWords.map((word, i) => (
              <span key={i} className="word-wrapper">
                {word.type === 'multi' ? (
                  <>
                    <span 
                      className="multi-match" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === i ? null : i);
                      }}
                    >
                      {word.value}
                    </span>
                    {activeMenu === i && (
                      <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                        {word.options.map(opt => (
                          <li key={opt} className="dropdown-item" onClick={() => {
                            setSelections(prev => ({ ...prev, [word.id]: opt }));
                            setActiveMenu(null);
                          }}>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <span className={word.type === 'fallback' ? 'fallback-match' : ''}>
                    {word.value}
                  </span>
                )}
              </span>
            ))}
          </div>
          {inputText && (
            <button className="copy-button" onClick={handleCopy}>
              {copyStatus}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;