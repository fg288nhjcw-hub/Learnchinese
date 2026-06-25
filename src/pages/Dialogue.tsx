import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Link } from 'react-router-dom'
import SpeechButton from '@/components/SpeechButton'

function Dialogue() {
  const conversations = [
    {
      title: 'Self Introduction',
      scene: 'Meeting for the first time',
      dialogues: [
        { chinese: '你好，我叫大卫。', pinyin: 'Nǐ hǎo, wǒ jiào Dàwèi.', english: 'Hello, my name is David.' },
        { chinese: '你好大卫，很高兴认识你。', pinyin: 'Nǐ hǎo Dàwèi, hěn gāoxìng rènshi nǐ.', english: 'Hello David, nice to meet you.' },
        { chinese: '我也很高兴认识你。', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ.', english: 'Nice to meet you too.' }
      ]
    },
    {
      title: 'Asking for Directions',
      scene: 'Asking for directions on the street',
      dialogues: [
        { chinese: '请问，火车站怎么走？', pinyin: 'Qǐngwèn, huǒchēzhàn zěnme zǒu?', english: 'Excuse me, how do I get to the train station?' },
        { chinese: '一直走，然后左转。', pinyin: 'Yīzhí zǒu, ránhòu zuǒzhuǎn.', english: 'Go straight, then turn left.' },
        { chinese: '谢谢！', pinyin: 'Xièxiè!', english: 'Thank you!' },
        { chinese: '不客气。', pinyin: 'Bù kèqì.', english: "You're welcome." }
      ]
    },
    {
      title: 'At a Restaurant',
      scene: 'Ordering food',
      dialogues: [
        { chinese: '你好，我想要一份面条。', pinyin: 'Nǐ hǎo, wǒ xiǎng yào yī fèn miàntiáo.', english: 'Hello, I would like a portion of noodles.' },
        { chinese: '好的，还要别的吗？', pinyin: 'Hǎo de, hái yào bié de ma?', english: 'OK, would you like anything else?' },
        { chinese: '一杯茶，谢谢。', pinyin: 'Yī bēi chá, xièxiè.', english: 'A cup of tea, thank you.' },
        { chinese: '好的，请稍等。', pinyin: 'Hǎo de, qǐng shāoděng.', english: 'OK, please wait a moment.' }
      ]
    },
    {
      title: 'Shopping',
      scene: 'Shopping at a store',
      dialogues: [
        { chinese: '这个多少钱？', pinyin: 'Zhège duōshao qián?', english: 'How much is this?' },
        { chinese: '五十元。', pinyin: 'Wǔshí yuán.', english: 'Fifty yuan.' },
        { chinese: '可以便宜一点吗？', pinyin: 'Kěyǐ piányi yīdiǎn ma?', english: 'Can it be a bit cheaper?' },
        { chinese: '四十五元，最低价了。', pinyin: 'Sìshíwǔ yuán, zuì dī jià le.', english: '45 yuan, that\'s the lowest price.' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
            <h1 className="text-2xl font-bold text-orange-600">Daily Conversations</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-8 text-center">
            Learn Chinese through real-life conversation scenarios. Click on each conversation to view details, 
            including Chinese text, Pinyin, and English translation. Click 🔊 to hear pronunciation.
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {conversations.map((conv, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-4">
                    <span>{conv.title}</span>
                    <span className="text-sm font-normal text-gray-500">({conv.scene})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="border-0 shadow-none">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {conv.dialogues.map((dialogue, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-lg font-semibold text-orange-700 flex-1">
                                {dialogue.chinese}
                              </p>
                              <SpeechButton text={dialogue.chinese} />
                            </div>
                            <p className="text-gray-600 mb-1">{dialogue.pinyin}</p>
                            <p className="text-gray-500 text-sm">{dialogue.english}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Learning Tips */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-orange-50">
            <CardHeader>
              <CardTitle>Dialogue Learning Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Listen to the audio several times to familiarize yourself with pronunciation and intonation</li>
                <li>Read along and imitate the tone of the conversation</li>
                <li>Try to replace words in the dialogue to create your own conversations</li>
                <li>Practice these dialogues with native Chinese speakers</li>
                <li>Take notes of new vocabulary and expressions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dialogue
