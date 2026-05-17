import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";

export const dynamic = "force-static";

export default function CfaPage() {
  return (
    <>
      {/* HEADER minimal — logo + retour apex uniquement (doctrine "chacun son univers") */}
      <header className="w-full bg-paper border-b border-trait">
        <div className="max-w-[1080px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
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
          <nav className="text-[13px] text-[#5F5E5A]">
            <a href="https://clicknpop.fr" className="hover:text-sauge-dark transition-colors">
              ← Retour Click&apos;n Pop
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-paper flex items-center justify-center px-8 py-24 min-h-[70vh]">
        <div className="w-full max-w-[480px] text-center">
          <h1 className="animate-pop-reveal font-serif text-[28px] sm:text-[30px] text-ink font-normal leading-[1.3]">
            L&apos;app CFA / OF / CCI arrive bientôt.
          </h1>

          <p className="mt-4 mb-10 text-[15px] text-carbone leading-[1.7]">
            Laissez votre email professionnel.
            <br />
            On vous prévient au lancement.
          </p>

          <WaitlistForm
            fourthSelect={{
              name: "type_structure",
              label: "Quel type de structure êtes-vous ?",
              placeholder: "Choisir...",
              options: [
                { label: "CFA classique", value: "CFA classique" },
                { label: "Organisme de formation alternance", value: "Organisme de formation alternance" },
                { label: "CCI / Chambre consulaire", value: "CCI / Chambre consulaire" },
              ],
            }}
            successMessage="Merci. On vous écrit dès que l'app CFA / OF / CCI ouvre."
          />

          <p className="mt-4 text-[12px]">
            <a
              href="https://clicknpop.fr"
              className="text-sauge hover:text-sauge-dark transition-colors"
            >
              ← Retour à clicknpop.fr
            </a>
          </p>
        </div>
      </main>

      <footer className="py-5 px-8 text-center">
        <nav className="flex items-center justify-center gap-x-3 text-[11px] text-[#888780]">
          <a href="#" className="hover:text-sauge-dark transition-colors">Mentions légales</a>
          <span aria-hidden="true">·</span>
          <a href="#" className="hover:text-sauge-dark transition-colors">RGPD</a>
        </nav>
      </footer>
    </>
  );
}
