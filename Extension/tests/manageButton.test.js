const { manageButton} = require ('../content.js');


const mangeList = ['.manage-btn'];

describe('manageButton function', () => {
    beforeEach(() => {
      
      document.body.innerHTML = `
        <div id="banner">
          <button class="manage-btn">Manage</button>
          <!-- Additional elements as needed -->
        </div>
      `;
  
      
      jest.useFakeTimers();
    });
  
    test('clicks the manage button and calls closeMangePage after delay', () => {
      const banner = document.querySelector('#banner');
      const manageBut = banner.querySelector('.manage-btn');
  
      
      const consoleSpy = jest.spyOn(console, 'log');
  
      
      manageBut.addEventListener('click', () => {
        console.log('This is manage', manageButton);
      });
  
      
      manageButton(banner);
  
      expect(consoleSpy.mock.calls[0][0]).toBe('mange');
  
      
      jest.runAllTimers();

      
      expect(consoleSpy.mock.calls[0][0]).toBe('mange');
  
      consoleSpy.mockRestore();
    });

    test('does nothing if manage button is not found', () => {
        // Setup a banner without a manage button
        document.body.innerHTML = `<div id="banner"></div>`;
        const banner = document.querySelector('#banner');
    
        const consoleSpy = jest.spyOn(console, 'log');
    
        manageButton(banner);
    
  
        jest.runAllTimers();
    
        
        expect(consoleSpy.mock.calls[0][0]).toBe('mange');
    
      
        const manageLogged = consoleSpy.mock.calls.some(call => call[0].includes('This is manage'));
        expect(manageLogged).toBeFalsy();
    
        consoleSpy.mockRestore();
    });

   
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
    expect(consoleSpy).toHaveBeenCalledWith('mange'); 

    
    jest.advanceTimersByTime(400);
    expect(consoleSpy).not.toHaveBeenCalledWith('Closing manage page...');

    
    jest.advanceTimersByTime(100);
    expect(consoleSpy.mock.calls[0][0]).toBe('mange');

    consoleSpy.mockRestore();
});

    
  
    
  });
  
