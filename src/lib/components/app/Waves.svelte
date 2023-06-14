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
    $: distortedElapsed1 = distortElapsed(elapsed, 70, 4);
    $: distortedElapsed2 = distortElapsed(elapsed, 40, 3);

    // keep canvas width updated if window size changes
    $: if (canvas != null) canvas.width = pageWidth;
    $: if (canvas != null) canvas.height = pageHeight;

    const segmentThickness = 10;
    $: gradientWidth = 0.08 * pageHeight;
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
                        0.02 * pageWidth,
                        0.3 * pageWidth,
                        40
                    ),
                    addlWave: waveCurve(
                        distortedElapsed1,
                        0.02 * pageWidth,
                        0.5 * pageWidth,
                        30
                    ),
                    color: "#eca80a3c",
                    rotation: 5,
                },
                {
                    mainWave: waveCurve(
                        distortedElapsed2,
                        0.014 * pageWidth,
                        0.25 * pageWidth,
                        25
                    ),
                    addlWave: waveCurve(
                        distortedElapsed2,
                        0.014 * pageWidth,
                        0.5 * pageWidth,
                        20
                    ),
                    color: "#bababa97",
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

                    let p = [
                        { x: x1, y: y1 },
                        { x: x2, y: y2 },
                        { x: x3, y: y3 },
                        { x: x4, y: y4 },
                    ];

                    p = p.map((point) => {
                        point = rotate(point.x, point.y, -wave.rotation);
                        point = translate(
                            point.x,
                            point.y,
                            translateX,
                            translateY
                        );
                        return point;
                    });

                    ctx.beginPath();
                    ctx.moveTo(p[0].x, p[0].y);
                    p.slice(1).forEach((point) => {
                        ctx.lineTo(point.x, point.y);
                    });

                    const grd_x1 = p[0].x;
                    const grd_y1 = p[0].y;
                    const t =
                        [
                            (p[0].x - p[3].x) * (p[2].x - p[3].x) +
                                (p[0].y - p[3].y) * (p[2].y - p[3].y),
                        ] / [(p[2].x - p[3].x) ** 2 + (p[2].y - p[3].y) ** 2];
                    const grd_x2 = p[3].x + t * (p[2].x - p[3].x);
                    const grd_y2 = p[3].y + t * (p[2].y - p[3].y);

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
