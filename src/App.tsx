import './App.css'
import { useColumnsObserver } from './useColumnsObserver';

const headers = ['Name', 'Age', 'Country'];

const data = [
  {
    name: 'John Doe',
    age: 25,
    country: 'USA'
  },
  {
    name: 'Jane Smith',
    age: 30,
    country: 'UK'
  }
];

function App() {
  const refs = useColumnsObserver({dataKey: 'data-column-attr'});

  return (
    <div className="resizable-table">
      <table>
        <thead>
          <tr>
            {
              headers.map((column, index) => (
                <th>
                  <div
                    key={column}
                    data-column-attr={column}
                    ref={(el) => (refs.current[index] = el)}
                    className="header-cell"
                  >
                    {column}
                  </div>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((row, index) => (
              <tr key={`${row.name}_${index}`}>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.country}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
