import { isOpenModalStore } from "../store";

function scrollLock(isLock) {
    // isLock == true | false
    if (isLock) {
        const panel = document.querySelector(".panel");
        const cwa = document.body.clientWidth;
        document.body.style.overflow = "hidden";
        const cwl = document.body.clientWidth;

        if (cwa < cwl) {
            document.body.style.paddingRight = cwl - cwa + "px";
        }
    } else {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
    }
}

isOpenModalStore.subscribe((value) => scrollLock(value.isMounted));
