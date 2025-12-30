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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Employee {
  name: string;
  id: string;
  assigned: number;
  closed: number;
  status: "Active" | "Inactive";
}

const mockEmployees: Employee[] = [
  { name: "Tanner Finsha", id: "#23454GH6J7YT6", assigned: 5, closed: 2, status: "Active" },
  { name: "Emeto Winner", id: "#23454GH6J7YT6", assigned: 3, closed: 1, status: "Active" },
  { name: "Tassy Omah", id: "#23454GH6J7YT6", assigned: 5, closed: 0, status: "Inactive" },
  { name: "James Muriel", id: "#23454GH6J7YT6", assigned: 2, closed: 0, status: "Inactive" },
  { name: "Emeto Winner", id: "#23454GH6J7YT6", assigned: 1, closed: 0, status: "Inactive" },
  { name: "Tassy Omah", id: "#23454GH6J7YT6", assigned: 8, closed: 3, status: "Active" },
  { name: "James Muriel", id: "#23454GH6J7YT6", assigned: 6, closed: 4, status: "Active" },
  { name: "Emeto Winner", id: "#23454GH6J7YT6", assigned: 4, closed: 0, status: "Inactive" },
];

const AdminEmployees = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <Button onClick={() => setShowAddModal(true)} className="bg-primary">
          Add Employees
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-background">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Assigned Leads</TableHead>
                <TableHead>Closed Leads</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmployees.map((emp, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {emp.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      {emp.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{emp.id}</TableCell>
                  <TableCell>{emp.assigned}</TableCell>
                  <TableCell>{emp.closed}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        emp.status === "Active"
                          ? "bg-success text-success-foreground"
                          : "bg-destructive/10 text-destructive"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>
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

      {/* Add Employee Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Sarthak" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Pal" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Sarthakpal08@gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-primary">✓</span>
              Lead will be assigned on biases on language
            </p>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEmployees;
