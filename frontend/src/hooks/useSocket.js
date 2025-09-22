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
  const isMounted = useRef(true)

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

    if (connectingRef.current || (wsRef.current && wsRef.current.readyState === WebSocket.OPEN)) {
      return;
    }

    connectingRef.current = true;

    const ws = new WebSocket(`ws://localhost:5000/canvas/${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected, sending auth message...");
      ws.send(JSON.stringify({ type: "auth", token }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.error) {
          console.error("WebSocket authentication failed:", data.error);
          ws.close();
          setLoading(false);
          return;
        }
        if (data.msg === "Authenticated successfully") {
          console.log("WebSocket authenticated successfully");
          if (isMounted.current) {
          setSocket(ws);
          setLoading(false);
          }
          connectingRef.current = false; // Add this line
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      connectingRef.current = false;
      if (isMounted.current) setLoading(false); 
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      connectingRef.current = false;
      if (isMounted.current) {
      setSocket(null);
      setLoading(false);
      }
    };

    return () => {
      ws.close();
    };
  }, [token, roomId]);

  return { socket, loading, setLoading };
}
