import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { languages, locations } from '@/data/mockData';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    language: string;
  }) => void;
}

export function AddEmployeeModal({ isOpen, onClose, onSave }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    language: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ firstName: '', lastName: '', email: '', location: '', language: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg mx-4 animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Employee</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">First name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="crm-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Last name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="crm-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="crm-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Location</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="crm-select"
              required
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
              Preferred Language
              <div className="group relative">
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-foreground text-background text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Lead will be assigned on biases on language
                </div>
              </div>
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="crm-select"
              required
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
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
