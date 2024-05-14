import { useState } from 'react';
import '../../css/home.css';

const Starter = () => {
  const [data, setData] = useState([
    { cname: "cl1", ta: "ta1", pm: "pm1", am: "am1", restime: 5 },
    { cname: "cl2", ta: "ta2", pm: "pm2", am: "am2", restime: 7 },
    { cname: "cl3", ta: "ta3", pm: "pm3", am: "am3", restime: 1 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
  const [filterColumn, setFilterColumn] = useState('cname'); // Default filtering column

  const removeData = (indexToRemove) => {
    const newData = data.filter((item, index) => index !== indexToRemove);
    setData(newData);
  };

  const handleSort = (key) => {
    const newData = [...data];
    newData.sort((a, b) => {
      if (key === 'restime') {
        // Sorting by response time
        if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
      } else {
        // Sorting by other columns (CNAME, TA, PM, AM)
        if (sortOrder === 'asc') {
          return a[key].localeCompare(b[key]);
        } else {
          return b[key].localeCompare(a[key]);
        }
      }
      return 0;
    });
    setData(newData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  

  return (
    <>
      <div>
        <select style={{height:"30px",marginRight:"10px"}}
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="cname">Client Name</option>
          <option value="ta">Talent Acquisiton</option>
          <option value="pm">Program Manager</option>
          <option value="am">Account Manager</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Talent Acquisiton</th>
            <th>Program Manager</th>
            <th>Account Manager</th>
            <th
              onClick={() => handleSort('restime')}
              style={{ cursor: 'pointer' }}
            >
              Response Time
              {sortOrder && (
                sortOrder === 'asc' ? ' 🔼' : ' 🔽'
              )}
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(item => {
              const columnValue = item[filterColumn];
              return typeof columnValue === 'string' && columnValue.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{item.cname}</td>
                <td>{item.ta}</td>
                <td>{item.pm}</td>
                <td>{item.am}</td>
                <td>{item.restime}</td>
                <td><button onClick={() => removeData(index)}>Delete</button></td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Starter;
