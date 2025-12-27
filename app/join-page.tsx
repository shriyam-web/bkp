'use client';

import { useState } from 'react';
import { Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function JoinPage() {
  const { t, locale } = useTranslations();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    fathersOrHusbandsName: '',
    address: '',
    pincode: '',
    mobileNo: '',
    voterIdCardNo: '',
    date: '',
    membershipType: '',
  });

  const handleSelectMembership = (type: string) => {
    setFormData({ ...formData, membershipType: type });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      toast.success(locale === 'hi' ? 'आवेदन सफलतापूर्वक जमा किया गया!' : 'Application submitted successfully!', {
        description: locale === 'hi' ? 'हम आपके आवेदन की समीक्षा करेंगे और जल्द ही आपसे संपर्क करेंगे।' : 'We will review your application and get back to you soon.',
      });

      setFormData({
        name: '',
        age: '',
        fathersOrHusbandsName: '',
        address: '',
        pincode: '',
        mobileNo: '',
        voterIdCardNo: '',
        date: '',
        membershipType: '',
      });
    } catch (error) {
      toast.error(locale === 'hi' ? 'आवेदन जमा करने में विफल' : 'Failed to submit application', {
        description: locale === 'hi' ? 'कृपया बाद में फिर से प्रयास करें।' : 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const benefits = locale === 'hi' ? [
    'निर्णय लेने की प्रक्रियाओं में भाग लें',
    'विशेष पार्टी कार्यक्रम और रैलियों में भाग लें',
    'पार्टी की गतिविधियों के बारे में नियमित अपडेट प्राप्त करें',
    'स्वेच्छासेवक बनने और योगदान देने का अवसर',
    'प्रशिक्षण और विकास कार्यक्रमों तक पहुंच',
    'समान विचारधारा वाले व्यक्तियों से जुड़ें',
  ] : [
    'Be part of decision-making processes',
    'Attend exclusive party events and rallies',
    'Receive regular updates on party activities',
    'Opportunity to volunteer and contribute',
    'Access to training and development programs',
    'Connect with like-minded individuals',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <Header />

      <section className="relative bg-gradient-to-r from-red-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              {locale === 'hi' ? 'हमारे आंदोलन में शामिल हों' : 'Join Our Movement'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {locale === 'hi'
                ? 'एक सदस्य बनें और सभी के लिए एक बेहतर भारत बनाने में हमारी मदद करें'
                : 'Become a member and help us build a better India for all'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!showForm ? (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('join.selectMembershipTitle')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('join.selectMembershipSubtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Normal Membership */}
                <Card className="flex flex-col h-full border-2 hover:border-blue-500 transition-colors cursor-pointer" onClick={() => handleSelectMembership('Normal Membership')}>
                  <CardContent className="pt-8 flex-grow flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('join.normalMembershipLabel')}</h3>
                    <p className="text-gray-600 mb-8 flex-grow">
                      {t('join.normalMembershipDesc')}
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {t('join.selectButton')}
                    </Button>
                  </CardContent>
                </Card>

                {/* Active Membership */}
                <Card className="flex flex-col h-full border-2 hover:border-red-500 transition-colors cursor-pointer" onClick={() => handleSelectMembership('Active Membership')}>
                  <CardContent className="pt-8 flex-grow flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                      <Users className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('join.activeMembershipLabel')}</h3>
                    <p className="text-gray-600 mb-8 flex-grow">
                      {t('join.activeMembershipDesc')}
                    </p>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      {t('join.selectButton')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {locale === 'hi' ? 'हमसे क्यों जुड़ें?' : 'Why Join Us?'}
                  </h2>
                </div>

                <p className="text-gray-600 mb-8">
                  {locale === 'hi'
                    ? 'बहुजन क्रांति पार्टी से जुड़कर, आप हमारे राष्ट्र में सकारात्मक परिवर्तन लाने के लिए समर्पित एक आंदोलन का हिस्सा बनते हैं। आपकी आवाज महत्वपूर्ण है, और एक साथ हम भारत के भविष्य को आकार दे सकते हैं।'
                    : 'By joining Bahujan Kranti Party, you become part of a movement dedicated to creating positive change in our nation. Your voice matters, and together we can shape the future of India.'
                  }
                </p>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Card className="bg-gradient-to-br from-red-50 to-blue-50 border-red-200">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">{locale === 'hi' ? 'सदस्यता निःशुल्क है' : 'Membership is Free'}</h3>
                    <p className="text-gray-600">
                      {locale === 'hi'
                        ? 'कोई सदस्यता शुल्क नहीं है। हम एक मजबूत, समावेशी आंदोलन बनाने में विश्वास करते हैं जहां हर कोई अपनी वित्तीय स्थिति की परवाह किए बिना भाग ले सके।'
                        : 'There are no membership fees. We believe in building a strong, inclusive movement where everyone can participate regardless of their financial status.'
                      }
                    </p>
                  </CardContent>
                </Card>

                <Button 
                  variant="outline" 
                  className="mt-8"
                  onClick={() => setShowForm(false)}
                >
                  {locale === 'hi' ? '← सदस्यता प्रकार बदलें' : '← Change Membership Type'}
                </Button>
              </div>

              <div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold">{locale === 'hi' ? 'सदस्यता आवेदन' : 'Membership Application'}</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${formData.membershipType === 'Active Membership' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {formData.membershipType === 'Active Membership' ? t('join.activeMembershipLabel') : t('join.normalMembershipLabel')}
                      </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* ... existing form fields ... */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'नाम *' : 'Name *'}
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={locale === 'hi' ? 'आपका पूरा नाम' : 'Your full name'}
                        />
                      </div>

                      <div>
                        <label htmlFor="age" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'आयु *' : 'Age *'}
                        </label>
                        <Input
                          id="age"
                          type="number"
                          required
                          min="1"
                          max="120"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          placeholder={locale === 'hi' ? 'आपकी आयु' : 'Your age'}
                        />
                      </div>

                      <div>
                        <label htmlFor="fathersOrHusbandsName" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'पिता का नाम / पति का नाम *' : 'Father\'s Name / Husband\'s Name *'}
                        </label>
                        <Input
                          id="fathersOrHusbandsName"
                          type="text"
                          required
                          value={formData.fathersOrHusbandsName}
                          onChange={(e) => setFormData({ ...formData, fathersOrHusbandsName: e.target.value })}
                          placeholder={locale === 'hi' ? 'पिता या पति का नाम' : 'Father\'s or Husband\'s name'}
                        />
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'पता *' : 'Address *'}
                        </label>
                        <Textarea
                          id="address"
                          required
                          rows={2}
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder={locale === 'hi' ? 'आपका आवासीय पता' : 'Your residential address'}
                        />
                      </div>

                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'पिनकोड *' : 'Pincode *'}
                        </label>
                        <Input
                          id="pincode"
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          placeholder={locale === 'hi' ? 'आपका 6 अंकीय पिनकोड' : 'Your 6-digit pincode'}
                          pattern="[0-9]{6}"
                        />
                      </div>

                      <div>
                        <label htmlFor="mobileNo" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'मोबाइल नंबर *' : 'Mobile No. *'}
                        </label>
                        <Input
                          id="mobileNo"
                          type="tel"
                          required
                          value={formData.mobileNo}
                          onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                          placeholder="+91 9876543210"
                        />
                      </div>

                      <div>
                        <label htmlFor="voterIdCardNo" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'मतदाता पहचान पत्र संख्या *' : 'Voter ID Card No. *'}
                        </label>
                        <Input
                          id="voterIdCardNo"
                          type="text"
                          required
                          value={formData.voterIdCardNo}
                          onChange={(e) => setFormData({ ...formData, voterIdCardNo: e.target.value })}
                          placeholder={locale === 'hi' ? 'आपका मतदाता पहचान पत्र नंबर' : 'Your voter ID card number'}
                        />
                      </div>

                      <div>
                        <label htmlFor="membershipType" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'सदस्यता का प्रकार *' : 'Membership Type *'}
                        </label>
                        <select
                          id="membershipType"
                          required
                          value={formData.membershipType}
                          onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="Active Membership">{t('join.activeMembership')}</option>
                          <option value="Normal Membership">{t('join.normalMembership')}</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-2">
                          {locale === 'hi' ? 'तारीख *' : 'Date *'}
                        </label>
                        <Input
                          id="date"
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                        disabled={loading}
                      >
                        {loading ? (locale === 'hi' ? 'जमा किया जा रहा है...' : 'Submitting...') : (locale === 'hi' ? 'आवेदन जमा करें' : 'Submit Application')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
