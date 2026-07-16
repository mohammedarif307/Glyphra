import { createContext, useContext, useState } from 'react';

const LiveLogContext = createContext(null);

export function LiveLogProvider({ children }) {
  const [liveLog, setLiveLog] = useState([]);
  return (
    <LiveLogContext.Provider value={{ liveLog, setLiveLog }}>
      {children}
    </LiveLogContext.Provider>
  );
}

export function useLiveLog() {
  const ctx = useContext(LiveLogContext);
  if (!ctx) throw new Error('useLiveLog must be used within LiveLogProvider');
  return ctx;
}

export default LiveLogContext;
