/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BusinessDetails {
  readonly name: string;
  readonly legalStatus: string;
  readonly primaryDescriptor: string;
  readonly serviceDescriptor: string;
  readonly artworkLegacyDescriptor: string;
  readonly slogan: string;
  readonly location: {
    readonly city: string;
    readonly county: string;
    readonly country: string;
    readonly sovereignState: string;
    readonly formatted: string;
  };
  readonly contact: {
    readonly phoneDisplay: string;
    readonly phoneHref: string;
    readonly emailDisplay: string;
    readonly emailHref: string;
  };
  readonly assets: {
    readonly headerLogo: string;
    readonly headerVector: string;
    readonly footerArtwork: string;
    readonly footerVector: string;
    readonly markOnlyVector: string;
    readonly shareCard: string;
  };
}

export type CookieCategory = 'necessary' | 'chat' | 'analytics';

export interface CookiePreferences {
  necessary: boolean;
  chat: boolean;
  analytics: boolean;
  consentedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'visitor' | 'business';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatEnquiryForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
  gdprConsent: boolean;
}
