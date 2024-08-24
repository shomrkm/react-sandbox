import { useEffect, useRef } from 'react'
import './App.css'

type ObserverProps = {
  dataKey: string;
}

const useColumnsObserver = ({ dataKey }: ObserverProps) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) =>{
          const resizedElement = entry.target;
          const index = refs.current.indexOf(resizedElement as HTMLDivElement);

          if (index !== -1) {
            const key = entry.target.getAttribute(dataKey);
            console.log(`${key} was resized to ${entry.contentRect.width}`)
          }
        });
    });

    const currentRefs = refs.current;

    currentRefs.forEach((ref) => {
      if (!ref) return;
      observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [dataKey])

  return refs;
}

function App() {
  const refs = useColumnsObserver({dataKey: 'data-column-attr'});

  return (
    <div className="resizable-table">
      <table>
        <thead>
          <tr>
          {
              ['column1','column2','column3'].map((column, index) => (
                <th>
                  <div key={column} data-column-attr={column} ref={(el) => (refs.current[index] = el)} className="resizer">
                    Name
                  </div>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>25</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>30</td>
            <td>UK</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
