"use client"

import { useState } from "react"
import { Plus, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SettingsContent() {
  const [openNewSchool, setOpenNewSchool] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="schools">Unidades Escolares</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configurações básicas do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="system-name">Nome do Sistema</Label>
                <Input id="system-name" defaultValue="Plataforma de Gestão Educacional" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="organization">Organização</Label>
                <Input id="organization" defaultValue="Secretaria Municipal de Educação" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="current-period">Período Atual</Label>
                <Select defaultValue="2024-1">
                  <SelectTrigger id="current-period">
                    <SelectValue placeholder="Selecione um período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2">2023 - 2º Semestre</SelectItem>
                    <SelectItem value="2024-1">2024 - 1º Semestre</SelectItem>
                    <SelectItem value="2024-2">2024 - 2º Semestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="system-logo">Logo do Sistema</Label>
                <div className="flex items-center gap-2">
                  <Input id="system-logo" type="file" />
                  <Button variant="outline">Upload</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de OKRs</CardTitle>
              <CardDescription>Parâmetros para objetivos e resultados-chave</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="okr-approval">Aprovação de OKRs</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="okr-approval" defaultChecked />
                  <Label htmlFor="okr-approval">Exigir aprovação da GPA para novos OKRs</Label>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="okr-reminder">Lembretes de Atualização</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="okr-reminder" defaultChecked />
                  <Label htmlFor="okr-reminder">Enviar lembretes para atualização de OKRs</Label>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reminder-frequency">Frequência de Lembretes</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger id="reminder-frequency">
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diária</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="biweekly">Quinzenal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="schools" className="space-y-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">Unidades Escolares</h2>
              <p className="text-sm text-muted-foreground">Gerencie as unidades escolares da rede</p>
            </div>
            <Dialog open={openNewSchool} onOpenChange={setOpenNewSchool}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Unidade
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Unidade Escolar</DialogTitle>
                  <DialogDescription>Cadastre uma nova unidade escolar no sistema</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="school-name">Nome da Escola</Label>
                    <Input id="school-name" placeholder="Ex: Escola Municipal João da Silva" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="school-code">Código da Escola</Label>
                    <Input id="school-code" placeholder="Ex: EM001" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="school-address">Endereço</Label>
                    <Textarea id="school-address" placeholder="Ex: Rua das Flores, 123 - Centro" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="school-phone">Telefone</Label>
                      <Input id="school-phone" placeholder="Ex: (11) 1234-5678" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="school-email">Email</Label>
                      <Input id="school-email" type="email" placeholder="Ex: contato@escola.edu.br" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="school-director">Diretor(a)</Label>
                    <Input id="school-director" placeholder="Ex: Maria Silva" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenNewSchool(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Adicionar Unidade</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Diretor(a)</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Escola Municipal João da Silva</TableCell>
                    <TableCell>EM001</TableCell>
                    <TableCell>Maria Silva</TableCell>
                    <TableCell>contato@joaodasilva.edu.br</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        <span>Ativo</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Escola Municipal Maria Oliveira</TableCell>
                    <TableCell>EM002</TableCell>
                    <TableCell>Pedro Santos</TableCell>
                    <TableCell>contato@mariaoliveira.edu.br</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        <span>Ativo</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Escola Municipal Pedro Álvares</TableCell>
                    <TableCell>EM003</TableCell>
                    <TableCell>Ana Ferreira</TableCell>
                    <TableCell>contato@pedroalvares.edu.br</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        <span>Ativo</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Gerencie como e quando as notificações são enviadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Notificações por Email</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-okr-updates" defaultChecked />
                    <Label htmlFor="email-okr-updates">Atualizações de OKRs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-action-plans" defaultChecked />
                    <Label htmlFor="email-action-plans">Planos de Ação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-approvals" defaultChecked />
                    <Label htmlFor="email-approvals">Aprovações e Reprovações</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-deadlines" defaultChecked />
                    <Label htmlFor="email-deadlines">Prazos Próximos</Label>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Notificações no Sistema</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="system-okr-updates" defaultChecked />
                    <Label htmlFor="system-okr-updates">Atualizações de OKRs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="system-action-plans" defaultChecked />
                    <Label htmlFor="system-action-plans">Planos de Ação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="system-approvals" defaultChecked />
                    <Label htmlFor="system-approvals">Aprovações e Reprovações</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="system-deadlines" defaultChecked />
                    <Label htmlFor="system-deadlines">Prazos Próximos</Label>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deadline-warning">Aviso de Prazo</Label>
                <Select defaultValue="7">
                  <SelectTrigger id="deadline-warning">
                    <SelectValue placeholder="Selecione quantos dias antes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 dias antes</SelectItem>
                    <SelectItem value="5">5 dias antes</SelectItem>
                    <SelectItem value="7">7 dias antes</SelectItem>
                    <SelectItem value="14">14 dias antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>Configure integrações com outros sistemas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Microsoft Azure AD</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="azure-ad" defaultChecked />
                  <Label htmlFor="azure-ad">Ativar integração com Azure AD</Label>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-id">Tenant ID</Label>
                    <Input id="tenant-id" placeholder="ID do Tenant" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client-id">Client ID</Label>
                    <Input id="client-id" placeholder="ID do Cliente" />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Power BI</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="power-bi" defaultChecked />
                  <Label htmlFor="power-bi">Ativar integração com Power BI</Label>
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="workspace-id">Workspace ID</Label>
                  <Input id="workspace-id" placeholder="ID do Workspace" />
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="report-ids">IDs dos Relatórios</Label>
                  <Textarea id="report-ids" placeholder="IDs dos relatórios separados por vírgula" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>API de Dados Educacionais</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="edu-api" />
                  <Label htmlFor="edu-api">Ativar integração com API de Dados</Label>
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="api-key">Chave da API</Label>
                  <Input id="api-key" type="password" placeholder="Chave da API" />
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="api-endpoint">Endpoint da API</Label>
                  <Input id="api-endpoint" placeholder="URL do endpoint" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
