'use client';

import Image from 'next/image';
import { Target, Eye, Award, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';

export default function AboutPage() {
  const { locale } = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative bg-gradient-to-r from-red-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              {locale === 'hi' ? 'बहुजन क्रांति पार्टी के बारे में' : 'About Bahujan Kranti Party'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {locale === 'hi'
                ? 'समर्पित सेवा और जनकेंद्रित नीतियों के माध्यम से एक प्रगतिशील, समावेशी भारत का निर्माण'
                : 'Building a progressive, inclusive India through dedicated service and people-centric policies'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {locale === 'hi' ? 'हमारी कहानी' : 'Our Story'}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {locale === 'hi'
                    ? '2012 में स्थापित, बहुजन क्रांति पार्टी एक राजनीतिक आंदोलन बनाने की दृष्टि से उभरी जो वास्तव में हर भारतीय नागरिक की आकांक्षाओं का प्रतिनिधित्व करती है। हमारी यात्रा समर्पित व्यक्तियों के एक छोटे समूह के साथ शुरू हुई जो हमारे राष्ट्र में सकारात्मक परिवर्तन लाने के लिए प्रतिबद्ध थे।'
                    : 'Founded in 2012, Bahujan Kranti Party emerged from a vision to create a political movement that truly represents the aspirations of every Indian citizen. Our journey began with a small group of dedicated individuals committed to bringing about positive change in our nation.'}
                </p>
                <p>
                  {locale === 'hi'
                    ? 'पिछले वर्षों में, हम एक राष्ट्रीय आंदोलन में विकसित हुए हैं, जिसमें सभी राज्यों और केंद्र शासित प्रदेशों में लाखों सदस्य हैं। हमारे जमीनी दृष्टिकोण ने हमें आम नागरिकों द्वारा सामना किए जाने वाली वास्तविक चुनौतियों को समझने और उनकी जरूरतों को पूरा करने वाली नीतियां तैयार करने में सक्षम बनाया है।'
                    : 'Over the years, we have grown into a national movement, with millions of members across all states and union territories. Our grassroots approach has enabled us to understand the real challenges faced by ordinary citizens and craft policies that address their needs.'}
                </p>
                <p>
                  {locale === 'hi'
                    ? 'आज, हम एक पार्टी के रूप में खड़े हैं जो समावेशी विकास, टिकाऊ विकास और सभी के लिए समान अवसरों में विश्वास करती है। पारदर्शिता, जवाबदेही और सुशासन के प्रति हमारी प्रतिबद्धता ने हमें सभी क्षेत्रों से नागरिकों का विश्वास प्राप्त किया है।'
                    : 'Today, we stand as a party that believes in inclusive growth, sustainable development, and equal opportunities for all. Our commitment to transparency, accountability, and good governance has earned us the trust of citizens from all walks of life.'}
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl" style={{ position: 'relative' }}>
              <Image
                src="https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt={locale === 'hi' ? 'पार्टी जमावड़ा' : 'Party gathering'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'वैज्ञानिक समाजवाद और विचारधारा' : 'Scientific Socialism & Ideology'}
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {locale === 'hi'
                  ? 'बहुजन क्रांति पार्टी (मा.अ.) का मानना है कि वर्तमान पूंजीवादी व्यवस्था ही समाज में व्याप्त अव्यवस्था, शोषण और आमजन के दुखों का मूल कारण है। यह व्यवस्था पूंजीपति वर्ग द्वारा श्रमिक वर्ग के शोषण पर टिकी है। हमारा संकल्प इस पूंजीवादी व्यवस्था को उखाड़ फेंककर "वैज्ञानिक समाजवाद" की स्थापना करना है, जहाँ मनुष्य द्वारा मनुष्य का शोषण असंभव होगा।'
                  : 'Bahujan Kranti Party (M.A.) asserts that the current capitalist system is the root cause of social disorder, exploitation, and the suffering of the masses. This system thrives on the exploitation of the working class by the capitalist elite. Our resolve is to uproot this system and establish "Scientific Socialism," ensuring an end to the exploitation of one human by another.'}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {locale === 'hi'
                  ? 'हमारा लक्ष्य डॉ. कार्ल मार्क्स और डॉ. बी.आर. अंबेडकर के सम्मिलित विजन—"वर्ग-विहीन और जाति-विहीन समाज"—की स्थापना करना है। हम एक ऐसी व्यवस्था के पक्षधर हैं जहाँ संपत्ति का समान वितरण हो और राज्य समाजवाद के माध्यम से प्रत्येक नागरिक को भोजन, आवास और सम्मानजनक रोजगार की गारंटी मिले।'
                  : 'Our goal is to realize the shared vision of Dr. Karl Marx and Dr. B.R. Ambedkar: a "classless and casteless society." We advocate for a system of equitable wealth distribution and state socialism, guaranteeing every citizen food, housing, and dignified employment.'}
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {locale === 'hi'
                  ? 'पूंजीवाद शोषण का जनक है। इसके उन्मूलन के बिना मानवीय मूल्यों की स्थापना असंभव है। बहुजन क्रांति पार्टी का संघर्ष उसी आर्थिक विषमता को समाप्त करने के लिए है, जिसके बारे में बाबा साहब ने 15 मार्च 1947 को संविधान सभा को सौंपे गए अपने ज्ञापन में सविस्तार चर्चा की थी। हम राज्य समाजवाद के माध्यम से कृषि का राष्ट्रीयकरण और उद्योगों पर जन-स्वामित्व सुनिश्चित करेंगे।'
                  : 'Capitalism is the progenitor of exploitation. Without its abolition, the establishment of true human values is impossible. BKP’s struggle is dedicated to ending the economic disparity that Babasaheb detailed in his memorandum to the Constituent Assembly on March 15, 1947. We aim to ensure the nationalization of agriculture and public ownership of industries through State Socialism.'}
              </p>
              <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg mt-8">
                <p className="text-xl font-bold italic">
                  {locale === 'hi'
                    ? 'समाजवाद ही मुक्ति का मार्ग है। आइए, एक ऐसे भारत का निर्माण करें जहाँ मेहनत की लूट न हो और हर हाथ को काम, हर सिर को छत मिले। जागो भारतीयों, जागो बहुजनों!'
                    : "Socialism is the path to liberation. Let us build an India where labor is not looted, every hand has work, and every head has a roof. Awaken, Indians! Awaken, Bahujans!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-t-4 border-red-600">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? 'एक मजबूत, आत्मनिर्भर और समृद्ध भारत बनाना जहां हर नागरिक को गुणवत्तापूर्ण शिक्षा, स्वास्थ्यसेवा, रोजगार और न्याय तक पहुंच हो।'
                    : 'To build a strong, self-reliant, and prosperous India where every citizen has access to quality education, healthcare, employment, and justice.'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-green-500">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'hi' ? 'हमारी दृष्टि' : 'Our Vision'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? 'हम एक ऐसा भारत देखते हैं जो आर्थिक विकास, तकनीकी प्रगति और मानव विकास में दुनिया का नेतृत्व करे।'
                    : 'We envision an India that leads the world in economic growth, technological advancement, and human development.'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-blue-500">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'hi' ? 'हमारे मूल्य' : 'Our Values'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? 'ईमानदारी, पारदर्शिता, समावेशिता और राष्ट्र की सेवा हमारी पार्टी की नींव बनाती हैं।'
                    : 'Integrity, transparency, inclusivity, and service to the nation form the bedrock of our party.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <History className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              {locale === 'hi' ? 'हमारी यात्रा' : 'Our Journey'}
            </h2>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  2012
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'hi' ? 'स्थापना और राजनीतिक घोषणा' : 'Foundation & Political Declaration'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? '1 सितंबर 2012 को उत्तर प्रदेश राज्य संपत्ति विभाग के बी-ब्लॉक कॉमन हॉल, दारुल शफा, लखनऊ में बहुजन क्रांति पार्टी (मा.अ.) की आधिकारिक घोषणा की गई।'
                    : 'On September 1, 2012, Bahujan Kranti Party (M.A.) was officially announced at B-Block Common Hall, Darul Shafa, Lucknow, Uttar Pradesh.'}
                </p>
              </div>
            </div>

            {/* <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  2017
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'hi' ? 'पहली चुनावी सफलता' : 'First Electoral Success'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? 'भारतीय राजनीति में एक विश्वसनीय विकल्प के रूप में अपनी उपस्थिति स्थापित की।'
                    : 'Won seats in 5 state assemblies, establishing our presence as a credible alternative.'}
                </p>
              </div>
            </div> */}

            {/* <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  2019
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'hi' ? 'राष्ट्रीय विस्तार' : 'National Expansion'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? 'पूरे देश में 50 लाख से अधिक पंजीकृत सदस्यों के साथ सभी राज्यों और संघ क्षेत्रों में विस्तृत।'
                    : 'Expanded to all states and union territories with over 5 million registered members.'}
                </p>
              </div>
            </div> */}

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  2024
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'hi' ? 'लोकतंत्र को मजबूत करना' : 'Strengthening Democracy'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? 'पारदर्शी शासन और समावेशी नीतियों के प्रति नवीनीकृत प्रतिबद्धता के साथ बढ़ना और सेवा करना।'
                    : 'Continuing to grow and serve with renewed commitment to transparent governance.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'hi' ? 'हमारे मिशन में शामिल हों' : 'Join Our Mission'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {locale === 'hi'
              ? 'एक आंदोलन का हिस्सा बनें जो भारत के भविष्य को आकार दे रहा है'
              : 'Be part of a movement that is shaping the future of India'}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
