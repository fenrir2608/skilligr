import React, { useState } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function CareerAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { authStatus, loading } = useAuth();
  if (loading) return <Spinner />;

  const questions = [
    {
      prompt: "What best describes your current career interests?",
      options: [
        "Software Development",
        "Data Analysis",
        "Product Management",
        "Digital Marketing",
        "UX Design",
        "Data Science",
      ],
    },
    {
      prompt: "What is your current skill level?",
      options: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      prompt: "What type of work environment do you prefer?",
      options: [
        "Fast-paced and dynamic",
        "Structured and organized",
        "Collaborative and team-oriented",
        "Independent and autonomous",
      ],
    },
    {
      prompt: "What are your long-term career goals?",
      options: [
        "Become an expert in my field",
        "Manage a team or department",
        "Start my own business",
        "Work on innovative projects",
        "Make a positive impact on the world",
      ],
    },
    {
      prompt: "How important is work-life balance to you?",
      options: [
        "Extremely important",
        "Somewhat important",
        "Not very important",
      ],
    },
  ];
  const handleAnswerSelect = (index) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = index;
    setSelectedAnswers(newSelectedAnswers);
  };
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  const calculateResults = () => {
    const careerRecommendations = [
      {
        title: "Full-Stack Development",
        description: "Master the skills to build modern web applications.",
        link: "/Learning paths/full-stack.pdf",
      },
      {
        title: "AI Data Scientist",
        description:
          "Learn to analyze data and build predictive models using machine learning.",
        link: "/Learning paths/ai-data-scientist.pdf",
      },
      {
        title: "Backend Development",
        description:
          "Build scalable and secure server-side applications using Node.js.",
        link: "/Learning paths/backend.pdf",
      },
      {
        title: "Cyber Security",
        description:
          "Protect organizations from cyber threats and secure sensitive data.",
        link: "/Learning paths/cyber-security.pdf",
      },
      {
        title: "DevOps Engineer",
        description:
          "Develop the skills to automate and streamline software development.",
        link: "/Learning paths/devops.pdf",
      },
      {
        title: "UX design",
        description:
          "Create user-friendly interfaces and design engaging digital experiences.",
        link: "/Learning paths/ux-design.pdf",
      },
    ];
    return careerRecommendations;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {!showResults ? (
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Career Assessment</h1>
                  <p className="text-muted-foreground">
                    Answer a few questions to get personalized career
                    recommendations.
                  </p>
                </div>
                <div className="bg-card rounded-md p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">
                      {questions[currentQuestion].prompt}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {questions[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            className={`bg-background rounded-md p-6 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${
                              selectedAnswers[currentQuestion] === index
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      onClick={handleNextQuestion}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">
                    Career Recommendations
                  </h1>
                  <p className="text-muted-foreground">
                    Based on your responses, here are some career paths to
                    consider:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {calculateResults().map((recommendation, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-md p-6 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                    >
                      <h3 className="text-lg font-bold mb-2">
                        {recommendation.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {recommendation.description}
                      </p>
                      <a
                        href={recommendation.link}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-4"
                      >
                        Download Learning Path
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
