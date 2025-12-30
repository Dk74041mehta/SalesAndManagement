import { Lead } from '@/types/crm';

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in">
      <table className="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Date</th>
            <th>Location</th>
            <th>Language</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Type</th>
            <th>Scheduled Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center py-12 text-muted-foreground">
                No leads found. Add leads manually or upload a CSV.
              </td>
            </tr>
          ) : (
            leads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.no}</td>
                <td className="font-medium text-foreground">{lead.name}</td>
                <td className="text-muted-foreground">{lead.email}</td>
                <td>{lead.source}</td>
                <td>{lead.date}</td>
                <td>{lead.location}</td>
                <td>{lead.language}</td>
                <td className="text-muted-foreground text-xs">{lead.assignedTo}</td>
                <td>{lead.status}</td>
                <td>{lead.type}</td>
                <td>{lead.scheduledDate || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
