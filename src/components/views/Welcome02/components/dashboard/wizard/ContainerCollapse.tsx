import React, { useState } from 'react';
import svgPaths from "../../../imports/svg-y0mrai13ae";
import { cn } from "@/lib/utils";

type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={cn("flex flex-col font-sans font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap", additionalClassNames)}>
      <p className="leading-[24px]">{children}</p>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <Wrapper>
      <g clipPath="url(#clip0_2004_882)" id="keyboard_arrow_down">
        <g id="Vector"></g>
        <path d={svgPaths.pdde3a00} fill="var(--fill-0, #373338)" id="Vector_2" />
      </g>
      <defs>
        <clipPath id="clip0_2004_882">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </Wrapper>
  );
}

function MdiTick() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="mdi:tick">
          <path d={svgPaths.pb56a500} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ProgressItem({
  label,
  index,
  currentStep
}: {
  label: string;
  index: number;
  currentStep: number;
}) {
  const isCompleted = currentStep > index;
  const isActive = currentStep === index;

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0">
       {isCompleted ? (
          <div className="bg-[#554f59] content-stretch flex flex-col gap-[7.5px] items-center justify-center p-[7.5px] relative rounded-[60px] shrink-0 size-[24px]">
             <MdiTick />
          </div>
       ) : (
          <div className={cn(
              "content-stretch flex flex-col items-center justify-center p-[7.5px] relative rounded-[60px] shrink-0 size-[24px]",
              isActive ? "bg-[#9a90a1]" : "bg-[#e6e4e7]"
          )}>
              <div className="flex flex-col font-sans font-semibold justify-end leading-[0] relative shrink-0 text-[10.5px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                 <p className="leading-[18px]">{index}</p>
              </div>
          </div>
       )}

       <div className="flex flex-col font-serif justify-center leading-[0] not-italic relative shrink-0 text-[#554f59] text-[14px] text-nowrap tracking-[-0.14px]">
         <p className="leading-[20px]">{label}</p>
       </div>
    </div>
  );
}

