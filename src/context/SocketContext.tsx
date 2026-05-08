"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getSocketAuthToken } from "@/actions/auth.actions";
import { useAuth } from "@/context/AuthContext";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

const getSocketUrl = () => {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4500/api";
  return apiBase.replace(/\/api(\/v1)?\/?$/, "");
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setSocket((prev) => {
        if (prev) prev.close();
        return null;
      });
      setIsConnected(false);
      return;
    }

    let cancelled = false;
    let active: Socket | null = null;

    (async () => {
      const token = await getSocketAuthToken();
      if (!token || cancelled) return;

      const newSocket = io(getSocketUrl(), {
        auth: { token: `Bearer ${token}` },
        transports: ["websocket", "polling"],
      });

      newSocket.on("connect", () => setIsConnected(true));
      newSocket.on("disconnect", () => setIsConnected(false));
      newSocket.on("connect_error", (err) => {
        console.error("[Socket] connect_error:", err.message);
        setIsConnected(false);
      });

      active = newSocket;
      setSocket(newSocket);
    })();

    return () => {
      cancelled = true;
      if (active) active.close();
    };
  }, [isAuthenticated, user?.id]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
