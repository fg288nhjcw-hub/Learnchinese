// Progress tracking utility using localStorage

export interface LearningProgress {
  currentDay: number
  completedDays: number[]
  streak: number
  lastCheckIn: string | null // ISO date string
  startDate: string | null
  totalDaysStudied: number
}

const PROGRESS_KEY = 'chinese-learning-progress'

// Get progress from localStorage
export function getProgress(): LearningProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress()
  }

  const stored = localStorage.getItem(PROGRESS_KEY)
  if (!stored) {
    return getDefaultProgress()
  }

  try {
    return JSON.parse(stored)
  } catch {
    return getDefaultProgress()
  }
}

// Save progress to localStorage
export function saveProgress(progress: LearningProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

// Get default progress
function getDefaultProgress(): LearningProgress {
  return {
    currentDay: 1,
    completedDays: [],
    streak: 0,
    lastCheckIn: null,
    startDate: null,
    totalDaysStudied: 0
  }
}

// Check in for today
export function checkInToday(day: number): LearningProgress {
  const progress = getProgress()
  const today = new Date().toISOString().split('T')[0]

  // If already checked in today, just return
  if (progress.lastCheckIn === today && progress.completedDays.includes(day)) {
    return progress
  }

  // Update start date if first time
  if (!progress.startDate) {
    progress.startDate = today
  }

  // Add to completed days if not already there
  if (!progress.completedDays.includes(day)) {
    progress.completedDays.push(day)
    progress.totalDaysStudied += 1
  }

  // Update streak
  if (progress.lastCheckIn) {
    const lastDate = new Date(progress.lastCheckIn)
    const todayDate = new Date(today)
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      progress.streak += 1
    } else if (diffDays > 1) {
      progress.streak = 1 // Reset streak
    }
    // If diffDays === 0, it's the same day, don't change streak
  } else {
    progress.streak = 1
  }

  progress.lastCheckIn = today

  // Update current day
  if (day >= progress.currentDay) {
    progress.currentDay = Math.min(day + 1, 15)
  }

  saveProgress(progress)
  return progress
}

// Reset progress (for testing)
export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PROGRESS_KEY)
}

// Get completion percentage
export function getCompletionPercentage(): number {
  const progress = getProgress()
  return Math.round((progress.completedDays.length / 15) * 100)
}
