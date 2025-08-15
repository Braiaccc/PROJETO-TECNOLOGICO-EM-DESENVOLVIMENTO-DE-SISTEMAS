import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search, Filter } from "lucide-react";

export const ListaAlugueis = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const alugueis = [
    {
      id: "ALG-001",
      cliente: "Construção ABC Ltda",
      materiais: ["Betoneira", "Andaime"],
      dataRetirada: "2024-08-01",
      dataDevolucao: "2024-08-05",
      status: "ativo",
      pagamento: "pago",
      valor: 450.00,
    },
    {
      id: "ALG-002", 
      cliente: "Obras Silva & Cia",
      materiais: ["Furadeira", "Martelete"],
      dataRetirada: "2024-07-30",
      dataDevolucao: "2024-08-03",
      status: "atrasado",
      pagamento: "pendente",
      valor: 280.00,
    },
    {
      id: "ALG-003",
      cliente: "Reformas JK",
      materiais: ["Compressor", "Pistola de Pintura"],
      dataRetirada: "2024-08-02",
      dataDevolucao: "2024-08-06",
      status: "ativo",
      pagamento: "pago",
      valor: 320.00,
    },
    {
      id: "ALG-004",
      cliente: "Construtora Norte",
      materiais: ["Serra Circular", "Esmerilhadeira"],
      dataRetirada: "2024-07-28",
      dataDevolucao: "2024-08-01",
      status: "devolvido",
      pagamento: "pago",
      valor: 190.00,
    },
    {
      id: "ALG-005",
      cliente: "Reformas Rápidas",
      materiais: ["Parafusadeira", "Nível a Laser"],
      dataRetirada: "2024-08-03",
      dataDevolucao: "2024-08-07",
      status: "ativo",
      pagamento: "pendente",
      valor: 150.00,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge variant="secondary" className="bg-info/10 text-info">Ativo</Badge>;
      case "atrasado":
        return <Badge variant="destructive">Atrasado</Badge>;
      case "devolvido":
        return <Badge className="bg-success text-success-foreground">Devolvido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (pagamento: string) => {
    switch (pagamento) {
      case "pago":
        return <Badge className="bg-success text-success-foreground">Pago</Badge>;
      case "pendente":
        return <Badge className="bg-warning text-warning-foreground">Pendente</Badge>;
      default:
        return <Badge variant="outline">{pagamento}</Badge>;
    }
  };

  const filteredAlugueis = alugueis.filter(aluguel => {
    const matchesSearch = aluguel.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aluguel.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || aluguel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Todos os Aluguéis</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
                <SelectItem value="devolvido">Devolvido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lista de Aluguéis */}
          <div className="space-y-4">
            {filteredAlugueis.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum aluguel encontrado com os filtros aplicados.
              </div>
            ) : (
              filteredAlugueis.map((aluguel) => (
                <div
                  key={aluguel.id}
                  className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg">{aluguel.id}</span>
                      {getStatusBadge(aluguel.status)}
                      {getPaymentBadge(aluguel.pagamento)}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Detalhes
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cliente:</p>
                      <p className="font-medium">{aluguel.cliente}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Materiais:</p>
                      <p>{aluguel.materiais.join(", ")}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Período:</p>
                      <p>
                        {new Date(aluguel.dataRetirada).toLocaleDateString()} - {" "}
                        {new Date(aluguel.dataDevolucao).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Valor:</p>
                      <p className="font-medium">R$ {aluguel.valor.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};