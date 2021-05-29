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

function openModal(e) {
  e.preventDefault();
  modalWindow.classList.add('is-open');
  bigPicture.setAttribute('src', `${e.target.getAttribute('data-source')}`);
  bigPicture.setAttribute('alt', `${e.target.getAttribute('alt')}`);
}

function closeModal(e) {
  modalWindow.classList.remove('is-open');
  bigPicture.setAttribute('src', '');
  bigPicture.setAttribute('alt', '');
}

picturesContainer.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeModal(e);
  }
});

modalWindow.addEventListener('click', (e) => {
  if (e.target.nodeName === 'DIV') {
    closeModal(e);
  }
})


let currentIndex = 0;
window.addEventListener('keydown', e => {
  if (e.code === 'ArrowRight') {
    currentIndex += 1;
  } else if (e.code === 'ArrowLeft') {
    currentIndex -= 1;
  }

  console.log(currentIndex);

  pictures.find((picture, index) => {
  if (e.target.getAttribute('href') === picture.original) {
    console.log(currentIndex = index);
  }
});
});



