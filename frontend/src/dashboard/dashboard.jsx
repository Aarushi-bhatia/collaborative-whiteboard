"use client"
import React, { useState, useEffect, useRef } from "react"
import axios, { AxiosError } from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { useToast } from "../components/ui/use-toast"
import { DoorOpen as Door, LogOut, Plus, Trash2, Users } from "lucide-react"
// import { ThemeToggle } from "../components/theme-toggle"
import { useAuth } from "../lib/auth"
import AuthGuard from "../components/AuthGuard"
import { BACKEND_URL } from "../config"

import { SiExcalidraw } from "react-icons/si"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [rooms, setRooms] = useState([])
  const [newRoomName, setNewRoomName] = useState("")
  const [joinRoomName, setJoinRoomName] = useState("")
  const [loading, setLoading] = useState(true)
  const [roomToDelete, setRoomToDelete] = useState(null)
  const navigate = useNavigate()
  const { toast } = useToast()
  const { logout, token, setToken } = useAuth()
  const joinRef = useRef(null)
  const createRef = useRef(null)
  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in")
    } else {
      fetchRooms()
    }
  }, [token])

  const fetchRooms = async () => {
    try {
      const url = `${BACKEND_URL}/user/rooms`
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = res.data

      setRooms(data.rooms.length > 0 ? data.rooms : [])
    } catch (error) {
      //{"error":"Invalid or expired token."}
      if (error instanceof AxiosError) {
        if (error.status == 401) {
          setToken("")

          toast({
            variant: "destructive",
            title: "Unauthorized",
            description: "Please Login Again"
          })
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch rooms"
          })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const createRoom = async () => {
    try {
      const url = `${BACKEND_URL}/room/create/${newRoomName}`
      const res = await axios.post(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = res.data
      if (!data.room) {
        throw new Error("Room creation failed")
      }
      setRooms([data.room, ...rooms])
      setNewRoomName("")
      toast({
        title: "Success",
        description: "Room created successfully"
      })
    } catch (error) {
      setNewRoomName("")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Room with same name already Exists"
      })
    }
  }

  const joinRoom = async roomname => {
    try {
      const url = `${BACKEND_URL}/room/join/${
        joinRoomName == "" ? roomname : joinRoomName
      }`
      const res = await axios.post(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = res.data
      console.log(data)
      if (!data.room) {
        throw new Error("Room not found")
      }
      setJoinRoomName("")
      toast({
        title: "Success",
        description: "Joined room successfully"
      })
      sessionStorage.getItem("hasReloaded")
      sessionStorage.setItem("hasReloaded", "false")
      navigate(`/canvas/${data.room.id}`)
    } catch (error) {
      setJoinRoomName("")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Room not found"
      })
    }
  }

  // Delete room function with fixed filtering logic.
  const deleteRoom = async roomId => {
    try {
      const url = `${BACKEND_URL}/room/${roomId}`
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res) {
        throw new Error("Error deleting room")
      }
      if (res.data.msg === "Room not found ") {
        throw new Error("Error deleting room")
      }
      // Remove only the deleted room from the list:
      setRooms(rooms.filter(room => room.id !== roomId))
      toast({
        title: "Success",
        description: "Room deleted successfully"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete room"
      })
    }
  }

  const handleSignOut = async () => {
    navigate("/")
    logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Navbar */}
        <nav className="border-b">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href={"/"}>
              <div className="flex items-center space-x-2">
                <SiExcalidraw className=" w-10 h-10" />
                <span className="text-2xl font-bold "> </span>
              </div>
            </a>
            <div className="flex items-center space-x-4">
              {/* <ThemeToggle /> */}
              <button variant="ghost" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-8">
          {/* Header and Create/Join buttons */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Rooms</h1>
            <div className="flex gap-4">
              {/* Create Room Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Room
                  </button>
                </DialogTrigger>
                <DialogContent
                  onKeyDown={e => {
                    if (e.key == "Enter") {
                      if (createRef.current instanceof HTMLElement) {
                        createRef.current.click()
                      }
                    }
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Create New Room</DialogTitle>
                    <DialogDescription>
                      Enter a name for your new room.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    placeholder="Room name"
                    value={newRoomName}
                    onChange={e => setNewRoomName(e.target.value)}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <button
                        ref={createRef}
                        onClick={createRoom}
                        disabled={!newRoomName.trim()}
                      >
                        Create
                      </button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Join Room Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <button>
                    <Door className="h-4 w-4 mr-2" />
                    Join Room
                  </button>
                </DialogTrigger>
                <DialogContent
                  onKeyDown={e => {
                    if (e.key == "Enter") {
                      if (joinRef.current instanceof HTMLElement) {
                        joinRef.current.click()
                      }
                    }
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Join Room</DialogTitle>
                    <DialogDescription>
                      Enter the name of the room you want to join.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    placeholder="Room name"
                    value={joinRoomName}
                    onChange={e => setJoinRoomName(e.target.value)}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <button
                        ref={joinRef}
                        onClick={() => {
                          joinRoom()
                        }}
                        disabled={!joinRoomName.trim()}
                      >
                        Join
                      </button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Rooms List */}
          {rooms.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl font-medium text-muted-foreground">
                  No rooms created yet
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Create your first room to get started
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map(room => (
                <Card key={room.id}>
                  <CardHeader>
                    <CardTitle>{room.slug}</CardTitle>
                    <CardDescription>
                      Created on {new Date(room.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <button
                        className="flex-1"
                        onClick={() => {
                          joinRoom(room.slug)
                        }}
                      >
                        <Door className="h-4 w-4 mr-2" />
                        Join Room
                      </button>
                      {/* Instead of deleting immediately, open a confirmation dialog */}
                      <button
                        variant="destructive"
                        size="icon"
                        onClick={() => setRoomToDelete(room.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>

        {/* Confirmation Dialog for Deletion */}
        {roomToDelete && (
          <Dialog
            open
            onOpenChange={open => {
              if (!open) setRoomToDelete(null)
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this room? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <button onClick={() => setRoomToDelete(null)}>Cancel</button>
                </DialogClose>
                <button
                  variant="destructive"
                  onClick={() => {
                    if (roomToDelete) {
                      deleteRoom(roomToDelete)
                    }
                    setRoomToDelete(null)
                  }}
                >
                  Delete
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AuthGuard>
  )
}
