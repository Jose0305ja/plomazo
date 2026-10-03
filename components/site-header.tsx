"use client";

import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-surface="carbon"
      className="sticky top-0 z-50 bg-carbon text-on-carbon"
    >
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:px-6">
        <a
          href="#inicio"
          className="flex items-center gap-2 font-display text-2xl uppercase text-on-carbon no-underline"
        >
          <span className="flex h-[36px] w-[36px] flex-none items-center justify-center rounded-sm bg-ember font-display text-base">
            P
          </span>
          {SITE.name}
        </a>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-5 min-[900px]:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b-2 border-transparent pb-1 text-ui-sm font-semibold tracking-wide text-muted-on-carbon transition-colors hover:border-ember hover:text-on-carbon"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-on-carbon min-[900px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        {open ? (
          <div
            id="mobile-nav"
            className="absolute inset-x-0 top-full z-40 flex flex-col bg-carbon-raised px-4 py-3 min-[900px]:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 font-semibold text-on-carbon last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
