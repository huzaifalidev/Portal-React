"use client";

import { useMemo } from "react";
import { CheckCircle2, Clock, AlertCircle, BarChart3 } from "lucide-react";
import { Task } from "@/pages/tasks";
import { Card } from "antd";
import { CardContent } from "./card";

interface TaskSummaryProps {
  tasks: Task[];
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  console.log("Task summary received tasks:", tasks.length);

  const summaryData = useMemo(() => {
    // Handle case where tasks might be undefined or empty
    if (!tasks || tasks.length === 0) {
      console.log("No tasks available for summary");
      return { approved: 0, pending: 0, rejected: 0, total: 0 };
    }

    const approved = tasks.filter(
      (task) =>
        task.taskApproval && task.taskApproval.toLowerCase() === "approved"
    ).length;

    const pending = tasks.filter(
      (task) =>
        task.taskApproval && task.taskApproval.toLowerCase() === "pending"
    ).length;

    const rejected = tasks.filter(
      (task) =>
        task.taskApproval && task.taskApproval.toLowerCase() === "rejected"
    ).length;

    const total = tasks.length;

    console.log("Task summary calculated:", {
      approved,
      pending,
      rejected,
      total,
    });
    return { approved, pending, rejected, total };
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </p>
            <h3 className="text-2xl font-bold">{summaryData.total}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">
              Approved
            </p>
            <h3 className="text-2xl font-bold">{summaryData.approved}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
            <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <h3 className="text-2xl font-bold">{summaryData.pending}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">
              Rejected
            </p>
            <h3 className="text-2xl font-bold">{summaryData.rejected}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
