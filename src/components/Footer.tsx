"use client"
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { House, MessageCircle, SquarePlay, CircleDotDashed } from "lucide-react";

const icons = [House, SquarePlay, MessageCircle, CircleDotDashed];
const routes = ["/", "/vidfloh", "/chat", "/update"];

const Footer = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 z-50 shadow-md flex justify-evenly items-center p-2"
            style={{
                backgroundColor: 'var(--secondary-bg)',
              }}
        >
            {icons.map((Icon, idx) => {
                const isActive = pathname === routes[idx];
                return (
                    <div
                        key={idx}
                        className={`flex justify-center items-center p-2 rounded transition-colors duration-500 cursor-pointer`}
                        style={{
                            backgroundColor: isActive ? "var(--accent)" : undefined,
                            color: isActive ? "black" : undefined,
                        }}
                        onClick={() => {
                            router.push(routes[idx]);
                        }}
                    >
                        <Icon />
                    </div>
                );
            })}
        </div>
    );
};

export default Footer;

