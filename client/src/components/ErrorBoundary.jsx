import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can log error details to a monitoring service here
    // console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-6 rounded-lg border border-red-800 bg-red-900/20 text-red-200">
          <h2 className="text-xl font-semibold mb-2">Something went wrong.</h2>
          <p className="text-sm opacity-80">{this.state.error?.message || 'An unexpected error occurred.'}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;