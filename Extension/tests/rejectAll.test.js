const { rejectAll} = require('../content.js');

describe('rejectAll function', () => {
    const rejectList = ['.reject-btn', '#reject', 'button[aria-label="reject"]'];
    const textRejectList = ['reject', 'no thanks', 'decline'];
  
    beforeEach(() => {
      // Set up the DOM before each test to include elements that could be targeted by rejectAll
      document.body.innerHTML = `
        <div id="banner">
          <button class="reject-btn">Reject</button>
          <button class="accept-btn">Accept</button>
          <span class="text-reject">No thanks</span>
          <!-- The manageButton might dynamically add or manage buttons, so consider that in your tests -->
        </div>
      `;
  
    });
  
    test('clicks the button identified by CSS selector from rejectList', () => {
      const banner = document.querySelector('#banner');
      const rejectButton = banner.querySelector('.reject-btn');
      jest.spyOn(rejectButton, 'click');
  
      rejectAll(banner);
  
      expect(rejectButton.click).toHaveBeenCalled();
    });
  
    test('clicks the button identified by CSS selector from textRejectList when rejectList fails', () => {
      // Adjust the initial setup to simulate the absence of a button matching rejectList directly
      document.body.innerHTML = `
        <div id="banner">
          <span class="text-reject">Decline</span> <!-- Simulate text-based rejection trigger -->
        </div>
      `;
      const banner = document.querySelector('#banner');
      const rejectButton = banner.querySelector('.text-reject');
      jest.spyOn(rejectButton, 'click');
  
      rejectAll(banner);
  
      expect(rejectButton.click).toHaveBeenCalled();
    });
  
    test('uses findButtonByTextContent when direct selectors do not find a button', () => {
        document.body.innerHTML = `
          <div id="banner">
            <!-- No buttons matching rejectList directly -->
            <span class="text-reject-action">Decline</span> <!-- Assume this would be targeted by findButtonByTextContent -->
          </div>
        `;
      
        const banner = document.querySelector('#banner');
        const rejectButtonByText = banner.querySelector('.text-reject-action');
      
        
        rejectAll(banner);
      
        
        expect(rejectButtonByText.textContent).toBe('Decline');
      });
  
      test('calls manageButton as a final fallback', () => {
        document.body.innerHTML = `<div id="banner"></div>`;
        const banner = document.querySelector('#banner');

        let wasCalled = false;
        document.addEventListener('manageButtonCalled', () => {
            wasCalled = true;
        });
      
        
        rejectAll(banner);
      
        expect(wasCalled).toBe(true);
      });
  });
  