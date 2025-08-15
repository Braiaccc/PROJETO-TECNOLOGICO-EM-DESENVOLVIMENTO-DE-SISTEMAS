import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { NovoAluguel } from "@/components/NovoAluguel";
import { ListaAlugueis } from "@/components/ListaAlugueis";
import { CadastroMateriais } from "@/components/CadastroMateriais";
import { Historico } from "@/components/Historico";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "novo-aluguel":
        return <NovoAluguel />;
      case "alugueis":
        return <ListaAlugueis />;
      case "materiais":
        return <CadastroMateriais />;
      case "historico":
        return <Historico />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
