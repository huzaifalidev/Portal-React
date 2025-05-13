import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/tasks/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskCardSkeletonProps {
  view: string;
}

export function TaskCardSkeleton({ view }: TaskCardSkeletonProps) {
  if (view === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-1 flex-col p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="w-full">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="mt-2 h-4 w-full" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 bg-muted/30 p-4 sm:w-[120px] sm:flex-col sm:items-stretch">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-8 w-8" />
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
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-5 w-28" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-2/3" />

        <div className="mt-3 flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-1.5 w-full" />
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8" />
      </CardFooter>
    </Card>
  );
}
