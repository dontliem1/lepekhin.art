let words = document.querySelectorAll('.section-principles__line');
function throttle(fn, wait) {
    if (window.matchMedia('(max-width: 65em)').matches) {
        let time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        }
    }
}
function moveWords() {
    let vh = window.innerHeight/200;
    for (let i = 0; i < words.length; i++) {
        let percent = words[i].getBoundingClientRect().top/vh -100;
        if (percent > 100) {
            words[i].style.transform = "translateX(100%)";
        } else if (percent < 0) {
            words[i].style.transform = "translateX(0%)";
        } else {
            words[i].style.transform = "translateX("+percent+"%)";
        }
    }
}
window.addEventListener('scroll', throttle(moveWords, 10));