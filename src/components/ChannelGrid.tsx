import { useState, useEffect } from "react";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IPTVService, IPTVChannel } from "@/assets/iptvService";
import ChannelCard from "./ChannelCard";
import VideoPlayer from "./VideoPlayer";

interface ChannelGridProps {
  searchQuery: string;
}

const ChannelGrid = ({ searchQuery }: ChannelGridProps) => {
  const [channels, setChannels] = useState<IPTVChannel[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<IPTVChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<IPTVChannel | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  const M3U_URL = 'https://iptv-org.github.io/iptv/categories/general.m3u';

  const loadChannels = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedChannels = await IPTVService.loadChannels(M3U_URL);
      setChannels(loadedChannels);
      setFilteredChannels(loadedChannels);
    } catch (err) {
      setError('Erro ao carregar canais IPTV. Tente novamente.');
      console.error('Error loading channels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  useEffect(() => {
    const filtered = IPTVService.filterChannels(channels, searchQuery);
    setFilteredChannels(filtered);
  }, [channels, searchQuery]);

  const handlePlayChannel = (channel: IPTVChannel) => {
    setSelectedChannel(channel);
    setPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setPlayerOpen(false);
    setSelectedChannel(null);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Carregando Canais IPTV</h2>
            <p className="text-muted-foreground">Aguarde enquanto carregamos os canais disponíveis...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="text-center">
              <Button onClick={loadChannels} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Canais 
              <span className="bg-gradient-accent bg-clip-text text-transparent ml-2">
                IPTV
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {filteredChannels.length} canais disponíveis para assistir ao vivo
            </p>
          </div>

          {filteredChannels.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchQuery 
                  ? `Nenhum canal encontrado para "${searchQuery}"`
                  : "Nenhum canal disponível no momento"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredChannels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  onPlay={handlePlayChannel}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <VideoPlayer
        channel={selectedChannel}
        isOpen={playerOpen}
        onClose={handleClosePlayer}
      />
    </>
  );
};

export default ChannelGrid;