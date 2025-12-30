import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  greeting?: string;
  name?: string;
  showBack?: boolean;
}

const PageHeader = ({ title, greeting, name, showBack = false }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-primary-foreground px-5 pt-12 pb-6 rounded-b-[2rem]">
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-primary-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="font-medium">{title}</span>
        </button>
      ) : (
        <div>
          {greeting && <p className="text-sm opacity-90">{greeting}</p>}
          {name && <h1 className="text-xl font-semibold mt-1">{name}</h1>}
          {!greeting && !name && <h1 className="text-xl font-semibold">{title}</h1>}
        </div>
      )}
    </div>
  );
};

export default PageHeader;