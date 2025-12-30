import { useState } from 'react';
import { X } from 'lucide-react';
import { languages, locations } from '@/data/mockData';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    email: string;
    source: string;
    date: string;
    location: string;
    language: string;
  }) => void;
}

const sources = ['Referral', 'Website', 'Social Media', 'Email Campaign', 'Cold Call'];

export function AddLeadModal({ isOpen, onClose, onSave }: AddLeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: '',
    date: '',
    location: '',
    language: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', email: '', source: '', date: '', location: '', language: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg mx-4 animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Lead</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <label className="block text-sm text-muted-foreground mb-2">Source</label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="crm-select"
              required
            >
              <option value="">Select source</option>
              {sources.map((src) => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
            <label className="block text-sm text-muted-foreground mb-2">Language</label>
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
