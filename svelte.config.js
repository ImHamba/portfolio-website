import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";

export default {
    preprocess: sveltePreprocess({ postcss: { plugins: [autoprefixer()] } }),
};

// export default {
//     // Consult https://github.com/sveltejs/svelte-preprocess for more info
//     preprocess: [
//         sveltePreprocess({
//             postcss: {
//                 plugins: [autoprefixer()],
//             },
//         }),
//     ],
// };
