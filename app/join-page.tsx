'use client';

import { useState, useRef, useEffect } from 'react';
import { Users, CheckCircle2, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", 
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function JoinPage() {
  const { t, locale } = useTranslations();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [informationConfirmed, setInformationConfirmed] = useState(false);
  const [memberId, setMemberId] = useState('');
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    serialNo: '',
    name: '',
    age: '',
    dateOfBirth: '',
    fathersOrHusbandsName: '',
    address: '',
    state: '',
    district: '',
    pincode: '',
    mobileNo: '',
    email: '',
    voterIdCardNo: '',
    aadharNumber: '',
    pollingStation: '',
    constituency: '',
    date: '',
    membershipType: '',
  });

  useEffect(() => {
    const generateSerialNo = () => {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${timestamp}${random}`;
    };
    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    if (!formData.serialNo && formData.membershipType === 'Active Membership') {
      setFormData(prev => ({ ...prev, serialNo: generateSerialNo(), date: getTodayDate() }));
    }
  }, [formData.membershipType]);

  useEffect(() => {
    if (showConfirmation && confirmationRef.current) {
      confirmationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      confirmationRef.current.focus();
    }
  }, [showConfirmation]);

  const handleSelectMembership = (type: string) => {
    setFormData({ ...formData, membershipType: type });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.membershipType === 'Active Membership' || formData.membershipType === 'Normal Membership') {
      setShowPledgeModal(true);
      setPledgeAccepted(false);
      setInformationConfirmed(false);
    } else {
      submitMembership();
    }
  };

  const submitMembership = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      const data = await response.json();
      setMemberId(data.data.memberId);
      setShowConfirmation(true);
      setShowForm(false);
      setShowPledgeModal(false);

      setFormData({
        serialNo: '',
        name: '',
        age: '',
        dateOfBirth: '',
        fathersOrHusbandsName: '',
        address: '',
        state: '',
        district: '',
        pincode: '',
        mobileNo: '',
        email: '',
        voterIdCardNo: '',
        aadharNumber: '',
        pollingStation: '',
        constituency: '',
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

  const copyMemberId = () => {
    navigator.clipboard.writeText(memberId);
    toast.success(locale === 'hi' ? 'सदस्य ID कॉपी किया गया!' : 'Member ID copied!');
  };

  const resetToSelection = () => {
    setShowConfirmation(false);
    setMemberId('');
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
          {showConfirmation ? (
            <div className="max-w-2xl mx-auto" ref={confirmationRef} tabIndex={-1}>
              <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {locale === 'hi'
                      ? 'बहुजन क्रांति पार्टी में स्वागत है!'
                      : 'Welcome to Bahujan Kranti Party!'}
                  </h2>
                  <p className="text-lg text-gray-700 mb-8">
                    {locale === 'hi'
                      ? 'आपने सफलतापूर्वक बहुजन क्रांति पार्टी की सदस्यता के लिए पंजीकृत किया गया है।'
                      : 'You have successfully registered for Bahujan Kranti Party membership.'}
                  </p>

                  <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 mb-8">
                    <CardContent className="pt-6 pb-6">
                      <p className="text-center text-yellow-900 font-bold mb-4">
                        {locale === 'hi'
                          ? '⚠️ कृपया आपना सदस्य ID नोट कर लें ⚠️'
                          : '⚠️ Please Note Down Your Member ID ⚠️'}
                      </p>
                      <p className="text-gray-600 mb-3">
                        {locale === 'hi' ? 'आपका सदस्य ID:' : 'Your Member ID:'}
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <p className="text-3xl font-bold text-blue-600 tracking-widest border-2 border-blue-600 px-4 py-2 rounded">
                          {memberId}
                        </p>
                        <button
                          onClick={copyMemberId}
                          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                          title={locale === 'hi' ? 'कॉपी करें' : 'Copy'}
                        >
                          <Copy className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <p className="text-sm text-blue-900 font-semibold mb-2">
                      {locale === 'hi' ? '⭐ महत्वपूर्ण:' : '⭐ Important:'}
                    </p>
                    <p className="text-sm text-blue-800">
                      {locale === 'hi'
                        ? 'कृपया अपने सदस्य ID को अपने नोटबुक में, मोबाइल में, या किसी सुरक्षित स्थान पर नोट कर लें। यह भविष्य के सभी संदर्भों के लिए आवश्यक होगा।'
                        : 'Please save your member ID in your notebook, mobile, or any safe place. You will need it for all future references.'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={resetToSelection}
                      className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                    >
                      {locale === 'hi' ? 'किसी और को आमंत्रित करें' : 'Invite Someone Else'}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.print()}
                    >
                      {locale === 'hi' ? 'यह पृष्ठ प्रिंट करें' : 'Print This Page'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : !showForm ? (
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
                {formData.membershipType === 'Active Membership' ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-center mb-2 text-red-600">
                          {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
                        </h2>
                        <p className="text-center text-sm text-gray-600 mb-6">
                          {locale === 'hi' ? '(मार्क्सवाद – अम्बेडकरवाद)' : '(Marxism - Ambedkarism)'}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {locale === 'hi' ? 'क्रमांक' : 'Serial No.'}
                            </label>
                            <Input type="text" readOnly value={formData.serialNo} className="border-b border-t-0 border-l-0 border-r-0 bg-gray-100" />
                          </div>
                          <div></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'नाम' : 'Name'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {locale === 'hi' ? 'आयु' : 'Age'} *
                            </label>
                            <Input
                              type="number"
                              required
                              min="1"
                              max="120"
                              value={formData.age}
                              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                              className="border-b border-t-0 border-l-0 border-r-0"
                            />
                          </div>
                          <div></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'पिता/पति का नाम' : 'Father\'s/Husband\'s Name'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.fathersOrHusbandsName}
                            onChange={(e) => setFormData({ ...formData, fathersOrHusbandsName: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'पता' : 'Address'} *
                          </label>
                          <Textarea
                            required
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="border"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'राज्य' : 'State'} *
                          </label>
                          <select
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-white"
                          >
                            <option value="">{locale === 'hi' ? '- राज्य चुनें -' : '- Select State -'}</option>
                            {INDIAN_STATES.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {locale === 'hi' ? 'पिन कोड' : 'PIN Code'} *
                            </label>
                            <Input
                              type="text"
                              required
                              maxLength={6}
                              pattern="[0-9]{6}"
                              value={formData.pincode}
                              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                              className="border-b border-t-0 border-l-0 border-r-0"
                            />
                          </div>
                          <div></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'मो नं' : 'Mobile No.'} *
                          </label>
                          <Input
                            type="tel"
                            required
                            value={formData.mobileNo}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9+]/g, '');
                              if (value.startsWith('+91')) {
                                const digits = value.slice(3);
                                if (digits.length <= 10) {
                                  setFormData({ ...formData, mobileNo: value });
                                }
                              } else {
                                const digits = value.replace(/\D/g, '');
                                if (digits.length <= 10) {
                                  setFormData({ ...formData, mobileNo: value });
                                }
                              }
                            }}
                            className="border-b border-t-0 border-l-0 border-r-0"
                            placeholder="+91 XXXXXXXXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'Email Id' : 'Email ID'}
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                            placeholder="email@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'पहचान हेतु आधार नं / मतदाता पहचान नं' : 'Aadhar No. / Voter ID No.'}
                          </label>
                          <Input
                            type="text"
                            value={formData.aadharNumber || formData.voterIdCardNo}
                            onChange={(e) => setFormData({ ...formData, voterIdCardNo: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {locale === 'hi' ? 'दिनांक' : 'Date'} *
                            </label>
                            <Input
                              type="date"
                              required
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                              className="border-b border-t-0 border-l-0 border-r-0"
                            />
                          </div>
                          <div></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'पोलिंग स्टेशन का नाम' : 'Polling Station Name'}
                          </label>
                          <Input
                            type="text"
                            value={formData.pollingStation}
                            onChange={(e) => setFormData({ ...formData, pollingStation: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'विधानसभा निर्वाचन क्षेत्र' : 'Assembly Constituency'}
                          </label>
                          <Input
                            type="text"
                            value={formData.constituency}
                            onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 mt-8"
                          disabled={loading}
                        >
                          {loading ? (locale === 'hi' ? 'जमा किया जा रहा है...' : 'Submitting...') : (locale === 'hi' ? 'आवेदन जमा करें' : 'Submit Application')}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-center mb-2 text-blue-600">
                          {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
                        </h2>
                        <p className="text-center text-sm text-gray-600 mb-6">
                          {locale === 'hi' ? '(मार्क्सवाद – अम्बेडकरवाद)' : '(Marxism - Ambedkarism)'}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'नाम' : 'Name'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {locale === 'hi' ? 'जन्म तिथि' : 'Date of Birth'} *
                            </label>
                            <Input
                              type="date"
                              required
                              value={formData.dateOfBirth}
                              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                              className="border-b border-t-0 border-l-0 border-r-0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {locale === 'hi' ? 'आयु' : 'Age'} *
                            </label>
                            <Input
                              type="number"
                              required
                              min="1"
                              max="120"
                              value={formData.age}
                              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                              className="border-b border-t-0 border-l-0 border-r-0"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'पिता/पति का नाम' : 'Father\'s/Husband\'s Name'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.fathersOrHusbandsName}
                            onChange={(e) => setFormData({ ...formData, fathersOrHusbandsName: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'पता' : 'Address'} *
                          </label>
                          <Textarea
                            required
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="border"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'राज्य' : 'State'} *
                          </label>
                          <select
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                          >
                            <option value="">{locale === 'hi' ? '- राज्य चुनें -' : '- Select State -'}</option>
                            {INDIAN_STATES.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'जिला/शहर' : 'District/City'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'पिन कोड' : 'PIN Code'} *
                          </label>
                          <Input
                            type="text"
                            required
                            maxLength={6}
                            pattern="[0-9]{6}"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'ईमेल' : 'Email'}
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'मो नं' : 'Mobile No.'} *
                          </label>
                          <Input
                            type="tel"
                            required
                            value={formData.mobileNo}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9+]/g, '');
                              if (value.startsWith('+91')) {
                                const digits = value.slice(3);
                                if (digits.length <= 10) {
                                  setFormData({ ...formData, mobileNo: value });
                                }
                              } else {
                                const digits = value.replace(/\D/g, '');
                                if (digits.length <= 10) {
                                  setFormData({ ...formData, mobileNo: value });
                                }
                              }
                            }}
                            className="border-b border-t-0 border-l-0 border-r-0"
                            placeholder="+91 XXXXXXXXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'पोलिंग स्टेशन का नाम' : 'Polling Station Name'}
                          </label>
                          <Input
                            type="text"
                            value={formData.pollingStation}
                            onChange={(e) => setFormData({ ...formData, pollingStation: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {locale === 'hi' ? 'विधानसभा निर्वाचन क्षेत्र' : 'Assembly Constituency'}
                          </label>
                          <Input
                            type="text"
                            value={formData.constituency}
                            onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                            className="border-b border-t-0 border-l-0 border-r-0"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {locale === 'hi' ? 'दिनांक' : 'Date'} *
                            </label>
                            <Input
                              type="date"
                              required
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                              className="border-b border-t-0 border-l-0 border-r-0"
                            />
                          </div>
                          <div></div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 mt-8"
                          disabled={loading}
                        >
                          {loading ? (locale === 'hi' ? 'जमा किया जा रहा है...' : 'Submitting...') : (locale === 'hi' ? 'आवेदन जमा करें' : 'Submit Application')}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {showPledgeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
                {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg mb-8 text-sm leading-relaxed space-y-4 max-h-80 overflow-y-auto">
                {formData.membershipType === 'Normal Membership' ? (
                  locale === 'hi' ? (
                    <>
                      <p className="text-gray-700 font-semibold">
                        घोषणापत्र (शपथ) - सदस्यता प्रपत्र
                      </p>
                      <p className="text-gray-700">
                        मैं बहुजन क्रांति पार्टी के लक्ष्यों तथा उद्देश्यों को स्वीकार करता/करती हूँ और उसके संविधान का पालन करने तथा पार्टी के फैसलों को वफादारी से मानने की शपथ लेता/लेती हूँ।
                      </p>
                      <p className="text-gray-700">
                        मैं समाजवाद के आदर्शों पर चलने की चेष्टा करूँगा/करूँगी और इस पार्टी तथा शोषित जनता के हितों को अपने निजी हितों से ऊपर रखूँगा/रखूँगी।
                      </p>
                      <p className="text-gray-700">
                        मैं मजदूर वर्ग, मेहनतकश जनता तथा सर्वहारा वर्ग की आजीवन सेवा करूँगा/करूँगी।
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700 font-semibold">
                        Declaration (Pledge) - Membership Form
                      </p>
                      <p className="text-gray-700">
                        I accept the goals and objectives of Bahujan Kranti Party and pledge to follow its constitution and loyally uphold the party&apos;s decisions.
                      </p>
                      <p className="text-gray-700">
                        I will strive to follow the ideals of socialism and place the interests of this party and the exploited masses above my personal interests.
                      </p>
                      <p className="text-gray-700">
                        I will dedicate my life to the service of the working class, the laboring masses, and the proletariat.
                      </p>
                    </>
                  )
                ) : locale === 'hi' ? (
                  <>
                    <p className="text-gray-700 font-semibold">
                      {locale === 'hi' ? 'घोषणापत्र (Pledge)' : 'Declaration (Pledge)'}
                    </p>
                    <p className="text-gray-700">
                      मैं कर्तव्य निष्ठा से प्रमाणित करता/करती हूँ कि मेरा सामाजिक, समतावादी, जातिवाद, छुआ-छूत, क्षेत्रवाद, ऊँच-नीच के विरुद्ध मानव/मानवीय एवं मानव समाज की समानता, स्वतंत्रता, भाईचारे में पूर्ण आस्था रखता/रखती हूँ।
                    </p>
                    <p className="text-gray-700">
                      मैं भारत में सामाजिक, आर्थिक, राजनीतिक शोषण, उत्पीड़न का मुख्य कारण रहा है।
                    </p>
                    <p className="text-gray-700">
                      उत्पीड़न-शोषणवादी, राजनीतिक व्यवस्था को समाप्त करने के लिए समतावादी व्यवस्था लाने के लिए तन, मन, धन से प्रयास करूँगा/करूँगी।
                    </p>
                    <p className="text-gray-700">
                      यह भी वचन देता/देती हूँ कि भारत के किसी भी न्यायालय में किसी भी अपराध या अवमानना करने के लिए न तो आरोपी ठहराया गया है, न ही कोई मुझे सजा दी गई है और न ही मुझे किसी न्यायालय द्वारा अपराधी घोषित किया गया है।
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700 font-semibold">
                      Declaration (Pledge)
                    </p>
                    <p className="text-gray-700">
                      I solemnly affirm that I have complete faith in social equality, equality and brotherhood of human society, against casteism, untouchability, regionalism, and discrimination.
                    </p>
                    <p className="text-gray-700">
                      I understand that social, economic, and political exploitation and oppression are the main causes of suffering in India.
                    </p>
                    <p className="text-gray-700">
                      I commit to strive with body, mind, and resources to end this oppressive system and establish an egalitarian order.
                    </p>
                    <p className="text-gray-700">
                      I declare that I have not been charged with or convicted of any crime or contempt of court in any court in India.
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="pledgeAccepted"
                    checked={pledgeAccepted}
                    onChange={(e) => setPledgeAccepted(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="pledgeAccepted" className="text-sm text-gray-700">
                    {locale === 'hi'
                      ? 'मैं ने ऊपर दिए गए घोषणापत्र को पढ़ा और इससे सहमत हूँ'
                      : 'I have read and accept the pledge mentioned above'}
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="informationConfirmed"
                    checked={informationConfirmed}
                    onChange={(e) => setInformationConfirmed(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="informationConfirmed" className="text-sm text-gray-700">
                    {locale === 'hi'
                      ? 'मैं प्रमाणित करता/करती हूँ कि मेरा दर्ज सभी सूचना सत्य है'
                      : 'I confirm that all information entered by me is true'}
                  </label>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowPledgeModal(false)}
                  disabled={loading}
                >
                  {locale === 'hi' ? 'रद्द करें' : 'Cancel'}
                </Button>
                <Button
                  onClick={submitMembership}
                  disabled={!pledgeAccepted || !informationConfirmed || loading}
                  className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                >
                  {loading ? (locale === 'hi' ? 'जमा किया जा रहा है...' : 'Submitting...') : (locale === 'hi' ? 'जमा करें' : 'Submit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
