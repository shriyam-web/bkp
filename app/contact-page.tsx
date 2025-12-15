'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function ContactPage() {
  const { t, locale } = useTranslations();
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

      toast.success(locale === 'hi' ? 'संदेश भेजा गया!' : 'Message sent successfully!', {
        description: locale === 'hi' ? 'हम जल्द ही आपसे संपर्क करेंगे।' : 'We will get back to you soon.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error(locale === 'hi' ? 'संदेश भेजने में विफल' : 'Failed to send message', {
        description: locale === 'hi' ? 'कृपया बाद में फिर से प्रयास करें।' : 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <Header />

      <section className="relative bg-gradient-to-r from-red-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {locale === 'hi'
                ? 'हम आपकी चिंताओं को सुनने और आपके प्रश्नों का उत्तर देने के लिए यहां हैं'
                : 'We\'re here to listen to your concerns and answer your questions'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {locale === 'hi' ? 'संपर्क में रहें' : 'Get in Touch'}
              </h2>
              <p className="text-gray-600 mb-8">
                {locale === 'hi'
                  ? 'प्रश्न हैं, सुझाव हैं, या शामिल होना चाहते हैं? हम आपकी सुनना पसंद करेंगे। फॉर्म भरें और हमारी टीम जल्दी से जल्दी जवाब देगी।'
                  : 'Have questions, suggestions, or want to get involved? We\'d love to hear from you. Fill out the form and our team will respond as soon as possible.'
                }
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                        <MapPin className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{locale === 'hi' ? 'पता' : 'Address'}</h3>
                        <p className="text-gray-600">
                          141, Dhansua PO Central Jail Fatehgarh Farrukhabad, 209602, Uttar Pradesh, India
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                        <Phone className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{locale === 'hi' ? 'फोन' : 'Phone'}</h3>
                        <p className="text-gray-600">
                          +91 7376264269
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                        <Mail className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{locale === 'hi' ? 'ईमेल' : 'Email'}</h3>
                        <p className="text-gray-600">
                          bahujankrantipartyma@gmail.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {locale === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={locale === 'hi' ? 'आपका नाम' : 'Your name'}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {locale === 'hi' ? 'ईमेल पता *' : 'Email Address *'}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        {locale === 'hi' ? 'फोन नंबर' : 'Phone Number'}
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        {locale === 'hi' ? 'विषय *' : 'Subject *'}
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={locale === 'hi' ? 'यह किसके बारे में है?' : 'What is this regarding?'}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {locale === 'hi' ? 'संदेश *' : 'Message *'}
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={locale === 'hi' ? 'आपका संदेश...' : 'Your message...'}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                      disabled={loading}
                    >
                      {loading ? (locale === 'hi' ? 'भेज रहे हैं...' : 'Sending...') : (locale === 'hi' ? 'संदेश भेजें' : 'Send Message')}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
