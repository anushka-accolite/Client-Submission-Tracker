// import { useState } from 'react';
// import '../../css/home.css';


// const Starter = () => {
//   // const navigate=useNavigate();
//   // useEffect(()=>{
//   //   navigate(0);
//   // },[])
  
//   const [data, setData] = useState([
//     { cname: "cl1", ta: "ta1", pm: "pm1", am: "am1", restime: 5 },
//     { cname: "cl2", ta: "ta2", pm: "pm2", am: "am2", restime: 7 },
//     { cname: "cl3", ta: "ta3", pm: "pm3", am: "am3", restime: 1 }
//   ]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
//   const [filterColumn, setFilterColumn] = useState('cname'); // Default filtering column

//   const removeData = (indexToRemove) => {
//     const newData = data.filter((item, index) => index !== indexToRemove);
//     setData(newData);
//   };

//   const handleSort = (key) => {
//     const newData = [...data];
//     newData.sort((a, b) => {
//       if (key === 'restime') {
//         // Sorting by response time
//         if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
//         if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
//       } else {
//         // Sorting by other columns (CNAME, TA, PM, AM)
//         if (sortOrder === 'asc') {
//           return a[key].localeCompare(b[key]);
//         } else {
//           return b[key].localeCompare(a[key]);
//         }
//       }
//       return 0;
//     });
//     setData(newData);
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };
  

//   return (
//     <>
//       <div className="search-container">
//         <select
//           className="filter-select"
//           value={filterColumn}
//           onChange={(e) => setFilterColumn(e.target.value)}
//         >
//           <option value="cname">Client Name</option>
//           <option value="ta">Talent Acquisiton</option>
//           <option value="pm">Program Manager</option>
//           <option value="am">Account Manager</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//       </div>
//       <table className='table'>
//         <thead>
//           <tr className='tr'>
//             <th className='th'>Client Name</th>
//             <th>Talent Acquisiton</th>
//             <th>Program Manager</th>
//             <th>Account Manager</th>
//             <th
//               onClick={() => handleSort('restime')}
//               className="sortable-header"
//             >
//               Response Time
//               {sortOrder && (
//                 sortOrder === 'asc' ? ' 🔼' : ' 🔽'
//               )}
//             </th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data
//             .filter(item => {
//               const columnValue = item[filterColumn];
//               return typeof columnValue === 'string' && columnValue.toLowerCase().includes(searchTerm.toLowerCase());
//             })
//             .map((item, index) => (
//               <tr key={index}>
//                 <td className='td'>{item.cname}</td>
//                 <td className='td'>{item.ta}</td>
//                 <td className='td'>{item.pm}</td>
//                 <td className='td'>{item.am}</td>
//                 <td className='td'>{item.restime}</td>
//                 <td className='td'><button onClick={() => removeData(index)} className='delbtn'>Delete</button></td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default Starter;

import React, { useState } from 'react';
import '../../css/home.css';

const Starter = () => {
  const [data, setData] = useState([
    { cname: "cl1", ta: "ta1", pm: "pm1", am: "am1", restime: 5 },
    { cname: "cl2", ta: "ta2", pm: "pm2", am: "am2", restime: 7 },
    { cname: "cl3", ta: "ta3", pm: "pm3", am: "am3", restime: 1 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterColumn, setFilterColumn] = useState('cname');

  const removeData = (indexToRemove) => {
    const newData = data.filter((item, index) => index !== indexToRemove);
    setData(newData);
  };

  const handleSort = (key) => {
    const newData = [...data];
    newData.sort((a, b) => {
      if (key === 'restime') {
        if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
      } else {
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
            .map((item, index) => (
              <tr key={index}>
                <td className="td">{item.cname}</td>
                <td className="td">{item.ta}</td>
                <td className="td">{item.pm}</td>
                <td className="td">{item.am}</td>
                <td className="td">{item.restime}</td>
                <td className="td">
                  <button onClick={() => removeData(index)} className="delbtn">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Starter;
