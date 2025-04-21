"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Personalize from "@contentstack/personalize-edge-sdk";
import type { Sdk } from "@contentstack/personalize-edge-sdk/dist/sdk";

import { getPersonalizeInstance } from "@/lib/helpers";

const PersonalizeContext = createContext<Sdk | null>(null);

export function PersonalizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [personalizeSdk, setPersonalizeSdkSdk] = useState<Sdk | null>(null);

  useEffect(() => {
    getPersonalizeInstance().then(setPersonalizeSdkSdk);
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
