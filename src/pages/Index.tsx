import { useState, useEffect, useRef } from "react";

const LOGO_FULL = "https://cdn.poehali.dev/projects/19fc47f3-dc42-4df3-93eb-bcbb5b12b21d/bucket/d256c209-9494-40e8-a44c-1d187ea9f229.jpg";
const LOGO_ICON = "https://cdn.poehali.dev/projects/19fc47f3-dc42-4df3-93eb-bcbb5b12b21d/bucket/64bb033e-5f56-4c62-9775-5a1e020fb582.jpg";
const LOGO_WITH_TEXT = "https://cdn.poehali.dev/projects/19fc47f3-dc42-4df3-93eb-bcbb5b12b21d/bucket/e0a4df21-3e41-47ff-8bb0-70dccc6d9fd0.jpg";
const ABSTRACT_URL = "https://cdn.poehali.dev/projects/19fc47f3-dc42-4df3-93eb-bcbb5b12b21d/bucket/6505b6db-a086-4adc-83dd-1179705f9567.jpg";
const LOOKBOOK_1 = "https://cdn.poehali.dev/projects/19fc47f3-dc42-4df3-93eb-bcbb5b12b21d/bucket/0cb0bc35-b312-48f0-8c79-157c0b5a7c02.png";
const LOOKBOOK_2 = "https://cdn.poehali.dev/projects/19fc47f3-dc42-4df3-93eb-bcbb5b12b21d/bucket/c7b53b29-2288-46ec-a90e-6241e9ef0bd0.png";

const sections = ["Главная", "О бренде", "Коллекции", "Лукбук", "Контакты"];

// Анимация: 0 = старт, 1 = zoom к нижнему элементу, 2 = текст, 3 = готово
type Phase = 0 | 1 | 2 | 3;

