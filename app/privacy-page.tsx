'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import { useTranslations } from '@/lib/TranslationContext';
import Link from 'next/link';

type Section = { title: string; paragraphs: string[] };

export default function PrivacyPage() {
  const { locale } = useTranslations();
  const isHi = locale === 'hi';

  const sections: Section[] = isHi
    ? [
        {
          title: '1. परिचय',
          paragraphs: [
            'बहुजन क्रान्ति पार्टी ("हम", "हमारा", "पार्टी") आपकी गोपनीयता का सम्मान करती है। यह गोपनीयता नीति बताती है कि bahujankrantiparty.org और संबंधित डिजिटल सेवाओं पर हम कौन-सी जानकारी एकत्र करते हैं, उसका उपयोग कैसे करते हैं, और आपकी जानकारी की सुरक्षा कैसे करते हैं।',
            'हमारी वेबसाइट का उपयोग करके आप इस नीति में वर्णित प्रथाओं से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया साइट का उपयोग न करें।',
          ],
        },
        {
          title: '2. हम कौन-सी जानकारी एकत्र करते हैं',
          paragraphs: [
            'सदस्यता / जुड़ें फॉर्म: नाम, संपर्क नंबर, ईमेल, पता, और स्वेच्छा से दी गई अन्य विवरण।',
            'संपर्क फॉर्म: नाम, ईमेल, फोन, विषय और संदेश।',
            'न्यूज़लेटर: ईमेल पता, यदि आप सदस्यता लेते हैं।',
            'बूथ समिति / नेतृत्व प्रोफ़ाइल: सार्वजनिक संगठनात्मक जानकारी जैसे नाम, पद, संपर्क, और पता — पार्टी प्रशासन द्वारा दर्ज।',
            'तकनीकी डेटा: IP पता, ब्राउज़र प्रकार, डिवाइस जानकारी, और उपयोग आँकड़े — साइट सुरक्षा और सुधार के लिए।',
          ],
        },
        {
          title: '3. जानकारी का उपयोग',
          paragraphs: [
            'सदस्यता आवेदनों और पूछताछ का जवाब देने के लिए।',
            'पार्टी समाचार, कार्यक्रमों और घोषणाओं की जानकारी देने के लिए (जहाँ आपने सहमति दी हो)।',
            'बूथ समिति और नेतृत्व निर्देशिका जैसी संगठनात्मक सेवाएँ संचालित करने के लिए।',
            'वेबसाइट सुरक्षा, दुरुपयोग रोकथाम और प्रदर्शन सुधार के लिए।',
            'कानूनी दायित्वों का पालन करने के लिए।',
          ],
        },
        {
          title: '4. साझाकरण',
          paragraphs: [
            'हम आपकी व्यक्तिगत जानकारी तीसरे पक्ष को बिक्री नहीं करते।',
            'जानकारी केवल विश्वसनीय सेवा प्रदाताओं (जैसे होस्टिंग, ईमेल डिलीवरी) के साथ आवश्यक सीमा तक साझा की जा सकती है, या जब कानून द्वारा आवश्यक हो।',
            'सार्वजनिक नेतृत्व / बूथ प्रोफ़ाइल जानबूझकर सार्वजनिक प्रदर्शन के लिए प्रकाशित की जाती हैं।',
          ],
        },
        {
          title: '5. डेटा सुरक्षा और अवधारण',
          paragraphs: [
            'हम उचित तकनीकी और संगठनात्मक उपाय अपनाते हैं, फिर भी कोई भी इंटरनेट प्रणाली पूरी तरह सुरक्षित नहीं मानी जा सकती।',
            'हम जानकारी केवल उतने समय तक रखते हैं जितना पार्टी कार्यों, कानूनी आवश्यकताओं और विवाद समाधान के लिए आवश्यक हो।',
          ],
        },
        {
          title: '6. आपके अधिकार',
          paragraphs: [
            'आप अपने व्यक्तिगत डेटा तक पहुँच, सुधार या हटाने का अनुरोध कर सकते हैं, लागू कानून के अधीन।',
            'न्यूज़लेटर या प्रचार संचार से आप किसी भी समय सदस्यता रद्द कर सकते हैं।',
            'अनुरोधों के लिए संपर्क करें: bahujankrantipartyma@gmail.com या +91 7376264269।',
          ],
        },
        {
          title: '7. कुकीज़ और तृतीय-पक्ष सेवाएँ',
          paragraphs: [
            'साइट आवश्यक कुकीज़ और विश्लेषण / होस्टिंग सेवाओं का उपयोग कर सकती है। आप ब्राउज़र सेटिंग्स से कुकीज़ नियंत्रित कर सकते हैं।',
            'बाहरी लिंक हमारी नियंत्रण में नहीं हैं; उनकी गोपनीयता नीतियाँ अलग हो सकती हैं।',
          ],
        },
        {
          title: '8. नीति में परिवर्तन',
          paragraphs: [
            'हम इस नीति को समय-समय पर अपडेट कर सकते हैं। अद्यतन संस्करण इस पृष्ठ पर प्रकाशित किया जाएगा, साथ में "अंतिम अपडेट" तिथि।',
          ],
        },
        {
          title: '9. संपर्क',
          paragraphs: [
            'गोपनीयता संबंधी प्रश्नों के लिए: bahujankrantipartyma@gmail.com',
            'पता: 141, Dhansua PO Central Jail Fatehgarh Farrukhabad, 209602, Uttar Pradesh, India',
          ],
        },
      ]
    : [
        {
          title: '1. Introduction',
          paragraphs: [
            'Bahujan Kranti Party ("we", "us", "our", or the "Party") respects your privacy. This Privacy Policy explains what information we collect on bahujankrantiparty.org and related digital services, how we use it, and how we protect it.',
            'By using our website, you agree to the practices described here. If you do not agree, please do not use the site.',
          ],
        },
        {
          title: '2. Information We Collect',
          paragraphs: [
            'Membership / Join forms: name, phone number, email, address, and other details you voluntarily provide.',
            'Contact forms: name, email, phone, subject, and message.',
            'Newsletter: email address, if you subscribe.',
            'Booth committee / leadership profiles: organisational information such as name, position, contact details, and address — entered by party administrators for public or internal organisational use.',
            'Technical data: IP address, browser type, device information, and usage statistics used for security and site improvement.',
          ],
        },
        {
          title: '3. How We Use Information',
          paragraphs: [
            'To respond to membership applications and enquiries.',
            'To share party news, events, and announcements where you have consented.',
            'To operate organisational tools such as booth committee and leadership directories.',
            'To protect the website, prevent abuse, and improve performance.',
            'To comply with applicable legal obligations.',
          ],
        },
        {
          title: '4. Sharing',
          paragraphs: [
            'We do not sell your personal information to third parties.',
            'Information may be shared with trusted service providers (for example hosting or email delivery) only as needed to run the site, or when required by law.',
            'Public leadership and booth profiles are published intentionally for organisational transparency.',
          ],
        },
        {
          title: '5. Security and Retention',
          paragraphs: [
            'We take reasonable technical and organisational measures to protect data. No internet system can be guaranteed completely secure.',
            'We retain information only as long as needed for party operations, legal requirements, and dispute resolution.',
          ],
        },
        {
          title: '6. Your Rights',
          paragraphs: [
            'Subject to applicable law, you may request access to, correction of, or deletion of your personal data.',
            'You may unsubscribe from newsletters or promotional messages at any time.',
            'Contact us at bahujankrantipartyma@gmail.com or +91 7376264269 for privacy requests.',
          ],
        },
        {
          title: '7. Cookies and Third-Party Services',
          paragraphs: [
            'The site may use essential cookies and hosting or analytics services. You can control cookies through your browser settings.',
            'External links are outside our control and may have different privacy practices.',
          ],
        },
        {
          title: '8. Changes to This Policy',
          paragraphs: [
            'We may update this policy from time to time. The revised version will be posted on this page with an updated "Last updated" date.',
          ],
        },
        {
          title: '9. Contact',
          paragraphs: [
            'For privacy questions: bahujankrantipartyma@gmail.com',
            'Address: 141, Dhansua PO Central Jail Fatehgarh Farrukhabad, 209602, Uttar Pradesh, India',
          ],
        },
      ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro
          subtitle={isHi ? 'कानूनी' : 'Legal'}
          title={isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}
          description={
            isHi
              ? 'यह नीति बताती है कि हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित रखते हैं।'
              : 'How we collect, use, and protect your information on this website.'
          }
        />
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground mb-10">
              {isHi ? 'अंतिम अपडेट' : 'Last updated'}: 11 July 2026
            </p>
            <div className="space-y-10">
              {sections.map((section) => (
                <article key={section.title}>
                  <h2 className="text-lg font-semibold text-foreground tracking-tight mb-3">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-[15px] leading-relaxed text-muted-foreground"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
              {isHi ? 'संबंधित:' : 'Related:'}{' '}
              <Link href={`/${locale}/terms`} className="text-red-600 hover:underline">
                {isHi ? 'सेवा की शर्तें' : 'Terms of Service'}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
