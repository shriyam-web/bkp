'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import { useTranslations } from '@/lib/TranslationContext';
import Link from 'next/link';

type Section = { title: string; paragraphs: string[] };

export default function TermsPage() {
  const { locale } = useTranslations();
  const isHi = locale === 'hi';

  const sections: Section[] = isHi
    ? [
        {
          title: '1. स्वीकृति',
          paragraphs: [
            'bahujankrantiparty.org ("वेबसाइट") का उपयोग करके आप बहुजन क्रान्ति पार्टी की इन सेवा शर्तों से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया साइट का उपयोग बंद करें।',
          ],
        },
        {
          title: '2. साइट का उद्देश्य',
          paragraphs: [
            'यह वेबसाइट पार्टी की जानकारी, नेतृत्व, घोषणापत्र, समाचार, कार्यक्रम, सदस्यता और बूथ समिति निर्देशिका जैसी संगठनात्मक सेवाएँ प्रदान करती है।',
            'सामग्री सामान्य सार्वजनिक जानकारी और संगठनात्मक उपयोग के लिए है; यह व्यक्तिगत कानूनी सलाह नहीं है।',
          ],
        },
        {
          title: '3. सदस्यता और उपयोगकर्ता सबमिशन',
          paragraphs: [
            'जॉइन / संपर्क / अन्य फॉर्म भरते समय आप सटीक और सच्ची जानकारी देने के लिए सहमत होते हैं।',
            'सदस्यता आवेदन स्वीकृति की गारंटी नहीं है; पार्टी नियमों के अनुसार समीक्षा की जा सकती है।',
            'आप ऐसी सामग्री सबमिट नहीं करेंगे जो अवैध, अपमानजनक, भ्रामक, या दूसरों के अधिकारों का उल्लंघन करती हो।',
          ],
        },
        {
          title: '4. बूथ समिति और सार्वजनिक प्रोफ़ाइल',
          paragraphs: [
            'बूथ समिति और नेतृत्व पृष्ठों पर दिखाई गई जानकारी संगठनात्मक रिकॉर्ड पर आधारित है।',
            'पहचान पत्र / कार्ड डाउनलोड व्यक्तिगत और संगठनात्मक उपयोग के लिए हैं; सामग्री को गलत तरीके से प्रस्तुत या जाली बनाने की अनुमति नहीं है।',
            'त्रुटियों की सूचना पार्टी प्रशासन को दें ताकि सुधार किया जा सके।',
          ],
        },
        {
          title: '5. बौद्धिक संपदा',
          paragraphs: [
            'वेबसाइट पर लोगो, पाठ, चित्र, डिज़ाइन और अन्य सामग्री बहुजन क्रान्ति पार्टी या संबंधित अधिकारधारकों की संपत्ति है, जब तक अन्यथा न कहा जाए।',
            'बिना लिखित अनुमति के सामग्री की प्रतिलिपि, पुनर्प्रकाशन या व्यावसायिक उपयोग प्रतिबंधित है, सिवाय उचित व्यक्तिगत / गैर-व्यावसायिक साझाकरण के।',
          ],
        },
        {
          title: '6. स्वीकार्य उपयोग',
          paragraphs: [
            'आप साइट को हैक, स्कैनिंग, स्पैम, मैलवेयर, या सेवा बाधित करने वाले किसी भी तरीके से उपयोग नहीं करेंगे।',
            'स्वचालित स्क्रैपिंग या डेटा निष्कर्षण बिना अनुमति के निषिद्ध है।',
            'हम संदिग्ध दुरुपयोग पर पहुँच प्रतिबंधित कर सकते हैं।',
          ],
        },
        {
          title: '7. अस्वीकरण',
          paragraphs: [
            'साइट "जैसी है" और "जैसी उपलब्ध है" के आधार पर प्रदान की जाती है।',
            'हम निरंतर उपलब्धता, पूर्ण सटीकता, या त्रुटि-मुक्त संचालन की गारंटी नहीं देते।',
            'बाहरी वेबसाइटों के लिंक सुविधा के लिए हैं; उनकी सामग्री या नीतियों के लिए हम जिम्मेदार नहीं हैं।',
          ],
        },
        {
          title: '8. दायित्व की सीमा',
          paragraphs: [
            'लागू कानून द्वारा अनुमत अधिकतम सीमा तक, पार्टी साइट के उपयोग से होने वाले अप्रत्यक्ष, आकस्मिक, या परिणामी नुकसान के लिए उत्तरदायी नहीं होगी।',
          ],
        },
        {
          title: '9. परिवर्तन',
          paragraphs: [
            'हम किसी भी समय शर्तें, सामग्री, या सुविधाएँ अपडेट कर सकते हैं। निरंतर उपयोग अद्यतन शर्तों की स्वीकृति माना जाएगा।',
          ],
        },
        {
          title: '10. शासी कानून',
          paragraphs: [
            'ये शर्तें भारत के कानूनों के अधीन हैं। विवादों का निपटारा सक्षम न्यायालयों में होगा, जहाँ लागू हो।',
          ],
        },
        {
          title: '11. संपर्क',
          paragraphs: [
            'प्रश्न: bahujankrantipartyma@gmail.com | +91 7376264269',
            'पता: 141, Dhansua PO Central Jail Fatehgarh Farrukhabad, 209602, Uttar Pradesh, India',
          ],
        },
      ]
    : [
        {
          title: '1. Acceptance',
          paragraphs: [
            'By using bahujankrantiparty.org (the "Website"), you agree to these Terms of Service of Bahujan Kranti Party. If you do not agree, please stop using the site.',
          ],
        },
        {
          title: '2. Purpose of the Site',
          paragraphs: [
            'This website provides party information, leadership details, manifesto content, news, events, membership options, and organisational tools such as the booth committee directory.',
            'Content is for general public information and organisational use. It is not personal legal advice.',
          ],
        },
        {
          title: '3. Membership and User Submissions',
          paragraphs: [
            'When you submit Join, Contact, or other forms, you agree to provide accurate and truthful information.',
            'Membership applications are not guaranteed approval and may be reviewed under party rules.',
            'You must not submit content that is unlawful, abusive, misleading, or that infringes others’ rights.',
          ],
        },
        {
          title: '4. Booth Committee and Public Profiles',
          paragraphs: [
            'Information shown on booth committee and leadership pages is based on organisational records.',
            'Downloaded identity cards are for personal and organisational use. Misrepresentation or forgery of card content is not permitted.',
            'Please report errors to party administrators so records can be corrected.',
          ],
        },
        {
          title: '5. Intellectual Property',
          paragraphs: [
            'Logos, text, images, design, and other materials on the Website belong to Bahujan Kranti Party or related rights holders unless otherwise stated.',
            'Copying, republishing, or commercial use without written permission is restricted, except for reasonable personal or non-commercial sharing.',
          ],
        },
        {
          title: '6. Acceptable Use',
          paragraphs: [
            'You must not use the site to hack, scan, spam, distribute malware, or disrupt service.',
            'Automated scraping or data extraction without permission is prohibited.',
            'We may restrict access where misuse is suspected.',
          ],
        },
        {
          title: '7. Disclaimers',
          paragraphs: [
            'The site is provided on an "as is" and "as available" basis.',
            'We do not guarantee uninterrupted availability, complete accuracy, or error-free operation.',
            'Links to external sites are for convenience; we are not responsible for their content or policies.',
          ],
        },
        {
          title: '8. Limitation of Liability',
          paragraphs: [
            'To the fullest extent permitted by applicable law, the Party shall not be liable for indirect, incidental, or consequential damages arising from use of the Website.',
          ],
        },
        {
          title: '9. Changes',
          paragraphs: [
            'We may update these terms, content, or features at any time. Continued use after changes means you accept the updated terms.',
          ],
        },
        {
          title: '10. Governing Law',
          paragraphs: [
            'These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of competent courts, as applicable.',
          ],
        },
        {
          title: '11. Contact',
          paragraphs: [
            'Questions: bahujankrantipartyma@gmail.com | +91 7376264269',
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
          title={isHi ? 'सेवा की शर्तें' : 'Terms of Service'}
          description={
            isHi
              ? 'इस वेबसाइट के उपयोग के नियम और शर्तें।'
              : 'The rules and conditions for using this website.'
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
              <Link href={`/${locale}/privacy`} className="text-red-600 hover:underline">
                {isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
