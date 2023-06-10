export function redact(
    node,
    {
        delay = 0,
        coverDuration = 300,
        holdDuration = 200,
        uncoverDuration = 300,
        color = null,
    }
) {
    let duration = coverDuration + holdDuration + uncoverDuration;

    // if color property not provided, set color as the text color
    if (color == null) {
        color = document.defaultView.getComputedStyle(node, null)["color"];
        console.log(color);
    }

    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }

    // animation to cover text from left to right with a coloured rectangle
    const coverState = (timer) => {
        return `
            background:
                linear-gradient(
                    to right,
                    ${color} ${easeOutCubic(timer) * 100}%,
                    rgb(0, 0, 0, 0) 0%
                    );
            color: rgb(0, 0, 0, 0)
            `;
    };

    const holdState = () => {
        return coverState(1);
    };

    // animation to uncover text from left to right
    const uncoverState = (timer) => {
        return `
            background:
                linear-gradient(
                    to right, 
                    rgb(0, 0, 0, 0) ${easeOutCubic(timer) * 100}%,
                    ${color} 0%
                    );
            color: ${color}
            `;
    };

    return {
        delay,
        duration,
        css: (proportion) => {
            let elapsedTime = proportion * duration;

            // check if timer is within the cover, hold or uncover duration
            if (elapsedTime < coverDuration) {
                return coverState(elapsedTime / coverDuration);
            } else if (elapsedTime < coverDuration + holdDuration) {
                return holdState();
            } else {
                return uncoverState(
                    (elapsedTime - (coverDuration + holdDuration)) /
                        uncoverDuration
                );
            }
        },
    };
}
