import React, { useState, useEffect } from "react"
import {
  Search,
  Bell,
  User,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Eye,
  Plus,
  Home,
  Edit,
  Check,
  X,
  Menu,
  Filter,
} from "lucide-react"

// Mock data
const mockQuestions = [
  {
    id: 1,
    title:
      "How to join 2 columns in a data set to make a separate column in SQL",
    description:
      "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column to combine...",
    tags: ["sql", "database", "join"],
    author: "John Doe",
    votes: 5,
    answers: 3,
    views: 125,
    timeAgo: "5 ans",
    isAnswered: false,
  },
  {
    id: 2,
    title: "React useState not updating immediately",
    description:
      "I'm having trouble with useState not updating the state immediately after calling the setter function...",
    tags: ["react", "javascript", "hooks"],
    author: "Jane Smith",
    votes: 3,
    answers: 2,
    views: 89,
    timeAgo: "3 ans",
    isAnswered: true,
  },
  {
    id: 3,
    title: "Best practices for Node.js error handling",
    description:
      "What are the recommended patterns for handling errors in Node.js applications?",
    tags: ["nodejs", "error-handling", "best-practices"],
    author: "Mike Johnson",
    votes: 8,
    answers: 5,
    views: 234,
    timeAgo: "2 ans",
    isAnswered: true,
  },
]

const mockAnswers = [
  {
    id: 1,
    content:
      "You can use the CONCAT function in SQL to combine two columns. Here's the syntax: SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM your_table;",
    author: "SQL Expert",
    votes: 12,
    timeAgo: "4 ans",
    isAccepted: true,
  },
  {
    id: 2,
    content:
      "Another approach is to use the || operator (in PostgreSQL) or + operator (in SQL Server): SELECT first_name || ' ' || last_name AS full_name FROM your_table;",
    author: "Database Pro",
    votes: 8,
    timeAgo: "3 ans",
    isAccepted: false,
  },
]

// Context for authentication
const AuthContext = React.createContext()

// Custom hook for auth
const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Auth Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email, password) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: 1,
        name: "John Doe",
        email: email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&round=true",
        role: "user",
      })
      setIsLoading(false)
    }, 1000)
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Reusable Button Component
const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-300",
    ghost: "text-gray-600 hover:bg-gray-100 disabled:text-gray-400",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Tag Component
const Tag = ({ children, onClick, removable = false, onRemove }) => {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="text-blue-600 hover:text-blue-800"
        >
          <X size={14} />
        </button>
      )}
    </span>
  )
}

// Vote Component
const VoteButtons = ({ votes, onUpvote, onDownvote, userVote }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onUpvote}
        className={`p-2 rounded-full transition-colors ${
          userVote === "up"
            ? "bg-green-100 text-green-600"
            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        }`}
      >
        <ArrowUp size={20} />
      </button>

      <span
        className={`font-semibold ${
          votes > 0
            ? "text-green-600"
            : votes < 0
            ? "text-red-600"
            : "text-gray-500"
        }`}
      >
        {votes}
      </span>

      <button
        onClick={onDownvote}
        className={`p-2 rounded-full transition-colors ${
          userVote === "down"
            ? "bg-red-100 text-red-600"
            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        }`}
      >
        <ArrowDown size={20} />
      </button>
    </div>
  )
}

// Question Card Component
const QuestionCard = ({ question, onClick }) => {
  const [userVote, setUserVote] = useState(null)
  const [voteCount, setVoteCount] = useState(question.votes)

  const handleUpvote = (e) => {
    e.stopPropagation()
    if (userVote === "up") {
      setUserVote(null)
      setVoteCount(voteCount - 1)
    } else {
      setUserVote("up")
      setVoteCount(voteCount + (userVote === "down" ? 2 : 1))
    }
  }

  const handleDownvote = (e) => {
    e.stopPropagation()
    if (userVote === "down") {
      setUserVote(null)
      setVoteCount(voteCount + 1)
    } else {
      setUserVote("down")
      setVoteCount(voteCount - (userVote === "up" ? 2 : 1))
    }
  }

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <VoteButtons
          votes={voteCount}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          userVote={userVote}
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
            {question.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {question.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 mb-3">
              {question.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MessageSquare size={16} />
                {question.answers} answers
              </span>
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {question.views} views
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>asked {question.timeAgo} by</span>
              <span className="font-medium">{question.author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Header Component
const Header = ({ onLoginClick, onMenuClick, isMobileMenuOpen }) => {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState(3)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-2">StackIt</h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Button onClick={onLoginClick} size="sm">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// Login Modal Component
const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)
  const { login, isLoading } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {isSignup ? "Sign Up" : "Login"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}

// Filter Component
const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "newest", label: "Newest" },
    { id: "unanswered", label: "Unanswered" },
    { id: "active", label: "Active" },
    { id: "more", label: "More" },
  ]

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
            {filter.id === "more" && <ChevronDown size={16} className="ml-1" />}
          </button>
        ))}
      </div>
    </div>
  )
}

