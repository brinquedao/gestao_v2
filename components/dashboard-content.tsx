"use client"

import { useEffect, useState } from "react"
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Download,
  FileCheck,
  Info,
  MoreHorizontal,
  Plus,
  School,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Bell,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColoredProgress } from "@/components/ui/colored-progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function DashboardContent() {
  const [userType, setUserType] = useState<string | null>(null)
  const [selectedUnit, setSelectedUnit] = useState("todas")
  const [selectedShift, setSelectedShift] = useState("todos")
  const [selectedCourse, setSelectedCourse] = useState("todos")

  useEffect(() => {
    // Get user type from sessionStorage
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  // Dados mockados para planos pendentes de validação por pares
  const pendingPeerValidations = 3

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {userType === "gpa" ? "Dashboard da rede" : "Dashboard da unidade"}
        </h1>
        <div className="flex gap-2">
          {userType === "gpa" ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/okrs">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Validar OKRs
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/action-plans">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Validar Planos
                </Link>
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar Relatório
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/okrs">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo OKR
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/action-plans">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Plano
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Notificação de Validação por Pares - apenas para escolas */}
      {userType === "escola" && pendingPeerValidations > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900">
                  Você tem {pendingPeerValidations} planos de ação aguardando sua avaliação
                </h3>
                <p className="text-sm text-blue-700">Ajude outras escolas da rede avaliando seus planos de ação</p>
              </div>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/action-plans?tab=peer-validation">
                  <Users className="mr-2 h-4 w-4" />
                  Avaliar Planos
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros Globais - apenas para GPA */}
      {userType === "gpa" && (
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">Filtros globais:</span>
              <div className="flex flex-wrap gap-3">
                <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as unidades</SelectItem>
                    <SelectItem value="escola1">Escola Municipal João da Silva</SelectItem>
                    <SelectItem value="escola2">Escola Municipal Maria Oliveira</SelectItem>
                    <SelectItem value="escola3">Escola Municipal Pedro Álvares</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedShift} onValueChange={setSelectedShift}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Selecione o turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os turnos</SelectItem>
                    <SelectItem value="manha">Manhã</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noite">Noite</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os cursos</SelectItem>
                    <SelectItem value="mecanica">Técnico em Mecânica</SelectItem>
                    <SelectItem value="eletrica">Técnico em Elétrica</SelectItem>
                    <SelectItem value="informatica">Técnico em Informática</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Indicadores Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">OKRs Cadastrados</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {userType === "gpa" ? (
              selectedUnit === "todas" ? (
                <>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">OKRs na rede</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">42 OKRs na rede</p>
                </>
              )
            ) : (
              <>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">5 ativos, 3 concluídos</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Planos em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            {userType === "gpa" ? (
              selectedUnit === "todas" ? (
                <>
                  <div className="text-2xl font-bold">68</div>
                  <p className="text-xs text-muted-foreground">planos na rede</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">68 planos na rede</p>
                </>
              )
            ) : (
              <>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">2 adicionados recentemente</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Planos Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {userType === "gpa" ? (
              selectedUnit === "todas" ? (
                <>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">planos na rede</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">127 planos na rede</p>
                </>
              )
            ) : (
              <>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">3 concluídos este mês</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {userType === "escola" ? "Validações Pendentes" : "Planos em Atraso"}
            </CardTitle>
            {userType === "escola" ? (
              <Users className="h-4 w-4 text-blue-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            {userType === "gpa" ? (
              selectedUnit === "todas" ? (
                <>
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-xs text-muted-foreground">planos na rede</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">14 planos na rede</p>
                </>
              )
            ) : (
              <>
                <div className="text-2xl font-bold">{pendingPeerValidations}</div>
                <p className="text-xs text-muted-foreground">Planos para avaliar</p>
              </>
            )}
          </CardContent>
        </Card>
        {userType === "gpa" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">OKRs Distribuídos</CardTitle>
              <Target className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              {selectedUnit === "todas" ? (
                <>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">OKRs criados em massa</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">156 OKRs distribuídos na rede</p>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Left Column - 4/7 */}
        <div className="space-y-6 md:col-span-4">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>Análise de Indicadores</CardTitle>
              <CardDescription>Visualização dos principais indicadores educacionais</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="desempenho">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
                  <TabsTrigger value="frequencia">Frequência</TabsTrigger>
                  <TabsTrigger value="evasao">Evasão</TabsTrigger>
                  <TabsTrigger value="satisfacao">Satisfação</TabsTrigger>
                </TabsList>
                <TabsContent value="desempenho" className="space-y-4">
                  <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <Info className="mx-auto h-10 w-10 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Desempenho por Disciplina</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium">Comparativo</p>
                      <p className="text-xs text-muted-foreground">
                        {userType === "gpa" ? "Média da rede: 7.2" : "Sua unidade vs. Rede"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium">Unidade</p>
                        <p className="text-lg font-bold text-blue-600">7.8</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Rede</p>
                        <p className="text-lg font-bold text-gray-600">7.2</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">+8.3%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="frequencia" className="space-y-4">
                  <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <Info className="mx-auto h-10 w-10 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Frequência por Turma</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium">Comparativo</p>
                      <p className="text-xs text-muted-foreground">
                        {userType === "gpa" ? "Média da rede: 88%" : "Sua unidade vs. Rede"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium">Unidade</p>
                        <p className="text-lg font-bold text-blue-600">92%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Rede</p>
                        <p className="text-lg font-bold text-gray-600">88%</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">+4.5%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="evasao" className="space-y-4">
                  <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <Info className="mx-auto h-10 w-10 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Evasão por Período</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium">Comparativo</p>
                      <p className="text-xs text-muted-foreground">
                        {userType === "gpa" ? "Média da rede: 4.8%" : "Sua unidade vs. Rede"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium">Unidade</p>
                        <p className="text-lg font-bold text-blue-600">3.2%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Rede</p>
                        <p className="text-lg font-bold text-gray-600">4.8%</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">-33.3%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="satisfacao" className="space-y-4">
                  <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <Info className="mx-auto h-10 w-10 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Satisfação dos Alunos</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium">Comparativo</p>
                      <p className="text-xs text-muted-foreground">
                        {userType === "gpa" ? "Média da rede: 7.8" : "Sua unidade vs. Rede"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium">Unidade</p>
                        <p className="text-lg font-bold text-blue-600">8.5</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Rede</p>
                        <p className="text-lg font-bold text-gray-600">7.8</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">+9.0%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OKRs em Andamento</CardTitle>
              <CardDescription>Objetivos e resultados-chave ativos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Aumentar índice de aprovação em matemática</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between mb-1">
                      <span>Progresso: 65%</span>
                      <span className="text-amber-500 flex items-center">
                        <Clock className="mr-1 h-3 w-3" /> Em andamento
                      </span>
                    </div>
                    <ColoredProgress value={65} showValue={false} />
                  </div>
                  <div className="mt-4 text-sm">
                    <p className="font-medium text-slate-700 mb-2">Resultados-chave:</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600">Aumentar média de notas de 6,5 para 7,5</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">7,2</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600">Reduzir em 15% o número de recuperações</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">8%</span>
                          <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600">Implementar 2 novas ferramentas de ensino</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">2/2</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Reduzir evasão escolar no ensino médio</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between mb-1">
                      <span>Progresso: 40%</span>
                      <span className="text-amber-500 flex items-center">
                        <Clock className="mr-1 h-3 w-3" /> Em andamento
                      </span>
                    </div>
                    <ColoredProgress value={40} showValue={false} />
                  </div>
                  <div className="mt-4 text-sm">
                    <p className="font-medium text-slate-700 mb-2">Resultados-chave:</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600">Reduzir taxa de evasão de 8% para 5%</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">6,5%</span>
                          <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600">Programa de acompanhamento para 100% dos alunos em risco</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">60%</span>
                          <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600">Realizar 3 reuniões com famílias de alunos em risco</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">1/3</span>
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/okrs">Ver todos os OKRs</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - 3/7 */}
        <div className="space-y-6 md:col-span-3">
          <Card className="border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle>Pendências</CardTitle>
              <CardDescription>
                {userType === "gpa"
                  ? "OKRs e planos que precisam de aprovação"
                  : "Planos de ação que precisam de atenção"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userType === "gpa" ? (
                  <>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <div>
                        <h4 className="font-medium">OKR: Implementar metodologias ativas</h4>
                        <p className="text-sm text-muted-foreground">Escola Municipal João da Silva</p>
                        <p className="text-xs text-amber-600 mt-1">Aguardando há 3 dias</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <div>
                        <h4 className="font-medium">OKR: Expandir programa de reforço escolar</h4>
                        <p className="text-sm text-muted-foreground">Escola Municipal Maria Oliveira</p>
                        <p className="text-xs text-amber-600 mt-1">Aguardando há 2 dias</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Plano: Capacitação de professores</h4>
                        <p className="text-sm text-muted-foreground">Escola Municipal Pedro Álvares</p>
                        <p className="text-xs text-amber-600 mt-1">Aguardando há 1 dia</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <h4 className="font-medium">Plano de reforço em Matemática</h4>
                        <p className="text-sm text-muted-foreground">Atrasado há 3 dias</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                      <div>
                        <h4 className="font-medium">Programa de monitoria</h4>
                        <p className="text-sm text-muted-foreground">Vence em 2 dias</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <div>
                        <h4 className="font-medium">OKR "Melhorar leitura" reprovado</h4>
                        <p className="text-sm text-muted-foreground">Feedback da GPA disponível</p>
                      </div>
                    </div>

                    {pendingPeerValidations > 0 && (
                      <div className="flex items-start gap-3 rounded-lg border p-3 bg-blue-50 border-blue-200">
                        <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-blue-900">
                            {pendingPeerValidations} planos aguardando validação
                          </h4>
                          <p className="text-sm text-blue-700">Avalie planos de outras escolas</p>
                          <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href="/action-plans?tab=peer-validation">Avaliar agora</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-transparent">
                Ver todas as pendências
              </Button>
            </CardFooter>
          </Card>

          {userType === "gpa" && (
            <Card className="border-t-4 border-t-purple-500">
              <CardHeader className="pb-3">
                <CardTitle>OKRs Distribuídos Recentemente</CardTitle>
                <CardDescription>OKRs criados em massa para múltiplas escolas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 rounded-lg border p-3">
                    <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                    <div>
                      <h4 className="font-medium">Melhorar desempenho em Matemática</h4>
                      <p className="text-sm text-muted-foreground">Distribuído para 15 escolas em 10/01/2024</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          12 aceitos
                        </Badge>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">
                          3 pendentes
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-lg border p-3">
                    <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                    <div>
                      <h4 className="font-medium">Reduzir evasão escolar</h4>
                      <p className="text-sm text-muted-foreground">Distribuído para 8 escolas em 05/01/2024</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          8 aceitos
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/okrs">Ver todos os OKRs distribuídos</Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {userType === "escola" ? (
            <Card className="border-t-4 border-t-green-500">
              <CardHeader className="pb-3">
                <CardTitle>Boas Práticas Recomendadas</CardTitle>
                <CardDescription>Planos de ação bem-sucedidos de outras unidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 rounded-lg border p-3">
                    <School className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                    <div>
                      <h4 className="font-medium">Mentoria de Alunos</h4>
                      <p className="text-sm text-muted-foreground">
                        Programa de acompanhamento individualizado – SENAI Tatuapé
                      </p>
                      <Button variant="link" size="sm" className="px-0 h-auto mt-1">
                        Ver detalhes
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-lg border p-3">
                    <School className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                    <div>
                      <h4 className="font-medium">Análise de Evasão</h4>
                      <p className="text-sm text-muted-foreground">Sistema preventivo de alerta - SENAI Brás</p>
                      <Button variant="link" size="sm" className="px-0 h-auto mt-1">
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/best-practices">Ver todas as boas práticas</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-t-4 border-t-green-500">
              <CardHeader className="pb-3">
                <CardTitle>Visão Geral da Rede</CardTitle>
                <CardDescription>Estatísticas consolidadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Escolas Ativas</h4>
                      </div>
                    </div>
                    <div className="text-xl font-bold">42/45</div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">OKRs Concluídos</h4>
                      </div>
                    </div>
                    <div className="text-xl font-bold">68%</div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Melhoria Média</h4>
                      </div>
                    </div>
                    <div className="text-xl font-bold">+8.3%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent">
                  Ver relatório completo
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