function WizardButton({ label, onClick, loading, secondary = false }: { label: string, onClick?: () => void, loading?: boolean, secondary?: boolean }) {
    if (secondary) {
        return (
            <div
                onClick={onClick}
                className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0 hover:bg-gray-50 transition-colors cursor-pointer border border-[#685f6a] w-full"
                data-name="Button"
            >
                <Wrapper1 additionalClassNames="text-[#48424a]">{label}</Wrapper1>
            </div>
        )
    }

    return (
        <div
            onClick={!loading ? onClick : undefined}
            className={cn(
                "bg-[#373338] h-[50px] relative rounded-[8px] shrink-0 w-full cursor-pointer hover:bg-[#4a454b] transition-colors flex items-center justify-center",
                loading && "opacity-80 cursor-wait"
            )}
            data-name="Button"
        >
            <Wrapper1 additionalClassNames="text-[#f4f3f5]">{loading ? "Processing..." : label}</Wrapper1>
        </div>
    );
}

function StepCommit({ onNext, loading }: { onNext: () => void, loading: boolean }) {
    return (
        <div className="flex flex-col gap-6 w-full items-center">
            <p className="font-serif leading-[24px] text-[#554f59] text-[18px] tracking-[-0.18px]">
                Review Investment Details
            </p>

            <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-sans">Company</span>
                    <span className="text-sm font-semibold text-gray-900 font-sans">Anthropic</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-sans">Round</span>
                    <span className="text-sm font-semibold text-gray-900 font-sans">Series C</span>
                </div>
                <div className="h-px bg-gray-200 w-full my-1" />
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-sans">Allocation Amount</span>
                    <span className="text-lg font-bold text-gray-900 font-sans">$250,000.00</span>
                </div>
            </div>

            <div className="w-full mt-2">
                <WizardButton label="Confirm & Commit" onClick={onNext} loading={loading} />
            </div>
        </div>
    )
}

function StepKYC({ onNext, loading }: { onNext: () => void, loading: boolean }) {
    return (
        <div className="flex flex-col gap-6 w-full items-center text-center">
            <p className="font-serif leading-[24px] text-[#554f59] text-[18px] tracking-[-0.18px]">
                Identity Verification
            </p>

            <div className="w-full py-8 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                     <MdiTick />
                </div>
                <p className="text-sm font-semibold text-gray-900 font-sans mb-1">Passport Verified</p>
                <p className="text-xs text-gray-500 font-sans">Accredited Investor Status: Active</p>
            </div>

            <div className="w-full mt-2">
                <WizardButton label="Continue to Signing" onClick={onNext} loading={loading} />
            </div>
        </div>
    )
}

function StepSigning({ onNext, loading }: { onNext: () => void, loading: boolean }) {
    return (
        <div className="flex flex-col gap-6 w-full items-center text-center">
            <p className="font-serif leading-[24px] text-[#554f59] text-[18px] tracking-[-0.18px]">
                Sign Documents
            </p>

            <div className="w-full bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-start gap-3 text-left">
                <div className="p-2 bg-white rounded shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900 font-sans">Subscription Agreement</p>
                    <p className="text-xs text-gray-500 font-sans mt-0.5">Ready for electronic signature via DocuSign</p>
                </div>
            </div>

            <div className="w-full mt-2">
                <WizardButton label="Sign Documents" onClick={onNext} loading={loading} />
            </div>
        </div>
    )
}

function StepWire({ onNext, loading, error }: { onNext: () => void, loading: boolean, error: string | null }) {
    return (
        <div className="flex flex-col gap-6 w-full items-center">
             <p className="font-serif leading-[24px] min-w-full not-italic relative shrink-0 text-[#554f59] text-[18px] tracking-[-0.18px] w-[min-content] text-center">We just need a few details</p>

             <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full">
                <div className="content-stretch flex items-start relative shrink-0 w-[195px] z-[2]" data-name="FieldLabels">
                  <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Typography">
                    <div className="flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[#7f7582] text-[14px] w-[840px]">
                      <p className="leading-[16px]">Select Investor Profile</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full z-[1]">
                  <div className="bg-white h-[56px] relative rounded-[4px] shrink-0 w-full cursor-pointer border border-[#9b929e]" data-name="TextField">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px] relative size-full">
                        <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="FieldLabels">
                          <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Typography">
                            <div className="basis-0 flex flex-col font-sans grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#7f7582] text-[16px]">
                              <p className="leading-[24px]">Personal Account (Alex...)</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]" data-name="IconButton">
                          <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                            <KeyboardArrowDown />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                  <div className="content-stretch flex items-center justify-between px-0 py-px relative shrink-0 w-full cursor-pointer">
                    <div aria-hidden="true" className="absolute border-[#e6e4e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]" data-name="IconButton">
                        <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                          <Wrapper>
                            <g clipPath="url(#clip0_2004_891)" id="add">
                              <g id="Vector"></g>
                              <path d={svgPaths.p21cef280} fill="var(--fill-0, #373338)" id="Vector_2" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2004_891">
                                <rect fill="white" height="20" width="20" />
                              </clipPath>
                            </defs>
                          </Wrapper>
                        </div>
                      </div>
                      <div className="content-stretch flex items-start relative shrink-0 w-[195px]" data-name="FieldLabels">
                        <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Typography">
                          <div className="flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[14px] text-nowrap">
                            <p className="leading-[16px]">Add New Investor Profile</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
                    <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="IconButton">
                      <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                        <Wrapper>
                          <g clipPath="url(#clip0_2004_875)" id="check_circle">
                            <g id="Vector"></g>
                            <path d={svgPaths.p3994c500} fill="var(--fill-0, #373338)" id="Vector_2" />
                          </g>
                          <defs>
                            <clipPath id="clip0_2004_875">
                              <rect fill="white" height="20" width="20" />
                            </clipPath>
                          </defs>
                        </Wrapper>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0" data-name="Typography">
                      <div className="flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[14px] text-nowrap">
                        <p className="leading-[16px]">Verified by footprint</p>
                      </div>
                    </div>
                  </div>
              </div>

              <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full mt-2">
                 <WizardButton label="Make Transfer" onClick={onNext} loading={loading} />

                 {error && (
                     <div className="content-stretch flex flex-col items-start relative shrink-0 w-full animate-fade-in">
                       <div className="content-stretch flex gap-[7px] items-center justify-center px-0 py-[7px] relative shrink-0 w-full">
                         <div className="h-[16.114px] relative shrink-0 w-[17px]" data-name="Vector">
                           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
                             <path d={svgPaths.p1b109280} fill="var(--fill-0, #B2002A)" id="Vector" />
                           </svg>
                         </div>
                         <div className="flex flex-col font-sans font-normal justify-center leading-[0] relative shrink-0 text-[#b2002a] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                           <p className="leading-[20px]">{error}</p>
                         </div>
                       </div>
                     </div>
                 )}

                 <div className="mt-2 w-full">
                    <WizardButton label="Go back to AI Experience" secondary onClick={() => {}} />
                 </div>
              </div>
        </div>
    )
}

