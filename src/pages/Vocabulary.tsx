import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from 'react-router-dom'
import SpeechButton from '@/components/SpeechButton'

function Vocabulary() {
  const categories = {
    greeting: {
      name: 'Greetings',
      icon: '👋',
      words: [
        { chinese: '你好', pinyin: 'nǐ hǎo', english: 'Hello / Hi' },
        { chinese: '早上好', pinyin: 'zǎo shàng hǎo', english: 'Good morning' },
        { chinese: '下午好', pinyin: 'xià wǔ hǎo', english: 'Good afternoon' },
        { chinese: '晚上好', pinyin: 'wǎn shàng hǎo', english: 'Good evening' },
        { chinese: '晚安', pinyin: 'wǎn ān', english: 'Good night' },
        { chinese: '再见', pinyin: 'zài jiàn', english: 'Goodbye' },
        { chinese: '谢谢', pinyin: 'xiè xiè', english: 'Thank you' },
        { chinese: '不客气', pinyin: 'bù kè qì', english: "You're welcome" },
        { chinese: '对不起', pinyin: 'duì bù qǐ', english: "I'm sorry" },
        { chinese: '没关系', pinyin: 'méi guān xi', english: "It doesn't matter / No problem" },
        { chinese: '请', pinyin: 'qǐng', english: 'Please' },
        { chinese: '好的', pinyin: 'hǎo de', english: 'OK / Sure' }
      ]
    },
    number: {
      name: 'Numbers',
      icon: '🔢',
      words: [
        { chinese: '零', pinyin: 'líng', english: 'Zero' },
        { chinese: '一', pinyin: 'yī', english: 'One' },
        { chinese: '二', pinyin: 'èr', english: 'Two' },
        { chinese: '三', pinyin: 'sān', english: 'Three' },
        { chinese: '四', pinyin: 'sì', english: 'Four' },
        { chinese: '五', pinyin: 'wǔ', english: 'Five' },
        { chinese: '六', pinyin: 'liù', english: 'Six' },
        { chinese: '七', pinyin: 'qī', english: 'Seven' },
        { chinese: '八', pinyin: 'bā', english: 'Eight' },
        { chinese: '九', pinyin: 'jiǔ', english: 'Nine' },
        { chinese: '十', pinyin: 'shí', english: 'Ten' },
        { chinese: '百', pinyin: 'bǎi', english: 'Hundred' },
        { chinese: '千', pinyin: 'qiān', english: 'Thousand' },
        { chinese: '万', pinyin: 'wàn', english: 'Ten thousand' },
        { chinese: '一半', pinyin: 'yí bàn', english: 'Half' },
        { chinese: '第一', pinyin: 'dì yī', english: 'First' },
        { chinese: '最后', pinyin: 'zuì hòu', english: 'Last' }
      ]
    },
    family: {
      name: 'Family Members',
      icon: '👨‍👩‍👧‍👦',
      words: [
        { chinese: '家人', pinyin: 'jiā rén', english: 'Family' },
        { chinese: '爸爸', pinyin: 'bà ba', english: 'Father / Dad' },
        { chinese: '妈妈', pinyin: 'mā ma', english: 'Mother / Mom' },
        { chinese: '爷爷', pinyin: 'yé ye', english: 'Grandfather (paternal)' },
        { chinese: '奶奶', pinyin: 'nǎi nai', english: 'Grandmother (paternal)' },
        { chinese: '外公', pinyin: 'wài gōng', english: 'Grandfather (maternal)' },
        { chinese: '外婆', pinyin: 'wài pó', english: 'Grandmother (maternal)' },
        { chinese: '哥哥', pinyin: 'gē ge', english: 'Older brother' },
        { chinese: '姐姐', pinyin: 'jiě jie', english: 'Older sister' },
        { chinese: '弟弟', pinyin: 'dì di', english: 'Younger brother' },
        { chinese: '妹妹', pinyin: 'mèi mei', english: 'Younger sister' },
        { chinese: '丈夫', pinyin: 'zhàng fu', english: 'Husband' },
        { chinese: '妻子', pinyin: 'qī zi', english: 'Wife' },
        { chinese: '儿子', pinyin: 'ér zi', english: 'Son' },
        { chinese: '女儿', pinyin: 'nǚ ér', english: 'Daughter' },
        { chinese: '朋友', pinyin: 'péng you', english: 'Friend' }
      ]
    },
    food: {
      name: 'Food & Drinks',
      icon: '🍜',
      words: [
        { chinese: '米饭', pinyin: 'mǐ fàn', english: 'Rice (cooked)' },
        { chinese: '面条', pinyin: 'miàn tiáo', english: 'Noodles' },
        { chinese: '饺子', pinyin: 'jiǎo zi', english: 'Dumplings' },
        { chinese: '包子', pinyin: 'bāo zi', english: 'Steamed bun' },
        { chinese: '馒头', pinyin: 'mán tou', english: 'Steamed bread' },
        { chinese: '鸡蛋', pinyin: 'jī dàn', english: 'Egg' },
        { chinese: '肉', pinyin: 'ròu', english: 'Meat' },
        { chinese: '鸡肉', pinyin: 'jī ròu', english: 'Chicken (meat)' },
        { chinese: '牛肉', pinyin: 'niú ròu', english: 'Beef' },
        { chinese: '猪肉', pinyin: 'zhū ròu', english: 'Pork' },
        { chinese: '鱼', pinyin: 'yú', english: 'Fish' },
        { chinese: '蔬菜', pinyin: 'shū cài', english: 'Vegetables' },
        { chinese: '水果', pinyin: 'shuǐ guǒ', english: 'Fruit' },
        { chinese: '苹果', pinyin: 'píng guǒ', english: 'Apple' },
        { chinese: '香蕉', pinyin: 'xiāng jiāo', english: 'Banana' },
        { chinese: '橙子', pinyin: 'chéng zi', english: 'Orange' },
        { chinese: '水', pinyin: 'shuǐ', english: 'Water' },
        { chinese: '茶', pinyin: 'chá', english: 'Tea' },
        { chinese: '咖啡', pinyin: 'kā fēi', english: 'Coffee' },
        { chinese: '牛奶', pinyin: 'niú nǎi', english: 'Milk' },
        { chinese: '果汁', pinyin: 'guǒ zhī', english: 'Fruit juice' },
        { chinese: '啤酒', pinyin: 'pí jiǔ', english: 'Beer' },
        { chinese: '酒', pinyin: 'jiǔ', english: 'Alcohol / Liquor' }
      ]
    },
    color: {
      name: 'Colors',
      icon: '🎨',
      words: [
        { chinese: '红色', pinyin: 'hóng sè', english: 'Red' },
        { chinese: '蓝色', pinyin: 'lán sè', english: 'Blue' },
        { chinese: '绿色', pinyin: 'lǜ sè', english: 'Green' },
        { chinese: '黄色', pinyin: 'huáng sè', english: 'Yellow' },
        { chinese: '黑色', pinyin: 'hēi sè', english: 'Black' },
        { chinese: '白色', pinyin: 'bái sè', english: 'White' },
        { chinese: '橙色', pinyin: 'chéng sè', english: 'Orange' },
        { chinese: '紫色', pinyin: 'zǐ sè', english: 'Purple' },
        { chinese: '粉色', pinyin: 'fěn sè', english: 'Pink' },
        { chinese: '灰色', pinyin: 'huī sè', english: 'Gray' },
        { chinese: '金色', pinyin: 'jīn sè', english: 'Golden' },
        { chinese: '银色', pinyin: 'yín sè', english: 'Silver' }
      ]
    },
    time: {
      name: 'Days & Time',
      icon: '📅',
      words: [
        { chinese: '今天', pinyin: 'jīn tiān', english: 'Today' },
        { chinese: '明天', pinyin: 'míng tiān', english: 'Tomorrow' },
        { chinese: '昨天', pinyin: 'zuó tiān', english: 'Yesterday' },
        { chinese: '现在', pinyin: 'xiàn zài', english: 'Now' },
        { chinese: '以后', pinyin: 'yǐ hòu', english: 'Later / In the future' },
        { chinese: '以前', pinyin: 'yǐ qián', english: 'Before / Previously' },
        { chinese: '上午', pinyin: 'shàng wǔ', english: 'Morning / AM' },
        { chinese: '中午', pinyin: 'zhōng wǔ', english: 'Noon' },
        { chinese: '下午', pinyin: 'xià wǔ', english: 'Afternoon / PM' },
        { chinese: '晚上', pinyin: 'wǎn shàng', english: 'Evening / Night' },
        { chinese: '星期一', pinyin: 'xīng qī yī', english: 'Monday' },
        { chinese: '星期二', pinyin: 'xīng qī èr', english: 'Tuesday' },
        { chinese: '星期三', pinyin: 'xīng qī sān', english: 'Wednesday' },
        { chinese: '星期四', pinyin: 'xīng qī sì', english: 'Thursday' },
        { chinese: '星期五', pinyin: 'xīng qī wǔ', english: 'Friday' },
        { chinese: '星期六', pinyin: 'xīng qī liù', english: 'Saturday' },
        { chinese: '星期日/天', pinyin: 'xīng qī rì/tiān', english: 'Sunday' },
        { chinese: '小时', pinyin: 'xiǎo shí', english: 'Hour' },
        { chinese: '分钟', pinyin: 'fēn zhōng', english: 'Minute' },
        { chinese: '秒', pinyin: 'miǎo', english: 'Second' },
        { chinese: '年', pinyin: 'nián', english: 'Year' },
        { chinese: '月', pinyin: 'yuè', english: 'Month' },
        { chinese: '周/星期', pinyin: 'zhōu/xīng qī', english: 'Week' }
      ]
    },
    verb: {
      name: 'Common Verbs',
      icon: '🏃',
      words: [
        { chinese: '是', pinyin: 'shì', english: 'To be (am/is/are)' },
        { chinese: '有', pinyin: 'yǒu', english: 'To have / There is' },
        { chinese: '去', pinyin: 'qù', english: 'To go' },
        { chinese: '来', pinyin: 'lái', english: 'To come' },
        { chinese: '吃', pinyin: 'chī', english: 'To eat' },
        { chinese: '喝', pinyin: 'hē', english: 'To drink' },
        { chinese: '看', pinyin: 'kàn', english: 'To look / To watch / To read' },
        { chinese: '听', pinyin: 'tīng', english: 'To listen' },
        { chinese: '说', pinyin: 'shuō', english: 'To speak / To say' },
        { chinese: '写', pinyin: 'xiě', english: 'To write' },
        { chinese: '读', pinyin: 'dú', english: 'To read (aloud)' },
        { chinese: '买', pinyin: 'mǎi', english: 'To buy' },
        { chinese: '卖', pinyin: 'mài', english: 'To sell' },
        { chinese: '学习', pinyin: 'xué xí', english: 'To study / To learn' },
        { chinese: '工作', pinyin: 'gōng zuò', english: 'To work' },
        { chinese: '睡觉', pinyin: 'shuì jiào', english: 'To sleep' },
        { chinese: '想', pinyin: 'xiǎng', english: 'To want / To think / To miss' },
        { chinese: '喜欢', pinyin: 'xǐ huān', english: 'To like' },
        { chinese: '知道', pinyin: 'zhī dào', english: 'To know (a fact)' },
        { chinese: '认识', pinyin: 'rèn shi', english: 'To know (a person) / To meet' },
        { chinese: '问', pinyin: 'wèn', english: 'To ask' },
        { chinese: '回答', pinyin: 'huí dá', english: 'To answer' },
        { chinese: '帮助', pinyin: 'bāng zhù', english: 'To help' },
        { chinese: '找', pinyin: 'zhǎo', english: 'To look for / To find' },
        { chinese: '等', pinyin: 'děng', english: 'To wait' },
        { chinese: '开始', pinyin: 'kāi shǐ', english: 'To start / To begin' },
        { chinese: '结束', pinyin: 'ié shù', english: 'To end / To finish' }
      ]
    },
    place: {
      name: 'Places & Directions',
      icon: '🗺️',
      words: [
        { chinese: '家', pinyin: 'jiā', english: 'Home' },
        { chinese: '学校', pinyin: 'xué xiào', english: 'School' },
        { chinese: '公司', pinyin: 'gōng sī', english: 'Company / Office' },
        { chinese: '医院', pinyin: 'yī yuàn', english: 'Hospital' },
        { chinese: '银行', pinyin: 'yín háng', english: 'Bank' },
        { chinese: '商店', pinyin: 'shāng diàn', english: 'Store / Shop' },
        { chinese: '超市', pinyin: 'chāo shì', english: 'Supermarket' },
        { chinese: '餐厅', pinyin: 'cān tīng', english: 'Restaurant' },
        { chinese: '酒店', pinyin: 'jiǔ diàn', english: 'Hotel' },
        { chinese: '机场', pinyin: 'jī chǎng', english: 'Airport' },
        { chinese: '火车站', pinyin: 'huǒ chē zhàn', english: 'Train station' },
        { chinese: '地铁站', pinyin: 'dì tiě zhàn', english: 'Subway station' },
        { chinese: '公园', pinyin: 'gōng yuán', english: 'Park' },
        { chinese: '图书馆', pinyin: 'tú shū guǎn', english: 'Library' },
        { chinese: '左边', pinyin: 'zuǒ biān', english: 'Left side' },
        { chinese: '右边', pinyin: 'yòu biān', english: 'Right side' },
        { chinese: '前面', pinyin: 'qián miàn', english: 'Front / Ahead' },
        { chinese: '后面', pinyin: 'hòu miàn', english: 'Behind / Back' },
        { chinese: '上面', pinyin: 'shàng miàn', english: 'Above / On top of' },
        { chinese: '下面', pinyin: 'xià miàn', english: 'Below / Under' },
        { chinese: '里面', pinyin: 'lǐ miàn', english: 'Inside' },
        { chinese: '外面', pinyin: 'wài miàn', english: 'Outside' },
        { chinese: '附近', pinyin: 'fù jìn', english: 'Nearby / Close by' },
        { chinese: '这里', pinyin: 'zhè lǐ', english: 'Here' },
        { chinese: '那里', pinyin: 'nà lǐ', english: 'There' }
      ]
    },
    body: {
      name: 'Body Parts',
      icon: '🫀',
      words: [
        { chinese: '头', pinyin: 'tóu', english: 'Head' },
        { chinese: '脸', pinyin: 'liǎn', english: 'Face' },
        { chinese: '眼睛', pinyin: 'yǎn jing', english: 'Eye(s)' },
        { chinese: '耳朵', pinyin: 'ěr duo', english: 'Ear(s)' },
        { chinese: '鼻子', pinyin: 'bí zi', english: 'Nose' },
        { chinese: '嘴', pinyin: 'zuǐ', english: 'Mouth' },
        { chinese: '头发', pinyin: 'tóu fa', english: 'Hair' },
        { chinese: '手', pinyin: 'shǒu', english: 'Hand(s)' },
        { chinese: '脚', pinyin: 'jiǎo', english: 'Foot / Feet' },
        { chinese: '胳膊', pinyin: 'gē bo', english: 'Arm' },
        { chinese: '腿', pinyin: 'tuǐ', english: 'Leg' },
        { chinese: '肚子', pinyin: 'dù zi', english: 'Stomach / Belly' },
        { chinese: '心', pinyin: 'xīn', english: 'Heart' },
        { chinese: '背', pinyin: 'bèi', english: 'Back (body part)' }
      ]
    },
    weather: {
      name: 'Weather & Nature',
      icon: '☀️',
      words: [
        { chinese: '天气', pinyin: 'tiān qì', english: 'Weather' },
        { chinese: '晴天', pinyin: 'qíng tiān', english: 'Sunny day' },
        { chinese: '阴天', pinyin: 'yīn tiān', english: 'Cloudy day' },
        { chinese: '下雨', pinyin: 'xià yǔ', english: 'Raining' },
        { chinese: '下雪', pinyin: 'xià xuě', english: 'Snowing' },
        { chinese: '刮风', pinyin: 'guā fēng', english: 'Windy' },
        { chinese: '热', pinyin: 'rè', english: 'Hot' },
        { chinese: '冷', pinyin: 'lěng', english: 'Cold' },
        { chinese: '温暖', pinyin: 'wēn nuǎn', english: 'Warm' },
        { chinese: '凉快', pinyin: 'liáng kuai', english: 'Cool / Pleasant' },
        { chinese: '温度', pinyin: 'wēn dù', english: 'Temperature' },
        { chinese: '季节', pinyin: 'jì jié', english: 'Season' },
        { chinese: '春天', pinyin: 'chūn tiān', english: 'Spring' },
        { chinese: '夏天', pinyin: 'xià tiān', english: 'Summer' },
        { chinese: '秋天', pinyin: 'qiū tiān', english: 'Autumn / Fall' },
        { chinese: '冬天', pinyin: 'dōng tiān', english: 'Winter' }
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
          {/* Stats bar */}
          <div className="bg-purple-100 rounded-lg p-4 mb-8 text-center">
            <p className="text-purple-800 font-medium text-lg">
              📚 {Object.values(categories).reduce((sum, cat) => sum + cat.words.length, 0)} Words
              {' · '}
              {Object.keys(categories).length} Categories
              {' · '}
              Click 🔊 to hear pronunciation
            </p>
          </div>

          <Tabs defaultValue="greeting" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 gap-1 flex-wrap h-auto">
              {Object.entries(categories).map(([key, cat]) => (
                <TabsTrigger key={key} value={key} className="text-xs py-2">
                  {cat.icon} {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(categories).map(([key, cat]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle>{cat.icon} {cat.name}</CardTitle>
                    <CardDescription>
                      {cat.words.length} words in this category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {cat.words.map((word, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <span className="text-xl font-bold text-purple-700">{word.chinese}</span>
                            <SpeechButton text={word.chinese} />
                          </div>
                          <div className="text-center text-gray-700 font-mono min-w-[100px] text-sm">
                            {word.pinyin}
                          </div>
                          <div className="text-right text-gray-600 text-sm min-w-[140px]">
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

          {/* Learning Tip */}
          <Card className="mt-8 bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-base">💡 Vocabulary Learning Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-purple-900">
                <li>Learn 5-10 new words each day and review them regularly</li>
                <li>Try using each word in a sentence to remember it better</li>
                <li>Practice pronunciation with the 🔊 audio button repeatedly</li>
                <li>Group related words together — it helps memory retention</li>
                <li>Use flashcards to quiz yourself on vocabulary</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Vocabulary
