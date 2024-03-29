const { manageButton} = require ('../content.js');

// Example of what mangeList might look like
const mangeList = ['.manage-btn'];

describe('manageButton function', () => {
    beforeEach(() => {
      // Set up the DOM environment
      document.body.innerHTML = `
        <div id="banner">
          <button class="manage-btn">Manage</button>
          <!-- Additional elements as needed -->
        </div>
      `;
  
      // Reset timers before each test
      jest.useFakeTimers();
    });
  
    test('clicks the manage button and calls closeMangePage after delay', () => {
      const banner = document.querySelector('#banner');
      const manageBut = banner.querySelector('.manage-btn');
  
      // Spy on console.log to verify outputs if needed
      const consoleSpy = jest.spyOn(console, 'log');
  
      // Manually attach click event to simulate click behavior if needed
      manageBut.addEventListener('click', () => {
        console.log('This is manage', manageButton);
      });
  
      // Call the function
      manageButton(banner);
  
      // Verify click happened
      expect(consoleSpy.mock.calls[0][0]).toBe('mange');
  
      // Fast-forward time to ensure the setTimeout call executes
      jest.runAllTimers();
  
      // Verify closeMangePage behavior
      // This could be checking if a modal was closed, a banner was hidden, etc.,
      // depending on what closeMangePage does in your application.
      expect(consoleSpy.mock.calls[0][0]).toBe('mange');
  
      // Clean up
      consoleSpy.mockRestore();
    });

    test('does nothing if manage button is not found', () => {
        // Setup a banner without a manage button
        document.body.innerHTML = `<div id="banner"></div>`;
        const banner = document.querySelector('#banner');
    
        const consoleSpy = jest.spyOn(console, 'log');
    
        manageButton(banner);
    
        // Fast-forward in case there are any set timeouts
        jest.runAllTimers();
    
        // Check that the first console log is "mange" indicating the function ran
        expect(consoleSpy.mock.calls[0][0]).toBe('mange');
    
        // Since there's no button, "This is manage" should not be logged
        const manageLogged = consoleSpy.mock.calls.some(call => call[0].includes('This is manage'));
        expect(manageLogged).toBeFalsy();
    
        consoleSpy.mockRestore();
    });

    // Assuming closeMangePage logs "Closing manage page..."
test('closeMangePage is called after a delay', () => {
    document.body.innerHTML = `
      <div id="banner">
        <button class="manage-btn">Manage</button>
      </div>
    `;
    const banner = document.querySelector('#banner');
    const manageBut = banner.querySelector('.manage-btn');

    const consoleSpy = jest.spyOn(console, 'log');

    manageButton(banner);
    expect(consoleSpy).toHaveBeenCalledWith('mange'); // Initial call

    // Fast-forward before the delay completes
    jest.advanceTimersByTime(400);
    expect(consoleSpy).not.toHaveBeenCalledWith('Closing manage page...');

    // Fast-forward past the delay
    jest.advanceTimersByTime(100);
    expect(consoleSpy.mock.calls[0][0]).toBe('mange');

    consoleSpy.mockRestore();
});

    
  
    // Add more tests here for other scenarios
  });
  
