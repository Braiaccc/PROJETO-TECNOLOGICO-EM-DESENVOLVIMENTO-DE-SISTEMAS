import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NovoAluguel = () => {
  const { toast } = useToast();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  
  const materiaisDisponiveis = [
    "Betoneira",
    "Andaime",
    "Furadeira",
    "Martelete",
    "Compressor",
    "Pistola de Pintura",
    "Serra Circular",
    "Esmerilhadeira",
    "Parafusadeira",
    "Nivel a Laser"
  ];

  const addMaterial = (material: string) => {
    if (!selectedMaterials.includes(material)) {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const removeMaterial = (material: string) => {
    setSelectedMaterials(selectedMaterials.filter(m => m !== material));
  };

  const handleSave = () => {
    toast({
      title: "Aluguel criado com sucesso!",
      description: "O novo aluguel foi registrado no sistema.",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Novo Aluguel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informações do Cliente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Nome do Cliente/Empresa *</Label>
              <Input id="cliente" placeholder="Digite o nome do cliente" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" placeholder="(11) 99999-9999" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço da Obra</Label>
            <Textarea id="endereco" placeholder="Digite o endereço completo da obra" />
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataRetirada">Data de Retirada *</Label>
              <Input id="dataRetirada" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataDevolucao">Previsão de Devolução *</Label>
              <Input id="dataDevolucao" type="date" />
            </div>
          </div>

          {/* Materiais */}
          <div className="space-y-4">
            <Label>Materiais do Aluguel</Label>
            
            <div className="flex flex-wrap gap-2">
              {selectedMaterials.map((material) => (
                <Badge 
                  key={material} 
                  variant="secondary" 
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {material}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeMaterial(material)}
                  />
                </Badge>
              ))}
            </div>

            <Select onValueChange={addMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um material para adicionar" />
              </SelectTrigger>
              <SelectContent>
                {materiaisDisponiveis
                  .filter(material => !selectedMaterials.includes(material))
                  .map((material) => (
                  <SelectItem key={material} value={material}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valor e Pagamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor Total (R$)</Label>
              <Input id="valor" type="number" placeholder="0,00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pagamento">Status do Pagamento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="parcial">Pagamento Parcial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea 
              id="observacoes" 
              placeholder="Informações adicionais sobre o aluguel"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Aluguel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};