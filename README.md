# Always Centred

[![GitHub release](https://img.shields.io/github/release/sdoehren/always-centred.svg)](https://GitHub.com/sdoehren/always-centred/releases/)

[![Forge Install %](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Falways-centred
)](https://GitHub.com/sdoehren/always-centred/releases/)


[![Github all releases](https://img.shields.io/github/downloads/sdoehren/always-centred/total.svg)](https://GitHub.com/sdoehren/always-centred/releases/)
[![Github Releases (by Release)](https://img.shields.io/github/downloads/sdoehren/always-centred/v0.2.03/total.svg)](https://GitHub.com/sdoehren/always-centred/releases/)


[![GitHub issues](https://img.shields.io/github/issues/sdoehren/always-centred.svg)](https://GitHub.com/sdoehren/always-centred/issues/)
 

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/sdoehren)

Always Centred continuously centres and zooms the view on player owned characters or the currently selected token.



## Instructions
Set "Mode" to Party View or Selected Token, the rest should be automatic.

## Settings

- Mode: (default: Disabled)  
Disabled: Module off  
Party View: Will zoom and centre to include all **player owned** tokens.  
Selected Token:  Will zoom and centre to include only the selected token.  

"Selected Token" can work when multiple tokens are selected but it will only focus on one at a time and may lead to the camera bouncing.

- Auto Zoom: (default: Enabled)  
Whether the camera will move towards and away from the board as needed.

- Mitigate Bouncing Issue: (default: Enabled)  
Only relevant when Auto Zoom is set to off and Mode is Party View.  
  As two tokens reach the edge of the screen it will begin to bounce as Foundry tries to pan to the new position. This setting forces Auto Zoom when required to avoid this.
  
- Padding (squares): (default:12)  
The number squares added to the box around the targets.

- Padding (%): (default: 33)  
The percentage to add to the box around the targets. 

- Max zoom level: Ignored if Auto Zoom disabled (default: 1, max:3) 
Maximum tightness to the tabletop; high number tokens appear bigger, low number tokens appear smaller.  
Setting 1: 1 pixel on tabletop=1 pixel in view  
Setting 3: 1 pixel on tabletop=3 pixel in view  
Setting 0.2: 5 pixel on tabletop=1 pixel in view  

- Camera animation speed: (default: 500ms; 0=instant)
Speed at which the camera recentres
  
- Include Invisible: (Default: Disable, GM only option, effects all players)
Whether to include all player owned tokens or just those the user can see in the party view calculations. 
  
- Debug: (Default: Disable)  
Outputs addition information to the console.

## Key binding

Key bindings for GM Controls and change mode are available but requires [Keybind Lib](https://gitlab.com/fvtt-modules-lab/keybind-lib). 
As Keybind Lib has not officially been released it is not a dependency of this module, but is supported if installed.

## Known issues

- Minor conflict with multilevel tokens; currently mitigated entirely.  Always centred will not centre if a token moves inside an MLT object.
- When in Party View mode, if the tokens are too spread to fit in view, bouncing will occur. (Fix planned)


## Changes under consideration

- Locking the viewport to stay within the map.
- Moving buttons to their own area.
- Centring the view as a group when multiple tokens are selected.
- New "combat" mode where the focus follows the active combatant.

## Change log

#### 0.2.03 - Hot fix

- Anonymous tokens issue re-resolved. Thanks Jon.

#### 0.2.01 - GM controls Main

- Anonymous tokens issue resolved.
- Invisible tokens trigger pan in GM control mode
- "DM" replaced with "GM" in documentation
- Scene control buttons are now optional
- Key binds are now partial supported via [Keybind Lib](https://gitlab.com/fvtt-modules-lab/keybind-lib).
- Bug Reporter support added.

#### 0.2.00 - GM controls Beta
- General code improvements
- Added controls to allow GM to control all players' centring.
- Added the option to ignore invisible tokens in party view
- Quick change buttons added to scene controls
- Issue with Party View mode and auto zoom being off partially mitigated.

#### 0.1.4 - Hot Fix3

#### 0.1.3 - Hot Fix2

#### 0.1.2 - Hot Fix
- some users reported receiving GM control notifications

#### 0.1.1 - Bug Fix

- Vastly reduced conflict with multilevel tokens
- Player Characters mode renamed Party View

#### 0.1.0 - First Beta Release  
This was the first public beta.
