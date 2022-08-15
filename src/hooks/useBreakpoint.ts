import { useState, useEffect } from "react";

const useBreakpoint = () => {
    const [isMobile, setIsMobile] = useState<boolean>();
    const [width, setWidth] = useState<number>();

    useEffect(() => {
        const checkIfIsMobile = (e: UIEvent) => {
            setIsMobile(() => document.documentElement.clientWidth < 640);
        };

        window.addEventListener("resize", checkIfIsMobile);
        return () => {
            window.removeEventListener("resize", checkIfIsMobile);
        };
    }, []);

    return isMobile;
};

export default useBreakpoint;