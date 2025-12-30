import { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { AddEmployeeModal } from '@/components/employees/AddEmployeeModal';
import { Pagination } from '@/components/ui/CRMPagination';
import { mockEmployees } from '@/data/mockData';
import { Employee } from '@/types/crm';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 8;

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmployees = employees.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddEmployee = (data: {
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    language: string;
  }) => {
    const newEmployee: Employee = {
      id: `#${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
      ...data,
      assignedLeads: 0,
      closedLeads: 0,
      status: 'active',
      createdAt: new Date(),
    };
    setEmployees([newEmployee, ...employees]);
    toast({
      title: 'Employee added',
      description: `${data.firstName} ${data.lastName} has been added successfully.`,
    });
  };

  const handleEdit = (employee: Employee) => {
    toast({
      title: 'Edit employee',
      description: `Editing ${employee.firstName} ${employee.lastName}`,
    });
  };

  const handleDelete = (employee: Employee) => {
    setEmployees(employees.filter((e) => e.id !== employee.id));
    toast({
      title: 'Employee deleted',
      description: `${employee.firstName} ${employee.lastName} has been removed.`,
    });
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    const indicesToRemove = selectedIds.map(Number);
    const remaining = employees.filter((_, idx) => !indicesToRemove.includes(idx));
    setEmployees(remaining);
    setSelectedIds([]);
    toast({
      title: 'Employees deleted',
      description: `${selectedIds.length} employees have been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={['Home', 'Employees']} />
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className="crm-button text-destructive">
              Delete Selected ({selectedIds.length})
            </button>
          )}
          <button onClick={() => setIsModalOpen(true)} className="crm-button">
            Add Employees
          </button>
        </div>
      </div>

      <EmployeeTable
        employees={paginatedEmployees}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEmployee}
      />
    </div>
  );
}
