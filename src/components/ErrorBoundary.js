import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log error information to an error reporting service here
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
