'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import { useTranslations } from '@/lib/TranslationContext';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function ContactPage() {
  const { locale } = useTranslations();
  const isHi = locale === 'hi';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      toast.success(isHi ? 'संदेश भेजा गया' : 'Message sent', {
        description: isHi ? 'हम जल्द ही आपसे संपर्क करेंगे।' : 'We will get back to you soon.',
      });

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error(isHi ? 'भेजने में विफल' : 'Failed to send', {
        description: isHi ? 'कृपया बाद में पुनः प्रयास करें।' : 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      label: isHi ? 'पता' : 'Address',
      value: '141, Dhansua PO Central Jail Fatehgarh Farrukhabad, 209602, Uttar Pradesh, India',
      href: undefined,
    },
    {
      icon: Phone,
      label: isHi ? 'फोन' : 'Phone',
      value: '+91 7376264269',
      href: 'tel:+917376264269',
    },
    {
      icon: Mail,
      label: isHi ? 'ईमेल' : 'Email',
      value: 'bahujankrantipartyma@gmail.com',
      href: 'mailto:bahujankrantipartyma@gmail.com',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Header />

      <PageIntro
        title={isHi ? 'संपर्क करें' : 'Contact Us'}
        subtitle={isHi ? 'बहुजन क्रांति पार्टी' : 'Bahujan Kranti Party'}
        description={
          isHi
            ? 'प्रश्न, सुझाव या सहयोग — हम आपकी बात सुनने के लिए उपलब्ध हैं।'
            : 'Questions, suggestions, or collaboration — we are here to listen.'
        }
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {isHi ? 'संपर्क जानकारी' : 'Contact Information'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {isHi
                    ? 'सीधे कॉल या ईमेल करें, या फॉर्म भरें।'
                    : 'Call or email directly, or fill out the form.'}
                </p>
              </div>

              <div className="space-y-4">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-3">
                    <div className="h-9 w-9 rounded border border-border flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-foreground hover:text-red-600 transition-colors break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground leading-relaxed">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="border border-border rounded-lg p-5 sm:p-6 bg-card space-y-4"
              >
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {isHi ? 'संदेश भेजें' : 'Send a Message'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                      {isHi ? 'पूरा नाम' : 'Full Name'} *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isHi ? 'आपका नाम' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                      {isHi ? 'ईमेल' : 'Email'} *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                      {isHi ? 'फोन' : 'Phone'}
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                      {isHi ? 'विषय' : 'Subject'} *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={isHi ? 'विषय लिखें' : 'Subject'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                    {isHi ? 'संदेश' : 'Message'} *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isHi ? 'अपना संदेश लिखें...' : 'Write your message...'}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                  disabled={loading}
                >
                  {loading
                    ? isHi
                      ? 'भेज रहे हैं...'
                      : 'Sending...'
                    : isHi
                      ? 'संदेश भेजें'
                      : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
