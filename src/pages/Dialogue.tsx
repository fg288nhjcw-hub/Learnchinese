import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Link } from 'react-router-dom'
import SpeechButton from '@/components/SpeechButton'

function Dialogue() {
  const conversations = [
    {
      title: 'Self Introduction',
      icon: '🤝',
      scene: 'Meeting for the first time',
      dialogues: [
        { chinese: '你好，我叫大卫。', pinyin: 'Nǐ hǎo, wǒ jiào Dàwèi.', english: 'Hello, my name is David.' },
        { chinese: '你好大卫，很高兴认识你。', pinyin: 'Nǐ hǎo Dàwèi, hěn gāoxìng rènshi nǐ.', english: 'Hello David, nice to meet you.' },
        { chinese: '我也很高兴认识你。你是哪里人？', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ. Nǐ shì nǎlǐ rén?', english: 'Nice to meet you too. Where are you from?' },
        { chinese: '我是美国人。你呢？', pinyin: 'Wǒ shì Měiguórén. Nǐ ne?', english: "I'm American. And you?" },
        { chinese: '我是中国人，来自上海。', pinyin: 'Wǒ shì Zhōngguórén, láizì Shànghǎi.', english: "I'm Chinese. I come from Shanghai." }
      ]
    },
    {
      title: 'Asking for Directions',
      icon: '🗺️',
      scene: 'Asking for directions on the street',
      dialogues: [
        { chinese: '请问，火车站怎么走？', pinyin: 'Qǐngwèn, huǒchēzhàn zěnme zǒu?', english: 'Excuse me, how do I get to the train station?' },
        { chinese: '一直走，然后左转。', pinyin: 'Yīzhí zǒu, ránhòu zuǒzhuǎn.', english: 'Go straight, then turn left.' },
        { chinese: '远吗？', pinyin: 'Yuǎn ma?', english: 'Is it far?' },
        { chinese: '不太远，走路大概十分钟。', pinyin: 'Bù tài yuǎn, zǒulù dàgài shí fēnzhōng.', english: 'Not too far. About a 10-minute walk.' },
        { chinese: '谢谢！', pinyin: 'Xièxiè!', english: 'Thank you!' },
        { chinese: '不客气。', pinyin: 'Bù kèqì.', english: "You're welcome." }
      ]
    },
    {
      title: 'At a Restaurant',
      icon: '🍜',
      scene: 'Ordering food at a Chinese restaurant',
      dialogues: [
        { chinese: '你好，我想要一份菜单。', pinyin: 'Nǐ hǎo, wǒ xiǎng yào yī fèn càidān.', english: "Hello, I'd like a menu please." },
        { chinese: '好的，给您。请问喝点什么？', pinyin: 'Hǎo de, gěi nín. Qǐngwèn hē diǎn shénme?', english: 'Sure, here it is. Would you like something to drink?' },
        { chinese: '一杯茶，谢谢。', pinyin: 'Yī bēi chá, xièxiè.', english: 'A cup of tea, thank you.' },
        { chinese: '你们有什么招牌菜？', pinyin: 'Nǐmen yǒu shénme zhāopái cài?', english: "What's your signature dish?" },
        { chinese: '推荐宫保鸡丁和麻婆豆腐。', pinyin: 'Tuījiàn Gōngbǎo Jīdīng hé Mápó Dòufu.', english: 'I recommend Kung Pao Chicken and Mapo Tofu.' },
        { chinese: '好的，我要一份宫保鸡丁。', pinyin: 'Hǎo de, wǒ yào yī fèn Gōngbǎo Jīdīng.', english: 'OK, I\'ll take the Kung Pao Chicken.' },
        { chinese: '请稍等。', pinyin: 'Qǐng shāoděng.', english: 'Please wait a moment.' }
      ]
    },
    {
      title: 'Shopping & Bargaining',
      icon: '🛍️',
      scene: 'Shopping and negotiating prices',
      dialogues: [
        { chinese: '这件衣服多少钱？', pinyin: 'Zhè jiàn yīfu duōshao qián?', english: 'How much is this piece of clothing?' },
        { chinese: '三百元。', pinyin: 'Sānbǎi yuán.', english: '300 yuan.' },
        { chinese: '可以便宜一点吗？', pinyin: 'Kěyǐ piányi yīdiǎn ma?', english: 'Can it be a bit cheaper?' },
        { chinese: '最低二百五了。', pinyin: 'Zuì dī èrbǎi wǔ le.', english: '250 is the lowest I can go.' },
        { chinese: '两百可以吗？', pinyin: 'Liǎng bǎi kěyǐ ma?', english: 'Can I get it for 200?' },
        { chinese: '好吧，给你！', pinyin: 'Hǎo ba, gěi nǐ!', english: 'OK, deal! Here you go.' },
        { chinese: '可以用支付宝吗？', pinyin: 'Kěyǐ yòng Zhīfùbǎo ma?', english: 'Can I use Alipay?' },
        { chinese: '当然可以。', pinyin: 'Dāngrán kěyǐ.', english: 'Of course.' }
      ]
    },
    {
      title: 'Taking a Taxi / Ride-hailing',
      icon: '🚕',
      scene: 'Hailing a taxi or using ride-sharing apps',
      dialogues: [
        { chinese: '师傅，去机场。', pinyin: 'Shīfu, qù jīchǎng.', english: 'Driver, to the airport please.' },
        { chinese: '哪个机场？首都还是大兴？', pinyin: 'Nǎge jīchǎng? Shǒudū háishì Dàxīng?', english: 'Which airport? Capital (PEK) or Daxing (PKX)?' },
        { chinese: '首都机场，T3航站楼。', pinyin: 'Shǒudū jīchǎng, T3 hángzhànlóu.', english: 'Capital Airport, Terminal 3.' },
        { chinese: '大概多久能到？', pinyin: 'Dàgài duōjiǔ néng dào?', english: 'About how long will it take?' },
        { chinese: '现在堵车，可能要一个小时。', pinyin: 'Xiànzài dǔchē, kěnéng yào yī ge xiǎoshí.', english: 'Traffic is bad right now. It might take an hour.' },
        { chinese: '麻烦帮我开后备箱。', pinyin: 'Máfan bāng wǒ kāi hòubèixiāng.', english: 'Could you help open the trunk please?' },
        { chinese: '到了！一共是九十八块。', pinyin: 'Dàole! Yīgòng shì jiǔshíbā kuài.', english: "We're here! The total is 98 yuan." },
        { chinese: '不用找了。', pinyin: 'Búyòng zhǎo le.', english: 'Keep the change.' }
      ]
    },
    {
      title: 'At the Hotel',
      icon: '🏨',
      scene: 'Checking in and hotel services',
      dialogues: [
        { chinese: '你好，我有预订。', pinyin: 'Nǐ hǎo, wǒ yǒu yùdìng.', english: 'Hello, I have a reservation.' },
        { chinese: '请给我您的护照和姓名。', pinyin: 'Qǐng gěi wǒ nín de hùzhào hé xìngmíng.', english: 'Please give me your passport and name.' },
        { chinese: '我叫大卫，David Smith。', pinyin: 'Wǒ jiào Dàwèi, David Smith.', english: "My name is David, David Smith." },
        { chinese: '住几晚？', pinyin: 'Zhù jǐ wǎn?', english: 'How many nights will you stay?' },
        { chinese: '三晚。房间有WiFi吗？', pinyin: 'Sān wǎn. Fángjiān yǒu WiFi ma?', english: 'Three nights. Does the room have WiFi?' },
        { chinese: '有的，早餐几点到几点？', pinyin: 'Yǒude, zǎocān jǐ diǎn dào jǐ diǎn?', english: "Yes. What time is breakfast served?" },
        { chinese: '早餐从七点到十点。', pinyin: 'Zǎocān cóng qī diǎn dào shí diǎn.', english: 'Breakfast is from 7 AM to 10 AM.' },
        { chinese: '可以帮我叫一辆出租车吗？', pinyin: 'Kěyǐ bāng wǒ jiào yī liàng chūzūchē ma?', english: 'Can you call me a taxi?' }
      ]
    },
    {
      title: 'Seeing a Doctor',
      icon: '🏥',
      scene: 'Visiting a hospital or clinic in China',
      dialogues: [
        { chinese: '医生，我不舒服。', pinyin: 'Yīshēng, wǒ bù shūfú.', english: "Doctor, I don't feel well." },
        { chinese: '哪里不舒服？', pinyin: 'Nǎlǐ bù shūfú?', english: "Where does it hurt?" },
        { chinese: '我头疼，还有点发烧。', pinyin: 'Wǒ tóuténg, hái yǒudiǎn fāshāo.', english: 'I have a headache and a slight fever.' },
        { chinese: '发烧多少度？', pinyin: 'Fāshāo duōshao dù?', english: 'What\'s your temperature?' },
        { chinese: '三十八度五。', pinyin: 'Sānshíbā dù wǔ.', english: '38.5 degrees.' },
        { chinese: '需要验血吗？', pinyin: 'Xūyào yàn xuè ma?', english: 'Do I need a blood test?' },
        { chinese: '先量一下体温，然后去挂号缴费。', pinyin: 'Xiān liáng yīxià tǐwēn, ránhòu qù guàhào jiǎofèi.', english: 'Take your temperature first, then register and pay.' },
        { chinese: '这是药方，每天吃三次，一次两片。', pinyin: 'Zhè shì yàofāng, měitiān chī sāncì, yīcì liăng piàn.', english: 'This is the prescription. Take it three times a day, two pills each time.' }
      ]
    },
    {
      title: 'Making a Phone Call',
      icon: '📞',
      scene: 'Calling someone on the phone',
      dialogues: [
        { chinese: '喂？是李明吗？', pinyin: 'Wéi? Shì Lǐ Míng ma?', english: 'Hello? Is this Li Ming?' },
        { chinese: '是我，你是哪位？', pinyin: 'Shì wǒ, nǐ shì nǎ wèi?', english: "Yes, this is him. Who's calling?" },
        { chinese: '我是大卫。你在忙吗？', pinyin: 'Wǒ shì Dàwèi. Nǐ zài máng ma?', english: "It's David. Are you busy?" },
        { chinese: '不忙，什么事？', pinyin: 'Bù máng, shénme shì?', english: 'Not busy. What\'s up?' },
        { chinese: '想约你明天一起吃饭，你有空吗？', pinyin: 'Xiǎng yuē nǐ míngtiān yīqǐ chī fàn, nǐ yǒu kōng ma?', english: 'I want to invite you for dinner tomorrow. Are you free?' },
        { chinese: '明天下午可以。几点？', pinyin: 'Míngtiān xiàwǔ kěyǐ. Jǐ diǎn?', english: 'Tomorrow afternoon works. What time?' },
        { chinese: '六点钟怎么样？', pinyin: 'Liù diǎn zhōng zěnmeyàng?', english: 'How about 6 o\'clock?' },
        { chinese: '好的，到时候见。', pinyin: 'Hǎo de, dào shíhòu jiàn.', english: 'OK, see you then.' },
        { chinese: '拜拜！', pinyin: 'Bàibài!', english: 'Bye!' }
      ]
    },
    {
      title: 'Talking About Weather',
      icon: '🌤️',
      scene: 'Small talk about weather conditions',
      dialogues: [
        { chinese: '今天天气真好！', pinyin: 'Jīntiān tiānqì zhēn hǎo!', english: 'The weather is really nice today!' },
        { chinese: '是啊，阳光明媚。', pinyin: 'Shì a, yángguāng míngmèi.', english: 'Yes, sunny and bright.' },
        { chinese: '明天会下雨吗？', pinyin: 'Míngtiān huì xiàyǔ ma?', english: 'Will it rain tomorrow?' },
        { chinese: '天气预报说明天有雨。', pinyin: 'Tiānqì yùbáo shuō míngtiān yǒu yǔ.', english: 'The forecast says it will rain tomorrow.' },
        { chinese: '最近天气变化太大了。', pinyin: 'Zuìjìn tiānqì biànhuà tài dà le.', english: 'The weather has been changing a lot lately.' },
        { chinese: '是啊，昨天还很冷呢。', pinyin: 'Shì a, zuótiān hái hěn lěng ne.', english: 'Yes, yesterday it was still very cold.' },
        { chinese: '春天就是这样，忽冷忽热的。', pinyin: 'Chūntiān jiùshì zhèyàng, hūlěnghūrè de.', english: 'That\'s spring — hot and cold alternately.' },
        { chinese: '出门记得带伞。', pinyin: 'Chūmén jìde dài sǎn.', english: 'Remember to bring an umbrella when going out.' }
      ]
    },
    {
      title: 'Ordering Drinks (Boba Tea)',
      icon: '🧋',
      scene: 'Ordering bubble tea — very common in China!',
      dialogues: [
        { chinese: '欢迎光临！您想要什么？', pinyin: 'Huānyíng guānglín! Nín xiǎng yào shénme?', english: 'Welcome! What would you like?' },
        { chinese: '我要一杯奶茶。', pinyin: 'Wǒ yào yī bēi nǎichá.', english: "I'd like a cup of milk tea please." },
        { chinese: '要什么甜度？全糖、七分、半糖、三分还是无糖？', pinyin: 'Yào shénme tiándù? Quántáng, qīfēn, bàntáng, sānfēn háishì wútáng?', english: 'What sweetness level? Full sugar, 70%, 50%, 30% or no sugar?' },
        { chinese: '半糖就好。冰的。', pinyin: 'Bàntáng jiùhǎo. Bīng de.', english: '50% sugar is fine. Iced please.' },
        { chinese: '加什么配料？珍珠、椰果还是仙草？', pinyin: 'Jiā shénme peiliào? Zhēnzhū, yēguǒ háishì xiāncǎo?', english: 'What toppings? Boba pearls, coconut jelly, or grass jelly?' },
        { chinese: '加珍珠。', pinyin: 'Jiā zhēnzhū.', english: 'Add boba pearls please.' },
        { chinese: '一共十八块。扫码支付。', pinyin: 'Yīgòng shíbā kuài. Sǎomǎ zhīfù.', english: '18 yuan total. Please scan to pay.' }
      ]
    },
    {
      title: 'At the Airport',
      icon: '✈️',
      scene: 'Going through airport procedures',
      dialogues: [
        { chinese: '请出示您的护照和登机牌。', pinyin: 'Qǐng chūshì nín de hùzhào hé dēngjīpái.', english: 'Please show your passport and boarding pass.' },
        { chinese: '我的行李超重了吗？', pinyin: 'Wǒ de xíngli chāozhòng le ma?', english: 'Is my luggage overweight?' },
        { chinese: '稍微有点，需要补交行李费。', pinyin: 'Shāowēi yǒudiǎn, xūyào bǔjiāo xíngli fèi.', english: 'Just slightly. You need to pay excess baggage fee.' },
        { chinese: '登机口在哪儿？', pinyin: 'Dēngjīkǒu zài nǎr?', english: 'Where is the boarding gate?' },
        { chinese: 'A23登机口，往右走。', pinyin: 'A23 dēngjīkǒu, wǎng yòu zǒu.', english: 'Gate A23. Go to the right.' },
        { chinese: '飞机晚点了多久？', pinyin: 'Fēijī wǎndiǎn le duōjiǔ?', english: 'How long is the flight delayed?' },
        { chinese: '预计晚点三十分钟。', pinyin: 'Yùjì wǎndiǎn sānshí fēnzhōng.', english: 'Expected to be delayed by 30 minutes.' }
      ]
    },
    {
      title: 'Small Talk with Friends',
      icon: '💬',
      scene: 'Casual conversation between friends',
      dialogues: [
        { chinese: '周末打算做什么？', pinyin: 'Zhōumò dǎsuàn zuò shénme?', english: 'What are you planning for the weekend?' },
        { chinese: '可能去爬山，你去过长城吗？', pinyin: 'Kěnéng qù páshān, nǐ qù guò Chángchéng ma?', english: 'Maybe hiking. Have you been to the Great Wall?' },
        { chinese: '去过两次，非常壮观。', pinyin: 'Qù guò liǎng cì, fēicháng zhuàngguān.', english: "Been there twice. It's magnificent!" },
        { chinese: '你中文说得越来越好了！', pinyin: 'Nǐ Zhōngwén shuō dé yuè lái yuè hǎo le!', english: 'Your Chinese is getting better and better!' },
        { chinese: '哪里，还在学习中。', pinyin: 'Nǎlǐ, hái zài xuéxí zhōng.', english: 'No way, I\'m still learning.' },
        { chinese: '要不要一起去吃火锅？', pinyin: 'Yào bùyào yīqǐ qù chī huǒguō?', english: 'Do you want to get hotpot together?' },
        { chinese: '太好了，我最喜欢吃火锅！', pinyin: 'Tài hǎo le, wǒ zuì xǐhuān chī huǒguō!', english: 'Great! Hotpot is my favorite food!' }
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
          {/* Stats bar */}
          <div className="bg-orange-100 rounded-lg p-4 mb-8 text-center">
            <p className="text-orange-800 font-medium text-lg">
              💬 {conversations.length} Real-life Scenarios
              {' · '}
              {conversations.reduce((sum, c) => sum + c.dialogues.length, 0)} Dialogues
              {' · '}
              Click 🔊 to hear native pronunciation
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {conversations.map((conv, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-xl">{conv.icon}</span>
                    <span>{conv.title}</span>
                    <span className="text-sm font-normal text-gray-500">({conv.scene}) · {conv.dialogues.length} lines</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="border-0 shadow-none">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {conv.dialogues.map((dialogue, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-lg font-semibold text-orange-700 flex-1 leading-relaxed">
                                {dialogue.chinese}
                              </p>
                              <SpeechButton text={dialogue.chinese} />
                            </div>
                            <p className="text-gray-600 text-sm mb-0.5">{dialogue.pinyin}</p>
                            <p className="text-gray-500 text-sm italic">{dialogue.english}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Learning Tips */}
          <Card className="mt-10 bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-base">🎯 Conversation Learning Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-orange-900">
                <li><strong>Listen first:</strong> Play each dialogue multiple times before reading along</li>
                <li><strong>Role-play:</strong> Practice both sides of the conversation out loud</li>
                <li><strong>Substitute words:</strong> Replace names, places, or items to create new conversations</li>
                <li><strong>Shadow technique:</strong> Listen and repeat immediately after the audio plays</li>
                <li><strong>Use in real life:</strong> Try these phrases with Chinese speakers when possible!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dialogue
