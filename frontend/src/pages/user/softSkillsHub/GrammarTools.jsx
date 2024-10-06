import { useState } from "react";
import { Button } from "@/components/ui/button"
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { useAuth } from '../../../hooks/auth';
import Spinner from "../../../components/Spinner";
  
export default function GrammarTools() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return <Spinner />;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1">
          <section className="w-full py-8 md:py-16 lg:py-24">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Grammar Improvement Tools
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Improve your grammar skills with our interactive practice modules. Strengthen your writing and
                    communication abilities.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-2 md:py-2 lg:py-3">
            <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Sentence Structure</h3>
                  <p className="text-muted-foreground">
                    Practice identifying and correcting common sentence structure issues.
                  </p>
                  <Button className="w-full">Start Practice</Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Punctuation Mastery</h3>
                  <p className="text-muted-foreground">Improve your punctuation skills with interactive exercises.</p>
                  <Button className="w-full">Start Practice</Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Grammar Fundamentals</h3>
                  <p className="text-muted-foreground">Strengthen your understanding of core grammar principles.</p>
                  <Button className="w-full">Start Practice</Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Vocabulary Builder</h3>
                  <p className="text-muted-foreground">Expand your vocabulary and improve your word choice.</p>
                  <Button className="w-full">Start Practice</Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}