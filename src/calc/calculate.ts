import { ALIQUOTA_DAS, ALIQUOTA_INSS, ALIQUOTA_PRO_LABORE } from './constants'

export type Calculation = {
  das: number
  proLaboreBruto: number
  inss: number
  proLaboreLiquido: number
  dividendos: number
  totalImpostos: number
  totalImpostosComProLabore: number
  usedMinWage: boolean
}

export function calculateFromCents(
  brutoCents: number,
  minWageCents: number,
): Calculation {
  const das = Math.round(brutoCents * ALIQUOTA_DAS)
  const proLabore28 = Math.round(brutoCents * ALIQUOTA_PRO_LABORE)
  const usedMinWage = minWageCents > 0 && proLabore28 < minWageCents
  const proLaboreBruto = Math.max(proLabore28, minWageCents)
  const inss = Math.round(proLaboreBruto * ALIQUOTA_INSS)
  const proLaboreLiquido = proLaboreBruto - inss
  const dividendos = brutoCents - proLaboreBruto - das
  const totalImpostos = das + inss
  const totalImpostosComProLabore = totalImpostos + proLaboreBruto

  return {
    das,
    proLaboreBruto,
    inss,
    proLaboreLiquido,
    dividendos,
    totalImpostos,
    totalImpostosComProLabore,
    usedMinWage,
  }
}
