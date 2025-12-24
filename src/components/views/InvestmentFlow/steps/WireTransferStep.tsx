import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { InvestmentSummary } from "../components/InvestmentSummary";
import { FAQSection } from "../components/FAQSection";
import { type CompanyData, type FAQItem } from "../types";
import { ChevronDown, Copy, Check, Minus } from "lucide-react";

// Wire transfer FAQ items
const WIRE_TRANSFER_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Will I need to enter my bank details here?",
    answer:
      "No. You'll use these details to initiate the wire directly from your bank.",
  },
  {
    question: "When will I receive the transfer instructions?",
  },
  {
    question: "Can I complete the transfer later?",
  },
  {
    question: "Are there any fees?",
  },
];

// Domestic bank details
const DOMESTIC_BANK_DETAILS = {
  accountNumber: "9800000000",
  routingNumber: "084009519",
  referenceId: "GF-2024-INV-78432",
  recipientName: "Goodfin Capital LLC",
  recipientAddress:
    "123 Financial District, Suite 400, San Francisco, CA 94111",
  memoContent: "Investment - GF-2024-INV-78432",
};

// International bank details
const INTERNATIONAL_BANK_DETAILS = {
  // Step 1: Beneficiary bank information
  swiftBicCode: "CLNOUS66MER",
  routingNumber: "121145433",
  bankName: "Column National Association",
  bankAddress:
    "1 Letterman Drive, Building A, Suite A4-700 San Francisco, CA 94129 USA",
  // Step 2: Beneficiary information
  beneficiaryName: "GoodFin, Inc.",
  beneficiaryAccountNumber: "187418829466566",
  beneficiaryAddress: "16192 Coastal Highway, Lewes, DE 19958",
  // Step 3: Memo content
  uniqueReferenceId: "TF4GN",
};

interface WireTransferStepProps {
  amount: number;
  company: CompanyData;
  onConfirm: () => void;
  onBack?: () => void;
}

