import {registerSettings} from './settings.js';


'use strict';


Hooks.once('init', async () => {
    console.log('tension-pool | Initializing always-centred');
    registerSettings();
});

Hooks.on("ready", () => {
    console.log('always-centred | Ready');

    console.log("always-centred | Listener")
    game.socket.on('module.always-centred', (data) => DMControl(data));

    ui.notifications.info("Tension Pool | The DM has control of your screen centring.");

});


Hooks.on("getSceneControlButtons", (controls) => {
    const bar = controls.find((c) => c.name === "token");

    if (game.settings.get("always-centred", 'Button-GMControl',) ){
        bar.tools.push({
            name: "always-centred-dmcontrol",
            title: "DM Control Centring for All",
            icon: "fas fa-globe-europe",
            onClick: () => DMGlobalControl(),
            toggle: true,
            visible: game.user.isGM,
        });
    }
});