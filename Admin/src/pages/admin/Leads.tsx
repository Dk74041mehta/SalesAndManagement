import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Upload, X, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Lead {
  no: number;
  name: string;
  email: string;
  source: string;
  date: string;
  location: string;
  language: string;
  assignedTo: string;
  status: string;
  type: string;
  scheduledDate: string;
}

const mockLeads: Lead[] = [
  {
    no: 1,
    name: "John Smith",
    email: "johnsmit@gmail.com",
    source: "Referral",
    date: "08-12-2025",
    location: "Mumbai",
    language: "English",
    assignedTo: "47f5-2g6t-t6hhu",
    status: "Ongoing",
    type: "Warm",
    scheduledDate: "12-12-2025",
  },
  {
    no: 2,
    name: "Sarthak Pal",
    email: "sarthakpal08@gmail.com",
    source: "Referral",
    date: "08-12-2025",
    location: "Mumbai",
    language: "Marathi",
    assignedTo: "47f5-2g6t-t6hhu",
    status: "Ongoing",
    type: "Warm",
    scheduledDate: "12-12-2025",
  },
];

const AdminLeads = () => {
  const [showAddManualModal, setShowAddManualModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAddManualModal(true)}>
            Add Manually
          </Button>
          <Button onClick={() => setShowCsvModal(true)} className="bg-primary">
            Add CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="bg-background">
        <CardContent className="pt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Scheduled Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeads.map((lead, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.date}</TableCell>
                  <TableCell>{lead.location}</TableCell>
                  <TableCell>{lead.language}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{lead.assignedTo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-primary border-primary">
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-accent text-accent-foreground">
                      {lead.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.scheduledDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
              <Button
                key={idx}
                variant={page === currentPage ? "default" : "ghost"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add New Lead Modal - Figma Design */}
      <Dialog open={showAddManualModal} onOpenChange={setShowAddManualModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Sarthak Pal" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Sarthakpal08@gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input id="source" placeholder="Referral" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" defaultValue="2025-10-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Mumbai" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Input id="language" placeholder="Marathi" />
            </div>
            <Button type="submit" className="w-full bg-primary">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* CSV Upload Modal */}
      <Dialog open={showCsvModal} onOpenChange={setShowCsvModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              CSV Upload
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Add your documents here</p>
            
            {!isUploading && uploadProgress === 0 ? (
              <div
                className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => {
                  setUploadedFile("Sample File.csv");
                  handleFileUpload();
                }}
              >
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag your file(s) to start uploading
                </p>
                <p className="text-xs text-muted-foreground mt-2">OR</p>
                <Button variant="link" size="sm" className="mt-1">
                  Browse files
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{uploadedFile}</p>
                    {isUploading && (
                      <p className="text-xs text-muted-foreground">Verifying...</p>
                    )}
                  </div>
                  {!isUploading && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setUploadedFile(null);
                        setUploadProgress(0);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowCsvModal(false);
                  setUploadedFile(null);
                  setUploadProgress(0);
                  setIsUploading(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                disabled={!uploadedFile || isUploading}
              >
                {isUploading ? "Uploading..." : uploadProgress === 100 ? "Upload" : "Next"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLeads;
