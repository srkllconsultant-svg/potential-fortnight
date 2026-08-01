export interface SubTypeOption {
  id: string;
  label: string;
}

export interface DocumentMeta {
  id: string;
  name: string;
  description: string;
  requiresPropertyDetails: boolean;
  defaultParties: { sellerRole: string; purchaserRole: string };
  assetTypes: string[];
}

export interface CategoryMeta {
  id: string;
  name: string;
  iconName: string;
  description: string;
  documents: DocumentMeta[];
}

export interface DomainTaxonomy {
  id: 'legal' | 'creative';
  name: string;
  iconName: string;
  description: string;
  categories: CategoryMeta[];
}

// Master Categories Data matching the reference studio code
export const MASTER_TAXONOMY_CATEGORIES = {
  legal: [
    {
      id: 'real-estate',
      name: 'Real Estate & Land',
      iconName: 'Home',
      description: 'Property sales, land transfers, sale agreements, possession receipts, and partition deeds',
      documents: [
        'Sale Deed', 'Agreement of Sale', 'Agreement of Sale with Possession', 'Agreement to Sell', 
        'Conveyance Deed', 'Deed of Assignment', 'Deed of Cancellation', 'Deed of Confirmation', 
        'Deed of Exchange', 'Deed of Partition', 'Deed of Rectification', 'Deed of Release / Relinquishment', 
        'Deed of Transfer', 'Handing Over / Taking Over Letter', 'Maintenance Agreement', 
        'Possession Letter', 'Possession Receipt', 'Supplementary Deed'
      ]
    },
    {
      id: 'construction-infra',
      name: 'Construction & Infra',
      iconName: 'Construction',
      description: 'Joint developments, turnkey construction, architectural contracts, and EPC agreements',
      documents: [
        'Architect Agreement', 'Area Sharing Agreement', 'Building Contract Agreement', 
        'Collaboration Agreement', 'Construction Agreement', 'Consultant Agreement', 
        'Development Agreement', 'Development Agreement cum Irrevocable General Power of Attorney', 
        'EPC Contract', 'Joint Development Agreement (JDA)', 'Project Management Agreement', 
        'Redevelopment Agreement', 'Revenue Sharing Agreement', 'Structural Engineer Agreement', 'Turnkey Agreement'
      ]
    },
    {
      id: 'finance-banking',
      name: 'Finance & Banking',
      iconName: 'Banknote',
      description: 'Loan agreements, promissory notes, mortgages, personal guarantees, and charges',
      documents: [
        'Business Loan Agreement', 'Corporate Guarantee', 'Deed of Charge', 'Deed of Hypothecation', 
        'Demand Promissory Note', 'Equitable Mortgage Deed', 'Guarantee Agreement', 'Home Loan Agreement', 
        'Letter of Comfort', 'Loan Agreement', 'Mortgage Deed', 'Mortgage Deed (for Approvals)', 
        'Personal Guarantee', 'Personal Loan Agreement', 'Registered Mortgage Deed', 'Security Agreement', 'Simple Mortgage Deed'
      ]
    },
    {
      id: 'technology-it',
      name: 'Technology & IT',
      iconName: 'Code',
      description: 'SaaS terms, software licenses, privacy policies, DPAs, and development contracts',
      documents: [
        'Data Processing Agreement (DPA)', 'End User License Agreement (EULA)', 'Privacy Policy', 
        'SaaS Agreement', 'Service Level Agreement (SLA)', 'Software Development Agreement', 
        'Software Licensing Agreement', 'Website Terms & Conditions'
      ]
    },
    {
      id: 'corporate-commercial',
      name: 'Corporate & Commercial',
      iconName: 'Landmark',
      description: 'MOA, AOA, board resolutions, distribution, franchise, and corporate POAs',
      documents: [
        'Agency Agreement', 'Articles of Association (AOA)', 'Authorization Letter', 'Board Minutes', 
        'Board Resolution', 'Distribution Agreement', 'Franchise Agreement', 'Memorandum of Association (MOA)', 
        'Mutual NDA', 'Power of Attorney (Corporate)', 'Shareholder Resolution', 'Supplier Agreement', 'Vendor Agreement'
      ]
    },
    {
      id: 'employment-hr',
      name: 'Employment & HR',
      iconName: 'Briefcase',
      description: 'Offer letters, employment contracts, ESOPs, non-competes, and NDAs',
      documents: [
        'Appointment Letter', 'Code of Conduct', 'Confidentiality Agreement', 'Consultancy Agreement', 
        'Employee Stock Option Plan (ESOP)', 'Employment Agreement', 'Experience Certificate', 'Internship Agreement', 
        'Non-Compete Agreement', 'Non-Disclosure Agreement (NDA)', 'Non-Solicitation Agreement', 'Relieving Letter', 
        'Resignation Acceptance Letter', 'Retainer Agreement', 'Service Agreement', 'Termination Letter', 
        'Training Agreement', 'Work From Home Policy'
      ]
    },
    {
      id: 'lease-license',
      name: 'Lease & License',
      iconName: 'Building2',
      description: 'Commercial & residential leases, leave & license, sub-tenancy, and rental deeds',
      documents: [
        'Agreement for Sub-Tenancy', 'Commercial Lease Agreement', 'Lease Deed', 'Lease Renewal Agreement', 
        'Lease Termination Agreement', 'Leave and License Agreement', 'Rental Agreement', 
        'Residential Lease Agreement', 'Sub-Lease Deed', 'Tenancy Agreement'
      ]
    },
    {
      id: 'gift-succession',
      name: 'Gift & Succession',
      iconName: 'Gift',
      description: 'Gift deeds, wills, codicils, family settlements, and trust deeds',
      documents: [
        'Codicil to Will', 'Conditional Gift Deed', 'Family Arrangement Deed', 'Family Settlement Deed', 
        'Gift Deed', 'Gift Deed (for Approvals)', 'Legal Heir Declaration', 'Settlement Deed', 'Trust Deed', 'Will'
      ]
    },
    {
      id: 'personal-family',
      name: 'Personal & Family',
      iconName: 'User',
      description: 'Name change affidavits, pre-nuptials, custody, and marital contracts',
      documents: [
        'Child Custody Agreement', 'Maintenance Agreement', 'Marriage Contract', 
        'Mutual Consent Divorce Petition', 'Name Change Affidavit', 'Pre-nuptial Agreement'
      ]
    },
    {
      id: 'investment-funding',
      name: 'Investment & Funding',
      iconName: 'TrendingUp',
      description: 'MOUs, term sheets, joint ventures, partnership deeds, and share purchase contracts',
      documents: [
        'Asset Purchase Agreement', 'Investment Agreement', 'Joint Venture Agreement', 'Letter of Intent (LOI)', 
        'LLP Agreement', 'Memorandum of Understanding (MOU)', 'Partnership Deed', 'Share Purchase Agreement', 
        'Share Subscription Agreement', 'Shareholders Agreement', 'Term Sheet'
      ]
    },
    {
      id: 'govt-compliance',
      name: 'Govt & Compliance',
      iconName: 'ShieldCheck',
      description: 'Sworn affidavits, undertakings, NOCs, declarations, and approvals',
      documents: [
        'Affidavit', 'Agreement for Approvals', 'Application for Approval', 'Completion Certificate', 
        'Declaration', 'No Objection Certificate (NOC)', 'Occupancy Certificate', 'Possession Certificate', 
        'Power of Attorney for Liaison', 'Undertaking Letter'
      ]
    },
    {
      id: 'dispute-legal',
      name: 'Dispute & Legal',
      iconName: 'Gavel',
      description: 'Legal notices, arbitration contracts, settlement agreements, and compromise deeds',
      documents: [
        'Arbitration Agreement', 'Cancellation Deed', 'Compromise Deed', 'Exit Agreement', 
        'Legal Notice', 'Reply to Legal Notice', 'Settlement Agreement', 'Termination Agreement'
      ]
    }
  ],

  creative: [
    {
      id: 'film-production',
      name: 'Film Production',
      iconName: 'Film',
      description: 'Film financing, co-productions, line production, distribution, and assignment',
      documents: [
        'Associate Producer Agreement', 'Co-Production Agreement (Film/TV)', 'Completion Bond Agreement', 
        'Executive Producer Agreement', 'Film Assignment Agreement (All Rights)', 'Film Distribution Agreement', 
        'Film Exhibition Agreement', 'Film Financing Agreement', 'Film Production Agreement', 'Line Production Agreement'
      ]
    },
    {
      id: 'tv-digital',
      name: 'TV & Digital Content',
      iconName: 'Tv',
      description: 'OTT content licensing, reality show formats, broadcast, and serial production',
      documents: [
        'Channel Broadcast Agreement', 'Content Acquisition Agreement', 'Content Commissioning Agreement', 
        'OTT Platform Content License Agreement', 'Reality Show Format Agreement', 'Syndication Agreement', 
        'Television Serial Production Agreement', 'Web Series Production Agreement'
      ]
    },
    {
      id: 'artist-crew',
      name: 'Artist & Crew',
      iconName: 'Users2',
      description: 'Actor, director, writer, cinematographer, composer, and crew engagements',
      documents: [
        'Actor Agreement', 'Anchor / Host Agreement', 'Assistant Director Agreement', 'Background Artist Agreement', 
        'Child Artist Agreement', 'Choreographer Agreement', 'Cinematographer Agreement', 'Dialogue Writer Agreement', 
        'Director Agreement', 'Dubbing Artist Agreement', 'Editor Agreement', 'Lead Actor Exclusive Engagement Agreement', 
        'Lyricist Agreement', 'Music Director Agreement', 'Screenwriter Agreement', 'Supporting Artist Agreement', 'VFX / Animation Services Agreement'
      ]
    },
    {
      id: 'events-live',
      name: 'Events & Live',
      iconName: 'Ticket',
      description: 'Live performance contracts, event management, venue hire, and technical riders',
      documents: [
        'Event Management Agreement', 'Live Performance Contract', 'Technical Rider', 'Ticketing Agreement', 'Venue Hire Agreement'
      ]
    },
    {
      id: 'music-audio',
      name: 'Music & Audio',
      iconName: 'Music',
      description: 'Music publishing, master recording licenses, composer royalties, and sync licenses',
      documents: [
        'Composer Royalty Agreement', 'Master Rights License Agreement', 'Music Publishing Agreement', 
        'Music Rights Assignment Agreement', 'Singer Performance Agreement', 'Sound Recording Agreement', 'Synchronization License Agreement'
      ]
    },
    {
      id: 'creative-ip',
      name: 'Creative IP',
      iconName: 'FileText',
      description: 'Screenplay assignment, story rights, copyright transfer, and trademark deeds',
      documents: [
        'Adaptation Rights Agreement', 'Character Rights Agreement', 'Copyright Assignment Deed (Creative Works)', 
        'Format Rights Agreement', 'Moral Rights Waiver Agreement', 'Screenplay Assignment Agreement', 'Script Option Agreement', 'Story Rights Purchase Agreement', 'Trademark Assignment Agreement'
      ]
    },
    {
      id: 'marketing-brands',
      name: 'Marketing & Brands',
      iconName: 'Megaphone',
      description: 'Brand placements, artist endorsements, publicity, and promotion contracts',
      documents: [
        'Artist Endorsement Agreement', 'Brand Placement Agreement', 'Film Promotion Agreement', 
        'Product Placement Agreement', 'Publicity Management Agreement', 'Trailer & Teaser Release Agreement'
      ]
    },
    {
      id: 'digital-influencer',
      name: 'Digital & Influencer',
      iconName: 'Smartphone',
      description: 'Influencer collaborations, content creators, podcast production, and channel management',
      documents: [
        'Content Creator Agreement', 'Digital Monetization Agreement', 'Influencer Collaboration Agreement', 
        'Podcast Production Agreement', 'YouTube Channel Management Agreement'
      ]
    }
  ]
};

