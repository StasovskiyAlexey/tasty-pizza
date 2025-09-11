import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // функция для обновления состояния
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // вызвать при монтировании
    handleResize();

    // слушаем изменение размера окна
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
