"use client"

import {
    BsCodeSlash,
    BsGithub,
    BsHouse,
    BsPencilSquare,
    BsPeople,
    BsPersonLinesFill,
} from "react-icons/bs";
import ProfileStatus from "../../ProfileStatus";
import SideLink from "./SideLink";
import Logo from "./Logo";
import ToggleMenu from "./ToggleMenu";
import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "@/app/context/lightdark";
import Link from "next/link";


const SideBar = () => {

    const { state, dispatch } = useContext(ThemeContext);
    const toggleRef = useRef<HTMLDivElement>(null)

    const toggle = state.sidebar;

    const sideBarOpen = state.sidebar

    useEffect(() => {
        let handler = (e: any) => {
            if (!toggleRef.current?.contains(e.target)) {
                if (sideBarOpen) {
                    dispatch({ type: 'SIDEBAR_TOGGLE' })
                }
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <div ref={toggleRef} className={clsx(`
      text-white
        fixed
        top-0 left-0
        translate-x-[-300px]
        transition
        w-[220px] 
        min-h-[100vh] 
        bg-[rgb(43,42,109)]
        dark:bg-black
        border-r-[.1px] 
        dark:border-[rgba(145,145,145,0.5)] 
         lg:translate-x-[0px]
         z-50
        `,

            toggle ? "translate-x-[0px]" : ""

        )}>

            <div className="flex lg:px-0 items-center px-6">
                <div className="lg:hidden ">
                    <ToggleMenu />
                </div>
                <div className=" flex items-center gap-2 lg:gap-6 px-6 py-[9.5px] h-[60px]">
                    <Link href={"/"}> <Logo /></Link>
                    <h3 className="text-green-400"><Link href={'/'}> Bloogitu</Link></h3>
                </div>
            </div>
            <div className="transition mt-8">

                <SideLink
                    icon={BsPeople}
                    iconColor="white"
                    iconSize={18}
                    linkName="Ai Project"
                    linkUrl="https://notes-chatbot.vercel.app"
                />
                {/* <SideLink
          icon={BsCodeSlash}
          iconColor="white"
          iconSize={18}
          linkName="Developer"
          linkUrl="/"
        /> */}
                <SideLink
                    icon={BsPencilSquare}
                    iconColor="white"
                    iconSize={18}
                    linkName="Write Blog"
                    linkUrl="/blog/create"
                />
                <SideLink
                    icon={BsGithub}
                    iconColor="white"
                    iconSize={18}
                    linkName="Github"
                    linkUrl="https://github.com/Abdullahhost"
                />
                <SideLink
                    icon={BsPersonLinesFill}
                    iconColor="white"
                    iconSize={18}
                    linkName="Login"
                    linkUrl="/login"
                />
            </div>

            <div className="rounded-full fixed bottom-5 left-0 text-center">
                <ProfileStatus />
            </div>
        </div>
    );
};

export default SideBar;
