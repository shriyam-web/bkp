import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Flag } from 'lucide-react';
import { useTranslations } from '@/lib/TranslationContext';

export default function Footer() {
  const { locale, t } = useTranslations();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                <Flag className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-white whitespace-nowrap tracking-tight">
                  {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
                </span>
                <span className="text-[9px] font-bold text-red-500 uppercase tracking-[0.12em] whitespace-nowrap mt-1">
                  {locale === 'hi' ? 'मार्क्सवाद-अम्बेडकरवाद' : 'Marxwaad-Ambedkarwaad'}
                </span>
              </div>
            </div>
            <p className="text-sm">
              {locale === 'hi' 
                ? 'सामाजिक समानता, श्रमिकों के अधिकारों और समावेशी विकास के लिए समर्पित आधिकारिक वेबसाइट। हर नागरिक के लिए एक मजबूत, प्रगतिशील भारत का निर्माण।'
                : "Official website dedicated to social equality, workers' rights, and inclusive development. Building a stronger, progressive India for every citizen."}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {locale === 'hi' ? 'आधिकारिक वेबसाइट:' : 'Official Website:'} <a href="https://bahujankrantiparty.org" className="text-red-500 hover:text-red-400">bahujankrantiparty.org</a>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{locale === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/about`} className="hover:text-red-600 transition-colors">{locale === 'hi' ? 'हमारे बारे में' : 'About Us'}</Link></li>
              <li><Link href={`/${locale}/leadership`} className="hover:text-red-600 transition-colors">{locale === 'hi' ? 'नेतृत्व' : 'Leadership'}</Link></li>
              <li><Link href={`/${locale}/manifesto`} className="hover:text-red-600 transition-colors">{locale === 'hi' ? 'घोषणापत्र' : 'Manifesto'}</Link></li>
              <li><Link href={`/${locale}/join`} className="hover:text-red-600 transition-colors">{locale === 'hi' ? 'शामिल हों' : 'Join Us'}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{locale === 'hi' ? 'संसाधन' : 'Resources'}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/news`} className="hover:text-red-600 transition-colors">{locale === 'hi' ? 'समाचार' : 'News'}</Link></li>
              <li><Link href={`/${locale}/events`} className="hover:text-red-600 transition-colors">{locale === 'hi' ? 'ईवेंट' : 'Events'}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-red-600 transition-colors">{locale === 'hi' ? 'संपर्क' : 'Contact'}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Info'}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span>141, Dhansua PO Central Jail Fatehgarh Farrukhabad, 209602, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span>+91 7376264269</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-red-600" />
                <span>bahujankrantipartyma@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; 2025 {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी (मार्क्सवाद-अम्बेडकरवाद)' : 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)'}. {locale === 'hi' ? 'सर्वाधिकार सुरक्षित' : 'All rights reserved'}. | {locale === 'hi' ? 'आधिकारिक वेबसाइट' : 'Official Website'}: bahujankrantiparty.org
          </p>
          <div className="flex space-x-6 text-sm mt-4 sm:mt-0">
            <Link href="#" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-red-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
