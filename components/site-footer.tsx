import { NAV_LINKS, SITE } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer
      id="contacto"
      className="bg-carbon py-8 text-ui-sm text-muted-on-carbon sm:py-9"
    >
      <div className="mx-auto grid max-w-[1360px] gap-6 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <h2 className="mb-3 text-caption font-bold uppercase tracking-wider text-on-carbon">
            {SITE.name}
          </h2>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-on-carbon">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-caption font-bold uppercase tracking-wider text-on-carbon">
            Contacto
          </h2>
          <ul className="flex flex-col gap-2">
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-on-carbon">
                {SITE.phoneLabel}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                className="hover:text-on-carbon"
              >
                WhatsApp
              </a>
            </li>
            {SITE.instagramUrl ? (
              <li>
                <a href={SITE.instagramUrl} className="hover:text-on-carbon">
                  Instagram
                </a>
              </li>
            ) : null}
            {SITE.facebookUrl ? (
              <li>
                <a href={SITE.facebookUrl} className="hover:text-on-carbon">
                  Facebook
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-caption font-bold uppercase tracking-wider text-on-carbon">
            Legal
          </h2>
          <p className="m-0">Aviso de privacidad: pendiente de redactar con el restaurante.</p>
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-[1360px] border-t border-white/10 px-4 pt-5 sm:px-6">
        <p>© {new Date().getFullYear()} Taquerías El Plomazo.</p>
      </div>
    </footer>
  );
}
