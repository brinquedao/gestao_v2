
"use client"

import { useState, useEffect } from "react"
import {
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface Employee {
  id: string
  name: string
  position: string
  email: string
}

interface Committee {
  id: string
  name: string
  description: string
  members: Employee[]
  createdAt: string
}

export default function CommitteesContent() {
  const [userType, setUserType] = useState<string | null>(null)
  const [openNewCommittee, setOpenNewCommittee] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  useEffect(() => {
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  // Dados mockados de funcionários da escola
  const employees: Employee[] = [
    { id: "1", name: "Maria Silva", position: "Diretora", email: "maria.silva@escola.edu.br" },
    { id: "2", name: "João Santos", position: "Coordenador Pedagógico", email: "joao.santos@escola.edu.br" },
    { id: "3", name: "Ana Oliveira", position: "Professora de Matemática", email: "ana.oliveira@escola.edu.br" },
    { id: "4", name: "Carlos Mendes", position: "Professor de Português", email: "carlos.mendes@escola.edu.br" },
    { id: "5", name: "Roberto Lima", position: "Professor de História", email: "roberto.lima@escola.edu.br" },
    { id: "6", name: "Fernanda Costa", position: "Professora de Ciências", email: "fernanda.costa@escola.edu.br" },
    { id: "7", name: "Paulo Rodrigues", position: "Professor de Geografia", email: "paulo.rodrigues@escola.edu.br" },
    { id: "8", name: "Luciana Alves", position: "Orientadora Educacional", email: "luciana.alves@escola.edu.br" },
  ]

  // Dados mockados de comitês
  const committees: Committee[] = [
    {
      id: "1",
      name: "Comitê de Qualidade Educacional",
      description: "Responsável por definir e acompanhar estratégias para melhoria da qualidade do ensino",
      members: [employees[0], employees[1], employees[2], employees[3]],
      createdAt: "15/01/2024",
    },
    {
      id: "2",
      name: "Comitê de Gestão de Projetos",
      description: "Planejamento e execução de projetos pedagógicos e administrativos",
      members: [employees[1], employees[4], employees[5]],
      createdAt: "22/01/2024",
    },
    {
      id: "3",
      name: "Comitê de Avaliação e Resultados",
      description: "Análise de indicadores educacionais e definição de metas",
      members: [employees[0], employees[2], employees[7]],
      createdAt: "05/02/2024",
    },
  ]

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  const handleOpenDetails = (committee: Committee) => {
    setSelectedCommittee(committee)
    setOpenDetails(true)
  }

  const handleCreateCommittee = () => {
    // Aqui implementaria a lógica para criar o comitê
    console.log("Criar comitê com membros:", selectedMembers)
    setOpenNewCommittee(false)
    setSelectedMembers([])
  }

  if (userType !== "escola") {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Acesso restrito às escolas</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comitês e Grupos</h1>
          <p className="text-muted-foreground">Gerencie os comitês da sua unidade escolar</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Dialog open={openNewCommittee} onOpenChange={setOpenNewCommittee}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Comitê
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Novo Comitê</DialogTitle>
                <DialogDescription>Defina um comitê e selecione os membros da equipe</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="committee-name">Nome do Comitê</Label>
                  <Input id="committee-name" placeholder="Ex: Comitê de Qualidade Educacional" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="committee-description">Descrição</Label>
                  <Textarea 
                    id="committee-description" 
                    placeholder="Descreva o propósito e responsabilidades do comitê"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Membros do Comitê</Label>
                  <div className="border rounded-md p-3 max-h-80 overflow-y-auto">
                    <div className="space-y-3">
                      {employees.map((employee) => (
                        <div key={employee.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={`employee-${employee.id}`}
                            checked={selectedMembers.includes(employee.id)}
                            onCheckedChange={() => handleMemberToggle(employee.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor={`employee-${employee.id}`}
                                className="text-sm font-medium cursor-pointer"
                              >
                                {employee.name}
                              </label>
                              <Badge variant="outline" className="text-xs">
                                {employee.position}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedMembers.length} de {employees.length} funcionários selecionados
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setOpenNewCommittee(false)
                  setSelectedMembers([])
                }}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCommittee}>Criar Comitê</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar comitês..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Comitê</TableHead>
                <TableHead>Membros</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {committees.map((committee) => (
                <TableRow key={committee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{committee.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {committee.description.length > 60 
                          ? `${committee.description.substring(0, 60)}...`
                          : committee.description
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{committee.members.length} membros</span>
                    </div>
                  </TableCell>
                  <TableCell>{committee.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenDetails(committee)}>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Detalhes do Comitê */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedCommittee && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCommittee.name}</DialogTitle>
                <DialogDescription>Detalhes do comitê e membros</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Descrição</h3>
                  <p className="text-sm text-muted-foreground">{selectedCommittee.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Membros do Comitê ({selectedCommittee.members.length})</h3>
                  <div className="space-y-3">
                    {selectedCommittee.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                        <Badge variant="outline">{member.position}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Criado em:</span> {selectedCommittee.createdAt}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDetails(false)}>
                  Fechar
                </Button>
                <Button>Editar Comitê</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
