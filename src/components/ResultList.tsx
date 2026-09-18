import type { Calculation } from '../calc/calculate'
import { formatBRLFromCents } from '../lib/currency'

type ResultListProps = {
  result: Calculation | null
}

const rows: Array<{ key: keyof Omit<Calculation, 'usedMinWage'>; label: string }> =
  [
    { key: 'das', label: 'Valor do DAS' },
    { key: 'proLaboreBruto', label: 'Pró-labore bruto' },
    { key: 'inss', label: 'Valor do INSS' },
    { key: 'proLaboreLiquido', label: 'Pró-labore líquido' },
    { key: 'dividendos', label: 'Valor dos dividendos' },
    { key: 'totalImpostos', label: 'Total de impostos' },
    { key: 'totalImpostosComProLabore', label: 'Total de impostos com pró-labore' },
  ]

export function ResultList({ result }: ResultListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {rows.map((row) => {
        const isDividends = row.key === 'dividendos'
        const value = result === null ? null : result[row.key]
        const negative = value !== null && isDividends && value < 0

        return (
          <li
            key={row.key}
            className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-sm text-muted">{row.label}</span>
              {row.key === 'proLaboreBruto' && result?.usedMinWage ? (
                <span className="w-fit rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning">
                  Piso do salário mínimo
                </span>
              ) : null}
            </div>
            <span
              className={`shrink-0 text-base font-medium tabular-nums ${
                value === null
                  ? 'text-muted'
                  : isDividends && !negative
                    ? 'text-accent'
                    : negative
                      ? 'text-warning'
                      : 'text-text'
              }`}
            >
              {value === null ? '—' : formatBRLFromCents(value)}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
