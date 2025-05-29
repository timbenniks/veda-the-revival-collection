"use client";

import { useEffect } from "react";
import { useJstag } from "./lytics";

interface SendDataToLyticsProps {
  data: Record<string, any>;
}

type Entity = any;

export default function SendDataToLytics({ data }: SendDataToLyticsProps) {
  const jstag = useJstag();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      jstag.send(data);
    }
    jstag.call("resetPolling");

    jstag.on("entity.loaded", (_, entity: Entity) => {
      console.log("[Lytics: entity]", entity);
    });

    console.log("[lytics: sending data]", data);
  }, [data, jstag]);

  return null;
}
