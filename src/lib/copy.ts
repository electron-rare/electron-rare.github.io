import * as React from 'react';
import { COPY_VARIANTS, type CopyContent, type CopyVariant } from '@/content/copyVariants';

const COPY_VARIANT_STORAGE_KEY = 'er_copy_variant';
const DEFAULT_COPY_VARIANT: CopyVariant = 'public';

function isCopyVariant(value: string): value is CopyVariant {
  return value === 'public' || value === 'cto';
}

export function getCopyContent(variant: CopyVariant): CopyContent {
  return COPY_VARIANTS[variant];
}

export function resolveCopyVariant(): CopyVariant {
  if (typeof window === 'undefined') {
    return DEFAULT_COPY_VARIANT;
  }

  const params = new URLSearchParams(window.location.search);
  const fromQuery = (params.get('copy') || '').toLowerCase().trim();
  if (isCopyVariant(fromQuery)) {
    return fromQuery;
  }

  const fromDom = (document.documentElement.getAttribute('data-copy-variant') || '').toLowerCase().trim();
  if (isCopyVariant(fromDom)) {
    return fromDom;
  }

  try {
    const fromStorage = (window.localStorage.getItem(COPY_VARIANT_STORAGE_KEY) || '').toLowerCase().trim();
    if (isCopyVariant(fromStorage)) {
      return fromStorage;
    }
  } catch (_error) {
    // Ignore localStorage access failures.
  }

  return DEFAULT_COPY_VARIANT;
}

export function setCopyVariant(variant: CopyVariant) {
  if (typeof window === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-copy-variant', variant);
  try {
    window.localStorage.setItem(COPY_VARIANT_STORAGE_KEY, variant);
  } catch (_error) {
    // Ignore localStorage access failures.
  }
}

export function useCopyContent() {
  const [variant, setVariantState] = React.useState<CopyVariant>(DEFAULT_COPY_VARIANT);

  React.useEffect(() => {
    const resolved = resolveCopyVariant();
    setVariantState(resolved);
  }, []);

  return {
    variant,
    copy: getCopyContent(variant)
  } as const;
}
