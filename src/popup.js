
export function displaypopup() {
    let support = "<a href=\"https://ko-fi.com/sdoehren\" target=\"_blank\" rel=\"noopener noreferrer\">\n" +
        "                    <img src=\"https://img.shields.io/badge/ko--fi-Support-red?style=flat-square&amp;logo=ko-fi\" alt=\"ko-fi\"></a>\n" +
        "                <a href=\"https://www.patreon.com/sdoehren?utm_source=Tension+Pool&utm_medium=Referral&utm_campaign=Module+Popup\" target=\"_blank\" rel=\"noopener noreferrer\">\n" +
        "                    <img src=\"https://img.shields.io/badge/Patreon-Support-red?style=flat-square&amp;logo=patreon\" alt=\"Patreon\"></a>\n" +
        "                <a href=\"https://sdoehren.github.io/support.html\" target=\"_blank\" rel=\"noopener noreferrer\">\n" +
        "                    <img src=\"https://img.shields.io/badge/Crypto-Support-red?style=flat-square\" alt=\"Crpto\"></a>\n"


    let post = "<h1>Tension Pool</h1>\n" + support +
        "<h1 id=\"change-log\">Change Log</h1>\n" +
        "<h4 id=\"0-0-50\">0.0.50</h4>\n" +
        "<ul>\n" +
        "<li>Protection against overfilling the pool has been added.</li>\n" +
        "</ul>\n" +
        "<h4 id=\"0-0-47-macro-breaking-change\">0.0.47 - Macro Breaking Change</h4>\n" +
        "<ul>\n" +
        "<li>Tension die short code had been changed from dt6 to just dt to fix an issue with compatibility with Dice So Nice</li>\n" +
        "</ul>\n" +
        "<h4 id=\"0-0-46\">0.0.46</h4>\n" +
        "<ul>\n" +
        "<li>d100 option added</li>\n" +
        "<li>Option to Trigger a macro when a complication occurs added</li>\n" +
        "<li>Minor Visual Improvements</li>\n" +
        "<li>Clicking the pool will now add a die</li>\n" +
        "<li>Dice So Nice 4 Support</li>\n" +
        "</ul>\n"


    let d = new Dialog({
        title: "Tension Pool Update " + game.modules.get("tension-pool").data.version,
        content: post,
        buttons: {
            one: {
                icon: '<i class="fas fa-check"></i>',
                label: "Close",
                callback: () => console.log("Closed")
            },
            two: {
                icon: '<i class="fas fa-times"></i>',
                label: "Close until next update",
                callback: () => game.settings.set("tension-pool", "DontShowAgain", true)
            },
            three: {
                icon: '<i class="fab fa-patreon"></i>',
                label: "Goto Patreon",
                callback: () => window.open("https://www.patreon.com/sdoehren", '_blank')
            }
        },
        default: "one",
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => game.settings.set("tension-pool", "LatestVersion", game.modules.get("tension-pool").data.version)
    });
    d.render(true);
}