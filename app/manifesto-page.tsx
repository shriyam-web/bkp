'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import SectionHeading from '@/components/SectionHeading';
import { useTranslations } from '@/lib/TranslationContext';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ManifestoPage() {
  const { t, locale } = useTranslations();
  const isHi = locale === 'hi';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const policies = [
    {
      title: isHi ? 'आयुर्वेदिक सुपर-स्पेशलिटी स्वास्थ्य' : 'Ayurvedic Super-Specialty Healthcare',
      points: isHi
        ? ['प्रत्येक जिले में सुपर स्पेशलिटी आयुर्वेदिक अस्पताल।', 'असाध्य रोगों के लिए इन-पेशेंट सुविधा।', 'आधुनिक आयुर्वेदिक मेडिकल कॉलेज।', 'आयुर्वेद से स्वस्थ भारत।']
        : ['Super-specialty Ayurvedic hospitals in every district.', 'In-patient facilities for chronic diseases.', 'Modern Ayurvedic medical colleges.', 'A healthy India through Ayurveda.'],
    },
    {
      title: isHi ? 'कर्ज मुक्त भारत और आर्थिक सुधार' : 'Debt-Free India & Economic Reform',
      points: isHi
        ? ['₹50/लीटर पेट्रोलियम किसानों और मध्यम वर्ग के लिए।', 'कृषि को उद्योग का दर्जा।', 'आयकर की समाप्ति।', 'जनहित-केंद्रित आर्थिक नीतियां।']
        : ['Petroleum at ₹50/liter for farmers and middle class.', 'Industry status for agriculture.', 'Abolition of income tax.', 'Economic policies centered on public welfare.'],
    },
    {
      title: isHi ? 'राजकीय कृषि एवं गौ-रक्षा' : 'State Agriculture & Cow Protection',
      points: isHi
        ? ['गाय-बैल को राजकीय धर्म पशु घोषित करना।', 'गौशाला दान पर ₹5000 प्रति पशु।', 'गोबर, गोमूत्र, दूध की सरकारी खरीद।', 'सामूहिक खेती का आधुनिकीकरण।']
        : ['Cows and oxen as state religious animals.', '₹5000 grant per animal donated to shelters.', 'Govt procurement of dung, urine, and milk.', 'Modernizing agriculture through collective farming.'],
    },
    {
      title: isHi ? 'विदेशी काला धन' : 'Foreign Black Money Recovery',
      points: isHi
        ? ['काले धन को राष्ट्रीय संपत्ति घोषित करना।', 'स्विस बैंक जमा राशि की वापसी।', 'घोटालों की राशि का जनहित में उपयोग।', 'वित्तीय लूट रोकने के कड़े कानून।']
        : ['Black money declared national property.', 'Repatriation of Swiss bank deposits.', 'Recovered scam money for public benefit.', 'Strict laws against financial drain.'],
    },
    {
      title: isHi ? 'सार्वभौमिक सामाजिक सुरक्षा' : 'Universal Social Security',
      points: isHi
        ? ['भोजन, आवास और रोजगार की गारंटी।', '65+ वृद्धों के लिए पेंशन।', 'गरीब वर्गों के लिए कल्याणकारी कार्यक्रम।', 'अमीरी-गरीबी की खाई पाटना।']
        : ['Guaranteed food, housing, and employment.', 'Pension for citizens above 65.', 'Welfare programs for the poor.', 'Bridging the rich-poor gap.'],
    },
    {
      title: isHi ? 'सड़क सुरक्षा और लाइसेंस सुधार' : 'Road Safety & Licensing Reform',
      points: isHi
        ? ['प्रशिक्षण के बाद ही ड्राइविंग लाइसेंस।', 'नशे में ड्राइविंग को संगीन अपराध।', 'दुर्घटना पर लाइसेंस रद्द।', 'सड़क सुरक्षा जागरूकता अभियान।']
        : ['Mandatory training before license issuance.', 'Drunk driving as severe offense.', 'License cancellation for fatal accidents.', 'Road safety awareness campaigns.'],
    },
    {
      title: isHi ? 'भ्रष्टाचार मुक्त शासन' : 'Corruption-Free Governance',
      points: isHi
        ? ['संविधान में भ्रष्टाचार की परिभाषा।', 'व्यक्तिगत संपत्ति की सीमा।', 'बैंकों का राष्ट्रीयकरण।', 'कॉर्पोरेट कर्ज माफी समाप्त।']
        : ['Defining corruption in the constitution.', 'Limits on individual property.', 'Nationalization of banks.', 'Ending corporate loan waivers.'],
    },
    {
      title: isHi ? 'पारिवारिक विवाद एवं महिला सुरक्षा' : 'Family Disputes & Women\'s Protection',
      points: isHi
        ? ['दहेज कानूनों के दुरुपयोग पर रोक।', 'BNS 69 में निष्पक्ष कार्यवाही।', 'पारिवारिक सुलह केंद्र।', 'महिला सुरक्षा और निर्दोषों की रक्षा।']
        : ['Preventing misuse of dowry laws.', 'Fair action under BNS 69.', 'Family reconciliation centers.', 'Women\'s safety and protection of the innocent.'],
    },
    {
      title: isHi ? 'शुद्ध भोजन और मिलावटखोरी पर रोक' : 'Pure Food & Anti-Adulteration',
      points: isHi
        ? ['मिलावट को संगीन अपराध।', 'खतरनाक खाद्य सामग्री पर प्रतिबंध।', 'शुद्ध भोजन की गारंटी।', 'मिलावटखोरों पर अंकुश।']
        : ['Adulteration as heinous crime.', 'Ban on hazardous food ingredients.', 'Guaranteed pure nutrition.', 'Curbing the adulteration mafia.'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageIntro
        title={t('manifesto.title', 'Our Manifesto')}
        subtitle={isHi ? 'घोषणापत्र' : 'Party Manifesto'}
        description={t(
          'manifesto.subtitle',
          'A comprehensive vision for India\'s progress, equality, and prosperity.'
        )}
        count={policies.length}
        countLabel={isHi ? 'नीति क्षेत्र' : 'policy areas'}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={isHi ? 'नीति क्षेत्र' : 'Policy Areas'}
            description={
              isHi
                ? 'हर क्षेत्र पर क्लिक करके विस्तार से पढ़ें'
                : 'Tap each area to read the full policy points'
            }
            className="mb-6"
          />

          <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
            {policies.map((policy, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="text-xs font-bold text-red-600 tabular-nums shrink-0 pt-0.5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-foreground text-sm sm:text-base leading-snug">
                        {policy.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-muted-foreground shrink-0 transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 pl-11 sm:pl-12">
                      <ul className="space-y-2">
                        {policy.points.map((point, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                          >
                            <span className="text-red-600 shrink-0">·</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={isHi ? 'हमारी प्रतिबद्धता' : 'Our Commitment'}
            className="mb-6"
          />
          <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
            <p>
              {isHi
                ? 'हम इन नीतियों को पूर्ण पारदर्शिता और जवाबदेही के साथ लागू करने का वचन देते हैं।'
                : 'We pledge to implement these policies with complete transparency and accountability.'}
            </p>
            <p>
              {isHi
                ? 'यह घोषणापत्र केवल वादों का दस्तावेज नहीं — यह कार्यान्वयन योजनाओं और समयसीमा के साथ एक रोडमैप है।'
                : 'This manifesto is not merely promises — it is a roadmap backed by implementation plans and timelines.'}
            </p>
            <p>
              {isHi
                ? 'हम सहभागिता शासन में विश्वास करते हैं और जनता की राय से इन नीतियों को परिष्कृत करेंगे।'
                : 'We believe in participatory governance and will refine these policies through public input.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
