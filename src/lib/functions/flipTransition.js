export function flipTransition(
    node,
    { delay = 0, flipDuration1 = 1000, flipDuration2 = 1000, color = "white" }
) {
    let duration = flipDuration1 + flipDuration2;

    let bgColor = document.defaultView.getComputedStyle(node, null)[
        "background-color"
    ];

    // animation to flip element until it's perpendicular to the screen
    const state1 = (timer) => {
        return `
            transform: rotateY(${-180 + timer * 90}deg);
            `;
    };

    // animation to complete flipping element to reveal the content
    const state2 = (timer) => {
        return `
            transform: rotateY(${-90 + timer * 90}deg);
            `;
    };

    return {
        delay,
        duration,
        css: (proportion) => {
            let elapsedTime = proportion * duration;

            // check if timer is within the first or second part of the animation
            if (elapsedTime < flipDuration1) {
                return state1(elapsedTime / flipDuration1);
            } else {
                return state2((elapsedTime - flipDuration1) / flipDuration2);
            }
        },
    };
}
