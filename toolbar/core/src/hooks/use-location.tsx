// SPDX-License-Identifier: AGPL-3.0-only
// Toolbar location hook
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

import { type ComponentChildren, createContext } from 'preact';
import { useCallback, useContext, useState } from 'preact/hooks';
import { useCyclicUpdate } from './use-cyclic-update';

const LocationContext = createContext<URL>(new URL(window.location.href));

export function LocationProvider({
  children,
}: {
  children?: ComponentChildren;
}) {
  const [currentUrl, setCurrentUrl] = useState<URL>(
    new URL(window.location.href),
  );

  const update = useCallback(() => {
    setCurrentUrl(new URL(window.location.href));
  }, []);

  // We sadly have to fetch all the time because there is no proper event that listens to all kinds of URL changes...
  useCyclicUpdate(update, 15);

  return (
    <LocationContext.Provider value={currentUrl}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
