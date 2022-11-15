export default function resetter(to, ...hookFn) {
    hookFn.forEach((item) => item(to));
}
