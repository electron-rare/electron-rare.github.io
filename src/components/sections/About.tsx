export function About() {
  return (
    <section id="a-propos" aria-labelledby="about-title" className="section-anchor mt-5">
      <div className="rounded-2xl border border-violet-200/20 bg-violet-100/5 p-5 md:p-6">
        <h2 id="about-title" className="m-0 text-3xl md:text-4xl">
          À propos
        </h2>
        <p className="mb-0 mt-3 max-w-3xl text-violet-100/85">
          Je suis <strong>Clement Saillant</strong>, createur sous le nom <strong>L&apos;electron rare</strong>.
          Mon terrain: creation electronique, invention de systemes, design de produit et conception
          d&apos;objets/experiences hybrides entre code, son et image.
        </p>
        <p className="mb-0 mt-3 max-w-3xl text-violet-100/72">
          Posture de travail: rigueur pro, execution creative, iteration IA continue et esprit
          laboratoire pour transformer une intuition en systeme utilisable.
        </p>
      </div>
    </section>
  );
}
