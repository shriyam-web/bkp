'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Noto_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  MapPin,
  ChevronLeft,
  Search,
  Landmark,
  Vote,
  Users,
  Phone,
  Loader2,
  X,
  Download,
  Share2,
  Star,
} from 'lucide-react';
import { useTranslations } from '@/lib/TranslationContext';
import { INDIAN_STATES } from '@/lib/indian-states';
import { cn } from '@/lib/utils';
import {
  isBoothIncharge,
  downloadMemberCard,
  shareMemberCard,
} from '@/lib/booth-member-card';

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

interface LegislativeAssembly {
  _id: string;
  state: string;
  name: { en: string; hi: string };
  constituencyNumber?: number | null;
  order: number;
}

interface BoothMember {
  _id: string;
  name: { en: string; hi: string };
  position: { en: string; hi: string };
  image?: string | null;
  isBoothIncharge?: boolean;
  state?: string;
  constituency?: string;
  booth?: string;
  mobileNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

interface GlobalBooth {
  state: string;
  constituency: string;
  booth: string;
  count: number;
}

interface GlobalResults {
  states: string[];
  assemblies: LegislativeAssembly[];
  booths: GlobalBooth[];
  members: BoothMember[];
}

type Step = 'state' | 'assembly' | 'booth' | 'committee';

const STEPS: Step[] = ['state', 'assembly', 'booth', 'committee'];

const EMPTY_RESULTS: GlobalResults = {
  states: [],
  assemblies: [],
  booths: [],
  members: [],
};

function textMatches(query: string, ...values: (string | number | null | undefined)[]) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return values.some((v) => v != null && String(v).toLowerCase().includes(q));
}

function assemblyMatchesQuery(query: string, assembly: LegislativeAssembly) {
  if (textMatches(query, assembly.name.en, assembly.name.hi, assembly.constituencyNumber)) {
    return true;
  }
  const q = query.trim();
  if (/^\d+$/.test(q) && assembly.constituencyNumber != null) {
    return String(assembly.constituencyNumber).includes(q);
  }
  return false;
}

function boothMatchesQuery(query: string, booth: string) {
  if (textMatches(query, booth)) return true;
  const qNum = query.replace(/\D/g, '');
  const boothNum = booth.replace(/\D/g, '');
  return Boolean(qNum) && boothNum.includes(qNum);
}

