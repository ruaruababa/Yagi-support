'use client'; // Ensure this is at the very top

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  // Ensure this is only created on the client
  const queryClient = React.useState(() => new QueryClient())[0];

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
