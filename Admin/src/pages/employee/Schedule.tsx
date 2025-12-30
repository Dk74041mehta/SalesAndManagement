import { useState } from "react";
import PageHeader from "@/components/employee/PageHeader";
import { Search, SlidersHorizontal } from "lucide-react";

const EmployeeSchedule = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <PageHeader title="Schedule" showBack />

      <div className="px-5 py-4">
        {/* Search Bar with Filter */}
        <div className="flex gap-3 items-center">
          <div className="flex-1 flex items-center gap-3 bg-muted rounded-xl px-4 py-3 border border-border">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button className="p-3 rounded-xl border border-border bg-muted text-muted-foreground hover:bg-border transition-colors">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Empty State */}
        <div className="mt-8 text-center text-muted-foreground">
          <p>No scheduled items</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSchedule;