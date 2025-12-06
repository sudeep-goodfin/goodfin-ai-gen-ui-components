import React from 'react';
import { Copy, AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, Button } from '../../ui';

type WireInstructionsData = {
  amount: string;
  beneficiaryBank: {
    name: string;
    swiftCode: string;
    address: string;
    routingNumber: string;
  };
  beneficiaryAccount: {
    name: string;
    number: string;
    address: string;
  };
  wireReference: string;
  sourceBank?: string;
};

type WireInstructionsCardProps = {
  data?: WireInstructionsData;
  onCopy?: (field: string, value: string) => void;
};

const defaultData: WireInstructionsData = {
  amount: '$200,000.00',
  beneficiaryBank: {
    name: 'Column National Association',
    swiftCode: 'CLNOUS66MER',
    address: '1 Letterman Drive, Building A, Suite A4-700 San Francisco, CA 94129',
    routingNumber: '121145433',
  },
  beneficiaryAccount: {
    name: 'GoodFin, Inc.',
    number: '6912777701691946',
    address: '16192 Coastal Highway, Lewes, DE 19958',
  },
  wireReference: 'DATABRICKS-JA-200K',
  sourceBank: 'Chase',
};

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-muted transition-colors"
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <CheckCircle2 className="w-4 h-4 text-success" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}

function InfoRow({ label, value, copyable = false }: { label: string; value: string; copyable?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-2 py-2">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-all">{value}</p>
      </div>
      {copyable && <CopyButton value={value} label={label} />}
    </div>
  );
}

export function WireInstructionsCard({
  data = defaultData,
}: WireInstructionsCardProps) {
  const handleCopyAll = async () => {
    const allText = `
Wire Transfer Instructions

Amount: ${data.amount}

Beneficiary Bank:
Bank Name: ${data.beneficiaryBank.name}
SWIFT/BIC Code: ${data.beneficiaryBank.swiftCode}
Address: ${data.beneficiaryBank.address}
Routing Number: ${data.beneficiaryBank.routingNumber}

Beneficiary Account:
Account Name: ${data.beneficiaryAccount.name}
Account Number: ${data.beneficiaryAccount.number}
Address: ${data.beneficiaryAccount.address}

Wire Reference: ${data.wireReference}
    `.trim();
    await navigator.clipboard.writeText(allText);
  };

  return (
    <div className="space-y-4">
      {/* Wire Amount Header */}
      <Card className="border-2 border-accent/20 bg-accent/5">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Wire Transfer Amount</p>
              <p className="text-2xl font-bold text-foreground">{data.amount}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyAll}>
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Beneficiary Bank */}
      <Card>
        <CardContent className="py-4">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            Beneficiary Bank
          </h4>
          <div className="divide-y divide-border">
            <InfoRow label="Bank Name" value={data.beneficiaryBank.name} copyable />
            <InfoRow label="SWIFT/BIC Code" value={data.beneficiaryBank.swiftCode} copyable />
            <InfoRow label="Routing Number" value={data.beneficiaryBank.routingNumber} copyable />
            <InfoRow label="Address" value={data.beneficiaryBank.address} copyable />
          </div>
        </CardContent>
      </Card>

      {/* Beneficiary Account */}
      <Card>
        <CardContent className="py-4">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            Beneficiary Account
          </h4>
          <div className="divide-y divide-border">
            <InfoRow label="Account Name" value={data.beneficiaryAccount.name} copyable />
            <InfoRow label="Account Number" value={data.beneficiaryAccount.number} copyable />
            <InfoRow label="Address" value={data.beneficiaryAccount.address} copyable />
          </div>
        </CardContent>
      </Card>

      {/* Wire Reference */}
      <Card className="border-2 border-warning/20 bg-warning/5">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Wire Reference (Required)</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg font-bold text-foreground font-mono">{data.wireReference}</p>
                <CopyButton value={data.wireReference} label="Wire Reference" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Include this reference exactly as shown for proper allocation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardContent className="py-4">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            Important
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50 mt-0.5">•</span>
              <span>Please include the wire reference exactly as shown above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50 mt-0.5">•</span>
              <span>International wire transfers may take 2-3 business days and may incur bank fees</span>
            </li>
            {data.sourceBank && (
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5">•</span>
                <span>Initiate the transfer from <strong className="text-foreground">{data.sourceBank}</strong></span>
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-warning" />
            Pro Tips
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50 mt-0.5">•</span>
              <span>Take a screenshot of these instructions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50 mt-0.5">•</span>
              <span>Save your bank's wire confirmation for your records</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50 mt-0.5">•</span>
              <span>Contact your bank if you have questions about international transfer fees</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
