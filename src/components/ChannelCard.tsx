import { Play, Tv2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IPTVChannel } from "@/services/iptvService";

interface ChannelCardProps {
  channel: IPTVChannel;
  onPlay: (channel: IPTVChannel) => void;
}

const ChannelCard = ({ channel, onPlay }: ChannelCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Channel Logo */}
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
            {channel.logo ? (
              <img 
                src={channel.logo} 
                alt={channel.name}
                className="w-8 h-8 object-contain rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.classList.remove('hidden');
                }}
              />
            ) : null}
            <Tv2 className={`w-6 h-6 text-primary ${channel.logo ? 'hidden' : ''}`} />
          </div>

          {/* Channel Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {channel.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              {channel.group && (
                <span className="px-2 py-1 bg-secondary rounded-md">
                  {channel.group}
                </span>
              )}
              {channel.country && (
                <span>{channel.country}</span>
              )}
            </div>
          </div>

          {/* Play Button */}
          <Button
            size="sm"
            onClick={() => onPlay(channel)}
            className="bg-primary/20 hover:bg-primary hover:text-primary-foreground border border-primary/30 text-primary transition-all duration-300 group-hover:scale-105"
          >
            <Play className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelCard;