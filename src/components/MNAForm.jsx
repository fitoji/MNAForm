import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MNAForm() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    sex: '',
    age: '',
    weight: '',
    height: '',
    date: ''
  });

  const [screeningScore, setScreeningScore] = useState(0);
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const [answers, setAnswers] = useState({
    A: '', B: '', C: '', D: '', E: '', F: '',
    G: '', H: '', I: '', J: '', K: '', L: '', M: '', N: '', O: '', P: '', Q: '', R: ''
  });

  const updateAnswer = (question, value) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const calculateBMI = () => {
    const weight = parseFloat(patientInfo.weight);
    const height = parseFloat(patientInfo.height) / 100; // convert cm to m
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return '';
  };

  const calculateScreeningScore = () => {
    let score = 0;
    if (answers.A) score += parseInt(answers.A);
    if (answers.B) score += parseInt(answers.B);
    if (answers.C) score += parseInt(answers.C);
    if (answers.D) score += parseInt(answers.D);
    if (answers.E) score += parseInt(answers.E);
    if (answers.F) score += parseInt(answers.F);
    setScreeningScore(score);
    return score;
  };

  const calculateAssessmentScore = () => {
    let score = 0;
    if (answers.G) score += parseInt(answers.G);
    if (answers.H) score += parseInt(answers.H);
    if (answers.I) score += parseInt(answers.I);
    if (answers.J) score += parseInt(answers.J);
    if (answers.K) score += parseFloat(answers.K);
    if (answers.L) score += parseInt(answers.L);
    if (answers.M) score += parseFloat(answers.M);
    if (answers.N) score += parseInt(answers.N);
    if (answers.O) score += parseInt(answers.O);
    if (answers.P) score += parseFloat(answers.P);
    if (answers.Q) score += parseFloat(answers.Q);
    if (answers.R) score += parseInt(answers.R);
    setAssessmentScore(score);
    return score;
  };

  useEffect(() => {
    const screeningScore = calculateScreeningScore();
    const assessmentScore = calculateAssessmentScore();
    setTotalScore(screeningScore + assessmentScore);
  }, [answers]);

  const getRecommendation = () => {
    if (totalScore >= 24) {
      return "Estado nutricional normal";
    } else if (totalScore >= 17 && totalScore <= 23.5) {
      return "En riesgo de desnutrición";
    } else {
      return "Desnutrición";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Mini Nutritional Assessment (MNA®)</CardTitle>
        <CardDescription>Formulario de evaluación nutricional para ancianos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" value={patientInfo.name} onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="sex">Sexo</Label>
            <Select onValueChange={(value) => setPatientInfo({...patientInfo, sex: value})}>
              <SelectTrigger id="sex">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="age">Edad</Label>
            <Input id="age" type="number" value={patientInfo.age} onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input id="weight" type="number" value={patientInfo.weight} onChange={(e) => setPatientInfo({...patientInfo, weight: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="height">Estatura (cm)</Label>
            <Input id="height" type="number" value={patientInfo.height} onChange={(e) => setPatientInfo({...patientInfo, height: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input id="date" type="date" value={patientInfo.date} onChange={(e) => setPatientInfo({...patientInfo, date: e.target.value})} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Cribado</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="A">A. ¿Ha disminuido la ingesta de alimentos en los últimos tres meses debido a la pérdida de apetito, problemas digestivos o dificultades para masticar o tragar?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('A', value)}>
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
              <Label htmlFor="B">B. ¿Ha perdido peso de forma involuntaria en los últimos 3 meses?</Label>
              <RadioGroup onValueChange={(value) => updateAnswer('B', value)}>
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
              <Label htmlFor="C">C. ¿Movilidad?</Label>
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
              <Label htmlFor="D">D. ¿Ha sufrido el paciente estrés psicológico o enfermedad aguda en los últimos tres meses?</Label>
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
              <Label htmlFor="E">E. ¿Problemas neuropsicológicos?</Label>
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
              <Label htmlFor="F">F. Índice de masa corporal (IMC) = peso en kg / (estatura en m)²</Label>
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
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Evaluación</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="G">G. ¿Vive de forma independiente (no en una residencia)?</Label>
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
              <Label htmlFor="H">H. ¿Toma más de 3 medicamentos recetados al día?</Label>
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
              <Label htmlFor="I">I. ¿Tiene úlceras o lesiones cutáneas?</Label>
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
              <Label htmlFor="J">J. ¿Cuántas comidas completas toma el paciente diariamente?</Label>
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
              <Label htmlFor="K">K. Seleccione los indicadores de ingesta proteica</Label>
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
              <Label htmlFor="L">L. ¿Consume dos o más porciones de frutas y verduras al día?</Label>
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
              <Label htmlFor="M">M. ¿Cuánto líquido (agua, zumo, café, té, leche) bebe al día?</Label>
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
              <Label htmlFor="N">N. ¿Modo de alimentarse?</Label>
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
              <Label htmlFor="O">O. Opinión sobre el propio estado nutricional</Label>
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
              <Label htmlFor="P">P. En comparación con otras personas de la misma edad, ¿cómo valora el paciente su estado de salud?</Label>
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
              <Label htmlFor="Q">Q. Perímetro del brazo (PBr) en cm</Label>
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
              <Label htmlFor="R">R. Perímetro de la pantorrilla (PPa) en cm</Label>
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
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div>
          <p>Puntuación del cribado: {screeningScore} puntos</p>
          <p>Puntuación de la evaluación: {assessmentScore} puntos</p>
          <p>Puntuación total: {totalScore} puntos</p>
        </div>
        <div>
          <p>Evaluación del estado nutricional:</p>
          <p className="font-bold">{getRecommendation()}</p>
        </div>
        <Button onClick={() => alert('Formulario enviado')}>Enviar formulario</Button>
      </CardFooter>
    </Card>
  );
}