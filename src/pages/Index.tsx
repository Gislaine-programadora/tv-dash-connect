import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChannelGrid from "@/components/ChannelGrid";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-background">
      <Header onSearch={setSearchQuery} />
      <HeroSection />
      <ChannelGrid searchQuery={searchQuery} />
      <FeaturesSection />
    </div>
  );
};

export default Index;


