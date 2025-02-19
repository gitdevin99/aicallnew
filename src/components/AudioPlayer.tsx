import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  audioUrl: string;
  className?: string;
}

export function AudioPlayer({ audioUrl, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | undefined>();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current!);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
    setIsPlaying(!isPlaying);
  };

  const whilePlaying = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const handleTimeChange = (value: number[] | readonly number[]) => {
    if (!audioRef.current || value.length === 0) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'call-recording.mp3'; // You can customize the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Audio visualization data (mock waveform)
  const waveformBars = 50;
  const generateWaveform = () => {
    const bars = [];
    for (let i = 0; i < waveformBars; i++) {
      const height = Math.random() * 100;
      const isActive = (i / waveformBars) * duration <= currentTime;
      bars.push(
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-200",
            isActive ? "bg-primary" : "bg-muted-foreground/20",
            isPlaying && isActive && "animate-pulse"
          )}
          style={{ height: `${height}%` }}
        />
      );
    }
    return bars;
  };

  return (
    <div className={cn("rounded-lg bg-card p-4", className)}>
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="space-y-4">
        {/* Waveform visualization */}
        <div className="h-16 flex items-center gap-0.5">
          {generateWaveform()}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>

          <div className="flex-1">
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleTimeChange}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground min-w-[70px]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
