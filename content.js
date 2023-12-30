// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getMetaDetails") {
        const metaDetails = {
            title: document.title || "-- no title --",
            siteName: getSiteName(window.location.hostname),
            description: getMetaContent('meta[name="description"]') || "-- no description --",
            keywords: getMetaContent('meta[name="keywords"]'),
            image: getWebPCompatibleImage() || 'images/no-image.png',
            favicon: getFavicon() || 'images/no-favicon.png',
            canonicalUrl: getMetaContent('link[rel="canonical"]') || getMetaContent('meta[property="og:url"]') || window.location.href,
        };

        sendResponse(metaDetails);
    }
});

// function getSiteName(hostname) {
//     // Extract the site name from the hostname (e.g., "lynkify.in" from "https://lynkify.in/posts/how-to-create-smart-links/")
//     return hostname.split('.').slice(-2).join('.');
// }

// function getSiteName(hostname) {
//     let siteName = hostname;
//     if (hostname.includes("www.")) {
//         siteName = siteName.slice(4); // Remove "www."
//     }
//     const domainParts = siteName.split(".");
//     if (domainParts.length > 2) {
//         // Handle subdomains (e.g., "blog.lynkify.in")
//         siteName = `${domainParts[0]}.${domainParts[1]}`;
//     }
//     return siteName;
// }

function getSiteName(hostname) {
    let siteName = hostname;
    if (hostname.includes("www.")) {
        siteName = siteName.slice(4); // Remove "www."
    }
    const domainParts = siteName.split(".");
    if (domainParts.length > 2) {
        // Handle subdomains (e.g., "blog.lynkify.in")
        siteName = `${domainParts[0]}.${domainParts[1]}.${domainParts[2]}`;
    }
    // Further processing to ensure the site name is in the desired format
    siteName = siteName.replace(/^www\./, ""); // Remove "www." if it still exists
    siteName = siteName.charAt(0).toUpperCase() + siteName.slice(1); // Capitalize the first letter
    return siteName;
}

function getMetaContent(selector) {
    const metaTag = document.querySelector(selector);
    return metaTag ? metaTag.content : "";
}

// function getMetaContent(selector) {
//     const metaTag = document.querySelector(selector);
//     return metaTag ? metaTag.textContent.trim() : "";
// }

function getWebPCompatibleImage() {
    const ogImageTag = document.querySelector('meta[property="og:image"]') || document.querySelector('meta[name="twitter:image"]');
    if (ogImageTag) {
        const webpUrl = ogImageTag.content;

        // Check if the image URL ends with ".webp"
        if (webpUrl.toLowerCase().endsWith(".webp")) {
            // Construct the absolute URL by combining with the base URL of the page
            return makeAbsoluteUrl(webpUrl);
        }

        return makeAbsoluteUrl(webpUrl);
    }
    return "";
}

function makeAbsoluteUrl(relativeUrl) {
    // Construct the absolute URL by combining with the base URL of the page
    const baseHref = document.querySelector('base') ? document.querySelector('base').href : window.location.origin;
    const absoluteUrl = new URL(relativeUrl, baseHref);
    return absoluteUrl.href;
}


function getFavicon() {
    const faviconTag = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');

    if (faviconTag) {
        return faviconTag.href;
    } else {
        // If no explicit favicon link is found, construct the URL
        const baseHref = document.querySelector('base') ? document.querySelector('base').href : window.location.origin;
        const constructedFaviconUrl = baseHref + '/favicon.ico';

        // Check if the constructed favicon URL exists
        return faviconExists(constructedFaviconUrl) ? constructedFaviconUrl : "images/no-favicon.png";
    }
}

function faviconExists(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, false);
    xhr.send();
    return xhr.status !== 404;
}