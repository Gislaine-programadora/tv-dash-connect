import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  channel: IPTVChannel | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayer = ({ channel, isOpen, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!channel?.url || !isOpen) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(channel.url);
      hls.attachMedia(videoRef.current!);
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = channel.url;
    }
  }, [channel, isOpen]);

  if (!isOpen || !channel) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="w-full max-w-4xl p-4">
        <video ref={videoRef} controls autoPlay className="w-full rounded-xl" />
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;


