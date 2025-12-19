import React, { useMemo } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecordingState } from './hooks/useRecording';

const RECORDING_WAVEFORM_BARS = 20;

// Format recording time as MM:SS
const formatRecordingTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface VoiceRecordingInterfaceProps {
  recordingState: RecordingState;
  recordingTime: number;
  isPaused: boolean;
  transcription: string | null;
  onCancel: () => void;
  onConfirm: () => void;
  onAccept: () => void;
  onDiscard: () => void;
}

export function VoiceRecordingInterface({
  recordingState,
  recordingTime,
  isPaused,
  transcription,
  onCancel,
  onConfirm,
  onAccept,
  onDiscard,
}: VoiceRecordingInterfaceProps) {
  // Generate waveform bars (dynamic based on recording time)
  const waveform = useMemo(() => {
    const bars = RECORDING_WAVEFORM_BARS;
    // Calculate how many bars should be "recorded" based on time
    // Assuming ~1 bar per 0.5 seconds for visual progress
    const recordedBars = Math.min(Math.floor(recordingTime / 0.5), bars);

    return Array.from({ length: bars }, (_, i) => {
      const isRecorded = i < recordedBars;
      // Simulate audio waveform with varying heights
      // When paused, use static heights; when recording, animate
      const baseHeight = 30;
      const variation = isPaused
        ? Math.sin(i * 0.5) * 15 // Static when paused
        : Math.sin((i + recordingTime) * 0.5) * 15; // Animated when recording
      const height = baseHeight + variation;
      return { height: Math.max(20, Math.min(60, height)), isRecorded };
    });
  }, [recordingTime, isPaused]);

  // Processing state - show loading spinner
  if (recordingState === 'processing') {
    return (
      <div className="flex items-center justify-center gap-3 w-full animate-in fade-in duration-300 h-10">
        <Loader2 size={20} className="text-[#48424a] animate-spin" />
        <span className="text-sm text-[#7f7582]">Processing audio...</span>
      </div>
    );
  }

  // Transcribed state - show transcription with accept/discard
  if (recordingState === 'transcribed' && transcription) {
    return (
      <div className="flex items-center gap-3 w-full animate-in fade-in duration-300">
        {/* Discard Button */}
        <button
          onClick={onDiscard}
          className="flex size-8 items-center justify-center rounded-full bg-transparent hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <X size={16} className="text-[#7f7582]" />
        </button>

        {/* Transcription Preview */}
        <div className="flex-1 text-sm text-[#29272a] truncate">
          {transcription}
        </div>

        {/* Accept Button */}
        <button
          onClick={onAccept}
          className="flex size-8 items-center justify-center rounded-full bg-[#48424a] text-white hover:bg-[#3a353c] transition-colors flex-shrink-0"
        >
          <Check size={16} />
        </button>
      </div>
    );
  }

  // Recording state - show waveform
  return (
    <div className="flex items-center gap-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="flex size-10 items-center justify-center rounded-full bg-transparent hover:bg-gray-100 transition-colors flex-shrink-0"
      >
        <X size={20} className="text-[#48424a]" />
      </button>

      {/* Waveform Progress Bar - Full Width */}
      <div className="flex-1 flex items-center gap-0.5 h-10">
        {waveform.map((bar, index) => (
          <div
            key={index}
            className={cn(
              'flex-1 rounded-full transition-all duration-300 ease-out',
              bar.isRecorded ? 'bg-[#48424a]' : 'bg-[#e0dce0]'
            )}
            style={{ height: `${bar.height}%` }}
          />
        ))}
      </div>

      {/* Timer */}
      <span className="text-base font-medium text-[#29272a] min-w-[3rem] text-right flex-shrink-0">
        {formatRecordingTime(recordingTime)}
      </span>

      {/* Confirm Button */}
      <button
        onClick={onConfirm}
        className="flex size-10 items-center justify-center rounded-full bg-[#48424a] text-white hover:bg-[#3a353c] transition-colors flex-shrink-0"
      >
        <Check size={20} />
      </button>
    </div>
  );
}
