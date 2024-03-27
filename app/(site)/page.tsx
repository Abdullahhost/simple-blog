

import SideBar from "../components/header/sidebar";
import Topbar from "../components/header/topbar";

import Categories from "../components/categories";
import BlogList from "../blog/components/BlogList";
import Link from "next/link";
import { getData } from "../libs/getData";
import { MotionDiv } from "../blog/components/MotionDiv";


export default async function Home({ searchParams }: any) {

    const perPage: number = 4;

    let page = parseInt(searchParams.page, 10);
    !page || page < 1 ? 1 : page;

    const itemData = await getData(perPage, page);

    const itemCount = itemData?.countBlog;
    const allBlog = itemData?.items;

    const totalPage = Math.ceil(itemCount! / perPage);

    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;


    const pageNumber: number[] = [];

    // const offsetNumber: number = 3;
    // for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    //   if (i >= 1 && i <= totalPage) {

    //     pageNumber.push(i);
    //   }
    // }

    for (let x = 1; x <= totalPage; x++) {
        pageNumber.push(x);
    }



    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };


    return (
        <main className="flex items-start justify-start w-full">
            <SideBar />
            <div className="flex flex-col w-full ml-0 lg:ml-[220px] pb-10">
                <Topbar />
                <h2 className="text-2xl font-semibold text-center md:text-start transition text-[#4d4b4d] pt-10 mb-4 dark:text-white px-6">Blog Page</h2>
                <div className="w-full flex flex-col-reverse md:flex-row  gap-2 items-start justify-center lg:justify-between" >


                    <MotionDiv

                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="container px-6 py-3 flex md:gap-8 gap-16 flex-wrap items-start justify-center lg:justify-start">

                        {itemCount! > 0 ? (
                            <>
                                <BlogList data={allBlog} />

                            </>
                        ) : (
                            <div>
                                <h1>There Are No Available Data here!</h1>
                            </div>
                        )
                        }
                    </MotionDiv>
                    <div className="w-full md:w-fit mr-6">
                        <Categories />
                    </div>
                </div>

                <div className="px-6 py-3 flex gap-4 w-full items-center mt-10">
                    <div>

                        {!searchParams.page || page === 1 ? (
                            <>
                                <div aria-disabled={true}></div>
                                {/* <div className="opacity-75 text-neutral-600 dark:text-[#ddd]" aria-disabled={true}></div> */}
                            </>
                        ) : (
                            <>

                                <Link aria-label="Previous Page" className="hover:bg-[#2B2A6D] border dark:border-neutral-600 shadow-md dark:shadow-neutral-500  hover:text-white hover:dark:bg-[#399B19] text-sm px-4 py-2 rounded-2xl  dark:bg-[#3D3D3D]  transition" href={`?page=${prevPage}`}>
                                    Previous
                                </Link>
                            </>
                        )}
                    </div>
                    <div >
                        {
                            pageNumber.map((singleNumber, index) => (

                                <Link className={`hover:bg-[#2B2A6D] hover:text-white shadow-md
                 dark:shadow-neutral-500  hover:dark:bg-[#399B19] px-4 text-sm 
                 py-2 rounded-lg mx-2 transition border dark:border-neutral-600
                 ${page === singleNumber ? "bg-[#2B2A6D] text-white  dark:bg-[#399B19]" : ''} ${!page && singleNumber === 1 ? "bg-[#2B2A6D] text-white  dark:bg-[#399B19]" : ""}  `} key={index} href={`?page=${singleNumber}`}>
                                    {singleNumber}
                                </Link>
                            ))
                        }
                    </div>
                    <div>
                        {itemCount !== 0 ? page > totalPage - 1 ? (
                            <>
                                <div aria-disabled={true}></div>
                            </>
                        ) : (
                            <>
                                <Link arai-label="Next Page" className="hover:bg-[#2B2A6D] dark:border-neutral-600 shadow-md dark:shadow-neutral-500  hover:text-white hover:dark:bg-[#399B19] text-sm px-4 py-2 rounded-2xl border dark:bg-[#3D3D3D]  transition" href={`${!page ? `?page=${2}` : `?page=${nextPage}`}`}>
                                    Next
                                </Link>
                            </>
                        ): ""}
                    </div>
                </div>
            </div>
        </main>
    );
}
