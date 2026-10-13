import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const brandDir = path.resolve(process.cwd(), 'public/assets/brand');
fs.mkdirSync(brandDir, { recursive: true });

// 1. Header Artwork / 68296.svg
const headerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="50%" stop-color="#0047ba"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#0038a8"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="ovalCenter" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0043aa"/>
      <stop offset="100%" stop-color="#002b70"/>
    </linearGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#002060" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Clean background with architectural tone -->
  <rect width="800" height="320" fill="url(#bgGrad)"/>

  <!-- Architectural linework background sketch (echoing the supplied 68296.jpg asset) -->
  <g opacity="0.14" stroke="#003366" stroke-width="1.2" fill="none">
    <!-- House eaves and modern canopy structure -->
    <path d="M 120 280 L 120 170 L 260 90 L 400 90 L 400 280"/>
    <path d="M 230 110 L 430 110 L 450 130 L 210 130 Z"/>
    <path d="M 200 130 L 460 130 L 480 150 L 180 150 Z"/>
    <path d="M 150 170 L 420 170"/>
    <line x1="280" y1="170" x2="280" y2="280"/>
    <line x1="340" y1="170" x2="340" y2="280"/>
    <!-- Pergola rafters -->
    <line x1="220" y1="90" x2="250" y2="130"/>
    <line x1="260" y1="90" x2="290" y2="130"/>
    <line x1="300" y1="90" x2="330" y2="130"/>
    <line x1="340" y1="90" x2="370" y2="130"/>
    <line x1="380" y1="90" x2="410" y2="130"/>
    <!-- Foliage on left edge -->
    <path d="M 80 80 Q 95 65 110 85 Q 125 70 140 90 Q 155 80 160 105 Q 145 130 130 145 Q 115 160 95 150 Q 75 135 70 110 Z" fill="#003366" fill-opacity="0.04"/>
  </g>

  <!-- BXL Central Oval Logo Badge -->
  <g transform="translate(400, 92)">
    <!-- Outer concentric curved arcs/waves -->
    <ellipse cx="0" cy="0" rx="190" ry="76" fill="none" stroke="url(#ringGrad1)" stroke-width="5" stroke-dasharray="140 12 180 14"/>
    <ellipse cx="0" cy="0" rx="174" ry="67" fill="none" stroke="url(#ringGrad2)" stroke-width="4.5"/>
    <ellipse cx="0" cy="0" rx="156" ry="58" fill="none" stroke="#0284c7" stroke-width="3" opacity="0.8"/>
    <ellipse cx="0" cy="0" rx="142" ry="50" fill="none" stroke="#0038a8" stroke-width="4"/>

    <!-- Central Solid Blue Oval -->
    <ellipse cx="0" cy="0" rx="124" ry="43" fill="url(#ovalCenter)" filter="url(#subtleShadow)" stroke="#38bdf8" stroke-width="2"/>

    <!-- BXL Letters inside oval -->
    <text x="0" y="14" font-family="'Plus Jakarta Sans', 'Arial Black', Impact, sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="3" style="text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
      BXL
    </text>
  </g>

  <!-- "BLUE X LTD" Primary Brand Typography -->
  <!-- Note the prominent royal blue, sharp spacing -->
  <text x="400" y="222" font-family="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif" font-size="52" font-weight="900" fill="#0038a8" text-anchor="middle" letter-spacing="5">
    BLUE X LTD
  </text>

  <!-- Original Subtitle in Asset 1 -->
  <!-- "Building Services & Construction Management" -->
  <text x="400" y="262" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-size="22" font-weight="700" fill="#0f172a" text-anchor="middle" letter-spacing="1.2">
    Building Services &amp; Construction Management
  </text>
