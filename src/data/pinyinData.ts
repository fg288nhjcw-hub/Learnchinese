// Complete Pinyin data for systematic learning
// Organized by daily lessons (15 days)

export interface PinyinItem {
  letter: string
  chinese: string
  example: string
  sound?: string // Optional for finals
  description?: string // Optional description for finals
  audioText?: string // Text to use for speech synthesis
}

export interface Lesson {
  day: number
  title: string
  description: string
  completed: boolean
  initials: PinyinItem[]
  finals: PinyinItem[]
  tonePractice: number[] // Which tones to practice
}

// Complete initials (23 total)
export const allInitials: PinyinItem[] = [
  // Labial (双唇音)
  { letter: 'b', chinese: '波', example: 'bā', sound: 'Similar to "b" in "boy"', audioText: '波' },
  { letter: 'p', chinese: '坡', example: 'pō', sound: 'Similar to "p" in "pay"', audioText: '坡' },
  { letter: 'm', chinese: '摸', example: 'mō', sound: 'Similar to "m" in "may"', audioText: '摸' },
  { letter: 'f', chinese: '佛', example: 'fó', sound: 'Similar to "f" in "fox"', audioText: '佛' },
  
  // Alveolar (舌尖中音)
  { letter: 'd', chinese: '的', example: 'dā', sound: 'Similar to "d" in "day"', audioText: '的' },
  { letter: 't', chinese: '特', example: 'tè', sound: 'Similar to "t" in "tea"', audioText: '特' },
  { letter: 'n', chinese: '讷', example: 'nè', sound: 'Similar to "n" in "no"', audioText: '讷' },
  { letter: 'l', chinese: '勒', example: 'lè', sound: 'Similar to "l" in "lay"', audioText: '勒' },
  
  // Velar (舌根音)
  { letter: 'g', chinese: '哥', example: 'gē', sound: 'Similar to "g" in "go"', audioText: '哥' },
  { letter: 'k', chinese: '科', example: 'kē', sound: 'Similar to "k" in "key"', audioText: '科' },
  { letter: 'h', chinese: '喝', example: 'hē', sound: 'Similar to "h" in "he"', audioText: '喝' },
  
  // Alveolo-palatal (舌面音)
  { letter: 'j', chinese: '鸡', example: 'jī', sound: 'Similar to "j" in "jeep"', audioText: '鸡' },
  { letter: 'q', chinese: '七', example: 'qī', sound: 'Similar to "ch" in "cheese"', audioText: '七' },
  { letter: 'x', chinese: '西', example: 'xī', sound: 'Similar to "sh" in "she"', audioText: '西' },
  
  // Retroflex (舌尖后音)
  { letter: 'zh', chinese: '知', example: 'zhī', sound: 'Similar to "j" in "jury"', audioText: '知' },
  { letter: 'ch', chinese: '吃', example: 'chī', sound: 'Similar to "ch" in "church"', audioText: '吃' },
  { letter: 'sh', chinese: '诗', example: 'shī', sound: 'Similar to "sh" in "sheep"', audioText: '诗' },
  { letter: 'r', chinese: '日', example: 'rì', sound: 'Similar to "r" in "right"', audioText: '日' },
  
  // Dental (舌尖前音)
  { letter: 'z', chinese: '资', example: 'zī', sound: 'Similar to "ds" in "beds"', audioText: '资' },
  { letter: 'c', chinese: '呲', example: 'cī', sound: 'Similar to "ts" in "cats"', audioText: '呲' },
  { letter: 's', chinese: '思', example: 'sī', sound: 'Similar to "s" in "see"', audioText: '思' },
  
  // Semi-vowels (半元音)
  { letter: 'y', chinese: '衣', example: 'yī', sound: 'Similar to "y" in "yes"', audioText: '衣' },
  { letter: 'w', chinese: '乌', example: 'wū', sound: 'Similar to "w" in "we"', audioText: '乌' }
]

