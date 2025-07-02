"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = (userType: string) => {
    setLoading(true)

    // Simulate login and store user type in sessionStorage
    setTimeout(() => {
      sessionStorage.setItem("userType", userType)
      sessionStorage.setItem("isLoggedIn", "true")
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/placeholder.svg?height=80&width=240"
              alt="Logo Institucional"
              width={240}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Gestão de Resultados Educacionais</CardTitle>
          <CardDescription>Acesse com sua conta institucional ou selecione um perfil de demonstração</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="azure" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="azure">Azure AD</TabsTrigger>
              <TabsTrigger value="demo">Demonstração</TabsTrigger>
            </TabsList>
            <TabsContent value="azure" className="space-y-4 pt-4">
              <Button
                className="w-full bg-[#0078d4] hover:bg-[#106ebe]"
                onClick={() => handleLogin("escola")}
                disabled={loading}
              >
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Microsoft Logo"
                  width={24}
                  height={24}
                  className="mr-2 h-6 w-6"
                />
                {loading ? "Entrando..." : "Entrar com Microsoft"}
              </Button>
            </TabsContent>
            <TabsContent value="demo" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <Button variant="outline" className="w-full" onClick={() => handleLogin("escola")} disabled={loading}>
                  Entrar como Escola
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleLogin("gpa")} disabled={loading}>
                  Entrar como GPA (Central)
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>© 2024 Sistema de Gestão de Resultados Educacionais</p>
          <p>Versão 1.0</p>
        </CardFooter>
      </Card>
    </div>
  )
}
