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
                  {locale === 'hi' ? 'स्थापना' : 'Foundation'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? 'बहुजन क्रांति पार्टी की आधिकारिक स्थापना की गई।'
                    : 'Bahujan Kranti Party was officially founded with a core group of 50 founding members.'}
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
