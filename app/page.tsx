import { LinkButton } from "@/components/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  BRANCHES,
  CATEGORIES,
  FEATURED,
  PROMOTIONS,
  formatPrice,
} from "@/lib/content";

function Photo({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={["ph-photo flex items-start p-3", className].filter(Boolean).join(" ")}
    >
      <span className="rounded-sm bg-black/55 px-2 py-1 text-caption text-on-carbon">
        {label}
      </span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <SiteHeader />
      <main id="main-content">
        <section id="inicio" className="bg-carbon text-on-carbon">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-4 py-9 sm:px-6 sm:py-10">
            <p className="m-0 flex items-center gap-2 text-caption font-bold uppercase tracking-widest text-corn">
              <span aria-hidden="true" className="h-0.5 w-[18px] flex-none bg-current" />
              Norteño, auténtico, de barrio
            </p>
            <h1 className="m-0 max-w-2xl font-display text-[clamp(2.5rem,7vw,4.5rem)] font-normal uppercase leading-[0.95]">
              Tacos que se ganan el barrio a la parrilla
            </h1>
            <p className="m-0 max-w-md text-body-lg text-muted-on-carbon">
              Trompo al pastor, carbón encendido y las mismas recetas de siempre.
              Pide directo o pasa a cualquiera de nuestras sucursales.
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="#menu">Ver el menú</LinkButton>
              <LinkButton
                href="#sucursales"
                variant="outline"
                className="border-on-carbon text-on-carbon hover:bg-white/10"
              >
                Encontrar sucursal
              </LinkButton>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1360px] px-4 py-9 sm:px-6">
          <section id="menu" aria-labelledby="menu-heading" className="mb-9">
            <h2 id="menu-heading" className="mb-5 text-heading-sm">
              Menú
            </h2>
            <div className="mb-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {CATEGORIES.map((name) => (
                <div
                  key={name}
                  className="stagger-in relative flex aspect-[3/4] items-end overflow-hidden rounded-md text-on-carbon"
                >
                  <Photo label={`Foto de ${name} pendiente`} className="absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <p className="relative m-0 p-4 font-display text-heading-sm uppercase">
                    {name}
                  </p>
                </div>
              ))}
            </div>
            <h3 className="mb-5 text-body-lg font-bold">Lo más pedido</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {FEATURED.map((item) => (
                <div
                  key={item.name}
                  className="relative flex aspect-[4/5] items-end overflow-hidden rounded-md text-on-carbon sm:aspect-[4/3]"
                >
                  <Photo label={`Foto de ${item.name} pendiente`} className="absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="relative w-full p-5">
                    <p className="m-0 mb-1 font-display text-heading-sm uppercase">
                      {item.name}
                    </p>
                    <p className="m-0 mb-1 text-ui-sm text-muted-on-carbon">
                      {item.note}
                    </p>
                    <span className="text-price-lg font-extrabold tabular-nums">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="promociones" aria-labelledby="promos-heading" className="mb-9">
            <h2 id="promos-heading" className="mb-5 text-heading-sm">
              Promociones
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {PROMOTIONS.map((promo) => (
                <article
                  key={promo.title}
                  className="overflow-hidden rounded-md border border-border bg-warm-white"
                >
                  <Photo label="Foto de la promoción pendiente" className="aspect-video" />
                  <div className="p-4">
                    <h3 className="m-0 mb-1 text-body-lg font-bold">{promo.title}</h3>
                    <p className="m-0 text-ui-sm text-muted-ink">{promo.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="sucursales" aria-labelledby="sucursales-heading" className="mb-9">
            <h2 id="sucursales-heading" className="mb-5 text-heading-sm">
              Sucursales
            </h2>
            <div>
              {BRANCHES.map((branch) => (
                <div
                  key={branch.name}
                  className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-5"
                >
                  <div>
                    <h3 className="m-0 mb-1 text-body-lg font-bold">{branch.name}</h3>
                    <p className="m-0 text-ui-sm text-muted-ink">{branch.address}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <LinkButton href={`tel:${branch.phone}`} variant="call" small>
                      Llamar
                    </LinkButton>
                    <LinkButton
                      href={`https://wa.me/${branch.whatsapp}`}
                      variant="whatsapp"
                      small
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </LinkButton>
                    <LinkButton
                      href={branch.mapsUrl}
                      variant="outline"
                      small
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cómo llegar
                    </LinkButton>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="nosotros" aria-labelledby="nosotros-heading">
            <h2 id="nosotros-heading" className="mb-3 text-heading-sm">
              Una historia de lumbre y barrio
            </h2>
            <p className="m-0 max-w-2xl text-body-lg text-muted-ink">
              Este texto es un marcador de posición: la historia real, con fechas,
              lugares y voz del restaurante, se redactará con el material que
              entregue el negocio.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
