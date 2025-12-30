import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual authentication
    navigate("/employee/home");
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        {/* Logo */}
        <h1 className="text-2xl font-semibold">
          <span className="text-primary-foreground">Canova</span>
          <span className="text-accent">CRM</span>
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/90 border-0 text-foreground placeholder:text-muted-foreground rounded-lg h-12"
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background/90 border-0 text-foreground placeholder:text-muted-foreground rounded-lg h-12"
          />
          <Button
            type="submit"
            variant="secondary"
            className="mx-auto px-8 rounded-full font-medium"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;