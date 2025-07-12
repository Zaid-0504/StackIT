/* eslint-disable no-unused-vars */
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
  Trash2, // Added for delete button
} from "lucide-react"

import { useAuth } from "../utils/authContext"
import AuthDialog from "../components/AuthDialog"
import { useNavigate } from "react-router-dom" // Uncomment when using React Router

// Mock data
const mockQuestions = [
  {
    id: 1,
    _id: "507f1f77bcf86cd799439011", // Added MongoDB-style ID
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
    _id: "507f1f77bcf86cd799439012", // Added MongoDB-style ID
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
    _id: "507f1f77bcf86cd799439013", // Added MongoDB-style ID
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
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300", // Added danger variant
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
const QuestionCard = ({ question, onClick, onDelete, isAdmin = false }) => {
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

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm("Are you sure you want to delete this question?")) {
      onDelete(question.id)
    }
  }

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={onClick}
    >
      {/* Admin Delete Button */}
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
          title="Delete question"
        >
          <Trash2 size={18} />
        </button>
      )}

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
const Header = ({ onLoginClick, onAskQuestion }) => {
  const { user } = useAuth()
  const navigate = useNavigate() // Uncomment when using React Router

  const handleAskQuestion = () => {
    navigate("/ask") // Uncomment when using React Router
    onAskQuestion() // Keep for current demo
  }

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl border-b border-slate-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-wrap justify-between items-center gap-6">
          {/* Left: Logo + Ask New Question */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-wide">
                StackIt
              </h1>
            </div>
            <button
              onClick={handleAskQuestion}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Ask New Question</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          

          {/* Right: Search + Login */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200"
                size={18}
              />
              <input
                type="text"
                placeholder="Search questions..."
                className="pl-12 pr-4 py-3 rounded-2xl bg-slate-800/60 backdrop-blur-sm text-white placeholder-slate-400 border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 w-64 shadow-lg"
              />
            </div>

            {user ? (
              <div className="flex items-center gap-3 bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-2xl px-4 py-2.5 shadow-lg hover:bg-slate-700/40 transition-all duration-200">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-600/50"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    {user.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {user.isAdmin ? "Admin" : "Online"}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="group relative bg-transparent border-2 border-slate-600/50 text-white px-6 py-2.5 rounded-2xl font-medium hover:border-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
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
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center ${
              activeFilter === filter.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{filter.label}</span>
            {filter.id === "more" && <ChevronDown size={16} className="ml-1" />}
          </button>
        ))}
      </div>
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
const HomeScreen = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [activeFilter, setActiveFilter] = useState("newest")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [questions, setQuestions] = useState(mockQuestions)
  const { user, login } = useAuth()
  const navigate = useNavigate() // Uncomment when using React Router

  // Check if user is admin
  const isAdmin = user && user.isAdmin

  const handleQuestionClick = (question) => {
    // Method 1: Navigate to question page with ID
    navigate(`/question`)
    // navigate(`/question/${question._id}`)

    // Method 2: Navigate to generic question page (current demo)
    // navigate('/question', { state: { question } })

    // For demo purposes, we'll just log the navigation
    console.log(`Would navigate to /question/${question._id}`)

    // You can also store the question ID in localStorage for the question page to use
    localStorage.setItem("currentQuestionId", question._id)
  }

  const handleAskQuestion = () => {
    navigate("/ask") // Uncomment when using React Router
    console.log("Would navigate to /ask")
  }

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLoginClick={() => setShowLogin(true)}
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        onAskQuestion={handleAskQuestion}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              {isAdmin && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                  Admin Mode
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Search size={20} />
              </button>
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
                onDelete={handleDeleteQuestion}
                // isAdmin={isAdmin}
                isAdmin={true}
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
      </main>

      <AuthDialog
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(data) => {
          if (data.username) {
            // handle signup
          } else {
            login(data.email, data.password)
          }
        }}
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default HomeScreen

/* 
ROUTING IMPLEMENTATION NOTES:

1. To implement React Router navigation, uncomment the following lines:
   - import { useNavigate } from "react-router-dom"
   - const navigate = useNavigate()
   
2. Navigation functions:
   - Question click: navigate(`/question/${question._id}`)
   - Ask question: navigate('/ask')
   
3. Route structure should be:
   - Home: '/'
   - Question detail: '/question/:id'
   - Ask question: '/ask'
   
4. In your main App.js, set up routes like:
   ```
   <Routes>
     <Route path="/" element={<HomeScreen />} />
     <Route path="/question/:id" element={<QuestionDetailScreen />} />
     <Route path="/ask" element={<AskQuestionScreen />} />
   </Routes>
   ```
   
5. Admin functionality:
   - Add isAdmin property to user object in auth context
   - Delete button only appears for admin users
   - Admin status is shown in header
   
6. Question ID handling:
   - Each question now has both 'id' and '_id' properties
   - '_id' is used for MongoDB-style routing
   - LocalStorage backup for question ID if needed
*/
