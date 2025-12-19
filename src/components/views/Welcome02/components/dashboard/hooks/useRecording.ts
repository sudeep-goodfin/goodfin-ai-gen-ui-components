import { useState, useEffect, useRef } from 'react';

export type RecordingState = 'idle' | 'recording' | 'processing' | 'transcribed';

export function useRecording() {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState<string | null>(null);
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isRecording = recordingState === 'recording';
  const isProcessing = recordingState === 'processing';
  const hasTranscription = recordingState === 'transcribed';

  // Handle recording timer
  useEffect(() => {
    if (isRecording && !isPaused) {
      if (!recordingIntervalRef.current) {
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      }
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const startRecording = () => {
    setRecordingState('recording');
    setIsPaused(false);
    setRecordingTime(0);
    setTranscription(null);
  };

  const cancelRecording = () => {
    setRecordingState('idle');
    setIsPaused(false);
    setRecordingTime(0);
    setTranscription(null);
  };

  const confirmRecording = () => {
    console.log('Recording confirmed, duration:', recordingTime);
    setRecordingState('processing');

    // Simulate processing delay then show transcription
    setTimeout(() => {
      const dummyTranscription =
        'This is a sample transcription of your voice recording. In a real application, this would be the actual transcribed text from your audio.';
      setTranscription(dummyTranscription);
      setRecordingState('transcribed');
    }, 1500);

    setRecordingTime(0);
  };

  const acceptTranscription = () => {
    const text = transcription;
    setRecordingState('idle');
    setTranscription(null);
    return text;
  };

  const discardTranscription = () => {
    setRecordingState('idle');
    setTranscription(null);
  };

  return {
    // State
    recordingState,
    isRecording,
    isProcessing,
    hasTranscription,
    isPaused,
    recordingTime,
    transcription,
    // Actions
    startRecording,
    cancelRecording,
    confirmRecording,
    acceptTranscription,
    discardTranscription,
  };
}
