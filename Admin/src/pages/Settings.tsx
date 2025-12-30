import { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [formData, setFormData] = useState({
    firstName: 'Sarthak',
    lastName: 'Pal',
    email: 'Sarthakpal08@gmail.com',
    password: '',
    confirmPassword: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Settings saved',
      description: 'Your profile has been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={['Home', 'Settings']} />

      <div className="bg-card border border-border rounded-xl p-6 animate-fade-in">
        <div className="border-b border-border pb-4 mb-6">
          <h2 className="text-lg font-medium text-foreground">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md space-y-5">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">First name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="crm-input"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Last name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="crm-input"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="crm-input"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="crm-input"
              placeholder="••••••••••••"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="crm-input"
              placeholder="••••••••••••"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="crm-button bg-muted text-foreground px-8">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
