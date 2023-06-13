<script>
    import { onMount } from "svelte";
    import { rotate, translate } from "../../functions/util";

    let canvas = null;
    let pageHeight;
    let pageWidth;
    let ctx;

    const startTime = Date.now();
    let time = startTime;
    let elapsed;

    // used to speed up elapsed time at when page is first opened and then approach a 1:1 time count to slow down the animation
    // parameters s and t - function compresses s seconds of animation into t seconds upon page load.
    const distortElapsed = (elapsed, s, t) => {
        // scale to milliseconds
        s *= 1000;
        t *= 1000;

        const a = (t ** 2 * s) / (s - t);
        return elapsed + s - a / (elapsed + a / s);
    };

    onMount(() => {
        ctx = canvas.getContext("2d");

        const interval = setInterval(() => {
            time = Date.now();
        }, 10);

        return () => {
            clearInterval(interval);
        };
    });

    // update ms elapsed since page was opened when time updates from interval
    $: elapsed = time - startTime;
    $: distortedElapsed1 = distortElapsed(elapsed, 400, 8);
    $: distortedElapsed2 = distortElapsed(elapsed, 200, 4);

    // keep canvas width updated if window size changes
    $: if (canvas != null) canvas.width = pageWidth;
    $: if (canvas != null) canvas.height = pageHeight;

    const segmentThickness = 5;
    const gradientWidth = 100;
    const translateX = 0;
    $: translateY = 0.9 * pageHeight;

    // t: seconds to phase shift curve by
    // amp: amplitude of wave
    // period: width of 1 period of wave
    // timePeriod: seconds taken for wave to travel 1 period
    const waveCurve = (t, amp, period, timePeriod) => (x) => {
        return (
            amp * Math.sin(2 * Math.PI * (x / period + t / (timePeriod * 1000)))
        );
    };

    // update curve if canvas changes due to window size change
    $: {
        if (canvas != null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const waves = [
                {
                    mainWave: waveCurve(
                        distortedElapsed1,
                        0.03 * pageHeight,
                        0.3 * pageWidth,
                        20
                    ),
                    addlWave: waveCurve(
                        distortedElapsed1,
                        0.03 * pageHeight,
                        0.5 * pageWidth,
                        15
                    ),
                    color: "#eca80a3c",
                    rotation: 5,
                },
                {
                    mainWave: waveCurve(
                        distortedElapsed2,
                        0.02 * pageHeight,
                        0.25 * pageWidth,
                        15
                    ),
                    addlWave: waveCurve(
                        distortedElapsed2,
                        0.02 * pageHeight,
                        0.5 * pageWidth,
                        12
                    ),
                    color: "#bababac3",
                    rotation: 5,
                },
                ,
            ];

            waves.forEach((wave) => {
                for (let x = -10; x < 1 * pageWidth; x += segmentThickness) {
                    let x1 = x;
                    let y1 = wave.mainWave(x1) + wave.addlWave(x1);

                    let x2 = x1 + segmentThickness;
                    let y2 = wave.mainWave(x2) + wave.addlWave(x2);

                    let x3 = x2;
                    let y3 = y2 + gradientWidth;

                    let x4 = x1;
                    let y4 = y1 + gradientWidth;

                    [x1, y1] = rotate(x1, y1, -wave.rotation);
                    [x2, y2] = rotate(x2, y2, -wave.rotation);
                    [x3, y3] = rotate(x3, y3, -wave.rotation);
                    [x4, y4] = rotate(x4, y4, -wave.rotation);

                    [x1, y1] = translate(x1, y1, translateX, translateY);
                    [x2, y2] = translate(x2, y2, translateX, translateY);
                    [x3, y3] = translate(x3, y3, translateX, translateY);
                    [x4, y4] = translate(x4, y4, translateX, translateY);

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(x3, y3);
                    ctx.lineTo(x4, y4);

                    const grd_x1 = x1;
                    const grd_y1 = y1;
                    const t =
                        [(x1 - x4) * (x3 - x4) + (y1 - y4) * (y3 - y4)] /
                        [(x3 - x4) ** 2 + (y3 - y4) ** 2];
                    const grd_x2 = x4 + t * (x3 - x4);
                    const grd_y2 = y4 + t * (y3 - y4);

                    const gradient = ctx.createLinearGradient(
                        grd_x1,
                        grd_y1,
                        grd_x2,
                        grd_y2
                    );
                    gradient.addColorStop(0, wave.color);
                    gradient.addColorStop(1, "#ffffff00");
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.moveTo(grd_x1, grd_y1);
                    ctx.lineTo(grd_x2, grd_y2);
                    // ctx.stroke();
                }
            });
        }
    }
</script>

<svelte:window bind:innerWidth={pageWidth} bind:innerHeight={pageHeight} />

<canvas bind:this={canvas} />

<style>
</style>
