import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, Checkbox, Button } from '../../ui';

export function SimpleVariantContent() {
  const [signatureName] = useState('jay');
  const [agreedToDocuments, setAgreedToDocuments] = useState(true);

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Perfect—everything's confirmed.
      </p>

      {/* Investment Documents Section */}
      <Card>
        <CardContent className="space-y-3">
          <h3 className="font-semibold text-foreground">Investment Documents</h3>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
              <span className="text-sm font-medium text-muted-foreground">
                Subscription Agreement & Privacy Notice
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
              <span className="text-sm font-medium text-muted-foreground">
                Limited Liability Company Agreement
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
              <span className="text-sm font-medium text-muted-foreground">
                Private Placement Memorandum
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-3 border-t border-border">
            <Checkbox
              checked={agreedToDocuments}
              onChange={setAgreedToDocuments}
              label="I have read and agreed to these documents."
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Signature Section */}
      <Card>
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-foreground">Add Signature</h3>

          <div className="space-y-2">
            <div className="bg-muted rounded-lg p-6 border border-border">
              <p
                className="text-3xl text-muted-foreground text-center"
                style={{ fontFamily: 'Brush Script MT, cursive' }}
              >
                {signatureName}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">Submit after signing</p>
            <Button disabled={!agreedToDocuments} size="lg">
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
