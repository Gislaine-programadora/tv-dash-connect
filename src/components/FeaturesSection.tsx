import { Zap, Shield, Monitor, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Streaming Ultra Rápido",
    description: "Tecnologia de ponta para transmissão sem delay ou buffering"
  },
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Plataforma protegida com criptografia de nível militar"
  },
  {
    icon: Monitor,
    title: "Multi-Dispositivos",
    description: "Assista em TV, celular, tablet ou computador simultaneamente"
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Equipe especializada disponível a qualquer momento"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Por que Escolher a 
            <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
              StreamTV?
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos a melhor experiência de streaming com tecnologia avançada e suporte excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-elegant transition-shadow">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;