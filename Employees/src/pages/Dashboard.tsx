import { Inbox, Users, UserCheck, TrendingUp } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { KPICard } from '@/components/dashboard/KPICard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentActivityFeed } from '@/components/dashboard/RecentActivityFeed';
import { ActiveSalesPeopleTable } from '@/components/dashboard/ActiveSalesPeopleTable';
import { mockDashboardStats } from '@/data/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={['Home', 'Dashboard']} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={Inbox}
          label="Unassigned Leads"
          value={mockDashboardStats.unassignedLeads}
        />
        <KPICard
          icon={Users}
          label="Assigned This Week"
          value={mockDashboardStats.assignedThisWeek}
        />
        <KPICard
          icon={UserCheck}
          label="Active Salespeople"
          value={mockDashboardStats.activeSalespeople}
        />
        <KPICard
          icon={TrendingUp}
          label="Conversion Rate"
          value={`${mockDashboardStats.conversionRate}%`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <RecentActivityFeed />
        </div>
      </div>

      <ActiveSalesPeopleTable />
    </div>
  );
}
