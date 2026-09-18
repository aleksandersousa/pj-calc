const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const MAX_CENTS = 999_999_999_999

export function formatBRLFromCents(cents: number): string {
  return formatter.format(cents / 100)
}

export function parseDigitsToCents(value: string): number {
  const digits = value.replace(/\D/g, '')
  if (digits === '') return 0
  const parsed = Number.parseInt(digits, 10)
  if (!Number.isFinite(parsed)) return 0
  return Math.min(parsed, MAX_CENTS)
}
