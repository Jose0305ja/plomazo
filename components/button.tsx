import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "call" | "whatsapp";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ember text-on-ember hover:bg-ember-hover",
  outline: "border-2 border-carbon text-ink hover:bg-carbon/5",
  call: "bg-carbon text-on-carbon hover:bg-carbon-hover",
  whatsapp: "bg-whatsapp text-on-whatsapp hover:bg-whatsapp-hover",
};

export function LinkButton({
  variant = "primary",
  small = false,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  small?: boolean;
}) {
  return (
    <a
      className={[
        "inline-flex items-center justify-center rounded-sm font-bold no-underline transition-colors",
        small ? "min-h-9 px-4 text-ui-sm" : "min-h-11 px-5 text-body",
        VARIANTS[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
