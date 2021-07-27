import {registerSettings} from './settings.js';
import {TensionDie} from './die.js';
import {TensionLayer} from './tensionLayer.js';
import {displaypopup} from './popup.js';

'use strict';

function registerLayer() {
    const layers = mergeObject(Canvas.layers, {
        TensionLayer: TensionLayer
    });
    Object.defineProperty(Canvas, 'layers', {
        get: function () {
            return layers
        }
    });

}

function messages(data) {
    if (data.datatype === "message") {
        ui.notifications.info("Tension Pool | " + data.message);
    }

    if (data.datatype === "updatedisplay") {
        updatedisplay(data.message)
    }

}

function sendmessage(message){

    let outputto = game.settings.get("tension-pool",'outputto');

    if (outputto === 'both' || outputto === 'notfications' ) {
        ui.notifications.info("Tension Pool | " + message);
        game.socket.emit('module.tension-pool', {
            message: message,datatype:"message"
        });
    }

    if (outputto === 'both' || outputto === 'chatlog' ) {
        ChatMessage.create({content: message,speaker:ChatMessage.getSpeaker({alias: "Tension Pool"})}, {});
    }
}

function sendmessageoveride(message){
    ChatMessage.create({content: message,speaker:ChatMessage.getSpeaker({alias: "Tension Pool"})}, {});
}

Hooks.once('init', async () => {
    console.log('tension-pool | Initializing tension-pool');
    registerSettings();
    registerLayer();
    CONFIG.Dice.terms["t"] = TensionDie;
});

Hooks.once('diceSoNiceReady', (dice3d) => {
    console.log(dice3d);
    dice3d.addSystem({ id: "tension-pool", name: "Tension Pool" }, "default");
    dice3d.addDicePreset({
        type: "dt",
        labels: ["modules/tension-pool/images/Danger.webp", "", "", "", "", "",],
        bumpMaps: ["modules/tension-pool/images/Danger_bump.webp", "", "", "", "", "",],
        system: "tension-pool",
        font: "Bradley Hand"
    }, "d6");

    dice3d.addColorset({
        name: 'TPD',
        description: 'Tension Pool Dice',
        category: 'Tension Pool',
        foreground: '#ffff00',
        background: '#000000',
        outline: 'black',
        edge: '#940202',
        texture: 'none',
        font: "Bradley Hand",
    }, "default");
});

Hooks.on("ready", () => {
    console.log('tension-pool | Ready');

    console.log("tension-pool | Listener")
    game.socket.on('module.tension-pool', (data) => messages(data));

    if(!game.settings.get("core", "noCanvas"))
        game.tension = new Tension();

    if (game.settings.get("tension-pool", "LatestVersion") !== game.modules.get("tension-pool").data.version) {
        game.settings.set("tension-pool", "DontShowAgain", false)
        game.settings.set("tension-pool", "LatestVersion", game.modules.get("tension-pool").data.version)
    };

    if (game.user.isGM) {
        if (game.settings.get("tension-pool", "DontShowAgain") === false || game.settings.get("tension-pool", "LatestVersion") !== game.modules.get("tension-pool").data.version) {
            displaypopup()
        }
    };
});

async function updatedisplay(diceinpool){

    if (game.user.isGM) {
        game.socket.emit('module.tension-pool', {
            message: diceinpool, datatype: "updatedisplay"
        });
    }

    let displaywidth = $( "#TensionDice-Poolsect" ).width()

    let display = document.getElementById("TensionDice-Pool");
    let pool = 'Tension Pool:';
    let i;
    let iz=0;


    for (i = 0; i < diceinpool; i++) {
        pool+='<img src="modules/tension-pool/images/Danger_black.webp" alt="!" width="25" height="25">'
        iz+=1;
        if ((iz===9) && !(iz===diceinpool)){
            pool+='<br>'
        }

    }

    for (i = 0; i < game.settings.get("tension-pool",'maxdiceinpool')-diceinpool; i++) {
        pool+='<img src="modules/tension-pool/images/EmptyDie.webp" alt="X" width="25" height="25">'
        iz+=1;
    }


    display.innerHTML = pool;
}

