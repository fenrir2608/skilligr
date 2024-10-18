import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminEvents() {
  const { loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_link: "",
    dept: "",
    semester: "",
    scheduled_at: "",
    ends_at: "",
    created_by_name: "",
  });

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/events/view", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      await fetchEvents();
      setShowAddModal(false);
      setNewEvent({
        title: "",
        description: "",
        event_link: "",
        dept: "",
        semester: "",
        scheduled_at: "",
        ends_at: "",
        created_by_name: "",
      });
    } catch (error) {
      console.error("Failed to add event", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/events/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        await fetchEvents();
      }
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/events/update/${editingEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingEvent),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      await fetchEvents();
      setShowEditModal(false);
      setEditingEvent(null);
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setShowEditModal(true);
  };

  if (loading || fetching) return <Spinner />;

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1 w-full">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="bg-background rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
                <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                  <DialogTrigger asChild>
                    <Button className="mb-4">Add Event</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddEvent} id="add-event-form">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="title">Event Title</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Event title"
                            required
                            value={newEvent.title || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            name="description"
                            placeholder="Event description"
                            required
                            value={newEvent.description || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="event_link">Event Link</Label>
                          <Input
                            id="event_link"
                            name="event_link"
                            placeholder="Event link"
                            required
                            value={newEvent.event_link || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="dept">Department</Label>
                          <Input
                            id="dept"
                            name="dept"
                            placeholder="Department"
                            required
                            value={newEvent.dept || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="semester">Semester</Label>
                          <Input
                            id="semester"
                            name="semester"
                            type="number"
                            placeholder="Semester"
                            required
                            value={newEvent.semester || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="scheduled_at">Scheduled At</Label>
                            <Input
                              id="scheduled_at"
                              name="scheduled_at"
                              type="datetime-local"
                              required
                              value={newEvent.scheduled_at || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="ends_at">Ends At</Label>
                            <Input
                              id="ends_at"
                              name="ends_at"
                              type="datetime-local"
                              required
                              value={newEvent.ends_at || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full">
                          Add Event
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Scheduled At</TableHead>
                        <TableHead>Ends At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.length > 0 ? (
                        events.map((event) => (
                          <TableRow
                            key={event.id}
                          >
                            <TableCell>{event.title}</TableCell>
                            <TableCell>{event.dept}</TableCell>
                            <TableCell>{event.semester}</TableCell>
                            <TableCell>
                              {new Date(event.scheduled_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {new Date(event.ends_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                 variant="ghost"
                                  className="p-1 rounded-full hover:bg-muted/20"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditModal(event);
                                  }}
                                >
                                  <Pencil className="w-5 h-5 text-muted-foreground hover:text-blue-500"/>
                                </Button>
                                <Button
                                 variant="ghost"
                                  className="p-1 rounded-full hover:bg-muted/20"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(event.id);
                                  }}
                                >
                                  <Trash2 className="w-5 h-5 text-muted-foreground hover:text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6}>No events found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingEvent && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditEvent} id="edit-event-form">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Event title"
                    required
                    value={editingEvent.title || ""}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Event description"
                    required
                    value={editingEvent.description || ""}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="event_link">Event Link</Label>
                  <Input
                    id="event_link"
                    name="event_link"
                    placeholder="Event link"
                    required
                    value={editingEvent.event_link || ""}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="dept">Department</Label>
                  <Input
                    id="dept"
                    name="dept"
                    placeholder="Department"
                    required
                    value={editingEvent.dept || ""}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    name="semester"
                    type="number"
                    placeholder="Semester"
                    required
                    value={editingEvent.semester || ""}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="scheduled_at">Scheduled At</Label>
                    <Input
                      id="scheduled_at"
                      name="scheduled_at"
                      type="datetime-local"
                      required
                      value={editingEvent.scheduled_at || ""}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ends_at">Ends At</Label>
                    <Input
                      id="ends_at"
                      name="ends_at"
                      type="datetime-local"
                      required
                      value={editingEvent.ends_at || ""}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Update Event
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