// SubType configurations based on Category Title
export const SUB_TYPE_CONFIGS: Record<string, { id: string; label: string }[]> = {
  "Real Estate & Land": [
    { id: "flat", label: "Flat / Apartment Unit" },
    { id: "plot", label: "Non-Agricultural Plot" },
    { id: "Land", label: "Agricultural Land / Farm" },
    { id: "house", label: "Independent House / Villa" },
    { id: "office", label: "Commercial Office Space" },
    { id: "shop", label: "Commercial Retail Shop" }
  ],
  "Finance & Banking": [
    { id: "vehicle", label: "Vehicle / Automobile" },
    { id: "machinery", label: "Industrial Machinery" },
    { id: "business", label: "Business Assets / Hypothecation" },
    { id: "personal", label: "Personal Financial Debt" }
  ],
  "Employment & HR": [
    { id: "senior", label: "Executive / C-Suite Officer" },
    { id: "general", label: "General Corporate Staff" },
    { id: "intern", label: "Trainee / Intern" },
    { id: "contractor", label: "Independent Consultant / Freelancer" }
  ],
  "Lease & License": [
    { id: "res_flat", label: "Residential Flat / Apartment" },
    { id: "comm_office", label: "Commercial Office / Workspace" },
    { id: "retail_store", label: "Retail Storefront / Showroom" },
    { id: "industrial_wh", label: "Industrial Warehouse / Factory" }
  ],
  "Film Production": [
    { id: "feature_film", label: "Feature Length Film" },
    { id: "short_film", label: "Short Film" },
    { id: "documentary", label: "Documentary Feature" }
  ],
  "TV & Digital Content": [
    { id: "web_series", label: "Web Series / OTT Original" },
    { id: "tv_serial", label: "Television Serial" },
    { id: "youtube_show", label: "YouTube / Digital Show" }
  ],
  "Artist & Crew": [
    { id: "lead_artist", label: "Lead / Main Cast" },
    { id: "supporting_artist", label: "Supporting Performer / Cameo" },
    { id: "key_crew", label: "Key Technical Crew / HOD" }
  ],
  "Investment & Funding": [
    { id: "equity", label: "Equity Shares Purchase" },
    { id: "mou_jv", label: "Strategic Joint Venture" },
    { id: "partnership", label: "Commercial Partnership" }
  ]
};