function StepSuccess({ onFinish }: { onFinish?: () => void }) {
    return (
        <div className="flex flex-col gap-6 w-full items-center justify-center py-10 text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                 <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                 </svg>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[24px] text-[#29272a]">Success!</h3>
                <p className="font-sans text-[#554f59] text-[16px] leading-relaxed max-w-sm">
                    Your wire transfer has been initiated. <br/>
                    I will proceed with the final closing steps and notify you once completed.
                </p>
            </div>

            <div className="w-full mt-4 max-w-xs">
                 <div
                    onClick={onFinish}
                    className="bg-[#373338] h-[50px] relative rounded-[8px] shrink-0 w-full cursor-pointer hover:bg-[#4a454b] transition-colors flex items-center justify-center shadow-md"
                 >
                    <Wrapper1 additionalClassNames="text-[#f4f3f5]">Return to Dashboard</Wrapper1>
                </div>
            </div>
        </div>
    )
}

const STEPS = ["Commit", "KYC", "Signing", "Wire"];

export default function ContainerCollapse({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
     setLoading(true);
     setError(null);

     setTimeout(() => {
         setLoading(false);
         if (step < 4) {
             setStep(s => s + 1);
         } else {
             if (!error && step === 4) {
                 setStep(5);
             }
         }
     }, 1000);
  };

  const handleFinish = () => {
      onComplete?.();
  };

  return (
    <div className="bg-white relative rounded-[24px] size-full w-full max-w-lg mx-auto mt-4 animate-fade-in-up" data-name="Container Collapse">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip pb-[24px] pt-[58px] px-[24px] relative size-full border border-gray-100 rounded-[24px] shadow-sm">

          {step <= 4 && (
               <div className="content-stretch flex gap-[71px] items-start justify-center relative shrink-0">
                   <div className="absolute h-0 left-[40px] top-[12px] w-[324px]">
                     <div className="absolute inset-[-0.76px_-0.23%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 2">
                          <path d="M0.756612 0.756612H324.757" id="Vector 108" stroke="var(--stroke-0, #69606D)" strokeLinecap="round" strokeWidth="1.51322" />
                        </svg>
                     </div>
                   </div>

                   {STEPS.map((label, idx) => (
                       <ProgressItem
                          key={label}
                          label={label}
                          index={idx + 1}
                          currentStep={step}
                       />
                   ))}
               </div>
          )}

           {step === 1 && <StepCommit onNext={handleNext} loading={loading} />}
           {step === 2 && <StepKYC onNext={handleNext} loading={loading} />}
           {step === 3 && <StepSigning onNext={handleNext} loading={loading} />}
           {step === 4 && <StepWire onNext={handleNext} loading={loading} error={error} />}
           {step === 5 && <StepSuccess onFinish={handleFinish} />}

        </div>
      </div>
    </div>
  );
}
