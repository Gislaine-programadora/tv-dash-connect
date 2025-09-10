import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-streaming.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-accent fill-current" />
            <span className="text-accent font-semibold">Plataforma Premium</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            TV Online
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Sem Limites
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg">
            Acesse milhares de canais, filmes, séries e conteúdo ao vivo. 
            Entretenimento premium disponível 24/7 em qualquer dispositivo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-elegant transition-bounce text-lg px-8 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Começar a Assistir
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth text-lg px-8 py-6"
            >
              Ver Planos
            </Button>
          </div>
          
          <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>Sem Contratos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>HD/4K Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>Múltiplos Dispositivos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;