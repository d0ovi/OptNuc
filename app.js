function init() {
  const slides = document.querySelectorAll('.slide');
  const pages = document.querySelectorAll('.page');
  const backgrounds = [
    `radial-gradient(hsl(30, 58%, 88%), hsl(25, 84%, 25%))`,
    `radial-gradient(hsl(46, 100%, 94%), hsl(37, 47%, 43%))`,
    `radial-gradient(hsl(18, 96%, 91%),hsl(18, 78%, 40%))`,
  ];

  //tracker
  let current = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener('click', function () {
      changeDots(this);
      nextSlide(index);
    });
  });

  function changeDots(dot) {
    slides.forEach((slide) => {
      slide.classList.remove('active');
    });
    dot.classList.add('active');
  }

  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector('.hero .almond-left');
    const nextRight = nextPage.querySelector('.hero .almond-right');
    const currentLeft = currentPage.querySelector('.hero .almond-left');
    const currentRight = currentPage.querySelector('.hero .almond-right');
    const nextText = nextPage.querySelector('.details');
    const portofolio = document.querySelector('.haveThemAll');

    const tl = new TimelineMax();

    tl.fromTo(currentLeft, 0.3, { y: '-10%' }, { y: '-100%' }).fromTo(
      currentRight,
      0.3,
      { y: '10%' },
      { y: '-100%' },
      '-=0.2'
    )
  }
}
