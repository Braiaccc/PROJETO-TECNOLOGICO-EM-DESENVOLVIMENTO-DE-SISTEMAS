import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CadastroMateriais = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const materiais = [
    {
      id: 1,
      nome: "Betoneira",
      categoria: "Construção",
      valorDiario: 45.00,
      status: "disponivel",
      descricao: "Betoneira 400L para mistura de concreto"
    },
    {
      id: 2,
      nome: "Furadeira",
      categoria: "Ferramentas",
      valorDiario: 25.00,
      status: "alugado",
      descricao: "Furadeira de impacto com brocas"
    },
    {
      id: 3,
      nome: "Andaime",
      categoria: "Estruturas",
      valorDiario: 15.00,
      status: "manutencao",
      descricao: "Andaime metálico modular 2m"
    },
    {
      id: 4,
      nome: "Compressor",
      categoria: "Pneumáticas",
      valorDiario: 35.00,
      status: "disponivel",
      descricao: "Compressor de ar 50L 2HP"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disponivel":
        return <Badge className="bg-success text-success-foreground">Disponível</Badge>;
      case "alugado":
        return <Badge className="bg-warning text-warning-foreground">Alugado</Badge>;
      case "manutencao":
        return <Badge variant="destructive">Manutenção</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSave = () => {
    toast({
      title: "Material cadastrado!",
      description: "O material foi adicionado ao catálogo.",
    });
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header com botão para adicionar */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Cadastro de Materiais</h2>
          <p className="text-muted-foreground">Gerencie o catálogo de materiais disponíveis</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Material
        </Button>
      </div>

      {/* Formulário de cadastro */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Material</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Material *</Label>
                <Input id="nome" placeholder="Digite o nome do material" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input id="categoria" placeholder="Ex: Ferramentas, Construção" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor">Valor Diário (R$)</Label>
                <Input id="valor" type="number" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo">Código/Série</Label>
                <Input id="codigo" placeholder="Código interno (opcional)" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea 
                id="descricao" 
                placeholder="Descrição detalhada do material"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Salvar Material
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de materiais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Materiais Cadastrados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {materiais.map((material) => (
              <div
                key={material.id}
                className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{material.nome}</h3>
                    {getStatusBadge(material.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Categoria:</p>
                    <p>{material.categoria}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Valor Diário:</p>
                    <p className="font-medium">R$ {material.valorDiario.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Descrição:</p>
                    <p>{material.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};