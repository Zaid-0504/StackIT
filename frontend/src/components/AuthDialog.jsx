// components/AuthDialog.js
import React, { useState } from "react"
import { X } from "lucide-react"
import Button from "./Button" // Assumes Button is a reusable component

const AuthDialog = ({ isOpen, onClose, onLogin }) => {
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    dob: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    const dataToSubmit = isSignup
      ? {
          email: formData.email,
          username: formData.username,
          fullName: formData.fullName,
          dob: formData.dob,
          password: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
        }

    onLogin(dataToSubmit)
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
            <label className="block text-sm font-medium mb-1">Email</label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>

                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>

                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Birth
                </label>

                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>

              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            {isSignup ? "Sign Up" : "Login"}
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

export default AuthDialog
