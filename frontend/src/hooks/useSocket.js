"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { useRef } from "react";

export function useSocket(roomId) {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const { token } = useAuth();
  const connectingRef = useRef(false);
  const wsRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!token || !roomId) {
      setLoading(false);
      return;
    }

    // Clear any existing connection attempts
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onclose = null;
      wsRef.current.onerror = null;
      
      if (wsRef.current.readyState === WebSocket.OPEN || 
          wsRef.current.readyState === WebSocket.CONNECTING) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }

    connectingRef.current = true;

    // Use secure WebSocket if on HTTPS
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.hostname}:5000`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "auth", token }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.error) {
          ws.close();
          if (isMounted.current) setLoading(false);
          return;
        }
        
        if (data.msg === "Authenticated successfully") {
          // Automatically join the room after authentication
          ws.send(JSON.stringify({ type: "join_room", roomId }));
        }
        
        if (data.msg && data.msg.includes("Joined room")) {
          if (isMounted.current) {
            setSocket(ws);
            setLoading(false);
          }
          connectingRef.current = false;
        }
      } catch (error) {
        // Silent error handling
      }
    };

    ws.onerror = () => {
      connectingRef.current = false;
    };

    ws.onclose = () => {
      connectingRef.current = false;
      
      if (isMounted.current) {
        setSocket(null);
        setLoading(false);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [token, roomId]);

  return { socket, loading, setLoading };
}
