export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  language: string;
  assignedLeads: number;
  closedLeads: number;
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: Date;
}

export interface Lead {
  id: string;
  no: number;
  name: string;
  email: string;
  source: string;
  date: string;
  location: string;
  language: string;
  assignedTo: string;
  status: 'Ongoing' | 'Closed' | 'Pending';
  type: 'Hot' | 'Warm' | 'Cold';
  scheduledDate?: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  message: string;
  timestamp: Date;
  type: 'lead_assigned' | 'lead_updated' | 'employee_created' | 'deal_closed';
}

export interface DashboardStats {
  unassignedLeads: number;
  assignedThisWeek: number;
  activeSalespeople: number;
  conversionRate: number;
}

export interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