// Complete finals (35+ total)
export const allFinals: PinyinItem[] = [
  // Single finals (单韵母) - 6
  { letter: 'a', chinese: '啊', example: 'mā', description: 'Similar to "ah"', audioText: '啊' },
  { letter: 'o', chinese: '喔', example: 'mō', description: 'Similar to "or"', audioText: '喔' },
  { letter: 'e', chinese: '鹅', example: 'hé', description: 'Similar to "uh"', audioText: '鹅' },
  { letter: 'i', chinese: '衣', example: 'mī', description: 'Similar to "ee"', audioText: '衣' },
  { letter: 'u', chinese: '乌', example: 'mū', description: 'Similar to "oo"', audioText: '乌' },
  { letter: 'ü', chinese: '迂', example: 'nǚ', description: 'Similar to German "ü"', audioText: '迂' },
  
  // Compound finals (复韵母) - 13
  { letter: 'ai', chinese: '爱', example: 'mái', description: 'Similar to "eye"', audioText: '爱' },
  { letter: 'ei', chinese: '诶', example: 'mēi', description: 'Similar to "ay"', audioText: '诶' },
  { letter: 'ui', chinese: '威', example: 'huí', description: 'Similar to "way"', audioText: '威' },
  { letter: 'ao', chinese: '奥', example: 'máo', description: 'Similar to "ow"', audioText: '奥' },
  { letter: 'ou', chinese: '欧', example: 'mōu', description: 'Similar to "oh"', audioText: '欧' },
  { letter: 'iu', chinese: '优', example: 'liù', description: 'Similar to "yo"', audioText: '优' },
  { letter: 'ie', chinese: '耶', example: 'xié', description: 'Similar to "yeah"', audioText: '耶' },
  { letter: 'üe', chinese: '约', example: 'xué', description: 'Similar to "yueh"', audioText: '约' },
  { letter: 'er', chinese: '儿', example: 'ér', description: 'Similar to "are"', audioText: '儿' },
  
  // Nasal finals (鼻韵母) - 16
  { letter: 'an', chinese: '安', example: 'mān', description: 'Similar to "ahn"', audioText: '安' },
  { letter: 'en', chinese: '恩', example: 'mēn', description: 'Similar to "un" in "under"', audioText: '恩' },
  { letter: 'in', chinese: '因', example: 'mīn', description: 'Similar to "in"', audioText: '因' },
  { letter: 'un', chinese: '温', example: 'wēn', description: 'Similar to "woon"', audioText: '温' },
  { letter: 'ün', chinese: '晕', example: 'yún', description: 'Similar to German "ün"', audioText: '晕' },
  
  { letter: 'ang', chinese: '昂', example: 'máng', description: 'Similar to "ahng"', audioText: '昂' },
  { letter: 'eng', chinese: '鞥', example: 'méng', description: 'Similar to "ung"', audioText: '鞥' },
  { letter: 'ing', chinese: '英', example: 'mīng', description: 'Similar to "ing"', audioText: '英' },
  { letter: 'ong', chinese: '东', example: 'dōng', description: 'Similar to "oong"', audioText: '东' },
  
  // Compound nasal finals (复鼻韵母)
  { letter: 'ian', chinese: '烟', example: 'mián', description: 'Similar to "yen"', audioText: '烟' },
  { letter: 'uan', chinese: '弯', example: 'wān', description: 'Similar to "wahn"', audioText: '弯' },
  { letter: 'üan', chinese: '冤', example: 'yuān', description: 'Similar to "ywen"', audioText: '冤' },
  { letter: 'iang', chinese: '央', example: 'yáng', description: 'Similar to "yang"', audioText: '央' },
  { letter: 'uang', chinese: '汪', example: 'wāng', description: 'Similar to "wang"', audioText: '汪' },
  { letter: 'iong', chinese: '雍', example: 'yōng', description: 'Similar to "yoong"', audioText: '雍' }
]

