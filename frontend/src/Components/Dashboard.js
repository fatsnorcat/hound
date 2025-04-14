import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState('desc');
  const [timeRange, setTimeRange] = useState('ALL');
  const [noEventsMessage, setNoEventsMessage] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch(`/events?limit=1000&sort=asc`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const formatDateTime = (timestamp) => {
    const dateObj = new Date(timestamp);
    const date = dateObj.toISOString().split('T')[0];
    const time = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return { date, time };
  };

  const sortedEvents = [...events].sort((a, b) =>
    sortOrder === 'asc'
      ? new Date(a.timestamp) - new Date(b.timestamp)
      : new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Timeline-specific filter
  const filteredEventsForTimeline = events.filter((event) => {
    const currentTime = Date.now();
    if (timeRange === 'ALL') return true;
    return new Date(event.timestamp).getTime() >= currentTime - timeRange * 60 * 1000;
  });

  const chartData = filteredEventsForTimeline.map((event) => {
    const dateObj = new Date(event.timestamp);
    return {
      date: dateObj.toISOString().split('T')[0],
      time: dateObj.toTimeString().slice(0, 5),
    };
  });

  const handleDotClick = (e) => {
    const { payload } = e;
    if (payload) {
      alert(`Date: ${payload.date}\nTime: ${payload.time}`);
    }
  };

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
    setNoEventsMessage('');

    const currentTime = Date.now();
    const filteredByRange = events.filter((event) => {
      if (newRange === 'ALL') return true;
      return new Date(event.timestamp).getTime() >= currentTime - newRange * 60 * 1000;
    });

    if (filteredByRange.length === 0) {
      setNoEventsMessage(
        `No recent anomaly detected within this ${
          newRange === 'ALL' ? 'timeframe' : newRange < 60 ? `${newRange} min` : `${newRange / 60} hr`
        } timeframe`
      );
    }
  };

  return (
    <div className="app-container" style={{ color: 'white' }}>
      <Header />
      <main className="main-content">
        <div className="dashborder">
          <h1>Dashboard</h1>

          <div className="Client">
            <div style={{ display: 'flex', gap: '10rem' }}>
              <div>
                <p><strong>Client 1:</strong> SSH</p>
                <p>Status: <span style={{ color: 'green', fontWeight: 'bold' }}>Online</span></p>
              </div>
              <div>
                <p><strong>Client 2:</strong> FTP</p>
                <p>Status: <span style={{ color: 'green', fontWeight: 'bold' }}>Online</span> </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '4rem' }}>
            {/* === Recent Info Table === */}
            <div style={{ flex: 1 }}>
              <h3>Recent Information</h3>

              <div style={{ marginBottom: '1rem' }}>
                <label>Show: </label>
                {[5, 10, 15].map((val) => (
                  <button key={val} onClick={() => setLimit(val)} disabled={limit === val}>
                    {val}
                  </button>
                ))}
                <span style={{ marginLeft: '1rem' }}>
                  Order:
                  <button onClick={() => setSortOrder('desc')} disabled={sortOrder === 'desc'}>
                    Newest
                  </button>
                  <button onClick={() => setSortOrder('asc')} disabled={sortOrder === 'asc'}>
                    Oldest
                  </button>
                </span>
              </div>

              {loading ? (
                <p>Loading events...</p>
              ) : (
                <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th className="view-events">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedEvents.slice(0, limit).map((event) => {
                      const { date, time } = formatDateTime(event.timestamp);
                      const type =
                        event.alert?.toLowerCase().includes('anomalous sequence detected')
                          ? 'Anomaly'
                          : event.type;

                      return (
                        <tr key={event._id}>
                          <td>{date}</td>
                          <td>{time}</td>
                          <td>{type}</td>
                          <td>
                            <Link to={`/eventdetails/${event._id}`}>
                              <button className="view-button">
                                View
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                    {sortedEvents.length === 0 && (
                      <tr>
                        <td colSpan="4">No recent events</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* === Event Timeline === */}
            <div style={{ flex: 1 }}>
              <h3>Event Timeline</h3>

              <div style={{ marginBottom: '1rem' }}>
                <label>Time Range: </label>
                {[30, 720, 1440, 'ALL'].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeChange(range)}
                    disabled={timeRange === range}
                  >
                    {range === 'ALL' ? 'All' : range < 60 ? `${range} min` : `${range / 60} hr`}
                  </button>
                ))}
              </div>

              {noEventsMessage ? (
                <p style={{ color: 'red' }}>{noEventsMessage}</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) => d.slice(5)} // Format as MM-DD
                      label={{
                        value: 'Date (2025)',
                        position: 'bottom',
                        offset: 20,
                        style: { fill: 'white' }
                      }}
                      style={{ fill: 'white' }}
                    />
                    <YAxis
                      dataKey="time"
                      type="category"
                      tickFormatter={(t) => t}
                      interval={0}
                      tick={{ fill: 'white' }}
                    />
                    <Tooltip
                      labelFormatter={(label) => `Date: ${label}`}
                      formatter={(value, name, props) => {
                        return [`${props.payload.time}`, 'Time'];
                      }}
                      contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="#00bfff"
                      dot={{ fill: 'yellow', r: 5 }}
                      activeDot={{ fill: 'red', r: 8 }}
                      onClick={handleDotClick}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
