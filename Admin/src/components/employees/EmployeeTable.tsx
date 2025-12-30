import { useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Employee } from '@/types/crm';
import { Avatar } from '@/components/ui/UserAvatar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Checkbox } from '@/components/ui/checkbox';

interface EmployeeTableProps {
  employees: Employee[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeTable({ 
  employees, 
  selectedIds, 
  onSelectionChange, 
  onEdit, 
  onDelete 
}: EmployeeTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(employees.map((_, idx) => `${idx}`));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOne = (idx: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, idx]);
    } else {
      onSelectionChange(selectedIds.filter(id => id !== idx));
    }
  };

  const isAllSelected = employees.length > 0 && selectedIds.length === employees.length;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in">
      <table className="data-table">
        <thead>
          <tr>
            <th className="w-12">
              <Checkbox 
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Employee ID</th>
            <th className="text-center">Assigned Leads</th>
            <th className="text-center">Closed Leads</th>
            <th>Status</th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => {
            const idx = `${index}`;
            const isSelected = selectedIds.includes(idx);
            
            return (
              <tr key={index} className={isSelected ? 'bg-muted/30' : ''}>
                <td>
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={(checked) => handleSelectOne(idx, checked as boolean)}
                  />
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={`${employee.firstName} ${employee.lastName}`} />
                    <div>
                      <p className="font-medium text-foreground">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="email-link text-sm">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="employee-id">{employee.id}</td>
                <td className="text-center">{employee.assignedLeads}</td>
                <td className="text-center">{employee.closedLeads}</td>
                <td>
                  <StatusBadge status={employee.status} />
                </td>
                <td className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === idx ? null : idx)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                  
                  {openMenuId === idx && (
                    <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 z-10 min-w-32">
                      <button
                        onClick={() => {
                          onEdit(employee);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(employee);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
