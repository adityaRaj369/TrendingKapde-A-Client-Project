import Link from "next/link";
import Reveal from "./Reveal";

/**
 * Numbered, editorial section header used across the storefront.
 */
export default function SectionHeader({ index, eyebrow, title, href, cta = "See all" }) {
  return (
    <Reveal className="flex items-end justify-between gap-6 mb-8 md:mb-12">
      <div className="flex items-end gap-4 md:gap-6">
        {index && (
          <span className="font-mega text-stone leading-none text-4xl md:text-6xl select-none">
            {index}
          </span>
        )}
        <div>
          {eyebrow && <p className="label text-ash mb-1">{eyebrow}</p>}
          <h2 className="font-display font-extrabold uppercase tracking-tightest h-section">
            {title}
          </h2>
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="hidden md:inline-flex items-center gap-2 label group whitespace-nowrap"
        >
          <span className="hover-underline">{cta}</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      )}
    </Reveal>
  );
}
