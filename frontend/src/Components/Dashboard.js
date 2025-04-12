import { useEffect, useState } from 'react';
import { useEventContext } from '../context/eventContext';
import Header from './Header';
import Footer from './Footer';

export default function Dashboard() {
  const { events } = useEventContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(events)) {
      setLoading(false);
    }
  }, [events]);

  const formatDateTime = (timestamp) => {
    const dateObj = new Date(timestamp);
    return {
      date: dateObj.toLocaleDateString(),
      time: dateObj.toLocaleTimeString(),
    };
  };

  const truncateAlert = (alert) => {
    const lines = alert.split('\n');
    const firstLine = lines[0];
    return firstLine.length > 80 ? firstLine.slice(0, 80) + '...' : firstLine;
  };

  const getShortSyscalls = (sequence = []) => {
    const shortList = sequence.slice(0, 10).join(', ');
    return sequence.length > 10 ? shortList + '...' : shortList;
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="dashborder">
          <h1>Dashboard</h1>
          <section>
            {/* Additional dashboard content */}
          </section>
          <div>
            <div className="Client">
              <h3>Client Service</h3>
              <p>Client 1: SSH<br></br> Status:</p>
              <p>Client 2: FTP<br></br> Status:</p>
            </div>
            <h3>Recent Information</h3>
            {loading ? (
              <p>Loading events...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Timestamp</th>
                    <th>Type</th>
                    <th>Alert</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(events) && events.length > 0 ? (
                    events.map((event, index) => {
                      const { date, time } = formatDateTime(event.timestamp);
                      return (
                        <tr key={index}>
                          <td>{date}</td>
                          <td>{time}</td>
                          <td>{event.type}</td>
                          <td>{truncateAlert(event.alert)}</td>
                          <td>{getShortSyscalls(event.syscall_sequence)}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">No events available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
