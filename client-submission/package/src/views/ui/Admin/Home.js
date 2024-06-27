import React, { useState, useEffect } from 'react';
import '../../css/home.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

const Starter = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterColumn, setFilterColumn] = useState('cname');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.role !== 'admin'){
      navigate('/loginform');
    }
    if (!token) {
      fetchToken();
    } else {
      fetchData();
    }
  }, [token]);

  const fetchToken = async () => {
    setToken(localStorage.getItem("token"));
  };

  const fetchData = async () => {
    try {
      const adminClientsResponse = await axios.get('http://localhost:8092/api/admin/clients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (Array.isArray(adminClientsResponse.data)) {
        const mappedData = adminClientsResponse.data
          .filter(client => !client.isDeleted)
          .map(client => {
            const taUser = client.users ? client.users.find(user => user.userRole === 'TalentAcquistion') : null;
            const pmUser = client.users ? client.users.find(user => user.userRole === 'ProjectManager') : null;
            const amUser = client.users ? client.users.find(user => user.userRole === 'AccountManager') : null;
            return {
              clientId: client.clientId,
              cname: client.clientName,
              ta: taUser ? taUser.userName : '',
              pm: pmUser ? pmUser.userName : '',
              am: amUser ? amUser.userName : '',
              restime: client.clientResponseTimeinDays
            };
          });
        setData(mappedData);
      } else {
        console.error('Error: Response data structure is not as expected');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const removeData = async (clientIdToRemove) => {
    try {
      if (!clientIdToRemove) {
        console.error('Error: clientIdToRemove is undefined');
        return;
      }

      let token = localStorage.getItem('token');
      if (!token) {
        console.error('Error: No token available');
        return;
      }

      let headers = {"Authorization": `Bearer ${token}`};
      let clientData = await axios.get(`http://localhost:8092/api/admin/${clientIdToRemove}`, { headers });
      clientData = clientData.data;
      clientData.isDeleted = true;

      const adminClientsResponse = await axios.put(
        `http://localhost:8092/api/admin/${clientIdToRemove}`, 
        { 
          clientId: clientData.clientId,
          clientName: clientData.clientName,
          clientRequirement: clientData.clientRequirement,
          clientResponseTimeinDays: clientData.clientResponseTimeinDays,
          skills: clientData.skills,
          isDeleted: clientData.isDeleted
        },
        { headers }
      );

      if (adminClientsResponse.status === 200) {
        const newData = data.filter(item => item.clientId !== clientIdToRemove);
        setData(newData);
        toast.success('Data deleted successfully!');
      } else {
        console.error('Error updating data:', adminClientsResponse.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating data.');
    }
  };

  const handleSort = (key) => {
    const newData = [...data];
    newData.sort((a, b) => {
      if (key === 'restime') {
        return sortOrder === 'asc' ? a[key] - b[key] : b[key] - a[key];
      } else {
        return sortOrder === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
      }
    });
    setData(newData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  return (
    <>
      <div className="search-container">
        <select
          className="filter-select1"
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="cname">Client Name</option>
          <option value="ta">Talent Acquisition</option>
          <option value="pm">Program Manager</option>
          <option value="am">Account Manager</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input1"
        />
      </div>
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th">Client Name</th>
            <th className="th">Talent Acquisition</th>
            <th className="th">Program Manager</th>
            <th className="th">Account Manager</th>
            <th
              onClick={() => handleSort('restime')}
              className={`th sortable-header ${sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'}`}
            >
              Response Time {sortOrder === 'asc' ? '🔼' : '🔽'}
            </th>
            <th className="th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(item => {
              const columnValue = item[filterColumn];
              return typeof columnValue === 'string' && columnValue.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <tr className='trow' key={index}>
                <td className="td">{item.cname}</td>
                <td className="td">{item.ta}</td>
                <td className="td">{item.pm}</td>
                <td className="td">{item.am}</td>
                <td className="td">{item.restime}</td>
                <td className="td">
                  <button onClick={() => removeData(item.clientId)} className="delbtn">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ToastContainer />
    </>
  );
};

export default Starter;
