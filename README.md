# Bot To Bot

A chatbot that talk with Gyant (health robot) bot

# Getting Started

## Installation

To run this bot locally clone the GitHub repository:

```
git clone https://github.com/Zahidul-Islam/BotToBot.git
cd BotToBot
npm install
```

## Update environment variables

Rename ```.env.template``` file to .env using ```mv .env.template .env```

Update properties in **.env** file

PORT=8000
SERVICE_URL=<Service Callback Url>
GYANT_URL=<Gyant API Url>

## Update index.html

Update the ```BASE_URL``` in ```index.html``` file if you want to running the bot other then local environment.

```
const BASE_URL = 'https://xxxxxxx.ngrok.io';
```
Run ```npm start```

## Use ```ngrok``` for local testing

You can download **ngrok** from [here](https://ngrok.com/download).

Run ```ngrok http 8000``` It will provide an URL like: ```https://xxxxxxx.ngrok.io``` which can be accessible from internet. Change the ```SERVICE_URL=https://xxxxxxx.ngrok.io/api/messages``` in ```.env``` file.

You can access the bot using ```localhost:8000``` and ```https://xxxxxxx.ngrok.io```

> You can run multiple bot simultaneously by just pointing a new browser tab to ```http://localhost:8000```

# Run test

Run ```npm test```

# Demo

![demo image](/images/conversation-with-gyant-bot.png)

# License

Copyright (c) 2017, Zahidul Islam. (MIT License)

See LICENSE for more info.