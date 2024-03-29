
// Simulate global chrome object
global.chrome = {
  storage: {
    local: {
      get: (keys, callback) => {
        // Hardcoded response for demonstration. Adjust as needed.
        const data = { cookieType: 'ACCEPT' }; // or 'REJECT'
        callback(data);
      },
    },
  },
};

// Directly define or mock functions for the test
const findElementInDoc = () => ({ /* Mock banner object */ });
const acceptAll = jest.fn();
const rejectAll = jest.fn();

// Assuming this is your function under test
function checkForCookieBanner(times = 0) {
    console.log('start');
    let banner = findElementInDoc(); // Use the mock directly
    if (banner) {
        console.log('This is the banner', banner);
        global.chrome.storage.local.get(['cookieType'], function(result) {
            if(result.cookieType === 'ACCEPT'){
                console.log("Accept stored")
                acceptAll(banner); // Now a jest mock function
            }
            else if(result.cookieType === 'REJECT'){
                console.log("Reject stored")
                rejectAll(banner); // Also a jest mock function
            }
        });
    }
    else{
        console.log("could not find a banner")
        if (times <= 0 ){
            setTimeout(() => {
                checkForCookieBanner(1);
            }, 4000);     
        }   
    }
}

describe('checkForCookieBanner function', () => {
  beforeEach(() => {
    // Reset mocks here if needed
    acceptAll.mockClear();
    rejectAll.mockClear();
  });

  it('should call acceptAll when ACCEPT stored', () => {
    // Setup your environment or variables as needed
    // You can adjust the chrome storage mock here to return 'ACCEPT' or 'REJECT' as needed

    checkForCookieBanner();

    // Assertions
    expect(acceptAll).toHaveBeenCalled();
    // Add more assertions as necessary
  });

  it('should call rejectAll when REJECT stored', () => {
    // Adjust mock for this test to simulate 'REJECT' stored
    global.chrome = {
        storage: {
          local: {
            get: (keys, callback) => {
              // Hardcoded response for demonstration. Adjust as needed.
              const data = { cookieType: 'REJECT' }; // or 'REJECT'
              callback(data);
            },
          },
        },
      };

    checkForCookieBanner();

    // Assertions
    expect(rejectAll).toHaveBeenCalled();
    expect(acceptAll).not.toHaveBeenCalled();
  });


  // More tests for different scenarios
});
