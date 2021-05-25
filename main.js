import pictures from './gallery-items.js';
console.log(pictures);

const picturesContainer = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const bigPicture = document.querySelector('.lightbox__image');

function makeCardsMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

const cardsMarkup = makeCardsMarkup(pictures);

picturesContainer.insertAdjacentHTML('beforeend', cardsMarkup);

picturesContainer.addEventListener('click', e => {
  e.preventDefault();
  modalWindow.classList.add('is-open');
  bigPicture.setAttribute('src', `${e.target.getAttribute('data-source')}`);
  bigPicture.setAttribute('alt', `${e.target.getAttribute('alt')}`);
});

closeModalBtn.addEventListener('click', () => {
  modalWindow.classList.remove('is-open');
  bigPicture.setAttribute('src', '');
  bigPicture.setAttribute('alt', '');
});
