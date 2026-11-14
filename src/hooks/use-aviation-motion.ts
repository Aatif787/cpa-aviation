import { useEffect, type RefObject } from "react";

/** Reveal the existing composition without moving or resizing its layout. */
const WAVE_STEPS = 22;
const WAVE_CYCLES = 1.85;
const RIBBON_HEIGHT = 66;

/** Wavy-top polygon: liquid surface sitting at `level` (0 = top, 1 = bottom) of the element box. */
const liquidPolygon = (level: number, ampPx: number, heightPx: number, phase: number) => {
  const amp = heightPx > 0 ? Math.min(46, (ampPx / heightPx) * 100) : 0;
  const points: string[] = [];
  for (let index = 0; index <= WAVE_STEPS; index += 1) {
    const t = index / WAVE_STEPS;
    const swell = Math.sin(t * Math.PI * 2 * WAVE_CYCLES + phase) * .64
      + Math.sin(t * Math.PI * 2 * WAVE_CYCLES * 1.62 - phase * 1.4) * .36;
    const y = Math.max(0, Math.min(100, level * 100 + swell * amp));
    points.push(`${(t * 100).toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(0% 100%, ${points.join(", ")}, 100% 100%)`;
};

type Liquid = {
  frame: HTMLElement;
  media: HTMLElement;
  ribbon: HTMLElement;
  sweep: HTMLElement;
  text: HTMLElement | null;
  state: { fill: number };
  phase: number;
  running: boolean;
  swept: boolean;
  sweepTween?: { kill: () => void };
};

export function useAviationMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const header = root.querySelector<HTMLElement>(".site-header");
    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") root.querySelector<HTMLButtonElement>('.mobile-toggle[aria-expanded="true"]')?.click();
    };
    window.addEventListener("keydown", onEscape);
    let cleanupDepth: (() => void) | undefined;
    let depthGeneration = 0;
    const setupDepth = async () => {
      const generation = ++depthGeneration;
      cleanupDepth?.();
      cleanupDepth = undefined;
      if (preference.matches) return;
      try {
        const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
          import("gsap"), import("gsap/ScrollTrigger"), import("lenis"),
        ]);
        if (generation !== depthGeneration) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ autoRaf: true, anchors: true, duration: 1.05, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const matchMedia = gsap.matchMedia();
        const cleanups: (() => void)[] = [];
        const context = gsap.context(() => {
          matchMedia.add("(min-width: 701px)", () => {
            // foreground/background separation: image layer and copy drift at different rates
            root.querySelectorAll<HTMLElement>('[data-liquid="overview"] .liquid-frame, [data-liquid="leasing"] .liquid-frame, [data-liquid="city"] .liquid-frame').forEach(frame => {
              gsap.fromTo(frame, { yPercent: 2.6 }, { yPercent: -2.6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 1.2 } });
            });
          });

          /* ---------- scroll-responsive atmospheric cloud depth & lighting (desktop fine-pointer only) ---------- */
          matchMedia.add("(min-width: 701px) and (hover: hover) and (pointer: fine)", () => {
            const defaultDepth = { y: 8, x: -3 };
            const depthSpecs: Record<string, { y: number; x: number }> = {
              far: defaultDepth,
              near: { y: 18, x: -7 },
              "frame-far": { y: 5, x: -2 },
              "frame-near": { y: 11, x: -5 },
              "contact-far": { y: 8, x: -3 },
              "contact-near": { y: 14, x: 5 },
            };
            root.querySelectorAll<HTMLElement>("[data-atmo-depth]").forEach(layer => {
              const kind = layer.dataset["atmoDepth"] ?? "far";
              const spec = depthSpecs[kind] ?? defaultDepth;
              const trigger = layer.closest("section") ?? layer;
              gsap.fromTo(layer, { yPercent: -spec.y * .45, xPercent: 0 }, {
                yPercent: spec.y, xPercent: spec.x, ease: "none",
                scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1.3 },
              });
            });

            const heroLight = root.querySelector<HTMLElement>("[data-atmo-light]");
            const heroSection = root.querySelector<HTMLElement>(".hero");
            if (heroLight && heroSection) {
              gsap.fromTo(heroLight, { yPercent: 0, xPercent: 0, opacity: 1 }, {
                yPercent: 14, xPercent: -4, opacity: .9, ease: "none",
                scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: 1.2 },
              });
            }

            const sunwash = root.querySelector<HTMLElement>("[data-atmo-sunwash]");
            const haze = root.querySelector<HTMLElement>("[data-atmo-haze]");
            if (sunwash) {
              gsap.timeline({
                scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 1.5 },
              })
                .to(sunwash, { xPercent: -16, yPercent: 10, scale: 1.08, opacity: .94, ease: "none" })
                .to(sunwash, { xPercent: 8, yPercent: 22, scale: 1.02, opacity: .86, ease: "none" })
                .to(sunwash, { xPercent: -6, yPercent: 32, scale: 1.12, opacity: .94, ease: "none" });
            }
            if (haze) {
              gsap.timeline({
                scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 1.5 },
              })
                .to(haze, { xPercent: 12, yPercent: -8, opacity: .88, ease: "none" })
                .to(haze, { xPercent: -10, yPercent: -18, opacity: .8, ease: "none" })
                .to(haze, { xPercent: 6, yPercent: -26, opacity: .9, ease: "none" });
            }
          });

          /* ---------- blueprint outline drawn through light, replayed on every entry ---------- */
          Array.from(root.querySelectorAll<SVGSVGElement>(".blueprint")).forEach(svg => {
            const lines = Array.from(svg.querySelectorAll<SVGGeometryElement>(".bp-line"));
            const marks = Array.from(svg.querySelectorAll<SVGGeometryElement>(".bp-axis, .bp-mark"));
            const sheen = svg.querySelector<SVGGElement>(".bp-sheen");
            const sheenGrad = svg.querySelector<SVGLinearGradientElement>("#bp-sheen-grad");
            lines.forEach(line => {
              const length = line.getTotalLength();
              line.style.strokeDasharray = `${length}`;
              line.style.strokeDashoffset = `${length}`;
            });
            marks.forEach(mark => gsap.set(mark, { opacity: 0 }));
            const timeline = gsap.timeline({ paused: true })
              .to(lines, { strokeDashoffset: 0, duration: 1.7, ease: "power2.inOut", stagger: .11 })
              .to(marks, { opacity: 1, duration: .6, stagger: .06 }, "-=.55");
            if (sheen && sheenGrad) {
              timeline
                .to(sheen, { opacity: 1, duration: .25 }, ">-.15")
                .fromTo(sheenGrad, { attr: { x1: -460, x2: -140 } }, { attr: { x1: 1520, x2: 1840 }, duration: 1.4, ease: "power1.inOut" }, "<")
                .to(sheen, { opacity: 0, duration: .5 });
            }
            const trigger = ScrollTrigger.create({
              trigger: svg, start: "top bottom", end: "bottom top",
              onEnter: () => timeline.restart(),
              onEnterBack: () => timeline.restart(),
              onLeave: () => timeline.pause(0),
              onLeaveBack: () => timeline.pause(0),
            });
            cleanups.push(() => { trigger.kill(); timeline.kill(); });
          });

          /* ---------- flight path drawn in sync with scrolling ---------- */
          Array.from(root.querySelectorAll<SVGSVGElement>(".flight-path")).forEach(svg => {
            const draw = svg.querySelector<SVGPathElement>(".fp-draw");
            const plane = svg.querySelector<SVGGElement>(".fp-plane");
            const marker = svg.querySelector<SVGGElement>(".fp-marker");
            if (!draw || !plane || !marker) return;
            const length = draw.getTotalLength();
            draw.style.strokeDasharray = `${length}`;
            const state = { progress: 0 };
            const place = () => {
              const at = length * state.progress;
              const point = draw.getPointAtLength(at);
              const ahead = draw.getPointAtLength(Math.min(length, at + 2));
              const behind = draw.getPointAtLength(Math.max(0, at - 2));
              const angle = Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180 / Math.PI;
              plane.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${angle.toFixed(2)})`);
              marker.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
              draw.style.strokeDashoffset = `${(length - at).toFixed(2)}`;
            };
            place();
            const trigger = ScrollTrigger.create({
              trigger: svg, start: "top bottom", end: "bottom top", scrub: 1.1,
              onUpdate: self => { state.progress = self.progress; place(); },
              onLeave: () => { state.progress = 0; place(); },
              onLeaveBack: () => { state.progress = 0; place(); },
            });
            cleanups.push(() => trigger.kill());
          });

          /* ---------- continuous open-sky charter cruise across contact sky ---------- */
          Array.from(root.querySelectorAll<SVGSVGElement>(".contact-charter")).forEach(svg => {
            const route = svg.querySelector<SVGPathElement>(".cc-route");
            const trail = svg.querySelector<SVGPathElement>(".cc-trail");
            const plane = svg.querySelector<SVGGElement>(".cc-plane");
            if (!route || !trail || !plane) return;
            const length = route.getTotalLength();
            const wake = Math.min(340, length * 0.24);
            trail.style.strokeDasharray = `${wake} ${length + wake}`;
            const state = { progress: 0 };
            const cruise = () => {
              const at = length * state.progress;
              const point = route.getPointAtLength(at);
              const ahead = route.getPointAtLength(Math.min(length, at + 2));
              const behind = route.getPointAtLength(Math.max(0, at - 2));
              const angle = Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180 / Math.PI;
              plane.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${angle.toFixed(2)})`);
              trail.style.strokeDashoffset = `${(wake - at).toFixed(2)}`;
            };
            cruise();
            const tween = gsap.to(state, { progress: 1, duration: 22, ease: "none", repeat: -1, onUpdate: cruise, paused: true });
            const trigger = ScrollTrigger.create({
              trigger: svg, start: "top bottom", end: "bottom top",
              onEnter: () => tween.play(),
              onEnterBack: () => tween.play(),
              onLeave: () => tween.pause(),
              onLeaveBack: () => tween.pause(),
            });
            cleanups.push(() => { trigger.kill(); tween.kill(); });
          });
        }, root);
        const listeners: (() => void)[] = [];
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          root.querySelectorAll<HTMLElement>(".aviation-button, .cinematic-button").forEach(button => {
            const move = (event: PointerEvent) => {
              const box = button.getBoundingClientRect();
              gsap.to(button, { x: (event.clientX - box.left - box.width / 2) * .045, y: (event.clientY - box.top - box.height / 2) * .07, duration: .35, overwrite: true });
            };
            const reset = () => gsap.to(button, { x: 0, y: 0, duration: .45, overwrite: true });
            button.addEventListener("pointermove", move);
            button.addEventListener("pointerleave", reset);
            button.addEventListener("blur", reset);
            listeners.push(() => {
              button.removeEventListener("pointermove", move);
              button.removeEventListener("pointerleave", reset);
              button.removeEventListener("blur", reset);
              gsap.killTweensOf(button);
              gsap.set(button, { clearProps: "transform" });
            });
          });
        }

        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          root.querySelectorAll<HTMLElement>('[data-liquid="overview"], [data-liquid="leasing"]').forEach(figure => {
            figure.classList.add("cine-hover");
            const move = (event: PointerEvent) => {
              const box = figure.getBoundingClientRect();
              const x = (event.clientX - box.left) / box.width - .5, y = (event.clientY - box.top) / box.height - .5;
              gsap.to(figure, { rotateY: x * 3, rotateX: -y * 2.4, scale: 1.015, transformPerspective: 1400, duration: .7, ease: "power2.out", overwrite: true });
            };
            const leave = () => gsap.to(figure, { rotateY: 0, rotateX: 0, scale: 1, duration: .9, ease: "power3.out", overwrite: true });
            figure.addEventListener("pointermove", move);
            figure.addEventListener("pointerleave", leave);
            listeners.push(() => {
              figure.removeEventListener("pointermove", move);
              figure.removeEventListener("pointerleave", leave);
              figure.classList.remove("cine-hover");
              gsap.killTweensOf(figure);
              gsap.set(figure, { clearProps: "transform" });
            });
          });
        }

        /* ---------- liquid fill reveal, replayed on every scroll entry ---------- */
        const liquids: Liquid[] = Array.from(root.querySelectorAll<HTMLElement>("[data-liquid]")).flatMap(frame => {
          const media = frame.querySelector<HTMLElement>(".liquid-media");
          const ribbon = frame.querySelector<HTMLElement>(".liquid-ribbon");
          const sweep = frame.querySelector<HTMLElement>(".liquid-sweep");
          if (!media || !ribbon || !sweep) return [];
          const text = frame.closest("section")?.querySelector<HTMLElement>("[data-liquid-text]") ?? null;
          return [{ frame, media, ribbon, sweep, text, state: { fill: 0 }, phase: Math.random() * 6.28, running: false, swept: false }];
        });

        const paint = (item: Liquid) => {
          const height = item.media.getBoundingClientRect().height || 1;
          const fill = Math.max(0, Math.min(1, item.state.fill));
          const swell = Math.sin(Math.PI * fill);
          const amp = height * .032 * swell;
          const level = 1 - fill;
          if (fill <= .002) item.media.style.clipPath = "inset(100% 0 0 0)";
          else if (fill >= .998) item.media.style.clipPath = "none";
          else item.media.style.clipPath = liquidPolygon(level, amp, height, item.phase);

          if (fill > .015 && fill < .985 && swell > .04) {
            const levelPx = level * height;
            item.ribbon.style.opacity = String(Math.min(1, swell * 1.7));
            item.ribbon.style.transform = `translate3d(0, ${(levelPx - RIBBON_HEIGHT * .3).toFixed(2)}px, 0)`;
            item.ribbon.style.clipPath = liquidPolygon(.3, amp, RIBBON_HEIGHT, item.phase);
          } else {
            item.ribbon.style.opacity = "0";
          }
        };

        const runSweep = (item: Liquid) => {
          item.sweepTween?.kill();
          item.sweepTween = gsap.timeline()
            .fromTo(item.sweep, { xPercent: -62, opacity: 0 }, { opacity: .8, duration: .3, ease: "power1.out" }, 0)
            .to(item.sweep, { xPercent: 62, duration: 1.15, ease: "power1.in" }, 0)
            .to(item.sweep, { opacity: 0, duration: .5 }, .68) as unknown as { kill: () => void };
        };

        const play = (item: Liquid) => {
          item.running = true;
          item.swept = false;
          gsap.killTweensOf(item.state);
          item.sweepTween?.kill();
          item.text?.classList.add("is-visible");
          item.frame.classList.add("is-atmo-active");
          gsap.to(item.state, {
            fill: 1, duration: 1.9, ease: "power2.inOut",
            onUpdate: () => {
              if (item.state.fill >= .7 && !item.swept) { item.swept = true; runSweep(item); }
            },
            onComplete: () => { item.running = false; paint(item); },
          });
          gsap.fromTo(item.media, { scale: 1.1, yPercent: 3 }, { scale: 1, yPercent: 0, duration: 2.4, ease: "power3.out", overwrite: true });
        };

        const reset = (item: Liquid) => {
          item.running = false;
          item.swept = false;
          gsap.killTweensOf(item.state);
          gsap.killTweensOf(item.media);
          item.sweepTween?.kill();
          item.state.fill = 0;
          item.media.style.clipPath = "inset(100% 0 0 0)";
          item.media.style.transform = "";
          item.ribbon.style.opacity = "0";
          item.sweep.style.opacity = "0";
        };

        liquids.forEach(item => {
          item.media.style.clipPath = "inset(100% 0 0 0)";
          item.ribbon.style.opacity = "0";
          item.sweep.style.opacity = "0";
        });

        const tick = (time: number) => {
          liquids.forEach(item => {
            if (!item.running) return;
            item.phase = time * 1.35;
            paint(item);
          });
        };
        gsap.ticker.add(tick);

        const triggers = liquids.map(item => ScrollTrigger.create({
          trigger: item.frame, start: "top bottom", end: "bottom top",
          onEnter: () => play(item), onEnterBack: () => play(item),
          onLeave: () => reset(item), onLeaveBack: () => reset(item),
        }));

        ScrollTrigger.refresh();
        cleanupDepth = () => {
          gsap.ticker.remove(tick);
          cleanups.forEach(cleanup => cleanup());
          triggers.forEach(trigger => trigger.kill());
          liquids.forEach(item => {
            reset(item);
            item.media.style.clipPath = "";
            item.ribbon.style.clipPath = "";
            item.text?.classList.add("is-visible");
            item.frame.classList.add("is-atmo-active");
          });
          listeners.forEach(cleanup => cleanup());
          lenis.destroy();
          matchMedia.revert();
          context.revert();
        };
      } catch {
        root.querySelectorAll<HTMLElement>("[data-liquid-text]").forEach(text => text.classList.add("is-visible"));
        root.querySelectorAll<HTMLElement>("[data-liquid]").forEach(frame => frame.classList.add("is-atmo-active"));
        root.querySelectorAll<HTMLElement>("[data-liquid] .liquid-media").forEach(media => { media.style.clipPath = ""; });
      }
    };
    void setupDepth();
    preference.addEventListener("change", setupDepth);
    const cleanupInteractions = () => {
      depthGeneration++;
      cleanupDepth?.();
      preference.removeEventListener("change", setupDepth);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("keydown", onEscape);
    };
    if (preference.matches) return cleanupInteractions;

    let disposed = false;
    const animations: Animation[] = [];
    const animate = (selector: string, frames: Keyframe[], delay = 0, duration = 850) => {
      root.querySelectorAll<HTMLElement>(selector).forEach(element => {
        const animation = element.animate(frames, {
          duration, delay, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both",
        });
        animation.pause();
        animations.push(animation);
      });
    };

    const phone = window.matchMedia("(max-width: 700px)").matches;
    animate(".hero-film-reveal", phone ? [
      { clipPath: "inset(49.9% 50% round 999px)", offset: 0 },
      { clipPath: "inset(49.9% 0% round 999px)", offset: .14 },
      { clipPath: "inset(45% 0% round 999px)", offset: .30 },
      { clipPath: "inset(22.5% 0% round 180px)", offset: .58 },
      { clipPath: "inset(0% 0% round 0px)", offset: 1 },
    ] : [
      { clipPath: "inset(50% 49.9% round 999px)", offset: 0 },
      { clipPath: "inset(0% 49.9% round 999px)", offset: .14 },
      { clipPath: "inset(0% 46% round 999px)", offset: .30 },
      { clipPath: "inset(0% 28% round 999px)", offset: .58 },
      { clipPath: "inset(0% 0% round 0px)", offset: 1 },
    ], 0, phone ? 1300 : 1700);
    animate(".header-inner", [
      { opacity: 0, transform: "translateY(-35px)" },
      { opacity: 1, transform: "translateY(0)" },
    ], 180, 700);
    [".hero-copy h1", ".hero-description", ".hero-actions"].forEach((selector, index) => {
      animate(selector, [
        { opacity: 0, transform: "translateY(28px)", clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0% 0)" },
      ], (phone ? 420 : 580) + index * 140);
    });
    animate(".hero-bottom", [
      { opacity: 0, transform: "translateY(35px)" },
      { opacity: 1, transform: "translateY(0)" },
    ], 900, 690);
    animate(".scroll-line", [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], 1150, 850);

    const finish = () => {
      animations.forEach(animation => { animation.finish(); animation.cancel(); });
    };
    const onPreferenceChange = () => { if (preference.matches) { disposed = true; finish(); } };
    const onResize = () => { disposed = true; finish(); };
    preference.addEventListener("change", onPreferenceChange);
    window.addEventListener("resize", onResize);
    document.fonts.ready.then(() => {
      if (disposed) return;
      animations.forEach(animation => animation.play());
      Promise.all(animations.map(animation => animation.finished)).then(() => {
        animations.forEach(animation => animation.cancel());
      }).catch(() => { /* Cancellation restores the unanimated composition. */ });
    });
    return () => {
      cleanupInteractions();
      disposed = true;
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("resize", onResize);
    };
  }, [rootRef]);
}
