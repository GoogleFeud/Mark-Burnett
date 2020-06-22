
# Mark Burnett

A discord bot to help out with "Survivor" games. Meant for private hosting. Contact me on discord (`GoogleFeud#5048`) if you'd like to help me set it up for you!

**This bot requires the administrator permission, or at least the Manage Channels & Manage Roles**

# Features

- Fully customizable, includes a dashboard to easily manage games 
- Randomize tribes
- Locations (for Safari, for example)
- A database for players, to keep track of numerous things
- Codes, which when claimed can do something
- Custom commands

# How to host it

... to be done

**Important:** DO NOT share the dashboard files with anyone other than your host team! There's some pretty sensitive data over there, including your MongoDB Atlas password and bot token. Those files allow them to view **everything** and **send messages as the bot**. So give it to your most trustworthy hosts. 

**It's a good idea to reset the bot's token after a game, as well as switch to a new MongoDB cluster, as well as change your MongoDB atlas password, unless you FULLY trust all your hosts.**

Here's what they can do with this information: (if you don't change it)     

- If you remove a person from the host team in the future, they'll still have access to all the sensitive data and may share it to spoil / ruin your game, allowing anyone in the game to look up information such as locations, as well as delete everything.
- If your bot token finds itself in the wrong hands, your whole server may be raided, every member can get banned, and every channel may get deleted. SO MAKE SURE TO CHANGE YOUR TOKEN AFTER EVERY GAME. 

