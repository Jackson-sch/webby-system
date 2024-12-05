"use client"

import React from 'react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { ChevronDown, Plus, Calendar, Users, Clock, Edit, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const data = [
  { id: '1', name: 'Yoga', instructor: 'Ana García', date: '2023-06-01', time: '10:00', capacity: 20, enrolled: 18, waitlist: 0 },
  { id: '2', name: 'Spinning', instructor: 'Carlos Ruiz', date: '2023-06-01', time: '11:00', capacity: 15, enrolled: 15, waitlist: 2 },
  { id: '3', name: 'Zumba', instructor: 'María López', date: '2023-06-02', time: '18:00', capacity: 25, enrolled: 20, waitlist: 0 },
  // Add more sample data as needed
]

const columns = [
  {
    accessorKey: "name",
    header: "Clase",
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "time",
    header: "Hora",
  },
  {
    accessorKey: "capacity",
    header: "Capacidad",
  },
  {
    accessorKey: "enrolled",
    header: "Inscritos",
  },
  {
    accessorKey: "waitlist",
    header: "Lista de Espera",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const classData = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={classData.enrolled < classData.capacity}
              onClick={() => alert(`Registrar asistencia para ${classData.name}`)}
            >
              Registrar Asistencia
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={classData.waitlist > 0}
              onClick={() => alert(`Gestionar lista de espera para ${classData.name}`)}
            >
              Gestionar Lista de Espera
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function ClassManagement() {
  const [sorting, setSorting] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isNewClassModalOpen, setIsNewClassModalOpen] = React.useState(false)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Clases y Horarios</h1>
        <Dialog open={isNewClassModalOpen} onOpenChange={setIsNewClassModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Programar Nueva Clase
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Programar Nueva Clase</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="className">Nombre de la Clase</Label>
                <Input id="className" placeholder="Ej: Yoga, Spinning, Zumba" />
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Select>
                  <SelectTrigger id="instructor">
                    <SelectValue placeholder="Seleccionar instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ana">Ana García</SelectItem>
                    <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                    <SelectItem value="maria">María López</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="time">Hora</Label>
                <Input id="time" type="time" />
              </div>
              <div>
                <Label htmlFor="capacity">Capacidad</Label>
                <Input id="capacity" type="number" min="1" />
              </div>
              <Button type="submit" className="w-full">Guardar Clase</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar clases..."
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
                  No hay resultados.
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