Hooks.on("renderChatLog", (app, html) => {
    let pool = '<p id="TensionDice-Pool" style="display: flex;align-items: center;justify-content: center;position: relative;flex-flow: row wrap" onclick="game.tension.adddie()">Tension Pool:</p>'

    let footer = html.find(".directory-footer");

    if (footer.length === 0) {
    footer = $(`<footer class="directory-footer" id="TensionDice-Poolsect"></footer>`);
    html.append(footer);
    }
    footer.append(pool);

    let diceinpool = game.settings.get("tension-pool",'diceinpool');
    updatedisplay(diceinpool);

})

async function removedie(){
    let diceinpool = game.settings.get("tension-pool",'diceinpool');
    let maxdiceinpool = game.settings.get("tension-pool",'maxdiceinpool');

    diceinpool -=1

    if (diceinpool<0){
        diceinpool=0
    }


    await sendmessage("Die Removed from Pool ("+diceinpool+"/"+maxdiceinpool+")")
    game.settings.set("tension-pool",'diceinpool',diceinpool);
    await updatedisplay(diceinpool);
    Hooks.call("tension-poolChange", diceinpool);
}

async function adddie(){
    let diceinpool = game.settings.get("tension-pool",'diceinpool');
    let maxdiceinpool = game.settings.get("tension-pool",'maxdiceinpool');

    diceinpool +=1
    await sendmessage("Die Added to Pool ("+diceinpool+"/"+maxdiceinpool+")")

    if ((game.settings.get("tension-pool",'dropdie')) && (diceinpool < game.settings.get("tension-pool", 'maxdiceinpool'))){

        let dicesize = game.settings.get("tension-pool",'dicesize');
        let Ro = new Roll(1+dicesize);
        await Ro.evaluate({async:true})
        game.dice3d.showForRoll(Ro, game.user, false, null);
    }

    game.settings.set("tension-pool",'diceinpool',diceinpool);


    await updatedisplay(diceinpool);
    Hooks.call("tension-poolChange", diceinpool);

    if (diceinpool>=maxdiceinpool){
        await rollpool(diceinpool,"Dice Pool Rolled and Emptied");
    }
}

async function emptypool(){
    let maxdiceinpool = game.settings.get("tension-pool",'maxdiceinpool');
    let diceinpool=0

    await sendmessage("Dice Removed from Pool ("+diceinpool+"/"+maxdiceinpool+")")
    game.settings.set("tension-pool",'diceinpool',diceinpool);

    await updatedisplay(diceinpool);
    Hooks.call("tension-poolChange", diceinpool);
}

