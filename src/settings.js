

export const registerSettings = function () {

    game.settings.register("tension-pool", "combatfocus", {
        name: "Combat Focus",
        hint:"Focus camera on current combatant on turn change.",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("tension-pool", "paddingsq", {
        name: "Padding (squares)",
        hint:"Padding added to view area in all directions. Highly Recommended to be set to >2 and will have no effect <1.",
        scope: "client",
        config: true,
        default: 12,
        type: Number
    });

    game.settings.register("tension-pool", "Button-GMControl", {
        name: "Button - GMControl",
        hint: "Toggles button visiblity",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => {
            location.reload();
        }
    });
};
