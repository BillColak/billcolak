


// Todo be able save it as a pdf


import {useRef} from "react";

export default function Resume() {


    return (
        <>
            <section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                    <h1 className="text-4xl font-bold leading-none sm:text-5xl">Quisquam necessita vel
                        <span className="dark:text-violet-400">laborum doloribus</span>delectus
                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
                    <div className="flex flex-wrap justify-center">
                        <button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Get started</button>
                        <button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-50 dark:border-gray-700">Learn more</button>
                    </div>
                </div>
            </section>
            <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
                <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
                    <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-900">
                        <span className="block mb-2 dark:text-violet-400">Mamba design system</span>
                        <h1 className="text-5xl font-extrabold dark:text-gray-50">Build it with Mamba</h1>
                        <p className="my-8">
                            <span className="font-medium dark:text-gray-50">Modular and versatile.</span>Fugit vero
                            facilis dolor sit neque cupiditate minus esse accusamus cumque at.
                        </p>
                        <form action=""
                              className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid">
                            <div>
                                <label htmlFor="name" className="text-sm sr-only">Your name</label>
                                <input id="name" type="text" placeholder="Your name"
                                       className="w-full rounded-md focus:ring focus:ring-violet-400 dark:border-gray-700"/>
                            </div>
                            <div>
                                <label htmlFor="lastname" className="text-sm sr-only">Email address</label>
                                <input id="lastname" type="text" placeholder="Email address"
                                       className="w-full rounded-md focus:ring focus:ring-violet-400 dark:border-gray-700"/>
                            </div>
                            <button type="button"
                                    className="w-full py-2 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Join
                                the waitlist
                            </button>
                        </form>
                    </div>
                    <img src="https://source.unsplash.com/random/480x360" alt=""
                         className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500"/>
                </div>
            </section>

        </>
    );
}