async function rollpool(dice,message,dicesize){
    if (dice===0){
        await sendmessage("Dice pool is empty and cannot be rolled")
        return;
    }

    await updatedisplay(dice);
    if (dice!==game.settings.get("tension-pool",'diceinpool')){
        Hooks.call("tension-poolChange", dice);
    }

    await sendmessage(message);

    if (dicesize===undefined) {
        dicesize = game.settings.get("tension-pool",'dicesize');
    }

    let Ro = new Roll(dice+dicesize);
    await Ro.evaluate({async:true})

    let complication;

    if (dicesize==="df"){
        let message = "Tension Pool"
        Ro.toMessage({flavor: message},{},true)
    } else if (game.settings.get("tension-pool",'outputsum')){
        let message = "Tension Pool"
        Ro.toMessage({flavor: message},{},true)
    } else {
        await game.dice3d.showForRoll(Ro, game.user, true, null)

        let outcome = Ro.terms[0].results.map(d => d.result).sort()
        console.log(outcome);
        var i;
        complication = false
        let compcount = 0

        let rolltext = ""
        let outcometext = "&nbsp;"

        for (i = 0; i < outcome.length; i++) {
            if (outcome[i] === 1) {
                complication = true
                compcount += 1
                outcometext += "!"
                rolltext += '<li class="roll die ' + dicesize + ' min">!</li>'
            } else {
                rolltext += '<li class="roll die ' + dicesize + '">&nbsp;</li>'
            }
        }

        let mess;
        if (complication) {
            mess = game.settings.get("tension-pool", 'DangerMessage')
        } else {
            mess = game.settings.get("tension-pool", 'SafeMessage')
        }


        mess += `<div class="dice-roll">
                    <div class="dice-result">
                        <div class="dice-formula">`
        mess += dice
        mess += ` </div>
                        <div class="dice-tooltip" style="display: none;">
                            <section class="tooltip-part">
                                <div class="dice">
                                    <header class="part-header flexrow">
                                        <span class="part-formula">`
        mess += dice
        mess += ` dice in pool</span>
                                        <span class="part-total">` + compcount + `</span>
                                    </header>
                                    <ol class="dice-rolls">`
        mess += rolltext
        mess += `</ol>
                                </div>
                            </section>
                        </div>
                    <h4 class="dice-total">` + outcometext + `</h4>
                </div>
            </div>`


        sendmessageoveride(mess)
    }
    if (game.settings.get("tension-pool", 'emptythepool')) {
        game.settings.set("tension-pool", 'diceinpool', 0);
        await updatedisplay(0);
    } else if (dice >= game.settings.get("tension-pool", 'maxdiceinpool')) {
        game.settings.set("tension-pool", 'diceinpool', 0);
        await updatedisplay(0);
    }

    Hooks.call("tension-poolRolled", dice,game.settings.get("tension-pool",'diceinpool'),complication);
    console.log(complication);
    if (complication){
        if (game.settings.get("tension-pool",'MacroName').length !== 0) {
            runmacro(game.settings.get("tension-pool",'MacroName'))
        }
    }

    return complication;
}

async function runmacro(macroname){

    let targetmacro = game.macros.filter(x => x.name===macroname);

    if (targetmacro.length===0){
        ui.notifications.warn("Tension Pool | No macro with the name '"+macroname+"' found");
        return;
    } else if (targetmacro.length>1){
        ui.notifications.warn("Tension Pool | Multiple macros with the name '"+macroname+"' found; using the first one found.");
    }

    targetmacro[0].execute()
}


Hooks.on("getSceneControlButtons", (controls) => {
    if (game.user.isGM  && game.settings.get("tension-pool",'scenecontrols')) {
        controls.push({
            name: "Tension Pool Controls",
            title: "Tension Pool Controls",
            icon: "fas fa-dice",
            layer: "TensionLayer",
            visible: game.user.isGM,
            tools: [
                {
                    name: "tension-pool-removedie",
                    title: "Remove Die from Pool",
                    icon: "fas fa-minus-square",
                    onClick: () => removedie(),
                    visible: game.user.isGM,
                    button: true
                },
                {
                    name: "tension-pool-adddie",
                    title: "Add Dice to Pool",
                    icon: "fas fa-plus-square",
                    onClick: () => adddie(),
                    visible: game.user.isGM,
                    button: true
                },
                {
                    name: "tension-pool-emptypool",
                    title: "Empty the Pool (no roll)",
                    icon: "fas fa-battery-empty",
                    onClick: () => emptypool(),
                    visible: game.user.isGM,
                    button: true
                },
                {
                    name: "tension-pool-rollpool",
                    title: "Roll Dice Pool",
                    icon: "fas fa-dice-six",
                    onClick: () => rollpool(game.settings.get("tension-pool", 'diceinpool'), "Dice Pool Rolled"),
                    visible: game.user.isGM,
                    button: true
                },
                {
                    name: "tension-pool-rollfullpool",
                    title: "Roll Full Dice Pool",
                    icon: "fas fa-dice",
                    onClick: () => rollpool(game.settings.get("tension-pool", 'maxdiceinpool'), "Dice Pool Filled, Rolled and Emptied"),
                    visible: game.user.isGM,
                    button: true
                },
            ],
        });
    }
});

