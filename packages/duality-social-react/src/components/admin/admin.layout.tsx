import React, { ReactNode } from 'react';
import AdminMenu from './admin.menu';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <div>
    <AdminMenu />
    {children}
  </div>
);

export default AdminLayout;