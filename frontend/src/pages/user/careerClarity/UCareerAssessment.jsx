import { useState } from "react";
import { useAuth } from '../../../hooks/auth'
import Spinner from "../../../components/Spinner";
import {Link} from "react-router-dom"

export default function CareerAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
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
        title: "Software Development",
        description: "Become a skilled front-end or back-end developer.",
      },
      {
        title: "Data Analysis",
        description:
          "Develop data analysis skills and uncover valuable insights from data.",
      },
      {
        title: "Product Management",
        description:
          "Learn the skills to effectively manage and deliver successful products.",
      },
      {
        title: "Digital Marketing",
        description:
          "Develop expertise in digital marketing strategies and tactics.",
      },
      {
        title: "UX Design",
        description:
          "Explore the principles of user experience design and create intuitive interfaces.",
      },
      {
        title: "Data Science",
        description:
          "Dive into the world of data science and learn to extract insights from data.",
      },
    ];
    return careerRecommendations;
  };
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-28">
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
                {questions[currentQuestion].options.map((option, index) => (
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
                ))}
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
            <h1 className="text-3xl font-bold mb-2">Career Recommendations</h1>
            <p className="text-muted-foreground">
              Based on your responses, here are some career paths to consider:
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
                  href="#"
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
  );
}
