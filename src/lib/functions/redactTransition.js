export function redact(
    node,
    {
        delay = 0,
        coverDuration = 200,
        holdDuration = 300,
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
            // check if timer is within the cover or uncover duration
            let elapsedTime = proportion * duration;
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
