"use client"

import { useState, useEffect } from "react"
import { BarChart3, Download, School, TrendingDown, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function MaturityDashboard() {
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  const schoolsMaturity = [
    {
      name: "Escola Municipal João da Silva",
      maturityScore: 8.5,
      trend: "up",
      avgRelevance: 4.2,
      avgImpact: 4.0,
      totalPlans: 15,
      approvedPlans: 12,
      rejectedPlans: 3,
      peerApproved: 8,
      gpaApproved: 4,
    },
    {
      name: "Escola Municipal Maria Oliveira",
      maturityScore: 7.8,
      trend: "up",
      avgRelevance: 3.8,
      avgImpact: 4.1,
      totalPlans: 12,
      approvedPlans: 9,
      rejectedPlans: 3,
      peerApproved: 6,
      gpaApproved: 3,
    },
    {
      name: "Escola Municipal Pedro Álvares",
      maturityScore: 6.2,
      trend: "down",
      avgRelevance: 3.2,
      avgImpact: 3.5,
      totalPlans: 8,
      approvedPlans: 4,
      rejectedPlans: 4,
      peerApproved: 2,
      gpaApproved: 2,
    },
  ]

  const getMaturityLevel = (score: number) => {
    if (score >= 8) return { label: "Alta", color: "bg-green-100 text-green-800" }
    if (score >= 6) return { label: "Média", color: "bg-yellow-100 text-yellow-800" }
    return { label: "Baixa", color: "bg-red-100 text-red-800" }
  }

  if (userType !== "gpa") {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Acesso restrito à GPA</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Maturidade</h1>
          <p className="text-muted-foreground">Acompanhe a maturidade das escolas na criação de planos de ação</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por região" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as regiões</SelectItem>
              <SelectItem value="norte">Região Norte</SelectItem>
              <SelectItem value="sul">Região Sul</SelectItem>
              <SelectItem value="centro">Região Centro</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Maturidade Média</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.5</div>
            <p className="text-xs text-muted-foreground">+0.3 vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Escolas Alta Maturidade</CardTitle>
            <School className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">31% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aprovação por Pares</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Redução Carga GPA</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <p className="text-xs text-muted-foreground">Menos validações diretas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="matrix">Matriz de Avaliação</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ranking de Maturidade das Escolas</CardTitle>
              <CardDescription>Baseado na qualidade dos planos de ação e avaliações recebidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schoolsMaturity.map((school, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{school.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getMaturityLevel(school.maturityScore).color}>
                            {getMaturityLevel(school.maturityScore).label} Maturidade
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {school.approvedPlans}/{school.totalPlans} planos aprovados
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">{school.maturityScore}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">R: {school.avgRelevance}</div>
                        <div className="text-sm font-medium">I: {school.avgImpact}</div>
                        <div className="text-xs text-muted-foreground">Médias</div>
                      </div>
                      <div className="flex items-center">
                        {school.trend === "up" ? (
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição na Matriz Relevância x Impacto</CardTitle>
              <CardDescription>Análise dos planos de ação por quadrante da matriz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-800">Alto Valor</CardTitle>
                    <CardDescription>Alta Relevância + Alto Impacto</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-700">156</div>
                    <p className="text-sm text-green-600">42% dos planos</p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-yellow-800">Médio Valor</CardTitle>
                    <CardDescription>Relevância/Impacto Médios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-700">128</div>
                    <p className="text-sm text-yellow-600">34% dos planos</p>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-orange-800">Baixo Valor</CardTitle>
                    <CardDescription>Baixa Relevância/Impacto</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-700">89</div>
                    <p className="text-sm text-orange-600">24% dos planos</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-slate-800">Meta</CardTitle>
                    <CardDescription>Objetivo para próximo ciclo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-700">60%</div>
                    <p className="text-sm text-slate-600">Alto valor</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução da Maturidade</CardTitle>
              <CardDescription>Tendências de melhoria ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Escolas em Ascensão</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Escola Municipal João da Silva</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">6.8 → 8.5</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Escola Municipal Maria Oliveira</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">7.1 → 7.8</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Escolas que Precisam de Atenção</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Escola Municipal Pedro Álvares</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">6.8 → 6.2</span>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Eficiência do Sistema de Pares</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">68%</div>
                      <div className="text-sm text-muted-foreground">Taxa de aprovação por pares</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">45%</div>
                      <div className="text-sm text-muted-foreground">Redução carga GPA</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">2.3</div>
                      <div className="text-sm text-muted-foreground">Dias médios avaliação</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
