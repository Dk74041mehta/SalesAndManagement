import { useState } from "react";
import PageHeader from "@/components/employee/PageHeader";
import { Search } from "lucide-react";

const EmployeeLeads = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <PageHeader title="Leads" showBack />

      <div className="px-5 py-4">
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3 border border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Empty State / Lead List */}
        <div className="mt-8 text-center text-muted-foreground">
          <p>No leads assigned yet</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeads;