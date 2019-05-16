import path from 'path';
import pug from 'pug';

const qs = '.pagination';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'pagination.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Pagination', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should be empty if there is only 1 page', () => {
    document.body.innerHTML = makeComponent({ props: { perPage: 10, totalItems: 10 } });
    const $el = document.querySelector(qs);
    expect($el).not.toHaveTextContent();
  });

  test('should not show prev & next arrows if there are 2 pages', () => {
    document.body.innerHTML = makeComponent({ props: { perPage: 5, totalItems: 10 } });
    const $el = document.querySelector(qs);
    const $prev = $el.querySelector('.pagination__prev');
    const $next = $el.querySelector('.pagination__next');
    expect($prev).not.toBeInTheDocument();
    expect($next).not.toBeInTheDocument();
  });

  test('should show next arrow if currentPage = 1 & totalPages = 3', () => {
    document.body.innerHTML = makeComponent({
      props: { perPage: 5, totalItems: 15, currentPage: 1 }
    });
    const $el = document.querySelector(qs);
    const $prev = $el.querySelector('.pagination__prev');
    const $next = $el.querySelector('.pagination__next');
    expect($prev).not.toBeInTheDocument();
    expect($next).toBeInTheDocument();
  });

  test('should show prev arrow if currentPage = 3 & totalPages = 3', () => {
    document.body.innerHTML = makeComponent({
      props: { perPage: 5, totalItems: 15, currentPage: 3 }
    });
    const $el = document.querySelector(qs);
    const $prev = $el.querySelector('.pagination__prev');
    const $next = $el.querySelector('.pagination__next');
    expect($prev).toBeInTheDocument();
    expect($next).not.toBeInTheDocument();
  });

  test('should show prev & next arrow if currentPage = 2 & totalPages = 3', () => {
    document.body.innerHTML = makeComponent({
      props: { perPage: 5, totalItems: 15, currentPage: 2 }
    });
    const $el = document.querySelector(qs);
    const $prev = $el.querySelector('.pagination__prev');
    const $next = $el.querySelector('.pagination__next');
    expect($prev).toBeInTheDocument();
    expect($next).toBeInTheDocument();
  });

  test('should show first page if currentPage > 1', () => {
    document.body.innerHTML = makeComponent({
      props: { perPage: 5, totalItems: 30, currentPage: 3 }
    });
    const $el = document.querySelector(qs);
    const $page = $el.querySelector('.pagination__page-first');
    expect($page).toBeInTheDocument();
  });

  test('should show last page if currentPage < lastPage', () => {
    document.body.innerHTML = makeComponent({
      props: { perPage: 5, totalItems: 30, currentPage: 3 }
    });
    const $el = document.querySelector(qs);
    const $page = $el.querySelector('.pagination__page-last');
    expect($page).toBeInTheDocument();
  });

  test('should show label by default', () => {
    document.body.innerHTML = makeComponent({
      props: { perPage: 5, totalItems: 30, currentPage: 3 }
    });
    const $el = document.querySelector(qs);
    const $label = $el.querySelector('.pagination__label');
    expect($label).toBeInTheDocument();
    expect($label.textContent.length).toBeGreaterThan(0);
  });

  test('should hide label if showLabel = false', () => {
    document.body.innerHTML = makeComponent({
      props: { perPage: 5, totalItems: 30, currentPage: 3, showLabel: false }
    });
    const $el = document.querySelector(qs);
    const $label = $el.querySelector('.pagination__label');
    expect($label).not.toBeInTheDocument();
  });
});
