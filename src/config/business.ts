/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusinessDetails } from '../types/index.ts';

export const BUSINESS_CONFIG: BusinessDetails = {
  name: 'BLUE X LTD',
  legalStatus: 'Private Limited Company (England & Wales)',
  primaryDescriptor: 'Building Services and Development Consultant',
  serviceDescriptor: 'Construction, Installation & Project Management',
  artworkLegacyDescriptor: 'Building Services & Construction Management',
  slogan: 'The Niche In Professional Works',
  location: {
    city: 'Walsall',
    county: 'West Midlands',
    country: 'England',
    sovereignState: 'United Kingdom',
    formatted: 'Walsall, West Midlands, England, United Kingdom',
  },
  contact: {
    phoneDisplay: '+44 7448 162876',
    phoneHref: 'tel:+447448162876',
    emailDisplay: 'bluexltd@yahoo.com',
    emailHref: 'mailto:bluexltd@yahoo.com',
  },
  assets: {
    headerLogo: '/assets/brand/68296.jpg',
    headerVector: '/assets/brand/68296.svg',
    footerArtwork: '/assets/brand/68297.jpg',
    footerVector: '/assets/brand/68297.svg',
    markOnlyVector: '/assets/brand/bxl-logo-mark.svg',
    shareCard: '/assets/brand/brand-share-preview.png',
  },
} as const;

/**
 * Audit checklist of missing legal and business information for owner review.
 * Per project instructions, we never fabricate details that have not been provided.
 */
export const HANDOVER_AUDIT_CHECKLIST = [
  {
    category: 'Legal & Company Registration',
    item: 'Registered Office Address',
    status: 'Pending Confirmation',
    note: 'Trading location confirmed as Walsall, West Midlands. Companies House registered office address required prior to full commercial trading disclosures.',
  },
  {
    category: 'Legal & Company Registration',
    item: 'Company Registration Number (CRN)',
    status: 'Pending Confirmation',
    note: 'Required under The Company, Limited Liability Partnership and Business (Names and Trading Disclosures) Regulations 2015.',
  },
  {
    category: 'Legal & Company Registration',
    item: 'VAT Registration Number',
    status: 'Pending Confirmation',
    note: 'Required on business website if registered for Value Added Tax in the UK.',
  },
  {
    category: 'Operations',
    item: 'Office Opening Hours',
    status: 'Pending Confirmation',
    note: 'Not published in initial holding release to avoid setting inaccurate visitor expectations.',
  },
  {
    category: 'Industry & Compliance',
    item: 'Trade Accreditations & Memberships',
    status: 'Pending Confirmation',
    note: 'E.g., CIOB, RICS, SafeContractor, CHAS, FMB, or Gas Safe. Left unstated until formal certificates provided.',
  },
  {
    category: 'Insurance',
    item: 'Public & Employers’ Liability Insurance',
    status: 'Pending Confirmation',
    note: 'Policy details, indemnity limits, and insurer reference to be confirmed before full portfolio launch.',
  },
  {
    category: 'Live Chat Provider',
    item: 'Human Support Chat Account & Agent Seats',
    status: 'Configuration Interface Deployed',
    note: 'Human support widget architecture deployed with real business agent inbox forwarding. Production provider API/Widget ID (e.g. Crisp, Tawk, or LiveChat) ready for one-step activation.',
  },
  {
    category: 'Digital Assets',
    item: 'High-Resolution Vector Master (.ai / .eps / .svg)',
    status: 'SVG Generated from Supplied JPG',
    note: 'Faithful responsive web vector generated. Master vector source files from brand designer recommended for large print formats.',
  },
] as const;
