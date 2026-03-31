import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-[#0F1729] flex flex-col items-center justify-center text-white p-8 text-center">
          <h1 className="text-3xl text-[#FFD600] font-light tracking-widest mb-4">APPLICATION REBOOTING</h1>
          <p className="text-white/60 mb-8 max-w-lg font-light tracking-wide">
            A critical system thread encountered an unstable state. We apologize for the interruption.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-[#FFD600] text-[#0F1729] hover:bg-white transition-colors"
          >
            RESTORE SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
