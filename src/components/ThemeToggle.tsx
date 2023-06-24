'use client';

import { useEffect } from 'react';
import { themeChange } from 'theme-change';

export default function ThemeToggle() {
  useEffect(() => {
    themeChange(false);

    /**
     * Ensures script load in React strict mode.
     * See https://github.com/saadeghi/theme-change/issues/30.
     */
    return () => themeChange(false);
  }, []);

  return (
    <div className="mr-4 gap-2 h-5">
      <input type="checkbox" className="toggle toggle-sm" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" />
    </div>
  );
}
