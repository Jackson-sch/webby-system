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
  PlusIcon, 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileTextIcon,
  DollarSignIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Constantes de métodos de pago y estados
const PAYMENT_METHODS = [
  { value: 'credit', label: 'Tarjeta de Crédito' },
  { value: 'debit', label: 'Tarjeta de Débito' },
  { value: 'cash', label: 'Efectivo' },
  { value: 'transfer', label: 'Transferencia Bancaria' },
  { value: 'paypal', label: 'PayPal' }
];

const PAYMENT_STATUS = {
  paid: { 
    label: 'Pagado', 
    variant: 'success' 
  },
  pending: { 
    label: 'Pendiente', 
    variant: 'warning' 
  },
  overdue: { 
    label: 'Atrasado', 
    variant: 'destructive' 
  }
};

const PaymentsManagement = () => {
  const [payments, setPayments] = useState([
    {
      id: '1',
      memberName: 'Juan Pérez',
      membershipType: 'basic',
      amount: 50.00,
      paymentDate: '2024-01-15',
      dueDate: '2024-02-15',
      method: 'credit',
      status: 'paid'
    },
    {
      id: '2',
      memberName: 'María González',
      membershipType: 'premium',
      amount: 80.00,
      paymentDate: '2024-02-10',
      dueDate: '2024-03-10',
      method: 'transfer',
      status: 'pending'
    }
  ]);

  const [editingPayment, setEditingPayment] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: info => info.getValue()
    },
    {
      accessorKey: 'memberName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre Miembro
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    {
      accessorKey: 'membershipType',
      header: 'Tipo Membresía'
    },
    {
      accessorKey: 'amount',
      header: 'Monto',
      cell: info => `$${info.getValue()}`
    },
    {
      accessorKey: 'paymentDate',
      header: 'Fecha de Pago'
    },
    {
      accessorKey: 'dueDate',
      header: 'Fecha Límite'
    },
    {
      accessorKey: 'method',
      header: 'Método de Pago',
      cell: info => {
        const method = PAYMENT_METHODS.find(m => m.value === info.getValue());
        return method ? method.label : info.getValue();
      }
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: info => {
        const status = PAYMENT_STATUS[info.getValue()];
        return (
          <Badge variant={status.variant}>
            {status.label}
          </Badge>
        );
      }
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setEditingPayment(row.original)}
          >
            <Edit className="h-4 w-4 mr-2" /> Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleGenerateInvoice(row.original)}
          >
            <FileTextIcon className="h-4 w-4 mr-2" /> Factura
          </Button>
        </div>
      )
    }
  ], []);

  const table = useReactTable({
    data: payments,
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

  const handleGenerateInvoice = (payment) => {
    // Implementación de generación de factura
    console.log('Generar factura para:', payment);
    // Aquí podrías abrir un modal o generar un PDF
  };

  const handleSavePayment = () => {
    const newPayment = {
      ...editingPayment,
      id: editingPayment.id || (payments.length + 1).toString(),
    };

    setPayments(prev => 
      editingPayment?.id 
        ? prev.map(p => p.id === editingPayment.id ? newPayment : p)
        : [...prev, newPayment]
    );
    
    setEditingPayment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPayment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Pagos</CardTitle>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setEditingPayment({})}
          >
            <PlusIcon className="h-4 w-4" />
            Registrar Pago
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Buscar pagos..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Button variant="outline">
                <DollarSignIcon className="h-4 w-4 mr-2" /> 
                Total Recaudado: $130.00
              </Button>
            </div>
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

      {/* Edit/Add Payment Dialog */}
      {editingPayment !== null && (
        <Dialog 
          open={editingPayment !== null} 
          onOpenChange={() => setEditingPayment(null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingPayment.id ? 'Editar Pago' : 'Registrar Nuevo Pago'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="memberName" className="text-right">
                  Nombre Miembro
                </Label>
                <Input
                  id="memberName"
                  name="memberName"
                  value={editingPayment.memberName || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="membershipType" className="text-right">
                  Membresía
                </Label>
                <Select
                  name="membershipType"
                  value={editingPayment.membershipType || ''}
                  onValueChange={(value) => setEditingPayment(prev => ({
                    ...prev,
                    membershipType: value
                  }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar Membresía" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básica</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Monto
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  value={editingPayment.amount || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentDate" className="text-right">
                  Fecha de Pago
                </Label>
                <Input
                  id="paymentDate"
                  name="paymentDate"
                  type="date"
                  value={editingPayment.paymentDate || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="method" className="text-right">
                  Método de Pago
                </Label>
                <Select
                  name="method"
                  value={editingPayment.method || ''}
                  onValueChange={(value) => setEditingPayment(prev => ({
                    ...prev,
                    method: value
                  }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar Método" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map((method) => (
                      <SelectItem 
                        key={method.value} 
                        value={method.value}
                      >
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Estado
                </Label>
                <Select
                  name="status"
                  value={editingPayment.status || ''}
                  onValueChange={(value) => setEditingPayment(prev => ({
                    ...prev,
                    status: value
                  }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Pagado</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="overdue">Atrasado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleSavePayment}
                disabled={!editingPayment.memberName || !editingPayment.amount}
              >
                {editingPayment.id ? 'Actualizar Pago' : 'Registrar Pago'}
              </Button>
              </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentsManagement;