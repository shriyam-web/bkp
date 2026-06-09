'use client';

import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Copy, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import PageIntro from '@/components/PageIntro';
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
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
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
    <div className="min-h-screen bg-background">
      <Toaster />
      <Header />

      <PageIntro
        title={locale === 'hi' ? 'हमारे आंदोलन में शामिल हों' : 'Join Our Movement'}
        subtitle={locale === 'hi' ? 'सदस्यता' : 'Membership'}
        description={locale === 'hi'
          ? 'एक सदस्य बनें और सभी के लिए एक बेहतर भारत बनाने में हमारी मदद करें। सदस्यता निःशुल्क है।'
          : 'Become a member and help us build a better India for all. Membership is free.'}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {showConfirmation ? (
            <div className="max-w-xl mx-auto" ref={confirmationRef} tabIndex={-1}>
              <div className="border border-border rounded-md overflow-hidden bg-card">
                <div className="h-1 bg-green-600" />
                <div className="p-8 sm:p-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-5" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {locale === 'hi' ? 'स्वागत है!' : 'Welcome!'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    {locale === 'hi'
                      ? 'आपने सफलतापूर्वक बहुजन क्रांति पार्टी की सदस्यता के लिए पंजीकृत किया है।'
                      : 'You have successfully registered for Bahujan Kranti Party membership.'}
                  </p>

                  <div className="border border-border rounded-md p-6 bg-muted/30 mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-3">
                      {locale === 'hi' ? 'आपका सदस्य ID — सुरक्षित रखें' : 'Your Member ID — Save This'}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-wider font-mono">
                        {memberId}
                      </p>
                      <button
                        onClick={copyMemberId}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        title={locale === 'hi' ? 'कॉपी करें' : 'Copy'}
                      >
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-8 text-left border-l-2 border-[#FACC15] pl-3">
                    {locale === 'hi'
                      ? 'इस ID को नोटबुक या मोबाइल में सुरक्षित रखें — भविष्य के सभी संदर्भों के लिए आवश्यक है।'
                      : 'Save this ID somewhere safe — you will need it for all future references.'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={resetToSelection} className="flex-1 bg-red-600 hover:bg-red-700">
                      {locale === 'hi' ? 'किसी और को आमंत्रित करें' : 'Invite Someone Else'}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                      {locale === 'hi' ? 'प्रिंट करें' : 'Print'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : !showForm ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-1">
                  {locale === 'hi' ? 'चरण 1 / 2' : 'Step 1 of 2'}
                </p>
                <h2 className="text-xl font-bold text-foreground">{t('join.selectMembershipTitle')}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t('join.selectMembershipSubtitle')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSelectMembership('Normal Membership')}
                  className="group text-left border border-border rounded-md p-6 bg-card hover:border-red-600/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {locale === 'hi' ? 'सामान्य' : 'Standard'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-red-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('join.normalMembershipLabel')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('join.normalMembershipDesc')}</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectMembership('Active Membership')}
                  className="group text-left border-2 border-red-600/30 rounded-md p-6 bg-card hover:border-red-600 hover:bg-muted/30 transition-colors relative"
                >
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold uppercase text-red-600">
                    <Sparkles className="h-3 w-3" />
                    {locale === 'hi' ? 'अनुशंसित' : 'Recommended'}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
                      {locale === 'hi' ? 'सक्रिय' : 'Active'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-red-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('join.activeMembershipLabel')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('join.activeMembershipDesc')}</p>
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                {locale === 'hi' ? 'कोई सदस्यता शुल्क नहीं · सभी के लिए खुला' : 'No membership fees · Open to all'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">
                  {locale === 'hi' ? 'चरण 2 / 2' : 'Step 2 of 2'}
                </p>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {locale === 'hi' ? 'हमसे क्यों जुड़ें?' : 'Why Join Us?'}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {locale === 'hi'
                    ? 'बहुजन क्रांति पार्टी से जुड़कर, आप सकारात्मक परिवर्तन लाने के लिए समर्पित एक आंदोलन का हिस्सा बनते हैं।'
                    : 'By joining Bahujan Kranti Party, you become part of a movement dedicated to creating positive change.'}
                </p>

                <ul className="space-y-3 mb-6">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm">
                      <span className="text-red-600 font-bold shrink-0">{index + 1}.</span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="border border-border rounded-md p-4 bg-muted/30 mb-6">
                  <p className="text-sm font-semibold text-foreground">
                    {locale === 'hi' ? 'सदस्यता निःशुल्क' : 'Membership is Free'}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {locale === 'hi'
                      ? 'कोई शुल्क नहीं — हर कोई भाग ले सकता है।'
                      : 'No fees — everyone can participate.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                  {locale === 'hi' ? 'सदस्यता प्रकार बदलें' : 'Change membership type'}
                </button>
              </div>

              <div className="lg:col-span-3">
                {formData.membershipType === 'Active Membership' ? (
                  <Card className="bg-card border border-border rounded-md overflow-hidden">
                    <div className="h-1 bg-red-600" />
                    <CardContent className="pt-6 pb-8">
                      <div className="mb-6 pb-4 border-b border-border">
                        <h2 className="text-lg font-bold text-foreground">
                          {locale === 'hi' ? 'सक्रिय सदस्यता आवेदन' : 'Active Membership Application'}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                          {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी · (मार्क्सवाद – अम्बेडकरवाद)' : 'Bahujan Kranti Party · (Marxism – Ambedkarism)'}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-foreground">
                              {locale === 'hi' ? 'क्रमांक' : 'Serial No.'}
                            </label>
                            <Input type="text" readOnly value={formData.serialNo} className="border-b border-t-0 border-l-0 border-r-0 bg-muted text-foreground" />
                          </div>
                          <div></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'नाम' : 'Name'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-foreground">
                              {locale === 'hi' ? 'आयु' : 'Age'} *
                            </label>
                            <Input
                              type="number"
                              required
                              min="1"
                              max="120"
                              value={formData.age}
                              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                              className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                            />
                          </div>
                          <div></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'पिता/पति का नाम' : 'Father\'s/Husband\'s Name'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.fathersOrHusbandsName}
                            onChange={(e) => setFormData({ ...formData, fathersOrHusbandsName: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'पता' : 'Address'} *
                          </label>
                          <Textarea
                            required
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="border-border bg-transparent text-foreground focus:ring-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'राज्य' : 'State'} *
                          </label>
                          <select
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-background text-foreground"
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
                            <label className="block text-sm font-medium mb-2 text-foreground">
                              {locale === 'hi' ? 'पिन कोड' : 'PIN Code'} *
                            </label>
                            <Input
                              type="text"
                              required
                              maxLength={6}
                              pattern="[0-9]{6}"
                              value={formData.pincode}
                              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                              className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                            />
                          </div>
                          <div></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
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
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                            placeholder="+91 XXXXXXXXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'Email Id' : 'Email ID'}
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                            placeholder="email@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'पहचान हेतु आधार नं / मतदाता पहचान नं' : 'Aadhar No. / Voter ID No.'}
                          </label>
                          <Input
                            type="text"
                            value={formData.aadharNumber || formData.voterIdCardNo}
                            onChange={(e) => setFormData({ ...formData, voterIdCardNo: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-foreground">
                              {locale === 'hi' ? 'दिनांक' : 'Date'} *
                            </label>
                            <Input
                              type="date"
                              required
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                              className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                            />
                          </div>
                          <div></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'पोलिंग स्टेशन का नाम' : 'Polling Station Name'}
                          </label>
                          <Input
                            type="text"
                            value={formData.pollingStation}
                            onChange={(e) => setFormData({ ...formData, pollingStation: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'विधानसभा निर्वाचन क्षेत्र' : 'Assembly Constituency'}
                          </label>
                          <Input
                            type="text"
                            value={formData.constituency}
                            onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-red-600 hover:bg-red-700 mt-8"
                          disabled={loading}
                        >
                          {loading ? (locale === 'hi' ? 'जमा किया जा रहा है...' : 'Submitting...') : (locale === 'hi' ? 'आवेदन जमा करें' : 'Submit Application')}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-card border border-border rounded-md overflow-hidden">
                    <div className="h-1 bg-red-600" />
                    <CardContent className="pt-6 pb-8">
                      <div className="mb-6 pb-4 border-b border-border">
                        <h2 className="text-lg font-bold text-foreground">
                          {locale === 'hi' ? 'सामान्य सदस्यता आवेदन' : 'Normal Membership Application'}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                          {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी · (मार्क्सवाद – अम्बेडकरवाद)' : 'Bahujan Kranti Party · (Marxism – Ambedkarism)'}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'नाम' : 'Name'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-red-500 rounded-none px-0"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-foreground">
                              {locale === 'hi' ? 'जन्म तिथि' : 'Date of Birth'} *
                            </label>
                            <Input
                              type="date"
                              required
                              value={formData.dateOfBirth}
                              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                              className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-foreground">
                              {locale === 'hi' ? 'आयु' : 'Age'} *
                            </label>
                            <Input
                              type="number"
                              required
                              min="1"
                              max="120"
                              value={formData.age}
                              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                              className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'पिता/पति का नाम' : 'Father\'s/Husband\'s Name'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.fathersOrHusbandsName}
                            onChange={(e) => setFormData({ ...formData, fathersOrHusbandsName: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'पता' : 'Address'} *
                          </label>
                          <Textarea
                            required
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="border-border bg-transparent text-foreground focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'राज्य' : 'State'} *
                          </label>
                          <select
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground"
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
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'जिला/शहर' : 'District/City'} *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'पिन कोड' : 'PIN Code'} *
                          </label>
                          <Input
                            type="text"
                            required
                            maxLength={6}
                            pattern="[0-9]{6}"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'ईमेल' : 'Email'}
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
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
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                            placeholder="+91 XXXXXXXXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'पोलिंग स्टेशन का नाम' : 'Polling Station Name'}
                          </label>
                          <Input
                            type="text"
                            value={formData.pollingStation}
                            onChange={(e) => setFormData({ ...formData, pollingStation: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            {locale === 'hi' ? 'विधानसभा निर्वाचन क्षेत्र' : 'Assembly Constituency'}
                          </label>
                          <Input
                            type="text"
                            value={formData.constituency}
                            onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                            className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-foreground">
                              {locale === 'hi' ? 'दिनांक' : 'Date'} *
                            </label>
                            <Input
                              type="date"
                              required
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                              className="border-b border-border border-t-0 border-l-0 border-r-0 bg-transparent text-foreground focus:ring-0 focus:border-blue-500 rounded-none px-0"
                            />
                          </div>
                          <div></div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-red-600 hover:bg-red-700 mt-8"
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
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-card border border-border rounded-md">
            <div className="h-1 bg-red-600" />
            <CardContent className="pt-6 pb-6">
              <h2 className="text-lg font-bold text-foreground mb-1">
                {locale === 'hi' ? 'घोषणापत्र (शपथ)' : 'Declaration (Pledge)'}
              </h2>
              <p className="text-xs text-muted-foreground mb-5">
                {locale === 'hi' ? 'जमा करने से पहले कृपया पढ़ें और स्वीकार करें' : 'Please read and accept before submitting'}
              </p>

              <div className="bg-[#0f172a] p-5 rounded-md mb-6 text-sm leading-relaxed space-y-3 max-h-64 overflow-y-auto">
                {formData.membershipType === 'Normal Membership' ? (
                  locale === 'hi' ? (
                    <>
                      <p className="text-[#FACC15] font-semibold text-xs uppercase tracking-wide">सदस्यता प्रपत्र</p>
                      <p className="text-slate-300">मैं बहुजन क्रांति पार्टी के लक्ष्यों तथा उद्देश्यों को स्वीकार करता/करती हूँ और उसके संविधान का पालन करने तथा पार्टी के फैसलों को वफादारी से मानने की शपथ लेता/लेती हूँ।</p>
                      <p className="text-slate-300">मैं समाजवाद के आदर्शों पर चलने की चेष्टा करूँगा/करूँगी और इस पार्टी तथा शोषित जनता के हितों को अपने निजी हितों से ऊपर रखूँगा/रखूँगी।</p>
                      <p className="text-slate-300">मैं मजदूर वर्ग, मेहनतकश जनता तथा सर्वहारा वर्ग की आजीवन सेवा करूँगा/करूँगी।</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[#FACC15] font-semibold text-xs uppercase tracking-wide">Membership Form</p>
                      <p className="text-slate-300">I accept the goals and objectives of Bahujan Kranti Party and pledge to follow its constitution and loyally uphold the party&apos;s decisions.</p>
                      <p className="text-slate-300">I will strive to follow the ideals of socialism and place the interests of this party and the exploited masses above my personal interests.</p>
                      <p className="text-slate-300">I will dedicate my life to the service of the working class, the laboring masses, and the proletariat.</p>
                    </>
                  )
                ) : locale === 'hi' ? (
                  <>
                    <p className="text-[#FACC15] font-semibold text-xs uppercase tracking-wide">घोषणापत्र</p>
                    <p className="text-slate-300">मैं कर्तव्य निष्ठा से प्रमाणित करता/करती हूँ कि मेरा सामाजिक, समतावादी, जातिवाद, छुआ-छूत, क्षेत्रवाद, ऊँच-नीच के विरुद्ध मानव समाज की समानता, स्वतंत्रता, भाईचारे में पूर्ण आस्था रखता/रखती हूँ।</p>
                    <p className="text-slate-300">मैं भारत में सामाजिक, आर्थिक, राजनीतिक शोषण, उत्पीड़न का मुख्य कारण रहा है।</p>
                    <p className="text-slate-300">उत्पीड़न-शोषणवादी राजनीतिक व्यवस्था को समाप्त करने के लिए समतावादी व्यवस्था लाने के लिए तन, मन, धन से प्रयास करूँगा/करूँगी।</p>
                    <p className="text-slate-300">यह भी वचन देता/देती हूँ कि भारत के किसी भी न्यायालय में किसी भी अपराध के लिए न तो आरोपी ठहराया गया है, न ही कोई मुझे सजा दी गई है।</p>
                  </>
                ) : (
                  <>
                    <p className="text-[#FACC15] font-semibold text-xs uppercase tracking-wide">Declaration</p>
                    <p className="text-slate-300">I solemnly affirm that I have complete faith in social equality and brotherhood of human society, against casteism, untouchability, regionalism, and discrimination.</p>
                    <p className="text-slate-300">I understand that social, economic, and political exploitation and oppression are the main causes of suffering in India.</p>
                    <p className="text-slate-300">I commit to strive with body, mind, and resources to end this oppressive system and establish an egalitarian order.</p>
                    <p className="text-slate-300">I declare that I have not been charged with or convicted of any crime or contempt of court in any court in India.</p>
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
                    className="mt-1 accent-red-600"
                  />
                  <label htmlFor="pledgeAccepted" className="text-sm text-foreground">
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
                    className="mt-1 accent-red-600"
                  />
                  <label htmlFor="informationConfirmed" className="text-sm text-foreground">
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
                  className="bg-red-600 hover:bg-red-700"
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
