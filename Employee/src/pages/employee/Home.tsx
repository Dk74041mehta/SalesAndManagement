import { useState } from "react";
import PageHeader from "@/components/employee/PageHeader";

interface BreakRecord {
  id: string;
  breakStart: string;
  breakEnd: string;
  date: string;
}

const EmployeeHome = () => {
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [currentBreakStart, setCurrentBreakStart] = useState<string | null>(null);

  const [breakRecords] = useState<BreakRecord[]>([
    { id: "1", breakStart: "01:25 pm", breakEnd: "02:15 PM", date: "10/04/25" },
    { id: "2", breakStart: "01:00 pm", breakEnd: "02:05 PM", date: "09/04/25" },
    { id: "3", breakStart: "01:05 pm", breakEnd: "02:30 PM", date: "08/04/25" },
    { id: "4", breakStart: "01:10 pm", breakEnd: "02:00 PM", date: "07/04/25" },
  ]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).toUpperCase();
  };

  const handleCheckIn = () => {
    if (!checkInTime) {
      setCheckInTime(formatTime(new Date()));
    }
  };

  const handleCheckOut = () => {
    if (checkInTime && !checkOutTime) {
      setCheckOutTime(formatTime(new Date()));
    }
  };

  const handleBreakToggle = () => {
    if (!isOnBreak) {
      setIsOnBreak(true);
      setCurrentBreakStart(formatTime(new Date()));
    } else {
      setIsOnBreak(false);
      setCurrentBreakStart(null);
    }
  };

  const isCheckedIn = !!checkInTime;
  const isCheckedOut = !!checkOutTime;

  return (
    <div>
      <PageHeader greeting={getGreeting()} name="Rajesh Mehta" title="" />

      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Timings</h2>

        {/* Check In/Out Card */}
        <div 
          className="bg-primary rounded-2xl p-4 flex items-center justify-between mb-4 cursor-pointer"
          onClick={!isCheckedIn ? handleCheckIn : (!isCheckedOut ? handleCheckOut : undefined)}
        >
          <div className="flex gap-10">
            <div>
              <p className="text-primary-foreground/70 text-sm">
                {isCheckedIn ? "Checked-In" : "Check in"}
              </p>
              <p className="text-primary-foreground font-medium">
                {checkInTime || "--:-- __"}
              </p>
            </div>
            <div>
              <p className="text-primary-foreground/70 text-sm">Check Out</p>
              <p className="text-primary-foreground font-medium">
                {checkOutTime || "--:-- __"}
              </p>
            </div>
          </div>
          <div 
            className={`w-8 h-14 rounded-full flex flex-col items-center justify-center transition-colors ${
              isCheckedOut ? "bg-destructive" : isCheckedIn ? "bg-success" : "bg-primary-foreground/20"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-primary-foreground" />
          </div>
        </div>

        {/* Break Card */}
        {isCheckedIn && !isCheckedOut && (
          <div 
            className="bg-muted rounded-2xl p-4 flex items-center justify-between mb-4 cursor-pointer border border-border"
            onClick={handleBreakToggle}
          >
            <div>
              <p className="text-foreground font-medium">Break</p>
              <p className="text-muted-foreground">
                {isOnBreak ? currentBreakStart : "--:-- __"}
              </p>
            </div>
            <div 
              className={`w-8 h-14 rounded-full flex flex-col items-center justify-center transition-colors ${
                isOnBreak ? "bg-accent" : "bg-border"
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-background" />
            </div>
          </div>
        )}

        {/* Break Records Table */}
        {breakRecords.length > 0 && (
          <div className="bg-muted rounded-2xl border border-border overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              {breakRecords.map((record, index) => (
                <div 
                  key={record.id} 
                  className={`grid grid-cols-3 gap-4 p-4 ${
                    index !== breakRecords.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div>
                    <p className="text-muted-foreground text-xs">Break</p>
                    <p className="text-foreground font-medium">{record.breakStart}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Ended</p>
                    <p className="text-foreground font-medium">{record.breakEnd}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="text-foreground font-medium">{record.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHome;