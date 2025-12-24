'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Briefcase, MapPin, ChevronLeft, ChevronRight, Star, Award, Download, Eye, Share2, MessageCircle, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import { useTranslations } from '@/lib/TranslationContext';

interface CommitteeMember {
  _id: string;
  name: { en: string; hi: string };
  position: { en: string; hi: string };
  image: string | null;
  bio: { en: string; hi: string } | null;
  mobileNumber?: string;
  state?: string;
  district?: string;
  type: 'NATIONAL' | 'STATE' | 'RASHTRIYA_PARISHAD' | 'RASHTRIYA_KAARYASAMITI' | 'DISTRICT';
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", 
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
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
  const [isHovering, setIsHovering] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);
  const [urlMemberId, setUrlMemberId] = useState<string | null>(null);
  const [nationalIndex, setNationalIndex] = useState(0);
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
    if (isHovering || loading || nationalCommittee.length === 0) return;

    const interval = setInterval(() => {
      setNationalIndex((prev) => (prev + 1) % (nationalCommittee.length + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering, loading, nationalCommittee.length]);

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
        type: 'NATIONAL'
      };
      setSelectedMember(presidentMember);
      return;
    }

    // For regular members, wait for data to load
    if (loading) return;

    const allMembers = [...nationalCommittee, ...statePresidents, ...rashtriyaParishad, ...rashtriyaKaaryasamiti];
    const foundMember = allMembers.find((m) => m._id === urlMemberId);

    if (foundMember) {
      setSelectedMember(foundMember);
    }
  }, [urlMemberId, loading, nationalCommittee, statePresidents, rashtriyaParishad, rashtriyaKaaryasamiti]);

  const nextNationalCarousel = () => {
    if (nationalCommittee.length === 0) return;
    setNationalIndex((prev) => (prev + 1) % (nationalCommittee.length + 1));
  };

  const prevNationalCarousel = () => {
    if (nationalCommittee.length === 0) return;
    setNationalIndex((prev) => (prev - 1 + nationalCommittee.length + 1) % (nationalCommittee.length + 1));
  };

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

  const generateIdentityCardBlob = async (member: CommitteeMember): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      const width = 1000;
      const height = 600;
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#dc2626');
      gradient.addColorStop(1, '#2563eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, 60);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('MEMBER IDENTITY CARD', 40, 45);

      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(40, 80, 300, 350);
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 80, 300, 350);

      const drawPlaceholder = () => {
        ctx.fillStyle = '#9ca3af';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('No Image', 190, 250);
      };

      const drawCardContent = () => {
        const nameEn = typeof member.name === 'string' ? member.name : member.name.en;
        const nameHi = typeof member.name === 'string' ? member.name : member.name.hi;

        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(nameEn, 380, 110);

        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(nameHi, 380, 135);

        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('ORGANIZATION', 380, 160);

        ctx.fillStyle = '#1f2937';
        ctx.font = '12px Arial';
        ctx.fillText('Bahujan Kranti Party (Marxwaad-Ambedkarwaad)', 380, 180);

        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('POSITION', 380, 210);

        ctx.fillStyle = '#1f2937';
        ctx.font = '11px Arial';
        const positionEn = typeof member.position === 'string' ? member.position : member.position.en;
        const positionHi = typeof member.position === 'string' ? member.position : member.position.hi;
        ctx.fillText(positionEn, 380, 225);
        ctx.fillText(positionHi, 380, 240);

        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 11px Arial';
        ctx.fillText('ABOUT', 380, 260);

        ctx.fillStyle = '#1f2937';
        ctx.font = '10px Arial';
        const bioEn = typeof member.bio === 'string' ? member.bio : (member.bio?.en || '');
        const bioHi = typeof member.bio === 'string' ? member.bio : (member.bio?.hi || '');

        const maxWidth = 300;
        const lineHeight = 12;
        let bioY = 275;

        const wrapText = (text: string, x: number, y: number) => {
          if (!text) return y;
          const words = text.split(' ');
          let line = '';
          for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth) {
              if (line) {
                ctx.fillText(line, x, y);
                y += lineHeight;
              }
              line = words[i] + ' ';
            } else {
              line = testLine;
            }
          }
          if (line) {
            ctx.fillText(line, x, y);
            y += lineHeight;
          }
          return y;
        };

        bioY = wrapText(bioEn, 380, bioY);
        bioY += 5;
        bioY = wrapText(bioHi, 380, bioY);

        let bottomY = Math.max(bioY + 15, 320);

        if (member.mobileNumber) {
          ctx.fillStyle = '#2563eb';
          ctx.font = 'bold 11px Arial';
          ctx.fillText('PHONE', 380, bottomY);

          ctx.fillStyle = '#1f2937';
          ctx.font = '11px Arial';
          ctx.fillText(member.mobileNumber, 380, bottomY + 15);
          bottomY += 30;
        }

        if (member.state) {
          ctx.fillStyle = '#2563eb';
          ctx.font = 'bold 11px Arial';
          ctx.fillText('STATE', 380, bottomY);

          ctx.fillStyle = '#1f2937';
          ctx.font = '11px Arial';
          ctx.fillText(member.state, 380, bottomY + 15);
        }

        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(0, 470, width, 2);

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`Generated on: ${new Date().toLocaleDateString()}`, width - 40, 540);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };

      if (member.image) {
        const img = document.createElement('img');
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.drawImage(img, 40, 80, 300, 350);
          drawCardContent();
        };
        img.onerror = () => {
          drawPlaceholder();
          drawCardContent();
        };
        img.src = member.image;
      } else {
        drawPlaceholder();
        drawCardContent();
      }
    });
  };

  const generateIdentityCard = async (member: CommitteeMember) => {
    const blob = await generateIdentityCardBlob(member);
    if (!blob) return;

    const nameEn = typeof member.name === 'string' ? member.name : member.name.en;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nameEn.replace(/\s+/g, '-')}-identity-card.png`;
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
      const blob = await generateIdentityCardBlob(member);
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

      const file = new File([blob], `${getNameText(member.name).replace(/\s+/g, '-')}-card.png`, { type: 'image/png' });

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

  const MemberDetailModal = ({ member, onClose }: { member: CommitteeMember; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-blue-600 p-6 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">{getNameText(member.name)}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1">
              <div className="h-64 w-full bg-gradient-to-br from-red-100 to-blue-100 rounded-xl overflow-hidden relative flex items-center justify-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={getNameText(member.name)}
                    fill
                    quality={90}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {getNameText(member.name)
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <p className="text-gray-500 text-sm">{t('leadership.imageComingSoon', 'Image coming soon')}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {getNameText(member.name)}
                </h3>
                <div className="inline-block">
                  <p className="bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold text-base px-4 py-2 rounded-full">
                    {getPositionText(member.position)}
                  </p>
                </div>
              </div>
              {member.state && (
                <p className="text-gray-600 flex items-center gap-2 mb-4 text-lg">
                  <MapPin className="h-5 w-5" />
                  <span className="font-semibold">{member.state}</span>
                </p>
              )}
              {member.mobileNumber && (
                <p className="text-gray-600 flex items-center gap-2 mb-4 text-lg">
                  <span className="font-semibold">📞 {member.mobileNumber}</span>
                </p>
              )}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{t('leadership.about', 'About')}</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {getBioText(member.bio) || t('leadership.noBioAvailable', 'No bio available')}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap pt-4 border-t border-gray-200">
            {member.mobileNumber && (
              <button
                onClick={() => handleCall(member.mobileNumber)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <span>📞</span>
                Call
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {t('leadership.close', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MemberCard = ({ member }: { member: CommitteeMember }) => (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="h-64 bg-gradient-to-br from-red-100 to-blue-100 relative overflow-hidden flex-shrink-0">
        {member.image ? (
          <Image
            src={member.image}
            alt={getNameText(member.name)}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
              {getNameText(member.name)
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 text-center flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-1">
          {getNameText(member.name)}
        </h3>
        <p className="text-blue-600 font-semibold text-xs uppercase tracking-wider mb-4 line-clamp-1">
          {getPositionText(member.position)}
        </p>
        
        <div className="mt-auto grid grid-cols-2 gap-2">
          {member.mobileNumber && (
            <button
              onClick={() => handleCall(member.mobileNumber)}
              className="col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-xs shadow-sm"
            >
              <Phone className="h-4 w-4" />
              {t('leadership.call', 'Call')}
            </button>
          )}
          
          <div className="relative">
            <button
              onClick={() => setShareMenuOpen(shareMenuOpen === member._id ? null : member._id)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs shadow-sm"
            >
              <Share2 className="h-3.5 w-3.5" />
              {t('leadership.share', 'Share')}
            </button>
            {shareMenuOpen === member._id && (
              <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                <button
                  onClick={() => {
                    shareToWhatsApp(member);
                    setShareMenuOpen(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                >
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  WhatsApp
                </button>
                <button
                  onClick={() => {
                    shareWithCard(member);
                    setShareMenuOpen(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4 text-purple-600" />
                  Share Card
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => generateIdentityCard(member)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            {t('leadership.download', 'Download')}
          </button>

          <button
            onClick={() => setSelectedMember(member)}
            className="col-span-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs shadow-sm"
          >
            <Eye className="h-3.5 w-3.5" />
            {t('leadership.viewDetails', 'Details')}
          </button>
        </div>
      </div>
    </div>
  );

  const availableDistricts = Array.from(new Set(allDistrictMembersForState.map(m => m.district).filter(Boolean))) as string[];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-red-900 to-blue-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 inline-block">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/80 text-sm font-medium">
              <Star className="h-4 w-4 text-yellow-400" />
              {t('leadership.meetOurLeaders', 'Meet Our Leaders')}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {t('leadership.title', 'Visionary Leadership')}<br />
            <span className="bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
              {t('leadership.subtitle', 'for a Better India')}
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-0 leading-relaxed">
            {t('leadership.description', 'Dedicated individuals united in their mission to create positive change and empower every citizen')}
          </p>
        </div>
      </section>

      {/* National Leadership Accordion */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsNationalExpanded(!isNationalExpanded)}
            className="w-full flex items-center justify-between group py-4"
          >
            <div className="text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                {t('leadership.nationalLeadership', 'National Leadership')}
              </h2>
              <div className="h-1.5 w-32 bg-gradient-to-r from-red-600 to-blue-600 rounded-full transition-all duration-300 group-hover:w-40"></div>
            </div>
            <div className="bg-gray-50 p-4 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-100">
              {isNationalExpanded ? (
                <ChevronUp className="h-8 w-8 text-red-600" />
              ) : (
                <ChevronDown className="h-8 w-8 text-blue-600" />
              )}
            </div>
          </button>

          <div className={`transition-all duration-500 overflow-hidden ${isNationalExpanded ? 'max-h-[10000px] mt-12 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mb-16">
              {loading ? (
                <div className="text-center py-12">Loading...</div>
              ) : nationalCommittee.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No national committee members found.
                </div>
              ) : (
                <div className="relative w-full" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                      <div className="lg:col-span-3 h-56 sm:h-80 lg:h-auto overflow-hidden bg-gradient-to-br from-red-100 to-blue-100 relative flex items-center justify-center">
                        {nationalIndex === 0 ? (
                          <Image
                            src="/president.jpg"
                            alt={t('leadership.nationalPresident', 'National President')}
                            fill
                            quality={90}
                            priority
                            className="object-contain"
                          />
                        ) : (nationalCommittee[nationalIndex - 1]?.image ? (
                          <Image
                            src={nationalCommittee[nationalIndex - 1].image as string}
                            alt={getNameText(nationalCommittee[nationalIndex - 1].name)}
                            fill
                            quality={90}
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent mb-2">
                                {nationalIndex === 0 ? 'NP' : getNameText(nationalCommittee[nationalIndex - 1].name)
                                  .split(' ')
                                  .map((word) => word[0])
                                  .join('')
                                  .toUpperCase()
                                  .slice(0, 2)}
                              </div>
                              <p className="text-gray-500 font-medium text-xs sm:text-sm">{t('leadership.imageComingSoon', 'Image coming soon')}</p>
                            </div>
                          </div>
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="lg:col-span-2 flex flex-col justify-between p-4 sm:p-6 lg:p-8 min-h-56 sm:min-h-80 lg:min-h-0 bg-gradient-to-b from-white to-gray-50">
                        <div>
                          <div className="mb-3 sm:mb-4">
                            <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-2">
                              {nationalIndex === 0 ? (locale === 'hi' ? 'श्री रंजीत सिंह' : 'Mr. Ranjeet Singh') : (nationalCommittee[nationalIndex - 1] ? getNameText(nationalCommittee[nationalIndex - 1].name) : '')}
                            </h3>
                            <div className="inline-block">
                              <p className="bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold text-xs sm:text-sm lg:text-base px-3 py-1.5 rounded-full">
                                {nationalIndex === 0 ? t('leadership.nationalPresident', 'National President') : (nationalCommittee[nationalIndex - 1] ? getPositionText(nationalCommittee[nationalIndex - 1].position) : '')}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-xs sm:text-sm mb-3 overflow-y-auto max-h-12 sm:max-h-16 lg:max-h-20">
                            {nationalIndex === 0 ? t('leadership.leadingTheMovement', 'Leading the Movement') : (nationalCommittee[nationalIndex - 1] ? getBioText(nationalCommittee[nationalIndex - 1].bio) : '')}
                          </p>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-gray-200 flex-shrink-0 flex-wrap relative">
                          {(nationalIndex === 0 ? null : nationalCommittee[nationalIndex - 1]?.mobileNumber) && (
                            <button
                              onClick={() => {
                                const mobile = nationalIndex === 0 ? null : nationalCommittee[nationalIndex - 1]?.mobileNumber;
                                if (mobile) handleCall(mobile);
                              }}
                              className="flex-1 min-w-fit bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs shadow-md hover:shadow-lg"
                            >
                              <Phone className="h-4 w-4" />
                              <span className="hidden sm:inline">{t('leadership.call', 'Call')}</span>
                            </button>
                          )}
                          <div className="relative flex-1 min-w-fit">
                            <button
                              onClick={() => setShareMenuOpen(shareMenuOpen === 'national' ? null : 'national')}
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs shadow-md hover:shadow-lg"
                            >
                              <Share2 className="h-4 w-4" />
                              <span className="hidden sm:inline">{t('leadership.share', 'Share')}</span>
                            </button>
                            {shareMenuOpen === 'national' && (
                              <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                                <button
                                  onClick={() => {
                                    const member = nationalIndex === 0 ? {
                                      _id: 'president',
                                      name: { en: 'Mr. Ranjeet सिंह', hi: 'श्री रंजीत सिंह' },
                                      position: { en: 'National President', hi: 'राष्ट्रीय अध्यक्ष' },
                                      bio: { en: 'Leading the Movement', hi: 'आंदोलन का नेतृत्व' },
                                      image: '/president.jpg',
                                      type: 'NATIONAL' as const
                                    } : nationalCommittee[nationalIndex - 1];
                                    shareToWhatsApp(member as CommitteeMember);
                                    setShareMenuOpen(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                                >
                                  <MessageCircle className="h-4 w-4 text-green-600" />
                                  WhatsApp
                                </button>
                                <button
                                  onClick={() => {
                                    const member = nationalIndex === 0 ? {
                                      _id: 'president',
                                      name: { en: 'Mr. Ranjeet Singh', hi: 'श्री रंजीत सिंह' },
                                      position: { en: 'National President', hi: 'राष्ट्रीय अध्यक्ष' },
                                      bio: { en: 'Leading the Movement', hi: 'आंदोलन का नेतृत्व' },
                                      image: '/president.jpg',
                                      type: 'NATIONAL' as const
                                    } : nationalCommittee[nationalIndex - 1];
                                    shareWithCard(member as CommitteeMember);
                                    setShareMenuOpen(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Share2 className="h-4 w-4 text-purple-600" />
                                  Share Card
                                </button>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const member = nationalIndex === 0 ? {
                                _id: 'president',
                                name: { en: 'Mr. Ranjeet Singh', hi: 'श्री रंजीत सिंह' },
                                position: { en: 'National President', hi: 'राष्ट्रीय अध्यक्ष' },
                                bio: { en: 'Leading the Movement', hi: 'आंदोलन का नेतृत्व' },
                                image: '/president.jpg',
                                mobileNumber: '',
                                type: 'NATIONAL' as const
                              } : nationalCommittee[nationalIndex - 1];

                              generateIdentityCard(member as CommitteeMember);
                            }}
                            className="flex-1 min-w-fit bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs shadow-md hover:shadow-lg"
                          >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">{t('leadership.download', 'Download')}</span>
                          </button>
                          <button
                            onClick={() => {
                              const member = nationalIndex === 0 ? {
                                _id: 'president',
                                name: { en: 'Mr. Ranjeet Singh', hi: 'श्री रंजीत सिंह' },
                                position: { en: 'National President', hi: 'राष्ट्रीय अध्यक्ष' },
                                bio: { en: 'Leading the Movement', hi: 'आंदोलन का नेतृत्व' },
                                image: '/president.jpg',
                                type: 'NATIONAL' as const
                              } : nationalCommittee[nationalIndex - 1];
                              setSelectedMember(member as CommitteeMember);
                            }}
                            className="flex-1 min-w-fit bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-xs shadow-md hover:shadow-lg"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">{t('leadership.viewDetails', 'Details')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-3 mt-4">
                    <button
                      onClick={prevNationalCarousel}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextNationalCarousel}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* National Council Sub-section (Nested Accordion) */}
            <div className="mb-8 border-t border-gray-100 pt-8">
              <button
                onClick={() => setIsParishadExpanded(!isParishadExpanded)}
                className="w-full flex items-center justify-between group"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {t('leadership.rashtriyaParishad', 'National Council (Rashtriya Parishad)')}
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-blue-600 rounded-full transition-all duration-300 group-hover:w-28"></div>
                </div>
                <div className="bg-gray-50 p-2 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-100">
                  {isParishadExpanded ? (
                    <ChevronUp className="h-5 w-5 text-red-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              </button>

              <div className={`transition-all duration-500 overflow-hidden ${isParishadExpanded ? 'max-h-[5000px] mt-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                {!loading && rashtriyaParishad.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {rashtriyaParishad.map((member) => (
                      <MemberCard key={member._id} member={member} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
                    {loading ? t('common.loading', 'Loading...') : 'No members found in National Council.'}
                  </div>
                )}
              </div>
            </div>

            {/* National Executive Committee Sub-section (Nested Accordion) */}
            <div className="mb-8 border-t border-gray-100 pt-8">
              <button
                onClick={() => setIsKaaryasamitiExpanded(!isKaaryasamitiExpanded)}
                className="w-full flex items-center justify-between group"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {t('leadership.rashtriyaKaaryasamiti', 'National Executive Committee (Rashtriya Karyasamiti)')}
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-blue-600 rounded-full transition-all duration-300 group-hover:w-28"></div>
                </div>
                <div className="bg-gray-50 p-2 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-100">
                  {isKaaryasamitiExpanded ? (
                    <ChevronUp className="h-5 w-5 text-red-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              </button>

              <div className={`transition-all duration-500 overflow-hidden ${isKaaryasamitiExpanded ? 'max-h-[5000px] mt-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                {!loading && rashtriyaKaaryasamiti.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {rashtriyaKaaryasamiti.map((member) => (
                      <MemberCard key={member._id} member={member} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    {loading ? t('common.loading', 'Loading...') : 'No members found in National Executive Committee.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={stateLeadershipRef} className="py-12 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsStateExpanded(!isStateExpanded)}
            className="w-full flex items-center justify-between group py-4"
          >
            <div className="text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {t('leadership.stateLeadership', 'State Leadership')}
              </h2>
              <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-green-600 rounded-full transition-all duration-300 group-hover:w-40"></div>
            </div>
            <div className="bg-gray-50 p-4 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-100">
              {isStateExpanded ? (
                <ChevronUp className="h-8 w-8 text-blue-600" />
              ) : (
                <ChevronDown className="h-8 w-8 text-green-600" />
              )}
            </div>
          </button>

          <div className={`transition-all duration-500 overflow-hidden ${isStateExpanded ? 'max-h-[10000px] mt-12 opacity-100' : 'max-h-0 opacity-0'}`}>
            {!selectedState ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {orderedStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className="p-6 text-left bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-700 group-hover:text-blue-600">{state}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if (selectedLevel) {
                        setSelectedLevel(null);
                        setSelectedDistrict(null);
                      } else {
                        setSelectedState(null);
                      }
                    }}
                    className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    {t('common.back', 'Back')}
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedState} {selectedLevel ? `- ${selectedLevel === 'STATE' ? 'State Committee' : 'District Committee'}` : ''}
                    {selectedDistrict ? ` - ${selectedDistrict}` : ''}
                  </h3>
                </div>

                {!selectedLevel ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <button
                      onClick={() => setSelectedLevel('STATE')}
                      className="p-10 text-center bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
                    >
                      <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-80 group-hover:scale-110 transition-transform" />
                      <h4 className="text-3xl font-bold mb-2">State Level Committee</h4>
                      <p className="text-blue-100">32 Members dedicated to state-wide development</p>
                    </button>
                    <button
                      onClick={() => setSelectedLevel('DISTRICT')}
                      className="p-10 text-center bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
                    >
                      <MapPin className="h-16 w-16 mx-auto mb-4 opacity-80 group-hover:scale-110 transition-transform" />
                      <h4 className="text-3xl font-bold mb-2">District Committee</h4>
                      <p className="text-green-100">Local leadership across districts</p>
                    </button>
                  </div>
                ) : selectedLevel === 'STATE' ? (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {stateCommitteeMembers.length > 0 ? (
                        stateCommitteeMembers.map((member) => (
                          <MemberCard key={member._id} member={member} />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                          No members found for this State Committee.
                        </div>
                      )}
                    </div>
                    {stateCommitteeMembers.length > 0 && stateCommitteeMembers.length < 32 && (
                      <p className="mt-8 text-center text-gray-500 italic">Showing {stateCommitteeMembers.length} of 32 committee positions.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {!selectedDistrict ? (
                      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-green-600" />
                          Select District in {selectedState}
                        </h4>
                        {isDistrictsLoading ? (
                          <div className="text-center py-8 text-gray-500">Loading districts...</div>
                        ) : availableDistricts.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {availableDistricts.map((dist) => (
                              <button
                                key={dist}
                                onClick={() => setSelectedDistrict(dist)}
                                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all text-gray-700 font-semibold"
                              >
                                {dist}
                              </button>
                            ))}
                            <div className="col-span-full mt-4">
                              <input 
                                type="text" 
                                placeholder="Search or enter other district..." 
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setSelectedDistrict((e.target as HTMLInputElement).value);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-6 font-medium">No district data is available for this state.</p>
                            <div className="max-w-md mx-auto px-4">
                              <p className="text-sm text-gray-400 mb-2">You can still search for a specific district:</p>
                              <input 
                                type="text" 
                                placeholder="Enter district name..." 
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                          {districtCommitteeMembers.length > 0 ? (
                            districtCommitteeMembers.map((member) => (
                              <MemberCard key={member._id} member={member} />
                            ))
                          ) : (
                            <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                              No members found for this District Committee.
                            </div>
                          )}
                        </div>
                        {districtCommitteeMembers.length > 0 && districtCommitteeMembers.length < 53 && (
                          <p className="mt-8 text-center text-gray-500 italic">Showing {districtCommitteeMembers.length} of 53 committee positions (including District President).</p>
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
