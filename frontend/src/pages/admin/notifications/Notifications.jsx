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

export default function AdminNotifications() {
  const { loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [newNotification, setNewNotification] = useState({
    label: "",
    description: "",
    dept: "",
    semester: "",
  });

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/notifications/viewAll", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddNotification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/notifications/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotification),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add notification");
      }

      await fetchNotifications();
      setShowAddModal(false);
      setNewNotification({
        label: "",
        description: "",
        dept: "",
        semester: "",
      });
    } catch (error) {
      console.error("Failed to add notification", error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notifications/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingNotification((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditNotification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/notifications/update/${editingNotification.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingNotification),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update notification");
      }

      await fetchNotifications();
      setShowEditModal(false);
      setEditingNotification(null);
    } catch (error) {
      console.error("Failed to update notification", error);
    }
  };

  const openEditModal = (notification) => {
    setEditingNotification(notification);
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
                <h2 className="text-2xl font-bold mb-4">Manage Notifications</h2>
                <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                  <DialogTrigger asChild>
                    <Button className="mb-4">Add Notification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Notification</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddNotification} id="add-notification-form">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="label">Notification Label</Label>
                          <Input
                            id="label"
                            name="label"
                            placeholder="Notification label"
                            required
                            value={newNotification.label || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            name="description"
                            placeholder="Notification description"
                            required
                            value={newNotification.description || ""}
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
                            value={newNotification.dept || ""}
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
                            value={newNotification.semester || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Add Notification
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Label</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <TableRow key={notification.id}>
                            <TableCell>{notification.label}</TableCell>
                            <TableCell>{notification.dept}</TableCell>
                            <TableCell>{notification.semester}</TableCell>
                            <TableCell>{notification.description}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  className="p-1 rounded-full hover:bg-muted/20"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditModal(notification);
                                  }}
                                >
                                  <Pencil className="w-5 h-5 text-muted-foreground hover:text-blue-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="p-1 rounded-full hover:bg-muted/20"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNotification(notification.id);
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
                          <TableCell colSpan={5}>No notifications found</TableCell>
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
      {showEditModal && editingNotification && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Notification</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditNotification} id="edit-notification-form">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="label">Notification Label</Label>
                  <Input
                    id="label"
                    name="label"
                    placeholder="Notification label"
                    required
                    value={editingNotification.label || ""}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Notification description"
                    required
                    value={editingNotification.description || ""}
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
                    value={editingNotification.dept || ""}
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
                    value={editingNotification.semester || ""}
                    onChange={handleEditInputChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
