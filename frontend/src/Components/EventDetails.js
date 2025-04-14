import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error loading event:", error);
        setEvent(null);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDateTime = (timestamp) => {
    const dateObj = new Date(timestamp);
    return {
      date: dateObj.toLocaleDateString(),
      time: dateObj.toLocaleTimeString(),
    };
  };

  if (!event) {
    return (
      <div className="app-container">
        <Header />
        <main className="main-content">
          <h2>Loading or Event Not Found</h2>
        </main>
        <Footer />
      </div>
    );
  }

  const { date, time } = formatDateTime(event.timestamp);
  const cleanAlertMessage = event.alert
    ? event.alert.split('Sequence:')[0].trim()
    : 'No alert available';

  return (
    <div className="app-container">
      <Header />
      <main className="main-content event-details-wrapper">
        <h1>Event Details</h1>
        <table className="event-details-table">
          <tbody>
            <tr>
              <th>Date</th>
              <td>{date}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{time}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{event.type || 'Unknown'}</td>
            </tr>
            <tr>
              <th>Alert</th>
              <td>{cleanAlertMessage}</td>
            </tr>
            <tr>
              <th>Syscall Sequence</th>
              <td>
                {Array.isArray(event.syscall_sequence)
                  ? event.syscall_sequence.join(', ')
                  : 'Not available'}
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
}
