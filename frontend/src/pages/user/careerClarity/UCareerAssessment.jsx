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
      prompt: "What technology area interests you most?",
      options: [
        "Data and Analytics",
        "Software Development",
        "Cybersecurity",
        "User Experience",
        "Cloud and Infrastructure"
      ],
    },
    {
      prompt: "Which skill level best describes you?",
      options: [
        "Complete Beginner",
        "Some Basic Knowledge",
        "Professional Seeking Advancement",
      ],
    },
    {
      prompt: "What motivates you in your career?",
      options: [
        "Solving Complex Problems",
        "Creating Innovative Solutions",
        "Making a Tangible Impact",
        "Continuous Learning",
        "Financial Growth"
      ],
    },
    {
      prompt: "What type of work environment do you prefer?",
      options: [
        "Team-based Collaboration",
        "Independent Work",
        "Research and Analysis",
        "Creative Problem Solving",
        "Structured Processes"
      ],
    },
    {
      prompt: "What's your primary career aspiration?",
      options: [
        "Technical Excellence",
        "Leadership Role",
        "Entrepreneurship",
        "Global Impact",
        "Specialization in a Niche"
      ],
    }
  ];

  const allRecommendations = [
    {
      title: "AI Data Scientist",
      tags: ["Data and Analytics", "Solving Complex Problems", "Research and Analysis"],
      description: "Learn to analyze data and build predictive models using machine learning.",
      link: "/Learning paths/ai-data-scientist.pdf",
    },
    {
      title: "Backend Development",
      tags: ["Software Development", "Creating Innovative Solutions", "Structured Processes"],
      description: "Build scalable and secure server-side applications using Node.js.",
      link: "/Learning paths/backend.pdf",
    },
    {
      title: "Cyber Security",
      tags: ["Cybersecurity", "Making a Tangible Impact", "Technical Excellence"],
      description: "Protect organizations from cyber threats and secure sensitive data.",
      link: "/Learning paths/cyber-security.pdf",
    },
    {
      title: "Full-Stack Development",
      tags: ["Software Development", "Team-based Collaboration", "Continuous Learning"],
      description: "Master skills to build modern web applications from frontend to backend.",
      link: "/Learning paths/full-stack.pdf",
    },
    {
      title: "UX Design",
      tags: ["User Experience", "Creative Problem Solving", "Global Impact"],
      description: "Create user-friendly interfaces and design engaging digital experiences.",
      link: "/Learning paths/ux-design.pdf",
    },
    {
      title: "DevOps Engineer",
      tags: ["Cloud and Infrastructure", "Structured Processes", "Entrepreneurship"],
      description: "Develop skills to automate and streamline software development.",
      link: "/Learning paths/devops.pdf",
    }
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
    const userInterests = questions.map((q, idx) => 
      q.options[selectedAnswers[idx]]
    );

    const scoredRecommendations = allRecommendations.map(rec => {
      const matchScore = rec.tags.filter(tag => 
        userInterests.includes(tag)
      ).length;
      return { ...rec, matchScore };
    });

    return scoredRecommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
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
                    Answer a few questions to get personalized career recommendations.
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
                      disabled={selectedAnswers[currentQuestion] === undefined}
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
                    Based on your responses, here are personalized career paths:
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
                      <p className="text-muted-foreground mb-4">
                        {recommendation.description}
                      </p>
                      <a
                        href={recommendation.link}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      >
                        Explore Learning Path
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