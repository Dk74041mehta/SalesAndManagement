import PageHeader from "@/components/employee/PageHeader";

const EmployeeProfile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Profile" showBack />

      <div className="px-5 py-6">
        {/* Profile Avatar and Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-muted rounded-lg border border-border flex items-center justify-center">
            <div className="w-8 h-8 bg-border rounded" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-lg">Rajesh Mehta</h2>
            <p className="text-sm text-muted-foreground">Sales Executive</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="bg-muted rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Employee ID</p>
            <p className="font-medium text-foreground">EMP001</p>
          </div>
          
          <div className="bg-muted rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium text-foreground">rajesh.mehta@company.com</p>
          </div>
          
          <div className="bg-muted rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Language</p>
            <p className="font-medium text-foreground">Hindi, English</p>
          </div>
          
          <div className="bg-muted rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium text-success">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;