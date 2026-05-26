"use client";

import { useEffect, useRef, useState } from "react";

export function InvitationCard() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldResumeAudioRef = useRef(false);

  const faceClass =
    "absolute inset-0 grid place-items-center overflow-hidden rounded-[28px] bg-[#FFFFF9] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_4px_8.5px_rgba(0,0,0,0.25)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

  useEffect(() => {
    const stopAudio = () => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      audio.pause();
      audio.currentTime = 0;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const audio = audioRef.current;

        shouldResumeAudioRef.current = Boolean(audio && !audio.paused);
        stopAudio();
        return;
      }

      if (document.visibilityState === "visible" && shouldResumeAudioRef.current) {
        shouldResumeAudioRef.current = false;
        void audioRef.current?.play().catch(() => {});
      }
    };

    const handlePageHide = () => {
      const audio = audioRef.current;

      shouldResumeAudioRef.current = Boolean(audio && !audio.paused);
      stopAudio();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  const handleCardClick = () => {
    setIsOpen((value) => !value);

    const audio = audioRef.current;

    if (!audio || !audio.paused) {
      return;
    }

    void audio.play().catch(() => {});
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
                БЕСІК ТОЙ
              </p>
              <p className="m-0 -mt-8 pr-2 text-[#921512] [font-family:var(--font-bickham-script)] text-[80px] font-normal leading-[0.92] tracking-normal md:text-[128px] md:-mt-14 md:pr-4">
                Аиша
              </p>
            </span>
            <p className="[font-family:Georgia,Times_New_Roman,serif] text-[9px] text-[#5F3436]/45 md:text-[20px] mb-4 md:mb-8">
              ашу үшін басыңыз
            </p>
          </span>

          <span className={`${faceClass} [transform:rotateY(180deg)]`}>
            <span className="relative z-10 flex w-[72%] flex-col items-center gap-[21px] md:gap-[28px] [font-family:var(--font-cormorant-infant)] text-[#634445] md:w-[min(420px,68%)]">
              <div className="flex flex-col items-center gap-[16px] md:gap-[21px]">
                <span className="flex flex-col items-center md:items-end ">
                  <p className="m-0 text-[32px] font-light uppercase leading-[0.92] tracking-normal text-[#5F3436] md:text-[48px]">
                    БЕСІК ТОЙ
                  </p>
                  <p className="m-0 -mt-4 [font-family:var(--font-bickham-script)] text-[48px] font-normal leading-[0.92] tracking-normal text-[#921512] md:text-[64px] md:-mt-6 md:pr-2">
                    Аиша
                  </p>
                </span>
                <p className="m-0 text-[16px] font-light leading-none tracking-normal text-[#634445] md:text-[26px]">
                  Құрметті ағайын-туыс, <br /> қонақтар!
                </p>
                <p className="m-0 text-[16px] font-light leading-none tracking-normal text-[#634445] md:text-[26px]">
                  Сіздерді қызымыз
                  <br />
                  <span className="font-bold text-[#634445]">
                    Аишаның бесік тойына
                  </span>
                  <br />
                  арналған ақ дастарханымыздың <br /> қадірлі қонағы болуға
                  шақырамыз.
                </p>
              </div>
              <p className="m-0 [font-family:var(--font-bickham-script)] text-[48px] font-normal leading-[0.92] tracking-normal text-[#921512] md:text-[80px]">
                21 маусым <span className='font-italic text-[19px] md:text-[36px]'>|</span> 12:00
              </p>

              <p className="m-0 text-[16px] font-normal leading-[0.92] tracking-normal text-[#634445] md:text-[26px]">
                Шымкент қаласы <br />
                «La melly» мейрамханасы
              </p>

              <div>
                <p className="m-0 text-[14px] font-normal leading-[0.92] tracking-normal text-[#634445] md:text-[24px]">
                  Ізгі ниетпен,
                </p>
                <p className="m-0 -mt-1 [font-family:var(--font-bickham-script)] text-[24px] font-normal leading-[0.92] tracking-normal text-[#921512] md:text-[48px] md:-mt-2">
                  Самиқұловтар әулеті
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
