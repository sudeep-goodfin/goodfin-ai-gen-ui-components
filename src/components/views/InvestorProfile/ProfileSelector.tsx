import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Card, CardContent, Button } from '../../ui';

type Profile = {
  name: string;
  tin: string;
  verified: boolean;
};

type ProfileSelectorProps = {
  profiles?: Profile[];
  onAddProfile?: () => void;
  onSubmit?: (profile: Profile) => void;
};

export function ProfileSelector({
  profiles = [
    { name: 'Jay', tin: '123456666', verified: true },
  ],
  onAddProfile,
  onSubmit,
}: ProfileSelectorProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile>(profiles[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">Select Investor Profile</h3>
            <p className="text-sm text-muted-foreground">
              Choose an existing profile or add a new one to continue.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddProfile}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add profile
          </Button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-left"
          >
            <div>
              <p className="font-medium text-foreground">{selectedProfile.name}</p>
              <p className="text-sm text-muted-foreground">
                TIN: {selectedProfile.tin}
                {selectedProfile.verified && (
                  <span className="text-success ml-1">• Verified</span>
                )}
              </p>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && profiles.length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10">
              {profiles.map((profile, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedProfile(profile);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors text-left first:rounded-t-lg last:rounded-b-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{profile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      TIN: {profile.tin}
                      {profile.verified && (
                        <span className="text-success ml-1">• Verified</span>
                      )}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          className="w-auto"
          onClick={() => onSubmit?.(selectedProfile)}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
