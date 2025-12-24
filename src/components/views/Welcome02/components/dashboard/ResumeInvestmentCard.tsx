import React from 'react';
import { ChevronDown, Plus, Clock } from 'lucide-react';

interface InvestorProfile {
  name: string;
  ssn: string;
  verified: boolean;
}

interface ResumeInvestmentCardProps {
  companyName?: string;
  companyLogo?: string;
  amount?: string;
  investorProfile?: InvestorProfile;
  onContinue?: () => void;
  onAddProfile?: () => void;
}

export function ResumeInvestmentCard({
  companyName = "Anthropic",
  companyLogo = "/icons/products/anthropic.png",
  amount = "$50,000",
  investorProfile = {
    name: "Geen Geo",
    ssn: "**** 1234",
    verified: true
  },
  onContinue,
  onAddProfile
}: ResumeInvestmentCardProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 px-0 py-1">
        <Clock className="w-4 h-4 text-[#7f7582]" strokeWidth={2} />
        <span className="text-[14px] leading-4 text-[#7f7582] font-['Soehne_Kraftig',sans-serif]">
          You can resume your investing in
        </span>
      </div>

      {/* Card Container */}
      <div className="relative bg-[#d2a689] rounded-[12px] shadow-[0px_1px_2px_0px_#e3e3e3] overflow-hidden">
        {/* Header with company info */}
        <div className="p-1">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-[5px] border-2 border-white overflow-hidden">
                  <img
                    src={companyLogo}
                    alt={companyName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[14px] leading-4 text-[#29272a] font-['Soehne_Kraftig',sans-serif]">
                  {companyName}
                </span>
              </div>
              <span className="text-[18px] leading-6 text-[#29272a] font-['Soehne_Kraftig',sans-serif]">
                {amount}
              </span>
            </div>
          </div>

          {/* Body Section */}
          <div className="bg-[#f7f7f8] rounded-[11px] p-4">
            <div className="flex flex-col gap-2 items-end">
              {/* Profile Selection Section */}
              <div className="flex flex-col gap-2 w-full max-w-[500px]">
                {/* Header Row */}
                <div className="flex items-center justify-between h-6">
                  <span className="text-[14px] leading-4 text-[#29272a] font-['Soehne_Kraftig',sans-serif]">
                    Choose your Investor Profile
                  </span>
                  <button
                    onClick={onAddProfile}
                    className="flex items-center gap-2 h-6 px-3 border border-[#9b929e] rounded-full hover:border-[#7f7582] transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5 text-[#48424a]" strokeWidth={2} />
                    <span className="text-[12px] leading-4 text-[#48424a] font-['Soehne_Kraftig',sans-serif]">
                      Investor Profile
                    </span>
                  </button>
                </div>

                {/* Dropdown */}
                <div className="bg-white border border-[#e6e4e7] rounded-lg p-1">
                  <div className="flex items-center justify-between p-2 rounded">
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] leading-4 text-[#29272a] font-['Soehne_Kraftig',sans-serif]">
                        {investorProfile.name}
                      </span>
                      <span className="text-[12px] leading-4 text-[#48424a] font-['Soehne_Leicht',sans-serif]">
                        SSN {investorProfile.ssn} •{' '}
                        <span className="text-[#0a7138]">
                          {investorProfile.verified ? 'Verified' : 'Pending'}
                        </span>
                      </span>
                    </div>
                    <ChevronDown className="w-2.5 h-2.5 text-[#48424a]" />
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="opacity-50 w-full max-w-[500px]">
                <button
                  onClick={onContinue}
                  disabled
                  className="w-full px-8 py-3 rounded-lg text-[#f4f3f5] text-[16px] leading-5 font-['Soehne_Kraftig',sans-serif] shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)] cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(93.82deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)'
                  }}
                >
                  Continue Investment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom blur gradient overlay */}
        <div
          className="absolute bottom-0 left-1 right-1 h-[72px] rounded-[12px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)',
            backdropFilter: 'blur(21.35px)'
          }}
        />
      </div>
    </div>
  );
}
