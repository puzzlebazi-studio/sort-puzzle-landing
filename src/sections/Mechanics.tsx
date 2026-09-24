import { GameIcon } from "../components/GameIcon";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { MECHANICS } from "../data/content";
import { faNumber } from "../lib/fa";

export function Mechanics() {
  return (
    <section id="mechanics" className="relative py-20 md:py-28">
      <div aria-hidden="true" className="absolute top-1/3 left-1/2 -z-10 h-96 w-[56rem] max-w-full -translate-x-1/2 rounded-full bg-aqua-400/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="چالش‌ها"
          tone="red"
          title="چهار چالش تازه"
          subtitle="از مرحله ۳۱ به بعد، مرحله‌ها فقط طولانی‌تر نمی‌شوند؛ قانون تازه‌ای هم در کار است. اولین بار که هرکدام را ببینی، بازی توضیحش می‌دهد."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MECHANICS.map((mechanic, i) => (
            <li key={mechanic.id}>
              <Reveal delay={(i % 4) * 90} className="h-full">
                <article className="card-3d flex h-full flex-col p-3 pb-6 transition-transform duration-300 hover:-translate-y-2">
                  <span className="eyebrow tone-gold absolute -top-4 z-10 text-[0.95rem] [inset-inline-start:1.1rem]">از مرحله {faNumber(mechanic.from)}</span>
                  <div className="overflow-hidden rounded-[1.25rem] border-[3px] border-choco bg-grape-600">
                    <img
                      src={mechanic.image}
                      alt={mechanic.alt}
                      width={540}
                      height={480}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="block aspect-[9/8] w-full object-cover"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-3 px-2">
                    <GameIcon icon={mechanic.icon} tone={mechanic.tone} size={46} />
                    <h3 className="text-[1.45rem] leading-snug">{mechanic.title}</h3>
                  </div>
                  <p className="mt-2 px-2 text-[1.05rem] leading-8 text-choco-soft">{mechanic.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
