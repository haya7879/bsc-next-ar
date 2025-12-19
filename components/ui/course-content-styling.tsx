"use client";

import { useEffect } from "react";

/**
 * Component that removes styling from empty h3 headings in course content
 * This ensures that h3 elements containing only whitespace or &nbsp; don't get styled
 */
export default function CourseContentStyling() {
  useEffect(() => {
    const removeStylesFromEmptyH3 = () => {
      const courseContent = document.querySelector(".course-content");
      if (!courseContent) return;

      // Find all h3 elements inside course-content
      const h3Elements = courseContent.querySelectorAll("h3");

      h3Elements.forEach((h3) => {
        // Get text content and remove all whitespace, &nbsp;, and HTML entities
        const textContent = h3.textContent?.trim() || "";
        const innerHTML = h3.innerHTML.trim();

        // Check if h3 is empty or contains only whitespace/nbsp
        const isEmpty =
          textContent === "" ||
          textContent === "\u00A0" || // &nbsp;
          innerHTML === "" ||
          innerHTML === "&nbsp;" ||
          innerHTML === "\u00A0" ||
          /^(&nbsp;|\s|<br\s*\/?>)*$/i.test(innerHTML);

        // If empty, remove all the styling
        if (isEmpty) {
          (h3 as HTMLElement).style.backgroundColor = "transparent";
          (h3 as HTMLElement).style.padding = "0";
          (h3 as HTMLElement).style.marginBottom = "0";
          (h3 as HTMLElement).style.color = "inherit";
          (h3 as HTMLElement).style.borderRadius = "0";
          (h3 as HTMLElement).classList.add("empty-heading");
        }
      });
    };

    // Run initially
    removeStylesFromEmptyH3();

    // Also run after a short delay to handle dynamically loaded content
    const timeoutId = setTimeout(removeStylesFromEmptyH3, 100);

    // Use MutationObserver to handle content that loads later
    const observer = new MutationObserver(() => {
      removeStylesFromEmptyH3();
    });

    const courseContent = document.querySelector(".course-content");
    if (courseContent) {
      observer.observe(courseContent, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return null;
}

