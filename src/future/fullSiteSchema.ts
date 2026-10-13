/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FUTURE FULL WEBSITE ARCHITECTURE
 * Structured models and route schemas prepared for post-holding release expansion.
 * Do not publish unfinished pages to public navigation until content and photography are approved.
 */

export interface NavRoute {
  readonly id: string;
  readonly label: string;
  readonly path: string;
  readonly isPublishedInHolding: boolean;
}

export const FUTURE_SITE_ROUTES: readonly NavRoute[] = [
  { id: 'home', label: 'Home', path: '/', isPublishedInHolding: true },
  { id: 'about', label: 'About BLUE X LTD', path: '/about', isPublishedInHolding: false },
  { id: 'building-services', label: 'Building Services', path: '/services/building', isPublishedInHolding: false },
  { id: 'development-consultancy', label: 'Development Consultancy', path: '/services/consultancy', isPublishedInHolding: false },
  { id: 'construction', label: 'Construction', path: '/services/construction', isPublishedInHolding: false },
  { id: 'installation', label: 'Installation', path: '/services/installation', isPublishedInHolding: false },
  { id: 'project-management', label: 'Project Management', path: '/services/project-management', isPublishedInHolding: false },
  { id: 'portfolio', label: 'Projects & Portfolio', path: '/projects', isPublishedInHolding: false },
  { id: 'quote', label: 'Request a Quote', path: '/request-quote', isPublishedInHolding: false },
  { id: 'contact', label: 'Contact', path: '/contact', isPublishedInHolding: false },
] as const;

export interface ServiceDetail {
  readonly id: string;
  readonly title: string;
  readonly brief: string;
  readonly capabilities: readonly string[];
}

export const CONFIRMED_SERVICES: readonly ServiceDetail[] = [
  {
    id: 'building-services',
    title: 'Building Services',
    brief: 'Mechanical, electrical, public health installations and structural building systems engineered for performance and compliance.',
    capabilities: ['Mechanical & HVAC Integration', 'Electrical Distribution & Lighting', 'Public Health & Drainage', 'Facilities Optimization'],
  },
  {
    id: 'development-consultancy',
    title: 'Development Consultancy',
    brief: 'Strategic guidance on land acquisition, development feasibility, planning advisory, and construction viability across England.',
    capabilities: ['Feasibility Appraisals', 'Planning & Regulatory Advisory', 'Value Engineering', 'Development Programming'],
  },
  {
    id: 'construction',
    title: 'Construction',
    brief: 'Principal contracting, structural works, conversions, and bespoke commercial/residential builds delivered to rigorous safety standards.',
    capabilities: ['New Build Construction', 'Structural Extensions & Conversions', 'Civil & Groundworks', 'Turnkey Contracting'],
  },
  {
    id: 'installation',
    title: 'Installation',
    brief: 'Mechanical, electrical, plumbing, HVAC, and specialised building systems installation delivered to rigorous engineering standards.',
    capabilities: ['Mechanical & HVAC Systems Installation', 'Electrical Installations & Fit-Outs', 'Plumbing & Public Health Installation', 'Structural Systems & Plant Equipment'],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    brief: 'End-to-end procurement, program scheduling, cost control, site supervision, and contractual administration.',
    capabilities: ['Client Representative & Employer Agent', 'Procurement & Contract Administration', 'Schedule & Risk Management', 'Quality & Health and Safety Oversight'],
  },
] as const;
