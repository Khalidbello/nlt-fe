'use client';

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

interface AudioProps {
  src: string;
}

const AudioComponent: React.FC<AudioProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5;
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className="max-w-md mx-4 mt-6 mb-10 bg-blue-100 p-3 shadow-md rounded-lg overflow-hidden">
      <audio
        controls
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        className="w-full"
      >
        <source src={src} />
        Your browser does not support the audio element.
      </audio>
      <div className="flex justify-between items-center px-4 py-2">
        <button onClick={handleBackward} className="text-gray-600">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <div className="text-gray-600">
          {currentTime.toFixed(0)}s / {duration.toFixed(0)}s
        </div>
        <button onClick={handleForward} className="text-gray-600">
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
};

export default AudioComponent;
