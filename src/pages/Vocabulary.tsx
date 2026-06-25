import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from 'react-router-dom'
import SpeechButton from '@/components/SpeechButton'

function Vocabulary() {
  const categories = {
    greeting: {
      name: 'Greetings',
      words: [
        { chinese: '你好', pinyin: 'nǐ hǎo', english: 'Hello' },
        { chinese: '早上好', pinyin: 'zǎo shàng hǎo', english: 'Good morning' },
        { chinese: '晚上好', pinyin: 'wǎn shàng hǎo', english: 'Good evening' },
        { chinese: '再见', pinyin: 'zài jiàn', english: 'Goodbye' },
        { chinese: '谢谢', pinyin: 'xiè xiè', english: 'Thank you' },
        { chinese: '不客气', pinyin: 'bù kè qì', english: "You're welcome" }
      ]
    },
    number: {
      name: 'Numbers',
      words: [
        { chinese: '一', pinyin: 'yī', english: 'One' },
        { chinese: '二', pinyin: 'èr', english: 'Two' },
        { chinese: '三', pinyin: 'sān', english: 'Three' },
        { chinese: '四', pinyin: 'sì', english: 'Four' },
        { chinese: '五', pinyin: 'wǔ', english: 'Five' },
        { chinese: '六', pinyin: 'liù', english: 'Six' },
        { chinese: '七', pinyin: 'qī', english: 'Seven' },
        { chinese: '八', pinyin: 'bā', english: 'Eight' },
        { chinese: '九', pinyin: 'jiǔ', english: 'Nine' },
        { chinese: '十', pinyin: 'shí', english: 'Ten' }
      ]
    },
    family: {
      name: 'Family Members',
      words: [
        { chinese: '爸爸', pinyin: 'bà ba', english: 'Father' },
        { chinese: '妈妈', pinyin: 'mā ma', english: 'Mother' },
        { chinese: '哥哥', pinyin: 'gē ge', english: 'Older brother' },
        { chinese: '姐姐', pinyin: 'jiě jie', english: 'Older sister' },
        { chinese: '弟弟', pinyin: 'dì di', english: 'Younger brother' },
        { chinese: '妹妹', pinyin: 'mèi mei', english: 'Younger sister' }
      ]
    },
    food: {
      name: 'Food',
      words: [
        { chinese: '米饭', pinyin: 'mǐ fàn', english: 'Rice' },
        { chinese: '面条', pinyin: 'miàn tiáo', english: 'Noodles' },
        { chinese: '水', pinyin: 'shuǐ', english: 'Water' },
        { chinese: '茶', pinyin: 'chá', english: 'Tea' },
        { chinese: '苹果', pinyin: 'píng guǒ', english: 'Apple' },
        { chinese: '香蕉', pinyin: 'xiāng jiāo', english: 'Banana' }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
            <h1 className="text-2xl font-bold text-purple-600">Basic Vocabulary</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-8 text-center">
            Learn everyday vocabulary. Click on different categories to view word lists. 
            Each word includes Pinyin and English translation. Click the 🔊 button to hear pronunciation.
          </p>

          <Tabs defaultValue="greeting" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              {Object.entries(categories).map(([key, cat]) => (
                <TabsTrigger key={key} value={key}>{cat.name}</TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(categories).map(([key, cat]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle>{cat.name}</CardTitle>
                    <CardDescription>
                      {cat.words.length} words total
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {cat.words.map((word, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-purple-600">{word.chinese}</span>
                            <SpeechButton text={word.chinese} />
                          </div>
                          <div className="text-center text-gray-700">
                            {word.pinyin}
                          </div>
                          <div className="text-right text-gray-600">
                            {word.english}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default Vocabulary
