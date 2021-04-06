import {registerSettings} from './settings.js';
import {TensionDie} from './die.js';
import {TensionLayer} from './tensionLayer.js';

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

function messages(data){
    ui.notifications.info("Tension Pool | "+data.message);
}

function sendmessage(message){

    let outputto = game.settings.get("tension-pool",'outputto');

    if (outputto === 'both' || outputto === 'notfications' ) {
        ui.notifications.info("Tension Pool | " + message);
        game.socket.emit('module.tension-pool', {
            message: message
        });
    }

    if (outputto === 'both' || outputto === 'chatlog' ) {
        ChatMessage.create({content: message}, {});
    }
}

function sendmessageoveride(message){

    ChatMessage.create({content: message}, {});

}

Hooks.once('init', async () => {
    console.log('tension-pool | Initializing always-centred');
    registerSettings();
    registerLayer();
    CONFIG.Dice.terms["t"] = TensionDie;
});

Hooks.once('diceSoNiceReady', (dice3d) => {
    dice3d.addSystem({id: "TensionDie", name: "Tension Dice"}, "force");

    dice3d.addDicePreset({
      type:"dt6",
      labels:["modules/tension-pool/images/Danger.webp","","","","","",],
        bumpMaps:["modules/tension-pool/images/Danger_bump.webp","","","","","",],
      system: "TensionDie",
        colorset:"TPD",
    });


    dice3d.addColorset({
		name:'TPD',
		description:'Tension Pool Dice',
		category:'Tension Pool',
		foreground:'#ffff00',
		background:'#000000',
		outline:'black',
		edge:'#940202',
		texture:'none',
        font:"Bradley Hand",
	},"no");

});

Hooks.on("ready", () => {
    console.log('tension-pool | Ready');

    console.log("tension-pool | Listener")
    game.socket.on('module.tension-pool', (data) => messages(data));



});

async function updatedisplay(diceinpool){
    console.log(diceinpool);
    let display = document.getElementById("TensionDice-Pool");
    let pool = 'Tension Pool:';
    let i;
    for (i = 0; i < diceinpool; i++) {
      pool+='<img src="modules/tension-pool/images/Danger_Black.webp" alt="!Y" width="25" height="25">'
    }

    for (i = 0; i < game.settings.get("tension-pool",'maxdiceinpool')-diceinpool; i++) {
      pool+='<img src="modules/tension-pool/images/EmptyDie.webp" alt="!X" width="25" height="25">'
    }


    display.innerHTML = pool;
}

Hooks.on("renderChatLog", (app, html) => {
  let pool = '<p id="TensionDice-Pool">Tension Pool</p>'

  let footer = html.find(".directory-footer");

  if (footer.length === 0) {
    footer = $(`<footer class="directory-footer"></footer>`);
    html.append(footer);
  }
  footer.append(pool);

  let diceinpool = game.settings.get("tension-pool",'diceinpool');
  updatedisplay(diceinpool);

})

async function adddie(){
    let diceinpool = game.settings.get("tension-pool",'diceinpool');
    let maxdiceinpool = game.settings.get("tension-pool",'maxdiceinpool');

    diceinpool +=1
    await sendmessage("Die Added to Pool ("+diceinpool+"/"+maxdiceinpool+")")

    if ((game.settings.get("tension-pool",'dropdie')) && (diceinpool < game.settings.get("tension-pool", 'maxdiceinpool'))){

        let dicesize = game.settings.get("tension-pool",'dicesize');
        let Ro = new Roll(1+dicesize);
        Ro.evaluate()
        game.dice3d.showForRoll(Ro, game.user, true, null);
    }

    game.settings.set("tension-pool",'diceinpool',diceinpool);

    await updatedisplay(diceinpool);

    if (diceinpool>=maxdiceinpool){
        await rollpool(diceinpool,"Dice Pool Rolled and Emptied");
    }
}

async function rollpool(dice,message){
    if (dice===0){
        await sendmessage("Dice pool is empty and cannot be rolled")
        return;
    }

    await updatedisplay(dice);
    await sendmessage(message);

    let dicesize = game.settings.get("tension-pool",'dicesize');

    let Ro = new Roll(dice+dicesize);
    Ro.evaluate()

    if (game.settings.get("tension-pool",'outputsum')){
        let message = "Tension Pool"
        Ro.toMessage({flavor: message},{},true)
    } else {
        await game.dice3d.showForRoll(Ro, game.user, true, null)

        let outcome = Ro.terms[0].results.map(d => d.result).sort()

        var i;
        let complication = false
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
        mess += ` dice in pool</div>
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

}





Hooks.on("getSceneControlButtons", (controls) => {
    const bar = controls.find((c) => c.name === "token");

    if (game.user.isGM) {
        bar.tools.push({
            name: "tension-pool-adddie",
            title: "Add Dice to Pool",
            icon: "fas fa-plus-square",
            onClick: () => adddie(),
            visible: game.user.isGM,
            button:true
        });

        bar.tools.push({
            name: "tension-pool-rollpool",
            title: "Roll Dice Pool",
            icon: "fas fa-dice-six",
            onClick: () => rollpool(game.settings.get("tension-pool",'diceinpool'),"Dice Pool Rolled"),
            visible: game.user.isGM,
            button:true
        });

        bar.tools.push({
            name: "tension-pool-rollfullpool",
            title: "Roll Dice Full Pool",
            icon: "fas fa-dice",
            onClick: () => rollpool(game.settings.get("tension-pool",'maxdiceinpool'),"Dice Pool Filled, Rolled and Emptied"),
            visible: game.user.isGM,
            button:true
        });
    }
});