// 15-day learning plan
export const learningPlan: Lesson[] = [
  {
    day: 1,
    title: 'Day 1: Basics - b, p, m, f + a, o',
    description: 'Learn your first 4 initials and 2 simple finals',
    completed: false,
    initials: allInitials.slice(0, 4),
    finals: allFinals.slice(0, 2),
    tonePractice: [1]
  },
  {
    day: 2,
    title: 'Day 2: More Basics - d, t, n, l + e, i',
    description: 'Learn 4 more initials and 2 more finals',
    completed: false,
    initials: allInitials.slice(4, 8),
    finals: allFinals.slice(2, 4),
    tonePractice: [1, 2]
  },
  {
    day: 3,
    title: 'Day 3: Practice & Review - All Day 1-2',
    description: 'Review and practice all initials and finals learned',
    completed: false,
    initials: allInitials.slice(0, 8),
    finals: allFinals.slice(0, 4),
    tonePractice: [1, 2, 3]
  },
  {
    day: 4,
    title: 'Day 4: New Initials - g, k, h + u, ü',
    description: 'Learn 3 new initials and 2 more finals',
    completed: false,
    initials: allInitials.slice(8, 11),
    finals: allFinals.slice(4, 6),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 5,
    title: 'Day 5: Palatal Initials - j, q, x',
    description: 'Learn the tricky palatal initials',
    completed: false,
    initials: allInitials.slice(11, 14),
    finals: allFinals.slice(0, 6),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 6,
    title: 'Day 6: Review Week 1',
    description: 'Review all initials and finals from Days 1-5',
    completed: false,
    initials: allInitials.slice(0, 14),
    finals: allFinals.slice(0, 6),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 7,
    title: 'Day 7: Retroflex Initials - zh, ch, sh, r',
    description: 'Learn the retroflex initials (tongue curl)',
    completed: false,
    initials: allInitials.slice(14, 18),
    finals: allFinals.slice(0, 6),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 8,
    title: 'Day 8: Dental Initials - z, c, s',
    description: 'Learn the dental initials',
    completed: false,
    initials: allInitials.slice(18, 21),
    finals: allFinals.slice(6, 9),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 9,
    title: 'Day 9: Semi-vowels - y, w + Compound Finals',
    description: 'Learn semi-vowels and start compound finals',
    completed: false,
    initials: allInitials.slice(21, 23),
    finals: allFinals.slice(6, 13),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 10,
    title: 'Day 10: Mid-course Review',
    description: 'Review all initials and basic finals',
    completed: false,
    initials: allInitials,
    finals: allFinals.slice(0, 13),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 11,
    title: 'Day 11: Nasal Finals - an, en, in, un, ün',
    description: 'Learn the front nasal finals',
    completed: false,
    initials: [],
    finals: allFinals.slice(13, 18),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 12,
    title: 'Day 12: Back Nasal Finals - ang, eng, ing, ong',
    description: 'Learn the back nasal finals',
    completed: false,
    initials: [],
    finals: allFinals.slice(18, 22),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 13,
    title: 'Day 13: Compound Nasal Finals',
    description: 'Learn compound nasal finals',
    completed: false,
    initials: [],
    finals: allFinals.slice(22),
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 14,
    title: 'Day 14: Comprehensive Review',
    description: 'Review all pinyin you have learned',
    completed: false,
    initials: allInitials,
    finals: allFinals,
    tonePractice: [1, 2, 3, 4]
  },
  {
    day: 15,
    title: 'Day 15: Final Test & Certificate',
    description: 'Complete the final test and get your certificate!',
    completed: false,
    initials: allInitials,
    finals: allFinals,
    tonePractice: [1, 2, 3, 4]
  }
]

// Tones data
export const tones = [
  { tone: 'ā', name: 'First Tone', description: 'High level tone (¯)', example: 'mā (mom)', color: 'text-red-500' },
  { tone: 'á', name: 'Second Tone', description: 'Rising tone (´)', example: 'má (hemp)', color: 'text-orange-500' },
  { tone: 'ǎ', name: 'Third Tone', description: 'Falling-rising tone (ˇ)', example: 'mǎ (horse)', color: 'text-green-500' },
  { tone: 'à', name: 'Fourth Tone', description: 'Falling tone (`)', example: 'mà (scold)', color: 'text-blue-500' }
]
