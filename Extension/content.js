function findElementInBanner(banner, List){
    let Btn = null
    for (const description of List) {
        let baseSelector = `:not(style):not(img):not(h2)`;
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
        if (!Btn){
            Btn = banner.querySelector(`${baseSelector}[data-label*='${description}']`);
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
        if (!element){
            element = document.querySelector(`${baseSelector}[bundlename*='${description}']`);
        }
        if (element) {
            return(element)
        }
    }
    return(element)
}

function findButtonByTextContent(banner, descriptions, close = false) {
    const allButtons = banner.querySelectorAll('button, span, a');
    console.log('Searching for exact matches:', descriptions.join(', '));

    for (const description of descriptions) {
        for (const button of allButtons) {
            // Trim and convert the button text to lowercase for comparison
            const buttonText = button.textContent.trim().toLowerCase();

            // Check for an exact match instead of using includes
            if (buttonText === description) { // Assuming `description` is already lowercase
                console.log('Exact match found:', button);
                return button; // Return the first button that exactly matches the description
            }
        }
    }
    return null;
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
        console.log('find text');
        acceptBtn = findButtonByTextContent(banner, textAcceptList)
        if (acceptBtn) {
            console.log('This is accept word',  acceptBtn);
            acceptBtn.click()
        }
    }
    if (process.env.NODE_ENV === 'test') {
        document.dispatchEvent(new CustomEvent('manageButtonCalled'));
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
        rejectBtn = findElementInBanner(banner, textRejectList)
        if(rejectBtn){
            rejectBtn.click()
        }
        else{
            console.log('find text');
            rejectBtn = findButtonByTextContent(banner, textRejectList, true)
            if (rejectBtn) {
                console.log('This is reject word',  rejectBtn);
                rejectBtn.click()
            }
            else{
                if (process.env.NODE_ENV === 'test') {
                    document.dispatchEvent(new CustomEvent('manageButtonCalled'));
                }
                manageButton(banner)
            }
        }
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
        closeBtn = findButtonByTextContent(banner, textmangePref)
        if (closeBtn){
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
}


// Wait for 5 seconds after the page loads, then run the check
setTimeout(checkForCookieBanner, 1000);

let bannerList = [
    "_9HetvA",
    "_50f4",
    "didomi-host",
    "app-0-0-2",
    "qc-cmp2-ui",
    "evidon-banner",
    "onetrust-banner-sdk",
    "iubenda-cs-rationale",
    "portal-container",
    "global-alert-banner",
    "CookiebotDialog",
    "wscrBannerContent",
    "focus-lock-id",
    "cmpCookiePolicy",
    "gdpr-new-container",
    "gdpr-banner",
    "gdpr-popup",
    "gdpr-consent",
    "gdpr-callout",
    "gdpr-content",
    "gdpr_consent",
    "fides-banner",
    "ncmp__banner",
    "ez-cookie-dialog",
    "awsccc-cb-content",
    "toast-container",
    "modal-886ab",
    "cmp__dialog",
    "cc-banner__content",
    "cmpbox",
    "sn-inner",
    "all4-cc-grid",
    "ytd-consent",
    "Your data privacy",
    "consent-container",
    "consent-manager",
    "user-consent-management",
    "consent_blackbar",
    "consent-overlay",
    "consent-tracking",
    "cookiescript_injected",
    "tbp-consent",
    "CookieAlert",
    "ConsentBanner",
    "cookieBannerWrapper",
    "cookies_banner_modal",
    "consent-banner",
    "Cookie Consent Banner",
    "cookie-consent",
    "cookieconsent",
    "cookie_banner",
    "Cookie banner",
    "privacy_widget",
    "Privacy",
    "cookie-banner",
    "mainContent",
    "Cookie",
    "cookie",
    "notice",
    "frame-content",
]

let acceptList = [
    "cta-lg",
    "okck",
    "truste-button2",
    "accept-btn-handler",
    "consent-button",
    "consent-btn",
    "ConsentButton",
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
    "necessary_only_cookies",
    "refuse-btn",
    "consent-required",
    "no-consent",
    "consent_accept_essential",
    "accept_essential",
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
    "ncmp__btn-border",
    "wscrBannerLink",
    "learn-more",
    "CookieBannerPreferences",
    "Manage",
    "settingsLink",
    "more",
    "manage",
    "settings",
    "custom",
    "basic",
    "cookiebutton"
]

let closeCookieList = [
    "fc-confirm-choices",
    "button--reject",
    "red ensButtons",
    "close-btn-handler",
    "ncmp__btn-danger",
    "Confirm my selection",
    "sn-b-save",
    "tbp-submit",
    "SaveButton_u973clc",
    "learn_more_agree",
    "accept-selection",
    "Save",
    "save",
    "CookieOptionsModal_Accept",
    "decline"
   
]

let textAcceptList = [
    "accept all cookies",
    "i accept",
    "accept",
    "allow all",
    "agree",
    "accept all",
    "ok"
    
]

let textRejectList = [
    "reject",
    "i do not accept",
    "reject all",
    "reject all cookies",
    "continue without accepting",
    "accept essential cookies",
    "decline all",
    "reject non-essential",
    "disagree"
]

let textmangePref = [
    "save preferences"
]

module.exports = { findElementInBanner, findElementInDoc, findButtonByTextContent, checkForCookieBanner, acceptAll, rejectAll, manageButton, closeMangePage };