export default function Index() {
  const [active, setActive] = useState("Главная");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [phase, setPhase] = useState<Phase>(0);
  const [introDone, setIntroDone] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Последовательность фаз
    const t1 = setTimeout(() => setPhase(1), 600);   // начало zoom
    const t2 = setTimeout(() => setPhase(2), 2200);  // появление текста
    const t3 = setTimeout(() => setPhase(3), 3800);  // интро завершено
    const t4 = setTimeout(() => setIntroDone(true), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActive(id);
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-700"
        style={{
          background: scrollY > 60 ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.06)" : "none",
          opacity: introDone ? 1 : 0,
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        <button
          onClick={() => scrollTo("Главная")}
          className="text-sm text-white/90 hover:text-white transition-colors uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.35em" }}
        >
          SURIMANSA
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
          {sections.map((s) => (
            <li key={s}>
              <button
                onClick={() => scrollTo(s)}
                className={`text-xs uppercase transition-all duration-300 relative ${
                  active === s ? "text-white" : "text-white/45 hover:text-white/80"
                }`}
                style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.25em" }}
              >
                {s}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-white transition-all duration-300"
                  style={{ width: active === s ? "100%" : "0" }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            className="text-2xl uppercase text-white/70 hover:text-white transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.3em", transitionDelay: `${i * 60}ms` }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── HERO ── */}
      <section
        id="Главная"
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Parallax abstract bg */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${ABSTRACT_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />

        {/* ── INTRO ANIMATION CONTAINER ── */}
        <div
          className="relative z-10 flex flex-col items-center"
          style={{
            // Фаза 1: zoom — вся группа масштабируется вверх и чуть смещается
            transform: phase >= 1
              ? "scale(2.8) translateY(8%)"
              : "scale(1) translateY(0)",
            transition: phase >= 1
              ? "transform 2s cubic-bezier(.4,0,.2,1)"
              : "none",
          }}
        >
          {/* Полный логотип (верхняя часть затухает на фазе 1) */}
          <div
            style={{
              opacity: phase >= 1 ? 0 : 1,
              transition: "opacity 1.6s ease 0.3s",
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "320px",
            }}
          >
            <img
              src={LOGO_FULL}
              alt=""
              className="w-full select-none"
            />
          </div>

          {/* Нижний элемент — иконка + надпись */}
          <div
            className="flex items-center gap-0"
            style={{
              opacity: phase >= 0 ? 1 : 0,
              transition: "opacity 0.8s ease",
              // отступ сверху чтобы совпадало с нижней частью полного лого
              marginTop: "0px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Иконка (маленький логотип) */}
            <img
              src={LOGO_ICON}
              alt="icon"
              className="select-none"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))",
              }}
            />

            {/* Надпись SURIMANSA — появляется слева направо на фазе 2 через clip-path */}
            <div
              style={{
                overflow: "hidden",
                position: "relative",
                width: "220px",
                height: "90px",
                clipPath: phase >= 2
                  ? "inset(0 0% 0 0)"
                  : "inset(0 100% 0 0)",
                transition: phase >= 2
                  ? "clip-path 1.3s cubic-bezier(.4,0,.2,1)"
                  : "none",
              }}
            >
              <img
                src={LOGO_WITH_TEXT}
                alt="SURIMANSA"
                className="select-none"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "320px",
                  height: "90px",
                  objectFit: "cover",
                  objectPosition: "right center",
                  filter: "drop-shadow(0 0 15px rgba(255,255,255,0.1))",
                }}
              />
            </div>
          </div>
        </div>

        {/* После интро — появляется подпись и кнопка */}
        <div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-center"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 1s ease",
            pointerEvents: phase >= 3 ? "auto" : "none",
          }}
        >
          <p
            className="text-[10px] text-white/30 uppercase"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.6em" }}
          >
            Dark Art · Streetwear · Tokyo
          </p>
          <button
            onClick={() => scrollTo("Коллекции")}
            className="group relative text-xs uppercase text-white/70 hover:text-white transition-colors duration-300 px-8 py-3 border border-white/15 hover:border-white/40"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.4em" }}
          >
            <span className="relative z-10">Смотреть коллекцию</span>
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: phase >= 3 ? 0.35 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <span
            className="text-[9px] text-white/50 uppercase"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.5em" }}
          >Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── О БРЕНДЕ ── */}
      <section id="О бренде" className="relative py-32 px-6 md:px-20 lg:px-40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-[9px] text-white/25 uppercase mb-6"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.6em" }}
            >О бренде</p>
            <h2
              className="text-5xl md:text-6xl font-light leading-[1.1] mb-8 text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Тёмное<br />
              <em className="italic font-light">искусство</em><br />
              на коже
            </h2>
            <div className="w-8 h-px bg-white/20 mb-8" />
            <p
              className="text-lg text-white/50 leading-relaxed font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Surimansa — это слияние японской мифологии, dark art и уличной культуры. Каждый принт — это история, выгравированная руками художника.
            </p>
            <p
              className="text-lg text-white/35 leading-relaxed font-light mt-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Мы создаём не просто одежду — мы создаём артефакты для тех, кто видит мир иначе.
            </p>
          </div>
          <div className="relative">
            <img
              src={ABSTRACT_URL}
              alt="Surimansa Art"
              className="relative w-full object-cover"
              style={{ filter: "contrast(1.1) brightness(0.9)" }}
            />
          </div>
        </div>
      </section>

      {/* ── КОЛЛЕКЦИИ ── */}
      <section id="Коллекции" className="py-24 px-6 md:px-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-[9px] text-white/25 uppercase mb-4 text-center"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.6em" }}
          >Коллекции</p>
          <h2
            className="text-4xl md:text-5xl font-light text-center mb-16 text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            SS 2025
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { img: LOOKBOOK_1, name: "Spirit of Torii", sub: "Oversized Tee / White", price: "от 4 900 ₽" },
              { img: LOOKBOOK_2, name: "Dragon Realm", sub: "Oversized Tee / White", price: "от 4 900 ₽" },
              { img: LOGO_FULL, name: "Forest Spirit", sub: "Graphic Print / Black", price: "от 5 500 ₽" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.name}</p>
                  <p
                    className="text-[9px] text-white/50 uppercase mt-1"
                    style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.3em" }}
                  >{item.sub}</p>
                  <p
                    className="text-sm text-white/80 mt-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              className="text-xs uppercase text-white/50 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-10 py-3"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.4em" }}
            >
              Вся коллекция
            </button>
          </div>
        </div>
      </section>

      {/* ── ЛУКБУК ── */}
      <section id="Лукбук" className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-[9px] text-white/25 uppercase mb-4 text-center"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.6em" }}
          >Лукбук</p>
          <h2
            className="text-4xl md:text-5xl font-light text-center mb-16 text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Tokyo Sessions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[LOOKBOOK_1, LOOKBOOK_2, LOOKBOOK_1, LOOKBOOK_2].map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1/1" }}
              >
                <img
                  src={img}
                  alt={`lookbook-${i}`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                />
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "16/7" }}>
              <img src={LOOKBOOK_2} alt="lookbook-wide" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75" />
            </div>
            <div className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "16/7" }}>
              <img src={LOOKBOOK_1} alt="lookbook-wide-2" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75" />
            </div>
          </div>
        </div>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="Контакты" className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-[9px] text-white/25 uppercase mb-6"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.6em" }}
          >Контакты</p>
          <h2
            className="text-5xl md:text-6xl font-light mb-4 text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Свяжитесь<br />
            <em className="italic">с нами</em>
          </h2>
          <div className="w-8 h-px bg-white/15 mx-auto mb-10" />
          <p
            className="text-lg text-white/40 font-light mb-12"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Вопросы о заказах, оптовые закупки, коллаборации
          </p>

          <form className="flex flex-col gap-4 text-left max-w-md mx-auto">
            <input
              type="text"
              placeholder="Ваше имя"
              className="bg-transparent border border-white/10 text-white/80 placeholder:text-white/20 text-base px-5 py-3 focus:outline-none focus:border-white/30 transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border border-white/10 text-white/80 placeholder:text-white/20 text-base px-5 py-3 focus:outline-none focus:border-white/30 transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
            <textarea
              placeholder="Сообщение"
              rows={4}
              className="bg-transparent border border-white/10 text-white/80 placeholder:text-white/20 text-base px-5 py-3 focus:outline-none focus:border-white/30 transition-colors resize-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
            <button
              type="submit"
              className="text-xs uppercase text-black bg-white hover:bg-white/90 transition-colors py-3 mt-2"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.4em" }}
            >
              Отправить
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="text-xs text-white/20 uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.4em" }}
        >Surimansa © 2025</span>
        <div className="flex gap-8">
          {["Instagram", "Telegram", "VK"].map((s) => (
            <button
              key={s}
              className="text-[10px] text-white/25 hover:text-white/60 uppercase transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.3em" }}
            >
              {s}
            </button>
          ))}
        </div>
        <span
          className="text-xs text-white/15 italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >Dark Art · Tokyo · Moscow</span>
      </footer>
    </div>
  );
}