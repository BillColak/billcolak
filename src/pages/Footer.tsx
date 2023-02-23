import {NavLink} from "react-router-dom";
// import favicon from "../assets/favicon.png";


const favicon = (
    <svg width="117" height="132" viewBox="0 0 117 132" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_4_97242)">
            <path d="M75.2531 89.908C76.5871 89.138 76.5871 87.213 75.2531 86.444L43.7531 68.257C42.4201 67.487 40.7531 68.45 40.7531 69.989V106.362C40.7531 107.902 42.4201 108.864 43.7531 108.094L75.2531 89.908Z" fill="#6678FF"/>
            <path d="M36.753 23.2237C38.087 22.4539 39.753 23.4162 39.753 24.9558V61.329C39.753 62.868 38.087 63.831 36.753 63.061L5.25347 44.8744C3.92007 44.1046 3.92007 42.1801 5.25347 41.4103L36.753 23.2237Z" fill="#6678FF"/>
            <path d="M76.172 45.4987C77.505 44.7289 79.172 45.6912 79.172 47.2308V83.604C79.172 85.143 77.505 86.106 76.172 85.336L44.672 67.149C43.339 66.38 43.339 64.455 44.672 63.685L76.172 45.4987Z" fill="#6678FF"/>
            <path d="M83.5911 85.094C82.2571 85.864 80.5911 84.902 80.5911 83.362V46.9891C80.5911 45.4495 82.2571 44.4873 83.5911 45.2571L115.091 63.444C116.424 64.213 116.424 66.138 115.091 66.908L83.5911 85.094Z" fill="#6678FF"/>
            <path d="M75.672 44.6327C77.005 43.8629 77.005 41.9384 75.672 41.1686L44.172 22.9821C42.839 22.2123 41.172 23.1745 41.172 24.7141V61.087C41.172 62.627 42.839 63.589 44.172 62.819L75.672 44.6327Z" fill="#6678FF"/>
            <path d="M36.335 68.499C37.668 67.729 39.335 68.691 39.335 70.231V106.604C39.335 108.143 37.668 109.106 36.335 108.336L4.83494 90.149C3.50164 89.38 3.50164 87.455 4.83494 86.685L36.335 68.499Z" fill="#6678FF"/>
            <path d="M36.253 22.3577C37.587 21.5879 37.587 19.6634 36.253 18.8936L4.75354 0.707098C3.42014 -0.0627024 1.75354 0.899496 1.75354 2.4391V38.8122C1.75354 40.3518 3.42014 41.3141 4.75354 40.5443L36.253 22.3577Z" fill="#6678FF"/>
            <path d="M35.8351 67.633C37.1681 66.863 37.1681 64.938 35.8351 64.169L4.33496 45.9821C3.00166 45.2123 1.33496 46.1745 1.33496 47.7141V84.087C1.33496 85.627 3.00166 86.589 4.33496 85.819L35.8351 67.633Z" fill="#6678FF"/>
            <path d="M3.71057 91.202C2.37717 90.432 0.710571 91.394 0.710571 92.934V129.307C0.710571 130.847 2.37717 131.809 3.71057 131.039L35.211 112.853C36.544 112.083 36.544 110.158 35.211 109.388L3.71057 91.202Z" fill="#6678FF"/>
        </g>
        <defs>
            <clipPath id="clip0_4_97242">
                <rect width="117" height="132" fill="white"/>
            </clipPath>
        </defs>
    </svg>
)

const github = (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_140_101942)">
            <path d="M8 0.380981C6.99945 0.380981 6.0087 0.578054 5.08432 0.960947C4.15993 1.34384 3.32001 1.90505 2.61252 2.61255C1.18367 4.0414 0.380951 5.97933 0.380951 8.00003C0.380951 11.3676 2.56762 14.2248 5.59238 15.2381C5.97333 15.2991 6.09524 15.0629 6.09524 14.8572V13.5696C3.98476 14.0267 3.53524 12.5486 3.53524 12.5486C3.18476 11.6648 2.68952 11.4286 2.68952 11.4286C1.99619 10.9562 2.74286 10.9715 2.74286 10.9715C3.50476 11.0248 3.90857 11.7562 3.90857 11.7562C4.57143 12.9143 5.69143 12.5715 6.12571 12.3886C6.19428 11.8934 6.39238 11.5581 6.60571 11.3676C4.91428 11.1772 3.13905 10.5219 3.13905 7.61908C3.13905 6.77336 3.42857 6.09527 3.92381 5.55431C3.84762 5.36384 3.58095 4.57146 4 3.54289C4 3.54289 4.64 3.33717 6.09524 4.32003C6.69714 4.15241 7.35238 4.0686 8 4.0686C8.64762 4.0686 9.30286 4.15241 9.90476 4.32003C11.36 3.33717 12 3.54289 12 3.54289C12.419 4.57146 12.1524 5.36384 12.0762 5.55431C12.5714 6.09527 12.861 6.77336 12.861 7.61908C12.861 10.5296 11.0781 11.1696 9.37905 11.36C9.65333 11.5962 9.90476 12.061 9.90476 12.7696V14.8572C9.90476 15.0629 10.0267 15.3067 10.4152 15.2381C13.44 14.2172 15.619 11.3676 15.619 8.00003C15.619 6.99948 15.422 6.00873 15.0391 5.08435C14.6562 4.15996 14.095 3.32004 13.3875 2.61255C12.68 1.90505 11.8401 1.34384 10.9157 0.960947C9.9913 0.578054 9.00055 0.380981 8 0.380981Z" fill="#6678FF"/>
        </g>
        <defs>
            <clipPath id="clip0_140_101942">
                <rect width="18" height="18" fill="white"/>
            </clipPath>
        </defs>
    </svg>

)

