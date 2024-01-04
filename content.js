// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getMetaDetails") {
        const metaDetails = {
            siteName: getMetaContent('meta[property="og:site_name"]') || getSiteName(window.location.hostname),
            title: getMetaContent('meta[property="og:title"]') || getMetaContent('meta[name="twitter:title"]') || document.title || "-- Title is missing! --",
            description: getMetaContent('meta[property = "og:description"]') || getMetaContent('meta[name="description"]') || "-- Description is missing! --",
            image: getWebPCompatibleImage() || 'images/no-image.png',
            favicon: getFavicon() || 'images/no-favicon.png',
            url: getAttributeFromTag('link[rel="canonical"]', 'href') || getMetaContent('meta[property="og:url"]') || getMetaContent('meta[name="twitter:url"]') || window.location.href,
            // main metadata
            maintitle: document.title,
            maindesc: getMetaContent('meta[name="description"]') || "",
            keywords: getMetaContent('meta[name="keywords"]') || "",
            canonicalUrl: getAttributeFromTag('link[rel="canonical"]', 'href') || "",
            themeColor: getMetaContent("meta[name='theme-color']") || "",
            robots: getMetaContent("meta[name='robots']") || "",
            // og: tags
            ogsitename: getMetaContent('meta[property="og:site_name"]') || getMetaContent('meta[name="og:site_name"]') || "",
            ogurl: getMetaContent('meta[property="og:url"]') || getMetaContent('meta[name="og:url"]') || "",
            ogtitle: getMetaContent('meta[property="og:title"]') || getMetaContent('meta[name="og:title"]') || "",
            ogdescription: getMetaContent('meta[property="og:description"]') || getMetaContent('meta[name="og:description"]') || "",
            ogimage: getMetaContent('meta[property="og:image"]') || getMetaContent('meta[name="og:image"]') || "",
            ogimageAlt: getMetaContent('meta[property="og:image:alt"]') || getMetaContent('meta[name="og:image:alt"]') || "",
            ogimagewidth: getMetaContent('meta[property="og:image:width"]') || getMetaContent('meta[name="og:image:width"]') || "",
            ogimageheight: getMetaContent('meta[property="og:image:height"]') || getMetaContent('meta[name="og:image:height"]') || "",
            ogtype: getMetaContent('meta[property="og:type"]') || getMetaContent('meta[name="og:type"]') || "",
            oglocale: getMetaContent('meta[property="og:locale"]') || getMetaContent('meta[name="og:locale"]') || "",
            ogvideo: {
                url: getMetaContent('meta[property="og:video:url"]') || "",
                secure_url: getMetaContent('meta[property="og:video:secure_url"]') || "",
                width: getMetaContent('meta[property="og:video:width"]') || "",
                height: getMetaContent('meta[property="og:video:height"]') || "",
                type: getMetaContent('meta[property="og:video:type"]') || "",
                embed_src: getMetaContent('meta[property="og:video:embed_src"]') || "",
                thumbnail_url: getMetaContent('meta[property="og:video:thumbnail_url"]') || "",
                secure_thumbnail_url: getMetaContent('meta[property="og:video:secure_thumbnail_url"]') || ""
            },
            ogaudio: {
                url: getMetaContent('meta[property="og:audio:url"]') || "",
                secure_url: getMetaContent('meta[property="og:audio:secure_url"]') || "",
                type: getMetaContent('meta[property="og:audio:type"]') || "",
                embed_src: getMetaContent('meta[property="og:audio:embed_src"]') || "",
                thumbnail_url: getMetaContent('meta[property="og:audio:thumbnail_url"]') || "",
                secure_thumbnail_url: getMetaContent('meta[property="og:audio:secure_thumbnail_url"]') || ""
            },
            articlePublishedTime: getMetaContent('meta[property="article:published_time"]') || "",
            articleModifiedTime: getMetaContent('meta[property="article:modified_time"]') || "",
            articleAuthor: getMetaContent('meta[property="article:author"]') || "",
            articleSection: getMetaContent('meta[property="article:section"]') || "",
            articleTag: getMetaContent('meta[property="article:tag"]') || "",
            articlepublisher: getMetaContent('meta[property="article:publisher"]') || "",

            // twitter tags
            twitterCard: getMetaContent('meta[name="twitter:card"]') || getMetaContent('meta[property="twitter:card"]') || "",
            twitterSite: getMetaContent('meta[name="twitter:site"]') || getMetaContent('meta[property="twitter:site"]') || "",
            twitterCreator: getMetaContent('meta[name="twitter:creator"]') || getMetaContent('meta[property="twitter:creator"]') || "",
            twitterTitle: getMetaContent('meta[name="twitter:title"]') || getMetaContent('meta[property="twitter:title"]') || "",
            twitterDescription: getMetaContent('meta[name="twitter:description"]') || getMetaContent('meta[property="twitter:description"]') || "",
            twitterImage: getMetaContent('meta[name="twitter:image"]') || getMetaContent('meta[property="twitter:image"]') || "",
        };
        sendResponse(metaDetails);
    }
});

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

function getAttributeFromTag(selector, attribute) {
    const tag = document.querySelector(selector);
    return tag ? tag.getAttribute(attribute) : "";
}

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
        const constructedFaviconUrl = baseHref + '/favicon.ico' || baseHref + '/favicon.png';

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