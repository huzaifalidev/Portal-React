import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
function LandingPage() {
  const { theme, setTheme } = useTheme();

  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-800 transition-colors duration-300 ${theme}`}
    >
      <div className="bg-gray-100 dark:bg-zinc-800 text-zinc-900 dark:text-gray-100 scroll-smooth  ">
        <nav className="flex justify-between px-8 py-4 items-center bg-white dark:bg-zinc-600 shadow fixed top-0 left-0 w-full z-50">
          <div className="font-bold text-xl">Logo</div>
          <div className="space-x-6">
            <button
              onClick={() => scrollTo("hero")}
              className="hover:underline"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="hover:underline"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:underline"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="theme-toggle"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </nav>
        <section
          id="hero"
          className="h-screen flex items-center justify-center pt-20"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to Our Landing Page
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              This is a fully integrated landing page built with React &
              Tailwind.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-zinc-600 px-4"
        >
          <div className="text-center max-w-xl">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We’re a team of developers building beautiful user experiences.
              Our mission is to create intuitive and accessible designs that
              make people's lives easier.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center bg-gray-300 dark:bg-zinc-700 px-4"
        >
          <div className="text-center max-w-xl">
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-800 dark:text-gray-200">
              Have questions? Reach out to us at{" "}
              <a
                href="mailto:hello@example.com"
                className="underline text-blue-600 dark:text-blue-400"
              >
                hello@example.com
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-zinc-800 text-center py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} My Company. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
