"use client";

import { useEffect, useRef, useState } from "react";

export function InvitationCard() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrameRef = useRef<number | null>(null);

  const faceClass =
    "absolute inset-0 grid place-items-center overflow-hidden rounded-[28px] bg-[#FFFFF9] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_4px_8.5px_rgba(0,0,0,0.25)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

  useEffect(() => {
    return () => {
      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current);
      }
    };
  }, []);

  const fadeInAudio = (audio: HTMLAudioElement) => {
    const targetVolume = 0.45;
    const duration = 2200;
    const startedAt = performance.now();

    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current);
    }

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);

      audio.volume = targetVolume * progress;

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
        return;
      }

      fadeFrameRef.current = null;
    };

    audio.volume = 0;
    fadeFrameRef.current = requestAnimationFrame(step);
  };

  const handleCardClick = () => {
    setIsOpen((value) => !value);

    const audio = audioRef.current;

    if (!audio || !audio.paused) {
      return;
    }

    audio.volume = 0;
    void audio.play().then(() => fadeInAudio(audio)).catch(() => {});
  };

  return (
    <>
      <button
        type="button"
        className="relative z-20 w-full h-full cursor-pointer border-0 bg-transparent px-8 py-28 md:p-0 [perspective:1600px] [-webkit-tap-highlight-color:transparent] md:h-[min(max(45vw,63.2813dvh),calc(100dvh-32px))] md:w-[min(max(53.4722vw,75.1953dvh),calc(100vw-32px))]"
        aria-pressed={isOpen}
        aria-label={isOpen ? "Жабу" : "Шақыруды ашу"}
        onClick={handleCardClick}
      >
        <span
          className={`relative block size-full transition-transform duration-300 ease-in-out [transform-style:preserve-3d] ${
            isOpen ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <span className={faceClass}>
            <div></div>
            <span className="flex flex-col items-end text-[#5F3436]">
              <p className="text-end m-0 [font-family:var(--font-cormorant-infant)] text-[48px] font-light uppercase leading-[0.92] tracking-normal md:text-[80px]">
                ҚЫЗ ҰЗАТУ
              </p>
              <p className="m-0 -mt-8 pr-2 text-[#921512] [font-family:var(--font-bickham-script)] text-[80px] font-normal leading-[0.92] tracking-normal md:text-[128px] md:-mt-14 md:pr-4">
                Аружан
              </p>
            </span>
            <p className="[font-family:Georgia,Times_New_Roman,serif] text-[9px] text-[#5F3436]/45 md:text-xs mb-4 md:mb-8">
              ашу үшін басыңыз
            </p>
          </span>

          <span className={`${faceClass} [transform:rotateY(180deg)]`}>
            <span className="relative z-10 flex w-[72%] flex-col items-center gap-[21px] md:gap-[28px] [font-family:var(--font-cormorant-infant)] text-[#634445] md:w-[min(420px,68%)]">
              <div className="flex flex-col items-center gap-[16px] md:gap-[21px]">
                <span className="flex flex-col items-center md:items-end ">
                  <p className="m-0 text-[32px] font-light uppercase leading-[0.92] tracking-normal text-[#5F3436] md:text-[48px]">
                    ҚЫЗ ҰЗАТУ
                  </p>
                  <p className="m-0 -mt-4 [font-family:var(--font-bickham-script)] text-[48px] font-normal leading-[0.92] tracking-normal text-[#921512] md:text-[64px] md:-mt-6 md:pr-2">
                    Аружан
                  </p>
                </span>
                <p className="m-0 text-[16px] font-light leading-none tracking-normal text-[#634445] md:text-[26px]">
                  Құрметті ағайын-туыс, <br /> қонақтар!
                </p>
                <p className="m-0 text-[16px] font-light leading-none tracking-normal text-[#634445] md:text-[26px]">
                  Сіздерді қызымыз
                  <br />
                  <span className="font-bold text-[#634445]">
                    Аружанның ұзату тойына
                  </span>
                  <br />
                  арналған ақ дастарханымыздың <br /> қадірлі қонағы болуға
                  шақырамыз.
                </p>
              </div>
              <p className="m-0 [font-family:var(--font-bickham-script)] text-[48px] font-normal leading-[0.92] tracking-normal text-[#921512] md:text-[80px]">
                1 маусым | 14:00
              </p>

              <p className="m-0 text-[16px] font-normal leading-[0.92] tracking-normal text-[#634445] md:text-[26px]">
                Қарағанды қаласы <br />
                «Garden Hall» мейрамханасы
              </p>

              <div>
                <p className="m-0 text-[14px] font-normal leading-[0.92] tracking-normal text-[#634445] md:text-[24px]">
                  Ізгі ниетпен,
                </p>
                <p className="m-0 -mt-1 [font-family:var(--font-bickham-script)] text-[24px] font-normal leading-[0.92] tracking-normal text-[#921512] md:text-[48px] md:-mt-2">
                  Жарас — Гүлбақыт
                </p>
              </div>
            </span>
          </span>
        </span>
      </button>
      <audio ref={audioRef} src="/uzatu-song.mp3" preload="auto" loop />
    </>
  );
}
