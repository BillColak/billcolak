import React, {Suspense, useContext, useRef} from "react";
import {Canvas} from "@react-three/fiber";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import {Phone} from "../components/iPhone/iPhone";
import Footer from "./Footer";
import {Overlay, Underlay} from "../components/Baubles/Underlay";
import {Baubles} from "../components/Baubles/Baubles";
import Laptop from "../components/Laptop/Laptop";
import ErrorBoundary from "../components/errorBoundary";
import {GlobalContext} from "../Utils/Provider";



export default function DesignPage() {
    const {theme, setTheme} = useContext(GlobalContext)

    return (
        <ErrorBoundary  >
    <Suspense fallback={<EDLoadingScreen/>}>
        <div className={'h-screen overflow-x-hidden'}>
            <Underlay />
                <Baubles />
            <Overlay />
        </div>
        <section className="dark:text-gray-100">
            <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                <h1 className="text-4xl font-bold leading-none sm:text-5xl"> Website Is
                    <span className="dark:text-indigo-500"> Under </span>Development
                </h1>
                <p className="px-8 mt-8 mb-12 text-lg">Thank you for your patience</p>
                <div className="flex flex-wrap justify-center">
                    <button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-indigo-500 dark:text-gray-900">Get started</button>
                    <button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-50 dark:border-gray-700">Learn more</button>
                </div>
            </div>
        </section>
        <div className={'h-[800px]'}>
            <Suspense fallback={<EDLoadingScreen/>}>
                <Canvas>
                    <Phone />
                    {/*<ambientLight intensity={1.5} />*/}
                    <pointLight position={[10, 10, 10]} />
                </Canvas>
            </Suspense>
        </div>
        <section>
            <div
                className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
            >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div
                        className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
                    >
                        <img
                            alt="Party"
                            src="/scroll/images/img4.png"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl dark:text-indigo-500">Buy My Merch</h2>

                        <p className="mt-4 text-gray-400">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic
                            atque tenetur quis eius quos ea neque sunt, accusantium soluta minus
                            veniam tempora deserunt? Molestiae eius quidem quam repellat.
                        </p>

                        <button
                            className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                            onClick={() => {
                                console.log(theme)
                            }}
                        >
                            Get Started Today
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <div className={'h-[800px]'}>
            <Suspense fallback={<EDLoadingScreen/>}>
                <Canvas camera={{position: [0, 0, 4], }}>
                    <Laptop />
                    <ambientLight intensity={1.5} />
                </Canvas>
            </Suspense>
        </div>
        <section>
            <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                    <div className="relative z-10 lg:py-16">
                        <div className="relative h-64 sm:h-80 lg:h-full">
                            <img
                                alt="House"
                                src="/scroll/images/img3.png"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="relative flex items-center bg-gray-800">
        <span
            className="hidden lg:absolute lg:inset-y-0 lg:-left-16 lg:block lg:w-16 lg:bg-gray-800"
        ></span>

                        <div className="p-8 sm:p-16 lg:p-24">
                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
                                debitis.
                            </h2>

                            <p className="mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
                                molestiae! Quidem est esse numquam odio deleniti, beatae, magni
                                dolores provident quaerat totam eos, aperiam architecto eius quis
                                quibusdam fugiat dicta.
                            </p>

                            <a
                                href="#"
                                className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </Suspense>
        </ErrorBoundary>
    );
}
