import React from 'react';
import { Layers } from 'lucide-react';
import { Badge, Button } from '../../ui';

export function DealCard() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm mt-6">
      {/* Card Header */}
      <div className="p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-destructive to-warning rounded-lg flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-foreground">Databricks IV</h3>
              <Badge variant="success" dot>LIVE</Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Databricks is the world's leading Data Intelligence Platform,
          empowering enterprises to unify analytics, machine learning, real-time
          data, and AI agents on a single cloud-native foundation. By...
        </p>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-4 bg-muted/50 border-t border-border flex items-center justify-between">
        <div className="flex gap-8">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Price Share</p>
            <p className="text-lg font-bold text-foreground">$206</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Minimum Investment</p>
            <p className="text-lg font-bold text-warning">$25,000</p>
          </div>
        </div>
        <Button size="lg">
          Invest Now
        </Button>
      </div>
    </div>
  );
}