export function WireTransferStep({
  amount,
  company,
  onConfirm,
}: WireTransferStepProps) {
  const [transferType, setTransferType] = useState<
    "domestic" | "international"
  >("domestic");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFundingOverlay, setShowFundingOverlay] = useState(false);
  const [overlayAnimated, setOverlayAnimated] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Funding source form state
  const [bankName, setBankName] = useState("");
  const [bankLocation, setBankLocation] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAccountHolderDropdown, setShowAccountHolderDropdown] =
    useState(false);

  // Animate overlay when shown
  useEffect(() => {
    if (showFundingOverlay) {
      const timer = setTimeout(() => {
        setOverlayAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setOverlayAnimated(false);
    }
  }, [showFundingOverlay]);

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInitiateTransfer = () => {
    setShowFundingOverlay(true);
  };

  const handleConfirmFunding = () => {
    onConfirm();
  };

  const isFormValid = bankName.trim() && bankLocation && accountHolder;

  // Format amount for display
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  // Copy field component
  const CopyField = ({
    label,
    value,
    fieldKey,
  }: {
    label: string;
    value: string;
    fieldKey: string;
  }) => {
    const isCopied = copiedField === fieldKey;

    return (
      <div
        className={cn(
          "group/row flex items-start justify-between py-1.5 px-2 -mx-2 rounded-md cursor-pointer",
          "transition-all duration-500 ease-out",
          isCopied ? "bg-[#dcf5dc]" : "bg-transparent hover:bg-[#eae8eb]"
        )}
        onClick={() => handleCopy(fieldKey, value)}
      >
        <div className="flex flex-col gap-0.5">
          <span
            className="text-[11px] leading-[16px] text-[#8a7f91] uppercase tracking-[0.6px] font-semibold"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {label}
          </span>
          <span
            className="text-[15px] leading-[22px] text-[#373338]"
            style={{ fontFamily: "Soehne, sans-serif" }}
          >
            {value}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy(fieldKey, value);
          }}
          className={cn(
            "p-2 rounded-lg transition-all",
            isCopied
              ? "bg-[#c5ecc5] opacity-100"
              : "opacity-0 group-hover/row:opacity-100 hover:bg-[#d9d5db]"
          )}
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-[#3a7a3a]" />
          ) : (
            <Copy className="w-4 h-4 text-[#685f6a]" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1032px] mx-auto px-2.5 py-2.5">
      {/* Header */}
      <div className="flex flex-col gap-1.5 items-start px-2.5 py-6 w-full">
        <h1
          className="text-[28px] leading-[32px] text-[#373338] w-full"
          style={{ fontFamily: "Test Signifier, serif" }}
        >
          Send the wire from your bank
        </h1>
        <p
          className="text-[16px] leading-[24px] text-[#685f6a]"
          style={{ fontFamily: "Soehne, sans-serif" }}
        >
          We'll reserve your allocation once your wire is received and
          confirmed.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex items-start justify-between w-full gap-4">
        {/* Left Panel - Wire Details Card */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-6 p-8 w-full rounded-lg relative overflow-hidden">
            {/* Section Header */}
            <div className="flex flex-col gap-4">
              <h2
                className="text-[28px] leading-[24px] text-[#554d57]"
                style={{ fontFamily: "Test Signifier, serif" }}
              >
                Receiving Bank Details
              </h2>

              {/* Transfer Type Question & Dropdown */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] leading-[20px] text-[#373338] font-medium tracking-[-0.15px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Are you sending funds from the U.S.?
                </label>
                <div className="relative w-[283px]">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full flex items-center justify-between px-[13px] py-2 bg-white border border-[#e5e7eb] rounded-lg h-[36px]"
                  >
                    <span
                      className="text-[14px] leading-[20px] text-[#0a0a0a] font-medium tracking-[-0.15px]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {transferType === "domestic"
                        ? "Yes, Domestic"
                        : "No, International"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-[#685f6a] transition-transform",
                        showDropdown && "rotate-180"
                      )}
                    />
                  </button>

                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => {
                          setTransferType("domestic");
                          setShowDropdown(false);
                        }}
                        className={cn(
                          "w-full px-[13px] py-2 text-left text-[14px] leading-[20px] font-medium hover:bg-[#f7f7f8] rounded-t-lg",
                          transferType === "domestic" && "bg-[#f7f7f8]"
                        )}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Yes, Domestic
                      </button>
                      <button
                        onClick={() => {
                          setTransferType("international");
                          setShowDropdown(false);
                        }}
                        className={cn(
                          "w-full px-[13px] py-2 text-left text-[14px] leading-[20px] font-medium hover:bg-[#f7f7f8] rounded-b-lg",
                          transferType === "international" && "bg-[#f7f7f8]"
                        )}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        No, International
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bank Details Card */}
            <div className="bg-[#f4f3f5] border border-[#48424a] p-[18px] flex flex-col gap-4 group">
              {/* Processing Badge */}
              <div className="bg-[#9b929e] px-1.5 py-0.5 rounded-sm self-start">
                <span
                  className="text-[12px] leading-[16px] text-[#f0eef0] uppercase tracking-[0.36px] font-semibold"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  Same-day processing if received before 3:00 PM PT
                </span>
              </div>

              {transferType === "domestic" ? (
                /* Domestic Bank Details */
                <div className="flex flex-col gap-1">
                  <CopyField
                    label="Account Number"
                    value={DOMESTIC_BANK_DETAILS.accountNumber}
                    fieldKey="accountNumber"
                  />
                  <CopyField
                    label="Routing Number"
                    value={DOMESTIC_BANK_DETAILS.routingNumber}
                    fieldKey="routingNumber"
                  />
                  <CopyField
                    label="Reference ID"
                    value={DOMESTIC_BANK_DETAILS.referenceId}
                    fieldKey="referenceId"
                  />
                  <CopyField
                    label="Recipient Name"
                    value={DOMESTIC_BANK_DETAILS.recipientName}
                    fieldKey="recipientName"
                  />
                  <CopyField
                    label="Recipient Address"
                    value={DOMESTIC_BANK_DETAILS.recipientAddress}
                    fieldKey="recipientAddress"
                  />
                  <CopyField
                    label="Memo / Reference"
                    value={DOMESTIC_BANK_DETAILS.memoContent}
                    fieldKey="memoContent"
                  />
                </div>
              ) : (
                /* International Bank Details - Step by Step */
                <div className="flex flex-col gap-6">
                  {/* Step 1: Beneficiary Bank Information */}
                  <div className="flex flex-col gap-1">
                    <div className="py-1.5">
                      <p
                        className="text-[16px] leading-[24px] text-[#373338] uppercase"
                        style={{ fontFamily: "Test Signifier, serif" }}
                      >
                        Step 1
                      </p>
                      <p
                        className="text-[12px] leading-[16px] text-[#685f6a]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Enter beneficiary bank information
                      </p>
                    </div>
                    <CopyField
                      label="SWIFT/BIC Code"
                      value={INTERNATIONAL_BANK_DETAILS.swiftBicCode}
                      fieldKey="swiftBicCode"
                    />
                    <CopyField
                      label="SWIFT ABA/Routing/Transit Number (if asked)"
                      value={INTERNATIONAL_BANK_DETAILS.routingNumber}
                      fieldKey="intlRoutingNumber"
                    />
                    <CopyField
                      label="Bank Name"
                      value={INTERNATIONAL_BANK_DETAILS.bankName}
                      fieldKey="intlBankName"
                    />
                    <CopyField
                      label="Bank Address"
                      value={INTERNATIONAL_BANK_DETAILS.bankAddress}
                      fieldKey="bankAddress"
                    />
                  </div>

                  {/* Step 2: Beneficiary Information */}
                  <div className="flex flex-col gap-1">
                    <div className="py-1.5">
                      <p
                        className="text-[16px] leading-[24px] text-[#373338] uppercase"
                        style={{ fontFamily: "Test Signifier, serif" }}
                      >
                        Step 2
                      </p>
                      <p
                        className="text-[12px] leading-[16px] text-[#685f6a]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Enter beneficiary information
                      </p>
                    </div>
                    <CopyField
                      label="Beneficiary Name"
                      value={INTERNATIONAL_BANK_DETAILS.beneficiaryName}
                      fieldKey="beneficiaryName"
                    />
                    <CopyField
                      label="Beneficiary Account Number"
                      value={
                        INTERNATIONAL_BANK_DETAILS.beneficiaryAccountNumber
                      }
                      fieldKey="beneficiaryAccountNumber"
                    />
                    <CopyField
                      label="Beneficiary Address"
                      value={INTERNATIONAL_BANK_DETAILS.beneficiaryAddress}
                      fieldKey="beneficiaryAddress"
                    />
                  </div>

                  {/* Step 3: Memo Content */}
                  <div className="flex flex-col gap-1">
                    <div className="py-1.5">
                      <p
                        className="text-[16px] leading-[24px] text-[#373338] uppercase"
                        style={{ fontFamily: "Test Signifier, serif" }}
                      >
                        Step 3
                      </p>
                      <p
                        className="text-[12px] leading-[16px] text-[#685f6a]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Enter memo content
                      </p>
                    </div>
                    <CopyField
                      label="Unique Reference ID"
                      value={INTERNATIONAL_BANK_DETAILS.uniqueReferenceId}
                      fieldKey="uniqueReferenceId"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleInitiateTransfer}
              className={cn(
                "w-full py-3 px-8 rounded-lg text-[16px] leading-[20px] text-[#f4f3f5]",
                "shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)]",
                "relative overflow-hidden"
              )}
              style={{
                fontFamily: "Soehne Kraftig, sans-serif",
                background:
                  "linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)",
              }}
            >
              I've initiated the bank transfer
              <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
            </button>

            {/* Funding Source Overlay */}
            {showFundingOverlay && (
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 bg-white border border-[#e6e4e7] rounded-t-[30px] overflow-hidden",
                  "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  overlayAnimated
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                )}
              >
                {/* Minimize Button */}
                <button
                  onClick={() => setShowFundingOverlay(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-[#f4f3f5] rounded-lg transition-colors"
                >
                  <Minus className="w-5 h-5 text-[#685f6a]" />
                </button>

                <div className="flex flex-col gap-4 px-[37px] pt-[21px] pb-6">
                  {/* Title */}
                  <div className="flex flex-col gap-1 pr-8">
                    <p
                      className="text-[20px] leading-[32px] text-[#373338] tracking-[-0.4px]"
                      style={{ fontFamily: "Test Signifier, serif" }}
                    >
                      Confirm your funding source
                    </p>
                    <p
                      className="text-[14px] leading-[18px] text-[#685f6a]"
                      style={{ fontFamily: "Soehne, sans-serif" }}
                    >
                      Please provide details about the bank you're sending from.
                    </p>
                  </div>

                  {/* Bank Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                      style={{ fontFamily: "Soehne, sans-serif" }}
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. Chase, Bank of America"
                      className="w-full px-4 py-3 bg-white border border-[#d9dde9] rounded-lg text-[16px] leading-[20px] text-[#373338] placeholder:text-[#a9a4ab]"
                      style={{ fontFamily: "Soehne, sans-serif" }}
                    />
                  </div>

                  {/* Bank Location Dropdown */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label
                      className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                      style={{ fontFamily: "Soehne, sans-serif" }}
                    >
                      Bank Location
                    </label>
                    <button
                      onClick={() => {
                        setShowLocationDropdown(!showLocationDropdown);
                        setShowAccountHolderDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#d9dde9] rounded-lg"
                    >
                      <span
                        className={cn(
                          "text-[16px] leading-[20px]",
                          bankLocation ? "text-[#373338]" : "text-[#a9a4ab]"
                        )}
                        style={{ fontFamily: "Soehne, sans-serif" }}
                      >
                        {bankLocation || "Select country"}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-[#685f6a] transition-transform",
                          showLocationDropdown && "rotate-180"
                        )}
                      />
                    </button>

                    {showLocationDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {[
                          "United States",
                          "Canada",
                          "United Kingdom",
                          "Germany",
                          "France",
                          "Australia",
                          "Other",
                        ].map((country) => (
                          <button
                            key={country}
                            onClick={() => {
                              setBankLocation(country);
                              setShowLocationDropdown(false);
                            }}
                            className={cn(
                              "w-full px-4 py-3 text-left text-[16px] leading-[20px] hover:bg-[#f7f7f8]",
                              bankLocation === country && "bg-[#f7f7f8]"
                            )}
                            style={{ fontFamily: "Soehne, sans-serif" }}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Account Holder Dropdown */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label
                      className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                      style={{ fontFamily: "Soehne, sans-serif" }}
                    >
                      Account Holder Status
                    </label>
                    <button
                      onClick={() => {
                        setShowAccountHolderDropdown(
                          !showAccountHolderDropdown
                        );
                        setShowLocationDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#d9dde9] rounded-lg"
                    >
                      <span
                        className={cn(
                          "text-[16px] leading-[20px]",
                          accountHolder ? "text-[#373338]" : "text-[#a9a4ab]"
                        )}
                        style={{ fontFamily: "Soehne, sans-serif" }}
                      >
                        {accountHolder || "Select status"}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-[#685f6a] transition-transform",
                          showAccountHolderDropdown && "rotate-180"
                        )}
                      />
                    </button>

                    {showAccountHolderDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-lg shadow-lg z-10">
                        {[
                          "I am the account holder",
                          "Joint account holder",
                          "Business account",
                        ].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setAccountHolder(status);
                              setShowAccountHolderDropdown(false);
                            }}
                            className={cn(
                              "w-full px-4 py-3 text-left text-[16px] leading-[20px] hover:bg-[#f7f7f8]",
                              accountHolder === status && "bg-[#f7f7f8]"
                            )}
                            style={{ fontFamily: "Soehne, sans-serif" }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Promo Code Input (Optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                      style={{ fontFamily: "Soehne, sans-serif" }}
                    >
                      Promo Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full px-4 py-3 bg-white border border-[#d9dde9] rounded-lg text-[16px] leading-[20px] text-[#373338] placeholder:text-[#a9a4ab]"
                      style={{ fontFamily: "Soehne, sans-serif" }}
                    />
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmFunding}
                    disabled={!isFormValid}
                    className={cn(
                      "w-full py-3 px-8 rounded-lg text-[16px] leading-[20px] text-[#f4f3f5]",
                      "shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)]",
                      "relative overflow-hidden mt-2",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    style={{
                      fontFamily: "Soehne Kraftig, sans-serif",
                      background:
                        "linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)",
                    }}
                  >
                    Confirm and continue
                    <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Summary & FAQ */}
        <div className="flex-1 flex flex-col gap-6 p-2.5 min-w-0">
          {/* Investment Summary */}
          <InvestmentSummary amount={amount} company={company} />

          {/* FAQ Section */}
          <FAQSection items={WIRE_TRANSFER_FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}
