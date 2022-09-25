import {registerSettings} from './settings.js';
import { TensionConfig } from './TensionConfig.js';
import {TensionDie} from './die.js';
import {displaypopup} from './popup.js';

'use strict';


function DEBUG(message){
    if (game.settings.get("tension-pool",'Debug')) {
        console.log(message);
    }
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

    if (outputto === 'both' || outputto === 'notfications' || outputto === 'notifications' ) {
        ui.notifications.info("Tension Pool | " + message);
        game.socket.emit('module.tension-pool', {
            message: message,datatype:"message"
        });
    }

    if (outputto === 'both' || outputto === 'chatlog' ) {
        ChatMessage.create({content: message,speaker:ChatMessage.getSpeaker({alias: "Tension Pool"})}, {});
    }
}

function sendresult(message){
    if (game.settings.get("tension-pool",'WhisperResult')) {
        ChatMessage.create({
            whisper: ChatMessage.getWhisperRecipients("GM"),
            content: message,
            speaker: ChatMessage.getSpeaker({alias: "Tension Pool"})
        }, {});
    } else {
        ChatMessage.create({content: message, speaker: ChatMessage.getSpeaker({alias: "Tension Pool"})}, {});
    }
}

Hooks.once('init', async () => {
    console.log('tension-pool | Initializing tension-pool');


    game.settings.registerMenu("tension-pool", "tension-pool", {
        name: "Tension Pool settings",
        label: "Tension Pool settings",
        hint: "Settings for Tension Pool",
        classes: ['sheet'],
        icon: "fas fa-dice-d20",
        type: TensionConfig,
        restricted: true
    });


    registerSettings();
    CONFIG.Dice.terms["t"] = TensionDie;
});

Hooks.once('diceSoNiceReady', (dice3d) => {
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

    console.log("tension-pool | Listener")
    game.socket.on('module.tension-pool', (data) => messages(data));

    if(!game.settings.get("core", "noCanvas")) {
        game.tension = new Tension();
    }


    if (game.settings.get("tension-pool", "LatestVersion")!==game.modules.get("tension-pool").data.version && game.user.isGM){
        let message = "Hi,<br>Thanks for installing/updating Tension Pool" +
            "<br>Scene controls are no longer supported by Tension Pool and have instead been replaced by macros performing the same behaviours.<br>" +
            "<br>This message will not be shown again until the next update.<br><br>" +
            "All the best,<br>SDoehren<br>Discord Server: https://discord.gg/QNQZwGGxuN"
        ChatMessage.create({whisper:ChatMessage.getWhisperRecipients("GM"),content: message,speaker:ChatMessage.getSpeaker({alias: "Tension Pool"})}, {});
        game.settings.set("tension-pool", "LatestVersion",game.modules.get("tension-pool").data.version)
    }

    if (game.settings.get("tension-pool",'VisualDiceEffects')) {
        if (game.modules.get("dice-so-nice")===undefined) {
            let message = "Currently you do not have Dice So Nice installed but have the Visual Dice Effects Enabled.  Please install and enable Dice So Nice to use the visual effects."
            ChatMessage.create({
                whisper: ChatMessage.getWhisperRecipients("GM"),
                content: message,
                speaker: ChatMessage.getSpeaker({alias: "Tension Pool"})
            }, {});
        } else if (!game.modules.get("dice-so-nice").active){
            let message = "Currently you do not have Dice So Nice enabled but have the Visual Dice Effects Enabled.  Please enable Dice So Nice to use the visual effects."
            ChatMessage.create({
                whisper: ChatMessage.getWhisperRecipients("GM"),
                content: message,
                speaker: ChatMessage.getSpeaker({alias: "Tension Pool"})
            }, {});
        }
    }

    console.log('tension-pool | Ready');


});

async function updatedisplay(diceinpool){

    if (game.user.isGM) {
        game.socket.emit('module.tension-pool', {
            message: diceinpool, datatype: "updatedisplay"
        });
    }

    let chatpool = document.getElementById("TensionDice-Pool-chat");
    let popoutchatpool = document.getElementById("TensionDice-Pool-chatpopout");
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

    if ((chatpool!==null)){
        chatpool.innerHTML = pool;
    }

    if ((popoutchatpool!==null)){
        popoutchatpool.innerHTML = pool;
    }
}

