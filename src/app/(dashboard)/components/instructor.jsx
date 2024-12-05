"use client"

import React, { useState } from 'react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { ChevronDown, Plus, Edit, Trash2, Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"



const data= [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@gym.com',
    phone: '555-0101',
    specialties: ['Yoga', 'Pilates'],
    certifications: ['Yoga Alliance 200hr', 'Pilates Mat'],
    classes: ['Yoga Básico', 'Pilates Intermedio'],
    performance: 4.8
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@gym.com',
    phone: '555-0102',
    specialties: ['Spinning', 'Entrenamiento funcional'],
    certifications: ['Spinning Instructor', 'TRX Trainer'],
    classes: ['Spinning Avanzado', 'Funcional HIIT'],
    performance: 4.6
  },
  // Add more sample data as needed
]

const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "specialties",
    header: "Especialidades",
    cell: ({ row }) => row.original.specialties.join(", "),
  },
  {
    accessorKey: "certifications",
    header: "Certificaciones",
    cell: ({ row }) => row.original.certifications.join(", "),
  },
  {
    accessorKey: "classes",
    header: "Clases Asignadas",
    cell: ({ row }) => row.original.classes.join(", "),
  },
  {
    accessorKey: "performance",
    header: "Desempeño",
    cell: ({ row }) => `${row.original.performance}/5`,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const instructor = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(`Editar ${instructor.name}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Eliminar ${instructor.name}`)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function InstructorManagement() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Instructores</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Agregar Instructor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Instructor</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Nombre completo" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@ejemplo.com" />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="Número de teléfono" />
              </div>
              <div>
                <Label htmlFor="specialties">Especialidades</Label>
                <Select>
                  <SelectTrigger id="specialties">
                    <SelectValue placeholder="Seleccionar especialidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="pilates">Pilates</SelectItem>
                    <SelectItem value="spinning">Spinning</SelectItem>
                    <SelectItem value="funcional">Entrenamiento Funcional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="certifications">Certificaciones</Label>
                <Input id="certifications" placeholder="Separadas por comas" />
              </div>
              <div>
                <Label htmlFor="classes">Clases Asignadas</Label>
                <Select>
                  <SelectTrigger id="classes">
                    <SelectValue placeholder="Seleccionar clases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yoga-basico">Yoga Básico</SelectItem>
                    <SelectItem value="pilates-intermedio">Pilates Intermedio</SelectItem>
                    <SelectItem value="spinning-avanzado">Spinning Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Guardar Instructor</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar instructores..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

