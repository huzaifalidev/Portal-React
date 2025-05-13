"use client";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/tasks/card";
import { Avatar, AvatarFallback } from "@/components/ui/tasks/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Progress } from "@/components/ui/tasks/progress";
import type { Task } from "./index";

interface TaskCardProps {
  task: Task;
  view: string;
  onViewDetails: () => void;
}

export function TaskCard({ task, view, onViewDetails }: TaskCardProps) {
  // Add debug log
  console.log("Rendering task card:", task._id, task.title);

  // Ensure task has all required properties with fallbacks
  const safeTask = {
    ...task,
    title: task.title || "Untitled Task",
    clientName: task.clientName || "Unknown Client",
    description: task.description || "No description available",
    taskApproval: task.taskApproval || "pending",
    priority: task.priority || "medium",
    tags: task.tags || [],
    completionPercentage:
      task.completionPercentage !== undefined ? task.completionPercentage : 0,
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const getPriorityColor = (priority: string | undefined) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getPriorityBadge = (priority: string | undefined) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";

    try {
      return format(new Date(dateString), "PP");
    } catch (error) {
      console.error("Invalid date format:", dateString, error);
      return "Invalid date";
    }
  };

  if (view === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-1 flex-col p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{safeTask.title}</h3>
                  {getPriorityBadge(safeTask.priority)}
                </div>
                <p className="mt-1 text-sm text-muted-foreground truncate">
                  {safeTask.description || "No description available"}
                </p>
              </div>
              <Badge className={getStatusColor(safeTask.taskApproval)}>
                {safeTask.taskApproval}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {safeTask.clientName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{safeTask.clientName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(safeTask.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>ID: {safeTask._id.substring(0, 8)}...</span>
              </div>
            </div>
            {safeTask.completionPercentage !== undefined && (
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span>Progress</span>
                  <span>{safeTask.completionPercentage}%</span>
                </div>
                <Progress
                  value={safeTask.completionPercentage}
                  className="h-2"
                />
              </div>
            )}
            {safeTask.tags && safeTask.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {safeTask.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 bg-muted/30 p-4 sm:w-[120px] sm:flex-col sm:items-stretch">
            <Button
              size="sm"
              variant="ghost"
              className="w-full"
              onClick={onViewDetails}
            >
              <Eye className="mr-1 h-4 w-4" />
              View
            </Button>
            <Button size="sm" variant="ghost" className="w-full">
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Change Status</DropdownMenuItem>
                <DropdownMenuItem>Assign to Agent</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {safeTask.clientName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{safeTask.clientName}</span>
          </div>
          <Badge className={getStatusColor(safeTask.taskApproval)}>
            {safeTask.taskApproval}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <h3 className="line-clamp-2 font-medium">{safeTask.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {safeTask.description || "No description available"}
        </p>

        <div className="mt-3 flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-3.5 w-3.5" />
          <span>{formatDate(safeTask.createdAt)}</span>
        </div>

        {safeTask.completionPercentage !== undefined && (
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span>Progress</span>
              <span>{safeTask.completionPercentage}%</span>
            </div>
            <Progress value={safeTask.completionPercentage} className="h-1.5" />
          </div>
        )}

        {safeTask.tags && safeTask.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {safeTask.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          {getPriorityBadge(safeTask.priority)}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={onViewDetails}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
