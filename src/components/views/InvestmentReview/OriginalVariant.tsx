import React from 'react';

const attachments = [
  {
    title: 'Subscription Agreement & Privacy Notice',
    subtitle: 'Legal Document • PDF',
    href: '#subscription-agreement',
  },
  {
    title: 'Limited Liability Company Agreement',
    subtitle: 'Legal Document • PDF',
    href: '#llc-agreement',
  },
  {
    title: 'Private Placement Memorandum',
    subtitle: 'Legal Document • PDF',
    href: '#ppm',
  },
];

export function OriginalVariantContent() {
  return (
    <>
      <p className="text-foreground leading-relaxed">
        Great pace—you've reviewed the docs for your investment in{' '}
        <strong>Databricks</strong>.
      </p>
      <p className="text-foreground leading-relaxed mt-3">
        These are standard across private funds. Quick confirmations:
      </p>
      <ol className="mt-3 space-y-2 text-muted-foreground">
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-semibold">
            1
          </span>
          <span>Accredited investor</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-semibold">
            2
          </span>
          <span>Long-term and illiquid (5-7+ years)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-semibold">
            3
          </span>
          <span>Docs reviewed (PPM, LLOA, Subscription Agreement)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-semibold">
            4
          </span>
          <span>Capital at risk / no guarantees</span>
        </li>
      </ol>
      <p className="text-foreground leading-relaxed mt-4 p-3 bg-accent/5 rounded-lg border border-accent/10">
        When these look good, just say <strong>"all clear"</strong> and we'll
        move to your signature.
      </p>
    </>
  );
}

export { attachments as originalVariantAttachments };
