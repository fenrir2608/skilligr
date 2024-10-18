import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminResources() {
  const { loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [newResource, setNewResource] = useState({
    title: "",
    type: "",
    semester: "7",
    dept: "",
    content: "",
  });

  const fetchResources = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/resources/viewAll",
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error("Failed to fetch resources", error);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddResource = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/resources/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResource),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add resource");
      }

      await fetchResources();
      setShowAddModal(false);
      setNewResource({
        title: "",
        type: "",
        semester: "7",
        dept: "",
        content: "",
      });
    } catch (error) {
      console.error("Failed to add resource", error);
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/resources/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.status === 403) {
        console.log("You are not authorized to delete this resource");
        return;
      }
      if (response.ok) {
        await fetchResources();
      }
    } catch (error) {
      console.error("Failed to delete resource", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
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
                <h2 className="text-2xl font-bold mb-4">
                  Manage Learning Resources
                </h2>
                <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                  <DialogTrigger asChild>
                    <Button className="mb-4">Add Resource</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Resource</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddResource} id="add-resource-form">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Resource title"
                            required
                            value={newResource.title}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="type">Type</Label>
                          <Input
                            id="type"
                            name="type"
                            placeholder="Resource type"
                            required
                            value={newResource.type}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="semester">Semester</Label>
                            <Select
                              name="semester"
                              required
                              value={newResource.semester}
                              onValueChange={(value) =>
                                handleInputChange({
                                  target: { name: "semester", value },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a semester" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                  <SelectItem key={sem} value={sem.toString()}>
                                    {sem}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="dept">Department</Label>
                            <Select
                              name="dept"
                              required
                              value={newResource.dept}
                              onValueChange={(value) =>
                                handleInputChange({
                                  target: { name: "dept", value },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Computer Science">
                                  Computer Science
                                </SelectItem>
                                <SelectItem value="Information Technology">
                                  Information Technology
                                </SelectItem>
                                <SelectItem value="Mechanical">
                                  Mechanical
                                </SelectItem>
                                <SelectItem value="Electrical">
                                  Electrical
                                </SelectItem>
                                <SelectItem value="Civil">Civil</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="content">Content</Label>
                          <Input
                            id="content"
                            name="content"
                            placeholder="Resource content or URL"
                            required
                            value={newResource.content}
                            onChange={handleInputChange}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Add Resource
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Dept</TableHead>
                        <TableHead>Added by</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resources.length > 0 ? (
                        resources.map((resource) => (
                          <TableRow
                            key={resource.id}
                            onClick={() => setSelectedResource(resource)}
                          >
                            <TableCell>{resource.id}</TableCell>
                            <TableCell>{resource.title}</TableCell>
                            <TableCell>{resource.type}</TableCell>
                            <TableCell>{resource.semester}</TableCell>
                            <TableCell>{resource.dept}</TableCell>
                            <TableCell>{resource.created_by}</TableCell>
                            <TableCell>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteResource(resource.id);
                                }}
                                variant="ghost"
                                className="p-1 rounded-full hover:bg-muted/20"
                              >
                                <Trash2 className="w-5 h-5 text-muted-foreground hover:text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center">
                            No resources found.
                          </TableCell>
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
      {selectedResource && (
        <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedResource.title}</DialogTitle>
            </DialogHeader>
            <div>
              <p><strong>Type:</strong> {selectedResource.type}</p>
              <p><strong>Semester:</strong> {selectedResource.semester}</p>
              <p><strong>Department:</strong> {selectedResource.dept}</p>
              <p><strong>Added by:</strong> {selectedResource.created_by}</p>
              <p><strong>Content:</strong> {selectedResource.content}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}