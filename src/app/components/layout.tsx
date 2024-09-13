import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';

import ReactQueryProvider from '../react-query-provider';

export const metadata: Metadata = {
  title: 'Hỗ trợ vùng lụt',
  description:
    'Hỗ trợ vùng lụt là một dự án nhỏ nhằm giúp đỡ những người bị ảnh hưởng bởi lũ lụt.',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </>
  );
}
