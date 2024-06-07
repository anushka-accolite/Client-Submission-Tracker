// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import { Container } from 'reactstrap';

// const FullLayout = ({ showSidebarAndHeader }) => {
//   return (
//     <main>
//       <div className="pageWrapper d-lg-flex">
//         {/* Sidebar */}
//         {showSidebarAndHeader && (
//           <aside className="sidebarArea shadow" id="sidebarArea" style={{
//             backgroundColor: "#052c4f",
//             textShadow: "0px 0px 1px whitesmoke",
//             fontFamily: 'Lato, sans-serif',
//             boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)"
//           }}>
//             <Sidebar />
//           </aside>
//         )}

//         {/* Content Area */}
//         <div className="contentArea">
//           {/* Header */}
//           {showSidebarAndHeader && <Header />}
          
//           {/* Middle Content */}
//           <Container className="p-4 wrapper" fluid>
//             <Outlet />
//           </Container>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default FullLayout;


// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import { Container } from 'reactstrap';

// const FullLayout = ({ showSidebarAndHeader }) => {
//   const [sidebarOpen, setSidebarOpen] = React.useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div style={{ position: 'relative', overflowX: 'hidden' }}>
//       <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
//       <div style={{ display: 'flex' }}>
//         {showSidebarAndHeader && (
//           <Sidebar sidebarOpen={sidebarOpen} />
//         )}
//         <div style={{ flexGrow: 1 }}>
//           <Container fluid>
//             <Outlet />
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullLayout;


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
          <Sidebar sidebarOpen={sidebarOpen} />
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
