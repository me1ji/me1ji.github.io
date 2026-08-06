(function () {
  const script = document.currentScript || document.querySelector('script[data-page]');
  if (!script) return;

  const page = script.getAttribute('data-page') || 'home';
  const rootValue = script.getAttribute('data-root') || '.';
  const root = rootValue.endsWith('/') ? rootValue : `${rootValue}/`;

  const links = [
    { key: 'home', label: 'Home', href: `${root}index.html` },
    { key: 'projects', label: 'Projects', href: `${root}projects/index.html` },
    { key: 'challenges', label: 'Challenges', href: `${root}challenges/index.html` },
    { key: 'writeups', label: 'Writeups', href: `${root}writeups/index.html` },
    { key: 'certificates', label: 'Certificates', href: `${root}certificates/index.html` },
    { key: 'contact', label: 'Contact', href: `${root}contact/index.html` }
  ];

  const navMarkup = links.map((link) => {
    const activeClass = link.key === page ? 'active' : '';
    return `<a class="${activeClass}" href="${link.href}">${link.label}</a>`;
  }).join('');

  const headerMarkup = `
    <header class="site-header">
      <div class="header-inner">
        <div class="header-top">
          <div class="brand">
            <span class="eyebrow">Investigation Dossier · Section 3IT-1</span>
            <span class="name">MEIJI // CASE FILES</span>
          </div>
          <span class="page-tag">${page === 'home' ? 'Home' : page.charAt(0).toUpperCase() + page.slice(1)}</span>
        </div>
        <nav class="nav-links" aria-label="Primary navigation">
          ${navMarkup}
        </nav>
      </div>
    </header>`;

  const footerMarkup = `
    <footer>
      <div class="footer-shell">
        Neutron CTF Team · Section 3IT-1 · Case archive maintained by Meiji
      </div>
    </footer>`;

  const headerTarget = document.getElementById('site-header');
  const footerTarget = document.getElementById('site-footer');

  if (headerTarget) {
    headerTarget.innerHTML = headerMarkup;
  }

  if (footerTarget) {
    footerTarget.innerHTML = footerMarkup;
  }
})();

// Sidebar contents toggle
document.addEventListener('DOMContentLoaded', function () {
  const contentsCard = document.querySelector('.contents-card');
  if (!contentsCard) return;

  // Set CSS variable for header height so sticky sidebars align correctly
  const setHeaderHeight = () => {
    const header = document.querySelector('.site-header');
    const h = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty('--site-header-height', `${h}px`);
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  // Sidebar is always open — no toggle button.

  // Build a nested TOC from article headings (h1-h4)
  const article = document.querySelector('.detail-page');
  const listContainer = contentsCard.querySelector('.contents-list');
  if (!article || !listContainer) return;

  // build TOC starting from H2 (nest h3 under h2, h4 under h3)
  const headings = Array.from(article.querySelectorAll('h2,h3,h4'));
  if (headings.length === 0) return;

  // Helper: slugify heading text
  const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  // Create root ul
  const rootUl = document.createElement('ul');

  const stack = [{ level: 0, ul: rootUl }];

  headings.forEach((h) => {
    const level = parseInt(h.tagName.charAt(1), 10);
    // ensure id
    if (!h.id) h.id = slugify(h.textContent || h.innerText || 'heading');

    // pop stack to parent level
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();

    const parent = stack[stack.length - 1];

    const li = document.createElement('li');
    li.className = `toc-level-${level}`;
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent.trim();
    li.appendChild(a);

    // append li to parent's ul
    parent.ul.appendChild(li);

    // prepare child ul and push
    const childUl = document.createElement('ul');
    li.appendChild(childUl);
    stack.push({ level, ul: childUl });
  });

  // Replace existing contents list with generated TOC
  listContainer.innerHTML = '';
  listContainer.appendChild(rootUl);

  // Make TOC expand/collapse on click (not hover)
  listContainer.querySelectorAll('li').forEach((li) => {
    const childUl = li.querySelector('ul');
    const a = li.querySelector('a');
    if (!a) return;
    if (childUl && childUl.children.length) {
      li.classList.add('has-children');
      a.setAttribute('aria-expanded', 'false');

      a.addEventListener('click', (ev) => {
        // clicking should expand and also navigate immediately
        // Close any open items that are not ancestors of the clicked item
        const allOpen = listContainer.querySelectorAll('li.open');
        allOpen.forEach((openItem) => {
          if (openItem === li) return;
          // keep ancestors of the clicked item open
          if (openItem.contains(li)) return;
          openItem.classList.remove('open');
          const oa = openItem.querySelector('a');
          if (oa) oa.setAttribute('aria-expanded', 'false');
        });

        // Open the clicked item (ensure it's visible) and update aria
        li.classList.add('open');
        a.setAttribute('aria-expanded', 'true');
        // allow navigation to proceed (no preventDefault)
      });

      // keyboard accessibility: toggle on Enter/Space
      a.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          a.click();
        }
      });
    }
  });
});
// end DOMContentLoaded
