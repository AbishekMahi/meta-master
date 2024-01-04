// popup.js
document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "getMetaDetails"
        }, function (response) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                displayMetaDetails(response);
            }
        });
    });
});

function displayMetaDetails(metaDetails) {
    const googlePreview = document.getElementById("google-preview");
    const fbPreview = document.getElementById("fb-preview");
    const xPreview = document.getElementById("x-preview");
    const linkedinPreview = document.getElementById("linkedin-preview");
    const discordPreview = document.getElementById("discord-preview");
    const analyse = document.getElementById("analyse");

    if (metaDetails) {
        const {
            title,
            description,
            keywords,
            image,
            favicon,
            canonicalUrl,
            url,
            siteName,
            robots,
            themeColor,
            // og tags
            ogsitename,
            ogurl,
            ogtitle,
            ogimage,
            ogdescription,
            ogtype,
            oglocale,
            ogimageAlt,
            ogimagewidth,
            ogimageheight,
            articlepublisher,
            articlePublishedTime,
            articleModifiedTime,
            articleAuthor,
            articleSection,
            articleTag,
            // twitter tags
            twitterCard,
            twitterSite,
            twitterCreator,
            twitterTitle,
            twitterDescription,
            twitterImage,
        } = metaDetails;

        // google Preview
        googlePreview.innerHTML = `
        <div class="row d-flex justify-content-start align-items-center mb-2">
            <div class="col-1">
                <div class="favicon">
                    <img src="${favicon}" alt="Favicon">
                </div>
            </div>
            <div class="col-11">
                <p class="siteName">${siteName}</p>
                <small>${url}</small>
            </div>
        </div>
        <h4> ${title}</h4>
        <p>${description.length > 160 ? description.substring(0, 160) + '...' : description}</p>
        <img src="${image}" class="image" alt="${image}">
        <small class="bottom-small">Google Preview</small>
      `;

        //   facebook preview
        fbPreview.innerHTML = `
        <div class="og_preview_wrapper">
        <div class="og_preview_container">
            <div class="og_preview_author"><img src="https://blog.lynkify.in/img/avatar/abishek.jpg">
                <div class="og_preview_author_details">
                    <div class="author_name">Abishek Mahi</div>
                    <div class="author_time">
                        <div class="level is-mobile">
                            <div class="level-left">
                                <div class="level-item">2d</div>
                                <div class="level-item">&nbsp;</div>
                                <div class="level-item">· </div>
                                <div class="level-item">&nbsp;</div>
                                <div class="level-item"><i class="globe"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="og_preview_comment">The sample text</div>
            <div class="og_preview_the_image" style="background-image: url(&quot;${image}&quot;);"></div>
            <div class="og_preview_link_details">
                <div class="details_domain">${siteName}</div>
                <div class="details_title">${title}</div>
                <div class="details_description">${description}</div>
            </div>
            <div class="og_preview_likes">
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item"><i class="like"></i></div>
                        <div class="level-item">&nbsp; You and 120 others</div>
                    </div>
                    <div class="level-right">23 comments</div>
                </div>
            </div>
        </div>
    </div>
    <small class="bottom-small">Facebook Preview</small>
       `;

        //   X preview
        xPreview.innerHTML = `
        <div class="x_container">
            <div class="x_author">
                <img src="https://blog.lynkify.in/img/avatar/abishek.jpg">
                <div class="x_author_details">
                    <div class="author_name">Abishek Mahi</div>
                    <div class="author_handle">@Lynkify.in</div>
                </div>
            </div>
            <div class="x_comment">The sample tweet</div>
            <div class="x_card_preview">
            <div class="x_the_image"style="background-image: url(&quot;${image}&quot;);"></div>
            <div class="x_link_details">
                <div class="x_title">${title}</div>
                <div class="x_description">${description}</div>
                <div class="x_domain">${siteName}</div>
            </div>
            </div>
            <div class="twitter_date">2:36 PM · Jul 23, 2020</div>
        </div>
        <small class="bottom-small">X (formerly Twitter) Preview</small>
          `;

        // Linkedin preview
        linkedinPreview.innerHTML = `
        <div class="linked-in">
        <div class="x_author px-2">
        <img class="linked-author" src="https://blog.lynkify.in/img/avatar/abishek.jpg">
        <div class="linked_author_details">
            <div class="author_name">Abishek Mahi <span>(He/Him) • You</span></div>
            <div class="author_bio">Freelancer - Web Developer - UI/UX designer</div>
            <div class="author_bio">5mo</div>
        </div>
        </div>
        <div class="linked_comment px-2">The sample text</div>
        <div class="x_the_image"style="background-image: url(&quot;${image}&quot;);"></div>
        <div class="linked-img" style="background-image: url(&quot;${image}&quot;);">
        </div>
        <div class="linked_details p-3">
            <div class="linked-title">${title}</div>
            <div class="linked-link">${siteName} • 3 min read</div>
        </div>
        <div class="og_preview_likes my-2  px-2">
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item"><i class="like"></i></div>
                        <div class="level-item">&nbsp; John Wick and 167 others</div>
                    </div>
                    <div class="level-right">8 repost</div>
                </div>
            </div>
       </div>
       <small class="bottom-small">Linkedin Preview</small>
       `;

        // discord Preview
        discordPreview.innerHTML = `
         <div class="dis-cord">
         <h4>${title}</h4>
         <p>${description}</p>
         <img src="${image}" alt="${image}">
         </div>
        <small class="bottom-small">Discord Preview</small>
        `;

        // Add the content for the "Analyze Page" tab
        analyse.innerHTML = `
        <form class="pl-10">
        <p class="sm-topics">Main Meta tags</p>
        <div class="form-group row">
            <label for="Title" class="col-3 col-form-label">Title</label>
            <div class="col-9">
                <p contenteditable="true" placeholder="-- Title is missing! --" class="form-control-plaintext" id="title">${title}</p>
            </div>
        </div>
        <div class="form-group row">
            <label for="desc" class="col-3 col-form-label">Description</label>
            <div class="col-9">
            <p contenteditable="true" placeholder="-- Description is missing! --" id="description"  class="form-control-plaintext">${description}</p>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-3 col-form-label">Keywords</label>
            <div class="col-9">
            <p contenteditable="true" placeholder="-- Keywords are missing! --" class="form-control-plaintext" id="keywords">${keywords}</p>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-3 col-form-label">Canonical Url</label>
            <div class="col-9">
            <p contenteditable="true" placeholder="-- Canonical url is missing! --" class="form-control-plaintext" id="canonical">${canonicalUrl}</p>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-3 col-form-label">Robots</label>
            <div class="col-9">
            <p contenteditable="true" placeholder=" -- Robots are missing! --" class="form-control-plaintext" id="robots">${robots}</p>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-3 col-form-label">Theme Color</label>
            <div class="col-9">
            <p contenteditable="true" placeholder="-- Theme Color is missing! --" class="form-control-plaintext" id="themeColor">${themeColor}</p>
            </div>
        </div>

        <!-- Open Graph / Facebook tags  -->

        <p class="sm-topics">Open Graph tags</p>
        <div class="form-group row">
            <label class="col-3 col-form-label">og:site_name</label>
            <div class="col-9">
            <p contenteditable="true" placeholder="-- og:site_name is missing! --" class="form-control-plaintext" id="ogsitename">${ogsitename}</p>
            </div>
        </div>
        <div class="form-group row">
            <label for="Title" class="col-3 col-form-label">og:title</label>
            <div class="col-9">
                <p contenteditable="true" placeholder="-- og:title is missing! --" class="form-control-plaintext" id="ogtitle">${ogtitle}</p>
            </div>
        </div><div class="form-group row">
        <label class="col-3 col-form-label">og:url</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- og:url is missing! --" class="form-control-plaintext" id="ogurl">${ogurl}</p>
        </div>
    </div>
    <div class="form-group row">
        <label for="Description" class="col-3 col-form-label">og:description</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- og:description is missing! --" class="form-control-plaintext" id="ogdescription">${ogdescription}</p>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-3 col-form-label">og:type</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- og:type is missing! --" class="form-control-plaintext" id="ogtype">${ogtype}</p>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-3 col-form-label">og:locale</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- og:locale is missing! --" class="form-control-plaintext" id="oglocale">${oglocale}</p>
        </div>
    </div>
    <div class="form-group row">
    <label class="col-3 col-form-label">og:image</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- og:image is missing! --" class="form-control-plaintext" id="ogimage">${ogimage}</p>
    </div>
</div>
    <div class="form-group row">
        <label class="col-3 col-form-label">og:image:alt</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- og:image:alt is missing! --" class="form-control-plaintext" id="ogimageAlt">${ogimageAlt}</p>
        </div>
    </div>
    <div class="form-group row">
    <label class="col-3 col-form-label">og:image:width</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- og:image:width is missing! --" class="form-control-plaintext" id="ogimagewidth">${ogimagewidth}</p>
    </div>
    </div>
    <div class="form-group row">
    <label class="col-3 col-form-label">og:image:height</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- og:image:height is missing! --" class="form-control-plaintext" id="ogimageheight">${ogimageheight}</p>
    </div>
    </div>
    <div class="form-group row">
        <label class="col-3 col-form-label">article:publisher</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- article:publisher is missing! --" class="form-control-plaintext" id="articlepublisher">${articlepublisher}</p>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-3 col-form-label">article:published_time</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- article:published_time is missing! --" class="form-control-plaintext" id="articlePublishedTime">${articlePublishedTime}</p>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-3 col-form-label">article:modified_time</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- article:modified_time is missing! --" class="form-control-plaintext" id="articleModifiedTime">${articleModifiedTime}</p>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-3 col-form-label">article:author</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- article:author is missing! --" class="form-control-plaintext" id="articleAuthor">${articleAuthor}</p>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-3 col-form-label">article:section</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- article:section is missing! --" class="form-control-plaintext" id="articleSection">${articleSection}</p>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-3 col-form-label">article:tag</label>
        <div class="col-9">
            <p contenteditable="true" placeholder="-- article:tag is missing! --" class="form-control-plaintext" id="articleTag">${articleTag}</p>
        </div>
    </div>

<!-- Twitter Card tags -->

<p class="sm-topics">Twitter Card tags</p>
<div class="form-group row">
    <label class="col-3 col-form-label">twitter:card</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- twitter:card is missing! --" class="form-control-plaintext" id="twittercard">${twitterCard}</p>
    </div>
</div>

<div class="form-group row">
    <label class="col-3 col-form-label">twitter:site</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- twitter:site is missing! --" class="form-control-plaintext" id="twittersite">${twitterSite}</p>
    </div>
</div>

<div class="form-group row">
    <label class="col-3 col-form-label">twitter:creator</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- twitter:creator is missing! --" class="form-control-plaintext" id="twittercreator">${twitterCreator}</p>
    </div>
</div>

<div class="form-group row">
    <label class="col-3 col-form-label">twitter:title</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- twitter:title is missing! --" class="form-control-plaintext" id="twittertitle">${twitterTitle}</p>
    </div>
</div>

<div class="form-group row">
    <label class="col-3 col-form-label">twitter:description</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- twitter:description is missing! --" class="form-control-plaintext" id="twitterdescription">${twitterDescription}</p>
    </div>
</div>

<div class="form-group row">
    <label class="col-3 col-form-label">twitter:image</label>
    <div class="col-9">
        <p contenteditable="true" placeholder="-- twitter:image is missing! --" class="form-control-plaintext" id="twitterimage">${twitterImage}</p>
    </div>
</div>

        </form>
        `;

    } else {
        googlePreview.innerHTML = "Unable to retrieve meta details.";
        fbPreview.innerHTML = "Unable to retrieve meta details.";
        twitterPreview.innerHTML = "Unable to retrieve meta details.";
        linkedinPreview.innerHTML = "Unable to retrieve meta details.";
    }
}