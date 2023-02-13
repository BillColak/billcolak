import React, {useEffect, useRef} from "react";


// todo this need to be optimized, maybe use three js instead of css for lights and shadows

export default function GlowButton(props: any) {

    const {children} = props;
    const featuresRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (featuresRef.current) {
            featuresRef.current.addEventListener("pointermove", (ev) => {
                const featureEls = featuresRef.current!.querySelectorAll(".feature") as NodeListOf<HTMLDivElement>;
                featureEls.forEach((featureEl) => {
                    // Not optimized yet, I know
                    const rect = featureEl.getBoundingClientRect();
                    featureEl.style.setProperty("--x-px", (ev.clientX - rect.left) + "px");
                    featureEl.style.setProperty("--y-px",  (ev.clientY - rect.top) + "px");
                });
            });
        }
    }, []);
 

    return (
        <div className="w-full h-full">
            <div ref={featuresRef} className="features box-border relative">
                {features(6)}
            </div>
        </div>
    )
}

function features(number: number) {
    const features = [];
    for (let i = 0; i < number; i++) {
        features.push(
            <div className="feature box-border relative">
                <button  className="feature-content box-border relative">
                    <strong>Some feature</strong>
                    <span>Description of the awesome feature</span>
                </button>
            </div>
        )
    }
    return features;
}
