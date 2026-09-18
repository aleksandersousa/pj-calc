import { formatBRLFromCents, parseDigitsToCents } from '../lib/currency'

type CurrencyInputProps = {
  id: string
  cents: number
  onChange: (cents: number) => void
}

export function CurrencyInput({ id, cents, onChange }: CurrencyInputProps) {
  return (
    <input
      id={id}
      className="w-full rounded-card border border-border bg-bg px-4 py-3 text-lg text-text shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent"
      inputMode="numeric"
      autoComplete="off"
      value={formatBRLFromCents(cents)}
      onChange={(event) => onChange(parseDigitsToCents(event.target.value))}
    />
  )
}
