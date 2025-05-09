import {
  FileBarChart,
  CheckSquare,
  Briefcase,
  LogOut,
  User,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { useAlertDialog } from "../alertdialog";
import { showSuccessToast } from "../toasts";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAdmin } from "@/redux/slices/admin";
import { useEffect } from "react";

const navItems = [
  {
    title: "Tasks",
    icon: CheckSquare,
    url: "/tasks",
    isActive: true,
  },
  {
    title: "Portfolios",
    icon: Briefcase,
    url: "/portfolios",
    isActive: false,
  },
  {
    title: "Report",
    icon: FileBarChart,
    url: "/reports",
    isActive: false,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCollapsed = state === "collapsed";
  const { theme, setTheme } = useTheme();
  const { showDialog } = useAlertDialog();

  const handleLogout = () => {
    showDialog({
      title: "Log out?",
      description: "Are you sure you want to log out of your account?",
      onConfirm: () => {
        localStorage.removeItem("adminToken");
        showSuccessToast("Logged out");
        setTimeout(() => {
          navigate("/signin");
        }, 1000)
      },
    });
  };

  const profileHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/taskMate/admin/adminInfo",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status === 200) {
        const { _id, name, email } = response.data.admin;
        dispatch(
          setAdmin({
            admin: { id: _id, name, email },
            isLoggedIn: true,
          })
        );
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    profileHandler();
  }, []);

  const admin = useSelector((state: any) => state.admin);
  console.log(admin.admin.name, "admin from redux");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className={isCollapsed ? "p-2" : "p-3"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className={isCollapsed ? "justify-center" : "gap-3"}
              tooltip={isCollapsed ? "TaskMate" : undefined}
              isActive={true}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-blue-600 text-white">
                <FileBarChart className="size-4" />
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="font-semibold">TaskMate</span>
                    <span className="text-xs text-muted-foreground">
                      Task Management System
                    </span>
                  </div>
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <Link
                      to={item.url}
                      className={
                        isCollapsed
                          ? "justify-center"
                          : "flex justify-start gap-3"
                      }
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="size-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={isCollapsed ? "p-2" : "p-3"}>
        <SidebarMenu>
          <SidebarMenuItem>
            {isCollapsed ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="justify-center"
                    tooltip="Admin"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
                      <img
                        src="https://i.pravatar.cc/40"
                        alt="User Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
                      <img
                        src="https://i.pravatar.cc/40"
                        alt="User Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{
                        JSON.parse(localStorage.getItem("admin") || "{}").name}</p>
                      <p className="text-xs text-muted-foreground">
                        example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 size-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                  >
                    <LogOut
                      onClick={handleLogout}
                      className="mr-2 size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="gap-3">
                    <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
                      <img
                        src="https://i.pravatar.cc/40"
                        alt="User Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="font-medium">{
                        admin.admin.name ||"admin"
                        }</span>
                      <span  
                      style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" , fontSize: "10px"}}
                      className=" text-muted-foreground">
                        {
                          admin.admin.email
                        || "example.com"
                        }
                        </span>
                    </div>
                    <ChevronDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 size-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={toggleTheme}>
                    {theme === "dark" ? (
                      <>
                        <Sun className="mr-2 size-4" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 size-4" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
      <ToastContainer />
    </Sidebar>
  );
}
