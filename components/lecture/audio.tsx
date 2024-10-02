import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

interface AudioProps {
  src: string;
}

const AudioComponent: React.FC<AudioProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Convert seconds to MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickPosition = e.nativeEvent.offsetX;
    const newTime = (clickPosition / e.currentTarget.clientWidth) * duration;
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    if (audioRef.current) {
      // Load duration when metadata is loaded
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration);
      });

      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, [audioRef]);

  const progress = (currentTime / duration) * 100;

  return (
    <div className="max-w-md mx-4 mt-6 mb-10 bg-blue-100 p-4 shadow-md rounded-lg overflow-hidden">
      <audio
        controls={false} // Hide default controls
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        className="w-full pointer-events-none"
      >
        <source src={`data:audio/mpeg;base64,${src}`} />
        Your browser does not support the audio element.
      </audio>
      <div className="flex justify-between items-center px-4 py-2">
        <button onClick={handleBackward} className="text-gray-600">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <div className="text-gray-600">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <button onClick={handlePlayPause} className="text-gray-600">
          {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
        </button>
        <button onClick={handleForward} className="text-gray-600">
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
      <div
        className="w-full h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-blue-500 rounded-full"
        />
      </div>
    </div>
  );
};

export default AudioComponent;
