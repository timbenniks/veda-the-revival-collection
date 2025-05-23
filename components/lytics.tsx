"use client";

import { JSX, useEffect, useState } from "react";

interface Jstag {
  init: (config: any) => Jstag;
  on: (event: string, callback: (arg1: any, arg2: any) => void) => () => void;
  once: (event: string, callback: (arg1: any, arg2: any) => void) => () => void;
  pageView: () => void;
  send: (...args: any[]) => Jstag;
  mock: (...args: any[]) => Jstag;
  identify: (...args: any[]) => Jstag;
  unblock: (...args: any[]) => Jstag;
  getid: (...args: any[]) => Jstag;
  setid: (...args: any[]) => Jstag;
  call: (...args: any[]) => Jstag;
  config?: any;
  loadScript: (src: string, onload: () => void, onerror?: () => void) => Jstag;
}

declare global {
  interface Window {
    jstag: Jstag;
  }

  const jstag: Jstag;
}

const snippet = `!function(){"use strict";var c=window.jstag||(window.jstag={}),a=[];function n(o){c[o]=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return a.push([o,t]),c}}function t(i){c[i]=function(){for(var n=!1,t=function(){n=!0},r=arguments.length,o=new Array(r),e=0;e<r;e++)o[e]=arguments[e];return a.push([i,o,function(){return n},function(n){t=function(){n()}}]),t}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("call"),t("on"),t("once"),c.asyncVersion="3.0.37",c.loadScript=function(n,t,r){var o=document.createElement("script");o.async=!0,o.src=n,o.onload=t,o.onerror=r;var e=document.getElementsByTagName("script")[0],i=e&&e.parentNode||document.head||document.body,c=e||i.lastChild;return null!=c?i.insertBefore(o,c):i.appendChild(o),this},c.init=function n(t){return c.config=t,c.loadScript(t.src,function(){if(c.init===n)throw new Error("Load error!");c.init(c.config),function(){for(var n=0;n<a.length;n++){var t=a[n][0],r=a[n][1],o=a[n][2],e=a[n][3];if(!o||!o()){var i=c[t].apply(c,r);e&&e(i)}}a=void 0}()}),c}}();`;

export const useJstag = (): Jstag => {
  if (typeof window !== "undefined" && typeof window.jstag === "undefined") {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.text = snippet;
    document.head.appendChild(script);

    // Initialize the jstag global object
    // @ts-expect-error jstag seems not to be defined, but it is!
    window.jstag.init({
      src: `https://c.lytics.io/api/tag/${process.env.NEXT_PUBLIC_CONTENTSTACK_LYTICS_TAG}/latest.min.js`,
      contentstack: {
        entityPush: {
          poll: {
            disabled: false,
          },
        },
      },
    });
  }

  return typeof window !== "undefined" ? window.jstag : ({} as Jstag);
};

type Entity = any;

export const useEntity = (): Entity | null => {
  const jstag = useJstag();
  const [entity, setEntity] = useState<Entity | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const off = jstag.on("entity.loaded", (_, entity: Entity) => {
        setEntity(entity);
      });
      return () => {
        off();
      };
    }
    return undefined;
  }, []);

  return entity;
};

export function LyticsTracking(): JSX.Element {
  const jstag = useJstag();

  useEffect(() => {
    if (typeof window !== "undefined") {
      jstag.pageView();
    }
  }, [jstag]);

  return <></>;
}
