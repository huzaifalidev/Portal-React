"use client";

import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";

import {
  RefreshCw,
  DollarSign,
  AlertCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  User,
  BadgeIcon as IdCard,
  CalendarCheck,
  CalendarClock,
  X,
  Calendar,
  IdCardIcon,
} from "lucide-react";
import CustomDrawer from "@/components/drawer";
import { showErrorToast, showSuccessToast } from "@/components/toasts";
import type { DrawerProps } from "antd";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/tasks/card";
import { Badge } from "@/components/ui/tasks/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TaskPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps["placement"]>("right");
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.loading.isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [dateOrder, setDateOrder] = useState("");

  const showDrawer = (task: any) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const fuse = new Fuse(tasks, {
    keys: ["clientName", "title"],
    threshold: 0.3,
  });

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const getApprovalBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge style={{ backgroundColor: "#22c55e" }}>Approved</Badge>;
      case "pending":
        return <Badge style={{ backgroundColor: "#ef4444" }}>Pending</Badge>;
      case "completed":
        return <Badge style={{ backgroundColor: "#3b82f6" }}>Completed</Badge>;
      case "in-progress":
        return (
          <Badge style={{ backgroundColor: "#f59e0b" }}>In Progress</Badge>
        );
      default:
        return <Badge className="bg-zinc-950">{status}</Badge>;
    }
  };

  const taskHandler = async (
    filter = statusFilter,
    page = currentPage,
    limit = itemsPerPage,
    sort = sortOrder,
    order = dateOrder
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (filter !== "all") {
        queryParams.append("taskApproval", filter);
      }
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      queryParams.append("sortBy", sort);
      queryParams.append("time", order);
      const response = await axios.get(
        `http://localhost:5001/taskMate/admin/getTasks?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log(queryParams.toString());
      if (response.status === 200) {
        setTasks(response.data.tasks);
        setTotalPages(
          response.data.totalPages ||
            Math.ceil(response.data.totalCount / limit) ||
            1
        );
        showSuccessToast("Tasks fetched");
      }
    } catch (error) {
      showErrorToast("Error fetching tasks");
    } finally {
    }
  };
  const taskUpdateHandler = async (taskId: string, status: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/taskMate/admin/updateTask/${taskId}`,
        {
          taskApproval: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status === 200) {
        onClose();
        showSuccessToast("Task updated");
      }
      taskHandler(
        statusFilter,
        currentPage,
        itemsPerPage,
        sortOrder,
        dateOrder
      );
    } catch (error) {
      showErrorToast("Error updating task");
    } finally {
    }
  };
  useEffect(() => {
    taskHandler(statusFilter, currentPage, itemsPerPage, sortOrder, dateOrder);
  }, [currentPage, itemsPerPage, statusFilter, sortOrder, dateOrder]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };
  const handleDateOrderChange = (dateOrder: string) => {
    setDateOrder(dateOrder);
  };
  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const statusFilters = [
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in-progress" },
  ];
  const changeTaskStatus = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];
  const itemsPerPageOptions = [5, 10, 20, 50];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return {
          bg: "rgba(34, 197, 94, 0.15)",
          text: "#166534",
          border: "#22c55e",
          indicator: "#22c55e",
        };
      case "in-progress":
        return {
          bg: "rgba(245, 158, 11, 0.15)",
          text: "#92400e",
          border: "#f59e0b",
          indicator: "#f59e0b",
        };
      case "pending":
        return {
          bg: "rgba(239, 68, 68, 0.15)",
          text: "#b91c1c",
          border: "#ef4444",
          indicator: "#ef4444",
        };
      case "completed":
        return {
          bg: "rgba(59, 130, 246, 0.15)",
          text: "#1e40af",
          border: "#3b82f6",
          indicator: "#3b82f6",
        };
      default:
        return {
          bg: "white",
          text: "black",
          border: "#e5e7eb",
          indicator: "#9ca3af",
        };
    }
  };

  // Helper function to get filter button styling based on active state
  const getFilterButtonStyle = (isActive: boolean, colorKey = "") => {
    if (!isActive) return {};

    if (colorKey && colorKey in getStatusColor(colorKey)) {
      const colors = getStatusColor(colorKey);
      return {
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
      };
    }

    return {
      // backgroundColor: "",
      // color: "#1e40af",
      borderColor: "#3b82f6",
    };
  };

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold">Tasks Management</h1>
        <div className="flex flex-wrap items-center justify-between mt-4 mb-6">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <input
              type="search"
              placeholder="Search tasks..."
              className="border rounded-md p-2 w-full md:w-40"
              onChange={(e) => {
                const searchTerm = e.target.value;
                if (searchTerm) {
                  const results = fuse.search(searchTerm);
                  setTasks(results.map((result) => result.item));
                } else {
                  taskHandler();
                }
              }}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-wrap ml-2 gap-2 ">
            {/* Reset Filter Button */}
            <Button
              onClick={() => {
                setStatusFilter("");
                setSortOrder("");
                setDateOrder("");
                taskHandler("all", currentPage, itemsPerPage, "", "");
              }}
              variant="outline"
              style={getFilterButtonStyle(
                statusFilter !== "" || sortOrder !== "" || dateOrder !== ""
              )}
            >
              <X className="h-4 w-4 mr-2" />
              <span>Reset Filters</span>
            </Button>

            {/* Status Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  style={getFilterButtonStyle(
                    statusFilter !== "",
                    statusFilter
                  )}
                >
                  <Filter className="h-4 w-4" />
                  <span>
                    {statusFilter
                      ? statusFilters.find((s) => s.value === statusFilter)
                          ?.label || "Status"
                      : "Status"}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statusFilters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.value}
                    onClick={() => handleStatusFilterChange(filter.value)}
                    className="cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getStatusColor(filter.value)
                            .indicator,
                        }}
                      ></div>
                      <span
                        className={
                          statusFilter === filter.value ? "font-bold" : ""
                        }
                      >
                        {filter.label}
                      </span>
                    </div>
                    {statusFilter === filter.value && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Fare Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  style={getFilterButtonStyle(sortOrder !== "")}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>
                    {sortOrder === "lowest"
                      ? " Lowest"
                      : sortOrder === "highest"
                      ? "Highest"
                      : "Fare"}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort by Fare</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => handleSortOrderChange("lowest")}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span className={sortOrder === "lowest" ? "font-bold" : ""}>
                    Lowest
                  </span>
                  {sortOrder === "lowest" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleSortOrderChange("highest")}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span className={sortOrder === "highest" ? "font-bold" : ""}>
                    Highest
                  </span>
                  {sortOrder === "highest" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleSortOrderChange("")}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span className={sortOrder === "" ? "font-bold" : ""}>
                    None
                  </span>
                  {sortOrder === "" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Date Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  style={getFilterButtonStyle(dateOrder !== "")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>
                    {dateOrder === "newest"
                      ? "Newest"
                      : dateOrder === "oldest"
                      ? "Oldest"
                      : "Date"}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort by Date</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer flex items-center justify-between"
                  onClick={() => handleDateOrderChange("newest")}
                >
                  <span className={dateOrder === "newest" ? "font-bold" : ""}>
                    Newest
                  </span>
                  {dateOrder === "newest" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer flex items-center justify-between"
                  onClick={() => handleDateOrderChange("oldest")}
                >
                  <span className={dateOrder === "oldest" ? "font-bold" : ""}>
                    Oldest
                  </span>
                  {dateOrder === "oldest" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Items per page dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span>Show: {itemsPerPage}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Items per page</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {itemsPerPageOptions.map((limit) => (
                  <DropdownMenuItem
                    key={limit}
                    className="cursor-pointer flex items-center justify-between"
                    onClick={() => handleItemsPerPageChange(limit)}
                  >
                    <span className={itemsPerPage === limit ? "font-bold" : ""}>
                      {limit}
                    </span>
                    {itemsPerPage === limit && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => {
                taskHandler(
                  statusFilter,
                  1,
                  itemsPerPage,
                  sortOrder,
                  dateOrder
                );
              }}
              variant="outline"
              className="flex items-center gap-2"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Tasks List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-full h-12" />
                ))}
              </div>
            ) : tasks.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>List of all available tasks</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Client</TableHead>
                      <TableHead className="font-semibold">Title</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Deadline
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Fare
                      </TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow
                        key={task._id}
                        onClick={() => showDrawer(task)}
                        className={cn(
                          "cursor-pointer transition-colors",
                          selectedTask?._id === task._id
                            ? "bg-muted/50 border-0 font-semibold"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <TableCell>{task.clientName}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(task.deadline)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          ${task.fare}
                        </TableCell>
                        <TableCell>
                          {getApprovalBadge(task.taskApproval)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>Total Tasks</TableCell>
                      <TableCell>{tasks.length}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="flex items-center"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">
                        Previous
                      </span>
                    </Button>

                    <div className="hidden md:flex gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => handlePageChange(pageNum)}
                              className="w-9 h-9"
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="flex items-center"
                    >
                      <span className="sr-only md:not-sr-only md:mr-2">
                        Next
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-500">No tasks available.</p>
                <Button
                  onClick={() => taskHandler()}
                  variant="outline"
                  className="mt-4"
                >
                  Refresh Tasks
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <CustomDrawer
        title="Task Details"
        placement={placement}
        open={open}
        onClose={onClose}
        width={"38.8%"}
        style={{ zIndex: 1000 }}
        className="overflow-y-auto dark:bg-zinc-900 dark:text-gray-100"
      >
        {selectedTask ? (
          <div className="space-y-6 px-1">
            <div>
              <h2 className="text-2xl font-bold mb-3">{selectedTask.title}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    style={{
                      backgroundColor: getStatusColor(selectedTask.taskApproval)
                        .bg,
                      color: getStatusColor(selectedTask.taskApproval).text,
                      borderColor: getStatusColor(selectedTask.taskApproval)
                        .border,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: getStatusColor(
                          selectedTask.taskApproval
                        ).indicator,
                      }}
                    />
                    <span>
                      {selectedTask.taskApproval === "pending"
                        ? "Pending"
                        : selectedTask.taskApproval === "approved"
                        ? "Approved"
                        : selectedTask.taskApproval === "in-progress"
                        ? "In Progress"
                        : selectedTask.taskApproval === "completed"
                        ? "Completed"
                        : selectedTask.taskApproval}
                    </span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48"
                  style={{ zIndex: 1100 }}
                  forceMount
                >
                  <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {changeTaskStatus.map((filter) => (
                    <DropdownMenuItem
                      key={filter.value}
                      className="cursor-pointer"
                      onClick={() =>
                        taskUpdateHandler(selectedTask._id, filter.value)
                      }
                    >
                      <div className="flex items-center w-full">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor: getStatusColor(filter.value)
                              .indicator,
                          }}
                        />
                        <span>{filter.label}</span>
                        {selectedTask.taskApproval === filter.value && (
                          <Check className="h-4 w-4 ml-auto" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="bg-white dark:bg-zinc-700 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-gray-800 dark:text-gray-100">
                {selectedTask.description}
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-700 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-3">
                Timeline
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <CalendarClock className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Deadline
                    </span>
                  </div>
                  <p className="mt-1 font-semibold">
                    {formatDate(selectedTask.deadline)}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Submitted
                    </span>
                  </div>
                  <p className="mt-1 font-semibold">
                    {formatDate(selectedTask.timeSubmitted)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-700 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-3">
                Client Information
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-24">
                    Name:
                  </span>
                  <span className="font-medium">{selectedTask.clientName}</span>
                </div>
                <div className="flex items-center">
                  <IdCardIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-24">
                    CNIC:
                  </span>
                  <span className="font-medium">{selectedTask.cnicNumber}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-700 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-2">
                Financial Details
              </h3>
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-2xl font-bold">${selectedTask.fare}</span>
              </div>
            </div>

            {selectedTask.images && selectedTask.images.length > 0 && (
              <div className="bg-white dark:bg-zinc-700 rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-3">
                  Attached Images
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedTask.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-md border border-gray-200 dark:border-gray-600"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Task Image ${index + 1}`}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          loading && (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-r-transparent border-l-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 dark:text-gray-400">
                Loading task details...
              </p>
            </div>
          )
        )}
      </CustomDrawer>
    </div>
  );
};

export default TaskPage;