</svg>
`;

// 2. Footer Artwork / 68297.svg
// Includes Walsall location, phone, email, waving Union Jack, and "The Niche In Professional Works"
const footerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" width="900" height="380">
  <defs>
    <!-- Deep Royal Blue Top Bar Gradient -->
    <linearGradient id="footerBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#002159"/>
      <stop offset="45%" stop-color="#003899"/>
      <stop offset="100%" stop-color="#001d4d"/>
    </linearGradient>

    <!-- Union Jack fabric wave overlay filter -->
    <linearGradient id="waveLight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.35"/>
      <stop offset="18%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="35%" stop-color="#000000" stop-opacity="0.45"/>
      <stop offset="52%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="68%" stop-color="#000000" stop-opacity="0.38"/>
      <stop offset="85%" stop-color="#ffffff" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.45"/>
    </linearGradient>

    <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- SECTION 1: TOP CONTACT BAR (approx 150px height) -->
  <rect x="0" y="0" width="900" height="160" fill="url(#footerBlueGrad)"/>

  <!-- Left: Walsall, West Midlands Location Pin & Text -->
  <g transform="translate(42, 54)">
    <!-- Location Icon in White Circle -->
    <circle cx="28" cy="26" r="24" fill="#002b70" stroke="#38bdf8" stroke-width="2"/>
    <path d="M 28 14 C 22.5 14 18 18.5 18 24 C 18 31 28 39 28 39 C 28 39 38 31 38 24 C 38 18.5 33.5 14 28 14 Z M 28 27 C 26.3 27 25 25.7 25 24 C 25 22.3 26.3 21 28 21 C 29.7 21 31 22.3 31 24 C 31 25.7 29.7 27 28 27 Z" fill="#ffffff"/>
    
    <text x="64" y="20" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="19" font-weight="700" fill="#ffffff" letter-spacing="0.3">
      Walsall, West Midlands,
    </text>
    <text x="64" y="44" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="18" font-weight="600" fill="#e2e8f0" letter-spacing="0.3">
      England, United Kingdom
    </text>
  </g>

  <!-- Right: Phone & Email Contacts -->
  <g transform="translate(530, 36)">
    <!-- Phone Row -->
    <g transform="translate(0, 0)">
      <circle cx="20" cy="20" r="18" fill="#002b70" stroke="#38bdf8" stroke-width="1.8"/>
      <path d="M 15 13 C 14 13 13 14 13 15 C 13 22 18 27 25 27 C 26 27 27 26 27 25 L 25.5 22 C 25.2 21.5 24.5 21.3 24 21.6 L 22.8 22.3 C 21.3 21.3 20 20 19 18.5 L 19.7 17.3 C 20 16.8 19.8 16.1 19.3 15.8 L 16.3 14.3 C 15.9 14.1 15.4 14.1 15 14.3 Z" fill="#ffffff"/>
      <text x="50" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="800" fill="#ffffff" letter-spacing="0.6">
        +44 7448 162876
      </text>
    </g>

    <!-- Email Row with yellow tone pill outline as seen in 68297.jpg -->
    <g transform="translate(0, 48)">
      <circle cx="20" cy="20" r="18" fill="#002b70" stroke="#38bdf8" stroke-width="1.8"/>
      <path d="M 13 15 L 27 15 C 27.5 15 28 15.5 28 16 L 28 25 C 28 25.5 27.5 26 27 26 L 13 26 C 12.5 26 12 25.5 12 25 L 12 16 C 12 15.5 12.5 15 13 15 Z M 20 21 L 26 16.5 L 14 16.5 Z M 13.5 25 L 18.5 20.5 L 13.5 16.5 Z M 26.5 25 L 26.5 16.5 L 21.5 20.5 Z" fill="#ffffff"/>
      
      <!-- Styled container for email as shown in original artwork -->
      <rect x="46" y="2" width="280" height="35" rx="6" fill="#002566" stroke="#fef08a" stroke-width="1.2" opacity="0.95"/>
      <text x="58" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="18.5" font-weight="700" fill="#fef08a" letter-spacing="0.5">
        bluexltd@yahoo.com
      </text>
    </g>
  </g>

  <!-- SECTION 2: UNION JACK SILK BANNER WITH SLOGAN (y=160 to 380, height=220px) -->
  <g transform="translate(0, 160)">
    <clipPath id="flagClip">
      <rect x="0" y="0" width="900" height="220"/>
    </clipPath>

    <g clip-path="url(#flagClip)">
      <!-- Base Royal Navy Blue Field of Union Jack -->
      <rect width="900" height="220" fill="#012169"/>

      <!-- Diagonal St Andrew's White Crosses -->
      <path d="M 0 0 L 900 220 M 900 0 L 0 220" stroke="#ffffff" stroke-width="56"/>

      <!-- Diagonal St Patrick's Red Crosses (asymmetrical pinwheels) -->
      <path d="M 0 0 L 450 110" stroke="#c8102e" stroke-width="19"/>
      <path d="M 450 110 L 900 220" stroke="#c8102e" stroke-width="19" transform="translate(0, 10)"/>
      <path d="M 900 0 L 450 110" stroke="#c8102e" stroke-width="19"/>
      <path d="M 450 110 L 0 220" stroke="#c8102e" stroke-width="19" transform="translate(0, -10)"/>

      <!-- St George's Central White Cross -->
      <rect x="0" y="80" width="900" height="60" fill="#ffffff"/>
      <rect x="400" y="0" width="100" height="220" fill="#ffffff"/>

      <!-- St George's Central Red Cross -->
      <rect x="0" y="92" width="900" height="36" fill="#c8102e"/>
      <rect x="420" y="0" width="60" height="220" fill="#c8102e"/>

      <!-- Rippling silk drape shadow overlay for photographic cloth feel -->
      <rect width="900" height="220" fill="url(#waveLight)"/>
      <rect width="900" height="220" fill="#000000" opacity="0.22"/>

      <!-- Slogan Centered in Bold Condensed Typography -->
      <!-- "The Niche In Professional Works" -->
      <text x="450" y="128" font-family="'Outfit', 'Plus Jakarta Sans', Impact, 'Arial Black', sans-serif" font-size="46" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="1" filter="url(#textGlow)">
        The Niche In Professional Works
      </text>
    </g>
  </g>
</svg>
`;

