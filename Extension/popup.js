document.addEventListener('DOMContentLoaded', () => {

    const acceptCookiesRadio = document.getElementById('acceptAll');
    const rejectCookiesRadio = document.getElementById('rejectAll'); 

    chrome.storage.local.get(['cookieType'], function(result) {
        // Check the result and update the radio button state
        if (result.cookieType === 'ACCEPT') {
            acceptCookiesRadio.checked = true;
        } else if (result.cookieType === 'REJECT') {
            rejectCookiesRadio.checked = true;
        }
    });

    acceptCookiesRadio.addEventListener('change', function() {
        if (this.checked) {
            chrome.storage.local.set({cookieType: 'ACCEPT'}, function() {
                console.log('Cookie type set to ACCEPT');
            });
        }
    });

    rejectCookiesRadio.addEventListener('change', function() {
        if (this.checked) {
            chrome.storage.local.set({cookieType: 'REJECT'}, function() {
                console.log('Cookie type set to REJECT');
            });
        }
    });
});