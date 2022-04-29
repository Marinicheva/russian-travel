import translateObj from './db-translate.js';

document.addEventListener('DOMContentLoaded', () => {
    const langs = document.querySelectorAll('.langs__link');
    let activeLang = 'ru';

    function changeLang(lang) {
        let texts = document.querySelectorAll('[data-translate]');

        texts.forEach(item => {
            let newText = item.getAttribute('data-translate');
            item.textContent = translateObj[activeLang][newText];
        });
    }

    langs.forEach(item => {
        item.addEventListener('click', event => {
            langs.forEach(item => {
                item.classList.remove('langs__link_active');
                event.target.classList.add('langs__link_active');
            activeLang = event.target.getAttribute('data-lang');
            changeLang(activeLang);
            });
        });
    });
});