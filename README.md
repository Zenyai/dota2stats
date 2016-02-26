# Dota2Stats

## Introduction

Just another DotA 2 Statistics site, this project is currently underdevelopment and moving toward the final goal of creating a DotA 2 Heropicker.

## Installation

This project uses Meteor framework, you should install Meteor framework by using guide in the at [meteor website](https://www.meteor.com/install)

Get Steam API Key from [here](https://steamcommunity.com/dev/apikey) and then run

```
export STEAMAPIKEY="<your-api-key>"
```

After setting environment variable you should be able to go to the project folder (in terminal) and run ```meteor``` and you are done.

## Notes
Your site will be up and running but you still need two workers to download the data from DotA API which are listed below

[dota2stats-download-bot](https://github.com/zenyai/dota2stats-download-bot)

[dota2stats-interpret-bot](https://github.com/zenyai/dota2stats-interpret-bot)
