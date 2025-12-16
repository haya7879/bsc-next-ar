"use client";

import React, { useEffect, useRef, useId } from "react";
import { RECAPTCHA_CONFIG, isValidSiteKeyFormat } from "@/lib/recaptcha";

declare global {
  interface Window {
    grecaptcha: any;
    enableSubmitButton: () => void;
    disableSubmitButton: () => void;
    ___grecaptcha_cfg?: any;
  }
}

interface ReCaptchaProps {
  onVerify?: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  action?: string;
}

export default function ReCaptcha({
  onVerify,
  onExpire,
  onError,
  action,
}: ReCaptchaProps) {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const recaptchaId = useId();
  const callbacksRef = useRef({ onVerify, onExpire, onError });
  const isRenderedRef = useRef(false);

  // Update callbacks ref when they change
  React.useEffect(() => {
    callbacksRef.current = { onVerify, onExpire, onError };
  }, [onVerify, onExpire, onError]);

  useEffect(() => {
    // Set up global callbacks first
    window.enableSubmitButton = () => {
      const submitButtons = document.querySelectorAll('button[type="submit"]');
      submitButtons.forEach((btn) => {
        (btn as HTMLButtonElement).disabled = false;
      });
    };

    window.disableSubmitButton = () => {
      const submitButtons = document.querySelectorAll('button[type="submit"]');
      submitButtons.forEach((btn) => {
        (btn as HTMLButtonElement).disabled = true;
      });
    };

    // Initially disable submit buttons
    window.disableSubmitButton();

    // Set up error listener for reCAPTCHA errors
    const handleRecaptchaError = (event: ErrorEvent) => {
      // Check if this is a reCAPTCHA error
      if (
        event.message &&
        (event.message.includes('recaptcha') ||
         event.message.includes('Error in protected function') ||
         (event.filename && event.filename.includes('recaptcha')))
      ) {
        // Log a more helpful error message
        console.warn("reCAPTCHA error detected. This usually means:", {
          message: event.message,
          possibleCauses: [
            "Invalid or missing site key",
            "Domain not registered in reCAPTCHA admin console",
            "Network connectivity issues"
          ]
        });
        // Don't prevent the error, but provide context
        // The error-callback will handle user-facing errors
      }
    };

    // Add error listener
    window.addEventListener('error', handleRecaptchaError, true);

    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      // Validate site key first
      if (!RECAPTCHA_CONFIG.siteKey || RECAPTCHA_CONFIG.siteKey.trim() === '') {
        console.error("reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables.");
        onError?.();
        return;
      }
      
      // Validate site key format
      if (!isValidSiteKeyFormat(RECAPTCHA_CONFIG.siteKey)) {
        console.error("reCAPTCHA site key format appears to be invalid. Please verify your NEXT_PUBLIC_RECAPTCHA_SITE_KEY.");
        onError?.();
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="recaptcha/api.js"]');
      if (existingScript) {
        // Script already loaded, wait for grecaptcha to be ready
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => {
            renderRecaptcha();
          });
        } else {
          // Wait a bit for grecaptcha to initialize
          setTimeout(() => {
            if (window.grecaptcha && window.grecaptcha.ready) {
              window.grecaptcha.ready(() => {
                renderRecaptcha();
              });
            } else {
              console.error("grecaptcha failed to initialize");
              onError?.();
            }
          }, 500);
        }
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=en`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Use grecaptcha.ready() to ensure it's fully loaded
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => {
            renderRecaptcha();
          });
        } else {
          // Fallback: wait a bit and try again
          setTimeout(() => {
            if (window.grecaptcha && window.grecaptcha.ready) {
              window.grecaptcha.ready(() => {
                renderRecaptcha();
              });
            } else {
              console.error("grecaptcha failed to initialize after script load");
              onError?.();
            }
          }, 500);
        }
      };
      script.onerror = () => {
        console.error("Failed to load reCAPTCHA script");
        onError?.();
      };
      document.body.appendChild(script);
    };

    const renderRecaptcha = () => {
      if (!recaptchaRef.current || !window.grecaptcha) {
        console.error("reCAPTCHA ref or grecaptcha not available");
        return;
      }

      // Validate site key again before rendering
      if (!RECAPTCHA_CONFIG.siteKey || RECAPTCHA_CONFIG.siteKey.trim() === '') {
        console.error("reCAPTCHA site key is missing");
        onError?.();
        return;
      }
      
      if (!isValidSiteKeyFormat(RECAPTCHA_CONFIG.siteKey)) {
        console.error("reCAPTCHA site key format is invalid");
        onError?.();
        return;
      }

      // Check if render function exists
      if (typeof window.grecaptcha.render !== "function") {
        console.error("grecaptcha.render is not a function");
        onError?.();
        return;
      }

      // Check if widget already exists in this element
      // If widgetIdRef has a value, check if it's still valid
      if (widgetIdRef.current !== null && isRenderedRef.current) {
        try {
          // Try to get response to check if widget exists
          const response = window.grecaptcha.getResponse(widgetIdRef.current);
          // If widget exists, just reset it instead of rendering again
          window.grecaptcha.reset(widgetIdRef.current);
          return;
        } catch (e) {
          // Widget doesn't exist or is invalid, clear the ref
          widgetIdRef.current = null;
          isRenderedRef.current = false;
        }
      }

      // Check if there's already a widget in this element by checking for iframe
      const existingIframe = recaptchaRef.current.querySelector('iframe[src*="recaptcha"]');
      if (existingIframe || isRenderedRef.current) {
        // Widget already exists, don't render again
        return;
      }

      // Clear the element content to ensure it's empty before rendering
      recaptchaRef.current.innerHTML = "";

      try {
        // Render new widget
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_CONFIG.siteKey,
          callback: (token: string) => {
            callbacksRef.current.onVerify?.(token);
            // Enable submit button
            if (window.enableSubmitButton) {
              window.enableSubmitButton();
            }
          },
          "expired-callback": () => {
            callbacksRef.current.onExpire?.();
            // Disable submit button
            if (window.disableSubmitButton) {
              window.disableSubmitButton();
            }
          },
          "error-callback": (error?: any) => {
            console.error("reCAPTCHA error callback triggered:", error);
            // Handle the error gracefully
            callbacksRef.current.onError?.();
            if (window.disableSubmitButton) {
              window.disableSubmitButton();
            }
          },
        });
        isRenderedRef.current = true;
      } catch (error: any) {
        // Check if error is about already rendered widget
        if (error?.message?.includes("already been rendered")) {
          // Widget already exists, try to find and use existing widget
          const existingIframe = recaptchaRef.current.querySelector('iframe[src*="recaptcha"]');
          if (existingIframe) {
            // Find widget ID by checking all widgets
            // This is a workaround since we can't directly get widget ID from element
            return;
          }
        }
        console.error("Error rendering reCAPTCHA:", error);
        onError?.();
      }
    };

    if (RECAPTCHA_CONFIG.siteKey) {
      loadRecaptcha();
    }

    return () => {
      // Remove error listener
      window.removeEventListener('error', handleRecaptchaError, true);
      
      // Cleanup
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          // Ignore errors during cleanup
        }
        widgetIdRef.current = null;
      }
      isRenderedRef.current = false;
      // Clear element content
      if (recaptchaRef.current) {
        recaptchaRef.current.innerHTML = "";
      }
    };
  }, []); // Empty dependency array - only run once on mount

  if (!RECAPTCHA_CONFIG.siteKey) {
    return null;
  }

  return (
    <div
      ref={recaptchaRef}
      id={recaptchaId}
      className="g-recaptcha"
      data-recaptcha-id={recaptchaId}
    />
  );
}

