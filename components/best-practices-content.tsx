"use client"

import { useState, useEffect } from "react"
import {
  CheckCircle,
  ChevronDown,
  Download,
  Filter,
  Lightbulb,
  MoreHorizontal,
  School,
  Search,
  Share2,
  Star,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BestPracticesContent() {
  const [userType, setUserType] = useState<string | null>(null)
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedPractice, setSelectedPractice] = useState<{
    title: string
    school: string
    description: string
    results: string
    category: string
  } | null>(null)

  useEffect(() => {
    // Get user type from sessionStorage
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  const handleOpenDetails = (practice: {
    title: string
    school: string
    description: string
    results: string
    category: string
  }) => {
    setSelectedPractice(practice)
    setOpenDetails(true)
  }

  const bestPractices = [
    {
      title: "Mentoria de Alunos",
      school: "SENAI Tatuapé",
      description:
        "Programa de acompanhamento individualizado onde alunos com melhor desempenho auxiliam colegas com dificuldades, sob supervisão de professores.",
      results: "Aumento de 18% no desempenho médio dos alunos participantes e redução de 25% na taxa de reprovação.",
      category: "Desempenho",
    },
    {
      title: "Análise de Evasão",
      school: "SENAI Brás",
      description:
        "Sistema preventivo de alerta que identifica alunos em risco de evasão com base em indicadores como frequência, notas e participação.",
      results: "Redução de 40% na taxa de evasão escolar em comparação com o ano anterior.",
      category: "Evasão",
    },
    {
      title: "Capacitação de Professores em Metodologias Ativas",
      school: "Escola Municipal Pedro Álvares",
      description:
        "Programa de formação continuada para professores focado em metodologias ativas de ensino, com workshops mensais e acompanhamento pedagógico.",
      results: "Implementação de metodologias ativas em 85% das aulas e aumento de 22% no engajamento dos alunos.",
      category: "Metodologia",
    },
    {
      title: "Revisão e Atualização do Material de Mecânica",
      school: "SENAI Ipiranga",
      description:
        "Reformulação completa do material didático de mecânica, com abordagem mais prática e alinhada às demandas do mercado de trabalho.",
      results:
        "Melhoria de 30% no desempenho dos alunos em avaliações práticas e aumento de 25% na taxa de empregabilidade dos formandos.",
      category: "Material Didático",
    },
    {
      title: "Programa de Reforço para Alunos com Dificuldades",
      school: "Escola Municipal Maria Oliveira",
      description:
        "Estruturação de programa de reforço escolar com atendimento personalizado para estudantes com baixo desempenho, oferecido no contraturno.",
      results: "Recuperação de 78% dos alunos participantes e redução de 35% nas reprovações.",
      category: "Desempenho",
    },
    {
      title: "Implementação de Material Didático Adaptativo",
      school: "SENAI Santo Amaro",
      description:
        "Seleção e implementação de recursos didáticos adaptados para diferentes estilos de aprendizagem, com uso de tecnologias educacionais.",
      results: "Aumento de 20% no desempenho médio e melhoria de 40% na satisfação dos alunos com o material didático.",
      category: "Material Didático",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Boas Práticas</h1>
          <p className="text-muted-foreground">
            {userType === "gpa"
              ? "Gerencie e compartilhe práticas bem-sucedidas entre as unidades"
              : "Conheça e implemente práticas bem-sucedidas de outras unidades"}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {userType === "escola" && (
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Lista
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar boas práticas..." className="pl-8" />
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
            <DropdownMenuItem>Todas as categorias</DropdownMenuItem>
            <DropdownMenuItem>Desempenho</DropdownMenuItem>
            <DropdownMenuItem>Evasão</DropdownMenuItem>
            <DropdownMenuItem>Metodologia</DropdownMenuItem>
            <DropdownMenuItem>Material Didático</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Todas as unidades</DropdownMenuItem>
            <DropdownMenuItem>SENAI</DropdownMenuItem>
            <DropdownMenuItem>Escolas Municipais</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grade</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700">
                        {practice.category}
                      </Badge>
                      <CardTitle className="text-lg">{practice.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <School className="h-3.5 w-3.5 mr-1" />
                        {practice.school}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenDetails(practice)}>Ver detalhes</DropdownMenuItem>
                        {userType === "escola" && (
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Compartilhar
                          </DropdownMenuItem>
                        )}
                        {userType === "gpa" && (
                          <>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              Destacar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Remover</DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{practice.description}</p>
                </CardContent>
                <div className="px-6 py-3 bg-slate-50 border-t flex justify-between items-center">
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Resultados comprovados</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleOpenDetails(practice)}
                  >
                    Ver mais
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700">
                  Desempenho
                </Badge>
                Práticas para melhorar o desempenho acadêmico
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {bestPractices
                  .filter((p) => p.category === "Desempenho")
                  .map((practice, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <School className="h-3.5 w-3.5 mr-1" />
                          {practice.school}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{practice.description}</p>
                      </CardContent>
                      <div className="px-6 py-2 bg-slate-50 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 p-0"
                          onClick={() => handleOpenDetails(practice)}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700">
                  Evasão
                </Badge>
                Práticas para reduzir a evasão escolar
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {bestPractices
                  .filter((p) => p.category === "Evasão")
                  .map((practice, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <School className="h-3.5 w-3.5 mr-1" />
                          {practice.school}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{practice.description}</p>
                      </CardContent>
                      <div className="px-6 py-2 bg-slate-50 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 p-0"
                          onClick={() => handleOpenDetails(practice)}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700">
                  Metodologia
                </Badge>
                Práticas de metodologias de ensino
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {bestPractices
                  .filter((p) => p.category === "Metodologia")
                  .map((practice, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <School className="h-3.5 w-3.5 mr-1" />
                          {practice.school}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{practice.description}</p>
                      </CardContent>
                      <div className="px-6 py-2 bg-slate-50 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 p-0"
                          onClick={() => handleOpenDetails(practice)}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700">
                  Material Didático
                </Badge>
                Práticas de desenvolvimento de material didático
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {bestPractices
                  .filter((p) => p.category === "Material Didático")
                  .map((practice, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <School className="h-3.5 w-3.5 mr-1" />
                          {practice.school}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{practice.description}</p>
                      </CardContent>
                      <div className="px-6 py-2 bg-slate-50 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 p-0"
                          onClick={() => handleOpenDetails(practice)}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedPractice && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {selectedPractice.category}
                  </Badge>
                </div>
                <DialogTitle>{selectedPractice.title}</DialogTitle>
                <DialogDescription className="flex items-center">
                  <School className="h-4 w-4 mr-1" />
                  {selectedPractice.school}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Descrição</h3>
                  <p className="text-sm text-muted-foreground">{selectedPractice.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Resultados Obtidos</h3>
                  <div className="bg-green-50 p-3 rounded-md border border-green-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <p className="text-sm text-green-800">{selectedPractice.results}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Como Implementar</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                        1
                      </div>
                      <p className="text-sm">
                        Analise o contexto da sua unidade e identifique as adaptações necessárias.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                        2
                      </div>
                      <p className="text-sm">Planeje a implementação, definindo recursos, responsáveis e cronograma.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                        3
                      </div>
                      <p className="text-sm">Capacite a equipe envolvida e comunique claramente os objetivos.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                        4
                      </div>
                      <p className="text-sm">Implemente a prática e monitore os resultados regularmente.</p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {userType === "escola" ? (
                  <>
                    <Button variant="outline" onClick={() => setOpenDetails(false)}>
                      Fechar
                    </Button>
                    <Button>
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Adaptar para minha unidade
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setOpenDetails(false)}>
                      Fechar
                    </Button>
                    <Button>
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartilhar
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
