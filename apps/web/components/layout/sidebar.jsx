"use client";
import * as motion from "motion/react-client";
import { usePathname } from "next/navigation";
import { SIDEBARMENU } from "../../lib/constants";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "../../public/icons";

export const Sidebar = () => {
  const pathname = usePathname();
  const activeIndex = SIDEBARMENU.findIndex((item) => item.route === pathname);

  const [hoverIndex, setHoverIndex] = useState(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsHamburgerOpen(window.innerWidth >= 768);

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="w-full md:w-64 md:h-full p-4 fixed z-10">
      <div className="flex overflow-scroll gap-5 md:gap-10 scrollbar-hide h-full bg-primary flex-col rounded-xl p-3 relative">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="Logo" className="w-9" />
            <h2 className="text-xl font-bold text-white">NexusFlow</h2>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <p className="font-semibold text-white">
              {SIDEBARMENU.find((item) => item.route === pathname).name}
            </p>

            {isHamburgerOpen ? (
              <CloseIcon
                className="w-8 h-8 cursor-pointer text-white"
                onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              />
            ) : (
              <MenuIcon
                className="w-8 h-8 cursor-pointer text-white"
                onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              />
            )}
          </div>
        </div>

        <div className={`${isHamburgerOpen ? 'flex' : 'hidden'} md:flex flex-col relative`}>
          <motion.span
            className="bg-white/20 absolute h-10 rounded-md left-0 right-0"
            initial={{ width: 0, y: activeIndex * 48 + 5 }}
            animate={{
              width: "100%",
              y: (hoverIndex ?? activeIndex) * 48 + 5,
            }}
            transition={{
              type: "keyframes",
              duration: 0.3,
            }}
          />

          {SIDEBARMENU.map((item, index) => (
            <div
              key={item.name}
              className={`h-12 flex items-center cursor-pointer relative z-10 ${
                index === activeIndex
                  ? "font-semibold"
                  : "opacity-60 hover:opacity-100"
              }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <a
                href={item.route}
                className={`text-white px-3 w-full ${index === activeIndex && "border-l-4 border-white"}`}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
