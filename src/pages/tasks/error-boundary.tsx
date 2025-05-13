"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <AlertTriangle className="h-10 w-10 text-amber-500" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Something went wrong</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <div className="mt-6 flex gap-2">
            <Button onClick={() => window.location.reload()} variant="outline">
              Try again
            </Button>
            <Button
              onClick={() => {
                console.log("Error details:", {
                  error: this.state.error,
                  componentStack: this.state.errorInfo?.componentStack,
                });
                alert("Error details logged to console");
              }}
            >
              Show details
            </Button>
          </div>
          {this.state.errorInfo && (
            <details className="mt-4 max-w-full overflow-auto rounded-md bg-muted p-4 text-left">
              <summary className="cursor-pointer font-mono text-sm font-medium">
                Component Stack
              </summary>
              <pre className="mt-2 max-h-[300px] overflow-auto text-xs">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
