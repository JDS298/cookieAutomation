const { findButtonByTextContent } = require('../content.js');

describe('findButtonByTextContent function', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="banner">
          <button>Click Me</button>
          <span>Span Content</span>
          <a href="#">Link Text</a>
        </div>
      `;
    });
  
    test('finds exact match in button elements', () => {
      const banner = document.querySelector('#banner');
      const result = findButtonByTextContent(banner, ['click me']);
      expect(result).not.toBeNull();
      expect(result.tagName).toBe('BUTTON');
    });
  
    test('finds exact match in span elements', () => {
      const banner = document.querySelector('#banner');
      const result = findButtonByTextContent(banner, ['span content']);
      expect(result).not.toBeNull();
      expect(result.tagName).toBe('SPAN');
    });
  
    test('finds exact match in anchor elements', () => {
      const banner = document.querySelector('#banner');
      const result = findButtonByTextContent(banner, ['link text']);
      expect(result).not.toBeNull();
      expect(result.tagName).toBe('A');
    });

    test('identifies matches regardless of case', () => {
        document.body.innerHTML = `
        <div id="banner">
          <button>CLICK ME</button>
        </div>
      `;
        const banner = document.querySelector('#banner');
        const result = findButtonByTextContent(banner, ['click me']);
        expect(result).not.toBeNull();
        expect(result.textContent.trim().toLowerCase()).toBe('click me');
      });

      test('returns the first exact match found', () => {
        document.body.innerHTML += `<button>Extra Button</button>`; // Assuming "Click Me" exists from beforeEach
        const banner = document.querySelector('#banner');
        const descriptions = ['click me', 'extra button'];
        const result = findButtonByTextContent(banner, descriptions);
        expect(result.textContent.trim().toLowerCase()).toBe('click me');
      });
      
      test('returns null when no elements match descriptions', () => {
        const banner = document.querySelector('#banner');
        const result = findButtonByTextContent(banner, ['nonexistent']);
        expect(result).toBeNull();
      });

      test('returns null when descriptions list is empty', () => {
        const banner = document.querySelector('#banner');
        const result = findButtonByTextContent(banner, []);
        expect(result).toBeNull();
      });
      
  });
  