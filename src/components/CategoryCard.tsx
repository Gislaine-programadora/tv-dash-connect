import { LucideIcon, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  count: string;
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const { title, description, icon: Icon, gradient, count } = category;
  
  return (
    <Card 
      className="group relative bg-gradient-card border-border hover:border-primary transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 overflow-hidden"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards"
      }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <CardContent className="p-6 relative z-10">
        {/* Icon */}
        <div className="mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-glow`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground font-medium">
              {count}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <Button 
          variant="ghost" 
          className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-colors"
        >
          <span>Explorar {title}</span>
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </Card>
  );
};

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

export default CategoryCard;