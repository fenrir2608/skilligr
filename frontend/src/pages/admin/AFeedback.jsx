import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../hooks/auth";
import Spinner from "../../components/Spinner";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

export default function AdminFeedback() {
  const { authStatus, loading } = useAuth();
  const [feedbackData, setFeedbackData] = useState([]);
  const [noFeedbackMessage, setNoFeedbackMessage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filters, setFilters] = useState({
    id: "",
    title: "",
    feedback: "",
    feedback_by: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (authStatus) {
      const fetchFeedback = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/feedback/viewAll",
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setFeedbackData(data);
          } else if (response.status === 401) {
            setNoFeedbackMessage("You are not authorized to view feedbacks.");
          } else {
            const text = await response.text();
            if (text === "No feedbacks.") {
              setNoFeedbackMessage("No feedbacks available.");
            } else {
              console.error("Unexpected response:", text);
            }
          }
        } catch (error) {
          console.error("Failed to fetch feedbacks", error);
        }
      };
      fetchFeedback();
    }
  }, [authStatus]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e, key) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAndSortedData = useMemo(() => {
    let processedData = [...feedbackData];

    // Apply filters
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        processedData = processedData.filter((item) =>
          item[key]
            .toString()
            .toLowerCase()
            .includes(filters[key].toLowerCase())
        );
      }
    });

    // Apply search
    if (searchTerm) {
      processedData = processedData.filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      processedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return processedData;
  }, [feedbackData, filters, searchTerm, sortConfig]);

  if (loading) return <Spinner />;

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Feedback List</h1>
          {noFeedbackMessage ? (
            <p className="text-center text-gray-600">{noFeedbackMessage}</p>
          ) : (
            <>
              <div className="mb-4 flex items-center">
                <Search className="mr-2" />
                <Input
                  placeholder="Search all columns..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="max-w-sm"
                />
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {["id", "title", "feedback", "feedback_by"].map((key) => (
                        <TableHead key={key} className="text-md">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                              <Button
                                variant="ghost"
                                onClick={() => handleSort(key)}
                                className="ml-2 p-0"
                              >
                                {sortConfig.key === key ? (
                                  sortConfig.direction === "ascending" ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )
                                ) : (
                                  <ChevronUp
                                    size={16}
                                    className="text-gray-400"
                                  />
                                )}
                              </Button>
                            </div>
                            <Input
                              placeholder={`Filter ${key}...`}
                              value={filters[key]}
                              onChange={(e) => handleFilterChange(e, key)}
                              className="mt-2"
                            />
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-md">
                          {item.id}
                        </TableCell>
                        <TableCell className="text-md">{item.title}</TableCell>
                        <TableCell className="text-md">
                          {item.feedback}
                        </TableCell>
                        <TableCell className="text-md">
                          {item.feedback_by}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
