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
      if (wsRef.current) {
        console.log('Cleanup (unmount): wsRef.current.readyState before close:', wsRef.current.readyState);
        wsRef.current.onopen = null;
        wsRef.current.onmessage = null;
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.close();
        } else if (wsRef.current.readyState === WebSocket.CONNECTING) {
          console.log('Cleanup: skipping close, socket still CONNECTING.');
        } else if (wsRef.current.readyState === WebSocket.CLOSING) {
          console.log('Cleanup: socket is already CLOSING.');
        } else if (wsRef.current.readyState === WebSocket.CLOSED) {
          console.log('Cleanup: socket is already CLOSED.');
        }
        wsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!token || !roomId) {
      setLoading(false);
      return;
    }

    let retries = 0;
    const maxRetries = 3;
    let retryTimeout;

    function connectSocket() {
      // Clear any existing connection attempts
      if (wsRef.current) {
        console.log('Cleanup: wsRef.current.readyState before close:', wsRef.current.readyState);
        wsRef.current.onopen = null;
        wsRef.current.onmessage = null;
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.close();
        } else if (wsRef.current.readyState === WebSocket.CONNECTING) {
          console.log('Cleanup: skipping close, socket still CONNECTING.');
        }
        wsRef.current = null;
      }

      connectingRef.current = true;
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.hostname}:5000`;
      let closedPrematurely = false;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket onopen, readyState:', ws.readyState);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "auth", token }));
        } else {
          console.warn('WebSocket not open on onopen, readyState:', ws.readyState);
        }
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
            console.log('WebSocket authenticated, readyState:', ws.readyState);
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: "join_room", roomId }));
            } else {
              console.warn('WebSocket not open when trying to join room, readyState:', ws.readyState);
            }
          }
          if (data.msg && data.msg.includes("Joined room")) {
            if (isMounted.current) {
              setSocket(ws);
              setLoading(false);
            }
            connectingRef.current = false;
          }
        } catch (error) {
          console.error("WebSocket message parse error:", error);
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error event:", event, 'readyState:', ws.readyState);
        connectingRef.current = false;
        closedPrematurely = true;
        if (isMounted.current) {
          setSocket(null);
          setLoading(false);
        }
      };

      ws.onclose = (event) => {
        console.warn("WebSocket closed event:", event, 'readyState:', ws.readyState);
        connectingRef.current = false;
        if (!closedPrematurely) {
          console.warn("WebSocket closed:", event);
        }
        if (isMounted.current) {
          setSocket(null);
          setLoading(false);
        }
        if (retries < maxRetries) {
          retries++;
          console.warn(`WebSocket retrying... (${retries})`);
          retryTimeout = setTimeout(connectSocket, 1000 * retries);
        }
      };
    }

    connectSocket();

    return () => {
      clearTimeout(retryTimeout);
      if (wsRef.current) {
        console.log('Cleanup (unmount): wsRef.current.readyState before close:', wsRef.current.readyState);
        wsRef.current.onopen = null;
        wsRef.current.onmessage = null;
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.close();
        } else if (wsRef.current.readyState === WebSocket.CONNECTING) {
          console.log('Cleanup: skipping close, socket still CONNECTING.');
        } else if (wsRef.current.readyState === WebSocket.CLOSING) {
          console.log('Cleanup: socket is already CLOSING.');
        } else if (wsRef.current.readyState === WebSocket.CLOSED) {
          console.log('Cleanup: socket is already CLOSED.');
        }
        wsRef.current = null;
      }
    };
  }, [token, roomId]);

  return { socket, loading, setLoading };
}

