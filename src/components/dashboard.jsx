"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - replace with your actual data
const incidentsByType = [
  { name: "CENTRAL_DE_MONITOREO", leve: 40, moderada: 24, grave: 10 },
  { name: "FISCALIZACION_MDEP", leve: 30, moderada: 18, grave: 8 },
  { name: "GESTION_AMBIENTAL_MDEP", leve: 20, moderada: 15, grave: 5 },
  { name: "OPERATIVOS_POLICIAL", leve: 25, moderada: 20, grave: 12 },
  { name: "PATRULLAJE_INTEGRADO", leve: 35, moderada: 22, grave: 9 },
]

const severityDistribution = [
  { name: "Leve", value: 150 },
  { name: "Moderada", value: 99 },
  { name: "Grave", value: 44 },
]

const monthlyTrends = [
  { month: "Ene", total: 65 },
  { month: "Feb", total: 75 },
  { month: "Mar", total: 85 },
  { month: "Abr", total: 78 },
  { month: "May", total: 90 },
  { month: "Jun", total: 95 },
]

const COLORS = ["hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--destructive))"]

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Dashboard de Incidencias de Seguridad</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Severidad</CardTitle>
                <CardDescription>Total de incidencias por nivel de gravedad</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={severityDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {severityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Incidencias por Tipo y Severidad</CardTitle>
                <CardDescription>Desglose de incidencias por categoría principal</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    leve: {
                      label: "Leve",
                      color: "hsl(var(--success))",
                    },
                    moderada: {
                      label: "Moderada",
                      color: "hsl(var(--warning))",
                    },
                    grave: {
                      label: "Grave",
                      color: "hsl(var(--destructive))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <BarChart data={incidentsByType}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="leve" stackId="a" fill="var(--color-leve)" />
                    <Bar dataKey="moderada" stackId="a" fill="var(--color-moderada)" />
                    <Bar dataKey="grave" stackId="a" fill="var(--color-grave)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia Mensual de Incidencias</CardTitle>
              <CardDescription>Evolución del total de incidencias por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]">
                <LineChart data={monthlyTrends}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}