# Tension Pool

[![GitHub release](https://img.shields.io/github/release/sdoehren/tension-pool.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![GitHub issues](https://img.shields.io/github/issues/SDoehren/tension-pool/bug)](https://GitHub.com/sdoehren/tension-pool/issues/)


[![Forge Install %](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Ftension-pool)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![Github all releases](https://img.shields.io/github/downloads/sdoehren/tension-pool/total.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)
[![Github Releases (by Release)](https://img.shields.io/github/downloads/sdoehren/tension-pool/latest/total.svg)](https://GitHub.com/sdoehren/tension-pool/releases/)

[![ko-fi](https://img.shields.io/badge/ko--fi-Support%20Me-red?style=flat-square&logo=ko-fi)](https://ko-fi.com/sdoehren)

[![The Forge](https://img.shields.io/badge/The%20Forge-Pay%20What%20You%20Want-success?style=flat-square)](https://eu.forge-vtt.com/bazaar#package=tension-pool)

Tension Pool is a Foundry Implementation and Evolution of the Angry GM's idea of [Time Pools/Tension Pools](https://theangrygm.com/making-things-complicated/).

## Future of Tension Pool

Tension Pool has been updated to V10.

Going forwards Tension Pool should be treated as unsupported.

I will continue to develop Tension Pool for my own games so major bugs will be fixed, but edge cases will take longer to get to.

## Install

Available on the Forge and via the module directory within Foundry.

Alternatively install via the manifest url: https://github.com/SDoehren/tension-pool/releases/latest/download/module.json

## Instructions

The simpliest way to use Tension Die is to click the pool to add a die, which will roll atomatically when it is filled.

![Image](images/Guide2.webp)

There is a compendium of macros installed with the module for more complicated controls; these simply call the API.

## Hook Calls and API

Hook Calls and API are available [here](api.md)

## Complication Likelihood

| Pool Size | **d4** |  **d6**   | **d8** | **d10** | **d12** | **d20** | **d100** |
|:---------:|:------:|:---------:|:------:|:-------:|:-------:|:-------:|:--------:|
|     1     | 25.0%  |   16.7%   | 12.5%  |  10.0%  |  8.3%   |  5.0%   |   1.0%   |
|     2     | 43.8%  |   30.6%   | 23.4%  |  19.0%  |  16.0%  |  9.8%   |   2.0%   |
|     3     | 57.8%  |   42.1%   | 33.0%  |  27.1%  |  23.0%  |  14.3%  |   3.0%   |
|     4     | 68.4%  |   51.8%   | 41.4%  |  34.4%  |  29.4%  |  18.5%  |   3.9%   |
|     5     | 76.3%  |   59.8%   | 48.7%  |  41.0%  |  35.3%  |  22.6%  |   4.9%   |
|     6     | 82.2%  | **66.5%** | 55.1%  |  46.9%  |  40.7%  |  26.5%  |   5.9%   |
|     7     | 86.7%  |   72.1%   | 60.7%  |  52.2%  |  45.6%  |  30.2%  |   6.8%   |
|     8     | 90.0%  |   76.7%   | 65.6%  |  57.0%  |  50.1%  |  33.7%  |   7.7%   |
|     9     | 92.5%  |   80.6%   | 69.9%  |  61.3%  |  54.3%  |  37.0%  |   8.6%   |
|    10     | 94.4%  |   83.8%   | 73.7%  |  65.1%  |  58.1%  |  40.1%  |   9.6%   |

## Expected Complications per 100 dice added to pool


| Pool Size | **d4** | **d6** | **d8** | **d10** | **d12** | **d20** | **d100** |
|:---------:|:------:|:------:|:------:|:-------:|:-------:|:-------:|:--------:|
|     1     |  25.0  |  16.7  |  12.5  |  10.0   |   8.3   |   5.0   |   1.0    |
|     2     |  21.9  |  15.3  |  11.7  |   9.5   |   8.0   |   4.9   |   1.0    |
|     3     |  19.3  |  14.0  |  11.0  |   9.0   |   7.7   |   4.8   |   1.0    |
|     4     |  17.1  |  12.9  |  10.3  |   8.6   |   7.3   |   4.6   |   1.0    |
|     5     |  15.3  |  12.0  |  9.7   |   8.2   |   7.0   |   4.5   |   1.0    |
|     6     |  13.7  |  11.1  |  9.2   |   7.8   |   6.8   |   4.4   |   1.0    |
|     7     |  12.4  |  10.3  |  8.7   |   7.4   |   6.5   |   4.3   |   1.0    |
|     8     |  11.2  |  9.6   |  8.2   |   7.1   |   6.3   |   4.2   |   1.0    |
|     9     |  10.3  |  9.0   |  7.8   |   6.8   |   6.0   |   4.1   |   1.0    |
|    10     |  9.4   |  8.4   |  7.4   |   6.5   |   5.8   |   4.0   |   1.0    |

## Change log

[Change log](Changelog.md)


### Licence

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.