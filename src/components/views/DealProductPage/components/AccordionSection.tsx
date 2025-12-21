import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function AccordionSection({
  title,
  children,
  defaultOpen = false,
  icon,
  className,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border-b border-[#e6e4e7]', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-[#29272a]">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-[#7f7582] transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && children && (
        <div className="pb-4 text-sm text-[#48424a]">{children}</div>
      )}
    </div>
  );
}

// Predefined accordion sections for the investment panel
export function SupportAccordion() {
  return (
    <AccordionSection
      title="Support"
      icon={<HelpCircle className="w-4 h-4 text-[#7f7582]" />}
    >
      <p>Contact our support team for any questions about your investment.</p>
    </AccordionSection>
  );
}

export function TermsAccordion() {
  return (
    <AccordionSection title="Terms & Conditions">
      <p>Please read our terms and conditions carefully before investing.</p>
    </AccordionSection>
  );
}

export function DisclaimerAccordion() {
  return (
    <AccordionSection title="Disclaimer">
      <p>
        Investment in private companies involves substantial risk. Past
        performance is not indicative of future results.
      </p>
    </AccordionSection>
  );
}

export function LegalDocumentsAccordion() {
  return (
    <AccordionSection title="Legal Documents">
      <p>Access subscription agreements, offering memorandums, and other legal documents.</p>
    </AccordionSection>
  );
}

export function PresentationDeckAccordion() {
  return (
    <AccordionSection title="Presentation Deck">
      <p>View the company's investor presentation and pitch deck.</p>
    </AccordionSection>
  );
}
