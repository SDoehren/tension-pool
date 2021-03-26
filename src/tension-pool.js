import {registerSettings} from './settings.js';
import {TensionDie} from './die.js';

'use strict';

function messages(data){
    console.log(data);
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

Hooks.once('init', async () => {
    console.log('tension-pool | Initializing always-centred');
    registerSettings();
    CONFIG.Dice.terms["t"] = TensionDie;
});

Hooks.once('diceSoNiceReady', (dice3d) => {
    console.log(dice3d);
    dice3d.addSystem({id: "TensionDie", name: "Tension Dice"}, "default");

    console.log(dice3d.addDicePreset);
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

    console.log(dice3d);
});




Hooks.on("ready", () => {
    console.log('tension-pool | Ready');

    console.log("tension-pool | Listener")
    game.socket.on('module.tension-pool', (data) => messages(data));



});

async function adddie(){
    let diceinpool = game.settings.get("tension-pool",'diceinpool');
    let maxdiceinpool = game.settings.get("tension-pool",'maxdiceinpool');

    diceinpool +=1
    await sendmessage("Die Added to Pool ("+diceinpool+"/"+maxdiceinpool+")")
    game.settings.set("tension-pool",'diceinpool',diceinpool);
    if (diceinpool>=maxdiceinpool){
        await rollpool(diceinpool,"Dice Pool Rolled and Emptied");
    }
}

async function rollpool(dice,message){
    await sendmessage(message)
    let dicesize = game.settings.get("tension-pool",'dicesize');

    let Ro = new Roll(dice+dicesize);


    Ro.evaluate()
    let outcome = Ro.terms[0].results.map(d => d.result).sort()
    if (game.modules.get("dice-so-nice") !== undefined){
        await game.dice3d.showForRoll(Ro,game.user,true,null)
    }


    var i;
    let complication = false
    for (i = 0; i < outcome.length; i++) {
      if (outcome[i] ===1){
          complication=true

      }
    }

    let mess;
    if (complication){
        mess = "<strong style='color:red'>!</strong>";
    } else {
        mess = "You are safe for now."
    }

    sendmessage(mess)

    game.settings.set("tension-pool",'diceinpool',0);
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
            onClick: () => rollpool(game.settings.get("tension-pool",'diceinpool'),"Dice Pool Rolled and Emptied"),
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