Hooks.on("chatCommandsReady", function(chatCommands) {

    chatCommands.registerCommand(chatCommands.createCommandFromData({
        commandKey: "/TPadddie",
        invokeOnCommand: () => adddie(),
        shouldDisplayToChat: false,
        iconClass: "fas fa-minus-square",
        description: "Tension Pool - Adds a Die to the Pool",
        gmOnly: true
    }));

    chatCommands.registerCommand(chatCommands.createCommandFromData({
        commandKey: "/TPremovedie",
        invokeOnCommand: () => removedie(),
        shouldDisplayToChat: false,
        iconClass: "fas fa-minus-square",
        description: "Tension Pool - Add Die to the Pool",
        gmOnly: true
    }));

    chatCommands.registerCommand(chatCommands.createCommandFromData({
        commandKey: "/TPremovedie",
        invokeOnCommand: () => removedie(),
        shouldDisplayToChat: false,
        iconClass: "fas fa-minus-square",
        description: "Tension Pool - Remove Die from Pool",
        gmOnly: true
    }));

    chatCommands.registerCommand(chatCommands.createCommandFromData({
        commandKey: "/TPemptypool",
        invokeOnCommand: () => emptypool(),
        shouldDisplayToChat: false,
        iconClass: "fas fa-battery-empty",
        description: "Tension Pool - Empty the Pool (no roll)",
        gmOnly: true
    }));

    chatCommands.registerCommand(chatCommands.createCommandFromData({
        commandKey: "/TProllpool",
        invokeOnCommand: () => rollpool(game.settings.get("tension-pool",'diceinpool'),"Dice Pool Rolled"),
        shouldDisplayToChat: false,
        iconClass: "fas fa-dice-six",
        description: "Tension Pool - Roll Dice Pool",
        gmOnly: true
    }));

    chatCommands.registerCommand(chatCommands.createCommandFromData({
        commandKey: "/TProllfullpool",
        invokeOnCommand: () => rollpool(game.settings.get("tension-pool",'maxdiceinpool'),"Dice Pool Filled, Rolled and Emptied"),
        shouldDisplayToChat: false,
        iconClass: "fas fa-dice",
        description: "Tension Pool - Roll Full Dice Pool",
        gmOnly: true
    }));
})

export class Tension {

    async adddie(){
        await adddie()
    }

    async removedie(){
        await removedie()
    }

    async emptypool(){
        await emptypool()
    }

    async rollcurrentpool(){
        await rollpool(game.settings.get("tension-pool", 'diceinpool'), "Dice Pool Rolled")
    }

    async rollfullpool(){
        await rollpool(game.settings.get("tension-pool", 'maxdiceinpool'), "Dice Pool Filled, Rolled and Emptied")
    }
    /**
     * Rolls a custom dice pool
     *
     * @returns {Promise<boolean>} where resolves true if a complication was rolled, false if not.
     * @param dice (int) - the number of dice to be rolled
     * @param message (str) - the message to be displayed in the notification/chat message
     * @param dicesize (str, optional) - sets the size of dice to be used ("dt" for Tension Dice's ! dice). Default: current dice size in settings
     */

    async rollcustompool(dice,message,dicesize){
        await rollpool(dice,message,dicesize)
    }
}
/*Hooks.on("renderSidebarTab", async(object, html) => {
  if (object instanceof Settings) {
    const details = html.find("#game-details");
    const TensionDetails = document.createElement("li");
    TensionDetails.classList.add("donation-link");
    TensionDetails.innerHTML = "Tension Pool <a title='Donate' href='https://ko-fi.com/sdoehren'><img src='https://storage.ko-fi.com/cdn/cup-border.png'></a> <span><a href='https://github.com/SDoehren/tension-pool/issues'>Report issue</a></span>";
    details.append(TensionDetails);
  }
})*/

