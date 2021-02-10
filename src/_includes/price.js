let sticker = document.querySelector('.section-covid--sticker__bg'),
    recommended = document.querySelector('.price-list__item--recommended');
function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}
function rotateSticker() {
    sticker.style.transform = 'rotate('+window.pageYOffset/10+'deg)';
}
function setRecommendedSeen(){
    recommended.classList.add('price-list__item--seen');
}
function scrollCallback() {
    if (window.matchMedia('(min-width: 48em)').matches) {
        requestAnimationFrame(rotateSticker);
    }
    if (recommended.getBoundingClientRect().bottom < window.innerHeight*.8) {
        requestAnimationFrame(setRecommendedSeen);
    }
}
window.addEventListener('scroll', throttle(scrollCallback, 10));
const tel = document.getElementById('tel');
tel.addEventListener('input', function(e) {
    let cleaned = e.target.value.replace(/\D/g, '');
    if (['7','8'].indexOf(cleaned[0]) >= 0) {
        cleaned = cleaned.substring(1);
    }
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        e.target.value = ['+7 ', match[1], ' ', match[2], '-', match[3], '-', match[4]].join('');
    }
});