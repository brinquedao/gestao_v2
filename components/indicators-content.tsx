"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Download, Filter, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function IndicatorsContent() {
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    // Get user type from sessionStorage
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Indicadores</h1>
          <p className="text-muted-foreground">Análise detalhada dos indicadores educacionais</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>Período: 2024</DropdownMenuItem>
              <DropdownMenuItem>Disciplina: Todas</DropdownMenuItem>
              <DropdownMenuItem>Turma: Todas</DropdownMenuItem>
              {userType === "gpa" && <DropdownMenuItem>Unidade: Todas</DropdownMenuItem>}
              <DropdownMenuSeparator />
              <DropdownMenuItem>Comparar com período anterior</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="desempenho" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
          <TabsTrigger value="frequencia">Frequência</TabsTrigger>
          <TabsTrigger value="evasao">Evasão</TabsTrigger>
          <TabsTrigger value="aprovacao">Aprovação</TabsTrigger>
          <TabsTrigger value="participacao">Participação</TabsTrigger>
          <TabsTrigger value="comparativo">Comparativo</TabsTrigger>
        </TabsList>

        <TabsContent value="desempenho" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Disciplina</CardTitle>
              <CardDescription>Análise do desempenho médio dos alunos por disciplina</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <Info className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Desempenho por Disciplina</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Turma</CardTitle>
                <CardDescription>Comparativo entre turmas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Info className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Desempenho por Turma</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução do Desempenho</CardTitle>
                <CardDescription>Tendência ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Info className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Evolução do Desempenho</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="frequencia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequência por Turma</CardTitle>
              <CardDescription>Análise da frequência média dos alunos por turma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <Info className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Frequência por Turma</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequência por Disciplina</CardTitle>
                <CardDescription>Comparativo entre disciplinas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Info className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Frequência por Disciplina</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução da Frequência</CardTitle>
                <CardDescription>Tendência ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Info className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Evolução da Frequência</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="evasao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Evasão</CardTitle>
              <CardDescription>Análise da evasão escolar por período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <Info className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Taxa de Evasão</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evasão por Turma</CardTitle>
                <CardDescription>Comparativo entre turmas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Info className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Evasão por Turma</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Causas de Evasão</CardTitle>
                <CardDescription>Principais motivos reportados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Info className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Causas de Evasão</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="aprovacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Aprovação</CardTitle>
              <CardDescription>Análise da aprovação por período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <Info className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Taxa de Aprovação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Participação dos Pais</CardTitle>
              <CardDescription>Análise da participação dos pais em reuniões e eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <Info className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Participação dos Pais</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparativo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo com Ciclos Anteriores</CardTitle>
              <CardDescription>Análise comparativa entre ciclos de avaliação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <Info className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Comparativo com Ciclos Anteriores</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolução dos Indicadores</CardTitle>
                <CardDescription>Tendência ao longo dos ciclos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Info className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Evolução dos Indicadores</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impacto das Ações</CardTitle>
                <CardDescription>Relação entre planos de ação e resultados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Info className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">Gráfico Power BI: Impacto das Ações</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
