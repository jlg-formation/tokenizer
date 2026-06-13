import { useState, useEffect, useCallback } from 'react';
import { get_encoding, type TiktokenEncoding } from 'tiktoken';
import TokenDisplay, { type TokenInfo } from './components/TokenDisplay';
import StatsBar from './components/StatsBar';
import './index.css';

const ENCODINGS: { value: TiktokenEncoding; label: string; description: string }[] = [
  { value: 'cl100k_base', label: 'cl100k_base', description: 'GPT-4, GPT-3.5-turbo' },
  { value: 'o200k_base', label: 'o200k_base', description: 'GPT-4o, o1, o3' },
  { value: 'p50k_base', label: 'p50k_base', description: 'GPT-3 (davinci-003)' },
  { value: 'r50k_base', label: 'r50k_base', description: 'GPT-3 (davinci)' },
];

const EXEMPLE = "Bonjour ! Les tokens sont les unités de base que les LLMs utilisent pour lire et générer du texte.";

export default function App() {
  const [text, setText] = useState(EXEMPLE);
  const [encoding, setEncoding] = useState<TiktokenEncoding>('cl100k_base');
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  const tokenize = useCallback((input: string, enc: TiktokenEncoding) => {
    if (!input) { setTokens([]); return; }
    try {
      const encoder = get_encoding(enc);
      const ids = encoder.encode(input);
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const result: TokenInfo[] = Array.from(ids).map((id) => {
        const bytes = encoder.decode(new Uint32Array([id]));
        return { id, text: decoder.decode(bytes), bytes };
      });
      encoder.free();
      setTokens(result);
    } catch { setTokens([]); }
  }, []);

  useEffect(() => { tokenize(text, encoding); }, [text, encoding, tokenize]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* En-tête compact */}
      <header className="flex-none px-6 py-3 bg-white border-b border-gray-200 flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">Visualiseur de Tokens</h1>
          <p className="text-xs text-gray-500 leading-snug max-w-2xl">
            Un <strong className="text-gray-700">token</strong> est la plus petite unité traitée par un LLM —
            ni un mot, ni un caractère, mais un fragment appris statistiquement.
            Un mot courant = 1 token ; un mot rare peut en valoir plusieurs.
          </p>
        </div>

        {/* Sélecteur d'encodage intégré dans le header */}
        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-400 whitespace-nowrap">Encodage :</span>
          {ENCODINGS.map((enc) => (
            <button
              key={enc.value}
              onClick={() => setEncoding(enc.value)}
              title={enc.description}
              className={`px-2.5 py-1 rounded-md text-xs border transition-all whitespace-nowrap ${
                encoding === enc.value
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <span className="font-mono">{enc.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Corps principal : deux colonnes */}
      <main className="flex-1 flex gap-0 overflow-hidden">

        {/* Colonne gauche : saisie */}
        <div className="flex flex-col w-[42%] flex-shrink-0 border-r border-gray-200 bg-white p-4 gap-3">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Texte à analyser
          </label>
          <textarea
            className="flex-1 p-3 text-sm font-mono border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 bg-gray-50"
            placeholder="Saisissez votre texte ici…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {tokens.length > 0 && (
            <StatsBar tokens={tokens} charCount={text.length} />
          )}
        </div>

        {/* Colonne droite : résultats */}
        <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex-none">
            Tokens{' '}
            <span className="normal-case font-normal text-gray-400">— survolez un token pour voir ses détails</span>
          </label>

          {tokens.length > 0 ? (
            <div className="flex-1 overflow-y-auto">
              <TokenDisplay tokens={tokens} />
              <p className="text-xs text-gray-400 mt-3">
                La couleur de chaque token est dérivée de son ID dans le vocabulaire de l'encodage.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Commencez à saisir du texte pour voir la tokenisation en temps réel.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
