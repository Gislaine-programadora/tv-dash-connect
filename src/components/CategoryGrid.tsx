import { Film, Newspaper, Music, Tv2, Sparkles, PlayCircle } from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    id: "filmes",
    title: "Filmes",
    description: "Blockbusters e clássicos em HD/4K",
    icon: Film,
    color: "streaming-purple",
    gradient: "from-purple-600 to-purple-800",
    count: "15.000+"
  },
  {
    id: "noticias",
    title: "Noticiários", 
    description: "Canais de notícias 24h ao vivo",
    icon: Newspaper,
    color: "streaming-blue",
    gradient: "from-blue-600 to-blue-800", 
    count: "150+"
  },
  {
    id: "musicas",
    title: "Músicas & Clips",
    description: "Videoclipes e shows musicais",
    icon: Music,
    color: "streaming-pink",
    gradient: "from-pink-600 to-pink-800",
    count: "50.000+"
  },
  {
    id: "novelas", 
    title: "Novelas",
    description: "Novelas nacionais e internacionais",
    icon: Tv2,
    color: "streaming-cyan", 
    gradient: "from-cyan-600 to-cyan-800",
    count: "500+"
  },
  {
    id: "entretenimento",
    title: "Entretenimento",
    description: "Programas de TV e variedades", 
    icon: Sparkles,
    color: "accent",
    gradient: "from-purple-600 to-pink-600",
    count: "2.000+"
  },
  {
    id: "ao-vivo",
    title: "Ao Vivo",
    description: "Eventos esportivos e transmissões",
    icon: PlayCircle,
    color: "primary", 
    gradient: "from-indigo-600 to-purple-700",
    count: "100+"
  }
];

interface CategoryGridProps {
  searchQuery: string;
}

const CategoryGrid = ({ searchQuery }: CategoryGridProps) => {
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Explore Nossas 
            <span className="bg-gradient-accent bg-clip-text text-transparent ml-2">
              Categorias
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubra conteúdo premium organizado por categoria. 
            Encontre exatamente o que você procura com facilidade.
          </p>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma categoria encontrada para "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category, index) => (
              <CategoryCard 
                key={category.id} 
                category={category}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryGrid;