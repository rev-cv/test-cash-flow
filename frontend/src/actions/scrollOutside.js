export function scrollOutside(node, callback) {
    const startScrollPosition = window.scrollY;

    const handleScroll = (event) => {
        const currentScrollPosition = window.scrollY;
        const scrollDelta = Math.abs(
            currentScrollPosition - startScrollPosition
        );

        if (scrollDelta >= 40) {
            callback(event);
        }
    };

    window.addEventListener("scroll", handleScroll);

    return {
        destroy() {
            window.removeEventListener("scroll", handleScroll);
        },
    };
}
