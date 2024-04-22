
// Simulate global chrome object
global.chrome = {
  storage: {
    local: {
      get: (keys, callback) => {
        const data = { cookieType: 'ACCEPT' }; 
        callback(data);
      },
    },
  },
};

// Directly defines or mocks functions for the test
const findElementInDoc = () => ({});
const acceptAll = jest.fn();
const rejectAll = jest.fn();

function checkForCookieBanner(times = 0) {
    console.log('start');
    let banner = findElementInDoc(); 
    if (banner) {
        console.log('This is the banner', banner);
        global.chrome.storage.local.get(['cookieType'], function(result) {
            if(result.cookieType === 'ACCEPT'){
                console.log("Accept stored")
                acceptAll(banner); 
            }
            else if(result.cookieType === 'REJECT'){
                console.log("Reject stored")
                rejectAll(banner); 
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

    acceptAll.mockClear();
    rejectAll.mockClear();
  });

  it('should call acceptAll when ACCEPT stored', () => {
  

    checkForCookieBanner();

   
    expect(acceptAll).toHaveBeenCalled();

  });

  it('should call rejectAll when REJECT stored', () => {
    
    global.chrome = {
        storage: {
          local: {
            get: (keys, callback) => {
            
              const data = { cookieType: 'REJECT' }; 
              callback(data);
            },
          },
        },
      };

    checkForCookieBanner();

   
    expect(rejectAll).toHaveBeenCalled();
    expect(acceptAll).not.toHaveBeenCalled();
  });


 
});
