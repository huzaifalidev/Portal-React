import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "../theme-provider";

function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="dark:bg-zinc-600 bg-zinc-200 text-zinc-800 dark:text-zinc-200">
      <nav className="container mx-auto flex justify-around p-4 text-lg items-center">
        <Link to="/">Home</Link> | <Link to="/about">About</Link>|{" "}
        <Link to="/contact">Contact</Link> | <Link to="/signin">Sign In</Link> |{" "}
        <div className="flex items-center space-x-2">
          <Switch
            id="theme-toggle"
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
