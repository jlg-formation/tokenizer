import { useState } from 'react';
import { tokenIdToColor } from '../utils/tokenColor';

export interface TokenInfo {
  id: number;
  text: string;
  bytes: Uint8Array;
}

interface TooltipState {
  token: TokenInfo;
  x: number;
  y: number;
}

interface Props {
  tokens: TokenInfo[];
}

export default function TokenDisplay({ tokens }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  if (tokens.length === 0) return null;

  return (
    <div className="relative">
      <div
        className="text-base leading-relaxed font-mono p-4 rounded-lg bg-white border border-gray-200 min-h-16 whitespace-pre-wrap break-words"
        style={{ lineHeight: '2rem' }}
      >
        {tokens.map((token, i) => (
          <span
            key={i}
            className="rounded cursor-default transition-opacity hover:opacity-80"
            style={{ backgroundColor: tokenIdToColor(token.id), padding: '2px 0' }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltip({
                token,
                x: rect.left + rect.width / 2,
                y: rect.top,
              });
            }}
            onMouseLeave={() => setTooltip(null)}
          >
            {token.text}
          </span>
        ))}
      </div>

      {tooltip && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: 'translate(-50%, -100%)',
            minWidth: '180px',
          }}
        >
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">ID</span>
              <span className="font-mono font-bold">{tooltip.token.id}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Texte</span>
              <span className="font-mono">«{tooltip.token.text}»</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Octets</span>
              <span className="font-mono">{tooltip.token.bytes.length} byte{tooltip.token.bytes.length > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Hex</span>
              <span className="font-mono text-yellow-300">
                {Array.from(tooltip.token.bytes).map(b => b.toString(16).padStart(2, '0')).join(' ')}
              </span>
            </div>
          </div>
          {/* Arrow */}
          <div
            className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"
          />
        </div>
      )}
    </div>
  );
}
