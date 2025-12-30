interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge ${status === 'active' ? 'status-active' : 'status-inactive'}`}>
      <span className="status-dot" />
      <span className="capitalize">{status === 'active' ? 'Active' : 'Inactive'}</span>
    </span>
  );
}
