import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Flag, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/lib/TranslationContext';

export default function Footer() {
  const { locale, t } = useTranslations();

  return (
    <footer className="bg-muted/50 text-muted-foreground border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-200 dark:shadow-none">
                <Flag className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-foreground whitespace-nowrap tracking-tight">
                  {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
                </span>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.15em] whitespace-nowrap mt-1">
                  {locale === 'hi' ? 'मार्क्सवाद-अम्बेडकरवाद' : 'Marxwaad-Ambedkarwaad'}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              {locale === 'hi' 
                ? 'सामाजिक समानता, श्रमिकों के अधिकारों और समावेशी विकास के लिए समर्पित आधिकारिक वेबसाइट। हर नागरिक के लिए एक मजबूत, प्रगतिशील भारत का निर्माण।'
                : "Official website dedicated to social equality, workers' rights, and inclusive development. Building a stronger, progressive India for every citizen."}
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border hover:text-red-600 hover:border-red-600 transition-all shadow-sm">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-foreground mb-6 uppercase tracking-widest text-xs">{locale === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href={`/${locale}/about`} className="hover:text-red-600 transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {locale === 'hi' ? 'हमारे बारे में' : 'About Us'}</Link></li>
              <li><Link href={`/${locale}/leadership`} className="hover:text-red-600 transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {locale === 'hi' ? 'नेतृत्व' : 'Leadership'}</Link></li>
              <li><Link href={`/${locale}/manifesto`} className="hover:text-red-600 transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {locale === 'hi' ? 'घोषणापत्र' : 'Manifesto'}</Link></li>
              <li><Link href={`/${locale}/join`} className="hover:text-red-600 transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {locale === 'hi' ? 'शामिल हों' : 'Join Us'}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-foreground mb-6 uppercase tracking-widest text-xs">{locale === 'hi' ? 'संसाधन' : 'Resources'}</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href={`/${locale}/news`} className="hover:text-red-600 transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {locale === 'hi' ? 'समाचार' : 'News'}</Link></li>
              <li><Link href={`/${locale}/events`} className="hover:text-red-600 transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {locale === 'hi' ? 'ईवेंट' : 'Events'}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-red-600 transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {locale === 'hi' ? 'संपर्क' : 'Contact'}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-foreground mb-6 uppercase tracking-widest text-xs">{locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Info'}</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start space-x-3 group">
                <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4 text-red-600" />
                </div>
                <span className="font-medium">141, Dhansua PO Central Jail Fatehgarh Farrukhabad, 209602, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4 text-red-600" />
                </div>
                <span className="font-medium">+91 7376264269</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4 text-red-600" />
                </div>
                <span className="font-medium">bahujankrantipartyma@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-muted-foreground text-center md:text-left">
            &copy; 2025 {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी (मार्क्सवाद-अम्बेडकरवाद)' : 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)'}. {locale === 'hi' ? 'सर्वाधिकार सुरक्षित' : 'All rights reserved'}. <br />
            {locale === 'hi' ? 'आधिकारिक वेबसाइट' : 'Official Website'}: <span className="text-red-600">bahujankrantiparty.org</span>
          </p>
          <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest">
            <Link href="#" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-red-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
