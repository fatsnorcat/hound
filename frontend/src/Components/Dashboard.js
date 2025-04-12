import { useEffect, useState } from 'react';
import { useEventContext } from '../context/eventContext';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { events } = useEventContext();
  const [loading, setLoading] = useState(true);
  const [minTimestamp, setMinTimestamp] = useState(null);
  const [roundedMinTime, setRoundedMinTime] = useState(null);

  useEffect(() => {
    if (Array.isArray(events) && events.length > 0) {
      const timestamps = events.map((e) => new Date(e.timestamp).getTime());
      const min = Math.min(...timestamps);
      setMinTimestamp(min);

      // Round down to the nearest 15 minutes
      const roundedDate = new Date(min);
      roundedDate.setSeconds(0);
      roundedDate.setMilliseconds(0);
      const minutes = roundedDate.getMinutes();
      roundedDate.setMinutes(minutes - (minutes % 15));
      setRoundedMinTime(roundedDate.getTime());

      setLoading(false);
    }
  }, [events]);

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

  const getMinutesOffset = (timestamp, baseTime) => {
    const currentTime = new Date(timestamp).getTime();
    return Math.round((currentTime - baseTime) / 60000);
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const chartData = sortedEvents.map((event) => {
    const { date, time } = formatDateTime(event.timestamp);
    return {
      date,
      minutesOffset: getMinutesOffset(event.timestamp, roundedMinTime),
      label: `${date} ${time}`,
    };
  });

  const maxOffset = Math.ceil(Math.max(...chartData.map((d) => d.minutesOffset)) / 15) * 15;
  const timeTicks = [];
  for (let m = 0; m <= maxOffset; m += 15) {
    timeTicks.push(m);
  }

  const handleDotClick = (e) => {
    const { payload } = e;
    alert(`Event Time: ${payload?.label.split(' ')[1]}`);
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
                <p>Status:</p>
              </div>
              <div>
                <p><strong>Client 2:</strong> FTP</p>
                <p>Status:</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Recent Info Table */}
            <div style={{ flex: 1 }}>
              <h3>Recent Information</h3>
              {loading ? (
                <p>Loading events...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedEvents.length > 0 ? (
                      sortedEvents.map((event) => {
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
                              <Link to={`/detail/${event._id}`}>View</Link>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4">No recent events</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Line Chart */}
            <div style={{ flex: 1 }}>
              <h3>Event Timeline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                  <XAxis
                    dataKey="date"
                    label={{ value: 'Date', position: 'bottom', offset: 20 }}
                    style={{ fill: 'white' }}
                  />
                  <YAxis
                    dataKey="minutesOffset"
                    ticks={timeTicks}
                    domain={[0, maxOffset]}
                    tickFormatter={(mins) => {
                      const base = new Date(roundedMinTime);
                      base.setMinutes(base.getMinutes() + mins);
                      return base.toTimeString().slice(0, 5);
                    }}
                    label={{ value: 'Time', angle: -90, position: 'insideLeft', offset: 10 }}
                    style={{ fill: 'white' }}
                  />
                  <Tooltip
                    labelFormatter={(value, payload) => payload?.[0]?.payload?.label ?? value}
                    formatter={(value) => {
                      const base = new Date(roundedMinTime);
                      base.setMinutes(base.getMinutes() + value);
                      return [`Time: ${base.toTimeString().slice(0, 5)}`];
                    }}
                    style={{ fill: 'white' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="minutesOffset"
                    stroke="#8884d8"
                    dot={{
                      onClick: handleDotClick,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
