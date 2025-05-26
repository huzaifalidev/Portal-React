"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bell,
  Search,
  Users,
  CheckSquare,
  Briefcase,
  FileText,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
} from "lucide-react"
import { TaskCompletionChart } from "@/components/ui/task-completion-chart"
import { TaskStatusChart } from "@/components/ui/task-status-chart"
import { PortfolioPerformanceChart } from "@/components/ui/portfolio-performance-chart"
import { ReportsGeneratedChart } from "@/components/ui/reports-generated-chart"

// Mock data
const recentClients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    joinedDate: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@company.com",
    phone: "+1 (555) 987-6543",
    status: "Pending",
    joinedDate: "2024-01-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@business.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    joinedDate: "2024-01-13",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.t@enterprise.com",
    phone: "+1 (555) 321-0987",
    status: "Inactive",
    joinedDate: "2024-01-12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const recentTasks = [
  {
    id: 1,
    title: "Complete client onboarding documentation",
    description: "Finalize all required documents for new client setup",
    dueDate: "2024-01-20",
    assignedTo: "John Doe",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    title: "Review portfolio performance metrics",
    description: "Analyze Q4 performance data and prepare summary report",
    dueDate: "2024-01-18",
    assignedTo: "Jane Smith",
    status: "Completed",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Update service provider contracts",
    description: "Renew and update existing service provider agreements",
    dueDate: "2024-01-25",
    assignedTo: "Mike Wilson",
    status: "Pending",
    priority: "Low",
  },
  {
    id: 4,
    title: "Generate monthly compliance report",
    description: "Compile compliance data for regulatory submission",
    dueDate: "2024-01-22",
    assignedTo: "Sarah Davis",
    status: "In Progress",
    priority: "High",
  },
]

const recentServiceProviders = [
  {
    id: 1,
    name: "TechSolutions Inc.",
    specialization: "IT Infrastructure",
    contact: "contact@techsolutions.com",
    phone: "+1 (555) 111-2222",
    location: "New York, NY",
    onboardedDate: "2024-01-16",
  },
  {
    id: 2,
    name: "Creative Design Studio",
    specialization: "Graphic Design",
    contact: "hello@creativedesign.com",
    phone: "+1 (555) 333-4444",
    location: "Los Angeles, CA",
    onboardedDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Legal Advisory Group",
    specialization: "Legal Services",
    contact: "info@legaladvisory.com",
    phone: "+1 (555) 555-6666",
    location: "Chicago, IL",
    onboardedDate: "2024-01-14",
  },
]

const kpiData = {
  totalTasks: 1247,
  totalPortfolios: 89,
  totalReports: 342,
}

export default function Dashboard() {
  return (
    <div className="min-h-screen dark:*:bg-gray-900  flex flex-col dark: text-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold dark:text-zinc-50 text-zinc-800">Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.totalTasks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolios</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.totalPortfolios}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.totalReports}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskCompletionChart />
          <TaskStatusChart />
          <PortfolioPerformanceChart />
          <ReportsGeneratedChart />
        </div>

        {/* Recent Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Clients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Clients
              </CardTitle>
              <CardDescription>Latest client additions to the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <Avatar>
                    <AvatarImage src={client.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{client.name}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Mail className="h-3 w-3 mr-1" />
                      {client.email}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone className="h-3 w-3 mr-1" />
                      {client.phone}
                    </div>
                  </div>
                  <Badge
                    variant={
                      client.status === "Active" ? "default" : client.status === "Pending" ? "secondary" : "destructive"
                    }
                  >
                    {client.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="h-5 w-5 mr-2" />
                Recent Tasks
              </CardTitle>
              <CardDescription>Latest task updates and assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{task.title}</h4>
                    <Badge
                      variant={
                        task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                      }
                      className="ml-2 shrink-0"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {task.dueDate}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {task.assignedTo}
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.status === "Completed" ? "default" : task.status === "In Progress" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {task.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Service Providers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Recent Service Providers
              </CardTitle>
              <CardDescription>Newly onboarded service providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentServiceProviders.map((provider) => (
                <div key={provider.id} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{provider.name}</h4>
                    <Badge variant="outline" className="ml-2 shrink-0">
                      {provider.specialization}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Mail className="h-3 w-3 mr-1" />
                      {provider.contact}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone className="h-3 w-3 mr-1" />
                      {provider.phone}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {provider.location}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Onboarded: {provider.onboardedDate}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
