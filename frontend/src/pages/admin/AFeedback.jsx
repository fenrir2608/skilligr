import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../../hooks/auth"
import Spinner from "../../components/Spinner"
import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"
import { Link, useNavigate } from "react-router-dom";


export default function AdminFeedback() {
    const { authStatus, loading } = useAuth();

    const [feedbackData, setFeedbackData] = useState([]);
    const [noFeedbackMessage, setNoFeedbackMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(authStatus)
        {
          const fetchFeedback = async () => {
            try{
              const response = await fetch("http://localhost:3000/feedback/viewAll", {
                method: "GET",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              });
    
              if(response.ok)
              {
                const data = await response.json();
                setFeedbackData(data);
              }
              else if(response.status === 401)
              {
                setNoFeedbackMessage("You are not authorized to view feedbacks.");
              }
              else
              {
                const text = await response.text();
                if(text === "No feedbacks.")
                {
                  setNoFeedbackMessage("No feeedbacks available.");
                }
                else
                {
                  console.error("Unexpected response:", text);
                }
              }
            }
            catch(error)
            {
              console.error("Failed to fetch feedbacks", error);
            }
          }
          fetchFeedback();
        }
      }, [authStatus]);

      
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    if (loading) return <Spinner />;
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

return (
    <div className="flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
            <Header onMenuClick={toggleSidebar} />
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Feedback List</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {feedbackData.map((item) => (
                        <Card key={item.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="mb-4">{item.feedback}</p>
                                <p className="text-sm text-muted-foreground">Feedback by: {item.feedback_by}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
}