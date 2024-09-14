document.addEventListener('DOMContentLoaded', () => {

  const attachFootnoteListeners = () => {
    const footnoteLinks = document.querySelectorAll('.footnote-backref, .footnote-ref a');

    footnoteLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const href = link.getAttribute('href');

        if (href) {
          const targetId = href.split('#')[1];
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            scrollToFootnote(targetElement);
            const newUrl = `${window.location.pathname}#${targetId}`;
            window.history.pushState(null, '', newUrl);
          }
        }
      });
    });
  };

  const scrollToFootnote = (targetElement: HTMLElement) => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.clientHeight : 64; // Default to 64px if header is not found
    const additionalOffset = 20; // Additional buffer to ensure the element is fully visible

    // Calculate the scroll position
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const scrollToPosition = targetPosition - headerHeight - additionalOffset;

    // Scroll to the calculated position
    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth'
    });
  };

  // Attach listeners initially
  attachFootnoteListeners();

  // Use MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        attachFootnoteListeners();
        checkAndScrollToHash();
      }
    });
  });

  // Observe changes in the body
  observer.observe(document.body, { childList: true, subtree: true });

  // Check if there's a hash in the URL and scroll to the corresponding footnote after live preview is rendered
  const checkAndScrollToHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.substring(1); // Remove the '#' character
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        scrollToFootnote(targetElement);
      }
    }
  };

  // Call checkAndScrollToHash initially to handle the case when the page is loaded with a hash
  checkAndScrollToHash();
});