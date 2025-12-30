import { mockActivities } from '@/data/mockData';

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins} minutes ago`;
  }
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

export function RecentActivityFeed() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity Feed</h3>
      <div className="space-y-4 max-h-48 overflow-y-auto">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-2">
            <span className="text-muted-foreground mt-1.5">•</span>
            <div>
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">– {formatTimeAgo(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
