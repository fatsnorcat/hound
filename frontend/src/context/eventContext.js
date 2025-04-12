import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';

export const EventContext = createContext({});

export function EventContextProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/events')
      .then(({ data }) => {
        setEvents(data);
        console.log('Events fetched:', data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setEvents([]);
      });
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  return useContext(EventContext);
}
