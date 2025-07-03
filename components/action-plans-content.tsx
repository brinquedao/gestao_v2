"use client"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Star,
  Users,
  MessageSquare,
  Building2,
  TrendingUp,
  Award,
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ValidationDialog } from "@/components/validation-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ActionPlansContent() {
  const [userType, setUserType] = useState<string | null>(null)
  const [validationOpen, setValidationOpen] = useState(false)
  const [peerValidationOpen, setPeerValidationOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<{ id: string; title: string } | null>(null)
  const [selectedPeerPlan, setSelectedPeerPlan] = useState<any>(null)
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<any>(null)

  useEffect(() => {
    // Get user type from sessionStorage
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  const handleValidate = (approved: boolean, feedback: string) => {
    console.log(`Plano de Ação ${approved ? "aprovado" : "reprovado"}: ${feedback}`)
  }

  const handlePeerValidation = (approved: boolean, feedback: string, relevance?: number, impact?: number) => {
    console.log(`Reavaliação GPA: ${approved ? "aprovado" : "reprovado"}`, { feedback, relevance, impact })
    setPeerValidationOpen(false)
    setSelectedPeerPlan(null)
  }

  const openPeerValidation = (plan: any) => {
    setSelectedPeerPlan(plan)
    setPeerValidationOpen(true)
  }

  const openDetails = (plan: any) => {
    setSelectedPlanDetails(plan)
    setDetailsOpen(true)
  }

  const handleMarkAsBestPractice = (planId: string) => {
    console.log(`Marcar plano ${planId} como boa prática`)
  }

  // Dados mockados para planos da rede
  const networkPlans = [
    {
      id: "plan-1",
      title: "Programa de monitoria em Matemática",
      description: "Implementar um programa de monitoria onde alunos com melhor desempenho auxiliam colegas com dificuldades em matemática.",
      school: "Escola Municipal João da Silva",
      responsible: "Maria Silva",
      okr: "Melhorar desempenho em Matemática",
      keyResults: [
        "Aumentar nota média de 6.2 para 7.5 em matemática",
        "Reduzir em 30% o número de alunos com dificuldades",
        "Implementar monitoria para 100% das turmas do fundamental II",
      ],
      startDate: "01/03/2024",
      endDate: "30/06/2024",
      cause: "Baixo desempenho dos alunos em matemática devido à falta de acompanhamento individualizado.",
      status: "Concluído",
      isBestPractice: true,
      completedDate: "25/06/2024",
      results: "Aumento de 18% na média das notas de matemática. Redução de 35% no número de alunos com dificuldades.",
      peerApprovalDate: "15/02/2024",
      gpaApprovalDate: "20/02/2024",
      relevanceScore: 4.8,
      impactScore: 4.5,
    },
    {
      id: "plan-2",
      title: "Sistema de comunicação digital com pais",
      description: "Implementação de aplicativo para comunicação direta entre escola e pais, com acompanhamento de notas e frequência em tempo real.",
      school: "Escola Municipal Maria Santos",
      responsible: "Dir. Mariana Costa",
      okr: "Aumentar participação dos pais",
      keyResults: [
        "Aumentar participação em reuniões de 45% para 75%",
        "Implementar comunicação digital para 100% dos pais",
        "Reduzir tempo de resposta para comunicados de 3 para 1 dia",
      ],
      startDate: "10/02/2024",
      endDate: "31/08/2024",
      cause: "Baixa participação dos pais nas atividades escolares e dificuldade de comunicação efetiva.",
      status: "Em andamento",
      isBestPractice: false,
      progress: 65,
      peerApprovalDate: "05/02/2024",
      gpaApprovalDate: "08/02/2024",
      relevanceScore: 4.2,
      impactScore: 4.0,
    },
    {
      id: "plan-3",
      title: "Implementação de laboratório de ciências",
      description: "Criação de laboratório para aulas práticas de química e física, visando melhorar o engajamento dos alunos nas disciplinas de exatas.",
      school: "Escola Municipal Pedro Oliveira",
      responsible: "Prof. Carlos Eduardo",
      okr: "Aumentar aprovação em ciências exatas",
      keyResults: [
        "Aumentar nota média de 6.2 para 7.5 em química",
        "Reduzir em 30% o número de alunos com dificuldades em física",
        "Implementar 15 experimentos práticos por semestre",
      ],
      startDate: "15/03/2024",
      endDate: "30/11/2024",
      cause: "Baixo desempenho dos alunos em disciplinas de exatas devido à falta de aulas práticas e laboratório adequado.",
      status: "Atrasado",
      isBestPractice: false,
      progress: 25,
      peerApprovalDate: "10/03/2024",
      gpaApprovalDate: "12/03/2024",
      relevanceScore: 4.5,
      impactScore: 4.8,
    },
    {
      id: "plan-4",
      title: "Capacitação em metodologias ativas",
      description: "Programa de formação continuada para professores focado em metodologias ativas de ensino, com workshops mensais.",
      school: "Escola Municipal Ana Costa",
      responsible: "Coord. Ana Paula",
      okr: "Modernizar práticas pedagógicas",
      keyResults: [
        "Capacitar 100% dos professores em metodologias ativas",
        "Implementar pelo menos 3 metodologias por disciplina",
        "Aumentar engajamento dos alunos em 40%",
      ],
      startDate: "01/02/2024",
      endDate: "30/07/2024",
      cause: "Baixo engajamento dos alunos nas aulas tradicionais e necessidade de modernização das práticas pedagógicas.",
      status: "Reprovado por pares",
      isBestPractice: false,
      peerFeedback: "O plano precisa de maior detalhamento na metodologia e cronograma mais realista.",
      peerRejectionDate: "25/01/2024",
      relevanceScore: 3.2,
      impactScore: 2.8,
    },
  ]

  // Planos aguardando reavaliação da GPA (reprovados por pares)
  const plansForRevaluation = networkPlans.filter(plan => plan.status === "Reprovado por pares")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos de Ação da Rede</h1>
          <p className="text-muted-foreground">Acompanhe e avalie os planos de ação das escolas da rede</p>
        </div>
      </div>

      {/* Cards de estatísticas para GPA */}
      {userType === "gpa" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Planos</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{networkPlans.length}</div>
              <p className="text-xs text-muted-foreground">na rede</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Aguardando Reavaliação</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plansForRevaluation.length}</div>
              <p className="text-xs text-muted-foreground">reprovados por pares</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Boas Práticas</CardTitle>
              <Star className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {networkPlans.filter(plan => plan.isBestPractice).length}
              </div>
              <p className="text-xs text-muted-foreground">identificadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">pelos pares</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar planos da rede..." className="pl-8" />
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
            <DropdownMenuItem>Todos os planos</DropdownMenuItem>
            <DropdownMenuItem>Em andamento</DropdownMenuItem>
            <DropdownMenuItem>Concluídos</DropdownMenuItem>
            <DropdownMenuItem>Atrasados</DropdownMenuItem>
            <DropdownMenuItem>Boas práticas</DropdownMenuItem>
            <DropdownMenuItem>Aguardando reavaliação</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Por escola</DropdownMenuItem>
            <DropdownMenuItem>Por período</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all-plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-plans">Todos os Planos</TabsTrigger>
          <TabsTrigger value="revaluation" className="relative">
            Aguardando Reavaliação
            {plansForRevaluation.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {plansForRevaluation.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="best-practices">Boas Práticas</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="all-plans" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Plano de Ação</TableHead>
                    <TableHead>Escola</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {networkPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {plan.isBestPractice && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                              <Star className="mr-1 h-3 w-3" />
                              Boa Prática
                            </Badge>
                          )}
                          <span>{plan.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{plan.school}</TableCell>
                      <TableCell>{plan.responsible}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {plan.status === "Concluído" && (
                            <>
                              <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                              <span className="text-xs">Concluído</span>
                            </>
                          )}
                          {plan.status === "Em andamento" && (
                            <>
                              <Clock className="mr-1 h-4 w-4 text-amber-500" />
                              <span className="text-xs">Em andamento</span>
                            </>
                          )}
                          {plan.status === "Atrasado" && (
                            <>
                              <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                              <span className="text-xs">Atrasado</span>
                            </>
                          )}
                          {plan.status === "Reprovado por pares" && (
                            <>
                              <X className="mr-1 h-4 w-4 text-red-500" />
                              <span className="text-xs">Reprovado por pares</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            R: {plan.relevanceScore}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            I: {plan.impactScore}
                          </Badge>
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
                            <DropdownMenuItem onClick={() => openDetails(plan)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalhes
                            </DropdownMenuItem>
                            {plan.status === "Reprovado por pares" && (
                              <DropdownMenuItem onClick={() => openPeerValidation(plan)}>
                                <Users className="mr-2 h-4 w-4" />
                                Reavaliar plano
                              </DropdownMenuItem>
                            )}
                            {plan.status === "Concluído" && !plan.isBestPractice && (
                              <DropdownMenuItem onClick={() => handleMarkAsBestPractice(plan.id)}>
                                <Star className="mr-2 h-4 w-4" />
                                Marcar como boa prática
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revaluation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Planos Aguardando Reavaliação da GPA
              </CardTitle>
              <CardDescription>
                Estes planos foram reprovados por pares e necessitam de uma segunda avaliação da GPA
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Plano de Ação</TableHead>
                    <TableHead>Escola</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Reprovado em</TableHead>
                    <TableHead>Avaliação Pares</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plansForRevaluation.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.title}</TableCell>
                      <TableCell>{plan.school}</TableCell>
                      <TableCell>{plan.responsible}</TableCell>
                      <TableCell>{plan.peerRejectionDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            R: {plan.relevanceScore}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            I: {plan.impactScore}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => openPeerValidation(plan)}>
                          <Users className="mr-2 h-4 w-4" />
                          Reavaliar Plano
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="best-practices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Boas Práticas Identificadas
              </CardTitle>
              <CardDescription>
                Planos de ação que se destacaram e podem ser replicados por outras escolas
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Plano de Ação</TableHead>
                    <TableHead>Escola</TableHead>
                    <TableHead>Resultados</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {networkPlans
                    .filter(plan => plan.isBestPractice)
                    .map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                              <Award className="mr-1 h-3 w-3" />
                              Boa Prática
                            </Badge>
                            <span>{plan.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{plan.school}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{plan.results}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              R: {plan.relevanceScore}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              I: {plan.impactScore}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openDetails(plan)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Concluídos</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Em andamento</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Atrasados</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reprovados</span>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Média de Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Relevância</span>
                    <span className="text-sm font-medium">4.2/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Impacto</span>
                    <span className="text-sm font-medium">4.0/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxa de Aprovação</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Boas Práticas</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de Detalhes do Plano */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedPlanDetails && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedPlanDetails.isBestPractice && <Star className="h-5 w-5 text-amber-500" />}
                  {selectedPlanDetails.title}
                </DialogTitle>
                <DialogDescription>{selectedPlanDetails.school}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Descrição</h4>
                    <p className="text-sm text-muted-foreground">{selectedPlanDetails.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Causa Relacionada</h4>
                    <p className="text-sm text-muted-foreground">{selectedPlanDetails.cause}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Responsável</h4>
                      <p className="text-sm">{selectedPlanDetails.responsible}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">OKR Relacionado</h4>
                      <p className="text-sm">{selectedPlanDetails.okr}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Período</h4>
                      <p className="text-sm">{selectedPlanDetails.startDate} a {selectedPlanDetails.endDate}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Status</h4>
                      <Badge variant="outline">{selectedPlanDetails.status}</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Resultados-Chave Associados</h4>
                    <ul className="space-y-1">
                      {selectedPlanDetails.keyResults.map((kr: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                          {kr}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedPlanDetails.results && (
                    <div>
                      <h4 className="font-medium mb-2">Resultados Alcançados</h4>
                      <p className="text-sm text-muted-foreground">{selectedPlanDetails.results}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Avaliação de Relevância</h4>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {selectedPlanDetails.relevanceScore}/5.0
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Avaliação de Impacto</h4>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {selectedPlanDetails.impactScore}/5.0
                      </Badge>
                    </div>
                  </div>

                  {selectedPlanDetails.isBestPractice && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Identificado como Boa Prática
                      </h4>
                      <p className="text-sm text-amber-700">
                        Este plano foi identificado como uma boa prática devido aos excelentes resultados alcançados e pode ser replicado por outras escolas da rede.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Fechar
                </Button>
                {selectedPlanDetails.status === "Concluído" && !selectedPlanDetails.isBestPractice && (
                  <Button onClick={() => handleMarkAsBestPractice(selectedPlanDetails.id)}>
                    <Star className="mr-2 h-4 w-4" />
                    Marcar como Boa Prática
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Reavaliação de Plano */}
      <Dialog open={peerValidationOpen} onOpenChange={setPeerValidationOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedPeerPlan && (
            <>
              <DialogHeader>
                <DialogTitle>Reavaliação GPA - Plano Reprovado por Pares</DialogTitle>
                <DialogDescription>Faça uma segunda avaliação deste plano que foi reprovado pelos pares</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Informações do Plano */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedPeerPlan.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPeerPlan.school} • {selectedPeerPlan.responsible}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Descrição</h4>
                      <p className="text-sm text-muted-foreground">{selectedPeerPlan.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Causa Relacionada</h4>
                      <p className="text-sm text-muted-foreground">{selectedPeerPlan.cause}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-1">OKR Relacionado</h4>
                        <p className="text-sm">{selectedPeerPlan.okr}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Período</h4>
                        <p className="text-sm">
                          {selectedPeerPlan.startDate} a {selectedPeerPlan.endDate}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Resultados-Chave Associados</h4>
                      <ul className="space-y-1">
                        {selectedPeerPlan.keyResults.map((kr: string, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                            {kr}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Feedback dos Pares */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Feedback da Avaliação por Pares
                  </h4>
                  <p className="text-sm text-red-700 mb-2">{selectedPeerPlan.peerFeedback}</p>
                  <div className="flex gap-4 text-xs text-red-600">
                    <span>Relevância: {selectedPeerPlan.relevanceScore}/5.0</span>
                    <span>Impacto: {selectedPeerPlan.impactScore}/5.0</span>
                    <span>Reprovado em: {selectedPeerPlan.peerRejectionDate}</span>
                  </div>
                </div>

                {/* Formulário de Reavaliação da GPA */}
                <div className="border-t pt-6 space-y-4">
                  <h4 className="font-medium">Reavaliação da GPA</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="gpa-relevance">Relevância (1-5)</Label>
                      <Select>
                        <SelectTrigger id="gpa-relevance">
                          <SelectValue placeholder="Selecione a relevância" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - Muito Baixa</SelectItem>
                          <SelectItem value="2">2 - Baixa</SelectItem>
                          <SelectItem value="3">3 - Média</SelectItem>
                          <SelectItem value="4">4 - Alta</SelectItem>
                          <SelectItem value="5">5 - Muito Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gpa-impact">Impacto (1-5)</Label>
                      <Select>
                        <SelectTrigger id="gpa-impact">
                          <SelectValue placeholder="Selecione o impacto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - Muito Baixo</SelectItem>
                          <SelectItem value="2">2 - Baixo</SelectItem>
                          <SelectItem value="3">3 - Médio</SelectItem>
                          <SelectItem value="4">4 - Alto</SelectItem>
                          <SelectItem value="5">5 - Muito Alto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Decisão da GPA</Label>
                    <RadioGroup className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="approve" id="gpa-approve" />
                        <Label htmlFor="gpa-approve" className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Aprovar (reversão da decisão dos pares)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reject" id="gpa-reject" />
                        <Label htmlFor="gpa-reject" className="flex items-center">
                          <X className="mr-2 h-4 w-4 text-red-500" />
                          Manter reprovação
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="gpa-feedback">Justificativa da GPA</Label>
                    <Textarea
                      id="gpa-feedback"
                      placeholder="Explique sua decisão como coordenação pedagógica da rede"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPeerValidationOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => handlePeerValidation(true, "Reavaliação GPA", 4, 4)}>
                  Finalizar Reavaliação
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Validação GPA (para outros casos) */}
      {userType === "gpa" && currentPlan && (
        <ValidationDialog
          open={validationOpen}
          onOpenChange={setValidationOpen}
          title={currentPlan.title}
          type="action-plan"
          onValidate={handleValidate}
        />
      )}
    </div>
  )
}