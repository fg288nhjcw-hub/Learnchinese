import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Link } from 'react-router-dom'
import { getProgress, getCompletionPercentage } from '@/utils/progress'
import { useEffect, useState } from 'react'
import { BookOpen, MessageSquare, Gamepad2, Trophy, Play, Mail } from 'lucide-react'

function Home() {
  const [progress, setProgress] = useState(getProgress())
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    setProgress(getProgress())
    setPercentage(getCompletionPercentage())
  }, [])

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
          <CardContent className="text-center">
            <a
              href="mailto:amy15862341636@outlook.com"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Contact Me: amy15862341636@outlook.com</span>
            </a>
            <p className="text-sm text-gray-500 mt-4">
              I usually reply within 24 hours 💌
            </p>
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
