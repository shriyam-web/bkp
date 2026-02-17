'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PremiumLoader } from '@/components/LeadershipLoader';
import { Users, Briefcase, MapPin, ChevronLeft, ChevronRight, Star, Award, Download, Eye, Share2, MessageCircle, ChevronDown, ChevronUp, Phone, Search, Filter } from 'lucide-react';
import { useTranslations } from '@/lib/TranslationContext';
import { formatDate } from '@/lib/utils';
import jsPDF from 'jspdf';

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

      const baseWidth = 500;
      const scale = 3;
      const width = baseWidth * scale;
      const padding = 15;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, 1);

      const nameEn = typeof member.name === 'string' ? member.name : member.name.en;
      const nameHi = typeof member.name === 'string' ? member.name : member.name.hi;
      const positionEn = typeof member.position === 'string' ? member.position : member.position.en;
      const positionHi = typeof member.position === 'string' ? member.position : member.position.hi;

      const pledgeText = `हम घोषणा करते हैं बहुजन क्रांति पार्टी (मार्क्सवाद अंबेडकरवाद) समाज में सामाजिक आर्थिक विषमता को समाप्त करके समाज के हर व्यक्ति को समानता के स्तर पर पहुंचना। कोई भी व्यक्ति बिना श्रम के नहीं खाएगा, हर किसी को श्रम करना होगा। मशीन आदि से उत्पादन होगा उसे समाज के सभी व्यक्तियों की हिस्सेदारी होगी। अंधविश्वास, आडंबर के नाम पर कोई शोषण नहीं कर सकेगा। धार्मिक उन्माद फैलाकर कोई जनता में कोई भी विघटन नहीं पैदा करेगा। व्यक्तिगत गरिमा के साथ सामाजिक आर्थिक राजनैतिक एवं सांस्कृतिक स्तर पर व्यवहारिक रूप से सभी बराबर होंगे, कोई छोटा व बड़ा नहीं होगा। ईमानदारी नैतिकता और पारदर्शता हमारी पार्टी के अलंकार होंगे। नए और बेहतर किस्म के इस समाज को समाजवादी समाज कहते हैं इस प्रकार के समाज की स्थापना करना ही डॉ. कार्लमार्क्स व डॉ. भीमराव अंबेडकर जी का सपना था। इसकी स्थापना किए बगैर मानव समाज एक सुखी, समृद्ध समाज नहीं बन सकता है जीवन की भारी से भारी कीमत देकर भी ऐसे समाज की स्थापना महंगी नहीं है। आओ हम सब प्राण पर से इस काम में जुट जाएं।`;

      const getPledgeLines = () => {
        const maxWidth = width - 120;
        const lineHeight = 30;
        const lines = [];
        const words = pledgeText.split(' ');
        let line = '';

        ctx.font = '18px Arial';
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth) {
            if (line) lines.push(line);
            line = words[i] + ' ';
          } else {
            line = testLine;
          }
        }
        if (line) lines.push(line);
        return { lines, height: lines.length * lineHeight };
      };

      const pledgeInfo = getPledgeLines();

      const height = 2100;
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#dc2626');
      gradient.addColorStop(1, '#2563eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, 150);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('बहुजन क्रांति पार्टी (Bahujan Kranti Party) - Digital ID', 60, 90);

      let currentY = 180;

      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(45, currentY, 450, 600);
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 3;
      ctx.strokeRect(45, currentY, 450, 600);

      const continueDrawing = () => {
        currentY = 225;
        let col1 = 540;
        let col2 = 900;

        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(nameEn, col1, currentY);

        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 30px Arial';
        ctx.fillText(nameHi, col1, currentY + 42);

        currentY += 102;

        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 21px Arial';
        ctx.fillText('POSITION:', col1, currentY);
        ctx.fillStyle = '#1f2937';
        ctx.font = '21px Arial';
        ctx.fillText(positionEn + ' (' + positionHi + ')', col1, currentY + 24);

        currentY += 66;

        if (member._id) {
          ctx.fillStyle = '#dc2626';
          ctx.font = 'bold 21px Arial';
          ctx.fillText('ID:', col1, currentY);
          ctx.fillStyle = '#1f2937';
          ctx.font = '18px Arial';
          ctx.fillText(member._id.substring(0, 30), col1, currentY + 21);
          currentY += 57;
        }

        if (member.mobileNumber) {
          ctx.fillStyle = '#dc2626';
          ctx.font = 'bold 21px Arial';
          ctx.fillText('Phone:', col1, currentY);
          ctx.fillStyle = '#1f2937';
          ctx.font = '21px Arial';
          ctx.fillText(member.mobileNumber, col1, currentY + 21);
          currentY += 57;
        }

        if (member.email) {
          ctx.fillStyle = '#dc2626';
          ctx.font = 'bold 21px Arial';
          ctx.fillText('Email:', col1, currentY);
          ctx.fillStyle = '#1f2937';
          ctx.font = '18px Arial';
          ctx.fillText(member.email.substring(0, 35), col1, currentY + 21);
          currentY += 57;
        }

        if (member.state) {
          ctx.fillStyle = '#dc2626';
          ctx.font = 'bold 21px Arial';
          ctx.fillText('State:', col1, currentY);
          ctx.fillStyle = '#1f2937';
          ctx.font = '21px Arial';
          ctx.fillText(member.state, col1, currentY + 21);
        }

        if (member.address && (member.address.street || member.address.city || member.address.postalCode)) {
          let addrY = 180;
          ctx.fillStyle = '#dc2626';
          ctx.font = 'bold 21px Arial';
          ctx.fillText('ADDRESS:', col2, addrY);
          ctx.fillStyle = '#1f2937';
          ctx.font = '18px Arial';
          addrY += 27;

          if (member.address.street) {
            ctx.fillText(member.address.street.substring(0, 40), col2, addrY);
            addrY += 24;
          }
          if (member.address.city) {
            ctx.fillText(member.address.city, col2, addrY);
            addrY += 24;
          }
          if (member.address.postalCode) {
            ctx.fillText('Code: ' + member.address.postalCode, col2, addrY);
          }
        }

        currentY = 810;

        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 21px Arial';
        ctx.fillText('PLEDGE:', 60, currentY);

        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(0, currentY + 15, width, 3);

        currentY += 45;

        ctx.fillStyle = '#374151';
        ctx.font = '18px Arial';
        const lineHeight = 30;
        const maxPledgeY = height - 150;

        let pledgeLinesDrawn = 0;
        for (const line of pledgeInfo.lines) {
          if (currentY > maxPledgeY) {
            break;
          }
          ctx.fillText(line, 60, currentY);
          currentY += lineHeight;
          pledgeLinesDrawn++;
        }

        ctx.fillStyle = '#6b7280';
        ctx.font = '18px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`Generated: ${formatDate(new Date())}`, width - 60, height - 80);

        const canvasImage = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [width, height]
        });
        
        pdf.addImage(canvasImage, 'PNG', 0, 0, width, height);
        const pdfBlob = pdf.output('blob');
        if (pdfBlob instanceof Promise) {
          pdfBlob.then((blob) => {
            resolve(blob);
          });
        } else {
          resolve(pdfBlob);
        }
      };

      if (member.image) {
        const img = document.createElement('img');
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.drawImage(img, 45, currentY, 450, 600);
          continueDrawing();
        };
        img.onerror = () => {
          ctx.fillStyle = '#9ca3af';
          ctx.font = '30px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Photo', 270, currentY + 300);
          continueDrawing();
        };
        img.src = member.image;
      } else {
        ctx.fillStyle = '#9ca3af';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Photo', 270, currentY + 300);
        continueDrawing();
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

  const MemberDetailModal = ({ member, onClose }: { member: CommitteeMember; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-card rounded-[2rem] shadow-2xl max-w-xl w-full overflow-hidden border border-border animate-in zoom-in-95 duration-300">
        <div className="relative h-32 sm:h-40 bg-gradient-to-br from-red-600 via-red-500 to-blue-600">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-md transition-all z-10"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
          
          <div className="absolute -bottom-12 left-8">
            <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl border-4 border-background shadow-xl overflow-hidden bg-muted relative">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={getNameText(member.name)}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-accent">
                  <span className="text-3xl font-black text-muted-foreground/40">
                    {getNameText(member.name).split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-0.5">
              {getNameText(member.name)}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-xs">
                {getPositionText(member.position)}
              </span>
              {member.state && (
                <>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-muted-foreground font-medium flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    {member.state}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] mb-2">Biography</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {getBioText(member.bio) || t('leadership.noBioAvailable', 'No bio available')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-border">
              {member.mobileNumber && (
                <button
                  onClick={() => handleCall(member.mobileNumber)}
                  className="group flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-green-100 dark:shadow-none hover:shadow-green-200 active:scale-95 text-sm"
                >
                  <Phone className="h-4 w-4 group-hover:animate-bounce" />
                  CALL NOW
                </button>
              )}
              <button
                onClick={() => generateIdentityCard(member)}
                className="flex items-center justify-center gap-2.5 bg-foreground text-background font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-95 text-sm"
              >
                <Download className="h-4 w-4" />
                GET IDENTITY CARD
              </button>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => { shareToWhatsApp(member); }}
                className="flex items-center gap-2 text-muted-foreground/60 hover:text-green-600 font-bold text-xs transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                SHARE ON WHATSAPP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MemberCard = ({ member }: { member: CommitteeMember }) => (
    <div
      className="group relative flex flex-col h-full bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-w-[280px] sm:min-w-0 snap-center"
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-muted">
        {member.image ? (
          <Image
            src={member.image}
            alt={getNameText(member.name)}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-50 dark:from-red-950/20 dark:to-blue-950/20">
            <span className="text-5xl font-black text-muted-foreground/20 uppercase">
              {getNameText(member.name).split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMember(member)}
              className="flex-1 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-xl py-2.5 text-xs font-bold transition-all"
            >
              VIEW DETAILS
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-foreground mb-1 group-hover:text-red-600 transition-colors">
          {getNameText(member.name)}
        </h3>
        <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
          {getPositionText(member.position)}
        </p>
        
        <div className="mt-auto space-y-2">
          {member.mobileNumber && (
            <button
              onClick={() => handleCall(member.mobileNumber)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-muted text-foreground font-bold text-sm hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all border border-border"
            >
              <Phone className="h-4 w-4" />
              CALL NOW
            </button>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => generateIdentityCard(member)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-muted text-foreground font-bold text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-border"
            >
              <Download className="h-3.5 w-3.5" />
              CARD
            </button>
            <button
              onClick={() => setShareMenuOpen(shareMenuOpen === member._id ? null : member._id)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-muted text-foreground font-bold text-xs hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all border border-border"
            >
              <Share2 className="h-3.5 w-3.5" />
              SHARE
            </button>
          </div>
        </div>
      </div>

      {shareMenuOpen === member._id && (
        <div className="absolute bottom-20 left-6 right-6 bg-card rounded-2xl shadow-2xl border border-border p-2 z-20 animate-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => { shareToWhatsApp(member); setShareMenuOpen(null); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-foreground hover:bg-accent rounded-xl transition-colors"
          >
            <MessageCircle className="h-5 w-5 text-green-500" />
            WHATSAPP
          </button>
          <button
            onClick={() => { shareWithCard(member); setShareMenuOpen(null); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-foreground hover:bg-accent rounded-xl transition-colors"
          >
            <Share2 className="h-5 w-5 text-purple-500" />
            SHARE PROFILE
          </button>
        </div>
      )}
    </div>
  );

  const availableDistricts = Array.from(new Set(allDistrictMembersForState.map(m => m.district).filter(Boolean))) as string[];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-muted/30 pt-32 pb-20 border-b border-border">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-red-500/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
       
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/30 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-red-600 border border-red-100 dark:border-red-900/50 mb-6 uppercase">
              {locale === 'hi' ? 'हमारा नेतृत्व' : 'OUR LEADERSHIP'}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6 leading-tight">
              {t('leadership.title', 'Visionary Leadership')} <br />
              <span className="text-muted-foreground font-medium text-3xl sm:text-5xl">
                {t('leadership.subtitle', 'for a Better India')}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed border-l-2 border-red-600/40 pl-6 mb-10">
              {t('leadership.description', 'Dedicated individuals united in their mission to create positive change and empower every citizen')}
            </p>
            
            <div className="max-w-2xl relative group">
              <div className="relative">
                <blockquote className="text-base font-medium italic text-muted-foreground px-8 py-6 bg-card shadow-sm rounded-xl border border-border">
                  {locale === 'hi' 
                    ? 'सत्ता के लिए संघर्ष में सर्वहारा के पास संगठन के अलावा कोई दूसरा हथियार नहीं है - व्लादिमीर लेनिन'
                    : 'In the struggle for power, the proletariat has no weapon other than organization.'}
                  <footer className="mt-3 text-[10px] not-italic text-muted-foreground/40 font-bold tracking-widest uppercase flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-border"></div>
                    V. Lenin
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-32">
          <PremiumLoader />
        </div>
      ) : (
        <>
          {/* National Leadership Accordion */}
          <section className="py-12 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 relative">
            <button
              onClick={() => setIsNationalExpanded(!isNationalExpanded)}
              className="w-full flex items-center justify-between group bg-card p-6 rounded-2xl shadow-lg shadow-black/5 border border-border hover:border-red-500/20 transition-all duration-500"
            >
              <div className="text-left">
                <div className="flex items-center gap-4 mb-1">
                  <div className="h-8 w-1 bg-gradient-to-b from-red-600 to-blue-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    {t('leadership.nationalLeadership', 'National Leadership')}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground font-medium ml-5">{t('leadership.nationalDescription', 'Our central governing body and visionary pioneers')}</p>
              </div>
              <div className={`p-3 rounded-xl transition-all duration-500 ${isNationalExpanded ? 'bg-red-600 text-white shadow-red-200' : 'bg-muted text-muted-foreground'}`}>
                {isNationalExpanded ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </div>
            </button>
          </div>

          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isNationalExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mb-12">
              {loading ? (
                <PremiumLoader />
              ) : nationalCommittee.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No national committee members found.
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Featured President Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-[2rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
                    <div className="relative bg-card rounded-[2rem] overflow-hidden border border-border shadow-xl flex flex-col lg:grid lg:grid-cols-3">
                      <div className="lg:col-span-1 aspect-[4/5] lg:aspect-auto relative bg-muted">
                        <Image
                          src="/president.jpg"
                          alt={t('leadership.nationalPresident', 'National President')}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div className="lg:col-span-2 p-6 sm:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-100 dark:border-red-900/50 text-[10px] font-black tracking-widest uppercase mb-4">
                          <Star className="h-2.5 w-2.5 fill-red-600" />
                          {t('leadership.nationalPresident', 'National President')}
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-black text-foreground mb-4 leading-tight">
                          {locale === 'hi' ? 'श्री रंजीत सिंह' : 'Mr. Ranjeet Singh'}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed mb-8 font-medium">
                          {t('leadership.leadingTheMovement', 'Leading the Movement for Social Justice and Equality. Dedicated to the empowerment of every citizen through organization and awareness.')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => setSelectedMember({
                              _id: 'president',
                              name: { en: 'Mr. Ranjeet Singh', hi: 'श्री रंजीत सिंह' },
                              position: { en: 'National President', hi: 'राष्ट्रीय अध्यक्ष' },
                              image: '/president.jpg',
                              bio: { en: 'Leading the Movement', hi: 'आंदोलन का नेतृत्व' },
                              type: 'NATIONAL'
                            })}
                            className="bg-foreground text-background px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg active:scale-95 text-sm"
                          >
                            <Eye className="h-4 w-4" />
                            VIEW FULL PROFILE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other National Members Grid */}
                  {nationalCommittee.length > 0 && (
                    <div className="pt-12 border-t border-border">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                        <h4 className="text-xl font-black text-foreground uppercase tracking-widest">
                          {t('leadership.nationalCommittee', 'National Committee Members')}
                        </h4>
                      </div>
                      <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {nationalCommittee.map((member) => (
                          <MemberCard key={member._id} member={member} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* National Council Sub-section (Nested Accordion) */}
            <div className="mb-8">
              <button
                onClick={() => setIsParishadExpanded(!isParishadExpanded)}
                className="w-full flex items-center justify-between group bg-card/50 backdrop-blur-sm p-5 rounded-xl border border-border hover:border-red-500/20 transition-all duration-300"
              >
                <div className="text-left flex items-center gap-4">
                  <div className="h-6 w-1 bg-red-500 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-red-600 transition-colors">
                    {t('leadership.rashtriyaParishad', 'National Council (Rashtriya Parishad)')}
                  </h3>
                </div>
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${isParishadExpanded ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-muted text-muted-foreground'}`}>
                  {isParishadExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              <div className={`transition-all duration-500 overflow-hidden ${isParishadExpanded ? 'max-h-[5000px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                {!loading && rashtriyaParishad.length > 0 ? (
                  <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rashtriyaParishad.map((member) => (
                      <MemberCard key={member._id} member={member} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground bg-card rounded-2xl border border-dashed border-border shadow-inner">
                    {loading ? (
                      <PremiumLoader />
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Users className="h-10 w-10 text-muted" />
                        <p className="text-sm font-medium">No members found in National Council.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* National Executive Committee Sub-section (Nested Accordion) */}
            <div className="mb-8">
              <button
                onClick={() => setIsKaaryasamitiExpanded(!isKaaryasamitiExpanded)}
                className="w-full flex items-center justify-between group bg-card/50 backdrop-blur-sm p-5 rounded-xl border border-border hover:border-red-500/20 transition-all duration-300"
              >
                <div className="text-left flex items-center gap-4">
                  <div className="h-6 w-1 bg-red-500 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-red-600 transition-colors">
                    {t('leadership.rashtriyaKaaryasamiti', 'National Executive Committee (Rashtriya Karyasamiti)')}
                  </h3>
                </div>
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${isKaaryasamitiExpanded ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-muted text-muted-foreground'}`}>
                  {isKaaryasamitiExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              <div className={`transition-all duration-500 overflow-hidden ${isKaaryasamitiExpanded ? 'max-h-[5000px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                {!loading && rashtriyaKaaryasamiti.length > 0 ? (
                  <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rashtriyaKaaryasamiti.map((member) => (
                      <MemberCard key={member._id} member={member} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground bg-card rounded-2xl border border-dashed border-border shadow-inner">
                    {loading ? (
                      <PremiumLoader />
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Users className="h-10 w-10 text-muted" />
                        <p className="text-sm font-medium">No members found in National Executive Committee.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Leadership Section */}
      <section ref={stateLeadershipRef} className="py-12 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 relative">
            <button
              onClick={() => setIsStateExpanded(!isStateExpanded)}
              className="w-full flex items-center justify-between group bg-card p-6 rounded-2xl shadow-lg border border-border hover:border-blue-500/20 transition-all duration-500"
            >
              <div className="text-left">
                <div className="flex items-center gap-4 mb-1">
                  <div className="h-8 w-1 bg-gradient-to-b from-blue-600 to-green-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    {t('leadership.stateLeadership', 'State Leadership')}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground font-medium ml-5">{t('leadership.stateDescription', 'Empowering regional voices and local governance')}</p>
              </div>
              <div className={`p-3 rounded-xl transition-all duration-500 ${isStateExpanded ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-muted text-muted-foreground'}`}>
                {isStateExpanded ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </div>
            </button>
          </div>

          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isStateExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {!selectedState ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                {orderedStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className="group relative p-8 text-left bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">STATE</span>
                      <span className="text-lg font-black text-foreground group-hover:text-blue-600 transition-colors leading-tight">{state}</span>
                    </div>
                    <div className="mt-4 h-1 w-0 bg-blue-500 rounded-full group-hover:w-12 transition-all duration-500"></div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex items-center justify-between bg-card p-6 rounded-2xl shadow-sm border border-border">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => {
                        if (selectedLevel) {
                          setSelectedLevel(null);
                          setSelectedDistrict(null);
                        } else {
                          setSelectedState(null);
                        }
                      }}
                      className="flex items-center justify-center h-12 w-12 bg-muted rounded-full text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span className="text-xs font-black tracking-widest text-muted-foreground uppercase">{selectedState}</span>
                      </div>
                      <h3 className="text-2xl font-black text-foreground">
                        {selectedLevel ? (selectedLevel === 'STATE' ? 'State Committee' : 'District Committee') : 'Select Level'}
                        {selectedDistrict ? ` - ${selectedDistrict}` : ''}
                      </h3>
                    </div>
                  </div>
                </div>

                {!selectedLevel ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <button
                      onClick={() => setSelectedLevel('STATE')}
                      className="group relative p-12 text-center bg-card rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="h-24 w-24 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                          <Briefcase className="h-12 w-12 text-blue-600" />
                        </div>
                        <h4 className="text-2xl font-black text-foreground mb-4 tracking-tight">State Committee</h4>
                        <p className="text-muted-foreground font-medium">32 Members dedicated to state-wide development and strategic planning</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedLevel('DISTRICT')}
                      className="group relative p-12 text-center bg-card rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="h-24 w-24 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                          <MapPin className="h-12 w-12 text-green-600" />
                        </div>
                        <h4 className="text-2xl font-black text-foreground mb-4 tracking-tight">District Committee</h4>
                        <p className="text-muted-foreground font-medium">Local grassroots leadership across all districts within the state</p>
                      </div>
                    </button>
                  </div>
                ) : selectedLevel === 'STATE' ? (
                  <div>
                    <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {stateCommitteeMembers.length > 0 ? (
                        stateCommitteeMembers.map((member) => (
                          <MemberCard key={member._id} member={member} />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-24 text-muted-foreground bg-card rounded-3xl border border-dashed border-border">
                          <div className="flex flex-col items-center gap-4">
                            <Users className="h-12 w-12 text-muted" />
                            <p className="font-medium">No members found for this State Committee.</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {stateCommitteeMembers.length > 0 && stateCommitteeMembers.length < 32 && (
                      <p className="mt-8 text-center text-muted-foreground font-medium italic tracking-wide">Showing {stateCommitteeMembers.length} of 32 committee positions.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-12">
                    {!selectedDistrict ? (
                      <div className="bg-card p-10 rounded-3xl border border-border shadow-xl shadow-black/5">
                        <h4 className="text-2xl font-black mb-8 flex items-center gap-4 text-foreground">
                          <div className="h-8 w-8 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-green-600" />
                          </div>
                          Select District in {selectedState}
                        </h4>
                        {isDistrictsLoading ? (
                          <PremiumLoader />
                        ) : availableDistricts.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {availableDistricts.map((dist) => (
                              <button
                                key={dist}
                                onClick={() => setSelectedDistrict(dist)}
                                className="p-4 bg-muted border border-transparent rounded-xl hover:bg-card hover:border-green-500 hover:shadow-md transition-all text-foreground font-bold text-sm text-center"
                              >
                                {dist}
                              </button>
                            ))}
                            <div className="col-span-full mt-8">
                              <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-green-500 transition-colors" />
                                <input 
                                  type="text" 
                                  placeholder="Search or enter other district..." 
                                  className="w-full pl-12 pr-4 py-5 bg-muted border border-transparent rounded-2xl focus:bg-card focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-foreground"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      setSelectedDistrict((e.target as HTMLInputElement).value);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-20 bg-muted rounded-3xl border border-dashed border-border">
                            <p className="text-muted-foreground mb-8 font-bold text-lg">No district data available for this state.</p>
                            <div className="max-w-md mx-auto px-4">
                              <p className="text-sm text-muted-foreground mb-4 font-medium uppercase tracking-widest">Search for a specific district:</p>
                              <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-green-500 transition-colors" />
                                <input 
                                  type="text" 
                                  placeholder="Enter district name..." 
                                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm transition-all text-foreground"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      setSelectedDistrict((e.target as HTMLInputElement).value);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                          {districtCommitteeMembers.length > 0 ? (
                            districtCommitteeMembers.map((member) => (
                              <MemberCard key={member._id} member={member} />
                            ))
                          ) : (
                            <div className="col-span-full text-center py-24 text-muted-foreground bg-card rounded-3xl border border-dashed border-border">
                              <div className="flex flex-col items-center gap-4">
                                <Users className="h-12 w-12 text-muted" />
                                <p className="font-medium">No members found for this District Committee.</p>
                              </div>
                            </div>
                          )}
                        </div>
                        {districtCommitteeMembers.length > 0 && districtCommitteeMembers.length < 53 && (
                          <p className="mt-8 text-center text-muted-foreground font-medium italic">Showing {districtCommitteeMembers.length} of 53 committee positions.</p>
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
