import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function AdminResources() {
  const { loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    type: "",
    semester: 7,
    dept: "",
    content: "",
  });

  useEffect(() => {
    const fetchResources = async () => {
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
    };

    fetchResources();
  }, []);

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

      const data = await response.json();
      setResources((prevResources) => [...prevResources, data]);
      setShowModal(false);
      setNewResource({
        title: "",
        type: "",
        semester: 7,
        dept: "",
        content: "",
      });
    } catch (error) {
      console.error("Failed to add resource", error);
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
                <Button onClick={() => setShowModal(true)} className="mb-4">
                  Add Resource
                </Button>
                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <Card className="w-full max-w-2xl shadow-lg rounded-lg">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          Add New Resource
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleAddResource} id="add-resource-form">
                          {["title", "type", "semester", "dept", "content"].map((field) => (
                            <div key={field} className="mb-4">
                              <label className="block text-sm font-medium mb-1">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                              </label>
                              <input
                                type={field === "semester" ? "number" : "text"}
                                name={field}
                                className="w-full border rounded p-2 text-gray-900"
                                value={newResource[field]}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          ))}
                        </form>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="mr-2"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" form="add-resource-form">
                          Add
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-background">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Title</th>
                        <th className="py-2 px-4 border-b text-left">Type</th>
                        <th className="py-2 px-4 border-b text-left">Semester</th>
                        <th className="py-2 px-4 border-b text-left">Dept</th>
                        <th className="py-2 px-4 border-b text-left">Added by</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resources.length > 0 ? (
                        resources.map((resource) => (
                          <tr key={resource.id}>
                            <td className="py-2 px-4 border-b">{resource.id}</td>
                            <td className="py-2 px-4 border-b">{resource.title}</td>
                            <td className="py-2 px-4 border-b">{resource.type}</td>
                            <td className="py-2 px-4 border-b">{resource.semester}</td>
                            <td className="py-2 px-4 border-b">{resource.dept}</td>
                            <td className="py-2 px-4 border-b">{resource.created_by}</td>
                            <td className="py-2 px-4 border-b">
                              <Button
                                variant="ghost"
                                className="p-1 rounded-full hover:bg-muted/20"
                              >
                                <Trash2 className="w-5 h-5 text-muted-foreground hover:text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="py-2 px-4 border-b text-center">
                            No resources found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}