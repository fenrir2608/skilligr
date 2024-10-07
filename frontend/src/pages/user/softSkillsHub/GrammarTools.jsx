import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import { Card, CardContent } from "@/components/ui/card";

export default function GrammarTools() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  if (loading) return <Spinner />;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const checkGrammar = async () => {
    setIsLoading(true); // Start loading
    setError(null); // Reset error state
    setResults([]); // Clear previous results

    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: inputText,
          language: "en-US",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch grammar suggestions.");
      }

      const data = await response.json();
      setResults(data.matches);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1">
          <section className="w-full py-8 md:py-16 lg:py-24">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Grammar Improvement Tool
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Improve your grammar skills with our interactive practice
                    module. Strengthen your writing and communication
                    abilities.
                  </p>
                </div>
                <Textarea
                  className="w-full h-40 p-4 rounded-md"
                  placeholder="Type or paste your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="flex space-x-4">
                  <Button onClick={checkGrammar} disabled={isLoading}>
                    Verify
                  </Button>
                  <Button onClick={() => setInputText("")}>Clear</Button>
                </div>
                {isLoading && <Spinner />} {/* Show spinner while loading */}
                {error && <p className="text-red-500">{error}</p>}
                {results.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium mb-4">Suggestions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.map((match, index) => (
                        <Card key={index} className="p-3">
                          <CardContent className="grid gap-4">
                            <p className="font-semibold pt-3">{match.message}</p>
                            <p className="text-gray-600 mb-2">
                              <em>{match.context.text}</em>
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {match.replacements.map((replacement, i) => (
                                <div
                                  key={i}
                                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
                                >
                                  {replacement.value}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