// 3. Favicon SVG
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0047ba"/>
      <stop offset="100%" stop-color="#002060"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="#ffffff"/>
  <ellipse cx="50" cy="50" rx="46" ry="32" fill="none" stroke="#0284c7" stroke-width="3"/>
  <ellipse cx="50" cy="50" rx="38" ry="24" fill="url(#favGrad)" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="50" y="58" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">
    BXL
  </text>
</svg>
`;

// 4. Standalone BXL Emblem Logo Mark
const bxlLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160" width="320" height="160">
  <defs>
    <linearGradient id="bxlRing1" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="50%" stop-color="#0047ba"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="bxlCenter" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0043aa"/>
      <stop offset="100%" stop-color="#002b70"/>
    </linearGradient>
  </defs>
  <g transform="translate(160, 72)">
    <ellipse cx="0" cy="0" rx="148" ry="60" fill="none" stroke="url(#bxlRing1)" stroke-width="4.5" stroke-dasharray="110 10 140 10"/>
    <ellipse cx="0" cy="0" rx="132" ry="52" fill="none" stroke="#38bdf8" stroke-width="3.5"/>
    <ellipse cx="0" cy="0" rx="114" ry="42" fill="none" stroke="#0038a8" stroke-width="3"/>
    <ellipse cx="0" cy="0" rx="98" ry="34" fill="url(#bxlCenter)" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="0" y="11" font-family="'Plus Jakarta Sans', 'Arial Black', sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">
      BXL
    </text>
  </g>
  <text x="160" y="146" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="900" fill="#0038a8" text-anchor="middle" letter-spacing="2">
    BLUE X LTD
  </text>
</svg>
`;

async function buildAssets() {
  console.log('Writing brand vector SVGs...');
  fs.writeFileSync(path.join(brandDir, '68296.svg'), headerSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'header-artwork.svg'), headerSvg.trim());
  
  fs.writeFileSync(path.join(brandDir, '68297.svg'), footerSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'footer-artwork.svg'), footerSvg.trim());

  fs.writeFileSync(path.join(brandDir, 'bxl-logo-mark.svg'), bxlLogoSvg.trim());
  fs.writeFileSync(path.resolve(process.cwd(), 'public/favicon.svg'), faviconSvg.trim());

  console.log('Rendering high-resolution raster JPG / PNG versions with Sharp...');
  // 68296.jpg
  await sharp(Buffer.from(headerSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(brandDir, '68296.jpg'));
  
  // Also provide at root/public for direct fallback matching
  fs.copyFileSync(path.join(brandDir, '68296.jpg'), path.resolve(process.cwd(), 'public/68296.jpg'));
  fs.copyFileSync(path.join(brandDir, '68296.jpg'), path.resolve(process.cwd(), 'public/blue x logo.jpg'));

  // 68297.jpg
  await sharp(Buffer.from(footerSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(brandDir, '68297.jpg'));

  fs.copyFileSync(path.join(brandDir, '68297.jpg'), path.resolve(process.cwd(), 'public/68297.jpg'));
  fs.copyFileSync(path.join(brandDir, '68297.jpg'), path.resolve(process.cwd(), 'public/blue x footer.jpg'));

  // Social share card
  await sharp(Buffer.from(headerSvg))
    .resize(1200, 630, { fit: 'contain', background: '#ffffff' })
    .png()
    .toFile(path.join(brandDir, 'brand-share-preview.png'));

  console.log('All brand assets successfully built!');
}

buildAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