// Ask Question Form Component
const AskQuestionForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState("")

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      tags,
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What's your programming question? Be specific."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Include all the information someone would need to answer your question..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagAdd}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Press Enter to add tags (e.g., javascript, react, node.js)"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Tag key={tag} removable onRemove={() => handleTagRemove(tag)}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit">Post Question</Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

// Question Detail Component
const QuestionDetail = ({ question, onBack }) => {
  const [newAnswer, setNewAnswer] = useState("")
  const [answers, setAnswers] = useState(mockAnswers)
  const { user } = useAuth()

  const handleAnswerSubmit = (e) => {
    e.preventDefault()
    if (newAnswer.trim()) {
      const answer = {
        id: Date.now(),
        content: newAnswer,
        author: user?.name || "Anonymous",
        votes: 0,
        timeAgo: "just now",
        isAccepted: false,
      }
      setAnswers([...answers, answer])
      setNewAnswer("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to questions
          </button>
        </div>

        <div className="flex gap-4">
          <VoteButtons
            votes={question.votes}
            onUpvote={() => {}}
            onDownvote={() => {}}
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {question.title}
            </h1>

            <div className="prose max-w-none mb-4">
              <p className="text-gray-700">{question.description}</p>
            </div>

            <div className="flex gap-2 mb-4">
              {question.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>{question.answers} answers</span>
                <span>{question.views} views</span>
              </div>
              <div>
                asked {question.timeAgo} by{" "}
                <span className="font-medium">{question.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">
          {answers.length} Answer{answers.length !== 1 ? "s" : ""}
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => (
            <div
              key={answer.id}
              className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex gap-4">
                <VoteButtons
                  votes={answer.votes}
                  onUpvote={() => {}}
                  onDownvote={() => {}}
                />

                <div className="flex-1">
                  {answer.isAccepted && (
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="text-green-600" size={20} />
                      <span className="text-green-600 font-medium">
                        Accepted Answer
                      </span>
                    </div>
                  )}

                  <div className="prose max-w-none mb-4">
                    <p className="text-gray-700">{answer.content}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        Share
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        Edit
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        Follow
                      </button>
                    </div>
                    <div>
                      answered {answer.timeAgo} by{" "}
                      <span className="font-medium">{answer.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Answer */}
      {user && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Your Answer</h3>

          <form onSubmit={handleAnswerSubmit} className="space-y-4">
            <div>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your answer here..."
                required
              />
            </div>

            <Button type="submit">Post Your Answer</Button>
          </form>
        </div>
      )}
    </div>
  )
}

// Mobile Search Component
const MobileSearch = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

// Main App Component
const StackIt = () => {
  const [currentView, setCurrentView] = useState("home")
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [activeFilter, setActiveFilter] = useState("newest")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [questions, setQuestions] = useState(mockQuestions)

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question)
    setCurrentView("question-detail")
  }

  const handleAskQuestion = () => {
    setCurrentView("ask-question")
  }

  const handleQuestionSubmit = (questionData) => {
    const newQuestion = {
      id: Date.now(),
      title: questionData.title,
      description: questionData.description,
      tags: questionData.tags,
      author: "Current User",
      votes: 0,
      answers: 0,
      views: 0,
      timeAgo: "just now",
      isAnswered: false,
    }
    setQuestions([newQuestion, ...questions])
    setCurrentView("home")
  }

  const handleBackToHome = () => {
    setCurrentView("home")
    setSelectedQuestion(null)
  }

  const renderContent = () => {
    switch (currentView) {
      case "ask-question":
        return (
          <AskQuestionForm
            onSubmit={handleQuestionSubmit}
            onCancel={handleBackToHome}
          />
        )

      case "question-detail":
        return (
          <QuestionDetail
            question={selectedQuestion}
            onBack={handleBackToHome}
          />
        )

      default:
        return (
          <div className="space-y-6">
            {/* Mobile Search */}
            <MobileSearch
              isOpen={showMobileSearch}
              onClose={() => setShowMobileSearch(false)}
            />

            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  All Questions
                </h2>
                <span className="text-gray-500">
                  {questions.length} questions
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Search size={20} />
                </button>

                <Button
                  onClick={handleAskQuestion}
                  className="whitespace-nowrap"
                >
                  <Plus size={20} />
                  Ask Question
                </Button>
              </div>
            </div>

            {/* Filters */}
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClick={() => handleQuestionClick(question)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                ‹
              </button>
              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 rounded ${
                    page === 1
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                ›
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onLoginClick={() => setShowLogin(true)}
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>

        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </AuthProvider>
  )
}

export default StackIt
