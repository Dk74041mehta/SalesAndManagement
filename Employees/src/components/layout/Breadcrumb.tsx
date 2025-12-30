import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: string[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          <span className={index === items.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}
