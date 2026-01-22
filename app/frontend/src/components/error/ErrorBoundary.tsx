import React, { Component, ErrorInfo, ReactNode } from 'react';

interface FallbackProps {
    error: Error;
    errorInfo: ErrorInfo;
}
interface ErrorBoundaryProps {
    children: ReactNode;
    FallbackComponent: React.ComponentType<FallbackProps>;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: undefined,
        errorInfo: undefined
    };

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log("ErrorBoundary caught an error")
        console.log("error is: ", error)
        console.log("errorInfo is: ", errorInfo)
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render(): ReactNode {
        if (this.state.hasError && this.state.error) {
            const { FallbackComponent } = this.props;
            const { error, errorInfo } = this.state;
            // @ts-ignore
            return <FallbackComponent error={error} errorInfo={errorInfo} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;