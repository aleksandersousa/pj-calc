import { useMemo, useState } from "react";
import { calculateFromCents } from "./calc/calculate";
import { SALARIO_MINIMO } from "./calc/constants";
import { CurrencyInput } from "./components/CurrencyInput";
import { ResultList } from "./components/ResultList";

const DEFAULT_MIN_WAGE_CENTS = Math.round(SALARIO_MINIMO * 100);

export default function App() {
  const [cents, setCents] = useState(0);
  const [minWageCents, setMinWageCents] = useState(DEFAULT_MIN_WAGE_CENTS);
  const result = useMemo(
    () => (cents > 0 ? calculateFromCents(cents, minWageCents) : null),
    [cents, minWageCents],
  );

  return (
    <div className="mx-auto flex min-h-svh max-w-140 flex-col px-4 py-8 md:px-8 md:py-16">
      <header className="mb-8 md:mb-10">
        <p className="mb-2 text-sm font-medium tracking-wide text-accent uppercase">
          ME · Fator R · Anexo III
        </p>
        <h1 className="m-0 text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Calculadora ME
        </h1>
        <p className="mt-3 text-base text-muted">
          Informe o valor bruto recebido. A simulação aplica 6% de DAS,
          pró-labore de 28% com piso no salário mínimo e INSS de 11%.
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-6">
        <section className="rounded-card border border-border bg-surface p-5 shadow-card md:p-6">
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="valor-bruto"
                className="mb-2 block text-sm font-medium text-muted"
              >
                Valor bruto recebido
              </label>
              <CurrencyInput
                id="valor-bruto"
                cents={cents}
                onChange={setCents}
              />
            </div>
            <div>
              <label
                htmlFor="salario-minimo"
                className="mb-2 block text-sm font-medium text-muted"
              >
                Salário mínimo
              </label>
              <CurrencyInput
                id="salario-minimo"
                cents={minWageCents}
                onChange={setMinWageCents}
              />
            </div>
          </div>
        </section>

        <section className="rounded-card border border-border bg-surface p-5 shadow-card md:p-6">
          <h2
            className={`text-sm font-medium tracking-wide text-muted uppercase ${
              result === null ? "mb-1" : "mb-4"
            }`}
          >
            Resultado
          </h2>
          {result === null ? (
            <p className="mb-4 text-xs text-muted">
              Informe o valor bruto para calcular
            </p>
          ) : null}
          <ResultList result={result} />
          {result && result.dividendos < 0 ? (
            <p className="mt-4 text-sm text-warning">
              O valor bruto não cobre DAS e o piso do salário mínimo. Os
              dividendos ficam negativos.
            </p>
          ) : null}
        </section>
      </div>

      <footer className="mt-8 text-xs text-muted md:mt-12">
        Estimativa simplificada. Não substitui orientação contábil.
      </footer>
    </div>
  );
}
