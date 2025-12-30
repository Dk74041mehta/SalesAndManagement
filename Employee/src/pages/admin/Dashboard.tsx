import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const kpiCards = [
  { label: "Unassigned Leads", value: "12" },
  { label: "Assigned This Week", value: "24" },
  { label: "Active Salespeople", value: "5" },
  { label: "Conversion Rate", value: "32%" },
];

const chartData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 50 },
  { name: "May", value: 40 },
  { name: "Jun", value: 55 },
];

const recentActivity = [
  { text: "You assigned a lead to Priya", time: "1 hour ago" },
  { text: "Jay closed a deal", time: "2 hours ago" },
];

const employees = [
  { name: "Tanner Finsha", id: "#23454GH6J7YT6", assigned: 5, closed: 2 },
  { name: "Emeto Winner", id: "#23454GH6J7YT6", assigned: 3, closed: 1 },
  { name: "Emeto Winner", id: "#23454GH6J7YT6", assigned: 8, closed: 3 },
  { name: "Tassy Omah", id: "#23454GH6J7YT6", assigned: 6, closed: 4 },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index} className="bg-background">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-3xl font-bold text-primary mt-1">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Analytics Chart */}
        <Card className="lg:col-span-2 bg-background">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Sale Analytics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="bg-background">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Recent Activity Feed</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance Table */}
      <Card className="bg-background">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Employee Performance</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Assigned Leads</TableHead>
                <TableHead>Closed Leads</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {emp.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      {emp.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{emp.id}</TableCell>
                  <TableCell>{emp.assigned}</TableCell>
                  <TableCell>{emp.closed}</TableCell>
                  <TableCell>
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