/**
 * Dynamic Party Role Inspector
 * Determines the party role names, required input fields, and single-party vs multi-party mode
 * depending on the chosen instrument name and category.
 */
export interface PartyRequirementProfile {
  mode: 'affidavit' | 'mou' | 'employment' | 'sale_deed' | 'lease' | 'loan' | 'poa' | 'will' | 'creative' | 'general';
  isSingleParty: boolean;
  firstPartyLabel: string;
  firstPartyRoleDefault: string;
  secondPartyLabel: string;
  secondPartyRoleDefault: string;
  description: string;
  fieldsRequired: {
    fatherSpouse: boolean;
    ageDob: boolean;
    idNumber: boolean;
    address: boolean;
    corporateCIN: boolean;
    authorizedSignatory: boolean;
    sharePercentage: boolean;
    oathPurpose?: boolean;
    designation?: boolean;
  };
}

export function getPartyProfile(docName: string, categoryName: string): PartyRequirementProfile {
  const d = docName.toLowerCase();
  const c = categoryName.toLowerCase();

  // 1. AFFIDAVIT / DECLARATION / UNDERTAKING / NOC
  if (
    d.includes('affidavit') || 
    d.includes('declaration') || 
    d.includes('undertaking') || 
    d.includes('no objection certificate') || 
    d.includes('noc') || 
    d.includes('completion certificate') || 
    d.includes('occupancy certificate') || 
    d.includes('possession certificate')
  ) {
    return {
      mode: 'affidavit',
      isSingleParty: true,
      firstPartyLabel: 'Deponent / Declarant (Person Swearing Oath)',
      firstPartyRoleDefault: 'Deponent / Declarant',
      secondPartyLabel: 'Verification Authority / Recipient (Optional)',
      secondPartyRoleDefault: 'Target Authority / Public',
      description: 'Affidavits require complete details for the Deponent taking the oath (Name, Father/Spouse Name, Age, Identification, and Residence Address).',
      fieldsRequired: {
        fatherSpouse: true,
        ageDob: true,
        idNumber: true,
        address: true,
        corporateCIN: false,
        authorizedSignatory: false,
        sharePercentage: false,
        oathPurpose: true
      }
    };
  }

  // 2. MEMORANDUM OF UNDERSTANDING (MOU) / JOINT VENTURE / PARTNERSHIP / COLLABORATION
  if (
    d.includes('memorandum of understanding') || 
    d.includes('mou') || 
    d.includes('joint venture') || 
    d.includes('partnership') || 
    d.includes('collaboration') || 
    d.includes('letter of intent') || 
    d.includes('llp agreement')
  ) {
    return {
      mode: 'mou',
      isSingleParty: false,
      firstPartyLabel: 'First Executing Party (Partner / Collaborator 1)',
      firstPartyRoleDefault: 'First Party / Partner 1',
      secondPartyLabel: 'Second Executing Party (Partner / Collaborator 2)',
      secondPartyRoleDefault: 'Second Party / Partner 2',
      description: 'MOUs and Joint Venture agreements focus on Entity Registered Name, CIN/LLPIN/PAN, Authorized Representative, Designation, and Profit/Equity Share %.',
      fieldsRequired: {
        fatherSpouse: true,
        ageDob: false,
        idNumber: true,
        address: true,
        corporateCIN: true,
        authorizedSignatory: true,
        sharePercentage: true
      }
    };
  }

  // 3. EMPLOYMENT / HR / APPOINTMENT / INTERNSHIP
  if (
    c.includes('employment') || 
    d.includes('employment') || 
    d.includes('appointment') || 
    d.includes('internship') || 
    d.includes('consultancy') || 
    d.includes('non-compete') || 
    d.includes('nda') || 
    d.includes('termination letter')
  ) {
    return {
      mode: 'employment',
      isSingleParty: false,
      firstPartyLabel: 'Employer / Company (First Party)',
      firstPartyRoleDefault: 'Employer / Organization',
      secondPartyLabel: 'Employee / Candidate / Consultant (Second Party)',
      secondPartyRoleDefault: 'Employee / Candidate',
      description: 'Requires Company CIN/GSTIN and Authorized Signatory for Employer, and Full Legal Name, Father Name, Age, ID Proof, and Address for Employee.',
      fieldsRequired: {
        fatherSpouse: true,
        ageDob: true,
        idNumber: true,
        address: true,
        corporateCIN: true,
        authorizedSignatory: true,
        sharePercentage: false,
        designation: true
      }
    };
  }

  // 4. LEASE / RENTAL / TENANCY / LEAVE AND LICENSE
  if (
    c.includes('lease') || 
    d.includes('lease') || 
    d.includes('rental') || 
    d.includes('tenancy') || 
    d.includes('leave and license')
  ) {
    return {
      mode: 'lease',
      isSingleParty: false,
      firstPartyLabel: 'Property Owner / Landlord (Lessor / Licensor)',
      firstPartyRoleDefault: 'Lessor / Licensor',
      secondPartyLabel: 'Tenant / Occupant (Lessee / Licensee)',
      secondPartyRoleDefault: 'Lessee / Licensee',
      description: 'Specify Landlord and Tenant identities, ID Card Numbers, and official communications address.',
      fieldsRequired: {
        fatherSpouse: true,
        ageDob: true,
        idNumber: true,
        address: true,
        corporateCIN: true,
        authorizedSignatory: true,
        sharePercentage: false
      }
    };
  }

  // 5. LOAN / MORTGAGE / PROMISSORY NOTE / GUARANTEE
  if (
    c.includes('finance') || 
    d.includes('loan') || 
    d.includes('mortgage') || 
    d.includes('promissory') || 
    d.includes('guarantee') || 
    d.includes('hypothecation')
  ) {
    return {
      mode: 'loan',
      isSingleParty: false,
      firstPartyLabel: 'Lender / Financier / Creditor (First Party)',
      firstPartyRoleDefault: 'Lender / Creditor',
      secondPartyLabel: 'Borrower / Debtor / Mortgagor (Second Party)',
      secondPartyRoleDefault: 'Borrower / Debtor',
      description: 'Captures Lender details and Borrower financial identity proofs.',
      fieldsRequired: {
        fatherSpouse: true,
        ageDob: true,
        idNumber: true,
        address: true,
        corporateCIN: true,
        authorizedSignatory: true,
        sharePercentage: false
      }
    };
  }

  // 6. POWER OF ATTORNEY (GPA / SPA)
  if (d.includes('power of attorney') || d.includes('poa') || d.includes('gpa') || d.includes('spa')) {
    return {
      mode: 'poa',
      isSingleParty: false,
      firstPartyLabel: 'Principal / Executant (Person Granting Power)',
      firstPartyRoleDefault: 'Principal (Grantor)',
      secondPartyLabel: 'Appointed Attorney / Agent (Person Receiving Power)',
      secondPartyRoleDefault: 'Attorney (Grantee)',
      description: 'Details of Principal giving authorization and Attorney holding power of attorney.',
      fieldsRequired: {
        fatherSpouse: true,
        ageDob: true,
        idNumber: true,
        address: true,
        corporateCIN: true,
        authorizedSignatory: true,
        sharePercentage: false
      }
    };
  }

  // 7. CREATIVE / FILM / ENTERTAINMENT / ARTIST / CREW
  if (
    c.includes('film') || 
    c.includes('artist') || 
    c.includes('tv') || 
    c.includes('music') || 
    c.includes('creative') || 
    c.includes('digital')
  ) {
    return {
      mode: 'creative',
      isSingleParty: false,
      firstPartyLabel: 'Production House / Studio / Producer (First Party)',
      firstPartyRoleDefault: 'Production Studio / Producer',
      secondPartyLabel: 'Artist / Talent / Director / Writer / Performer (Second Party)',
      secondPartyRoleDefault: 'Artist / Talent / Performer',
      description: 'Captures Production Studio/Company Registration and Artist/Performer Legal Name, ID, Address, and Engagement Scope.',
      fieldsRequired: {
        fatherSpouse: true,
        ageDob: true,
        idNumber: true,
        address: true,
        corporateCIN: true,
        authorizedSignatory: true,
        sharePercentage: true
      }
    };
  }

  // 8. WILL / TRUST / SUCCESSION
  if (d.includes('will') || d.includes('codicil') || d.includes('trust deed') || d.includes('legal heir')) {
    return {
      mode: 'will',
      isSingleParty: false,
      firstPartyLabel: 'Testator / Settlor (Maker of Will / Trust)',
      firstPartyRoleDefault: 'Testator (Will Maker)',
      secondPartyLabel: 'Executor / Primary Beneficiary / Trustee',
      secondPartyRoleDefault: 'Executor / Beneficiary',
      description: 'Testator identity details and Executor/Trustee names.',
      fieldsRequired: {
        fatherSpouse: true,
        ageDob: true,
        idNumber: true,
        address: true,
        corporateCIN: false,
        authorizedSignatory: false,
        sharePercentage: true
      }
    };
  }

  // DEFAULT / REAL ESTATE SALE DEED / CONVEYANCE
  return {
    mode: 'sale_deed',
    isSingleParty: false,
    firstPartyLabel: 'First Party / Vendor / Seller (Transferor)',
    firstPartyRoleDefault: 'Seller / Vendor',
    secondPartyLabel: 'Second Party / Vendee / Purchaser (Transferee)',
    secondPartyRoleDefault: 'Purchaser / Vendee',
    description: 'Requires full identification, tax numbers, and addresses for all Executants.',
    fieldsRequired: {
      fatherSpouse: true,
      ageDob: true,
      idNumber: true,
      address: true,
      corporateCIN: true,
      authorizedSignatory: true,
      sharePercentage: true
    }
  };
}
