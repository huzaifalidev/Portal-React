import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/tasks/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/tasks/avatar";
import { Progress } from "@/components/ui/tasks/progress";
import {
  Calendar,
  Clock,
  Edit,
  MessageSquare,
  Paperclip,
  Tag,
  User,
} from "lucide-react";
import type { Task } from "@/pages/tasks/index";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tasks/tabs";

interface TaskDetailsDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskDetailsDialog({
  task,
  isOpen,
  onClose,
}: TaskDetailsDialogProps) {
  // Add debug log
  console.log("Opening task details:", task._id, task.title);

  // Ensure task has all required properties with fallbacks
  const safeTask = {
    ...task,
    title: task.title || "Untitled Task",
    clientName: task.clientName || "Unknown Client",
    description: task.description || "No description provided for this task.",
    taskApproval: task.taskApproval || "pending",
    priority: task.priority || "medium",
    tags: task.tags || [],
    comments: task.comments || [],
    attachments: task.attachments || [],
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

  const getPriorityBadge = (priority: string | undefined) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return <Badge className="bg-red-500">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";

    try {
      return format(new Date(dateString), "PPP p");
    } catch (error) {
      console.error("Invalid date format:", dateString, error);
      return "Invalid date";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{safeTask.title}</DialogTitle>
            <Badge className={getStatusColor(safeTask.taskApproval)}>
              {safeTask.taskApproval}
            </Badge>
          </div>
          <DialogDescription>Task ID: {safeTask._id}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Main content - left side */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                {/* Description */}
                <div>
                  <h3 className="mb-2 font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {safeTask.description ||
                      "No description provided for this task."}
                  </p>
                </div>

                <Separator />

                {/* Progress */}
                {safeTask.completionPercentage !== undefined && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Progress</h3>
                      <span className="text-sm font-medium">
                        {safeTask.completionPercentage}%
                      </span>
                    </div>
                    <Progress
                      value={safeTask.completionPercentage}
                      className="h-2"
                    />
                  </div>
                )}

                {/* Attachments */}
                {safeTask.attachments && safeTask.attachments.length > 0 ? (
                  <div>
                    <h3 className="mb-2 font-medium">Attachments</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {safeTask.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center rounded-md border p-2 text-sm"
                        >
                          <Paperclip className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-2 font-medium">Attachments</h3>
                    <p className="text-sm text-muted-foreground">
                      No attachments for this task.
                    </p>
                  </div>
                )}

                {/* Tags */}
                {safeTask.tags && safeTask.tags.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-medium">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {safeTask.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="comments" className="space-y-4 pt-4">
                {safeTask.comments && safeTask.comments.length > 0 ? (
                  <div className="space-y-4">
                    {safeTask.comments.map((comment, index) => (
                      <div key={index} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>
                                {comment.user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{comment.user}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(comment.timestamp)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No Comments Yet
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      There are no comments on this task yet.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4 pt-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full border">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">System</span> created this
                        task
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(safeTask.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full border">
                      <Tag className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">System</span> set status
                        to{" "}
                        <Badge
                          className={getStatusColor(safeTask.taskApproval)}
                          variant="secondary"
                        >
                          {safeTask.taskApproval}
                        </Badge>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(safeTask.createdAt)}
                      </p>
                    </div>
                  </div>

                  {safeTask.updatedAt && (
                    <div className="flex items-start">
                      <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full border">
                        <Edit className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">System</span> updated
                          this task
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(safeTask.updatedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - right side */}
          <div className="space-y-6 rounded-lg border p-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Client</h3>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {safeTask.clientName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{safeTask.clientName}</p>
                  <p className="text-xs text-muted-foreground">Client</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-sm font-medium">Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>
                    <Badge
                      className={getStatusColor(safeTask.taskApproval)}
                      variant="secondary"
                    >
                      {safeTask.taskApproval}
                    </Badge>
                  </dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Priority</dt>
                  <dd>{getPriorityBadge(safeTask.priority)}</dd>
                </div>

                {safeTask.category && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd>{safeTask.category}</dd>
                  </div>
                )}

                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {format(new Date(safeTask.createdAt), "PP")}
                  </dd>
                </div>

                {safeTask.deadline && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Deadline</dt>
                    <dd className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {format(new Date(safeTask.deadline), "PP")}
                    </dd>
                  </div>
                )}

                {safeTask.assignee && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Assignee</dt>
                    <dd>{safeTask.assignee}</dd>
                  </div>
                )}
              </dl>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button className="w-full" variant="default">
                Update Status
              </Button>
              <Button className="w-full" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
