import { Button } from "@/components/ui/button"
import { ArrowRight,CalendarDays,Mic } from  "lucide-react";

export default function PronunciationTests() {
  return (
    <div className="w-full max-w-3xl mx-auto py-12 md:py-16 lg:py-20">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Live Pronunciation Test</h1>
          <p className="mt-3 text-lg text-muted-foreground">Practice and improve your pronunciation skills.</p>
        </div>
        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex items-center justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <Mic className="h-6 w-6" />
                Start Test
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <div className="text-5xl font-bold text-primary">
                87<span className="text-3xl font-medium text-muted-foreground">/100</span>
              </div>
            </div>
            <div className="mt-4 text-center text-muted-foreground">Your pronunciation accuracy</div>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <h2 className="text-xl font-bold">Your Test History</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                    <CalendarDays className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">October 5, 2023</div>
                    <div className="text-sm text-muted-foreground">Pronunciation Accuracy: 92/100</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                    <CalendarDays className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">September 20, 2023</div>
                    <div className="text-sm text-muted-foreground">Pronunciation Accuracy: 88/100</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                    <CalendarDays className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">September 5, 2023</div>
                    <div className="text-sm text-muted-foreground">Pronunciation Accuracy: 84/100</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

