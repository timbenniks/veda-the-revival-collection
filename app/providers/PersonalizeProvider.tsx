"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getPersonalizeInstance } from "@/lib/helpers";
import type { Sdk } from "@contentstack/personalize-edge-sdk/dist/sdk";

const PersonalizeContext = createContext<Sdk | null>(null);

export function PersonalizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [personalizeSdk, setPersonalizeSdk] = useState<Sdk | null>(null);

  useEffect(() => {
    getPersonalizeInstance().then(setPersonalizeSdk);
  }, []);

  return (
    <PersonalizeContext.Provider value={personalizeSdk}>
      {children}
    </PersonalizeContext.Provider>
  );
}

export function usePersonalize() {
  return useContext(PersonalizeContext);
}
