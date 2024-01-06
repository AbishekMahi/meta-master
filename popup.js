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
            pretitle,
            predescription,
            image,
            ficon,
            url,
            siteName,
            tColor,
            lang,
            cleanurl
        } = metaDetails;

        // Escape HTML entities in variables
        const escapedPretitle = escapeHTML(pretitle);
        const escapedPredescription = escapeHTML(predescription);
        const escapedImage = escapeHTML(image);
        const escapedFavicon = escapeHTML(ficon);
        const escapedUrl = escapeHTML(url);
        const escapedSiteName = escapeHTML(siteName);
        // Function to escape HTML entities
        function escapeHTML(html) {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };

            return html.replace(/[&<>"']/g, match => escapeMap[match]);
        }
        // google Preview
        googlePreview.innerHTML = `
            <div class="row d-flex justify-content-start align-items-center mb-2">
                <div class="col-1">
                    <div class="favicon">
                        <img src="${escapedFavicon}" alt="Favicon">
                    </div>
                </div>
                <div class="col-11">
                    <p class="siteName">${escapedSiteName}</p>
                    <small>${escapedUrl}</small>
                </div>
            </div>
            <h4>${escapedPretitle}</h4>
            <p>${escapedPredescription.length > 160 ? escapedPredescription.substring(0, 160) + '...' : escapedPredescription}</p>
            <img src="${escapedImage}" class="image" alt="${escapedImage}">
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
                <div class="details_title">${escapedPretitle}</div>
                <div class="details_description">${escapedPredescription}</div>
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
                <div class="x_title">${escapedPretitle}</div>
                <div class="x_description">${predescription}</div>
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
            <div class="linked-title">${escapedPretitle}</div>
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
        <div class="dis-cord" style="border-left: 4px solid ${tColor}">
         <h4>${escapedPretitle}</h4>
         <p>${escapedPredescription}</p>
         <img src="${image}" alt="${image}">
         </div>
        <small class="bottom-small">Discord Preview</small>
        `;
        // "Analyze Page" tab

        if (metaDetails) {
            const sections = [{
                    title: "Main Meta tags",
                    fields: ["Title", "Description", "Keywords", "CanonicalUrl", "Favicon", "Robots", "ThemeColor", "Manifest"],
                    about: {
                        Title: "Main title for your webpage. This is displayed in search engine results and browser tabs. (60 characters)",
                        Description: "A brief summary of your webpage's content. This is also displayed in search engine results. (155 - 160 characters)",
                        Keywords: "Relevant keywords that describe your webpage's content. These are used by search engines to determine the relevance of your page to search queries.",
                        CanonicalUrl: "The primary URL of your webpage. This is important for avoiding duplicate content issues.",
                        Favicon: "A small icon that represents your webpage. This is displayed in browser tabs and address bars.",
                        Robots: "Instructions for web robots on how to index and follow your webpage. For example, you can use the `noindex` tag to prevent a page from being indexed by search engines.",
                        ThemeColor: "The primary color of your webpage. This is used by some browsers to color the browser's toolbar and address bar.",
                        Manifest: "manifest is a [ JSON ] document that contains startup parameters and application defaults for when a web application is launched."
                    }
                },
                {
                    title: "Open Graph tags",
                    fields: ["ogsitename", "ogtitle", "ogurl", "ogdescription", "ogtype", "oglocale", "ogimage", "ogimagewidth", "ogimageheight", "ogimagealt", "articlepublisher", "articlePublishedTime", "articleModifiedTime", "articleAuthor"],
                    about: {
                        ogsitename: "The name of the website. This is displayed in social media posts and previews.",
                        ogtitle: "The title of the webpage. This is also displayed in social media posts and previews.",
                        ogurl: "The URL of the webpage. This is important for sharing the webpage on social media.",
                        ogdescription: "A brief summary of the webpage's content. This is displayed in social media posts and previews.",
                        ogtype: "The type of webpage (e.g. article, blog post, video). This is used by social media platforms to determine how to display the webpage.",
                        oglocale: "The language of the webpage. This is used by social media platforms to display the webpage in the correct language.",
                        ogimage: "An image that represents the webpage. This is displayed in social media posts and previews.(1200x630px)",
                        ogimagewidth: "The width of the image in pixels. This is used by social media platforms to determine the size of the image.",
                        ogimageheight: "The height of the image in pixels. This is used by social media platforms to determine the size of the image.",
                        ogimagealt: "A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt.",
                        articlepublisher: "The publisher of the webpage. This is displayed in social media posts and previews.",
                        articlePublishedTime: "The date and time when the webpage was first published. This is displayed in social media posts and previews.",
                        articleModifiedTime: "The date and time when the webpage was last modified. This is displayed in social media posts and previews.",
                        articleAuthor: "The author of the webpage. This is displayed in social media posts and previews."
                    }
                },
                {
                    title: "Twitter Card tags",
                    fields: ["twitterCard", "twitterSite", "twitterCreator", "twitterTitle", "twitterDescription", "twitterImage", "twitterUrl"],
                    about: {
                        twitterCard: "The type of Twitter card (e.g. summary, summary_large_image). This determines the format of the card that is displayed when the webpage is shared on Twitter.",
                        // twitterSite: "The Twitter handle of the website. This is used to attribute the webpage to the website's Twitter account.",
                        // twitterCreator: "The Twitter handle of the webpage's author. This is used to attribute the webpage to the author's Twitter account.",
                        twitterSite: "The Twitter handle of the website. Examples: @lynkify_in",
                        twitterCreator: "The Twitter handle of the webpage's author.  Examples: @AbishekMahi0708",
                        twitterTitle: "The title of the webpage. This is displayed in the Twitter card.",
                        twitterDescription: "A brief summary of the webpage's content. This is displayed in the Twitter card.",
                        twitterImage: "An image that represents the webpage. This is displayed in the Twitter card.",
                        twitterUrl: "The URL of the webpage. This is important for sharing the webpage on social media.",
                    }
                }
            ];
            // Function to escape HTML entities
            function escapeHTML(html) {
                const escapeMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                };

                return html.replace(/[&<>"']/g, match => escapeMap[match]);
            }
            const formContent = sections.map(section => {
                const fieldsContent = section.fields.map(field => {
                    const value = escapeHTML(metaDetails[field]);
                    return `
                        <div class="form-group row">
                            <div class="col-3 p-0">
                                <label data-title="${escapeHTML(section.about[field])}">${escapeHTML(field)}</label>
                            </div>
                            <div class="col-9">
                                <p contenteditable="true" placeholder="-- ${escapeHTML(field)} is missing! --" class="form-control-plaintext" id="${escapeHTML(field)}">${value}</p>
                            </div>
                        </div>`;
                }).join('');

                return `
                    <p class="sm-topics">${escapeHTML(section.title)}</p>
                    ${fieldsContent}`;
            }).join('');

            // Add the content for the "Analyze Page" tab
            analyse.innerHTML = `
                <button type="button" class="btn btn-primary" id="get-code-btn"><i class='bx bx-code-alt'></i> Get Code</button>
                <form id="formss" style="display: block;" class="pl-10">${formContent}</form>
                <div id="gettCode" style="display: none;"></div>
            `;

            function getLangAttribute() {
                const htmlTag = document.querySelector('html');
                return htmlTag ? htmlTag.getAttribute('lang') || '' : '';
            }
            const formss = document.getElementById("formss");
            const gettCode = document.getElementById("gettCode");
            const getCodeBtn = document.getElementById("get-code-btn");

            getCodeBtn.addEventListener("click", function () {
                // Toggle the display of the form and the code
                formss.style.display = formss.style.display === "block" ? "none" : "block";
                gettCode.style.display = gettCode.style.display === "none" ? "block" : "none";
                // Update the button text
                getCodeBtn.innerHTML = formss.style.display === "block" ? "<i class='bx bx-code-alt'></i> Get Code" : "<i class='bx bx-code-alt'></i> Hide Code";

                // Get the values from the form fields and escape HTML entities
                const title = escapeHTML(document.getElementById('Title').textContent.trim());
                const description = escapeHTML(document.getElementById('Description').textContent.trim());
                const keywords = escapeHTML(document.getElementById('Keywords').textContent.trim());
                const canonicalUrl = escapeHTML(document.getElementById('CanonicalUrl').textContent.trim());
                const favicon = escapeHTML(document.getElementById('Favicon').textContent.trim());
                const robots = escapeHTML(document.getElementById('Robots').textContent.trim());
                const themeColor = escapeHTML(document.getElementById('ThemeColor').textContent.trim());
                const manifest = escapeHTML(document.getElementById('Manifest').textContent.trim());

                const ogsitename = escapeHTML(document.getElementById('ogsitename').textContent.trim());
                const ogtitle = escapeHTML(document.getElementById('ogtitle').textContent.trim());
                const ogurl = escapeHTML(document.getElementById('ogurl').textContent.trim());
                const ogdescription = escapeHTML(document.getElementById('ogdescription').textContent.trim());
                const ogtype = escapeHTML(document.getElementById('ogtype').textContent.trim());
                const oglocale = escapeHTML(document.getElementById('oglocale').textContent.trim());
                const ogimage = escapeHTML(document.getElementById('ogimage').textContent.trim());
                const ogimagewidth = escapeHTML(document.getElementById('ogimagewidth').textContent.trim());
                const ogimageheight = escapeHTML(document.getElementById('ogimageheight').textContent.trim());
                const ogimagealt = escapeHTML(document.getElementById('ogimagealt').textContent.trim());
                const articlepublisher = escapeHTML(document.getElementById('articlepublisher').textContent.trim());
                const articlePublishedTime = escapeHTML(document.getElementById('articlePublishedTime').textContent.trim());
                const articleModifiedTime = escapeHTML(document.getElementById('articleModifiedTime').textContent.trim());
                const articleAuthor = escapeHTML(document.getElementById('articleAuthor').textContent.trim());

                const twitterCard = escapeHTML(document.getElementById('twitterCard').textContent.trim());
                const twitterSite = escapeHTML(document.getElementById('twitterSite').textContent.trim());
                const twitterCreator = escapeHTML(document.getElementById('twitterCreator').textContent.trim());
                const twitterTitle = escapeHTML(document.getElementById('twitterTitle').textContent.trim());
                const twitterDescription = escapeHTML(document.getElementById('twitterDescription').textContent.trim());
                const twitterImage = escapeHTML(document.getElementById('twitterImage').textContent.trim());
                const twitterUrl = escapeHTML(document.getElementById('twitterUrl').textContent.trim());

                // Generate the HTML code for the meta tags
                gettCode.innerHTML = `
                <pre class="m-0 language-html"><code class="language-markup">&lt;!-- Paste inside head tag--&gt;
&lt;meta charset='utf-8'&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

&lt;!-- Main tags--&gt;
&lt;title&gt;${title || ogtitle || twitterTitle}&lt;/title&gt;
&lt;meta name="description" content="${description}"&gt;
&lt;meta name="keywords" content="${keywords}"&gt;
&lt;meta name="theme-color" content="${themeColor}"&gt;
&lt;link rel="canonical" href="${canonicalUrl || cleanurl}"&gt;
&lt;link rel="shortcut icon" href="${favicon}" type="image/x-icon"&gt;
&lt;link rel="manifest" href="${manifest}"&gt;
&lt;meta name="robots" content="${robots}"&gt;

&lt;!-- Open Graph / Facebook Tags --&gt;
&lt;meta property="og:site_name" content="${ogsitename}"&gt;
&lt;meta property="og:title" content="${ogtitle || title}"&gt;
&lt;meta property="og:description" content="${ogdescription || description}"&gt;
&lt;meta property="og:type" content="${ogtype}"&gt;
&lt;meta property="og:url" content="${ogurl || canonicalUrl || cleanurl}"&gt;
&lt;meta property="og:image" content="${ogimage || twitterImage}"&gt;
&lt;meta property="og:image:alt" content="${ogimagealt || title}"&gt;
&lt;meta property="og:locale" content="${oglocale || lang}"&gt;

&lt;!-- Twitter tags --&gt;
&lt;meta name="twitter:card" content="${twitterCard || "summary"}"&gt;
&lt;meta name="twitter:title" content="${twitterTitle || title}"&gt;
&lt;meta name="twitter:description" content="${twitterDescription || description}"&gt;
&lt;meta name="twitter:url" content="${twitterUrl || canonicalUrl || cleanurl}"&gt;
&lt;meta name="twitter:image" content="${twitterImage || ogimage}"&gt;
&lt;meta name="twitter:site" content="${twitterSite}"&gt;
&lt;meta name="twitter:creator" content="${twitterCreator}"&gt;
&lt;!-- Meta Tags Generated with https://metamaster.lynkify.in/ --&gt;</code></pre>
`;
                // Explicitly call Prism.highlightElement() on the dynamically added content
                let dynamicBlock = gettCode.querySelector("pre");
                Prism.highlightElement(dynamicBlock);

                // copy code
                const copyButtonLabel = "Copy";

                // use a class selector if available
                let blocks = document.querySelectorAll("pre");

                blocks.forEach((block) => {
                    // only add button if browser supports Clipboard API
                    if (navigator.clipboard) {
                        // Create a container div
                        let container = document.createElement("section");

                        // Create the button
                        let button = document.createElement("button");
                        button.innerText = copyButtonLabel;

                        // Append the button to the container
                        container.appendChild(button);

                        // Append the pre tag to the container
                        container.appendChild(block.parentElement.replaceChild(container, block));

                        button.addEventListener("click", async () => {
                            await copyCode(block, button);
                        });
                    }
                });

                async function copyCode(block, button) {
                    // Directly query the pre element for the code content
                    let text = block.innerText;

                    await navigator.clipboard.writeText(text);

                    // visual feedback that task is completed
                    button.innerText = "Copied!";

                    setTimeout(() => {
                        button.innerText = copyButtonLabel;
                    }, 1000);
                }

            });

        } else {
            googlePreview.innerHTML = "Unable to retrieve meta details.";
            fbPreview.innerHTML = "Unable to retrieve meta details.";
            twitterPreview.innerHTML = "Unable to retrieve meta details.";
            linkedinPreview.innerHTML = "Unable to retrieve meta details.";
            analyse.innerHTML = "Unable to retrieve meta details.";
        }
    }
}