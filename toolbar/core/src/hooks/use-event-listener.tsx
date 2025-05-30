// SPDX-License-Identifier: AGPL-3.0-only
// Toolbar event listener hook
// Copyright (C) 2025 Goetze, Scharpff & Toews GbR

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import { useEffect } from 'preact/hooks';

export function useEventListener(
  eventName: string,
  handler: (...opts: any) => void,
  options?: AddEventListenerOptions,
  element: HTMLElement | Window | null | undefined = window,
) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!element) return;
    element.addEventListener(eventName, handler, options);
    return () => element.removeEventListener(eventName, handler);
  }, [eventName, handler, element, options]);
}
