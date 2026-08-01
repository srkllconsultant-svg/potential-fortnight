import { PresetTemplate } from '../types';

export const SAMPLE_PRESETS: PresetTemplate[] = [
  {
    id: 'preset-land-sale-india',
    name: 'Sale Deed for Land (Pune, Maharashtra, India)',
    description: 'Land sale conveyance deed with Khasra boundaries, 2 sellers, 2 purchasers, and 2 cheque payments under Maharashtra Stamp Act.',
    data: {
      industry: 'real-estate',
      category: 'property-transfer',
      documentType: 'sale-deed-land',
      assetType: 'Agricultural Land',
      jurisdiction: {
        country: 'India',
        state: 'Maharashtra',
        city: 'Pune',
        localityType: 'Rural',
        subRegistrarArea: 'Haveli Sub-Registrar Office No. 4, Haveli Pune',
        governingLawOverride: 'Transfer of Property Act 1882, Indian Registration Act 1908 & Maharashtra Stamp Act'
      },
      parties: [
        {
          id: 'seller-1',
          partyRole: 'Seller',
          entityType: 'Individual',
          fullName: 'Rameshchandra Pandurang Kulkarni',
          fatherSpouseName: 'Late Pandurang Kulkarni',
          ageDob: '58 Years',
          idType: 'Aadhaar',
          idNumber: '8492-1029-4821',
          address: 'Flat No 402, Shivneri Heights, FC Road, Shivajinagar, Pune 411005, Maharashtra',
          email: 'ramesh.kulkarni@gmail.com',
          phone: '+91 98220 11223',
          sharePercentage: 50
        },
        {
          id: 'seller-2',
          partyRole: 'Seller',
          entityType: 'Individual',
          fullName: 'Sujata Rameshchandra Kulkarni',
          fatherSpouseName: 'Rameshchandra Kulkarni',
          ageDob: '52 Years',
          idType: 'PAN',
          idNumber: 'ABCPK1290R',
          address: 'Flat No 402, Shivneri Heights, FC Road, Shivajinagar, Pune 411005, Maharashtra',
          email: 'sujata.kulkarni@gmail.com',
          phone: '+91 98220 11224',
          sharePercentage: 50
        },
        {
          id: 'buyer-1',
          partyRole: 'Purchaser',
          entityType: 'Individual',
          fullName: 'Vikramaditya Sunil Bhosale',
          fatherSpouseName: 'Sunil R. Bhosale',
          ageDob: '36 Years',
          idType: 'Aadhaar',
          idNumber: '9210-4821-3091',
          address: 'Plot 88, Baner Road, Baner, Pune 411045, Maharashtra',
          email: 'vikram.bhosale@outlook.com',
          phone: '+91 98900 44556',
          sharePercentage: 50
        },
        {
          id: 'buyer-2',
          partyRole: 'Purchaser',
          entityType: 'Company',
          fullName: 'Apex Agri Ventures Private Limited',
          idType: 'Corporate Registration / CIN',
          idNumber: 'U01110PN2021PTC198421',
          address: 'Suite 201, Commercial Complex, Hinjewadi Phase 1, Pune 411057, Maharashtra',
          authorizedSignatoryName: 'Anand Vardhan Sharma',
          authorizedSignatoryDesignation: 'Director',
          email: 'legal@apexagri.in',
          phone: '+91 020 6711 2200',
          sharePercentage: 50
        }
      ],
      propertyDetails: {
        propertyType: 'Agricultural & Non-Agricultural Plot',
        surveyNumber: 'Gat No. 142 / Hissa No. 2B (Khata No. 894)',
        totalArea: '2.5',
        areaUnit: 'acres',
        address: 'Village Wagholi, Taluka Haveli, District Pune, Maharashtra 412207',
        boundaries: {
          north: 'Adjacent Gat No. 143 owned by Shri Suresh Jadhav',
          south: '12-Meter Wide Public PWD Village Approach Road',
          east: 'Perennial Irrigation Canal & Gat No. 142/2A',
          west: 'Gat No. 141 owned by M/s Sahyadri Agro Farms'
        },
        revenueVillage: 'Wagholi',
        districtCounty: 'Pune District',
        registrationSubRegistrarOffice: 'Haveli Sub-Registrar Office IV, Pune'
      },
      financialTerms: {
        totalConsideration: 12500000, // 1.25 Cr INR
        currency: 'INR',
        tokenAmountPaid: 2500000,
        stampDutyResponsibility: 'Purchaser',
        paymentSchedule: [
          {
            id: 'pay-1',
            mode: 'Bank Transfer (RTGS/NEFT)',
            referenceNumber: 'HDFCR52026071500912',
            date: '2026-07-15',
            bankName: 'HDFC Bank Ltd, Baner Branch',
            amount: 2500000,
            notes: 'Advance Earnest Money / Token Payment paid at Agreement to Sale'
          },
          {
            id: 'pay-2',
            mode: 'Cheque',
            referenceNumber: 'Cheque No. 000412',
            date: '2026-08-01',
            bankName: 'ICICI Bank Ltd, Kothrud Branch',
            amount: 10000000,
            notes: 'Final Balance Sale Consideration handed over at execution before Sub-Registrar'
          }
        ]
      },
      witnesses: [
        {
          id: 'wit-1',
          fullName: 'Ganesh Devidas Pawar',
          fatherSpouseName: 'Devidas Pawar',
          idNumber: 'PAN: AFGPP4812L / Aadhaar: 4102-9981-2210',
          address: 'At Post Wagholi, Taluka Haveli, District Pune 412207'
        },
        {
          id: 'wit-2',
          fullName: 'Priya Rajesh Deshmukh',
          fatherSpouseName: 'Rajesh Deshmukh',
          idNumber: 'Aadhaar: 7721-3091-8842',
          address: 'Flat 12, Sahakar Nagar, Pune 411009'
        }
      ],
      possessionDate: '2026-08-01',
      governingCourtJurisdiction: 'Civil Courts at Pune, Maharashtra',
      arbitrationClause: true,
      indemnityClause: true,
      customClauses: [
        {
          id: 'cc-1',
          title: 'Encumbrance & Clear Title Guarantee',
          content: 'The Sellers explicitly covenant and warrant that the Scheduled Property is completely free from all mortgages, liens, charges, litigations, attachments, government dues, or boundary disputes.',
          isMandatory: true
        },
        {
          id: 'cc-2',
          title: 'Immediate Physical Vacant Possession',
          content: 'The Sellers have handed over peaceful, quiet, and unencumbered physical possession of the Scheduled Property along with original title documents, revenue 7/12 extract, and tax receipts to the Purchasers today upon receipt of full consideration.'
        }
      ],
      languageStyle: 'Formal Legal Standard'
    }
  },
  {
    id: 'preset-commercial-lease-usa',
    name: 'Commercial Lease Agreement (San Francisco, CA, USA)',
    description: 'Commercial office lease with landlord/tenant company details, security deposit, California Civil Code compliance, and rent escalation.',
    data: {
      industry: 'real-estate',
      category: 'leases-tenancy',
      documentType: 'commercial-lease',
      assetType: 'Commercial Office Space',
      jurisdiction: {
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        localityType: 'Urban',
        subRegistrarArea: 'San Francisco County Recorder',
        governingLawOverride: 'State of California Civil Code & San Francisco Commercial Code'
      },
      parties: [
        {
          id: 'p-1',
          partyRole: 'Lessor',
          entityType: 'Company',
          fullName: 'Golden Gate Properties LLC',
          idType: 'Tax ID / EIN',
          idNumber: '94-3829102',
          address: '500 Market Street, Suite 1200, San Francisco, CA 94105',
          authorizedSignatoryName: 'Robert M. Sterling',
          authorizedSignatoryDesignation: 'Managing Member',
          email: 'leasing@goldengateprops.com',
          phone: '+1 (415) 555-0199'
        },
        {
          id: 'p-2',
          partyRole: 'Lessee',
          entityType: 'Company',
          fullName: 'Nexus AI Technologies Inc.',
          idType: 'Corporate Registration / CIN',
          idNumber: 'C4829103 (Delaware Inc)',
          address: '100 Montgomery St, Floor 8, San Francisco, CA 94104',
          authorizedSignatoryName: 'Elena Vance',
          authorizedSignatoryDesignation: 'Chief Executive Officer',
          email: 'legal@nexusai.io',
          phone: '+1 (415) 555-0144'
        }
      ],
      propertyDetails: {
        propertyType: 'Commercial Office Space',
        surveyNumber: 'Parcel ID / Assessor Parcel No. 0321-008',
        totalArea: '4,500',
        areaUnit: 'sq.ft',
        address: 'Suite 800, 350 California Street, San Francisco, CA 94104',
        boundaries: {
          north: 'Building Elevator Shaft & Common Corridor',
          south: 'Exterior Glass Curtain Wall Facing California St',
          east: 'Suite 802 Occupied by Pacific Legal Group',
          west: 'Fire Escape Stairwell & Utility Closet'
        }
      },
      financialTerms: {
        totalConsideration: 225000, // Annual Rent USD
        currency: 'USD',
        tokenAmountPaid: 37500, // Security Deposit + First Month Rent
        stampDutyResponsibility: 'Shared 50:50',
        paymentSchedule: [
          {
            id: 'pay-sf-1',
            mode: 'Wire Transfer',
            referenceNumber: 'WIRE-20260801-SF991',
            date: '2026-08-01',
            bankName: 'Silicon Valley Bank / First Republic',
            amount: 18750,
            notes: 'First Month Rent for August 2026'
          },
          {
            id: 'pay-sf-2',
            mode: 'Wire Transfer',
            referenceNumber: 'WIRE-20260801-DEP01',
            date: '2026-08-01',
            bankName: 'Silicon Valley Bank',
            amount: 18750,
            notes: 'Security Deposit Held in Escrow Account'
          }
        ]
      },
      witnesses: [
        {
          id: 'w-sf-1',
          fullName: 'David K. Miller',
          fatherSpouseName: 'Arthur Miller',
          idNumber: 'CA DL: S8492019',
          address: '1201 Pine St, San Francisco, CA 94109'
        },
        {
          id: 'w-sf-2',
          fullName: 'Sarah Jenkins',
          fatherSpouseName: 'Thomas Jenkins',
          idNumber: 'CA DL: N9102834',
          address: '450 Sutter St, San Francisco, CA 94108'
        }
      ],
      possessionDate: '2026-09-01',
      governingCourtJurisdiction: 'Superior Court of California, County of San Francisco',
      arbitrationClause: true,
      indemnityClause: true,
      customClauses: [
        {
          id: 'sf-c1',
          title: '3% Annual Base Rent Escalation',
          content: 'Base Monthly Rent shall increase by three percent (3.0%) on each anniversary of the Lease Commencement Date.'
        }
      ],
      languageStyle: 'Formal Legal Standard'
    }
  },
  {
    id: 'preset-bilateral-nda-uk',
    name: 'Mutual NDA Agreement (London, UK)',
    description: 'Bilateral non-disclosure & trade secret protection agreement governed by English Law & UK Courts.',
    data: {
      industry: 'corporate-commercial',
      category: 'confidentiality-ip',
      documentType: 'nda-bilateral',
      assetType: 'Proprietary Tech Code & Commercial Strategy',
      jurisdiction: {
        country: 'United Kingdom',
        state: 'England & Wales',
        city: 'London',
        localityType: 'Urban',
        governingLawOverride: 'Laws of England and Wales & Contracts (Rights of Third Parties) Act 1999'
      },
      parties: [
        {
          id: 'uk-p1',
          partyRole: 'First Party',
          entityType: 'Company',
          fullName: 'Quantum Horizon Systems Ltd',
          idType: 'Corporate Registration / CIN',
          idNumber: 'Company Reg No. 11928341 (UK Companies House)',
          address: '100 Bishopsgate, London EC2N 4AG, United Kingdom',
          authorizedSignatoryName: 'Dr. Alistair Finch',
          authorizedSignatoryDesignation: 'Chief Technology Officer',
          email: 'legal@quantumhorizon.co.uk',
          phone: '+44 20 7946 0912'
        },
        {
          id: 'uk-p2',
          partyRole: 'Second Party',
          entityType: 'Company',
          fullName: 'Thames Capital Partners LLP',
          idType: 'Corporate Registration / CIN',
          idNumber: 'LLP Reg No. OC389201',
          address: '25 Bank Street, Canary Wharf, London E14 5JP, United Kingdom',
          authorizedSignatoryName: 'Victoria Sterling',
          authorizedSignatoryDesignation: 'Senior Partner',
          email: 'compliance@thamescap.com',
          phone: '+44 20 7946 0880'
        }
      ],
      financialTerms: {
        totalConsideration: 0,
        currency: 'GBP',
        stampDutyResponsibility: 'As per Local Act',
        paymentSchedule: []
      },
      witnesses: [
        {
          id: 'w-uk-1',
          fullName: 'Oliver Wright',
          fatherSpouseName: 'George Wright',
          idNumber: 'UK Passport: 502910283',
          address: '14 Fleet Street, London EC4Y 1AA'
        },
        {
          id: 'w-uk-2',
          fullName: 'Charlotte Higgins',
          fatherSpouseName: 'Edward Higgins',
          idNumber: 'UK Passport: 609218201',
          address: '88 High Holborn, London WC1V 6NX'
        }
      ],
      governingCourtJurisdiction: 'High Court of Justice in London, England',
      arbitrationClause: true,
      indemnityClause: true,
      customClauses: [
        {
          id: 'uk-c1',
          title: '3-Year Non-Disclosure Duration',
          content: 'Confidentiality obligations under this Agreement shall remain in full force and effect for a period of three (3) years from the Effective Date hereof.'
        }
      ],
      languageStyle: 'Formal Legal Standard'
    }
  }
];
