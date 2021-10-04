




export class TensionConfig extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize("Tension Pool"),
            id: "tension-pool",
            template: "modules/tension-pool/templates/tension-config.html",
            width: 650,
            height: "auto",
            closeOnSubmit: true,
        })
    }

    async getData(options) {
        let macronames= game.macros.map(x=>x.name);
        macronames= macronames.map(x => ({key: x, label: x}));

        let data = {
            maxdiceinpool: game.settings.get('tension-pool', 'maxdiceinpool'),
            emptythepool: game.settings.get('tension-pool', 'emptythepool'),
            dropdie: game.settings.get('tension-pool', 'dropdie'),
            dicesize: game.settings.get('tension-pool', 'dicesize'),
            dicesizechoices: {
                d4: "d4",
                d6: "d6 (normal)",
                dt: "d6 (!)",
                d8: "d8",
                d10: "d10",
                d12: "d12",
                d20: "d20",
                d100: "d100",
                df: "Fate",
            },

            outputto: game.settings.get('tension-pool', 'outputto'),
            outputtochoices: {
                both: "both",
                notifications: "notifications",
                chatlog: "chatlog",
            },

            SafeMessage: game.settings.get('tension-pool', 'SafeMessage'),
            DangerMessage: game.settings.get('tension-pool', 'DangerMessage'),
            PauseDuringRoll: game.settings.get('tension-pool', 'PauseDuringRoll'),
            PauseOnComplication: game.settings.get('tension-pool', 'PauseOnComplication'),
            MacroOnComplication: game.settings.get('tension-pool', 'MacroOnComplication'),
            MacroName: game.settings.get('tension-pool', 'MacroName'),
            MacroOptions:macronames,
            outputsum: game.settings.get('tension-pool', 'outputsum'),
            scenecontrols: game.settings.get('tension-pool', 'scenecontrols'),
            scenecontrolRemove: game.settings.get('tension-pool', 'scenecontrolRemove'),
            scenecontrolADD: game.settings.get('tension-pool', 'scenecontrolADD'),
            scenecontrolADDROLL: game.settings.get('tension-pool', 'scenecontrolADDROLL'),
            scenecontrolEMPTY: game.settings.get('tension-pool', 'scenecontrolEMPTY'),
            scenecontrolROLL: game.settings.get('tension-pool', 'scenecontrolROLL'),
            scenecontrolROLLFULL: game.settings.get('tension-pool', 'scenecontrolROLLFULL'),
            scenecontrolAUTO: game.settings.get('tension-pool', 'scenecontrolAUTO'),
            WhisperResult: game.settings.get('tension-pool', 'WhisperResult'),
            Debug: game.settings.get('tension-pool', 'Debug'),
        }

        return data
    }
    /**
     * Updates the settings to match the forms
     * @param _event
     * @param formData The form data to be saved
     */
    async _updateObject(_event, formData) {
        let reset = false
        for (let [k, v] of Object.entries(formData)) {

            let oldval = await game.settings.get('tension-pool', k)
            await game.settings.set('tension-pool', k, v);
            if (v!==oldval){
                if (k.search("scenecontrol")>=0){
                    reset=true
                }
            }
        }
        if (reset===true){
            location.reload();
        }
    }
}
