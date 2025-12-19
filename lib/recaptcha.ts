// Get reCAPTCHA keys from: https://www.google.com/recaptcha/admin

export const RECAPTCHA_CONFIG = {
  // production keys
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  secretKey: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY || '',
  actions: {
    contact: 'contact_form',
    join: 'join_form',
    register: 'register_form',
    inquire: 'inquire_form',
    download: 'download_form',
  },
} as const

// Validation function
export const validateRecaptchaConfig = () => {
  if (!RECAPTCHA_CONFIG.siteKey) {
    console.warn('reCAPTCHA site key is not configured. يرجى إضافة NEXT_PUBLIC_RECAPTCHA_SITE_KEY في متغيرات البيئة.')
    return false
  }
  
  // Basic format validation - reCAPTCHA site keys are typically 40 characters
  if (RECAPTCHA_CONFIG.siteKey.length < 20) {
    console.warn('reCAPTCHA site key appears to be invalid (too short). يرجى التحقق من NEXT_PUBLIC_RECAPTCHA_SITE_KEY.')
    return false
  }
  
  return true
}

// Check if site key format is valid
export const isValidSiteKeyFormat = (key: string): boolean => {
  if (!key || key.trim() === '') return false
  // reCAPTCHA v2 site keys are typically 40 characters, v3 are also around 40
  // This is a basic check - actual validation happens on Google's servers
  return key.length >= 20 && key.length <= 200
}
