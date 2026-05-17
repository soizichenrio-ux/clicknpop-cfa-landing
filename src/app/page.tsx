import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";
import {
  IconUsers,
  IconChartBar,
  IconFileText,
  IconTrendingUp,
} from "@/components/icons";

export const dynamic = "force-static";

const ARGUMENTS = [
  {
    icon: <IconUsers />,
    title: "Tuteur-Screener : maître d'apprentissage validé",
    body: "Vérification automatique R.6223-22 + capacité à transmettre. Plus de surprises J+30 sur la qualité du tutorat entreprise.",
  },
  {
    icon: <IconChartBar />,
    title: "Pilotage-CFA temps réel",
    body: "Tableau de bord conformité Qualiopi, suivi parcours apprenti·es J+30 / J+90 / J+180, alertes en cas de signaux faibles.",
  },
  {
    icon: <IconFileText />,
    title: "Convention tripartite générée",
    body: "Convention tripartite Cerfa et OPCO pré-remplie depuis le match. Gain de temps administratif et conformité garantie.",
  },
  {
    icon: <IconTrendingUp />,
    title: "Taux de rupture en baisse",
    body: "Click'n Pop évalue la compatibilité mission × candidat avant le contrat. Résultat : moins de ruptures, plus de parcours qui tiennent jusqu'à l'examen.",
  },
];

export default function CfaPage() {
  return (
    <>
      <header className="w-full bg-paper border-b border-trait">
        <div className="max-w-[1080px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <a href="https://clicknpop.fr" aria-label="Click'n Pop — accueil">
            <Image
              src="/assets/logo-clicknpop-officiel.png"
              alt="Click'n Pop"
              width={32}
              height={32}
              className="rounded-md"
              priority
            />
          </a>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#5F5E5A]">
            <a href="https://candidat.clicknpop.fr" className="hover:text-sauge-dark transition-colors">
              Vous cherchez un job&nbsp;?
            </a>
            <a href="https://entreprise.clicknpop.fr" className="hover:text-sauge-dark transition-colors">
              Vous recrutez&nbsp;?
            </a>
            <a href="https://clicknpop.fr" className="hover:text-sauge-dark transition-colors">
              ← Retour Click&apos;n Pop
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-paper">
        <section className="max-w-[680px] mx-auto px-8 pt-16 pb-12 text-center">
          <h1 className="animate-pop-reveal font-serif text-[36px] sm:text-[44px] leading-[1.1] text-ink font-normal">
            Le recrutement
            <br />
            qui fait pop.
          </h1>

          <p className="mt-5 font-serif italic text-[18px] text-sauge leading-snug">
            Pour les CFA et OF qui veulent placer leurs apprenti·es durablement.
          </p>

          <div className="mt-6 mb-8 text-[16px] text-carbone leading-[1.7] text-left sm:text-center">
            <p>Un apprentissage se casse souvent à J+90.</p>
            <p>Mauvais match candidat-entreprise, maître d&apos;apprentissage mal positionné, mission floue.</p>
            <p className="mt-4">Click&apos;n Pop sourcier et place vos apprenti·es là où ça tient. Vraiment.</p>
          </div>
        </section>

        <section aria-labelledby="args-cfa-heading" className="max-w-[920px] mx-auto px-6 pb-16">
          <h2 id="args-cfa-heading" className="sr-only">
            Pourquoi Click&apos;n Pop pour les CFA et OF
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
            {ARGUMENTS.map((arg) => (
              <li key={arg.title} className="flex gap-4">
                <span className="shrink-0 mt-1">{arg.icon}</span>
                <div>
                  <h3 className="font-serif text-[17px] font-medium text-ink leading-snug">{arg.title}</h3>
                  <p className="mt-2 text-[14px] text-carbone leading-relaxed">{arg.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="waitlist-cfa-heading"
          className="bg-[rgba(107,132,103,0.06)] px-8 py-12"
        >
          <div className="max-w-[560px] mx-auto">
            <h2 id="waitlist-cfa-heading" className="font-serif text-[22px] text-ink">
              On prépare l&apos;app CFA / OF pour fin mai.
            </h2>
            <p className="mt-2 text-[14px] text-carbone leading-relaxed">
              Laissez votre email professionnel. On vous prévient au lancement.
            </p>
            <WaitlistForm
              thirdFieldLabel="Nom du CFA ou OF"
              thirdFieldPlaceholder="Nom de votre CFA ou organisme de formation"
              thirdFieldName="raison_sociale"
            />
          </div>
        </section>
      </main>

      <footer className="bg-[rgba(107,132,103,0.04)] py-6 px-8 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] text-[#888780]">
          <a href="https://candidat.clicknpop.fr" className="hover:text-sauge-dark transition-colors">Candidat·e</a>
          <span aria-hidden="true">·</span>
          <a href="https://entreprise.clicknpop.fr" className="hover:text-sauge-dark transition-colors">Entreprise</a>
          <span aria-hidden="true">·</span>
          <a href="https://clicknpop.fr" className="hover:text-sauge-dark transition-colors">Retour à l&apos;accueil</a>
          <span aria-hidden="true">·</span>
          <a href="#" className="hover:text-sauge-dark transition-colors">RGPD</a>
        </nav>
      </footer>
    </>
  );
}
