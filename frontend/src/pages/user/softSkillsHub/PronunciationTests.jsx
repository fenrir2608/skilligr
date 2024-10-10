import { useState, useEffect,useCallback } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import { ArrowRight, CalendarDays, Mic } from "lucide-react";

// Function to generate random English sentences
const generateSentence = () => {
  const sentences = [
    "She sells seashells by the seashore",
    "How can a clam cram in a clean cream can",
    "I scream, you scream, we all scream for ice cream",
    "I saw Susie sitting in a shoeshine shop",
    "Peter Piper picked a peck of pickled peppers",
    "Betty Botter bought some butter but she said this butter's bitter",
    "A proper copper coffee pot",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood",
    "I wish to wish the wish you wish to wish, but if you wish the wish the witch wishes, I won't wish the wish you wish to wish",
    "The sixth sick sheik's sixth sheep's sick",
    "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair, Fuzzy Wuzzy wasn't very fuzzy, was he",
    "If a dog chews shoes, whose shoes does he choose",
    "Which witch is which, Which witch is which, Which witch is which"
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
};

// Function to calculate accuracy
const calculateAccuracy = (original, recognized) => {

  if (!original) {
    console.error("Original sentence is empty!");
    return 0;
  }
  if (!recognized) {
    console.error("Recognized transcript is empty!");
    return 0;
  }
  const originalWords = original.toLowerCase().trim().split(/\s+/);
  const recognizedWords = recognized.toLowerCase().trim().split(/\s+/);

  let correctWords = 0;
  const totalWords = Math.max(originalWords.length, recognizedWords.length);

  originalWords.forEach((word, index) => {
    if (recognizedWords[index] && word === recognizedWords[index]) {
      correctWords++;
    }
  });

  const accuracy = totalWords > 0 ? (correctWords / totalWords) * 100 : 0;

  return Math.round(accuracy);
};

export default function PronunciationTests() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentSentence, setCurrentSentence] = useState("");
  const [accuracy, setAccuracy] = useState(null); // Start with null to show "Calculating..."
  const [testHistory, setTestHistory] = useState([]);
  const [transcript, setTranscript] = useState(""); // State to store the recognized speech
  const [error, setError] = useState(null);

  const generateNewSentence = useCallback(() => {
    const newSentence = generateSentence();
    setCurrentSentence(newSentence);
    return newSentence;
  }, []);

  useEffect(() => {
    generateNewSentence();
  }, [generateNewSentence]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("pronunciationTestHistory")) || [];
    setTestHistory(storedHistory);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const startTest = useCallback(() => {
    const newSentence = generateNewSentence();
    setIsListening(true);
    setAccuracy(null);
    setTranscript("");
    setError(null);

    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      console.error("Speech recognition not supported");
      setError("Speech recognition is not supported in this browser.");
      setIsListening(false);
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const recognizedSpeech = event.results[0][0].transcript;

      setTranscript(recognizedSpeech);

      const newAccuracy = calculateAccuracy(newSentence, recognizedSpeech);

      setAccuracy(newAccuracy);

      // Update history after calculating accuracy
      const newHistory = [
        {
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          accuracy: newAccuracy,
        },
        ...testHistory.slice(0, 2),
      ];

      setTestHistory(newHistory);
      localStorage.setItem(
        "pronunciationTestHistory",
        JSON.stringify(newHistory)
      );

      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [generateNewSentence]);

  if (loading) return <Spinner />;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header onMenuClick={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <div className="flex flex-col flex-1 items-center justify-center space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Live Pronunciation Test
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Practice and improve your pronunciation skills.
              </p>
            </div>
            <div className="bg-card rounded-lg shadow-sm overflow-hidden w-full max-w-md">
              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <div className="flex items-center justify-center">
                  <Button
                    size="lg"
                    className={`flex items-center gap-2 ${
                      isListening ? "animate-pulse bg-red-500" : ""
                    }`}
                    onClick={startTest}
                    disabled={isListening}
                  >
                    <Mic className="h-6 w-6" />
                    {isListening ? "Listening..." : "Start Test"}
                  </Button>
                </div>
                {currentSentence && (
                  <div className="mt-4 text-center">
                    <p className="font-medium">Read this sentence:</p>
                    <p className="mt-2 text-lg">{currentSentence}</p>
                  </div>
                )}
                <div className="mt-8 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary">
                    {accuracy === null ? "Calculating..." : `${accuracy}`}
                    <span className="text-3xl font-medium text-muted-foreground">
                      /100
                    </span>
                  </div>
                </div>
                {error && (
                  <div className="mt-4 text-center text-red-500">{error}</div>
                )}
                <div className="mt-4 text-center text-muted-foreground">
                  Your pronunciation accuracy
                </div>
                {transcript && (
                  <div className="mt-4 text-center text-muted-foreground">
                    <p>Recognized Speech:</p>
                    <p className="italic">"{transcript}"</p>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-sm overflow-hidden w-full max-w-md">
              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <h2 className="text-xl font-bold">Your Test History</h2>
                <div className="mt-4 space-y-4">
                  {testHistory.map((test, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                          <CalendarDays className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">{test.date}</div>
                          <div className="text-sm text-muted-foreground">
                            {test.time}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Pronunciation Accuracy: {test.accuracy}/100
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
