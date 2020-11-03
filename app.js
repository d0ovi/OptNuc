function init() {
  const slides = document.querySelectorAll('.slide');
  const pages = document.querySelectorAll('.page');
  const backgrounds = [
    `radial-gradient(#f2e0cf, #75370a)`,
    `radial-gradient(#fff8e0, #a17a3a)`,
    `radial-gradient(#fedfd2, #b64616)`,
  ];
  //tracker for the page
  let current = 0;
  //tracker for the scroll
  let scrollSlide = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener('click', function () {
      changeDots(this);
      nextSlide(index);
      scrollSlide = index;
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
    const nextLeft = nextPage.querySelector('.hero .model-left');
    const nextRight = nextPage.querySelector('.hero .model-right');
    const currentLeft = currentPage.querySelector('.hero .model-left');
    const currentRight = currentPage.querySelector('.hero .model-right');
    const nextText = nextPage.querySelector('.details');
    const portofolio = document.querySelector('.portofolio');

    current = pageNumber;

    const tl = new TimelineMax({
      //functions to not let you click until the animation is finished from previous pages load
      onStart: function () {
        slides.forEach((slide) => {
          slide.style.pointerEvents = 'none';
        });
      },
      onComplete: function () {
        slides.forEach((slide) => {
          slide.style.pointerEvents = 'all';
        });
      },
    });

    if (currentPage !== nextPage) {
      tl.fromTo(currentLeft, 0.3, { y: '-10%' }, { y: '-100%' })
        .fromTo(currentRight, 0.3, { y: '10%' }, { y: '-100%' }, '-=0.2')
        .to(portofolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
        .fromTo(
          currentPage,
          0,
          { opacity: 1, pointerEvents: 'all' },
          { opacity: 0, pointerEvents: 'none' }
        )
        .fromTo(
          nextPage,
          0.3,
          { opacity: 0, pointerEvents: 'none' },
          { opacity: 1, pointerEvents: 'all' },
          '-=0.6'
        )
        .fromTo(nextLeft, 0.3, { y: '-100%' }, { y: '-10%' }, '-=0.6')
        .fromTo(nextRight, 0.3, { y: '-100%' }, { y: '10%' }, '-=0.8')
        .fromTo(
          nextText,
          0.3,
          { opacity: 0, y: 0 },
          { opacity: 1, y: 0 },
          '-=0.3'
        )
        //I need to clearprops so the hover function would work again
        .set(nextLeft, { clearProps: 'all' })
        .set(nextRight, { clearProps: 'all' });
    }
  }

  //The scroll down wheel:
  //the scroll will react every 1500 ms
  document.addEventListener('wheel', throttle(scrollChange, 1500));
  //but this does not work on mobile. for that, we need 'touchmove' function:
  document.addEventListener('touchmove', throttle(scrollChange, 1500));

  //separate function to change the circles when we scroll the pages
  function swichDots(dotNumber) {
    const activeDot = document.querySelectorAll('.slide')[dotNumber];
    slides.forEach((slide) => {
      slide.classList.remove('active');
    });
    activeDot.classList.add('active');
  }

  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }
    // the scrollSlide cannot be more than 2 or less than 0, cos we have 3 pages [0,1,2]
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    swichDots(scrollSlide);
    nextSlide(scrollSlide);
  }

  const hamburger = document.querySelector('.menu');
  const hamburgerLines = document.querySelectorAll('.menu line');
  const navOpen = document.querySelector('.nav-open');
  const contact = document.querySelector('.contact');
  const social = document.querySelector('.social');
  const logo = document.querySelector('.logo');

  const tl = new TimelineMax({ paused: true, reversed: true });

  tl.to(navOpen, 0.5, { y: 0 })
    .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.1')
    .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.5')
    .fromTo(logo, 0.2, { color: '#F2E0CE' }, { color: '#672F06' }, '-=1')
    .fromTo(
      hamburgerLines,
      0.2,
      { stroke: '#F2E0CE' },
      { stroke: '#672F06' },
      '-=1'
    );

  hamburger.addEventListener('click', () => {
    tl.reversed() ? tl.play() : tl.reverse();
  });
  //fuunction  throttle from the tutorial to make the scroll pages work
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

init();
