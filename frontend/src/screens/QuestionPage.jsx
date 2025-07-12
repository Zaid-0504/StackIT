import React, { useEffect, useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import "./styles/tiptap.css"

const colors = {
  dark: "#1D1616",
  primary: "#8E1616",
  accent: "#D84040",
  light: "#EEEEEE",
}

const dummyQuestion = {
  id: 1,
  title: "How does prototypal inheritance work in JavaScript?",
  description: `Can someone explain the concept of prototypal inheritance in JavaScript with an example?`,
  views: 1234,
  upvotes: 120,
  downvotes: 10,
  score: 110,
  is_closed: false,
  created_at: "2025-07-10T12:34:56Z",
  updated_at: "2025-07-11T14:00:00Z",
  author: {
    id: 4,
    username: "diptesh_dev",
    reputation: 400,
  },
  tags: ["javascript", "inheritance", "prototypes"],
}

const dummyAnswers = [
  {
    id: 201,
    content:
      "Prototypal inheritance allows an object to inherit properties and methods from another object. Example: const child = Object.create(parent);",
    upvotes: 40,
    downvotes: 3,
    score: 37,
    questionId: 1,
    is_accepted: true,
    created_at: "2025-07-11T15:45:00Z",
    author: {
      id: 5,
      username: "code_master",
      reputation: 1200,
    },
  },
  {
    id: 202,
    content:
      "You can use classes in ES6, but they still use prototypal inheritance under the hood.",
    upvotes: 22,
    downvotes: 0,
    score: 22,
    questionId: 1,
    is_accepted: false,
    created_at: "2025-07-11T16:00:00Z",
    author: {
      id: 6,
      username: "es6fan",
      reputation: 800,
    },
  },
]

const QuestionPage = () => {
  const [question] = useState(dummyQuestion)
  const [answers] = useState(
    dummyAnswers.filter((a) => a.questionId === dummyQuestion.id)
  )

  const [headingLevel, setHeadingLevel] = useState("Paragraph")
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  const editor = useEditor({
    extensions: [StarterKit, Underline, Image, Link, TextAlign],
    content: "<p>Write your answer here...</p>",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[200px] bg-[#2a2020] p-4 rounded-md text-[#EEEEEE]",
      },
    },
  })

  const activeClass = "bg-[#D84040] text-white"
  const inactiveClass = "bg-white hover:bg-gray-100 text-gray-800"

  const handleAnswerSubmit = (e) => {
    e.preventDefault()
    const answerContent = editor?.getHTML()
    console.log("Submitted answer:", answerContent) // TODO: Replace with actual POST call // fetch(`/api/questions/${question.id}/answers`, { method: 'POST', body: JSON.stringify({ content: answerContent }) })
  }

  const addImage = () => {
    const url = window.prompt("Enter the image URL:")
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    if (!editor) return
    if (isLinkMenuOpen) {
      if (linkUrl === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run()
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: linkUrl })
          .run()
      }
      setIsLinkMenuOpen(false)
      setLinkUrl("")
    } else {
      const previousUrl = editor.getAttributes("link").href
      setLinkUrl(previousUrl || "")
      setIsLinkMenuOpen(true)
    }
  }

  const setHeading = (level) => {
    if (!editor) return
    if (level === 0) {
      editor.chain().focus().setParagraph().run()
      setHeadingLevel("Paragraph")
    } else {
      editor.chain().focus().toggleHeading({ level }).run()
      setHeadingLevel(`H${level}`)
    }
  }

  const setAlignment = (alignment) => {
    if (!editor) return
    editor.chain().focus().setTextAlign(alignment).run()
  }

  return (
    <div className="min-h-screen bg-[#1D1616] text-[#EEEEEE] px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#EEEEEE]">
            {question.title}
          </h1>

          <div className="text-sm text-[#EEEEEE99] flex gap-3 mt-2">
            <span>
              Asked by
              <span className="text-[#D84040]">{question.author.username}</span>
            </span>

            <span>· {new Date(question.created_at).toLocaleDateString()}</span>
            <span>· {question.views} views</span>
          </div>

          <div className="mt-4 text-base leading-relaxed">
            {question.description}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {question.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#8E1616] text-white text-sm px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-semibold text-[#EEEEEE] mb-4">
            Answers
          </h2>

          {answers.map((answer) => (
            <div
              key={answer.id}
              className="bg-[#2a2020] p-4 rounded-xl mb-4 shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div className="text-sm text-[#EEEEEE99] mb-2">
                  <span>
                    by
                    <span className="text-[#D84040]">
                      {answer.author.username}
                    </span>
                    • {new Date(answer.created_at).toLocaleString()}
                  </span>
                </div>

                {answer.is_accepted && (
                  <span className="text-[#8E1616] font-medium">Accepted</span>
                )}
              </div>

              <p className="mb-2 leading-relaxed">{answer.content}</p>

              <div className="flex gap-4 items-center text-sm text-[#EEEEEE]">
                <button className="flex items-center gap-1 hover:text-[#D84040]">
                  <ArrowUp size={16} /> {answer.upvotes}
                </button>

                <button className="flex items-center gap-1 hover:text-[#D84040]">
                  <ArrowDown size={16} /> {answer.downvotes}
                </button>

                <span className="ml-auto text-[#EEEEEE99]">
                  Score: {answer.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <h2 className="text-2xl font-semibold mb-4">Submit Your Answer</h2>

          <form onSubmit={handleAnswerSubmit} className="space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-700 rounded-t-lg border border-gray-600 mb-[-1px]">
                <div className="relative group">
                  <button
                    type="button"
                    className="px-2 py-1 rounded-md text-sm hover:bg-[#D84040] hover:text-white bg-[#EEEEEE] text-black"
                  >
                    {headingLevel} ▼
                  </button>

                  <div className="absolute left-0 mt-1 w-32 bg-white shadow-lg rounded-md z-10 hidden group-hover:block">
                    {[
                      { label: "Paragraph", level: 0 },
                      { label: "Heading 1", level: 1 },
                      { label: "Heading 2", level: 2 },
                      { label: "Heading 3", level: 3 },
                      { label: "Heading 4", level: 4 },
                      { label: "Heading 5", level: 5 },
                      { label: "Heading 6", level: 6 },
                    ].map(({ label, level }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setHeading(level)}
                        className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-black"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-5 w-px bg-gray-500 mx-1"></div>
                {[
                  {
                    icon: "B",
                    action: () => editor?.chain().focus().toggleBold().run(),
                    active: editor?.isActive("bold"),
                  },
                  {
                    icon: "I",
                    action: () => editor?.chain().focus().toggleItalic().run(),
                    active: editor?.isActive("italic"),
                  },
                  {
                    icon: "U",
                    action: () =>
                      editor?.chain().focus().toggleUnderline().run(),
                    active: editor?.isActive("underline"),
                  },
                ].map(({ icon, action, active }, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={action}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      active ? activeClass : inactiveClass
                    }`}
                  >
                    {icon}
                  </button>
                ))}

                <div className="h-5 w-px bg-gray-500 mx-1"></div>
                {[
                  {
                    icon: "• List",
                    action: () =>
                      editor?.chain().focus().toggleBulletList().run(),
                    active: editor?.isActive("bulletList"),
                  },
                  {
                    icon: "1. List",
                    action: () =>
                      editor?.chain().focus().toggleOrderedList().run(),
                    active: editor?.isActive("orderedList"),
                  },
                ].map(({ icon, action, active }, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={action}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      active ? activeClass : inactiveClass
                    }`}
                  >
                    {icon}
                  </button>
                ))}

                <div className="h-5 w-px bg-gray-500 mx-1"></div>
                {[
                  {
                    icon: "⬅",
                    action: () => setAlignment("left"),
                    active: editor?.isActive({ textAlign: "left" }),
                  },
                  {
                    icon: "🔘",
                    action: () => setAlignment("center"),
                    active: editor?.isActive({ textAlign: "center" }),
                  },
                  {
                    icon: "➡",
                    action: () => setAlignment("right"),
                    active: editor?.isActive({ textAlign: "right" }),
                  },
                ].map(({ icon, action, active }, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={action}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      active ? activeClass : inactiveClass
                    }`}
                  >
                    {icon}
                  </button>
                ))}

                <div className="h-5 w-px bg-gray-500 mx-1"></div>
                {isLinkMenuOpen ? (
                  <div className="flex items-center bg-gray-600 rounded-md overflow-hidden">
                    <input
                      type="text"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="Enter URL"
                      className="px-3 py-2 bg-gray-600 text-white text-sm w-40 focus:outline-none"
                      autoFocus
                    />

                    <button
                      type="button"
                      onClick={setLink}
                      className="px-2 py-2 bg-[#D84040] text-white"
                    >
                      ✔
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={setLink}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      editor?.isActive("link") ? activeClass : inactiveClass
                    }`}
                  >
                    🔗
                  </button>
                )}

                {[
                  {
                    icon: "<>",
                    action: () =>
                      editor?.chain().focus().toggleCodeBlock().run(),
                    active: editor?.isActive("codeBlock"),
                  },
                  {
                    icon: "❝❞",
                    action: () =>
                      editor?.chain().focus().toggleBlockquote().run(),
                    active: editor?.isActive("blockquote"),
                  },
                  { icon: "🖼️", action: addImage, active: false },
                ].map(({ icon, action, active }, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={action}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      active ? activeClass : inactiveClass
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              <div className="bg-gray-700 border border-gray-600 rounded-b-lg overflow-hidden">
                <EditorContent editor={editor} />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-[#D84040] hover:bg-[#8E1616] text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Submit Answer
              </button>

              <button
                type="button"
                onClick={() => editor?.commands.clearContent()}
                className="border border-[#D84040] text-[#D84040] px-6 py-2 rounded-lg hover:bg-[#D84040] hover:text-white transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuestionPage
