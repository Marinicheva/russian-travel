import {texts, altImages, sectonsLabels} from './db-translate.js';

document.addEventListener('DOMContentLoaded', () => {
    const langs = document.querySelectorAll('.langs__link');
    let activeLang = 'ru';

    function translatePage(lang) {
        let textElements = document.querySelectorAll('[data-translate]');

        textElements.forEach(item => {
            let dataAttr = item.getAttribute('data-translate');
            item.textContent = texts[activeLang][dataAttr];
        });
        translateImgAlts(lang);
        translateSections(lang);
    }

    function translateImgAlts(lang) {
        const logo = document.querySelector('.logo__img');
        let srcLogo = logo.getAttribute('data-src');
        logo.src = altImages[lang][srcLogo];

        let imgs = document.querySelectorAll('[data-alt]');
        imgs.forEach(item => {
            let dataAlt = item.getAttribute('data-alt');
            item.alt = altImages[lang][dataAlt];
         });
    }

    function translateSections(lang) {
        let sections = document.querySelectorAll('[data-label]');

        sections.forEach(item => {
            let dataLabel = item.getAttribute('data-label');
            item.setAttribute('aria-label', sectonsLabels[lang][dataLabel]);
        });
    }

    langs.forEach(item => {
        item.addEventListener('click', event => {
            langs.forEach(item => {
                item.classList.remove('langs__link_active');
                event.target.classList.add('langs__link_active');
            activeLang = event.target.getAttribute('data-lang');
            translatePage(activeLang);
            });
        });
    });
});