import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import { Button } from './ui/button'
import { Separator } from "@/components/ui/separator"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Checkbox } from './ui/checkbox'

export default function ModernMNAForm() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    sex: '',
    age: '',
    weight: '',
    height: '',
    date: '',
  })

  const [screeningScore, setScreeningScore] = useState(0)
  const [assessmentScore, setAssessmentScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  const [answers, setAnswers] = useState({
    A: '',
    B: '',
    C: '',
    D: '',
    E: '',
    F: '',
    G: '',
    H: '',
    I: '',
    J: '',
    K: '',
    L: '',
    M: '',
    N: '',
    O: '',
    P: '',
    Q: '',
    R: '',
  })

  const updateAnswer = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }))
  }

  const calculateBMI = () => {
    const weight = parseFloat(patientInfo.weight)
    const height = parseFloat(patientInfo.height) / 100 // convert cm to m
    if (weight && height) {
      return (weight / (height * height)).toFixed(1)
    }
    return ''
  }

  const calculateScreeningScore = () => {
    let score = 0
    if (answers.A) score += parseInt(answers.A)
    if (answers.B) score += parseInt(answers.B)
    if (answers.C) score += parseInt(answers.C)
    if (answers.D) score += parseInt(answers.D)
    if (answers.E) score += parseInt(answers.E)
    if (answers.F) score += parseInt(answers.F)
    setScreeningScore(score)
    return score
  }

  const calculateAssessmentScore = () => {
    let score = 0
    if (answers.G) score += parseInt(answers.G)
    if (answers.H) score += parseInt(answers.H)
    if (answers.I) score += parseInt(answers.I)
    if (answers.J) score += parseInt(answers.J)
    if (answers.K) score += parseFloat(answers.K)
    if (answers.L) score += parseInt(answers.L)
    if (answers.M) score += parseFloat(answers.M)
    if (answers.N) score += parseInt(answers.N)
    if (answers.O) score += parseInt(answers.O)
    if (answers.P) score += parseFloat(answers.P)
    if (answers.Q) score += parseFloat(answers.Q)
    if (answers.R) score += parseInt(answers.R)
    setAssessmentScore(score)
    return score
  }

  useEffect(() => {
    const screeningScore = calculateScreeningScore()
    const assessmentScore = calculateAssessmentScore()
    setTotalScore(screeningScore + assessmentScore)
  }, [answers])

  const getRecommendation = () => {
    if (totalScore >= 24) {
      return (
        <div className='bg-emerald-400 text-white text-bold rounded-sm p-2'>
          Estado nutricional normal
      </div>
      )
     
    } else if (totalScore >= 17 && totalScore <= 23.5) {
      return (
        <div className='bg-amber-400 text-white text-bold rounded-sm p-2'>
          En riesgo de desnutrición
      </div>
      )
      
    } else {
      
      return (
        <div className='bg-rose-700 text-white text-bold rounded-sm p-2'>
         Desnutrición
      </div>
      )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      patientInfo,
      answers,
      screeningScore,
      assessmentScore,
      totalScore,
      recommendation: getRecommendation(),
    }

    try {
      await saveFormToFile(formData)
      toast.success('Formulario guardado', {
        description:
          'El formulario se ha guardado exitosamente en su disco duro.',
      })
    } catch (error) {
      console.error('Error al guardar el formulario:', error)
      toast.error('Error', {
        description:
          'Hubo un problema al guardar el formulario. Por favor, intente de nuevo.',
      })
    }
  }

  const saveFormToFile = async (formData) => {
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: `MNA_${patientInfo.name}_${
            new Date().toISOString().split('T')[0]
          }.json`,
          types: [
            {
              description: 'JSON File',
              accept: { 'application/json': ['.json'] },
            },
          ],
        })
        const writable = await handle.createWritable()
        await writable.write(JSON.stringify(formData, null, 2))
        await writable.close()
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw new Error('Failed to save file')
        }
      }
    } else {
      // Fallback for browsers that don't support the File System Access API
      const blob = new Blob([JSON.stringify(formData, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `MNA_${patientInfo.name}_${
        new Date().toISOString().split('T')[0]
      }.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <Toaster richColors />
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <Card className="w-full shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-emerald-100 rounded-sm p-2">
              Mini Nutritional Assessment (MNA®)
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Formulario de evaluación nutricional para ancianos
            </CardDescription>
          <Separator className="mt-4 mb-4" />
          </CardHeader>

          <CardContent className="space-y-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={fadeIn}
            >
              <div>
                <Label htmlFor="name" className="text-lg">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={patientInfo.name}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, name: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sex" className="text-lg">
                  Sexo
                </Label>
                <Select
                  onValueChange={(value) =>
                    setPatientInfo({ ...patientInfo, sex: value })
                  }
                >
                  <SelectTrigger id="sex" className="mt-1">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="age" className="text-lg">
                  Edad
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={patientInfo.age}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, age: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="weight" className="text-lg">
                  Peso (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={patientInfo.weight}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, weight: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-lg">
                  Estatura (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={patientInfo.height}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, height: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-lg">
                  Fecha
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={patientInfo.date}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, date: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeIn}>
            <Separator className="mt-2 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 bg-emerald-100 p-1 rounded-sm">Cribado</h3>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="A" className="text-lg flex flex-start">
                    A. ¿Ha disminuido la ingesta de alimentos en los últimos
                    tres meses debido a la pérdida de apetito, problemas
                    digestivos o dificultades para masticar o tragar?
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => updateAnswer('A', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="A-0" />
                      <Label htmlFor="A-0">0 = ha comido mucho menos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="A-1" />
                      <Label htmlFor="A-1">1 = ha comido menos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="A-2" />
                      <Label htmlFor="A-2">2 = ha comido igual</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
              <Label htmlFor="B" className="text-lg flex flex-start">B. ¿Ha perdido peso de forma involuntaria en los últimos 3 meses?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('B', value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="B-0" />
                  <Label htmlFor="B-0">0 = pérdida de peso superior a 3 kg (6,6 lb)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="B-1" />
                  <Label htmlFor="B-1">1 = no lo sabe</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="B-2" />
                  <Label htmlFor="B-2">2 = pérdida de peso entre 1 y 3 kg (2,2 y 6,6 lb)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="B-3" />
                  <Label htmlFor="B-3">3 = sin pérdida de peso</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="C" className="text-lg mb-2 flex flex-start">C. ¿Movilidad?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('C', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="C-0" />
                  <Label htmlFor="C-0">0 = en cama o silla de ruedas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="C-1" />
                  <Label htmlFor="C-1">1 = es capaz de levantarse de la cama/silla, pero no sale a la calle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="C-2" />
                  <Label htmlFor="C-2">2 = sale a la calle</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="D" className="mb-2 flex flex-start text-lg">D. ¿Ha sufrido el paciente estrés psicológico o enfermedad aguda en los últimos tres meses?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('D', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="D-0" />
                  <Label htmlFor="D-0">0 = si</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="D-2" />
                  <Label htmlFor="D-2">2 = no</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="E" className="mb-2 flex flex-start text-lg">E. ¿Problemas neuropsicológicos?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('E', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="E-0" />
                  <Label htmlFor="E-0">0 = demencia o depresión graves</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="E-1" />
                  <Label htmlFor="E-1">1 = demencia leve</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="E-2" />
                  <Label htmlFor="E-2">2 = sin problemas psicológicos</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="F" className="flex flex-start mb-2 text-lg">F. Índice de masa corporal (IMC) = peso en kg / (estatura en m)²</Label>
              <p>IMC calculado: {calculateBMI()}</p>
              <RadioGroup onValueChange={(value) => updateAnswer('F', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="F-0" />
                  <Label htmlFor="F-0">0 = IMC inferior a 19</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="F-1" />
                  <Label htmlFor="F-1">1 = IMC entre 19 y menos de 21</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="F-2" />
                  <Label htmlFor="F-2">2 = IMC entre 21 y menos de 23</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="F-3" />
                  <Label htmlFor="F-3">3 = IMC 23 o superior</Label>
                </div>
              </RadioGroup>
            </div>

                {/* Repite este patrón para las preguntas B a F */}
                {/* ... */}
                <div>
          
          
          
          
        </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold mb-4 p-1 bg-emerald-100 rounded-sm">Evaluación</h3>

              <div className="space-y-6">
                {/* Preguntas G a R */}
                <div className="space-y-4">
            <div>
              <Label htmlFor="G" className="flex flex-start text-lg mb-2">G. ¿Vive de forma independiente (no en una residencia)?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('G', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="G-1" />
                  <Label htmlFor="G-1">1 = si</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="G-0" />
                  <Label htmlFor="G-0">0 = no</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="H" className="flex flex-start text-lg mb-2">H. ¿Toma más de 3 medicamentos recetados al día?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('H', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="H-0" />
                  <Label htmlFor="H-0">0 = si</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="H-1" />
                  <Label htmlFor="H-1">1 = no</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="I" className="flex flex-start text-lg mb-2">I. ¿Tiene úlceras o lesiones cutáneas?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('I', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="I-0" />
                  <Label htmlFor="I-0">0 = si</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="I-1" />
                  <Label htmlFor="I-1">1 = no</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="J" className="flex flex-start text-lg mb-2">J. ¿Cuántas comidas completas toma el paciente diariamente?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('J', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="J-0" />
                  <Label htmlFor="J-0">0 = 1 comida</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="J-1" />
                  <Label htmlFor="J-1">1 = 2 comidas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="J-2" />
                  <Label htmlFor="J-2">2 = 3 comidas</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="K" className="flex flex-start text-lg mb-2">K. Seleccione los indicadores de ingesta proteica</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="K-1" onChange={(e) => {
                    const currentValue = parseFloat(answers.K) || 0;
                    const newValue = e.target.checked ? currentValue + 0.5 : currentValue - 0.5;
                    updateAnswer('K', newValue.toString());
                  }} />
                  <Label htmlFor="K-1">¿Al menos una porción de productos lácteos al día?</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="K-2" onChange={(e) => {
                    const currentValue = parseFloat(answers.K) || 0;
                    const newValue = e.target.checked ? currentValue + 0.5 : currentValue - 0.5;
                    updateAnswer('K', newValue.toString());
                  }} />
                  <Label htmlFor="K-2">¿Dos o más porciones de legumbres o huevos a la semana?</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="K-3" onChange={(e) => {
                    const currentValue = parseFloat(answers.K) || 0;
                    const newValue = e.target.checked ? currentValue + 0.5 : currentValue - 0.5;
                    updateAnswer('K', newValue.toString());
                  }} />
                  <Label htmlFor="K-3">¿Carne, pescado o aves a diario?</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="L" className="flex flex-start text-lg mb-2">L. ¿Consume dos o más porciones de frutas y verduras al día?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('L', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="L-0" />
                  <Label htmlFor="L-0">0 = no</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="L-1" />
                  <Label htmlFor="L-1">1 = si</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="M" className="flex flex-start text-lg mb-2">M. ¿Cuánto líquido (agua, zumo, café, té, leche) bebe al día?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('M', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0.0" id="M-0" />
                  <Label htmlFor="M-0">0.0 = menos de 3 tazas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0.5" id="M-1" />
                  <Label htmlFor="M-1">0.5 = 3 a 5 tazas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1.0" id="M-2" />
                  <Label htmlFor="M-2">1.0 = más de 5 tazas</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="N" className="flex flex-start text-lg mb-2">N. ¿Modo de alimentarse?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('N', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="N-0" />
                  <Label htmlFor="N-0">0 = incapaz de comer sin ayuda</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="N-1" />
                  <Label htmlFor="N-1">1 = come solo con alguna dificultad</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="N-2" />
                  <Label htmlFor="N-2">2 = come solo sin problemas</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="O" className="flex flex-start text-lg mb-2">O. Opinión sobre el propio estado nutricional</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('O', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="O-0" />
                  <Label htmlFor="O-0">0 = se considera desnutrido</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="O-1" />
                  <Label htmlFor="O-1">1 = no está seguro de cuál es su estado nutricional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="O-2" />
                  <Label htmlFor="O-2">2 = opina que no tiene problemas nutricionales</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="P" className="flex flex-start text-lg mb-2">P. En comparación con otras personas de la misma edad, ¿cómo valora el paciente su estado de salud?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('P', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0.0" id="P-0" />
                  <Label htmlFor="P-0">0.0 = no tan bueno</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0.5" id="P-1" />
                  <Label htmlFor="P-1">0.5 = no lo sabe</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1.0" id="P-2" />
                  <Label htmlFor="P-2">1.0 = igual de bueno</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2.0" id="P-3" />
                  <Label htmlFor="P-3">2.0 = mejor</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="Q" className="flex flex-start text-lg mb-2">Q. Perímetro del brazo (PBr) en cm</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('Q', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0.0" id="Q-0" />
                  <Label htmlFor="Q-0">0.0 = PBr inferior a 21</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0.5" id="Q-1" />
                  <Label htmlFor="Q-1">0.5 = PBr de 21 a 22</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1.0" id="Q-2" />
                  <Label htmlFor="Q-2">1.0 = PBr 22 o mayor</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="R" className="flex flex-start text-lg mb-2">R. Perímetro de la pantorrilla (PPa) en cm</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('R', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="R-0" />
                  <Label htmlFor="R-0">0 = PPa inferior a 31</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="R-1" />
                  <Label htmlFor="R-1">1 = PPa 31 o mayor</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
                {/* ... */}
              </div>
            </motion.div>
          </CardContent>
          <Separator className="mt-2 mb-4"/>

          <CardFooter className="flex flex-col items-start space-y-4">
            <motion.div variants={fadeIn} className="w-full">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg">
                  Puntuación del cribado:{' '}
                  <span className="font-bold">{screeningScore}</span> puntos
                </p>
                <p className="text-lg">
                  Puntuación de la evaluación:{' '}
                  <span className="font-bold">{assessmentScore}</span> puntos
                </p>
                <p className="text-lg">
                  Puntuación total:{' '}
                  <span className="font-bold">{totalScore}</span> puntos
                </p>
              </div>
              <div className="mt-4">
                <p className="text-lg">Evaluación del estado nutricional:</p>
                <p className="text-2xl font-bold text-blue-600">
                  {getRecommendation()}
                </p>
              </div>
            </motion.div>
            <Separator className="my-2" />

            <Button type="submit" className="w-full mt-4 bg-sky-400 hover:bg-sky-300">
              Guardar formulario
            </Button>
          </CardFooter>
        </Card>
      </form>
    </motion.div>
  )
}
