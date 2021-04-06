

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
        config: true,
        default: 6,
        type: Number
    });

    game.settings.register("tension-pool", "emptythepool", {
        name: "Empty the pool on non-full roll?",
        hint:"Should the pool be emptied if it is rolled before Max Dice in Pool is reached.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("tension-pool", "dropdie", {
        name: "Drop a die on add?",
        hint:"Roll a die to demostrate it being added to the pool. (Result is ignored)",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });


    game.settings.register("tension-pool", "dicesize", {
        name: "Dice Size:",
        scope: "world",
        config: true,
        default: "dt6",
        type: String,
        choices: {
            d4: "d4",
            d6: "d6 (normal)",
            dt6: "d6 (special)",
            d8: "d8",
            d10: "d10",
            d12: "d12",
            d20: "d20",
        },
    });



    game.settings.register("tension-pool", "outputto", {
        name: "Where to announce updates:",
        hint:"Pool Rolls outcomes are always output to chat.",
        scope: "world",
        config: true,
        default: "both",
        type: String,
        choices: {
            both: "both",
            notfications: "notfications",
            chatlog: "chatlog",
        },
    });



    game.settings.register("tension-pool", "SafeMessage", {
        name: "Message when no complication occurs:",
        scope: "world",
        config: true,
        default: "You are safe for now.",
        type: String,
    });

    game.settings.register("tension-pool", "DangerMessage", {
        name: "Message when a complication does occurs:",
        scope: "world",
        config: true,
        default: "<strong style='color:red'>Complication!</strong>",
        type: String,
    });

    game.settings.register("tension-pool", "outputsum", {
        name: "Output sum?",
        hint:"Replace calulation of the complication with a simple sum of the dice values.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });


};
