import {texts, altImages, sectonsLabels} from './db-translate.js';

document.addEventListener('DOMContentLoaded', () => {
    const langs = document.querySelectorAll('.langs__link');
    const galleryImgs = document.querySelectorAll('.gallery__image');
    const modalGallery = document.querySelector('.modal-gallery');
    const modalImg = modalGallery.querySelector('.modal-gallery__img-box');
    const modalCloseBtn = modalGallery.querySelector('.modal-gallery__btn-close');
    const modalPrevBtn = modalGallery.querySelector('.modal-gallery__btn-previous');
    const modalNextBtn = modalGallery.querySelector('.modal-gallery__btn-next');
    let activeLang = 'ru';
    let src = `./images/photo-gallery-`;
    let imgNumber;

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

    function modalShow() {
        modalGallery.classList.add('modal-gallery_show');
    }

    function modalClose() {
        let openedImg = document.querySelectorAll('.modal-gallery__img');

        if ( openedImg.length > 0 ) {
            openedImg.forEach(item => {
                item.remove();
            });
        }

        modalGallery.classList.remove('modal-gallery_show');
    }

    function showBigImg(src) {
        let bigImg = document.createElement('img');
        bigImg.classList.add('modal-gallery__img');
        bigImg.setAttribute('src', src);
        modalImg.append(bigImg);
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

    galleryImgs.forEach(item => {
        item.addEventListener('click', (event) => {
            imgNumber = event.target.getAttribute('data-img-number');
            let currentScr = src + `${imgNumber}.jpg`;
            modalShow();
            showBigImg(currentScr);
        });  
    });

    modalCloseBtn.addEventListener('click', modalClose);
    
    modalGallery.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('modal-gallery') ) {
            modalClose();
        }
    });

    modalPrevBtn.addEventListener('click', () => {
        if ( modalGallery.classList.contains('modal-gallery_show') ) {
            let img = modalGallery.querySelector('.modal-gallery__img');

            if (imgNumber <= 1) {
                imgNumber = 12;
            } else {
                imgNumber--;
            }
            
            let newSrc = src + `${imgNumber}.jpg`;
            img.setAttribute('src', newSrc);
        }
    });

    modalNextBtn.addEventListener('click', () => {
        if ( modalGallery.classList.contains('modal-gallery_show') ) {
            let img = modalGallery.querySelector('.modal-gallery__img');

            if (imgNumber >= 12) {
                imgNumber = 1;
            } else {
                imgNumber++;
            }
            
            let newSrc = src + `${imgNumber}.jpg`;
            img.setAttribute('src', newSrc);
        }

    });
});