const linkedin = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_140_101944)">
            <path d="M0 1.146C0 0.513 0.526 0 1.175 0H14.825C15.474 0 16 0.513 16 1.146V14.854C16 15.487 15.474 16 14.825 16H1.175C0.526 16 0 15.487 0 14.854V1.146ZM4.943 13.394V6.169H2.542V13.394H4.943ZM3.743 5.182C4.58 5.182 5.101 4.628 5.101 3.934C5.086 3.225 4.581 2.686 3.759 2.686C2.937 2.686 2.4 3.226 2.4 3.934C2.4 4.628 2.921 5.182 3.727 5.182H3.743ZM8.651 13.394V9.359C8.651 9.143 8.667 8.927 8.731 8.773C8.904 8.342 9.299 7.895 9.963 7.895C10.832 7.895 11.179 8.557 11.179 9.529V13.394H13.58V9.25C13.58 7.03 12.396 5.998 10.816 5.998C9.542 5.998 8.971 6.698 8.651 7.191V7.216H8.635C8.64031 7.20765 8.64564 7.19932 8.651 7.191V6.169H6.251C6.281 6.847 6.251 13.394 6.251 13.394H8.651Z" fill="#6678FF"/>
        </g>
        <defs>
            <clipPath id="clip0_140_101944">
                <rect width="16" height="16" fill="white"/>
            </clipPath>
        </defs>
    </svg>

)



export default function Footer(){
    return (
        <footer className="px-4 divide-y dark:dark:bg-gray-800 dark:dark:text-gray-100 font-mavis">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3">
                    <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
                        <div className="flex items-center justify-center w-12 h-12  ">
                            {favicon}
                        </div>
                        <span className="self-center text-4xl font-semibold tracking-tight">Bill Colak</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4 tracking-wide">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:dark:text-gray-50 text-2xl font-bold">Projects</h3>
                        <ul className="space-y-1 text-xl">
                            <li>
                                <a rel="noopener noreferrer" href="#">Particles</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">WebGL Earth</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Pricing</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:dark:text-gray-50 text-2xl font-bold">Company</h3>
                        <ul className="space-y-1 text-xl">
                            <li>
                                <a rel="noopener noreferrer" href="#">Privacy</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase dark:dark:text-gray-50 text-2xl font-bold">Developers</h3>
                        <ul className="space-y-1 text-xl">
                            <li>
                                <a rel="noopener noreferrer" href="#">Public API</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Documentation</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Guides</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="uppercase dark:dark:text-gray-50 text-2xl font-bold">Social media</div>
                        <div className="flex justify-start space-x-3">
                            <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
                                {linkedin}
                            </a>
                            <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center p-1">
                                {github}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center dark:dark:text-gray-400">© 2022. All rights reserved.</div>
        </footer>
    )
};

            {/*<nav className="flex flex-row font-sans text-lg text-white">*/}
            {/*    <NavLink to="/">home</NavLink>*/}
            {/*</nav>*/}
            {/*<div className="footer_bottom flex flex-row justify-between items-center">*/}
            {/*    <div className="rights_container flex flex-col items-left">*/}
            {/*        <img className="h-10 px-1" src={favicon} alt="logo" />*/}
            {/*        <p>Designed & Developed by <a href="https://www.linkedin.com/in/bill-colak/" target="_blank" rel="noreferrer" className={'text-blue-600 underline italic'}>Bill Colak</a></p>*/}
            {/*        <p>© 2022. All rights reserved.</p>*/}
            {/*    </div>*/}

            {/*projects*/}
            {/*    <div className="projects_container flex flex-col items-right">*/}
            {/*        <h3 className="text-2xl font-bold">Projects</h3>*/}
            {/*        <ul className="list-none">*/}
            {/*            <li><NavLink to="/fbo-particles">FBO Particles</NavLink></li>*/}
            {/*            <li><NavLink to="/earth">Earth</NavLink></li>*/}
            {/*            <li><NavLink to="/experience">Experience</NavLink></li>*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}

// https://mambaui.com/components/footer
// https://www.hyperui.dev/components/marketing/footers#component-3
