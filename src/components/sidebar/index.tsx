import {
  FileBarChart,
  CheckSquare,
  Briefcase,
  LogOut,
  User,
  Settings,
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
import { Link } from "react-router-dom";

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
  const isCollapsed = state === "collapsed";

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
                      Enterprise
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
                      <p className="text-sm font-medium">Admin</p>
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
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    <span>Appearance</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 size-4" />
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
                      <span className="font-medium">Admin</span>
                      <span className="text-xs text-muted-foreground">
                        example.com
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
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
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
    </Sidebar>
  );
}
