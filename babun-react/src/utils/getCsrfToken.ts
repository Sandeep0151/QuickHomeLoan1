// src/utils/getCsrfToken.ts
export const getCsrfToken = (): string | null => {
  const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
  return csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : null;
};