import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Link } from 'react-router-dom'
import { getProgress, getCompletionPercentage } from '@/utils/progress'
import { useEffect, useState } from 'react'
import { BookOpen, MessageSquare, Gamepad2, Trophy, Play, Mail, Send } from 'lucide-react'

function Home() {
  const [progress, setProgress] = useState(getProgress())
  const [percentage, setPercentage] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setProgress(getProgress())
    setPercentage(getCompletionPercentage())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail ? `${data.error}: ${data.detail}` : (data.error || 'Failed to send message'))
      }
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const modules = [
    {
      title: 'Pinyin Course',
      description: '15-day systematic Pinyin learning',
      path: '/pinyin',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Basic Vocabulary',
      description: 'Learn everyday vocabulary with audio',
      path: '/vocabulary',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Daily Conversations',
      description: 'Learn practical dialogues',
      path: '/dialogue',
      icon: Gamepad2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Interactive Practice',
      description: 'Test your knowledge',
      path: '/practice',
      icon: Trophy,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Video Lessons',
      description: 'Watch TikTok videos to learn',
      path: '/videos',
      icon: Play,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-bold text-blue-600">Learn Chinese</h1>
            <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
              FREE
            </span>
          </div>
          <p className="text-center text-gray-600 mt-2">Start your journey to master the Chinese language</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Progress Overview */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>
                Keep going! You're doing great. 💪
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Pinyin Course</span>
                    <span>{percentage}% complete</span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>🔥 Streak: {progress.streak} days</span>
                  <span>📅 Studied: {progress.totalDaysStudied} days</span>
                  <span>✅ Completed: {progress.completedDays.length}/15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Start Learning</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a learning module below to begin your Chinese learning journey. 
            We recommend starting with the Pinyin Course for systematic learning.
          </p>
        </div>

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {modules.map((module) => (
            <Link to={module.path} key={module.path}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <div className={`text-4xl mb-4 ${module.color}`}>
                    <module.icon className="h-12 w-12 mx-auto" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-3xl mb-4">🌍</div>
              <h4 className="font-semibold mb-2">Global Access</h4>
              <p className="text-sm text-gray-600">Fast access from anywhere in the world, learn anytime</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-4">📱</div>
              <h4 className="font-semibold mb-2">Responsive Design</h4>
              <p className="text-sm text-gray-600">Supports mobile, tablet, computer and other devices</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="font-semibold mb-2">Systematic Learning</h4>
              <p className="text-sm text-gray-600">From Pinyin to conversations, master Chinese step by step</p>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Section */}
      <section className="mt-16 max-w-4xl mx-auto px-4">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-blue-600 text-white p-3 rounded-full">
                <Mail className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl">Have Questions About Learning Chinese?</CardTitle>
            <CardDescription className="text-base mt-2">
              Feel free to reach out anytime — I'm happy to help you on your Chinese learning journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false)
                    setForm({ name: '', email: '', subject: '', message: '' })
                  }}
                  className="mt-4 text-sm text-blue-600 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    maxLength={200}
                    placeholder="What's your question about?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    maxLength={5000}
                    rows={5}
                    placeholder="Tell me what you'd like to know about learning Chinese..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  />
                </div>
                {error && (
                  <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Your email is only used to reply to your message. We never share it.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2026 Learn Chinese - Making Chinese Learning Easier
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
