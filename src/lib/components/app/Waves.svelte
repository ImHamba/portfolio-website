<script>
    import { onMount } from "svelte";
    import { getCSSvariable, rotate, translate } from "../../functions/util";

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

    let gradient1;
    let gradient2;

    onMount(() => {
        ctx = canvas.getContext("2d");

        gradient1 = ctx.createLinearGradient(
            0.5 * pageWidth,
            1.1 * pageHeight,
            0.6 * pageWidth,
            0
        );
        gradient1.addColorStop(0, getCSSvariable("accent1"));
        gradient1.addColorStop(1, getCSSvariable("accent3"));

        gradient2 = ctx.createRadialGradient(
            0,
            0,
            0.1 * pageWidth,
            0,
            0,
            Math.sqrt(pageHeight ** 2 + pageWidth ** 2)
        );
        gradient2.addColorStop(0, getCSSvariable("accent4"));
        gradient2.addColorStop(1, getCSSvariable("accent2"));

        const interval = setInterval(() => {
            time = Date.now();
        }, 10);

        return () => {
            clearInterval(interval);
        };
    });

    // update ms elapsed since page was opened when time updates from interval
    $: elapsed = time - startTime;
    $: distortedElapsed1 = distortElapsed(elapsed, 100, 6);
    $: distortedElapsed2 = distortElapsed(elapsed, 40, 3);

    // keep canvas width updated if window size changes
    $: if (canvas != null) canvas.width = pageWidth;
    $: if (canvas != null) canvas.height = canvas.scrollHeight;

    // t: seconds to phase shift curve by
    // amp: amplitude of wave
    // period: width of 1 period of wave
    // timePeriod: seconds taken for wave to travel 1 period
    const waveCurve = (t, amp, period, timePeriod) => (x) => {
        return (
            amp * Math.sin(2 * Math.PI * (x / period + t / (timePeriod * 1000)))
        );
    };

    // update the curve definition as time passes
    let waves;
    $: if (canvas != null)
        waves = [
            {
                mainWave: waveCurve(
                    distortedElapsed1,
                    0.03 * pageWidth,
                    0.3 * pageWidth,
                    40
                ),
                addlWave: waveCurve(
                    distortedElapsed1,
                    0.015 * pageWidth,
                    0.5 * pageWidth,
                    30
                ),
                fillStyle: gradient1,
                rotation: 4,
                // gradientThickness: 0.06 * pageHeight,
                translateY: 0.92 * canvas.height,
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
                fillStyle: gradient2,
                rotation: 4,
                // gradientThickness: 0.06 * pageHeight,
                translateY: 0.89 * canvas.height,
            },
        ];

    // update the points associated with the wave curves as the curve equations change
    const segmentThickness = 10;
    const translateX = 0;
    let wavePoints;
    let gradientPoints;
    $: {
        if (canvas != null)
            [wavePoints, gradientPoints] = waves
                .map((wave) => {
                    let thisWavePoints = [];
                    let thisGradientPoints = [];
                    for (
                        let x = -10;
                        x < 1.1 * pageWidth;
                        x += segmentThickness
                    ) {
                        let wavePoint = {
                            x: x,
                            y: wave.mainWave(x) + wave.addlWave(x),
                        };
                        // let gradientPoint = {
                        //     x: x,
                        //     y: wavePoint.y + wave.gradientThickness,
                        // };

                        wavePoint = rotate(
                            wavePoint.x,
                            wavePoint.y,
                            -wave.rotation
                        );
                        wavePoint = translate(
                            wavePoint.x,
                            wavePoint.y,
                            translateX,
                            wave.translateY
                        );
                        // gradientPoint = rotate(
                        //     gradientPoint.x,
                        //     gradientPoint.y,
                        //     -wave.rotation
                        // );
                        // gradientPoint = translate(
                        //     gradientPoint.x,
                        //     gradientPoint.y,
                        //     translateX,
                        //     wave.translateY
                        // );

                        thisWavePoints.push(wavePoint);
                        // thisGradientPoints.push(gradientPoint);
                    }
                    return [thisWavePoints, thisGradientPoints];
                })
                .reduce(
                    ([a, b], [ac, bc]) => {
                        a.push(ac);
                        b.push(bc);
                        return [a, b];
                    },
                    [[], []]
                );
    }

    // update canvas as curves change
    $: {
        if (canvas != null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < waves.length; i++) {
                let thisWavePoints = wavePoints[i];
                // let thisGradientPoints = gradientPoints[i];

                ctx.beginPath();
                ctx.moveTo(pageWidth, 0);
                ctx.lineTo(0, 0);

                for (const point of thisWavePoints) {
                    ctx.lineTo(point.x, point.y);
                }
                ctx.fillStyle = waves[i].fillStyle;
                ctx.fill();

                // for (let j = 0; j < thisWavePoints.length - 1; j++) {
                //     const p1 = thisWavePoints[j];
                //     const p2 = thisWavePoints[j + 1];
                //     const p3 = thisGradientPoints[j + 1];
                //     const p4 = thisGradientPoints[j];

                //     ctx.beginPath();
                //     ctx.moveTo(p1.x, p1.y);
                //     ctx.lineTo(p2.x, p2.y);
                //     ctx.lineTo(p3.x, p3.y);
                //     ctx.lineTo(p4.x, p4.y);

                //     const grd_x1 = p1.x;
                //     const grd_y1 = p1.y;
                //     const t =
                //         [
                //             (p1.x - p4.x) * (p3.x - p4.x) +
                //                 (p1.y - p4.y) * (p3.y - p4.y),
                //         ] / [(p3.x - p4.x) ** 2 + (p3.y - p4.y) ** 2];
                //     const grd_x2 = p4.x + t * (p3.x - p4.x);
                //     const grd_y2 = p4.y + t * (p3.y - p4.y);

                //     const gradient = ctx.createLinearGradient(
                //         grd_x1,
                //         grd_y1,
                //         grd_x2,
                //         grd_y2
                //     );
                //     gradient.addColorStop(0, "#ffffff51");
                //     gradient.addColorStop(1, "#ffffff00");
                //     ctx.fillStyle = waves[i].fillStyle;
                //     ctx.fill();
                // }
            }
        }
    }

    // calculate how far scrolled to blur canvas
    let scroll;
    $: scrollLimit = Math.min(1, scroll / pageHeight);
    $: {
        if (canvas != null && pageWidth > 900) {
            ctx.filter = `blur(${5 * scrollLimit}px)`;
        }
    }
</script>

<svelte:window
    bind:innerWidth={pageWidth}
    bind:innerHeight={pageHeight}
    bind:scrollY={scroll}
/>

<canvas bind:this={canvas} />

<style>
    canvas {
        height: 100%;
        width: 100%;
    }
</style>
