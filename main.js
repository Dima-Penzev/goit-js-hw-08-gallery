import pictures from './gallery-items.js';
console.log(pictures);

const picturesContainer = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const bigPicture = document.querySelector('.lightbox__image');
const modalOverlay = document.querySelector('.lightbox__overlay');

function makeCardsMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }, index) => {
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
    data-index="${index}"
    />
  </a>
</li>`;
    })
    .join('');
}

const cardsMarkup = makeCardsMarkup(pictures);

picturesContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function openModal(e) {
  currentIndex = Number(e.target.getAttribute('data-index'));
  console.log(currentIndex);

  if (e.target.getAttribute('class') !== 'gallery__image') {
    return;
  } else {
    e.preventDefault();
    modalWindow.classList.add('is-open');
    bigPicture.setAttribute('src', e.target.getAttribute('data-source'));
    bigPicture.setAttribute('alt', e.target.getAttribute('alt'));

    modalOverlay.addEventListener('click', closeModal);
  }
}

function closeModal() {
  modalWindow.classList.remove('is-open');
  bigPicture.setAttribute('src', '');
  bigPicture.setAttribute('alt', '');

  modalOverlay.removeEventListener('click', closeModal);
}

picturesContainer.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeModal();
  }
});

let currentIndex = 0;
window.addEventListener('keydown', e => {
  if (e.code === 'ArrowRight') {
    currentIndex += 1;
  } else if (e.code === 'ArrowLeft') {
    currentIndex -= 1;
  }

  setPicture(currentIndex);
});

function setPicture(indexOfPicture) {
  pictures.find((picture, index) => {
    if (indexOfPicture === index) {
      console.log(index);
      bigPicture.setAttribute('src', pictures[index].original);
      bigPicture.setAttribute('alt', pictures[index].description);
    }
  });
}
