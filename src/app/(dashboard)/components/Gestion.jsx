'use client'
import React, { useState, useMemo } from 'react';
import { 
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ArrowUpDown,
  Edit,
  UserPlusIcon, 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";

// Tipos de membresía
const MEMBERSHIP_TYPES = [
  { value: 'basic', label: 'Membresía Básica' },
  { value: 'premium', label: 'Membresía Premium' },
  { value: 'vip', label: 'Membresía VIP' }
];

const MemberManagement = () => {
  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      membership: 'basic',
      startDate: '2024-01-15',
      status: 'Activo'
    },
    {
      id: '2',
      name: 'María González',
      email: 'maria.gonzalez@example.com', 
      membership: 'premium',
      startDate: '2024-02-20',
      status: 'Activo'
    }
  ]);

  const [editingMember, setEditingMember] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: info => info.getValue()
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'membership',
      header: 'Membresía',
      cell: info => {
        const type = MEMBERSHIP_TYPES.find(m => m.value === info.getValue());
        return type ? type.label : info.getValue();
      }
    },
    {
      accessorKey: 'startDate',
      header: 'Fecha Inicio'
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: info => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          info.getValue() === 'Activo' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {info.getValue()}
        </span>
      )
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setEditingMember(row.original)}
        >
          <Edit className="h-4 w-4 mr-2" /> Editar
        </Button>
      )
    }
  ], []);

  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleAddMember = () => {
    const newMember = {
      id: (members.length + 1).toString(),
      ...editingMember,
      status: 'Activo',
      startDate: new Date().toISOString().split('T')[0]
    };

    setMembers(prev => 
      editingMember?.id 
        ? prev.map(m => m.id === editingMember.id ? newMember : m)
        : [...prev, newMember]
    );
    
    setEditingMember(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Miembros</CardTitle>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setEditingMember({})}
          >
            <UserPlusIcon className="h-4 w-4" />
            Nuevo Miembro
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Buscar miembros..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
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
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Página {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit/Add Member Dialog */}
      {editingMember !== null && (
        <Dialog 
          open={editingMember !== null} 
          onOpenChange={() => setEditingMember(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingMember.id ? 'Editar Miembro' : 'Nuevo Miembro'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editingMember.name || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={editingMember.email || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="membership" className="text-right">
                  Tipo de Membresía
                </Label>
                <Select
                  name="membership"
                  value={editingMember.membership || ''}
                  onValueChange={(value) => setEditingMember(prev => ({
                    ...prev,
                    membership: value
                  }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar Membresía" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEMBERSHIP_TYPES.map((type) => (
                      <SelectItem 
                        key={type.value} 
                        value={type.value}
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleAddMember}
                disabled={!editingMember.name || !editingMember.email || !editingMember.membership}
              >
                {editingMember.id ? 'Actualizar Miembro' : 'Registrar Miembro'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MemberManagement;