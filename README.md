# Tension Pool

[![GitHub release](https://img.shields.io/github/release/sdoehren/tension-pool.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![GitHub issues](https://img.shields.io/github/issues/sdoehren/tension-pool.svg)](https://GitHub.com/sdoehren/tension-pool/issues/)


[![Forge Install %](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Ftension-pool)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![Github all releases](https://img.shields.io/github/downloads/sdoehren/tension-pool/total.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![Github Releases (by Release)](https://img.shields.io/github/downloads/sdoehren/tension-pool/latest/total.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)

[![ko-fi](https://img.shields.io/badge/ko--fi-Support%20Me-red)](https://ko-fi.com/sdoehren)
[![Patreon](https://img.shields.io/badge/Patreon-Support%20Me-red)](https://www.patreon.com/bePatron?u=49614365)

[![The Forge](https://img.shields.io/badge/The%20Forge-Pay%20What%20You%20Want-success)](https://eu.forge-vtt.com/bazaar#package=tension-pool)

Tension Pool is a Foundry Implementation and Evolution of the Angry GM's idea of [Time Pools/Tension Pools](https://theangrygm.com/making-things-complicated/).


## Instructions

Can be controlled from scene controls or from chat commands

## Chat Commands

- /TPadddie - Adds a Die to the Pool
- /TPremovedie - Remove Die from Pool
- /TPemptypool - Empty the Pool (no roll)
- /TProllpool - Roll Dice Pool
- /TProllfullpool - Roll Dice Pool

## Planned updates

- The introduction of a Fate Dice based system
- Auto Roll on a Roll Table if a Complication occurs
- Add controls to the pool below the chat

## Hook Calls

#### On Pool Roll

Hooks.call("tension-poolRolled", dicerolled, diceleftinpool,complicationoccured);

- dicerolled (int) - The dice rolled
- diceleftinpool (int) - The dice left in the pool after the roll is complete
- complicationoccured (bool) - whether a complication should occur

#### On Change in Dice in Pool

Hooks.call("tension-poolChange", diceinpool);

- diceinpool (int) - The dice in the pool after dice added or removed

## Change log

#### 0.0.20 - QoL Improvements

- Hooks Calls added
- Chat Commands added
- Option to remove die added
- Option to empty the pool without rolling added

#### 0.0.14 - Fixed issue with updating on player screen

#### 0.0.12 - Mitigating Forge issue

#### 0.0.10 - QoL Improvements

- Added permanent pool tracker
- Added option to use normal d6 instead of the tension dice
- Added option to empty the dice pool after a non-full roll
- Added option to "drop" a die when adding it to the pool
- Added option to calculate sum instead of checking for 1s

#### 0.0.03 - First Release

#### 0.0.02 - Initial

- First Version

### Licence

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.