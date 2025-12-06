import React, { useState } from 'react';
import { Sparkles, FileText } from 'lucide-react';
import { Card, Button, SuggestionGroup } from '../../ui';
import { documentSummaryPoints } from './documentData';

export function CardViewVariantContent() {
  const [showFullSummary, setShowFullSummary] = useState(false);

  const suggestions = [
    'Explain the key points',
    'What do I need to sign?',
    'Show next document',
    'Any red flags here?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground">
        Here's Document 1 of 3. I've summarized the key points for you.
      </p>

      {/* Document Preview Card */}
      <Card className="overflow-hidden">
        {/* Document Header */}
        <div className="flex items-center justify-between p-4 bg-card border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h4 className="font-semibold text-foreground">
              Subscription Agreement & Privacy Notice
            </h4>
          </div>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </div>

        {/* Summary Section */}
        <div className="p-4 bg-muted/30 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h5 className="font-semibold text-foreground">Summary</h5>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This document outlines the Subscription Agreement for Databricks,
              detailing the qualifications and representations required for
              subscribers to participate in the investment. It specifies the
              criteria for various types of investors, including employee
              benefit plans, corporations, partnerships, and individuals,
              ensuring compliance with relevant regulations.
            </p>

            <ul className="space-y-2 list-none pl-1">
              {documentSummaryPoints.slice(0, showFullSummary ? undefined : 4).map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-muted-foreground/50 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {!showFullSummary ? (
              <button
                onClick={() => setShowFullSummary(true)}
                className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
              >
                Read more
              </button>
            ) : (
              <button
                onClick={() => setShowFullSummary(false)}
                className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
              >
                Show less
              </button>
            )}
          </div>

          {/* View Document Button */}
          <div className="flex justify-end pt-2">
            <Button variant="secondary" size="sm">
              <FileText className="w-4 h-4" />
              View Document
            </Button>
          </div>
        </div>
      </Card>

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Need help?"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