Hooks.on("renderChatLog", (app, html) => {
    let chatfooterhtml = `<footer class="directory-footer" id="TensionDice-Poolsect-chat" style="flex:none">
<p id="TensionDice-Pool-chat" style="display: flex;align-items: center;justify-content: center;position: relative;flex-flow: row wrap" onclick="game.tension.adddie()">Tension Pool:</p>
</footer>`;
    let chatpopoutfooterhtml = `<footer class="directory-footer" id="TensionDice-Poolsect-chatpopout" style="flex:none">
<p id="TensionDice-Pool-chatpopout" style="display: flex;align-items: center;justify-content: center;position: relative;flex-flow: row wrap" onclick="game.tension.adddie()">Tension Pool:</p>
</footer>`;


    if (html[0].className.includes('popout')){
        html.append(chatpopoutfooterhtml)
    } else {
        html.append(chatfooterhtml)
    }

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

async function setpoolsize(diceinpool) {
    if (!game.user.isGM) {
        return;
    }

    game.settings.set("tension-pool",'diceinpool',diceinpool);
    await updatedisplay(diceinpool);
    Hooks.call("tension-poolChange", diceinpool);

}

async function adddie(message=undefined, count=1){
    if (!game.user.isGM) {
        return;
    }

    let diceinpool = game.settings.get("tension-pool",'diceinpool');
    let maxdiceinpool = game.settings.get("tension-pool",'maxdiceinpool');

    diceinpool +=count
    if (diceinpool>maxdiceinpool){
        return;
    }

    if (count===1) {
        if (message === undefined) {
            await sendmessage("Die Added to Pool (" + diceinpool + "/" + maxdiceinpool + ")")
        } else {
            await sendmessage("Die Added to Pool (" + diceinpool + "/" + maxdiceinpool + ") " + message)
        }
    } else {
        if (message === undefined) {
            await sendmessage(count + " Dice Added to Pool (" + diceinpool + "/" + maxdiceinpool + ")")
        } else {
            await sendmessage(count + " Dice Added to Pool (" + diceinpool + "/" + maxdiceinpool + ") " + message)
        }
    }


    if ((game.settings.get("tension-pool",'VisualDiceEffects')) &&(game.settings.get("tension-pool",'dropdie')) && (diceinpool < game.settings.get("tension-pool", 'maxdiceinpool'))){

        let dicesize = game.settings.get("tension-pool",'dicesize');
        let Ro = new Roll(count+dicesize);
        await Ro.evaluate({async:true})
        game.dice3d.showForRoll(Ro, game.user, true, null);
    }

    game.settings.set("tension-pool",'diceinpool',diceinpool);
    await updatedisplay(diceinpool);
    Hooks.call("tension-poolChange", diceinpool);

    if (diceinpool>=maxdiceinpool){
        await rollpool(diceinpool,"Dice Pool Rolled and Emptied");
    }
    return diceinpool;
}

async function addandrollpool() {
    let DICE = game.settings.get("tension-pool", 'diceinpool');
    let MAXDICE = game.settings.get("tension-pool", 'maxdiceinpool');

    if (DICE < MAXDICE - 1) {
        game.tension.rollcustompool(DICE + 1, "Die added and Pool Rolled");
        game.settings.set("tension-pool", "diceinpool", DICE + 1);
    } else {
        game.tension.adddie()
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

    let gamepausedalready;
    if (game.settings.get("tension-pool",'PauseDuringRoll') && !(game.paused)){
        game.togglePause();
        gamepausedalready = false;
    } else {
        gamepausedalready = true;
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
        let users;

        if (game.settings.get("tension-pool",'WhisperResult')) {
            users = [game.user];
        } else {
            users = null;
        }

        if (game.settings.get("tension-pool",'VisualDiceEffects')) {
            await game.dice3d.showForRoll(Ro, game.user, true, users)
        }

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


        sendresult(mess)
    }

    Hooks.call("tension-poolRolled", dice,game.settings.get("tension-pool",'diceinpool'),complication);

    if (game.settings.get("tension-pool", 'emptythepool')) {
        game.settings.set("tension-pool", 'diceinpool', 0);
        Hooks.call("tension-poolChange", 0);
        await updatedisplay(0);
    } else if (dice >= game.settings.get("tension-pool", 'maxdiceinpool')) {
        game.settings.set("tension-pool", 'diceinpool', 0);
        Hooks.call("tension-poolChange", 0);
        await updatedisplay(0);
    }

    let pausedduetocomplication = false;
    if (complication){
        if (game.settings.get("tension-pool", "PauseOnComplication")){
            if (!game.paused) {
                game.togglePause();
            }
            pausedduetocomplication = true;
        }

        if (game.settings.get("tension-pool",'MacroOnComplication')) {
            runmacro(game.settings.get("tension-pool",'MacroName'))
        }

    }

    console.log(game.settings.get("tension-pool",'PauseDuringRoll'),game.paused,!gamepausedalready,pausedduetocomplication)
    if (game.settings.get("tension-pool",'PauseDuringRoll') && (game.paused) && !(gamepausedalready) && !(pausedduetocomplication)){
        game.togglePause();
    }

    return complication;
}

async function rollpoolandretain(dice,message,dicesize){
    if (dice===0){
        await sendmessage("Dice pool is empty and cannot be rolled")
        return;
    }

    let gamepausedalready;
    if (game.settings.get("tension-pool",'PauseDuringRoll') && !(game.paused)){
        game.togglePause();
        gamepausedalready = false;
    } else {
        gamepausedalready = true;
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
        let users;

        if (game.settings.get("tension-pool",'WhisperResult')) {
            users = [game.user];
        } else {
            users = null;
        }

        if (game.settings.get("tension-pool",'VisualDiceEffects')) {
            await game.dice3d.showForRoll(Ro, game.user, true, users)
        }

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


        sendresult(mess)
    }

    Hooks.call("tension-poolRolled", dice,game.settings.get("tension-pool",'diceinpool'),complication);

    Hooks.call("tension-poolChange", game.settings.get("tension-pool", 'diceinpool'));
    await updatedisplay(game.settings.get("tension-pool", 'diceinpool'));

    let pausedduetocomplication = false;
    if (complication){
        if (game.settings.get("tension-pool", "PauseOnComplication")){
            if (!game.paused) {
                game.togglePause();
            }
            pausedduetocomplication = true;
        }

        if (game.settings.get("tension-pool",'MacroOnComplication')) {
            runmacro(game.settings.get("tension-pool",'MacroName'))
        }

    }

    console.log(game.settings.get("tension-pool",'PauseDuringRoll'),game.paused,!gamepausedalready,pausedduetocomplication)
    if (game.settings.get("tension-pool",'PauseDuringRoll') && (game.paused) && !(gamepausedalready) && !(pausedduetocomplication)){
        game.togglePause();
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


async function TensionTimerConfig() {

    if (game.modules.get("foundryvtt-simple-calendar") === undefined) {
        new Dialog({
            title: "Tension Timer",
            content: "Simple Calendar by vigoren is required to use Tension Timers",
            buttons: {
                start: {
                    label: "Get Simple Calendar",
                    callback: (event) => {
                        window.open("https://github.com/vigoren/foundryvtt-simple-calendar#installing-the-module");
                    },
                },
                close: {
                    label: "close",
                    callback: (event) => {
                        return;
                    },
                },
            }
        }).render(true)
        return;
    } else if (!game.modules.get("foundryvtt-simple-calendar").active) {
        new Dialog({
            title: "Tension Timer",
            content: "Simple Calendar by vigoren is required to use Tension Timers.\nYou have this module installed but it is not active.",
            buttons: {
                close: {
                    label: "Close",
                    callback: (event) => {
                        return;
                    },
                },
            }
        }).render(true)
        return;
    } else {
        let defaultseconds = game.settings.get('tension-pool', 'secsautodiceadd')
        let autodiceaddactive = game.settings.get('tension-pool', 'autodiceaddactive')
        let PauseOnComplicationval = game.settings.get('tension-pool', 'PauseOnComplication')
        if (PauseOnComplicationval){
            PauseOnComplicationval = "checked";
        } else {
            PauseOnComplicationval = "";
        }

        let startcommand;
        let cancelcommand;
        if (autodiceaddactive) {
            startcommand = "Replace Timer"
            cancelcommand = "Stop Current Timer"
        } else {
            startcommand = "Start Timer"
            cancelcommand = "Timer Not Active"
        }

        new Dialog({
            title: "Tension Timer",
            content: `<form id="TensionTimerOptions">
        <div class="form-group">
          <label>In Game Seconds Between Die Drop</label>
          <input type="number" name="TensionTimerSeconds" id="TensionTimerSeconds" min="1" value="` + defaultseconds + `">
        </div>
        <div class="form-group">
          <label>Pause On Complication</label>
          <input type="checkbox" name="PauseOnComplication" id="PauseOnComplication" `+PauseOnComplicationval+`>
        </div>
        </form>`,
            buttons: {
                start: {
                    label: startcommand,
                    callback: (event) => {
                        console.log(event);
                        var parser = new DOMParser();
                        var htmlDoc = parser.parseFromString(event[0].innerHTML, 'text/html');

                        const secondsbetween = $(event)
                            .find('input[name="TensionTimerSeconds"]')
                            .val();
                        const PauseOnComplicationChecked = $(event)
                            .find('input[name="PauseOnComplication"]')
                            .prop("checked");

                        game.settings.set("tension-pool", "secsautodiceadd", secondsbetween)
                        game.settings.set("tension-pool", "lastautodiceadd", SimpleCalendar.api.timestamp())
                        game.settings.set("tension-pool", "autodiceaddactive", true)
                        game.settings.set("tension-pool", "PauseOnComplication", PauseOnComplicationChecked)


                        DEBUG(secondsbetween);
                        DEBUG(PauseOnComplicationChecked);

                        let nextdropstamp = parseInt(SimpleCalendar.api.timestamp())+parseInt(secondsbetween);
                        let datedisplaydata = SimpleCalendar.api.timestampToDate(nextdropstamp).display;

                        let realworldgap = Math.ceil(secondsbetween/game.settings.get('foundryvtt-simple-calendar', "time-configuration").gameTimeRatio)

                        let clockstatus;
                        if (SimpleCalendar.api.clockStatus().started) {
                            clockstatus = "running"
                        } else {
                            clockstatus = "not running"
                        }

                        let message = "You have set a Tension Timer with an interval of "+secondsbetween+" in game seconds," +
                            " the die drop will be at "+datedisplaydata.time+" on the "+ datedisplaydata.day+datedisplaydata.daySuffix+" of" +
                            " "+ datedisplaydata.monthName+" "+datedisplaydata.yearPrefix+ datedisplaydata.year+ datedisplaydata.yearPostfix+". " +
                            "This will take "+realworldgap + " seconds in the real world (the clock is currently "+clockstatus+")."

                        ChatMessage.create({whisper:ChatMessage.getWhisperRecipients("GM"),content: message,speaker:ChatMessage.getSpeaker({alias: "Tension Timer"})}, {});
                    },
                },
                stop: {
                    label: cancelcommand,
                    callback: (event) => {
                        game.settings.set("tension-pool", "autodiceaddactive", false)
                        ui.notifications.info("Tension Pool | You have stopped the Tension Timer");
                    },
                },
                close: {
                    label: "Cancel",
                    callback: (event) => {
                        return true;
                    },
                },
            },
            default: "close",
        }).render(true);
    }
}

async function processtimeupdate(){
    let gameTimeRatio = SimpleCalendar.api.getTimeConfiguration().gameTimeRatio

    if (game.settings.get("tension-pool", "autodiceaddactive")  && game.user.isGM) {
        let nextdrop = game.settings.get("tension-pool", "lastautodiceadd") + game.settings.get("tension-pool", "secsautodiceadd")
        let timetonextdrop = nextdrop - SimpleCalendar.api.timestamp()
        let realtimetonextdrop = Math.ceil(timetonextdrop / gameTimeRatio)
            if (timetonextdrop <= 0) {
                game.settings.set("tension-pool", "lastautodiceadd", SimpleCalendar.api.timestamp())
                let rollsdue = Math.ceil(-timetonextdrop/game.settings.get("tension-pool", "secsautodiceadd"))+1;
                let spacesinpool = game.settings.get("tension-pool", "maxdiceinpool")-game.settings.get("tension-pool", "diceinpool");

                if (rollsdue>spacesinpool){
                    rollsdue=spacesinpool
                }

                if (rollsdue>0) {
                    await adddie("- Auto Added", rollsdue)
                }


                let realworldgap = Math.ceil(game.settings.get("tension-pool", "secsautodiceadd") / gameTimeRatio)

                let message = "The next die drop will take " + realworldgap + " seconds in the real world."
                ChatMessage.create({
                    whisper: ChatMessage.getWhisperRecipients("GM"),
                    content: message,
                    speaker: ChatMessage.getSpeaker({alias: "Tension Timer"})
                }, {});

            } else if (realtimetonextdrop === 10) {
                ChatMessage.create({
                    whisper: ChatMessage.getWhisperRecipients("GM"),
                    content: "Next die drop in " + realtimetonextdrop + " real world seconds.",
                    speaker: ChatMessage.getSpeaker({alias: "Tension Timer"})
                }, {});
            }
    }
}

Hooks.on('updateWorldTime', async (timestamp,stepsize) => {
    if (stepsize > 0) {
        await processtimeupdate()
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

    async rollfullpoolandreadd(){
        await rollpoolandretain(game.settings.get("tension-pool", 'maxdiceinpool'),"Dice Pool Filled and Rolled")
    }

    async TensionTimerConfig(){
        TensionTimerConfig()
    }

    async adddie(message=undefined){
        await adddie(message=message)
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

