import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Container } from 'reactstrap';

const FullLayout = ({ showSidebarAndHeader }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="contentbar" style={{
        display: 'flex', flex: 1, overflow: 'hidden' }}>
        {showSidebarAndHeader && (
          <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        )}
        <div className="content" style={{ flex: 1, overflow: 'auto' }}>
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FullLayout;