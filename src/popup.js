
export function displaypopup() {
    let support = "<a href=\"https://ko-fi.com/sdoehren\" target=\"_blank\" rel=\"noopener noreferrer\">\n" +
        "                    <img src=\"https://img.shields.io/badge/ko--fi-Support-red?style=flat-square&amp;logo=ko-fi\" alt=\"ko-fi\"></a>"

    let post = "<h1>Tension Pool</h1>\n" + support +
        "<h1 id=\"Large Change\">Large Change</h1>\n" +
        "<p>Please beaware that Scene Controls have been removed and replaced with </p>"


    let d = new Dialog({
        title: "Tension Pool Update " + game.modules.get("tension-pool").data.version,
        content: post,
        buttons: {
            one: {
                icon: '<i class="fas fa-check"></i>',
                label: "Close",
                callback: () => game.settings.set("tension-pool", "DontShowAgain", true)
            }
        },
        default: "one",
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => game.settings.set("tension-pool", "LatestVersion", game.modules.get("tension-pool").data.version)
    });
    d.render(true);
}