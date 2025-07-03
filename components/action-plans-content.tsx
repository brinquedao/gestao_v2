"use client"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  X,
  Users,
  MessageSquare,
  RefreshCw,
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
  const [openNewPlan, setOpenNewPlan] = useState(false)
  const [validationOpen, setValidationOpen] = useState(false)
  const [peerValidationOpen, setPeerValidationOpen] = useState(false)
  const [gpaFeedbackOpen, setGpaFeedbackOpen] = useState(false)
  const [revisionOpen, setRevisionOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<{ id: string; title: string } | null>(null)
  const [selectedPeerPlan, setSelectedPeerPlan] = useState<any>(null)
  const [selectedGpaFeedback, setSelectedGpaFeedback] = useState<any>(null)
  const [selectedRevisionPlan, setSelectedRevisionPlan] = useState<any>(null)

  useEffect(() => {
    // Get user type from sessionStorage
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  const handleValidate = (approved: boolean, feedback: string) => {
    // Aqui você implementaria a lógica para salvar a validação
    console.log(`Plano de Ação ${approved ? "aprovado" : "reprovado"}: ${feedback}`)
    // Atualizar a interface após a validação
  }

  const handlePeerValidation = (approved: boolean, feedback: string, relevance?: number, impact?: number) => {
    console.log(`Avaliação por pares: ${approved ? "aprovado" : "reprovado"}`, { feedback, relevance, impact })
    setPeerValidationOpen(false)
    setSelectedPeerPlan(null)
  }

  const openPeerValidation = (plan: any) => {
    setSelectedPeerPlan(plan)
    setPeerValidationOpen(true)
  }

  const openGpaFeedback = (plan: any) => {
    // Dados mockados do feedback da GPA
    const feedbackData = {
      ...plan,
      peerFeedback:
        "O plano apresenta uma boa estrutura inicial, mas falta detalhamento na metodologia de implementação. Sugerimos maior clareza nos indicadores de acompanhamento.",
      gpaFeedback:
        "Após análise do feedback dos pares e revisão do plano, identificamos que: 1) A metodologia proposta não está alinhada com as diretrizes pedagógicas da rede; 2) Os indicadores de sucesso são vagos e não permitem acompanhamento efetivo; 3) O cronograma é irrealista considerando os recursos disponíveis. Recomendamos revisar esses pontos antes de reenviar.",
      rejectionDate: "15/01/2024",
      reviewer: "Coordenação Pedagógica GPA",
    }
    setSelectedGpaFeedback(feedbackData)
    setGpaFeedbackOpen(true)
  }

  const openRevision = (plan: any) => {
    setSelectedRevisionPlan(plan)
    setRevisionOpen(true)
  }

  // Dados mockados para planos de outras escolas
  const peerPlans = [
    {
      id: "peer-1",
      title: "Implementação de laboratório de ciências",
      description:
        "Criação de laboratório para aulas práticas de química e física, visando melhorar o engajamento dos alunos nas disciplinas de exatas.",
      school: "Escola Municipal Maria Santos",
      responsible: "Prof. Carlos Eduardo",
      okr: "Aumentar aprovação em ciências exatas",
      keyResults: [
        "Aumentar nota média de 6.2 para 7.5 em química",
        "Reduzir em 30% o número de alunos com dificuldades em física",
        "Implementar 15 experimentos práticos por semestre",
      ],
      startDate: "15/03/2024",
      endDate: "30/11/2024",
      cause:
        "Baixo desempenho dos alunos em disciplinas de exatas devido à falta de aulas práticas e laboratório adequado.",
      status: "Aguardando avaliação por pares",
      submittedDate: "10/01/2024",
    },
    {
      id: "peer-2",
      title: "Programa de mentoria estudantil",
      description:
        "Criação de programa onde alunos do ensino médio auxiliam estudantes do fundamental com dificuldades de aprendizagem.",
      school: "Escola Municipal Pedro Oliveira",
      responsible: "Coord. Ana Paula",
      okr: "Reduzir taxa de reprovação",
      keyResults: [
        "Reduzir reprovação de 15% para 8%",
        "Atender 100% dos alunos com dificuldades",
        "Formar 20 alunos mentores por semestre",
      ],
      startDate: "01/02/2024",
      endDate: "30/06/2024",
      cause: "Alta taxa de reprovação no ensino fundamental devido à falta de acompanhamento individualizado.",
      status: "Aguardando avaliação por pares",
      submittedDate: "05/01/2024",
    },
    {
      id: "peer-3",
      title: "Sistema de comunicação digital com pais",
      description:
        "Implementação de aplicativo para comunicação direta entre escola e pais, com acompanhamento de notas e frequência em tempo real.",
      school: "Escola Municipal José Silva",
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
      status: "Aguardando avaliação por pares",
      submittedDate: "08/01/2024",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos de Ação</h1>
          <p className="text-muted-foreground">Gerencie ações para atingir seus objetivos</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {userType === "escola" && (
            <Dialog open={openNewPlan} onOpenChange={setOpenNewPlan}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Plano de Ação
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Criar Plano de Ação</DialogTitle>
                  <DialogDescription>Defina uma ação específica para atingir um resultado-chave</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" placeholder="Ex: Implementar programa de reforço em Matemática" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" placeholder="Descreva a ação em detalhes" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cause">Causa Relacionada</Label>
                    <Textarea id="cause" placeholder="Descreva a causa que esta ação pretende resolver" />
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
                    <Label htmlFor="responsible">Responsável</Label>
                    <Select>
                      <SelectTrigger id="responsible">
                        <SelectValue placeholder="Selecione um responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maria">Maria Silva</SelectItem>
                        <SelectItem value="joao">João Santos</SelectItem>
                        <SelectItem value="ana">Ana Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="okr">OKR Relacionado</Label>
                    <Select>
                      <SelectTrigger id="okr">
                        <SelectValue placeholder="Selecione um OKR" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematica">Melhorar desempenho em Matemática</SelectItem>
                        <SelectItem value="evasao">Reduzir evasão escolar</SelectItem>
                        <SelectItem value="pais">Aumentar participação dos pais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenNewPlan(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar Plano de Ação</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar planos de ação..." className="pl-8" />
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
            <DropdownMenuItem>Pendentes</DropdownMenuItem>
            {userType === "gpa" && <DropdownMenuItem>Boas práticas</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Período atual</DropdownMenuItem>
            <DropdownMenuItem>Período anterior</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="my-plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-plans">Meus Planos</TabsTrigger>
          {userType === "escola" && (
            <TabsTrigger value="peer-validation" className="relative">
              Validação por Pares
              {peerPlans.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {peerPlans.length}
                </Badge>
              )}
            </TabsTrigger>
          )}
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="my-plans" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Plano de Ação</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>OKR Relacionado</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {userType === "gpa" && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                            <Star className="mr-1 h-3 w-3" />
                            Boa Prática
                          </Badge>
                        )}
                        <span>Programa de monitoria em Matemática</span>
                      </div>
                    </TableCell>
                    <TableCell>Maria Silva</TableCell>
                    <TableCell>Melhorar desempenho em Matemática</TableCell>
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          {userType === "gpa" && (
                            <>
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                Marcar como boa prática
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentPlan({
                                    id: "programa-monitoria",
                                    title: "Programa de monitoria em Matemática",
                                  })
                                  setValidationOpen(true)
                                }}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Validar plano
                              </DropdownMenuItem>
                            </>
                          )}
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
                    <TableCell className="font-medium">Programa de acompanhamento de frequência</TableCell>
                    <TableCell>João Santos</TableCell>
                    <TableCell>Reduzir evasão escolar</TableCell>
                    <TableCell>15/07/2024</TableCell>
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
                          <DropdownMenuItem>
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

                  <TableRow>
                    <TableCell className="font-medium">Reuniões bimestrais com pais</TableCell>
                    <TableCell>Ana Oliveira</TableCell>
                    <TableCell>Aumentar participação dos pais</TableCell>
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
                          <DropdownMenuItem>
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

                  <TableRow>
                    <TableCell className="font-medium">Reforço em Matemática para 7º ano</TableCell>
                    <TableCell>Carlos Mendes</TableCell>
                    <TableCell>Melhorar desempenho em Matemática</TableCell>
                    <TableCell>10/06/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-xs">Atrasado</span>
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

                  {/* Plano reprovado por pares e depois pela GPA */}
                  {userType === "escola" && (
                    <TableRow>
                      <TableCell className="font-medium">Capacitação em metodologias ativas</TableCell>
                      <TableCell>Ana Costa</TableCell>
                      <TableCell>Aumentar participação dos pais</TableCell>
                      <TableCell>25/07/2024</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <X className="mr-1 h-4 w-4 text-red-500" />
                          <span className="text-xs">Reprovado pela GPA</span>
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
                              onClick={() =>
                                openGpaFeedback({
                                  id: "capacitacao-metodologias",
                                  title: "Capacitação em metodologias ativas",
                                })
                              }
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Ver feedback da GPA
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                openRevision({
                                  id: "capacitacao-metodologias",
                                  title: "Capacitação em metodologias ativas",
                                  description:
                                    "Programa de formação continuada para professores focado em metodologias ativas de ensino, com workshops mensais e acompanhamento pedagógico.",
                                  cause:
                                    "Baixo engajamento dos alunos nas aulas tradicionais e necessidade de modernização das práticas pedagógicas.",
                                  responsible: "Ana Costa",
                                  okr: "Aumentar participação dos pais",
                                  startDate: "01/03/2024",
                                  endDate: "25/07/2024",
                                })
                              }
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
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
                    <TableCell className="font-medium">Sistema de acompanhamento pedagógico</TableCell>
                    <TableCell>Roberto Silva</TableCell>
                    <TableCell>Melhorar desempenho em Matemática</TableCell>
                    <TableCell>20/07/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-blue-500" />
                        <span className="text-xs">Avaliação por pares</span>
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
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          {userType === "escola" && (
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Avaliar plano
                            </DropdownMenuItem>
                          )}
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
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {userType === "escola" && (
          <TabsContent value="peer-validation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Planos para Validação por Pares
                </CardTitle>
                <CardDescription>
                  Avalie planos de ação de outras escolas da rede. Suas avaliações ajudam a melhorar a qualidade dos
                  planos.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Plano de Ação</TableHead>
                      <TableHead>Escola</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Enviado em</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {peerPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.title}</TableCell>
                        <TableCell>{plan.school}</TableCell>
                        <TableCell>{plan.responsible}</TableCell>
                        <TableCell>{plan.submittedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openPeerValidation(plan)}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Avaliar Plano
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline de Planos de Ação</CardTitle>
              <CardDescription>Visualização temporal dos planos de ação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="relative border-l border-slate-200 pl-8 pb-8">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-green-500" />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Reuniões bimestrais com pais</h3>
                    <span className="text-sm text-muted-foreground">15/05/2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Organizar reuniões bimestrais com os pais para apresentar o desempenho dos alunos e discutir
                    estratégias de melhoria.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Concluído
                    </Badge>
                    <Badge variant="outline">Ana Oliveira</Badge>
                  </div>
                </div>

                <div className="relative border-l border-slate-200 pl-8 pb-8">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-red-500" />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Reforço em Matemática para 7º ano</h3>
                    <span className="text-sm text-muted-foreground">10/06/2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implementar aulas de reforço em Matemática para alunos do 7º ano com dificuldades de aprendizagem.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Atrasado
                    </Badge>
                    <Badge variant="outline">Carlos Mendes</Badge>
                  </div>
                </div>

                <div className="relative border-l border-slate-200 pl-8 pb-8">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-amber-500" />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Programa de monitoria em Matemática</h3>
                    <span className="text-sm text-muted-foreground">30/06/2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implementar um programa de monitoria onde alunos com melhor desempenho auxiliam colegas com
                    dificuldades.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <Clock className="mr-1 h-3 w-3" />
                      Em andamento
                    </Badge>
                    <Badge variant="outline">Maria Silva</Badge>
                    {userType === "gpa" && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        <Star className="mr-1 h-3 w-3" />
                        Boa Prática
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="relative border-l border-slate-200 pl-8">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-amber-500" />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Programa de acompanhamento de frequência</h3>
                    <span className="text-sm text-muted-foreground">15/07/2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implementar um sistema de acompanhamento diário de frequência com contato imediato aos pais em caso
                    de ausência.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <Clock className="mr-1 h-3 w-3" />
                      Em andamento
                    </Badge>
                    <Badge variant="outline">João Santos</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de Validação GPA */}
      {userType === "gpa" && currentPlan && (
        <ValidationDialog
          open={validationOpen}
          onOpenChange={setValidationOpen}
          title={currentPlan.title}
          type="action-plan"
          onValidate={handleValidate}
        />
      )}

      {/* Dialog de Validação por Pares */}
      <Dialog open={peerValidationOpen} onOpenChange={setPeerValidationOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedPeerPlan && (
            <>
              <DialogHeader>
                <DialogTitle>Avaliar Plano de Ação</DialogTitle>
                <DialogDescription>Avalie este plano de ação de outra escola da rede</DialogDescription>
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

                {/* Formulário de Avaliação */}
                <div className="border-t pt-6 space-y-4">
                  <h4 className="font-medium">Sua Avaliação</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="peer-relevance">Relevância (1-5)</Label>
                      <Select>
                        <SelectTrigger id="peer-relevance">
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
                      <Label htmlFor="peer-impact">Impacto (1-5)</Label>
                      <Select>
                        <SelectTrigger id="peer-impact">
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
                    <Label>Decisão</Label>
                    <RadioGroup className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="approve" id="peer-approve" />
                        <Label htmlFor="peer-approve" className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Aprovar
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reject" id="peer-reject" />
                        <Label htmlFor="peer-reject" className="flex items-center">
                          <X className="mr-2 h-4 w-4 text-red-500" />
                          Reprovar
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="peer-feedback">Feedback e Justificativa</Label>
                    <Textarea
                      id="peer-feedback"
                      placeholder="Forneça um feedback construtivo sobre o plano de ação"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPeerValidationOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => handlePeerValidation(true, "Feedback exemplo", 4, 4)}>Enviar Avaliação</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Feedback da GPA */}
      <Dialog open={gpaFeedbackOpen} onOpenChange={setGpaFeedbackOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedGpaFeedback && (
            <>
              <DialogHeader>
                <DialogTitle>Feedback da GPA</DialogTitle>
                <DialogDescription>{selectedGpaFeedback.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Histórico do Processo */}
                <div className="space-y-4">
                  <h3 className="font-medium">Histórico de Avaliação</h3>

                  <div className="space-y-4">
                    {/* Feedback dos Pares */}
                    <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-orange-800 mb-2">Avaliação por Pares - Reprovado</h4>
                          <p className="text-sm text-orange-700 mb-2">{selectedGpaFeedback.peerFeedback}</p>
                          <p className="text-xs text-orange-600">Avaliado em: 12/01/2024</p>
                        </div>
                      </div>
                    </div>

                    {/* Feedback da GPA */}
                    <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                      <div className="flex items-start gap-3">
                        <X className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-red-800 mb-2">Avaliação GPA - Reprovado</h4>
                          <p className="text-sm text-red-700 mb-3">{selectedGpaFeedback.gpaFeedback}</p>
                          <div className="text-xs text-red-600">
                            <p>Avaliado por: {selectedGpaFeedback.reviewer}</p>
                            <p>Data: {selectedGpaFeedback.rejectionDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orientações para Revisão */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-3">Orientações para Revisão</h3>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Revise a metodologia proposta alinhando-a com as diretrizes pedagógicas da rede</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Defina indicadores de sucesso específicos, mensuráveis e com prazos claros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Ajuste o cronograma considerando os recursos humanos e materiais disponíveis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Inclua um plano de acompanhamento e avaliação contínua das ações</span>
                    </li>
                  </ul>
                </div>

                {/* Próximos Passos */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-medium text-slate-800 mb-3">Próximos Passos</h3>
                  <ol className="text-sm text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-600 text-xs font-medium mt-0.5">
                        1
                      </span>
                      <span>Revise o plano considerando todos os pontos mencionados no feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-600 text-xs font-medium mt-0.5">
                        2
                      </span>
                      <span>Consulte as diretrizes pedagógicas da rede disponíveis no portal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-600 text-xs font-medium mt-0.5">
                        3
                      </span>
                      <span>Reenvie o plano revisado através da opção "Revisar e reenviar"</span>
                    </li>
                  </ol>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setGpaFeedbackOpen(false)}>
                  Fechar
                </Button>
                <Button
                  onClick={() => {
                    setGpaFeedbackOpen(false)
                    openRevision(selectedGpaFeedback)
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Revisar Plano
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Revisão do Plano */}
      <Dialog open={revisionOpen} onOpenChange={setRevisionOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedRevisionPlan && (
            <>
              <DialogHeader>
                <DialogTitle>Revisar Plano de Ação</DialogTitle>
                <DialogDescription>
                  Revise o plano considerando o feedback recebido da GPA e dos pares
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Informações Atuais */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-medium text-slate-800 mb-3">Informações Atuais</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Título:</span> {selectedRevisionPlan.title}
                    </p>
                    <p>
                      <span className="font-medium">Responsável:</span> {selectedRevisionPlan.responsible}
                    </p>
                    <p>
                      <span className="font-medium">OKR:</span> {selectedRevisionPlan.okr}
                    </p>
                  </div>
                </div>

                {/* Formulário de Revisão */}
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="revised-title">Título do Plano</Label>
                    <Input
                      id="revised-title"
                      defaultValue={selectedRevisionPlan.title}
                      placeholder="Título revisado do plano de ação"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="revised-description">Descrição Revisada</Label>
                    <Textarea
                      id="revised-description"
                      defaultValue={selectedRevisionPlan.description}
                      placeholder="Descreva as melhorias e ajustes realizados"
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="revised-methodology">Metodologia (Novo)</Label>
                    <Textarea
                      id="revised-methodology"
                      placeholder="Detalhe a metodologia alinhada com as diretrizes pedagógicas da rede"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="revised-indicators">Indicadores de Sucesso (Revisados)</Label>
                    <Textarea
                      id="revised-indicators"
                      placeholder="Defina indicadores específicos, mensuráveis e com prazos claros"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="revised-start-date">Nova Data de Início</Label>
                      <Input id="revised-start-date" type="date" defaultValue="2024-02-01" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="revised-end-date">Nova Data de Término</Label>
                      <Input id="revised-end-date" type="date" defaultValue="2024-08-30" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="revised-resources">Recursos Necessários</Label>
                    <Textarea
                      id="revised-resources"
                      placeholder="Liste os recursos humanos, materiais e financeiros necessários"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="monitoring-plan">Plano de Acompanhamento</Label>
                    <Textarea
                      id="monitoring-plan"
                      placeholder="Descreva como será feito o acompanhamento e avaliação contínua das ações"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="revision-notes">Notas sobre as Revisões</Label>
                    <Textarea
                      id="revision-notes"
                      placeholder="Explique as principais mudanças realizadas em resposta ao feedback recebido"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Checklist de Verificação */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-800 mb-3">Checklist de Verificação</h3>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-green-700">Metodologia alinhada com diretrizes pedagógicas da rede</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-green-700">Indicadores específicos e mensuráveis definidos</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-green-700">Cronograma realista considerando recursos disponíveis</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-green-700">Plano de acompanhamento e avaliação incluído</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-green-700">Todos os pontos do feedback da GPA foram abordados</span>
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRevisionOpen(false)}>
                  Cancelar
                </Button>
                <Button>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reenviar Plano Revisado
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
