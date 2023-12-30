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

    if (metaDetails) {
        const {
            title,
            description,
            keywords,
            image,
            favicon,
            canonicalUrl,
            siteName
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
                <small>${canonicalUrl}</small>
            </div>
        </div>
        <h4> ${title}</h4>
        <p>${description}</p>
        <img src="${image}" class="image" alt="${image}">
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
          `;

        // Linkedin preview
        linkedinPreview.innerHTML = `
        <div class="linked-in">
        <div class="x_author px-2">
        <img class="linked-author" src="https://blog.lynkify.in/img/avatar/abishek.jpg">
        <div class="linked_author_details">
            <div class="author_name">Abishek Mahi (He/Him)</div>
            <div class="author_bio">Freelancer - Web Developer - UI/UX designer</div>
            <div class="author_bio">5mo</div>
        </div>
        </div>
        <div class="linked_comment px-2">The sample text</div>
        <img src="${image}" class="linked-img" alt="${image}">
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
       `;
        // discord Preview
        discordPreview.innerHTML = `
         <div class="dis-cord">
         <h4>${title}</h4>
         <p>${description}</p>
         <img src="${image}" alt="${image}">
         </div>
        `;
    } else {
        googlePreview.innerHTML = "Unable to retrieve meta details.";
        fbPreview.innerHTML = "Unable to retrieve meta details.";
        twitterPreview.innerHTML = "Unable to retrieve meta details.";
        linkedinPreview.innerHTML = "Unable to retrieve meta details.";
    }
}