import type { TokenInfo } from './TokenDisplay';

interface Props {
  tokens: TokenInfo[];
  charCount: number;
}

export default function StatsBar({ tokens, charCount }: Props) {
  const tokenCount = tokens.length;
  const ratio = charCount > 0 ? (charCount / Math.max(tokenCount, 1)).toFixed(1) : '—';

  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
      <span>
        <strong className="text-blue-700">{tokenCount}</strong> token{tokenCount !== 1 ? 's' : ''}
      </span>
      <span>
        <strong className="text-blue-700">{charCount}</strong> caractère{charCount !== 1 ? 's' : ''}
      </span>
      <span>
        <strong className="text-blue-700">{ratio}</strong> car./token
      </span>
    </div>
  );
}