export default function BoothCommitteePage() {
  const { locale } = useTranslations();
  const [currentStep, setCurrentStep] = useState<Step>('state');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedAssembly, setSelectedAssembly] = useState<LegislativeAssembly | null>(null);
  const [assemblies, setAssemblies] = useState<LegislativeAssembly[]>([]);
  const [statesWithData, setStatesWithData] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [assembliesLoading, setAssembliesLoading] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [globalResults, setGlobalResults] = useState<GlobalResults>(EMPTY_RESULTS);
  const [globalSearching, setGlobalSearching] = useState(false);
  const [assemblyMembers, setAssemblyMembers] = useState<BoothMember[]>([]);
  const [stateMembers, setStateMembers] = useState<BoothMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);
  const [cardActionId, setCardActionId] = useState<string | null>(null);
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const isHi = locale === 'hi';
  const hasSearch = globalSearch.trim().length > 0;
  const hasDeepSearch = globalSearch.trim().length >= 2;

  const orderedStates = useMemo(() => {
    return [...INDIAN_STATES].sort((a, b) => {
      const aHas = statesWithData.has(a);
      const bHas = statesWithData.has(b);
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
      return a.localeCompare(b);
    });
  }, [statesWithData]);

  const filteredStates = useMemo(() => {
    if (!hasSearch) return orderedStates;
    const resultStates = new Set<string>();
    orderedStates.forEach((state) => {
      if (textMatches(globalSearch, state)) resultStates.add(state);
    });
    globalResults.states.forEach((s) => resultStates.add(s));
    globalResults.assemblies.forEach((a) => resultStates.add(a.state));
    globalResults.members.forEach((m) => m.state && resultStates.add(m.state));
    return orderedStates.filter((s) => resultStates.has(s));
  }, [orderedStates, globalSearch, hasSearch, globalResults]);

  const filteredAssemblies = useMemo(() => {
    if (!hasSearch) return assemblies;
    if (currentStep === 'assembly') {
      return assemblies.filter((a) => assemblyMatchesQuery(globalSearch, a));
    }
    const matchedIds = new Set<string>();
    assemblies.forEach((a) => {
      if (assemblyMatchesQuery(globalSearch, a)) matchedIds.add(a._id);
    });
    globalResults.assemblies
      .filter((a) => !selectedState || a.state === selectedState)
      .forEach((a) => matchedIds.add(a._id));
    stateMembers.forEach((m) => {
      if (
        m.constituency &&
        textMatches(
          globalSearch,
          m.name?.en,
          m.name?.hi,
          m.position?.en,
          m.booth,
          m.constituency
        )
      ) {
        const match = assemblies.find((a) => a.name.en === m.constituency);
        if (match) matchedIds.add(match._id);
      }
    });
    return assemblies.filter((a) => matchedIds.has(a._id));
  }, [assemblies, globalSearch, hasSearch, globalResults, stateMembers, selectedState, currentStep]);

  const availableBooths = useMemo(() => {
    return Array.from(
      new Set(assemblyMembers.map((m) => m.booth).filter(Boolean))
    ) as string[];
  }, [assemblyMembers]);

  const filteredBooths = useMemo(() => {
    if (!hasSearch) return availableBooths;
    if (currentStep === 'booth') {
      return availableBooths.filter((booth) => boothMatchesQuery(globalSearch, booth));
    }
    return availableBooths.filter((booth) => {
      if (boothMatchesQuery(globalSearch, booth)) return true;
      return assemblyMembers.some(
        (m) =>
          m.booth === booth &&
          textMatches(
            globalSearch,
            m.name?.en,
            m.name?.hi,
            m.position?.en,
            m.position?.hi
          )
      );
    });
  }, [availableBooths, assemblyMembers, globalSearch, hasSearch, currentStep]);

  const boothMembers = useMemo(() => {
    if (!selectedBooth) return [];
    return assemblyMembers.filter((m) => m.booth === selectedBooth);
  }, [assemblyMembers, selectedBooth]);

  const filteredMembers = useMemo(() => {
    if (!hasSearch) return boothMembers;
    return boothMembers.filter((m) =>
      textMatches(
        globalSearch,
        m.name?.en,
        m.name?.hi,
        m.position?.en,
        m.position?.hi,
        m.booth,
        m.mobileNumber,
        m.address?.street,
        m.address?.city,
        m.address?.state,
        m.address?.postalCode
      )
    );
  }, [boothMembers, globalSearch, hasSearch]);

  const scopedGlobalResults = useMemo(() => {
    if (!hasDeepSearch) return EMPTY_RESULTS;
    const scope = (item: { state?: string }) =>
      !selectedState || item.state === selectedState;
    return {
      states: globalResults.states,
      assemblies: globalResults.assemblies.filter(scope),
      booths: globalResults.booths.filter(scope),
      members: globalResults.members.filter(scope),
    };
  }, [globalResults, hasDeepSearch, selectedState]);

  const showGlobalPanel =
    currentStep === 'state' &&
    hasDeepSearch &&
    (scopedGlobalResults.assemblies.length > 0 ||
      scopedGlobalResults.booths.length > 0 ||
      scopedGlobalResults.members.length > 0 ||
      scopedGlobalResults.states.length > 0);

  const boothIncharge = useMemo(
    () => boothMembers.find((m) => isBoothIncharge(m)) || null,
    [boothMembers]
  );

  const regularMembers = useMemo(
    () => filteredMembers.filter((m) => !isBoothIncharge(m)),
    [filteredMembers]
  );

  const searchPlaceholder = useMemo(() => {
    if (currentStep === 'assembly') {
      return isHi
        ? 'विधानसभा संख्या या नाम खोजें...'
        : 'Search by assembly number or name...';
    }
    if (currentStep === 'booth') {
      return isHi
        ? 'बूथ संख्या या नाम खोजें...'
        : 'Search by booth number or name...';
    }
    if (currentStep === 'committee') {
      return isHi
        ? 'सदस्य का नाम या पद खोजें...'
        : 'Search member name or post...';
    }
    return isHi
      ? 'राज्य, विधानसभा, बूथ या सदस्य खोजें...'
      : 'Search state, assembly, booth, or member...';
  }, [currentStep, isHi]);

  useEffect(() => {
    const fetchStatesWithData = async () => {
      try {
        const res = await fetch('/api/legislative-assemblies');
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const states = new Set<string>(
            data.data.map((a: LegislativeAssembly) => a.state).filter(Boolean)
          );
          setStatesWithData(states);
        }
      } catch (error) {
        console.error('Failed to fetch states with assembly data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatesWithData();
  }, []);

  useEffect(() => {
    if (currentStep !== 'state' || !hasDeepSearch) {
      setGlobalResults(EMPTY_RESULTS);
      return;
    }
    const timer = setTimeout(async () => {
      setGlobalSearching(true);
      try {
        const params = new URLSearchParams({ q: globalSearch.trim() });
        if (selectedState) params.set('state', selectedState);
        const res = await fetch(`/api/booth-committee/search?${params}`);
        const data = await res.json();
        setGlobalResults(data.success ? data.data : EMPTY_RESULTS);
      } catch {
        setGlobalResults(EMPTY_RESULTS);
      } finally {
        setGlobalSearching(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [globalSearch, hasDeepSearch, selectedState, currentStep]);

  useEffect(() => {
    if (!selectedState) {
      setAssemblies([]);
      setStateMembers([]);
      return;
    }
    const fetchAssemblies = async () => {
      setAssembliesLoading(true);
      try {
        const res = await fetch(
          `/api/legislative-assemblies?state=${encodeURIComponent(selectedState)}`
        );
        const data = await res.json();
        setAssemblies(data.success ? data.data : []);
      } catch {
        setAssemblies([]);
      } finally {
        setAssembliesLoading(false);
      }
    };
    const fetchStateMembers = async () => {
      try {
        const res = await fetch(
          `/api/committee-members?type=BOOTH&state=${encodeURIComponent(selectedState)}`
        );
        const data = await res.json();
        setStateMembers(Array.isArray(data) ? data : []);
      } catch {
        setStateMembers([]);
      }
    };
    fetchAssemblies();
    fetchStateMembers();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState || !selectedAssembly) {
      setAssemblyMembers([]);
      return;
    }
    const fetchMembers = async () => {
      setMembersLoading(true);
      try {
        const params = new URLSearchParams({
          type: 'BOOTH',
          state: selectedState,
          constituency: selectedAssembly.name.en,
        });
        const res = await fetch(`/api/committee-members?${params}`);
        const data = await res.json();
        setAssemblyMembers(Array.isArray(data) ? data : []);
      } catch {
        setAssemblyMembers([]);
      } finally {
        setMembersLoading(false);
      }
    };
    fetchMembers();
  }, [selectedState, selectedAssembly]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const getText = (obj: { en: string; hi: string }) =>
    isHi && obj.hi ? obj.hi : obj.en;

  const getAssemblyName = (assembly: LegislativeAssembly) => {
    if (isHi && assembly.name.hi) return assembly.name.hi;
    return assembly.name.en;
  };

  const stepLabels: Record<Step, { en: string; hi: string }> = {
    state: { en: 'State', hi: 'राज्य' },
    assembly: { en: 'Assembly', hi: 'विधानसभा' },
    booth: { en: 'Booth', hi: 'बूथ' },
    committee: { en: 'Members', hi: 'सदस्य' },
  };

  const currentStepIndex = STEPS.indexOf(currentStep);

  const breadcrumb = [
    selectedState,
    selectedAssembly ? getAssemblyName(selectedAssembly) : null,
    selectedBooth,
  ].filter(Boolean);

  const handleBack = () => {
    if (currentStep === 'committee') {
      setSelectedBooth(null);
      setCurrentStep('booth');
    } else if (currentStep === 'booth') {
      setSelectedAssembly(null);
      setSelectedBooth(null);
      setAssemblyMembers([]);
      setCurrentStep('assembly');
    } else if (currentStep === 'assembly') {
      setSelectedState(null);
      setSelectedAssembly(null);
      setAssemblies([]);
      setStateMembers([]);
      setCurrentStep('state');
    }
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setCurrentStep('assembly');
  };

  const handleAssemblySelect = (assembly: LegislativeAssembly) => {
    setSelectedAssembly(assembly);
    setSelectedBooth(null);
    setCurrentStep('booth');
  };

  const handleBoothSelect = (booth: string) => {
    setSelectedBooth(booth);
    setCurrentStep('committee');
  };

  const resolveAssembly = (
    list: LegislativeAssembly[],
    state: string,
    constituency: string
  ): LegislativeAssembly =>
    list.find((a) => a.name.en === constituency) || {
      _id: `temp-${constituency}`,
      state,
      name: { en: constituency, hi: '' },
      order: 0,
    };

  const navigateToAssembly = useCallback(async (assembly: LegislativeAssembly) => {
    setSelectedState(assembly.state);
    setAssembliesLoading(true);
    try {
      const res = await fetch(
        `/api/legislative-assemblies?state=${encodeURIComponent(assembly.state)}`
      );
      const data = await res.json();
      const list: LegislativeAssembly[] = data.success ? data.data : [];
      setAssemblies(list);
      const resolved = list.find((a) => a._id === assembly._id) || assembly;
      setSelectedAssembly(resolved);
      setSelectedBooth(null);
      setCurrentStep('booth');
    } catch {
      setSelectedAssembly(assembly);
      setCurrentStep('booth');
    } finally {
      setAssembliesLoading(false);
    }
  }, []);

  const navigateToBooth = useCallback(
    async (state: string, constituency: string, booth: string) => {
      setAssembliesLoading(true);
      setMembersLoading(true);
      try {
        const res = await fetch(
          `/api/legislative-assemblies?state=${encodeURIComponent(state)}`
        );
        const data = await res.json();
        const list: LegislativeAssembly[] = data.success ? data.data : [];
        const assembly = resolveAssembly(list, state, constituency);
        setSelectedState(state);
        setAssemblies(list);
        setSelectedAssembly(assembly);
        setSelectedBooth(booth);
        setCurrentStep('committee');
      } catch {
        setSelectedState(state);
        setSelectedAssembly(resolveAssembly([], state, constituency));
        setSelectedBooth(booth);
        setCurrentStep('committee');
      } finally {
        setAssembliesLoading(false);
        setMembersLoading(false);
      }
    },
    []
  );

  const navigateToMember = useCallback(
    (member: BoothMember) => {
      if (member.state && member.constituency && member.booth) {
        navigateToBooth(member.state, member.constituency, member.booth);
      }
    },
    [navigateToBooth]
  );

  const formatAddress = (member: BoothMember) => {
    return [
      member.address?.street,
      member.address?.city,
      member.address?.state,
      member.address?.postalCode,
    ]
      .filter(Boolean)
      .join(', ');
  };

  const resultCountLabel = () => {
    if (currentStep === 'state') return filteredStates.length;
    if (currentStep === 'assembly') return filteredAssemblies.length;
    if (currentStep === 'booth') return filteredBooths.length;
    return filteredMembers.length;
  };

  const cardContext = useMemo(() => {
    if (!selectedState || !selectedAssembly || !selectedBooth) return null;
    return {
      state: selectedState,
      assembly: getAssemblyName(selectedAssembly),
      booth: selectedBooth,
      locale,
    };
  }, [selectedState, selectedAssembly, selectedBooth, locale, isHi]);

  const handleDownloadCard = async (member: BoothMember) => {
    if (!cardContext) return;
    setCardActionId(member._id);
    try {
      await downloadMemberCard(member, cardContext);
    } finally {
      setCardActionId(null);
    }
  };

  const handleShareCard = async (member: BoothMember) => {
    if (!cardContext) return;
    setCardActionId(member._id);
    try {
      const result = await shareMemberCard(member, cardContext);
      if (result === 'copied') {
        setShareNotice(
          isHi ? 'कार्ड लिंक कॉपी हो गया' : 'Card link copied to clipboard'
        );
        setTimeout(() => setShareNotice(null), 3000);
      }
    } finally {
      setCardActionId(null);
    }
  };

  const renderMemberCard = (member: BoothMember, featured = false) => {
    const incharge = isBoothIncharge(member);
    const busy = cardActionId === member._id;
    return (
      <article
        key={member._id}
        className={cn(
          'flex flex-col gap-4 p-4 sm:p-5 bg-white dark:bg-card border rounded-lg',
          featured || incharge
            ? 'border-orange-300/80 dark:border-orange-500/40 ring-1 ring-orange-200/50 dark:ring-orange-500/20'
            : 'border-border/70'
        )}
      >
        <div className="flex gap-4">
          <div
            className={cn(
              'shrink-0 relative rounded-md overflow-hidden bg-muted',
              featured || incharge
                ? 'w-20 h-24 sm:w-24 sm:h-28'
                : 'w-16 h-20 sm:w-[72px] sm:h-[88px]'
            )}
          >
            {member.image ? (
              <Image
                src={member.image}
                alt={getText(member.name)}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <span className="text-lg font-light text-muted-foreground/40 uppercase">
                  {getText(member.name)
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            {incharge && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 mb-2 rounded-full text-[11px] font-medium bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300">
                <Star className="h-3 w-3 fill-current" />
                {isHi ? 'बूथ प्रभारी' : 'Booth Incharge'}
              </span>
            )}
            <h3
              className={cn(
                'font-medium text-foreground leading-snug',
                featured || incharge ? 'text-[17px] sm:text-lg' : 'text-[15px]'
              )}
            >
              {getText(member.name)}
            </h3>
            <p className="text-[13px] font-light text-muted-foreground mt-0.5">
              {getText(member.position)}
            </p>
            {formatAddress(member) && (
              <p className="text-[12px] font-light text-muted-foreground mt-2 leading-relaxed flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 opacity-50" />
                <span>{formatAddress(member)}</span>
              </p>
            )}
            {member.mobileNumber && (
              <a
                href={`tel:${member.mobileNumber}`}
                className="inline-flex items-center gap-1.5 text-[13px] font-normal text-foreground/70 hover:text-foreground mt-2.5 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {member.mobileNumber}
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-border/50">
          <button
            type="button"
            disabled={busy}
            onClick={() => handleDownloadCard(member)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-normal rounded-md border border-border/70 hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            {isHi ? 'डाउनलोड' : 'Download'}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => handleShareCard(member)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-normal rounded-md border border-border/70 hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            <Share2 className="h-3.5 w-3.5" />
            {isHi ? 'साझा करें' : 'Share'}
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className={cn(notoSans.className, 'min-h-screen bg-[#f8f9fa] dark:bg-background')}>
      <Header />

      {shareNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg bg-foreground text-background text-sm shadow-lg">
          {shareNotice}
        </div>
      )}

      <div className="border-b border-border/60 bg-white dark:bg-card pt-24 sm:pt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6 sm:pt-8 pb-5">
          <p className="text-[13px] font-normal text-muted-foreground mb-1">
            {isHi ? 'संगठन डायरेक्टरी' : 'Organization directory'}
          </p>
          <h1 className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
            {isHi ? 'बूथ स्तर समिति' : 'Booth Level Committee'}
          </h1>
          <p className="text-[12px] font-light text-muted-foreground mt-2">
            {isHi
              ? 'राज्य, विधानसभा, बूथ और सदस्य — एक ही खोज से'
              : 'Filter by state, assembly, booth, or member from one search'}
          </p>
        </div>

        <div className="sticky top-16 sm:top-[65px] z-40 bg-white dark:bg-card border-y border-border/60 shadow-sm shadow-black/[0.03]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
              <input
                ref={searchRef}
                type="search"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-10 py-2.5 sm:py-3 text-[14px] font-light bg-[#f8f9fa] dark:bg-muted/40 border border-border/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/15 focus:bg-white dark:focus:bg-card transition-colors"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {globalSearching && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {globalSearch && !globalSearching && (
                  <button
                    type="button"
                    onClick={() => setGlobalSearch('')}
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    aria-label={isHi ? 'खोज साफ़ करें' : 'Clear search'}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-6 sm:pb-8 pt-5">
          <div className="flex items-center gap-0 overflow-x-auto pb-1">
            {STEPS.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isDone = index < currentStepIndex;
              return (
                <div key={step} className="flex items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium transition-colors',
                        isActive
                          ? 'bg-foreground text-background'
                          : isDone
                            ? 'bg-foreground/15 text-foreground'
                            : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        'text-[13px] whitespace-nowrap',
                        isActive ? 'font-medium text-foreground' : 'font-light text-muted-foreground'
                      )}
                    >
                      {isHi ? stepLabels[step].hi : stepLabels[step].en}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={cn(
                        'mx-3 sm:mx-4 h-px w-6 sm:w-10',
                        isDone ? 'bg-foreground/25' : 'bg-border'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={contentRef} className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-5">
            {currentStep !== 'state' && (
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label={isHi ? 'वापस' : 'Go back'}
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-white dark:bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[17px] font-medium text-foreground">
                    {isHi ? stepLabels[currentStep].hi : stepLabels[currentStep].en}
                  </h2>
                  {breadcrumb.length > 0 && (
                    <p className="text-[13px] font-light text-muted-foreground mt-0.5 truncate">
                      {breadcrumb.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {hasSearch && (
              <p className="text-[13px] font-light text-muted-foreground">
                {isHi
                  ? `${resultCountLabel()} परिणाम "${globalSearch}" के लिए`
                  : `${resultCountLabel()} results for "${globalSearch}"`}
              </p>
            )}

            {showGlobalPanel && (
              <div className="bg-white dark:bg-card border border-border/70 rounded-lg overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-border/60 flex items-center justify-between">
                  <p className="text-[13px] font-medium text-foreground">
                    {isHi ? 'खोज परिणाम' : 'Search results'}
                  </p>
                  <span className="text-[12px] font-light text-muted-foreground">
                    {isHi ? 'सभी स्तर' : 'All levels'}
                  </span>
                </div>
                <div className="divide-y divide-border/50 max-h-[280px] overflow-y-auto">
                  {scopedGlobalResults.states
                    .filter((s) => !(filteredStates as readonly string[]).includes(s))
                    .map((state) => (
                      <button
                        key={`state-${state}`}
                        type="button"
                        onClick={() => handleStateSelect(state)}
                        className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left hover:bg-[#fafafa] dark:hover:bg-muted/30 transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[14px] font-normal text-foreground">{state}</p>
                          <p className="text-[12px] font-light text-muted-foreground">
                            {isHi ? 'राज्य' : 'State'}
                          </p>
                        </div>
                      </button>
                    ))}
                  {scopedGlobalResults.assemblies.map((assembly) => (
                    <button
                      key={`asm-${assembly._id}`}
                      type="button"
                      onClick={() => navigateToAssembly(assembly)}
                      className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left hover:bg-[#fafafa] dark:hover:bg-muted/30 transition-colors"
                    >
                      <Landmark className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[14px] font-normal text-foreground truncate">
                          {getAssemblyName(assembly)}
                        </p>
                        <p className="text-[12px] font-light text-muted-foreground">
                          {assembly.state}
                          {assembly.constituencyNumber != null && ` · #${assembly.constituencyNumber}`}
                        </p>
                      </div>
                    </button>
                  ))}
                  {scopedGlobalResults.booths.map((b) => (
                    <button
                      key={`booth-${b.state}-${b.constituency}-${b.booth}`}
                      type="button"
                      onClick={() => navigateToBooth(b.state, b.constituency, b.booth)}
                      className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left hover:bg-[#fafafa] dark:hover:bg-muted/30 transition-colors"
                    >
                      <Vote className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[14px] font-normal text-foreground truncate">{b.booth}</p>
                        <p className="text-[12px] font-light text-muted-foreground truncate">
                          {b.constituency} · {b.state}
                        </p>
                      </div>
                    </button>
                  ))}
                  {scopedGlobalResults.members.map((member) => (
                    <button
                      key={`mem-${member._id}`}
                      type="button"
                      onClick={() => navigateToMember(member)}
                      className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left hover:bg-[#fafafa] dark:hover:bg-muted/30 transition-colors"
                    >
                      <Users className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[14px] font-normal text-foreground truncate">
                          {getText(member.name)}
                        </p>
                        <p className="text-[12px] font-light text-muted-foreground truncate">
                          {member.booth && `${member.booth} · `}
                          {member.constituency}
                          {member.state && ` · ${member.state}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'state' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-[17px] font-medium text-foreground">
                    {isHi ? 'राज्य चुनें' : 'Select a state'}
                  </h2>
                </div>
                {filteredStates.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                    {filteredStates.map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => handleStateSelect(state)}
                        className="group flex items-center justify-between px-4 py-3.5 text-left bg-white dark:bg-card border border-border/70 rounded-lg hover:border-foreground/20 hover:bg-[#fafafa] dark:hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-[14px] font-normal text-foreground leading-snug pr-2">
                          {state}
                        </span>
                        <ChevronLeft className="h-3.5 w-3.5 rotate-180 text-muted-foreground/50 group-hover:text-foreground/60 shrink-0" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-card border border-border/70 rounded-lg px-5 py-12 text-center">
                    <p className="text-[14px] font-light text-muted-foreground">
                      {isHi ? 'कोई राज्य नहीं मिला' : 'No states match your search'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'assembly' && (
              <div className="bg-white dark:bg-card border border-border/70 rounded-lg overflow-hidden">
                {assembliesLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredAssemblies.length > 0 ? (
                  <ul className="divide-y divide-border/50 max-h-[min(60vh,520px)] overflow-y-auto">
                    {filteredAssemblies.map((assembly) => (
                      <li key={assembly._id}>
                        <button
                          type="button"
                          onClick={() => handleAssemblySelect(assembly)}
                          className="w-full flex items-center gap-4 px-4 sm:px-5 py-3.5 text-left hover:bg-[#fafafa] dark:hover:bg-muted/30 transition-colors group"
                        >
                          {assembly.constituencyNumber != null && (
                            <span className="shrink-0 w-9 text-[12px] font-light text-muted-foreground tabular-nums">
                              {assembly.constituencyNumber}
                            </span>
                          )}
                          <span className="flex-1 text-[14px] font-normal text-foreground leading-snug">
                            {getAssemblyName(assembly)}
                          </span>
                          <ChevronLeft className="h-3.5 w-3.5 rotate-180 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-5 py-16 text-center">
                    <Landmark className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-[14px] font-normal text-foreground">
                      {hasSearch
                        ? isHi
                          ? 'कोई विधानसभा नहीं मिली'
                          : 'No assemblies match your search'
                        : isHi
                          ? 'कोई विधानसभा डेटा नहीं'
                          : 'No assembly data found'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'booth' && selectedAssembly && (
              <div className="bg-white dark:bg-card border border-border/70 rounded-lg overflow-hidden">
                {membersLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredBooths.length > 0 ? (
                  <ul className="divide-y divide-border/50 max-h-[min(55vh,440px)] overflow-y-auto">
                    {filteredBooths.map((booth) => {
                      const count = assemblyMembers.filter((m) => m.booth === booth).length;
                      return (
                        <li key={booth}>
                          <button
                            type="button"
                            onClick={() => handleBoothSelect(booth)}
                            className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-left hover:bg-[#fafafa] dark:hover:bg-muted/30 transition-colors group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Vote className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                              <span className="text-[14px] font-normal text-foreground truncate">
                                {booth}
                              </span>
                            </div>
                            <span className="text-[12px] font-light text-muted-foreground shrink-0 ml-3">
                              {count} {isHi ? 'सदस्य' : 'members'}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="px-5 py-16 text-center">
                    <Vote className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-[14px] font-normal text-foreground mb-1">
                      {hasSearch
                        ? isHi
                          ? 'कोई बूथ नहीं मिला'
                          : 'No booths match your search'
                        : isHi
                          ? 'अभी कोई बूथ समिति नहीं'
                          : 'No booth committees yet'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'committee' && selectedBooth && (
              <div className="space-y-5">
                {boothIncharge && filteredMembers.some((m) => m._id === boothIncharge._id) && (
                  <div>
                    <h3 className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide mb-3">
                      {isHi ? 'बूथ प्रभारी' : 'Booth Incharge'}
                    </h3>
                    {renderMemberCard(boothIncharge, true)}
                  </div>
                )}
                {regularMembers.length > 0 ? (
                  <div>
                    {boothIncharge && filteredMembers.some((m) => m._id === boothIncharge._id) && (
                      <h3 className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide mb-3">
                        {isHi ? 'समिति सदस्य' : 'Committee Members'}
                      </h3>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {regularMembers.map((member) => renderMemberCard(member))}
                    </div>
                  </div>
                ) : !boothIncharge || !filteredMembers.some((m) => m._id === boothIncharge._id) ? (
                  <div className="bg-white dark:bg-card border border-border/70 rounded-lg px-5 py-16 text-center">
                    <Users className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-[14px] font-light text-muted-foreground">
                      {hasSearch
                        ? isHi
                          ? 'कोई सदस्य नहीं मिला'
                          : 'No members match your search'
                        : isHi
                          ? 'कोई सदस्य नहीं'
                          : 'No members found'}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
