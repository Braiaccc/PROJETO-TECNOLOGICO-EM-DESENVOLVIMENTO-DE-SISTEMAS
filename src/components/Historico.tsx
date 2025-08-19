import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Download, Filter, Calendar } from "lucide-react";

export const Historico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [dateFilter, setDateFilter] = useState("30dias");

  const historico = [
    {
      id: "ALG-004",
      cliente: "Construtora Norte",
      materiais: ["Serra Circular", "Esmerilhadeira"],
      dataRetirada: "2024-07-28",
      dataDevolucao: "2024-08-01",
      dataRealDevolucao: "2024-08-01",
      status: "concluido",
      pagamento: "pago",
      valor: 190.00,
      diasAtraso: 0,
    },
    {
      id: "ALG-006",
      cliente: "Obras Central",
      materiais: ["Betoneira", "Vibrador"],
      dataRetirada: "2024-07-20",
      dataDevolucao: "2024-07-25",
      dataRealDevolucao: "2024-07-27",
      status: "concluido",
      pagamento: "pago",
      valor: 350.00,
      diasAtraso: 2,
    },
    {
      id: "ALG-007",
      cliente: "Reformas Modernas",
      materiais: ["Compressor", "Pistola"],
      dataRetirada: "2024-07-15",
      dataDevolucao: "2024-07-20",
      dataRealDevolucao: "2024-07-20",
      status: "concluido",
      pagamento: "pago",
      valor: 275.00,
      diasAtraso: 0,
    },
    {
      id: "ALG-008",
      cliente: "Construção Premium",
      materiais: ["Furadeira", "Parafusadeira", "Nível"],
      dataRetirada: "2024-07-10",
      dataDevolucao: "2024-07-15",
      dataRealDevolucao: "2024-07-18",
      status: "concluido",
      pagamento: "pendente",
      valor: 180.00,
      diasAtraso: 3,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-success text-success-foreground">Concluído</Badge>;
      case "cancelado":
        return <Badge variant="destructive">Cancelado</Badge>;
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

  const getAtrasoBadge = (diasAtraso: number) => {
    if (diasAtraso === 0) {
      return <Badge variant="outline" className="bg-success/10 text-success">No Prazo</Badge>;
    } else {
      return <Badge variant="destructive">{diasAtraso} dias de atraso</Badge>;
    }
  };

  const filteredHistorico = historico.filter(item => {
    const matchesSearch = item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValor = filteredHistorico.reduce((sum, item) => sum + item.valor, 0);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Histórico de Aluguéis
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                placeholder="Buscar por cliente ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                <SelectItem value="ano">Este ano</SelectItem>
                <SelectItem value="todos">Todo período</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Resumo */}
          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{filteredHistorico.length}</p>
                <p className="text-sm text-muted-foreground">Aluguéis Concluídos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">R$ {totalValor.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Valor Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">
                  {filteredHistorico.filter(item => item.diasAtraso > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Com Atraso</p>
              </div>
            </div>
          </div>

          {/* Lista do Histórico */}
          <div className="space-y-4">
            {filteredHistorico.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum registro encontrado com os filtros aplicados.
              </div>
            ) : (
              filteredHistorico.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold text-lg">{item.id}</span>
                      {getStatusBadge(item.status)}
                      {getPaymentBadge(item.pagamento)}
                      {getAtrasoBadge(item.diasAtraso)}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cliente:</p>
                      <p className="font-medium">{item.cliente}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Materiais:</p>
                      <p>{item.materiais.join(", ")}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Período Previsto:</p>
                      <p>
                        {new Date(item.dataRetirada).toLocaleDateString()} - {" "}
                        {new Date(item.dataDevolucao).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Devolução Real:</p>
                      <p>{new Date(item.dataRealDevolucao).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Valor:</p>
                      <p className="font-medium">R$ {item.valor.toFixed(2)}</p>
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