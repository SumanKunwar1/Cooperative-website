// src/types/global.d.ts
export {};

declare global {
  interface Window {
    __noticeModal?: {
      show: () => void;
      hide: () => void;
      reset: () => void;
      getSettings: () => any;
      forceShow: () => void;
    };
  }
}