import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { salesChartData } from '@/data/mockData';

export function SalesChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-6">Sale Analytics</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesChartData} barSize={20}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {salesChartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.value > 50 ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground) / 0.3)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
