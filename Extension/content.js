function findElementInBanner(banner, List){
    let Btn = null
    for (const description of List) {
        let baseSelector = `:not(style):not(img):not(a):not(h2)`;
        Btn = banner.querySelector(`${baseSelector}[href*="${description}"]`)

        if (!Btn){
            Btn = banner.querySelector(`${baseSelector}[aria-label*="${description}"]`)
        }
        if (!Btn){
            Btn = banner.querySelector(`${baseSelector}[data-track-action*='${description}']`);
        }
        if (!Btn) {
            Btn = banner.querySelector(`${baseSelector}[id*='${description}']`);
        }
        if (!Btn){
            Btn = banner.querySelector(`${baseSelector}[class*='${description}']`);
        }
        if (!Btn){
            Btn = banner.querySelector(`${baseSelector}[title*='${description}']`);
        }
        if (!Btn){
            Btn = banner.querySelector(`${baseSelector}[data-a-target*='${description}']`);
        }
         if (!Btn){
            Btn = banner.querySelector(`${baseSelector}[data-testid*='${description}']`);
        }
        if (Btn) {
            return(Btn)
        }
    }
    return(Btn)
}

function findElementInDoc(List){
    let element = null
    for (const description of List) {
        console.log(description)
        let baseSelector = `:not(style):not(img):not(a):not(h2)`;
        element = document.querySelector(`${baseSelector}[aria-label*="${description}"]`)

        if (!element) {
            element = document.querySelector(`${baseSelector}[class*='${description}']`);
        }
        if (!element){
            element = document.querySelector(`${baseSelector}[id*='${description}']`);
            // console.log(document.querySelector(`[class*='${description}']`))
        }
        if (!element){
            element = document.querySelector(`${baseSelector}[data-a-target*='${description}']`);
        }
        if (!element){
            element = document.querySelector(`${baseSelector}[data-testid*='${description}']`);
        }
        if (element) {
            return(element)
        }
    }
    return(element)
}

function checkForCookieBanner(times = 0) {
    console.log('start');
    let banner = findElementInDoc(bannerList)
    if (banner) {
        console.log('This is the banner',  banner);
        chrome.storage.local.get(['cookieType'], function(result) {
            if(result.cookieType === 'ACCEPT'){
                console.log("Accept stored")
                acceptAll(banner)
            }
            else if(result.cookieType === 'REJECT'){
                console.log("Reject stored")
                rejectAll(banner)
            }
        });
    }
    else{
        console.log("could not find a banner")
        if (times <= 0 ){
            setTimeout(() => {
                checkForCookieBanner(1)
            }, 4000);
            
        }   
    
    }
}


function acceptAll(banner) {
    console.log('accept');
    let acceptBtn = findElementInBanner(banner, acceptList)
    if (acceptBtn) {
        console.log('This is accept',  acceptBtn);
        acceptBtn.click()
    }else{

    }
}


function rejectAll(banner) {
    console.log('reject');
    let rejectBtn = findElementInBanner(banner, rejectList)
    if (rejectBtn) {
        console.log('This is reject',  rejectBtn);
        rejectBtn.click()
    }
    else{
        manageButton(banner)
    }
}


function manageButton(banner) {
    console.log('mange');
    let mangeBtn = findElementInBanner(banner, mangeList)
    if (mangeBtn) {
        console.log('This is manage',  mangeBtn);
        mangeBtn.click()
        setTimeout(() => {closeMangePage(banner)}, 500);      
    }
}

function closeMangePage(banner){
    console.log('close');
    let closeBtn = findElementInBanner(banner, closeCookieList)
    if (closeBtn) {
        console.log('This is close',  closeBtn);
        closeBtn.click()
    }
    else{
        closeBtn = findElementInDoc(closeCookieList)
        if(closeBtn){
            console.log('This is close',  closeBtn);
            closeBtn.click()
        }
    }
}


// Wait for 5 seconds after the page loads, then run the check
setTimeout(checkForCookieBanner, 1000);

let bannerList = [
    "_50f4",
    "didomi-host",
    "app-0-0-2",
    "evidon-banner",
    "gdpr-new-container",
    "gdpr-banner",
    "gdpr-content",
    "toast-container",
    "sn-inner",
    "all4-cc-grid",
    "ytd-consent",
    "consent-manager",
    "user-consent-management",
    "consent_blackbar",
    "consent-overlay",
    "CookieAlert",
    "consent-banner",
    "Cookie Consent Banner",
    "cookie-consent",
    "cookieconsent",
    "cookie_banner",
    "Cookie banner",
    "Privacy",
    "cookie-banner",
    "mainContent",
    "Cookie",
    "cookie",
    "notice",
    "onetrust-banner-sdk",
]

let acceptList = [
    "cta-lg",
    "okck",
    "truste-button2",
    "accept-btn-handler",
    "consent-button",
    "consent-btn",
    "acceptbutton",
    "accept",
    "Accept",
    "Allow",
    "allow",
    "agree",
    "cookies-continue",
    "primary"
    
]

let rejectList = [
    "btn-secondary-lg",
    "consent-required",
    "reject-all",
    "reject-btn-handler",
    "Reject",
    "reject",
    "dismiss",
    "Decline",
    "decline",
    "deny",
]

let mangeList = [
    "pc-btn-handler",
    "ck_set",
    "cookie-settings",
    "Manage",
    "more",
    "manage",
    "settings",
    "custom",
    "basic",
    "cookiebutton"
]

let closeCookieList = [
    "button--reject",
    "red ensButtons",
    "close-btn-handler",
    "sn-b-save",
    "accept-selection",
    "Save",
    "save",
    "CookieOptionsModal_Accept",
    "decline"
   
]


