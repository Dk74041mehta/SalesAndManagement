import { mockEmployees } from '@/data/mockData';
import { Avatar } from '@/components/ui/UserAvatar';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function ActiveSalesPeopleTable() {
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').slice(0, 4);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Assigned Leads</th>
            <th>Closed Leads</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activeEmployees.map((employee, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <Avatar name={`${employee.firstName} ${employee.lastName}`} />
                  <div>
                    <p className="font-medium text-foreground">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="email-link text-sm">@{employee.email}</p>
                  </div>
                </div>
              </td>
              <td className="employee-id">{employee.id}</td>
              <td className="text-center">{employee.assignedLeads}</td>
              <td className="text-center">{employee.closedLeads}</td>
              <td>
                <StatusBadge status={employee.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
