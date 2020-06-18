
# Mark Burnett

A discord bot to help out with "Survivor" games. Meant for private hosting. Create challenges, timers, locations (also known as safari), keep track of player stats and other stuff.

**This bot requires the administrator permission, or at least the Manage Channels & Manage Roles**

# Features

- Fully customizable, includes a dashboard to easily manage games 
- Randomize tribes
- Locations (for Safari, for example)
- A database for players, to keep track of numerous things
- Codes, which when claimed can do something
- Custom commands

There are also tons of more features that aren't mentioned in the list above.

# How to host it yourself

## Download the required tools

You will need:
- Node.js (link: https://nodejs.org/en/). Download the version recommended for most users. 

- node-gyp. After you've installed node.js, open your terminal and run the following commands:
```
npm i -g --production windows-build-tools
```
Once that installs, run the command:
```
npm i -g node-gyp node-pre-gyp
```
**Don't know how to open your terminal?:** Tutorial for [Windows](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-8.1/), tutorial for [Mac](https://www.idownloadblog.com/2019/04/19/ways-open-terminal-mac/) 

**IMPORTANT:** OPEN THE TERMINAL AS AN ADMINISTRATOR!!!

## Download this repository

- Click the "Clone" button on this page, then click on the "Download ZIP" button. Unzip the downloaded file anywhere you want.
- Open the folder, then **open a terminal inside the folder** (Tutorial on how to do that [here](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)), and run the command `npm i`.
