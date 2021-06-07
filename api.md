## Hook calls

#### On Pool Roll

Hooks.call("tension-poolRolled", dicerolled, diceleftinpool,complicationoccured);

- dicerolled (int) - The number of dice rolled
- diceleftinpool (int) - The number of dice left in the pool after the roll is complete
- complicationoccured (bool) - whether a complication should occur

#### On Change in Dice in Pool

Hooks.call("tension-poolChange", diceinpool);

- diceinpool (int) - The dice in the pool after dice added or removed

## API

The API is called via game.tension; for example

    game.tension.adddie()


#### Adding and removing die

`game.tension.adddie()` (async) takes no args and adds 1 die to the pool

`game.tension.removedie()` (async) takes no args and removes 1 die from the pool

#### Rolling the pool

`game.tension.rollcurrentpool()` (async) takes no args and rolls the pool with the current number of dice

`game.tension.rollfullpool()` (async) takes no args and rolls the pool after filling it with dice

`game.tension.rollcustompool(dice,message,dicesize)` (async) takes 3 args and rolls the pool meeting the args

- dice (int) - the number of dice to be rolled
- message (str) - the message to be displayed in the notification/chat message
- dicesize (str, optional) - sets the size of dice to be used ("dt6" for Tension Dice's ! dice).

For example `game.tension.rollcustompool(10,"Custom Pool Rolling","d20")` will roll 10d20 and will display the message "Tension Pool | Custom Pool Rolling"
