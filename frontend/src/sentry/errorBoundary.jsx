import React from "react";
import * as Sentry from "@sentry/react";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const ErrorBoundary = ({ children }) => {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default ErrorBoundary;
