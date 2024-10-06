import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import Spinner from "../../components/Spinner";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function Feedback() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (loading) return <Spinner />;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const feedbackData = {
      title,
      feedback,
      is_anonymous: isAnonymous ? 1 : 0,
    };

    try {
      const response = await fetch('http://localhost:3000/feedback/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const data = await response.text();
      setSuccess('Feedback submitted successfully!');
      setTitle('');
      setFeedback('');
      setIsAnonymous(false);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <div className="w-full max-w-2xl mx-auto py-12 px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Feedback</h1>
            <p className="text-muted-foreground">
              We value your feedback! Please let us know how we can improve the Skilligr experience.
            </p>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Feedback Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter a title for your feedback" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts and suggestions"
                  className="min-h-[150px]"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="anonymous" 
                  checked={isAnonymous} 
                  onCheckedChange={(checked) => setIsAnonymous(checked)} 
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Submit feedback anonymously
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
