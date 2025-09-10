import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IPTVChannel } from "@/services/iptvService";

interface VideoPlayerProps {
  channel: IPTVChannel | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayer = ({ channel, isOpen, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && channel && videoRef.current) {
      videoRef.current.src = channel.url;
      videoRef.current.load();
    }
  }, [isOpen, channel]);

  if (!channel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full bg-black/95 border-border">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl">
              {channel.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {channel.group && (
            <p className="text-gray-400 text-sm">{channel.group}</p>
          )}
        </DialogHeader>

        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full h-full"
            onError={(e) => {
              console.error('Error loading video:', e);
            }}
          >
            <source src={channel.url} type="application/x-mpegURL" />
            <source src={channel.url} type="video/mp4" />
            Seu navegador não suporta a reprodução deste vídeo.
          </video>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>Pressione ESC para fechar o player</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;