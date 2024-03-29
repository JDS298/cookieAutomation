const { acceptAll} = require('../content.js');

const createMockElement = () => ({
  click: jest.fn(),
});

const acceptList = ['.accept-btn', '#accept', 'button[aria-label="accept"]'];
const textAcceptList = ['accept', 'agree', 'ok'];

describe('acceptAll function', () => {
    // Set up the DOM before each test
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="banner">
          <button class="accept-btn">Accept</button>
          <button class="reject-btn">Reject</button>
          <span class="text-accept">Agree</span>
        </div>
      `;
      // Reset mocks and spies
      jest.clearAllMocks();
    });
  
    test('clicks the button identified by CSS selector', () => {
      const banner = document.querySelector('#banner');
      const acceptButton = banner.querySelector('.accept-btn');
  
      // Spy on the click method of the button
      jest.spyOn(acceptButton, 'click');
  
      acceptAll(banner);
  
      // Verify the button was clicked
      expect(acceptButton.click).toHaveBeenCalled();  
    });
  
    test('clicks the button identified by text content when selector fails', () => {
      // Adjust the initial setup to simulate the absence of a button matching acceptList
      document.body.innerHTML = `
        <div id="banner">
          <span class="text-accept">Accept</span> <!-- Simulate text-based acceptance trigger -->
        </div>
      `;
      const banner = document.querySelector('#banner');
      const acceptButton = banner.querySelector('.text-accept');
  
      // Assume findButtonByTextContent correctly identifies this element when findElementInBanner fails
      // Spy on the click method of the button/span
      jest.spyOn(acceptButton, 'click');
  
      acceptAll(banner);
  
      // Verify the button/span was "clicked"
      expect(acceptButton.click).toHaveBeenCalled();
    });
  
    test('does nothing if no accept button or text is found', () => {
      // Setup without any accept buttons or text
      document.body.innerHTML = `<div id="banner"></div>`;
      const banner = document.querySelector('#banner');

      let wasCalled = false;
      document.addEventListener('manageButtonCalled', () => {
          wasCalled = true;
      });
  
      // Attempt to find and "click" an accept element
      acceptAll(banner);
  
      expect(wasCalled).toBe(true);
    });
  });
  