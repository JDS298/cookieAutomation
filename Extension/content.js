//define in popup
// const accept = true;
// const reject = false;
const accept = false;
const reject = true;

function isElementPresent(element) {
    return element && element.parentNode !== null;
}

function findElementInBanner(banner, List){
    let Btn = null
    for (const description of List) {

        Btn = banner.querySelector(`[href*="${description}"]`)

        if (!Btn){
            Btn = banner.querySelector(`[aria-label*="${description}"]`)
        }
        if (!Btn) {
            Btn = banner.querySelector(`[id*='${description}']`);
        }
        if (!Btn){
            Btn = banner.querySelector(`[class*='${description}']`);
        }
        if (!Btn){
            Btn = banner.querySelector(`[title*='${description}']`);
        }
        if (!Btn){
            Btn = banner.querySelector(`[data-a-target*='${description}']`);
        }
         if (!Btn){
            Btn = banner.querySelector(`[data-testid*='${description}']`);
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
        element = document.querySelector(`[aria-label*="${description}"]`)

        if (!element) {
            element = document.querySelector(`[class*='${description}']`);
        }
        if (!element){
            element = document.querySelector(`[id*='${description}']`);
            // console.log(document.querySelector(`[class*='${description}']`))
        }
        if (!element){
            element = document.querySelector(`[data-a-target*='${description}']`);
        }
        if (!element){
            element = document.querySelector(`[data-testid*='${description}']`);
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
        if(accept){
            acceptAll(banner)
        }
        else if(reject){
            rejectAll(banner)
        }
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
    if(isElementPresent(banner)){
        console.log('mange');
        let mangeBtn = findElementInBanner(banner, mangeList)
            if (mangeBtn) {
                console.log('This is manage',  mangeBtn);
                mangeBtn.click()
                console.log('close');
                setTimeout(() => {
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
                }, 500);
            
            }
    else{

    }
}
}



function performanceCookiesFunc(){}

function functionalityCookiesFunc() {}

function advertisingCookiesFunc() {}


// Wait for 5 seconds after the page loads, then run the check
setTimeout(checkForCookieBanner, 2000);

const bannerList = [
    "_50f4",
    "Discord",
    "app-0-0-2",
    "gdpr-new-container",
    "gdpr-banner",
    "toast-container",
    "sn-inner",
    "all4-cc-grid",
    "ytd-consent",
    "user-consent-management",
    "consent_blackbar",
    "consent-overlay",
    "CookieAlert",
    "consent-banner",
    "cookieconsent",
    "Cookie Consent Banner",
    "cookie_banner",
    "cookie-banner",
    "Cookie banner",
    "Privacy",
    "Cookie",
    "cookie",
    "notice"
]

const acceptList = [
    "cta-lg",
    "okck",
    "accept-btn-handler",
    "consent-button",
    "accept",
    "Accept",
    "Allow",
    "allow",
    "cookies-continue",
    "primary"
]

const rejectList = [
    "btn-secondary-lg",
    "consent-required",
    "reject-all",
    "reject-btn-handler",
    "Reject",
    "reject",
    "dismiss",
    "Decline"
]

const mangeList = [
    "pc-btn-handler",
    "ck_set",
    "cookie-settings",
    "Manage",
    "more",
    "manage",
    "custom",
    "basic"
]

const closeCookieList = [
    "button--reject",
    "close-btn-handler",
    "sn-b-save",
    "accept-selection",
    "Save",
    "save"
   
]

const performanceList = [
    "mange"
]

const functionallyList = [
    "mange"
]

const advertisingList = [
    "mange"
]

