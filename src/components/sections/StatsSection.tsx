const STATS = [
  { value: "4+",  label: "Años de experiencia",     suffix: "" },
  { value: "10+", label: "Productos en catálogo",    suffix: "" },
  { value: "5",   label: "Países de exportación",   suffix: "+" },
  { value: "98",   label: "Clientes satisfechos",    suffix: "%" },
];

export function StatsSection() {
  return (
    <section id="stats" className="bg-brand-600 py-14">
      <div className="container-section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          {STATS.map(({ value, label, suffix }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold mb-1">
                {value}
                <span className="text-brand-300">{suffix}</span>
              </span>
              <span className="text-sm text-brand-100 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
