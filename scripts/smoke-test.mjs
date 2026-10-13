/**
 * Automated smoke test for BLUE X LTD holding page
 */
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('--- BLUE X LTD SMOKE TESTS ---');

// 1. Verify index.html content
const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8');
assert(indexHtml.includes('BLUE X LTD | Construction, Facilities Management, Installation & Project Management'), 'Index title missing');
assert(indexHtml.includes('lang="en-GB"'), 'British English lang attribute missing');
assert(indexHtml.includes('HomeAndConstructionBusiness'), 'Schema.org structured data missing');
assert(indexHtml.includes('+447448162876'), 'Telephone missing in structured data');
assert(indexHtml.includes('bluexltd@yahoo.com'), 'Email missing in structured data');
assert(indexHtml.includes('Walsall'), 'Location missing in structured data');
assert(indexHtml.includes('The Niche In Professional Works'), 'Slogan missing in structured data');
console.log('✓ index.html SEO, Schema.org and British English verified');

// 2. Verify brand assets exist and are non-empty
const brandFiles = [
  'public/assets/brand/68296.jpg',
  'public/assets/brand/68296.svg',
  'public/assets/brand/68297.jpg',
  'public/assets/brand/68297.svg',
  'public/favicon.svg',
  'public/assets/brand/bxl-logo-mark.svg',
];

for (const file of brandFiles) {
  const stat = fs.statSync(path.resolve(file));
  assert(stat.size > 500, `Asset ${file} is unexpectedly small (${stat.size} bytes)`);
  console.log(`✓ Brand asset verified: ${file} (${stat.size} bytes)`);
}

// 3. Verify business config
import { BUSINESS_CONFIG, HANDOVER_AUDIT_CHECKLIST } from '../src/config/business.ts';
assert.strictEqual(BUSINESS_CONFIG.name, 'BLUE X LTD');
assert.strictEqual(BUSINESS_CONFIG.contact.phoneDisplay, '+44 7448 162876');
assert.strictEqual(BUSINESS_CONFIG.contact.emailDisplay, 'bluexltd@yahoo.com');
assert.strictEqual(BUSINESS_CONFIG.location.formatted, 'Walsall, West Midlands, England, United Kingdom');
assert.strictEqual(BUSINESS_CONFIG.slogan, 'The Niche In Professional Works');
assert(HANDOVER_AUDIT_CHECKLIST.length >= 7, 'Audit checklist incomplete');
console.log('✓ Business configuration integrity verified');

// 4. Verify future schema is modular and present
import { CONFIRMED_SERVICES, FUTURE_SITE_ROUTES } from '../src/future/fullSiteSchema.ts';
assert(CONFIRMED_SERVICES.length === 6, 'Must have 6 confirmed service pillars');
assert(FUTURE_SITE_ROUTES.length >= 8, 'Future route map must have comprehensive routes');
console.log('✓ Future full site schema ready for post-holding phase');

console.log('--- ALL SMOKE TESTS PASSED SUCCESSFULLY ---');
