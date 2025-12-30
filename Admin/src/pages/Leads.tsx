import { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { LeadsTable } from '@/components/leads/LeadsTable';
import { AddLeadModal } from '@/components/leads/AddLeadModal';
import { CSVUploadModal } from '@/components/leads/CSVUploadModal';
import { Pagination } from '@/components/ui/CRMPagination';
import { mockLeads } from '@/data/mockData';
import { Lead } from '@/types/crm';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 8;

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const { toast } = useToast();

  const totalPages = Math.max(1, Math.ceil(leads.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = leads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddLead = (data: {
    name: string;
    email: string;
    source: string;
    date: string;
    location: string;
    language: string;
  }) => {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 12),
      no: leads.length + 1,
      ...data,
      date: new Date(data.date).toLocaleDateString('en-GB').replace(/\//g, '-'),
      assignedTo: `${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 4)}`,
      status: 'Ongoing',
      type: 'Warm',
      createdAt: new Date(),
    };
    setLeads([newLead, ...leads]);
    toast({
      title: 'Lead added',
      description: `${data.name} has been added successfully.`,
    });
  };

  const handleCSVUpload = (file: File) => {
    // In a real app, this would parse the CSV and add leads
    toast({
      title: 'CSV uploaded',
      description: `${file.name} has been processed successfully.`,
    });

    // Add mock leads from CSV
    const csvLeads: Lead[] = Array.from({ length: 10 }, (_, i) => ({
      id: Math.random().toString(36).substr(2, 12),
      no: leads.length + i + 1,
      name: 'John Smith',
      email: 'johnsmit@gmail.com',
      source: 'Referral',
      date: '08-12-2025',
      location: 'Mumbai',
      language: 'English',
      assignedTo: '47f5-2g6t-t6hhu',
      status: 'Ongoing' as const,
      type: 'Warm' as const,
      scheduledDate: '12-12-2025',
      createdAt: new Date(),
    }));

    setLeads([...csvLeads, ...leads]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={['Home', 'Leads']} />
        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddModalOpen(true)} className="crm-button">
            Add Manually
          </button>
          <button onClick={() => setIsCSVModalOpen(true)} className="crm-button">
            Add CSV
          </button>
        </div>
      </div>

      <LeadsTable leads={paginatedLeads} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddLead}
      />

      <CSVUploadModal
        isOpen={isCSVModalOpen}
        onClose={() => setIsCSVModalOpen(false)}
        onUpload={handleCSVUpload}
      />
    </div>
  );
}
