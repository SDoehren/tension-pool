

export const registerSettings = function () {
    game.settings.register("tension-pool", "diceinpool", {
        name: "dice in pool",
        scope: "world",
        config: false,
        default: 0,
        type: Number
    });

    game.settings.register("tension-pool", "maxdiceinpool", {
        name: "Max Dice in Pool",
        scope: "world",
        config: false,
        default: 6,
        type: Number
    });

    game.settings.register("tension-pool", "emptythepool", {
        name: "Empty the pool on non-full roll?",
        hint:"Should the pool be emptied if it is rolled before Max Dice in Pool is reached.",
        scope: "world",
        config: false,
        default: false,
        type: Boolean
    });

    game.settings.register("tension-pool", "dropdie", {
        name: "Drop a die on add?",
        hint:"Roll a die to demostrate it being added to the pool. (Result is ignored)",
        scope: "world",
        config: false,
        default: true,
        type: Boolean
    });


    game.settings.register("tension-pool", "dicesize", {
        name: "Dice Size:",
        hint:"d6 (!) will lock dice so nice to the uses of the tension pool dice set. Fate Die will always output the sum.",
        scope: "world",
        config: false,
        default: "dt",
        type: String,
        choices: {
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
    });



    game.settings.register("tension-pool", "outputto", {
        name: "Where to announce updates:",
        hint:"Pool Rolls outcomes are always output to chat.",
        scope: "world",
        config: false,
        default: "notifications",
        type: String,
        choices: {
            both: "both",
            notifications: "notifications",
            chatlog: "chatlog",
        },
    });



    game.settings.register("tension-pool", "SafeMessage", {
        name: "Message when no complication occurs:",
        scope: "world",
        config: false,
        default: "You are safe for now.",
        type: String,
    });

    game.settings.register("tension-pool", "DangerMessage", {
        name: "Message when a complication does occurs:",
        scope: "world",
        config: false,
        default: "<strong style='color:red'>Complication!</strong>",
        type: String,
    });

    game.settings.register("tension-pool", "PauseDuringRoll", {
        name: "Pause During Pool Roll",
        hint:"Pause the game while the pool is being rolled.",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    game.settings.register("tension-pool", "PauseOnComplication", {
        name: "Pause On Complication",
        hint:"Pause the game if a Complication is rolled.",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    game.settings.register("tension-pool", "MacroOnComplication", {
        name: "Run Macro when Complication occurs:",
        hint:"Enter name of Macro that should be run, leave blank to not run a macro. Macro name should be unique.",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    game.settings.register("tension-pool", "MacroName", {
        name: "Run Macro when Complication occurs:",
        hint:"Enter name of Macro that should be run, leave blank to not run a macro. Macro name should be unique.",
        scope: "world",
        config: false,
        default: "",
        type: String,
    });

    game.settings.register("tension-pool", "outputsum", {
        name: "Output sum?",
        hint:"Replace calulation of the complication with a simple sum of the dice values.",
        scope: "world",
        config: false,
        default: false,
        type: Boolean
    });

    game.settings.register("tension-pool", "secsautodiceadd", {
        name: "Number of seconds between auto adding dice",
        hint:"For Simple Calendar Integration",
        scope: "world",
        config: false,
        default: 600,
        type: Number
    });

    game.settings.register("tension-pool", "lastautodiceadd", {
        name: "last auto dice add",
        scope: "world",
        config: false,
        default: 0,
        type: Number
    });

    game.settings.register("tension-pool", "autodiceaddactive", {
        name: "auto dice add is active",
        scope: "world",
        config: false,
        default: false,
        type: Boolean
    });

    game.settings.register("tension-pool", "LatestVersion", {
        name: "Latest Version",
        scope: "world",
        config: false,
        default: "",
        type: String
    });

    game.settings.register("tension-pool", "DontShowAgain", {
        name: "Dont Show Again",
        scope: "world",
        config: false,
        default: false,
        type: Boolean
    });

    game.settings.register("tension-pool", "scenecontrols", {
        name: "Enable Scene Controls?",
        hint:"If off, other Scene Controls settings will be overridden",
        scope: "world",
        config: false,
        default: true,
        type: Boolean
    });

    game.settings.register("tension-pool", "scenecontrolRemove", {
        name: "Scene Controls - Remove Die From Pool",
        scope: "world", config: false, default: true, type: Boolean
    });

    game.settings.register("tension-pool", "scenecontrolADD", {
        name: "Scene Controls - Add Die to Pool",
        scope: "world", config: false, default: true, type: Boolean
    });

    game.settings.register("tension-pool", "scenecontrolADDROLL", {
        name: "Scene Controls - Add Die and Roll Pool",
        scope: "world", config: false, default: true, type: Boolean
    });

    game.settings.register("tension-pool", "scenecontrolEMPTY", {
        name: "Scene Controls - Empty the Pool",
        scope: "world", config: false, default: true, type: Boolean
    });

    game.settings.register("tension-pool", "scenecontrolROLL", {
        name: "Scene Controls - Roll Dice Pool",
        scope: "world", config: false, default: true, type: Boolean
    });

    game.settings.register("tension-pool", "scenecontrolROLLFULL", {
        name: "Scene Controls - Roll Full Dice Pool",
        scope: "world", config: false, default: true, type: Boolean
    });

    game.settings.register("tension-pool", "scenecontrolAUTO", {
        name: "Scene Controls - Tension Timer",
        scope: "world", config: false, default: true, type: Boolean
    });

    game.settings.register("tension-pool", "WhisperResult", {
        name: "Whisper roll result to DM",
        scope: "world", config: false, default: true, type: Boolean
    });

    game.settings.register("tension-pool", "Debug", {
        name: "Turn on Debug",
        scope: "world", config: false, default: false, type: Boolean
    });

};
