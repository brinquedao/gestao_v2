"use client"

import { useState } from "react"
import { CheckCircle2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ValidationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  type: "okr" | "action-plan"
  onValidate: (approved: boolean, feedback: string, relevance?: number, impact?: number) => void
}

export function ValidationDialog({ open, onOpenChange, title, type, onValidate }: ValidationDialogProps) {
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null)
  const [feedback, setFeedback] = useState("")
  const [relevance, setRelevance] = useState<number | null>(null)
  const [impact, setImpact] = useState<number | null>(null)

  const handleSubmit = () => {
    if (decision && (type === "okr" || (relevance && impact))) {
      onValidate(decision === "approve", feedback, relevance || undefined, impact || undefined)
      setDecision(null)
      setFeedback("")
      setRelevance(null)
      setImpact(null)
      onOpenChange(false)
    }
  }

  const getMatrixColor = (relevance: number, impact: number) => {
    const score = relevance * impact
    if (score >= 16) return "bg-green-100 text-green-800"
    if (score >= 9) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getMatrixLabel = (relevance: number, impact: number) => {
    const score = relevance * impact
    if (score >= 16) return "Alto Valor"
    if (score >= 9) return "Médio Valor"
    return "Baixo Valor"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Validar {type === "okr" ? "OKR" : "Plano de Ação"}</DialogTitle>
          <DialogDescription>
            {type === "okr"
              ? "Avalie o OKR e forneça feedback para a escola"
              : "Avalie o Plano de Ação usando a matriz de relevância e impacto"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-medium mb-2">{title}</h3>
          </div>

          {type === "action-plan" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="relevance">Relevância (1-5)</Label>
                  <Select value={relevance?.toString() || ""} onValueChange={(value) => setRelevance(Number(value))}>
                    <SelectTrigger id="relevance">
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
                  <Label htmlFor="impact">Impacto (1-5)</Label>
                  <Select value={impact?.toString() || ""} onValueChange={(value) => setImpact(Number(value))}>
                    <SelectTrigger id="impact">
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

              {relevance && impact && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Matriz de Avaliação</h4>
                  <div className="grid grid-cols-6 gap-1 text-xs">
                    <div></div>
                    <div className="text-center font-medium">1</div>
                    <div className="text-center font-medium">2</div>
                    <div className="text-center font-medium">3</div>
                    <div className="text-center font-medium">4</div>
                    <div className="text-center font-medium">5</div>

                    {[5, 4, 3, 2, 1].map((r) => (
                      <>
                        <div key={r} className="font-medium">
                          {r}
                        </div>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={`${r}-${i}`}
                            className={`h-8 border flex items-center justify-center text-xs font-medium ${
                              r === relevance && i === impact ? getMatrixColor(relevance, impact) : "bg-gray-50"
                            }`}
                          >
                            {r === relevance && i === impact ? r * i : ""}
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                  <div className="mt-2 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getMatrixColor(relevance, impact)}`}
                    >
                      {getMatrixLabel(relevance, impact)} (Score: {relevance * impact})
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="decision">Decisão</Label>
            <RadioGroup
              value={decision || ""}
              onValueChange={(value) => setDecision(value as "approve" | "reject")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approve" id="approve" />
                <Label htmlFor="approve" className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Aprovar
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reject" id="reject" />
                <Label htmlFor="reject" className="flex items-center">
                  <X className="mr-2 h-4 w-4 text-red-500" />
                  Reprovar
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Forneça um feedback construtivo para a escola"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!decision || (type === "action-plan" && (!relevance || !impact))}
            className={
              decision === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : decision === "reject"
                  ? "bg-red-600 hover:bg-red-700"
                  : ""
            }
          >
            {decision === "approve" ? "Aprovar" : decision === "reject" ? "Reprovar" : "Enviar Avaliação"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
