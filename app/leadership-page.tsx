'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PremiumLoader } from '@/components/LeadershipLoader';
import { Briefcase, MapPin, ChevronLeft, ChevronRight, Star, Download, Share2, ChevronDown, Phone, Search, X } from 'lucide-react';
import { useTranslations } from '@/lib/TranslationContext';
import { generateIdentityCardBlob } from '@/lib/identity-card';
import PageIntro from '@/components/PageIntro';
import SectionHeading from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

interface CommitteeMember {
  _id: string;
  name: { en: string; hi: string };
  position: { en: string; hi: string };
  image: string | null;
  bio: { en: string; hi: string } | null;
  mobileNumber?: string;
  email?: string;
  state?: string;
  district?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  type: 'NATIONAL' | 'STATE' | 'RASHTRIYA_PARISHAD' | 'RASHTRIYA_KAARYASAMITI' | 'DISTRICT';
}

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

export default function LeadershipPage() {
  const { t, locale } = useTranslations();
  const [nationalCommittee, setNationalCommittee] = useState<CommitteeMember[]>([]);
  const [statePresidents, setStatePresidents] = useState<CommitteeMember[]>([]);
  const [rashtriyaParishad, setRashtriyaParishad] = useState<CommitteeMember[]>([]);
  const [rashtriyaKaaryasamiti, setRashtriyaKaaryasamiti] = useState<CommitteeMember[]>([]);
  const [stateCommitteeMembers, setStateCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [districtCommitteeMembers, setDistrictCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [allDistrictMembersForState, setAllDistrictMembersForState] = useState<CommitteeMember[]>([]);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState(false);
  
  const [isParishadExpanded, setIsParishadExpanded] = useState(false);
  const [isKaaryasamitiExpanded, setIsKaaryasamitiExpanded] = useState(false);
  const [isNationalExpanded, setIsNationalExpanded] = useState(true);
  const [isStateExpanded, setIsStateExpanded] = useState(false);
  
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'STATE' | 'DISTRICT' | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const [orderedStates, setOrderedStates] = useState<string[]>(INDIAN_STATES);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);
  const [urlMemberId, setUrlMemberId] = useState<string | null>(null);
  const stateLeadershipRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const memberId = params.get('memberId');
      console.log('Checking URL memberId:', memberId);
      console.log('Full URL:', window.location.href);
      console.log('Search string:', window.location.search);

      if (memberId) {
        setUrlMemberId(memberId);
      }
    };

    checkUrl();

    // Also listen for URL changes
    const handlePopState = () => {
      console.log('URL changed via popState');
      checkUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nationalRes, stateRes, districtRes, parishadRes, kaaryasamitiRes] = await Promise.all([
          fetch('/api/committee-members?type=NATIONAL'),
          fetch('/api/committee-members?type=STATE'),
          fetch('/api/committee-members?type=DISTRICT'),
          fetch('/api/committee-members?type=RASHTRIYA_PARISHAD'),
          fetch('/api/committee-members?type=RASHTRIYA_KAARYASAMITI')
        ]);

        if (!nationalRes.ok) throw new Error(`National fetch failed: ${nationalRes.status}`);
        if (!stateRes.ok) throw new Error(`State fetch failed: ${stateRes.status}`);
        if (!districtRes.ok) throw new Error(`District fetch failed: ${districtRes.status}`);
        if (!parishadRes.ok) throw new Error(`Parishad fetch failed: ${parishadRes.status}`);
        if (!kaaryasamitiRes.ok) throw new Error(`Kaaryasamiti fetch failed: ${kaaryasamitiRes.status}`);

        const nationalData = await nationalRes.json();
        const stateData = await stateRes.json();
        const districtData = await districtRes.json();
        const parishadData = await parishadRes.json();
        const kaaryasamitiData = await kaaryasamitiRes.json();

        // Determine which states have data
        const hasData = new Set<string>();
        stateData.forEach((m: any) => { if (m.state) hasData.add(m.state); });
        districtData.forEach((m: any) => { if (m.state) hasData.add(m.state); });

        // Sort states: states with data first, then alphabetically
        const sortedStates = [...INDIAN_STATES].sort((a, b) => {
          const aHas = hasData.has(a);
          const bHas = hasData.has(b);
          if (aHas && !bHas) return -1;
          if (!aHas && bHas) return 1;
          return a.localeCompare(b);
        });
        setOrderedStates(sortedStates);

        setNationalCommittee(Array.isArray(nationalData) ? nationalData : []);
        setStatePresidents(Array.isArray(stateData) ? stateData.filter((m: any) => !m.district) : []);
        setRashtriyaParishad(Array.isArray(parishadData) ? parishadData : []);
        setRashtriyaKaaryasamiti(Array.isArray(kaaryasamitiData) ? kaaryasamitiData : []);
      } catch (error) {
        console.error('Failed to fetch leadership data', error);
        setNationalCommittee([]);
        setStatePresidents([]);
        setRashtriyaParishad([]);
        setRashtriyaKaaryasamiti([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedState) return;

    const fetchStateCommittee = async () => {
      try {
        const res = await fetch(`/api/committee-members?type=STATE&state=${encodeURIComponent(selectedState)}`);
        if (res.ok) {
          const data = await res.json();
          setStateCommitteeMembers(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch state committee', error);
      }
    };

    fetchStateCommittee();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState || !selectedDistrict) return;

    const fetchDistrictCommittee = async () => {
      try {
        const res = await fetch(`/api/committee-members?type=DISTRICT&state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}`);
        if (res.ok) {
          const data = await res.json();
          setDistrictCommitteeMembers(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch district committee', error);
      }
    };

    fetchDistrictCommittee();
  }, [selectedState, selectedDistrict]);

  useEffect(() => {
    if (!selectedState || selectedLevel !== 'DISTRICT') {
      setAllDistrictMembersForState([]);
      return;
    }

    const fetchAllStateDistricts = async () => {
      setIsDistrictsLoading(true);
      try {
        const res = await fetch(`/api/committee-members?type=DISTRICT&state=${encodeURIComponent(selectedState)}`);
        if (res.ok) {
          const data = await res.json();
          setAllDistrictMembersForState(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch districts', error);
      } finally {
        setIsDistrictsLoading(false);
      }
    };

    fetchAllStateDistricts();
  }, [selectedState, selectedLevel]);

  useEffect(() => {
    if (selectedState && stateLeadershipRef.current) {
      stateLeadershipRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedState, selectedLevel, selectedDistrict]);

  useEffect(() => {
    if (!urlMemberId) return;

    // Handle president case immediately
    if (urlMemberId === 'president') {
      const presidentMember: CommitteeMember = {
        _id: 'president',
        name: { en: 'Mr. Ranjeet Singh', hi: 'श्री रंजीत सिंह' },
        position: { en: 'National President', hi: 'राष्ट्रीय अध्यक्ष' },
        image: '/president.jpg',
        bio: { en: 'Leading the Movement', hi: 'आंदोलन का नेतृत्व' },
        mobileNumber: '+91 7376264269',
        email: 'bahujankrantipartyma@gmail.com',
        state: 'Uttar Pradesh',
        address: {
          street: '141, Dhansua PO Central Jail Fatehgarh Farrukhabad',
          city: 'Farrukhabad',
          state: 'Uttar Pradesh',
          postalCode: '209602',
          country: 'India',
        },
        type: 'NATIONAL',
      };
      setSelectedMember(presidentMember);
      return;
    }

    // For regular members, wait for data to load
    if (loading) return;

    const allMembers = [
      ...nationalCommittee,
      ...statePresidents,
      ...stateCommitteeMembers,
      ...districtCommitteeMembers,
      ...allDistrictMembersForState,
      ...rashtriyaParishad,
      ...rashtriyaKaaryasamiti,
    ];
    const foundMember = allMembers.find((m) => m._id === urlMemberId);

    if (foundMember) {
      setSelectedMember(foundMember);
    }
  }, [
    urlMemberId,
    loading,
    nationalCommittee,
    statePresidents,
    stateCommitteeMembers,
    districtCommitteeMembers,
    allDistrictMembersForState,
    rashtriyaParishad,
    rashtriyaKaaryasamiti,
  ]);

  const getPositionText = (position: { en: string; hi: string } | string) => {
    if (typeof position === 'string') return position;
    return position[locale];
  };

  const getNameText = (name: { en: string; hi: string } | string): string => {
    if (typeof name === 'string') return name;
    return name[locale];
  };

  const getBioText = (bio: { en: string; hi: string } | string | null) => {
    if (!bio) return '';
    if (typeof bio === 'string') return bio;
    return bio[locale];
  };

  const handleCall = (phoneNumber: string | undefined) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const resolveFullMember = (member: CommitteeMember): CommitteeMember => {
    if (!member._id || member._id === 'president') return member;
    const allLoaded = [
      ...nationalCommittee,
      ...statePresidents,
      ...stateCommitteeMembers,
      ...districtCommitteeMembers,
      ...allDistrictMembersForState,
      ...rashtriyaParishad,
      ...rashtriyaKaaryasamiti,
    ];
    return allLoaded.find((m) => m._id === member._id) ?? member;
  };

  const generateIdentityCard = async (member: CommitteeMember) => {
    const blob = await generateIdentityCardBlob(resolveFullMember(member));
    if (!blob) return;

    const nameEn = typeof member.name === 'string' ? member.name : member.name.en;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nameEn.replace(/\s+/g, '-')}-identity-card.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareToWhatsApp = async (member: CommitteeMember) => {
    const name = getNameText(member.name);
    const position = getPositionText(member.position);
    const bio = getBioText(member.bio);
    const state = member.state ? `State: ${member.state}` : '';
    const profileUrl = `${window.location.origin}/${locale}/leadership?memberId=${member._id}`;

    const shareText = `Check out the profile of ${name}\n${position}\n${state}\n\n${bio}\n\nVisit: ${profileUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareWithCard = async (member: CommitteeMember) => {
    try {
      const blob = await generateIdentityCardBlob(resolveFullMember(member));
      if (!blob) {
        const name = getNameText(member.name);
        const position = getPositionText(member.position);
        const bio = getBioText(member.bio);
        const profileText = `${name}\n${position}\n\n${bio}`;

        if (navigator.share) {
          navigator.share({
            title: `${name} - ${position}`,
            text: profileText
          });
        } else {
          const shareText = `Check out the profile of ${name} - ${position}: ${profileText}`;
          const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.origin)}`;
          window.open(shareUrl, '_blank');
        }
        return;
      }

      const file = new File([blob], `${getNameText(member.name).replace(/\s+/g, '-')}-card.pdf`, { type: 'application/pdf' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${getNameText(member.name)} - Identity Card`,
          text: `Check out the profile of ${getNameText(member.name)} - ${getPositionText(member.position)}`,
          files: [file]
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const isHi = locale === 'hi';

  const MemberDetailModal = ({ member, onClose }: { member: CommitteeMember; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-card w-full sm:max-w-lg sm:rounded-lg border border-border overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="h-1 bg-red-600" />
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex gap-4 min-w-0">
              <div className="relative h-20 w-16 shrink-0 rounded overflow-hidden bg-muted border border-border">
                {member.image ? (
                  <Image src={member.image} alt={getNameText(member.name)} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 text-sm font-medium uppercase">
                    {getNameText(member.name).split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-foreground leading-tight">
                  {getNameText(member.name)}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {getPositionText(member.position)}
                </p>
                {member.state && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {member.state}
                  </p>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-foreground shrink-0">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              {isHi ? 'परिचय' : 'Biography'}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {getBioText(member.bio) || t('leadership.noBioAvailable', 'No bio available')}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            {member.mobileNumber && (
              <button
                onClick={() => handleCall(member.mobileNumber)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {isHi ? 'कॉल करें' : 'Call'}
              </button>
            )}
            <button
              onClick={() => generateIdentityCard(member)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              {isHi ? 'आईडी कार्ड' : 'ID Card'}
            </button>
            <button
              onClick={() => shareToWhatsApp(member)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              {isHi ? 'व्हाट्सऐप पर साझा करें' : 'Share on WhatsApp'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MemberCard = ({ member }: { member: CommitteeMember }) => (
    <article className="relative flex flex-col border border-border rounded-lg overflow-hidden bg-card hover:border-red-600/30 transition-colors min-w-[220px] sm:min-w-0 snap-center">
      <button type="button" onClick={() => setSelectedMember(member)} className="text-left">
        <div className="aspect-[3/4] relative bg-muted">
          {member.image ? (
            <Image src={member.image} alt={getNameText(member.name)} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-light text-muted-foreground/30 uppercase">
              {getNameText(member.name).split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
          )}
        </div>
        <div className="p-3.5">
          <h3 className="font-medium text-foreground text-sm leading-snug line-clamp-2">
            {getNameText(member.name)}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {getPositionText(member.position)}
          </p>
        </div>
      </button>
      <div className="px-3.5 pb-3.5 flex gap-1.5 mt-auto">
        <button
          onClick={() => generateIdentityCard(member)}
          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 text-xs border border-border rounded hover:bg-muted transition-colors"
        >
          <Download className="h-3 w-3" />
          {isHi ? 'कार्ड' : 'Card'}
        </button>
        <button
          onClick={() => setShareMenuOpen(shareMenuOpen === member._id ? null : member._id)}
          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 text-xs border border-border rounded hover:bg-muted transition-colors"
        >
          <Share2 className="h-3 w-3" />
          {isHi ? 'साझा' : 'Share'}
        </button>
      </div>
      {shareMenuOpen === member._id && (
        <div className="absolute bottom-14 left-3 right-3 bg-card border border-border rounded-md shadow-md py-1 z-10">
          <button
            onClick={() => { shareToWhatsApp(member); setShareMenuOpen(null); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            {isHi ? 'व्हाट्सऐप पर साझा करें' : 'Share on WhatsApp'}
          </button>
          <button
            onClick={() => { shareWithCard(member); setShareMenuOpen(null); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted transition-colors border-t border-border"
          >
            <Share2 className="h-3.5 w-3.5" />
            {isHi ? 'प्रोफ़ाइल साझा करें' : 'Share profile'}
          </button>
        </div>
      )}
    </article>
  );

  const availableDistricts = Array.from(new Set(allDistrictMembersForState.map(m => m.district).filter(Boolean))) as string[];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageIntro
        title={t('leadership.title', 'Leadership')}
        subtitle={isHi ? 'बहुजन क्रांति पार्टी' : 'Bahujan Kranti Party'}
        description={t(
          'leadership.description',
          'National, state, and district leaders committed to organization and public service.'
        )}
      />

      <section className="border-b border-border bg-muted/30 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <blockquote className="text-sm text-muted-foreground italic max-w-2xl leading-relaxed">
            {isHi
              ? '«सत्ता के लिए संघर्ष में सर्वहारा के पास संगठन के अलावा कोई दूसरा हथियार नहीं है।» — व्लादिमीर लेनिन'
              : '«In the struggle for power, the proletariat has no weapon other than organization.» — V. Lenin'}
          </blockquote>
        </div>
      </section>

      {loading ? (
        <div className="py-32">
          <PremiumLoader />
        </div>
      ) : (
        <>
          <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsNationalExpanded(!isNationalExpanded)}
            className="w-full flex items-center justify-between gap-4 py-4 border-b border-border text-left"
          >
            <SectionHeading
              title={t('leadership.nationalLeadership', 'National Leadership')}
              description={t('leadership.nationalDescription', 'Central governing body and national office bearers')}
            />
            <ChevronDown className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', isNationalExpanded && 'rotate-180')} />
          </button>

          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isNationalExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mb-12">
              {loading ? (
                <PremiumLoader />
              ) : nationalCommittee.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No national committee members found.
                </div>
              ) : (
                <div className="space-y-10 mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-border rounded-lg overflow-hidden bg-card">
                    <div className="lg:col-span-2 aspect-[4/5] lg:aspect-auto relative bg-muted min-h-[240px]">
                      <Image
                        src="/president.jpg"
                        alt={t('leadership.nationalPresident', 'National President')}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="lg:col-span-3 p-5 sm:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 mb-3">
                        <Star className="h-3 w-3 fill-red-600" />
                        {t('leadership.nationalPresident', 'National President')}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight">
                        {isHi ? 'श्री रंजीत सिंह' : 'Mr. Ranjeet Singh'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-5">
                        {t('leadership.leadingTheMovement', 'Leading the movement for social justice and equality through organization and public awareness.')}
                      </p>
                      <button
                        onClick={() => setSelectedMember({
                          _id: 'president',
                          name: { en: 'Mr. Ranjeet Singh', hi: 'श्री रंजीत सिंह' },
                          position: { en: 'National President', hi: 'राष्ट्रीय अध्यक्ष' },
                          image: '/president.jpg',
                          bio: { en: 'Leading the Movement', hi: 'आंदोलन का नेतृत्व' },
                          mobileNumber: '+91 7376264269',
                          email: 'bahujankrantipartyma@gmail.com',
                          state: 'Uttar Pradesh',
                          address: {
                            street: '141, Dhansua PO Central Jail Fatehgarh Farrukhabad',
                            city: 'Farrukhabad',
                            state: 'Uttar Pradesh',
                            postalCode: '209602',
                            country: 'India',
                          },
                          type: 'NATIONAL',
                        })}
                        className="self-start text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        {isHi ? 'पूरी प्रोफ़ाइल देखें →' : 'View full profile →'}
                      </button>
                    </div>
                  </div>

                  {nationalCommittee.length > 0 && (
                    <div className="pt-8 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-5">
                        {t('leadership.nationalCommittee', 'National Committee Members')}
                      </h4>
                      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {nationalCommittee.map((member) => (
                          <MemberCard key={member._id} member={member} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <button
                  onClick={() => setIsParishadExpanded(!isParishadExpanded)}
                  className="w-full flex items-center justify-between py-3 border-b border-border text-left"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {t('leadership.rashtriyaParishad', 'National Council (Rashtriya Parishad)')}
                  </h3>
                  <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', isParishadExpanded && 'rotate-180')} />
                </button>
                {isParishadExpanded && (
                  <div className="pt-4">
                    {rashtriyaParishad.length > 0 ? (
                      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 snap-x sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {rashtriyaParishad.map((member) => (
                          <MemberCard key={member._id} member={member} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-lg">
                        {isHi ? 'कोई सदस्य नहीं मिला' : 'No members found'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setIsKaaryasamitiExpanded(!isKaaryasamitiExpanded)}
                  className="w-full flex items-center justify-between py-3 border-b border-border text-left"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {t('leadership.rashtriyaKaaryasamiti', 'National Executive Committee')}
                  </h3>
                  <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', isKaaryasamitiExpanded && 'rotate-180')} />
                </button>
                {isKaaryasamitiExpanded && (
                  <div className="pt-4">
                    {rashtriyaKaaryasamiti.length > 0 ? (
                      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 snap-x sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {rashtriyaKaaryasamiti.map((member) => (
                          <MemberCard key={member._id} member={member} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-lg">
                        {isHi ? 'कोई सदस्य नहीं मिला' : 'No members found'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={stateLeadershipRef} className="py-10 sm:py-12 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsStateExpanded(!isStateExpanded)}
            className="w-full flex items-center justify-between gap-4 py-4 border-b border-border text-left"
          >
            <SectionHeading
              title={t('leadership.stateLeadership', 'State Leadership')}
              description={t('leadership.stateDescription', 'State and district committee members across India')}
            />
            <ChevronDown className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', isStateExpanded && 'rotate-180')} />
          </button>

          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isStateExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {!selectedState ? (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {orderedStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className="flex items-center justify-between gap-2 p-3 text-left bg-card border border-border rounded-md hover:border-red-600/30 transition-colors text-sm"
                  >
                    <span className="font-medium text-foreground line-clamp-2">{state}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-8 mt-6">
                <div className="flex items-center gap-3 py-3 border-b border-border">
                  <button
                    onClick={() => {
                      if (selectedLevel) {
                        setSelectedLevel(null);
                        setSelectedDistrict(null);
                      } else {
                        setSelectedState(null);
                      }
                    }}
                    className="p-2 border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedState}
                    </p>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                      {selectedLevel
                        ? selectedLevel === 'STATE'
                          ? isHi ? 'राज्य समिति' : 'State Committee'
                          : isHi ? 'जिला समिति' : 'District Committee'
                        : isHi ? 'स्तर चुनें' : 'Select level'}
                      {selectedDistrict ? ` · ${selectedDistrict}` : ''}
                    </h3>
                  </div>
                </div>

                {!selectedLevel ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                    <button
                      onClick={() => setSelectedLevel('STATE')}
                      className="flex items-center gap-3 p-4 border border-border rounded-lg bg-card hover:border-red-600/30 text-left transition-colors"
                    >
                      <Briefcase className="h-5 w-5 text-red-600 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{isHi ? 'राज्य समिति' : 'State Committee'}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{isHi ? 'राज्य स्तर के पदाधिकारी' : 'State-level office bearers'}</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedLevel('DISTRICT')}
                      className="flex items-center gap-3 p-4 border border-border rounded-lg bg-card hover:border-red-600/30 text-left transition-colors"
                    >
                      <MapPin className="h-5 w-5 text-red-600 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{isHi ? 'जिला समिति' : 'District Committee'}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{isHi ? 'जिला स्तर के पदाधिकारी' : 'District-level office bearers'}</p>
                      </div>
                    </button>
                  </div>
                ) : selectedLevel === 'STATE' ? (
                  <div>
                    <div className="flex overflow-x-auto pb-4 -mx-4 px-4 snap-x sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {stateCommitteeMembers.length > 0 ? (
                        stateCommitteeMembers.map((member) => (
                          <MemberCard key={member._id} member={member} />
                        ))
                      ) : (
                        <p className="col-span-full text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-lg">
                          {isHi ? 'इस राज्य समिति के लिए कोई सदस्य नहीं' : 'No members found for this state committee'}
                        </p>
                      )}
                    </div>
                    {stateCommitteeMembers.length > 0 && stateCommitteeMembers.length < 32 && (
                      <p className="mt-4 text-xs text-muted-foreground text-center">
                        {isHi ? `दिखा रहे हैं ${stateCommitteeMembers.length} / 32` : `Showing ${stateCommitteeMembers.length} of 32 positions`}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {!selectedDistrict ? (
                      <div className="border border-border rounded-lg p-5 bg-card">
                        <h4 className="text-sm font-semibold text-foreground mb-4">
                          {isHi ? `${selectedState} में जिला चुनें` : `Select district in ${selectedState}`}
                        </h4>
                        {isDistrictsLoading ? (
                          <PremiumLoader />
                        ) : availableDistricts.length > 0 ? (
                          <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                              {availableDistricts.map((dist) => (
                                <button
                                  key={dist}
                                  onClick={() => setSelectedDistrict(dist)}
                                  className="p-2.5 text-sm border border-border rounded-md hover:border-red-600/30 hover:bg-muted/50 transition-colors text-center"
                                >
                                  {dist}
                                </button>
                              ))}
                            </div>
                            <div className="relative mt-4">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <input
                                type="text"
                                placeholder={isHi ? 'अन्य जिला खोजें...' : 'Search other district...'}
                                className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-red-600"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setSelectedDistrict((e.target as HTMLInputElement).value);
                                  }
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-sm text-muted-foreground mb-4">
                              {isHi ? 'इस राज्य के लिए जिला डेटा उपलब्ध नहीं' : 'No district data for this state'}
                            </p>
                            <div className="relative max-w-sm mx-auto">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <input
                                type="text"
                                placeholder={isHi ? 'जिला का नाम दर्ज करें' : 'Enter district name'}
                                className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setSelectedDistrict((e.target as HTMLInputElement).value);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 snap-x sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {districtCommitteeMembers.length > 0 ? (
                            districtCommitteeMembers.map((member) => (
                              <MemberCard key={member._id} member={member} />
                            ))
                          ) : (
                            <p className="col-span-full text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-lg">
                              {isHi ? 'इस जिला समिति के लिए कोई सदस्य नहीं' : 'No members found for this district committee'}
                            </p>
                          )}
                        </div>
                        {districtCommitteeMembers.length > 0 && districtCommitteeMembers.length < 53 && (
                          <p className="mt-4 text-xs text-muted-foreground text-center">
                            {isHi ? `दिखा रहे हैं ${districtCommitteeMembers.length} / 53` : `Showing ${districtCommitteeMembers.length} of 53 positions`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )}

      <Footer />
      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
