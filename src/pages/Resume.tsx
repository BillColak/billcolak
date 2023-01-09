


// Todo be able save it as a pdf


export default function Resume() {



    function createSection(title: string, content: string) {
        return (
            <section className="Education v-flex justify-center items-center">
                <div className="v-flex items-start w-fit">
                    <h2>{title}</h2>
                    <p>{content}</p>
                </div>
            </section>
        )
    }



    return (
        <div className="bg-sky-700">
            <section className="Education v-flex justify-center items-center">
                <div className="v-flex items-start w-fit">
                    <h1 className="text-4xl font-bold">Education</h1>
                    <div className="">
                        Bachelor of Commerce, Finance
                        Bachelor of Science in Computer Science
                    </div>
                    <div className="">
                        Scholarship & Awards
                        Certificates:
                    </div>
                </div>
            </section>

            <section className="Areas of Expertise v-flex justify-center items-center">
                <div className="v-flex items-start w-fit">
                    <h1 className="text-4xl font-bold">Areas of Expertise</h1>
                    <h3 className="text-4xl">Commerce </h3>
                    <table className="table-auto w-full h-full ">
                        <tbody>
                        <tr>
                            <td>Skill1</td>
                            <td>Skill2</td>
                            <td>Skill3</td>
                        </tr>
                        <tr>
                            <td>Skill4</td>
                            <td>Skill5</td>
                            <td>Skill6</td>
                        </tr>
                        <tr>
                            <td>Skill7</td>
                            <td>Skill8</td>
                            <td>Skill9</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="Experience w-full h-full "></section>
            <section className="Skills Summary w-full h-full "></section>
            <section className="Projects w-full h-full "></section>
            <section className="Activities Interests w-full h-full ">
                {/*Aspirations: Experiences and Knowledge I want to attain.*/}
                {/*Hobbies: Things I do for fun.*/}
                <ul>
                    <li>Music</li>
                    <li>Video Games</li>
                </ul>
            </section>


        </div>
    );
}
