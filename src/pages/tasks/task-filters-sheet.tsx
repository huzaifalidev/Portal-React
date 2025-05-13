"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/tasks/calendar";
import { Checkbox } from "@/components/ui/tasks/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface TaskFiltersSheetProps {
  statusFilters: string[];
  setStatusFilters: React.Dispatch<React.SetStateAction<string[]>>;
  priorityFilters: string[];
  setPriorityFilters: React.Dispatch<React.SetStateAction<string[]>>;
  clientFilters: string[];
  setClientFilters: React.Dispatch<React.SetStateAction<string[]>>;
  dateRangeFilter: { from?: Date; to?: Date };
  setDateRangeFilter: React.Dispatch<
    React.SetStateAction<{ from?: Date; to?: Date }>
  >;
  tagFilters: string[];
  setTagFilters: React.Dispatch<React.SetStateAction<string[]>>;
  availableTags: string[];
  uniqueClients: string[];
  uniqueStatuses: string[];
  onClearFilters: () => void;
}

export default function TaskFiltersSheet({
  statusFilters,
  setStatusFilters,
  priorityFilters,
  setPriorityFilters,
  clientFilters,
  setClientFilters,
  dateRangeFilter,
  setDateRangeFilter,
  tagFilters,
  setTagFilters,
  availableTags,
  uniqueClients,
  uniqueStatuses,
  onClearFilters,
}: TaskFiltersSheetProps) {
  const toggleStatusFilter = (status: string) => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => s !== status));
    } else {
      setStatusFilters([...statusFilters, status]);
    }
  };

  const togglePriorityFilter = (priority: string) => {
    if (priorityFilters.includes(priority)) {
      setPriorityFilters(priorityFilters.filter((p) => p !== priority));
    } else {
      setPriorityFilters([...priorityFilters, priority]);
    }
  };

  const toggleClientFilter = (client: string) => {
    if (clientFilters.includes(client)) {
      setClientFilters(clientFilters.filter((c) => c !== client));
    } else {
      setClientFilters([...clientFilters, client]);
    }
  };

  const toggleTagFilter = (tag: string) => {
    if (tagFilters.includes(tag)) {
      setTagFilters(tagFilters.filter((t) => t !== tag));
    } else {
      setTagFilters([...tagFilters, tag]);
    }
  };

  return (
    <div className="flex flex-col space-y-6 pb-4">
      {/* Status Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Status</h3>
          {statusFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStatusFilters([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {uniqueStatuses.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={statusFilters.includes(status)}
                onCheckedChange={() => toggleStatusFilter(status)}
              />
              <Label
                htmlFor={`status-${status}`}
                className="text-sm font-normal"
              >
                {status}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Priority Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Priority</h3>
          {priorityFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPriorityFilters([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {["high", "medium", "low"].map((priority) => (
            <div key={priority} className="flex items-center space-x-2">
              <Checkbox
                id={`priority-${priority}`}
                checked={priorityFilters.includes(priority)}
                onCheckedChange={() => togglePriorityFilter(priority)}
              />
              <Label
                htmlFor={`priority-${priority}`}
                className="flex items-center space-x-2 text-sm font-normal"
              >
                {priority === "high" && (
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                )}
                {priority === "medium" && (
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                )}
                {priority === "low" && (
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                )}
                <span>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Date Range Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Date Range</h3>
          {(dateRangeFilter.from || dateRangeFilter.to) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDateRangeFilter({})}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="rounded-md border p-3">
          <Calendar
            mode="range"
            selected={{
              from: dateRangeFilter.from,
              to: dateRangeFilter.to,
            }}
            onSelect={(range) => {
              setDateRangeFilter(range || {});
            }}
            className="mx-auto"
          />
          <div className="mt-3 text-center text-sm text-muted-foreground">
            {dateRangeFilter.from ? (
              dateRangeFilter.to ? (
                <>
                  From{" "}
                  <span className="font-medium">
                    {format(dateRangeFilter.from, "PPP")}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {format(dateRangeFilter.to, "PPP")}
                  </span>
                </>
              ) : (
                <>
                  From{" "}
                  <span className="font-medium">
                    {format(dateRangeFilter.from, "PPP")}
                  </span>
                </>
              )
            ) : dateRangeFilter.to ? (
              <>
                Until{" "}
                <span className="font-medium">
                  {format(dateRangeFilter.to, "PPP")}
                </span>
              </>
            ) : (
              "Select a date range"
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Client Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Clients</h3>
          {clientFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setClientFilters([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="max-h-[200px] overflow-y-auto space-y-3">
          {uniqueClients.map((client) => (
            <div key={client} className="flex items-center space-x-2">
              <Checkbox
                id={`client-${client}`}
                checked={clientFilters.includes(client)}
                onCheckedChange={() => toggleClientFilter(client)}
              />
              <Label
                htmlFor={`client-${client}`}
                className="text-sm font-normal"
              >
                {client}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Tags Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Tags</h3>
          {tagFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setTagFilters([])}>
              Clear
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {availableTags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={`tag-${tag}`}
                checked={tagFilters.includes(tag)}
                onCheckedChange={() => toggleTagFilter(tag)}
              />
              <Label htmlFor={`tag-${tag}`} className="text-sm font-normal">
                {tag}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={onClearFilters} variant="outline" className="w-full">
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}
