"use client"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ValidationDialog } from "@/components/validation-dialog"
import { ColoredProgress } from "@/components/ui/colored-progress"
import { Badge } from "@/components/ui/badge"

export default function OKRsContent() {
  const [userType, setUserType] = useState<string | null>(null)
  const [openNewOKR, setOpenNewOKR] = useState(false)
  const [openNewKR, setOpenNewKR] = useState(false)
  const [validationOpen, setValidationOpen] = useState(false)
  const [currentOkr, setCurrentOkr] = useState<{ id: string; title: string } | null>(null)

  const [detailsOpen, setDetailsOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [selectedOkr, setSelectedOkr] = useState<{
    id: string
    title: string
    description: string
    responsible: string
    deadline: string
    progress: number
    status: string
    keyResults: Array<{
      title: string
      description: string
      startValue: number
      targetValue: number
      currentValue: number
      responsible: string
      status: string
      dataSource?: string
    }>
    feedback?: string
  } | null>(null)

  const [openBulkOKR, setOpenBulkOKR] = useState(false)
  const [openBulkKR, setOpenBulkKR] = useState(false)
  const [bulkKRs, setBulkKRs] = useState<
    Array<{ title: string; description: string; startValue: number; targetValue: number; dataSource: string }>
  >([])

  const removeBulkKR = (index: number) => {
    setBulkKRs((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    // Get user type from sessionStorage
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  const handleValidate = (approved: boolean, feedback: string, relevance?: number, impact?: number) => {
    // Aqui você implementaria a lógica para salvar a validação
    console.log(`OKR ${approved ? "aprovado" : "reprovado"}: ${feedback}`)
    if (relevance && impact) {
      console.log(`Relevância: ${relevance}, Impacto: ${impact}`)
    }
    // Atualizar a interface após a validação
  }

  const handleOpenDetails = (okrId: string) => {
    // Dados mockados - em um caso real, viria de uma API
    const okrData = {
      id: okrId,
      title:
        okrId === "matematica"
          ? "Melhorar desempenho em Matemática"
          : okrId === "evasao"
            ? "Reduzir evasão escolar"
            : okrId === "participacao"
              ? "Aumentar participação dos pais"
              : "Melhorar habilidades de leitura",
      description:
        okrId === "matematica"
          ? "Implementar estratégias pedagógicas para melhorar o desempenho dos alunos em matemática, com foco em metodologias ativas e acompanhamento individualizado."
          : okrId === "evasao"
            ? "Desenvolver ações preventivas para reduzir a evasão escolar, identificando alunos em risco e implementando programas de acompanhamento."
            : okrId === "participacao"
              ? "Criar estratégias para aumentar o engajamento e participação dos pais na vida escolar dos alunos."
              : "Desenvolver programa para melhorar as habilidades de leitura e interpretação de texto dos alunos.",
      responsible:
        okrId === "matematica"
          ? "Maria Silva"
          : okrId === "evasao"
            ? "João Santos"
            : okrId === "participacao"
              ? "Ana Oliveira"
              : "Carlos Mendes",
      deadline:
        okrId === "matematica"
          ? "30/06/2024"
          : okrId === "evasao"
            ? "31/07/2024"
            : okrId === "participacao"
              ? "15/05/2024"
              : "31/08/2024",
      progress: okrId === "matematica" ? 65 : okrId === "evasao" ? 40 : okrId === "participacao" ? 100 : 0,
      status:
        okrId === "matematica"
          ? "Em andamento"
          : okrId === "evasao"
            ? "Em andamento"
            : okrId === "participacao"
              ? "Concluído"
              : userType === "escola"
                ? "Reprovado"
                : "Aguardando aprovação",
      keyResults:
        okrId === "matematica"
          ? [
              {
                title: "Aumentar média de notas de 6,5 para 7,5",
                description: "Elevar a média geral das notas de matemática da turma",
                startValue: 6.5,
                targetValue: 7.5,
                currentValue: 7.2,
                responsible: "Maria Silva",
                status: "Em andamento",
                dataSource: "dados-curso",
              },
              {
                title: "Reduzir em 15% o número de recuperações",
                description: "Diminuir a quantidade de alunos que precisam de recuperação",
                startValue: 20,
                targetValue: 17,
                currentValue: 18,
                responsible: "Maria Silva",
                status: "Em andamento",
                dataSource: "dados-escola",
              },
              {
                title: "Implementar 2 novas ferramentas de ensino",
                description: "Introduzir metodologias ativas no ensino de matemática",
                startValue: 0,
                targetValue: 2,
                currentValue: 2,
                responsible: "Maria Silva",
                status: "Concluído",
                dataSource: "avaliacao-interna",
              },
            ]
          : okrId === "evasao"
            ? [
                {
                  title: "Reduzir taxa de evasão de 8% para 5%",
                  description: "Diminuir o percentual de alunos que abandonam os estudos",
                  startValue: 8,
                  targetValue: 5,
                  currentValue: 6.5,
                  responsible: "João Santos",
                  status: "Em andamento",
                  dataSource: "dados-escola",
                },
                {
                  title: "Programa de acompanhamento para 100% dos alunos em risco",
                  description: "Identificar e acompanhar todos os alunos com risco de evasão",
                  startValue: 0,
                  targetValue: 100,
                  currentValue: 60,
                  responsible: "João Santos",
                  status: "Em andamento",
                  dataSource: "avaliacao-interna",
                },
              ]
            : okrId === "participacao"
              ? [
                  {
                    title: "Aumentar participação em reuniões para 80%",
                    description: "Elevar o percentual de pais presentes nas reuniões",
                    startValue: 45,
                    targetValue: 80,
                    currentValue: 82,
                    responsible: "Ana Oliveira",
                    status: "Concluído",
                    dataSource: "pesquisa",
                  },
                ]
              : [
                  {
                    title: "Aumentar velocidade de leitura em 30%",
                    description: "Melhorar a velocidade de leitura dos alunos",
                    startValue: 100,
                    targetValue: 130,
                    currentValue: 105,
                    responsible: "Carlos Mendes",
                    status: "Iniciado",
                    dataSource: "avaliacao-externa",
                  },
                ],
      feedback:
        okrId === "leitura" && userType === "escola"
          ? "O OKR apresenta objetivos válidos, porém faltam detalhes sobre a metodologia a ser aplicada e os indicadores de acompanhamento são insuficientes. Sugerimos: 1) Definir metodologias específicas para melhoria da leitura; 2) Estabelecer marcos intermediários de avaliação; 3) Incluir estratégias de engajamento dos alunos. Por favor, revise e reenvie com essas melhorias."
          : undefined,
    }

    setSelectedOkr(okrData)
    setDetailsOpen(true)
  }

  const handleOpenFeedback = (okrId: string) => {
    handleOpenDetails(okrId)
    setDetailsOpen(false)
    setFeedbackOpen(true)
  }

  const handleOpenReview = (okrId: string) => {
    // Implementar a lógica para abrir o modal de revisão e reenvio
    console.log(`Abrir modal de revisão para OKR ${okrId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">OKRs</h1>
          <p className="text-muted-foreground">Gerencie seus objetivos e resultados-chave</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {userType === "gpa" && (
            <Dialog open={openBulkOKR} onOpenChange={setOpenBulkOKR}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar OKRs em Massa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Criar OKRs em Massa</DialogTitle>
                  <DialogDescription>Crie OKRs padronizados para múltiplas escolas da rede</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bulk-objective">Objetivo</Label>
                    <Input id="bulk-objective" placeholder="Ex: Melhorar o desempenho em Matemática" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bulk-description">Descrição</Label>
                    <Textarea id="bulk-description" placeholder="Descreva o objetivo e sua importância" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bulk-start-date">Data de Início</Label>
                      <Input id="bulk-start-date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bulk-end-date">Data de Término</Label>
                      <Input id="bulk-end-date" type="date" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Escolas Selecionadas</Label>
                    <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Escola Municipal João da Silva</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Escola Municipal Maria Oliveira</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Escola Municipal Pedro Álvares</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Escola Municipal Ana Santos</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Escola Municipal Carlos Lima</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>3 de 5 escolas selecionadas</span>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Selecionar todas
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bulk-committee">Comitê Responsável</Label>
                    <Select>
                      <SelectTrigger id="bulk-committee">
                        <SelectValue placeholder="Selecione um comitê" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qualidade">Comitê de Qualidade Educacional</SelectItem>
                        <SelectItem value="projetos">Comitê de Gestão de Projetos</SelectItem>
                        <SelectItem value="avaliacao">Comitê de Avaliação e Resultados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bulk-data-source">Fonte de Dados da Métrica</Label>
                    <Select>
                      <SelectTrigger id="bulk-data-source">
                        <SelectValue placeholder="Selecione a fonte de dados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pesquisa">Pesquisa</SelectItem>
                        <SelectItem value="avaliacao-interna">Avaliação Interna</SelectItem>
                        <SelectItem value="avaliacao-externa">Avaliação Externa</SelectItem>
                        <SelectItem value="dados-curso">Dados do Curso</SelectItem>
                        <SelectItem value="dados-escola">Dados da Escola</SelectItem>
                        <SelectItem value="sistema-academico">Sistema Acadêmico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label>Resultados-Chave (KRs) Padrão</Label>
                      <Button variant="outline" size="sm" onClick={() => setOpenBulkKR(true)}>
                        <Plus className="mr-2 h-3 w-3" />
                        Adicionar KR
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <div className="p-3">
                        {bulkKRs.length > 0 ? (
                          <div className="space-y-2">
                            {bulkKRs.map((kr, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                <span className="text-sm">{kr.title}</span>
                                <Button variant="ghost" size="sm" onClick={() => removeBulkKR(index)}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Nenhum KR adicionado</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Configurações Avançadas</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-blue-700">Permitir que escolas personalizem os KRs</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-blue-700">Notificar escolas sobre novos OKRs</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-blue-700">Definir como OKR obrigatório</span>
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenBulkOKR(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Criar OKRs para {3} Escolas</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {userType === "escola" && (
            <>
              <Dialog open={openNewOKR} onOpenChange={setOpenNewOKR}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo OKR
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo OKR</DialogTitle>
                    <DialogDescription>Defina um objetivo e seus resultados-chave mensuráveis</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="objective">Objetivo</Label>
                      <Input id="objective" placeholder="Ex: Melhorar o desempenho em Matemática" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea id="description" placeholder="Descreva o objetivo e sua importância" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="start-date">Data de Início</Label>
                        <Input id="start-date" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="end-date">Data de Término</Label>
                        <Input id="end-date" type="date" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="committee">Comitê Responsável</Label>
                      <Select>
                        <SelectTrigger id="committee">
                          <SelectValue placeholder="Selecione um comitê" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="qualidade">Comitê de Qualidade Educacional</SelectItem>
                          <SelectItem value="projetos">Comitê de Gestão de Projetos</SelectItem>
                          <SelectItem value="avaliacao">Comitê de Avaliação e Resultados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="responsible">Responsável</Label>
                      <Select>
                        <SelectTrigger id="responsible">
                          <SelectValue placeholder="Primeiro selecione um comitê" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maria">Maria Silva</SelectItem>
                          <SelectItem value="joao">João Santos</SelectItem>
                          <SelectItem value="ana">Ana Oliveira</SelectItem>
                          <SelectItem value="carlos">Carlos Mendes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="data-source">Fonte de Dados da Métrica</Label>
                      <Select>
                        <SelectTrigger id="data-source">
                          <SelectValue placeholder="Selecione a fonte de dados" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pesquisa">Pesquisa</SelectItem>
                          <SelectItem value="avaliacao-interna">Avaliação Interna</SelectItem>
                          <SelectItem value="avaliacao-externa">Avaliação Externa</SelectItem>
                          <SelectItem value="dados-curso">Dados do Curso</SelectItem>
                          <SelectItem value="dados-escola">Dados da Escola</SelectItem>
                          <SelectItem value="sistema-academico">Sistema Acadêmico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label>Resultados-Chave (KRs)</Label>
                        <Button variant="outline" size="sm" onClick={() => setOpenNewKR(true)}>
                          <Plus className="mr-2 h-3 w-3" />
                          Adicionar KR
                        </Button>
                      </div>
                      <div className="rounded-md border">
                        <div className="p-3">
                          <p className="text-sm text-muted-foreground">Nenhum KR adicionado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenNewOKR(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Salvar OKR</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={openNewKR} onOpenChange={setOpenNewKR}>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Adicionar Resultado-Chave</DialogTitle>
                    <DialogDescription>Defina um resultado mensurável para o objetivo</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="kr-title">Título do KR</Label>
                      <Input id="kr-title" placeholder="Ex: Aumentar a nota média para 7.5" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="kr-description">Descrição</Label>
                      <Textarea id="kr-description" placeholder="Descreva como este resultado será medido" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="kr-start-value">Valor Inicial</Label>
                        <Input id="kr-start-value" type="number" placeholder="Ex: 6.5" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="kr-target-value">Valor Alvo</Label>
                        <Input id="kr-target-value" type="number" placeholder="Ex: 7.5" />
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-700">
                        <strong>Nota:</strong> O responsável e fonte de dados serão herdados do OKR principal.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenNewKR(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Adicionar KR</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar OKRs..." className="pl-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>Todos os OKRs</DropdownMenuItem>
            <DropdownMenuItem>Em andamento</DropdownMenuItem>
            <DropdownMenuItem>Concluídos</DropdownMenuItem>
            <DropdownMenuItem>Atrasados</DropdownMenuItem>
            {userType === "escola" && <DropdownMenuItem>Aguardando aprovação</DropdownMenuItem>}
            {userType === "gpa" && <DropdownMenuItem>Pendentes de aprovação</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Período atual</DropdownMenuItem>
            <DropdownMenuItem>Período anterior</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="board">Quadro</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Objetivo</TableHead>
                    <TableHead>Progresso</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userType === "escola" && (
                    <TableRow>
                      <TableCell className="font-medium">Melhorar habilidades de leitura</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-[60px]">
                            <ColoredProgress value={0} size="sm" />
                          </div>
                          <span className="text-xs">0%</span>
                        </div>
                      </TableCell>
                      <TableCell>Carlos Mendes</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <AlertTriangle className="mr-1 h-4 w-4 text-red-500" />
                          <span className="text-xs">Reprovado</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenFeedback("leitura")}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver feedback
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenReview("leitura")}>
                              <Edit className="mr-2 h-4 w-4" />
                              Revisar e reenviar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow>
                    <TableCell className="font-medium">Melhorar desempenho em Matemática</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-[60px]">
                          <ColoredProgress value={65} size="sm" />
                        </div>
                        <span className="text-xs">65%</span>
                      </div>
                    </TableCell>
                    <TableCell>Maria Silva</TableCell>
                    <TableCell>30/06/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-amber-500" />
                        <span className="text-xs">Em andamento</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDetails("matematica")}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Atualizar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Reduzir evasão escolar</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-[60px]">
                          <ColoredProgress value={40} size="sm" />
                        </div>
                        <span className="text-xs">40%</span>
                      </div>
                    </TableCell>
                    <TableCell>João Santos</TableCell>
                    <TableCell>31/07/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-amber-500" />
                        <span className="text-xs">Em andamento</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDetails("evasao")}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  {userType === "escola" && (
                    <TableRow>
                      <TableCell className="font-medium">Implementar programa de mentoria</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-[60px]">
                            <ColoredProgress value={0} size="sm" />
                          </div>
                          <span className="text-xs">0%</span>
                        </div>
                      </TableCell>
                      <TableCell>Roberto Lima</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <AlertCircle className="mr-1 h-4 w-4 text-blue-500" />
                          <span className="text-xs">Em avaliação</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow>
                    <TableCell className="font-medium">Aumentar participação dos pais</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-[60px]">
                          <ColoredProgress value={100} size="sm" />
                        </div>
                        <span className="text-xs">100%</span>
                      </div>
                    </TableCell>
                    <TableCell>Ana Oliveira</TableCell>
                    <TableCell>15/05/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-xs">Concluído</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDetails("participacao")}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Reutilizar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  {userType === "gpa" && (
                    <TableRow>
                      <TableCell className="font-medium">Melhorar habilidades de leitura</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-[60px]">
                            <ColoredProgress value={0} size="sm" />
                          </div>
                          <span className="text-xs">0%</span>
                        </div>
                      </TableCell>
                      <TableCell>Escola Municipal João da Silva</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <AlertCircle className="mr-1 h-4 w-4 text-blue-500" />
                          <span className="text-xs">Aguardando aprovação</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentOkr({ id: "melhorar-leitura", title: "Melhorar habilidades de leitura" })
                                setValidationOpen(true)
                              }}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Validar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenDetails("leitura")}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalhes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-4">
            {userType === "escola" && (
              <Card>
                <CardHeader className="bg-red-50 pb-3">
                  <CardTitle className="text-red-700">Reprovados</CardTitle>
                  <CardDescription>1 OKR</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-3">
                    <div className="rounded-lg border p-3 shadow-sm">
                      <h3 className="font-semibold">Melhorar habilidades de leitura</h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between mb-1">
                          <span>Feedback da GPA disponível</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span>Carlos Mendes</span>
                        <Button variant="outline" size="sm">
                          Ver feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="bg-amber-50 pb-3">
                <CardTitle className="text-amber-700">Em Andamento</CardTitle>
                <CardDescription>2 OKRs</CardDescription>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 shadow-sm">
                    <h3 className="font-semibold">Melhorar desempenho em Matemática</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between mb-1">
                        <span>Progresso: 65%</span>
                      </div>
                      <ColoredProgress value={65} showValue={false} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span>Maria Silva</span>
                      <span>30/06/2024</span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3 shadow-sm">
                    <h3 className="font-semibold">Reduzir evasão escolar</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between mb-1">
                        <span>Progresso: 40%</span>
                      </div>
                      <ColoredProgress value={40} showValue={false} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span>João Santos</span>
                      <span>31/07/2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {userType === "escola" && (
              <Card>
                <CardHeader className="bg-blue-50 pb-3">
                  <CardTitle className="text-blue-700">Em Avaliação</CardTitle>
                  <CardDescription>1 OKR</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-3">
                    <div className="rounded-lg border p-3 shadow-sm">
                      <h3 className="font-semibold">Implementar programa de mentoria</h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between mb-1">
                          <span>Aguardando validação da GPA</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span>Roberto Lima</span>
                        <span>Enviado: 15/05/2024</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="bg-green-50 pb-3">
                <CardTitle className="text-green-700">Concluídos</CardTitle>
                <CardDescription>1 OKR</CardDescription>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 shadow-sm">
                    <h3 className="font-semibold">Aumentar participação dos pais</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between mb-1">
                        <span>Progresso: 100%</span>
                      </div>
                      <ColoredProgress value={100} showValue={false} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span>Ana Oliveira</span>
                      <span>15/05/2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {userType === "gpa" && (
              <Card>
                <CardHeader className="bg-blue-50 pb-3">
                  <CardTitle className="text-blue-700">Aguardando Aprovação</CardTitle>
                  <CardDescription>1 OKR</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-3">
                    <div className="rounded-lg border p-3 shadow-sm">
                      <h3 className="font-semibold">Melhorar habilidades de leitura</h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between mb-1">
                          <span>Escola Municipal João da Silva</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span>Enviado: 10/05/2024</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentOkr({ id: "melhorar-leitura", title: "Melhorar habilidades de leitura" })
                            setValidationOpen(true)
                          }}
                        >
                          Validar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {userType === "gpa" && currentOkr && (
        <ValidationDialog
          open={validationOpen}
          onOpenChange={setValidationOpen}
          title={currentOkr.title}
          type="action-plan"
          onValidate={handleValidate}
        />
      )}

      {/* Modal de Detalhes do OKR */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedOkr && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedOkr.title}</DialogTitle>
                <DialogDescription>Detalhes completos do objetivo e resultados-chave</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Descrição</h3>
                    <p className="text-sm text-muted-foreground">{selectedOkr.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Responsável</h3>
                      <p className="text-sm">{selectedOkr.responsible}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Prazo</h3>
                      <p className="text-sm">{selectedOkr.deadline}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Progresso Geral</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <ColoredProgress value={selectedOkr.progress} showValue={false} />
                      </div>
                      <span className="text-sm font-medium">{selectedOkr.progress}%</span>
                      <Badge
                        variant={
                          selectedOkr.status === "Concluído"
                            ? "default"
                            : selectedOkr.status === "Em andamento"
                              ? "secondary"
                              : selectedOkr.status === "Reprovado"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {selectedOkr.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Resultados-Chave</h3>
                  <div className="space-y-4">
                    {selectedOkr.keyResults.map((kr, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium">{kr.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className={
                                  kr.status === "Concluído"
                                    ? "bg-green-50 text-green-700"
                                    : kr.status === "Em andamento"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-slate-50 text-slate-700"
                                }
                              >
                                {kr.status}
                              </Badge>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                                {kr.dataSource || "Sistema Acadêmico"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{kr.description}</p>

                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium">Valor inicial:</span>
                            <p>{kr.startValue}</p>
                          </div>
                          <div>
                            <span className="font-medium">Valor atual:</span>
                            <p className="text-blue-600 font-semibold">{kr.currentValue}</p>
                          </div>
                          <div>
                            <span className="font-medium">Meta:</span>
                            <p>{kr.targetValue}</p>
                          </div>
                        </div>

                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progresso</span>
                            <span>
                              {Math.round(((kr.currentValue - kr.startValue) / (kr.targetValue - kr.startValue)) * 100)}
                              %
                            </span>
                          </div>
                          <ColoredProgress
                            value={Math.round(
                              ((kr.currentValue - kr.startValue) / (kr.targetValue - kr.startValue)) * 100,
                            )}
                            showValue={false}
                            size="sm"
                          />
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Responsável:</span> {kr.responsible}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Fechar
                </Button>
                {userType === "escola" && selectedOkr.status !== "Concluído" && selectedOkr.status !== "Reprovado" && (
                  <Button>Atualizar Progresso</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Feedback */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedOkr && (
            <>
              <DialogHeader>
                <DialogTitle>Feedback da GPA</DialogTitle>
                <DialogDescription>{selectedOkr.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-800 mb-2">OKR Reprovado</h3>
                      <p className="text-sm text-red-700">{selectedOkr.feedback}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Próximos Passos</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Revise o OKR com base no feedback recebido</li>
                    <li>• Faça as alterações sugeridas pela GPA</li>
                    <li>• Reenvie o OKR para nova avaliação</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setFeedbackOpen(false)}>
                  Fechar
                </Button>
                <Button>Revisar e Reenviar</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openBulkKR} onOpenChange={setOpenBulkKR}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Resultado-Chave Padrão</DialogTitle>
            <DialogDescription>Defina um KR que será aplicado a todas as escolas selecionadas</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bulk-kr-title">Título do KR</Label>
              <Input id="bulk-kr-title" placeholder="Ex: Aumentar a nota média para 7.5" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bulk-kr-description">Descrição</Label>
              <Textarea id="bulk-kr-description" placeholder="Descreva como este resultado será medido" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bulk-kr-start-value">Valor Inicial Sugerido</Label>
                <Input id="bulk-kr-start-value" type="number" placeholder="Ex: 6.5" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bulk-kr-target-value">Valor Alvo Sugerido</Label>
                <Input id="bulk-kr-target-value" type="number" placeholder="Ex: 7.5" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bulk-kr-data-source">Fonte de Dados</Label>
              <Select>
                <SelectTrigger id="bulk-kr-data-source">
                  <SelectValue placeholder="Selecione a fonte de dados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pesquisa">Pesquisa</SelectItem>
                  <SelectItem value="avaliacao-interna">Avaliação Interna</SelectItem>
                  <SelectItem value="avaliacao-externa">Avaliação Externa</SelectItem>
                  <SelectItem value="dados-curso">Dados do Curso</SelectItem>
                  <SelectItem value="dados-escola">Dados da Escola</SelectItem>
                  <SelectItem value="sistema-academico">Sistema Acadêmico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-700">
                <strong>Nota:</strong> Os valores iniciais e alvos são sugestões. Cada escola poderá ajustar conforme
                sua realidade.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenBulkKR(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              onClick={() => {
                // Aqui você adicionaria a lógica para adicionar o KR
                setBulkKRs((prev) => [
                  ...prev,
                  {
                    title: "Exemplo de KR",
                    description: "Descrição do KR",
                    startValue: 0,
                    targetValue: 100,
                    dataSource: "sistema-academico",
                  },
                ])
                setOpenBulkKR(false)
              }}
            >
              Adicionar KR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}