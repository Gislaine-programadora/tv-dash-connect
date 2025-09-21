export interface IPTVChannel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  group?: string;
  country?: string;
  language?: string;
}

export class IPTVService {
  private static parseM3U(content: string): IPTVChannel[] {
    const lines = content.split('\n');
    const channels: IPTVChannel[] = [];
    let currentChannel: Partial<IPTVChannel> = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('#EXTINF:')) {
        // Parse channel information
        const nameMatch = line.match(/,(.+)$/);
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        const groupMatch = line.match(/group-title="([^"]+)"/);
        const countryMatch = line.match(/tvg-country="([^"]+)"/);
        const languageMatch = line.match(/tvg-language="([^"]+)"/);

        currentChannel = {
          id: Math.random().toString(36).substr(2, 9),
          name: nameMatch ? nameMatch[1] : 'Canal Desconhecido',
          logo: logoMatch ? logoMatch[1] : undefined,
          group: groupMatch ? groupMatch[1] : 'Geral',
          country: countryMatch ? countryMatch[1] : undefined,
          language: languageMatch ? languageMatch[1] : undefined,
        };
      } else if (line.startsWith('http')) {
        // Esta é a URL da stream
        if (currentChannel.name) {
          // ✅ Só aceita streams HLS (.m3u8)
          if (line.endsWith('.m3u8')) {
            currentChannel.url = line;
            channels.push(currentChannel as IPTVChannel);
          }
          currentChannel = {};
        }
      }
    }

    return channels;
  }

  static async loadChannels(m3uUrl: string): Promise<IPTVChannel[]> {
    try {
      const response = await fetch(m3uUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      return this.parseM3U(content);
    } catch (error) {
      console.error('Error loading IPTV channels:', error);
      throw error;
    }
  }

  static filterChannels(channels: IPTVChannel[], query: string): IPTVChannel[] {
    if (!query) return channels;

    const lowerQuery = query.toLowerCase();
    return channels.filter(channel =>
      channel.name.toLowerCase().includes(lowerQuery) ||
      (channel.group && channel.group.toLowerCase().includes(lowerQuery)) ||
      (channel.country && channel.country.toLowerCase().includes(lowerQuery))
    );
  }

  static getChannelsByGroup(channels: IPTVChannel[]): Record<string, IPTVChannel[]> {
    return channels.reduce((groups, channel) => {
      const group = channel.group || 'Outros';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(channel);
      return groups;
    }, {} as Record<string, IPTVChannel[]>);
  }
}
