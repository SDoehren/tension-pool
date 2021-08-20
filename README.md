# Tension Pool

[![GitHub release](https://img.shields.io/github/release/sdoehren/tension-pool.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![GitHub issues](https://img.shields.io/github/issues/sdoehren/tension-pool.svg)](https://GitHub.com/sdoehren/tension-pool/issues/)


[![Forge Install %](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Ftension-pool)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![Github all releases](https://img.shields.io/github/downloads/sdoehren/tension-pool/total.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![Github Releases (by Release)](https://img.shields.io/github/downloads/sdoehren/tension-pool/latest/total.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)

[![ko-fi](https://img.shields.io/badge/ko--fi-Support%20Me-red?style=flat-square&logo=ko-fi)](https://ko-fi.com/sdoehren)
[![Patreon](https://img.shields.io/badge/Patreon-Support%20Me-red?style=flat-square&logo=patreon)](https://www.patreon.com/bePatron?u=49614365)
[![Patreon](https://img.shields.io/badge/Crypto-Support-red?style=flat-square)](https://sdoehren.github.io/support.html)


[![The Forge](https://img.shields.io/badge/The%20Forge-Pay%20What%20You%20Want-success?style=flat-square)](https://eu.forge-vtt.com/bazaar#package=tension-pool)

Tension Pool is a Foundry Implementation and Evolution of the Angry GM's idea of [Time Pools/Tension Pools](https://theangrygm.com/making-things-complicated/).

## Install

Available on the Forge and via the module directory within Foundry.

Alternatively install via the manifest url: https://github.com/SDoehren/tension-pool/releases/latest/download/module.json

## Instructions

Can be controlled from scene controls or from chat commands

![Image](images/Guide1.webp)

Or click the pool to add a die.

## Chat Commands

- /TPadddie - Adds a Die to the Pool
- /TPremovedie - Remove Die from Pool
- /TPemptypool - Empty the Pool (no roll)
- /TProllpool - Roll Dice Pool
- /TProllfullpool - Roll Dice Pool

## Planned updates

- Add controls to the pool below the chat

## Hook Calls and API

Hook Calls and API are available [here](api.md)


## Change log

[Change log](Changelog.md)

#### 0.0.50

- Protection against overfilling the pool has been added.

#### 0.0.47 - Macro Breaking Change

- Tension die short code had been changed from dt6 to just dt to fix an issue with compatibility with Dice So Nice



### Licence

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.