"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { BsJustifyRight, BsMoonStars, BsSearch, BsSun } from "react-icons/bs";

import { ThemeContext } from "@/app/context/lightdark";
import Button from "../../Button";



const Topbar = () => {

    const { state, dispatch } = useContext(ThemeContext);
    const { status, data: session } = useSession();

    const [isDarkMode, setIsDarkMode] = useState<boolean>();

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode) {
            setIsDarkMode(JSON.parse(storedDarkMode));
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const handleClick = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };

    return (
        <div className="border-b-[.1px] dark:border-[rgba(145,145,145,0.5)] bg-white dark:bg-black w-full h-[60px] px-6 py-3 flex items-start  md:items-center  gap-4 justify-between">
            <div className="block w-fit lg:hidden " >
                <BsJustifyRight onClick={() => dispatch({ type: 'SIDEBAR_TOGGLE' })} fontSize={20} />
            </div>
            <div className="relative w-full md:w-3/4 hidden md:block ">
                <input
                    className="py-2 w-full outline-none px-6 rounded-md text-black dark:text-neutral-200 font-semibold bg-slate-100 dark:bg-[#3d3d3d] border border-[#1111]"
                    type="text"
                    placeholder="Search"
                    name="search"
                />
                <span
                    className="absolute hover:bg-[rgb(64,63,134)] transition hover:text-white top-0 right-0 w-10 h-full dark:bg-[#4b4a4a] bg-slate-200  dark:hover:bg-[#242424] flex items-center justify-center"
                    style={{
                        borderTopRightRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                    }}
                >
                    <BsSearch fontWeight={"bold"} />
                </span>
            </div>


            <div className="flex gap-3 items-center text-xs mr-6">
                <Button type="button" onClick={handleClick}>
                    {isDarkMode ? (
                        <>
                            <BsMoonStars color="#2BB15B" fontSize={20} />
                            {"Light"}
                        </>
                    ) : (
                        <>
                            <BsSun color="#s3e34" fontSize={20} />
                            {"Dark"}
                        </>
                    )}
                </Button>
                {status === "authenticated" ? (
                    <>
                        <button className="text-md whitespace-nowrap" type="button" onClick={() => signOut()}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="px-4 py-2 bg-green-400 text-white rounded-md" href={'/login'}>
                            Sign In
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Topbar;
