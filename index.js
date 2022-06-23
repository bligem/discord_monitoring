require('dotenv').config();

const https = require('http');

const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

const TOKEN = process.env.TOKEN;

client.once('ready', () => {
	console.log('Ready!');
});


client.on('messageCreate', message => {
	if (message.content.startsWith("!")){
    if (message.content.substring(1) === "ping"){
      message.reply("Pong");
    }

    var x = message.content.split(" ");
    if (x[0] == "!info" || x[0] == "!monit"){
      var options = {
        hostname: process.env.URL,
        port: 5000,
        path: '/data/' + x[1],
        method: 'GET',
      };
      
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        //console.log(res);
        res.on('data', d => {
          var info = JSON.parse(d);
          //console.log(JSON.parse(d).Hostname);
          if (x[0]== "!info"){
          const exampleEmbed = {
            color: 0x0099ff,
            title: 'Hostname:',
            author: {
              name: 'Monitoring',
              icon_url: 'https://i.imgur.com/0dqdq3m.jpeg',
            },
            description: info.Hostname.toString() + ' | ' + info.Platform.toString(),
            fields: [
              {
                name: 'Uptime:',
                value: info.Uptime.toString() + ' min',
              },
              {
                name: 'CPU:',
                value: info.CPU.toString(),
              },
              {
                name: 'Liczba rdzeni:',
                value: info.CPU_c.toString(),
              },
              {
                name: 'Częstotliwość procesora:',
                value: info.CPU_mhz.toString(),
              },
              {
                name: 'Aktualne zużycie procesora:',
                value: (Math.round(info.CPU_usage * 100) / 100).toString() + ' %',
              },
              {
                name: 'Pojemność dysku:',
                value: info.Disk.toString() + ' mb',
              },
              {
                name: 'Wolna przestrzeń dyskowa:',
                value: info.Disk_free.toString() + ' mb',
              },
              {
                name: 'Zajęte miejsce na dysku:',
                value: info.Disk_used.toString() + ' mb',
              },
              {
                name: 'Ogólna zajętość dysku:',
                value: (Math.round(info.Disk_p * 100) / 100).toString() + ' %',
              },
              {
                name: 'Pojemność RAM:',
                value: info.RAM.toString() + ' mb',
              },
              {
                name: 'Dostępna pamięć RAM:',
                value: info.RAM_free.toString() + ' mb',
              },
              {
                name: 'Zajętość RAM:',
                value: (Math.round(info.RAM_p * 100) / 100).toString() + ' %',
              },
            ],
          };
          message.reply({ embeds: [exampleEmbed] });
        } else if(x[0]== "!monit"){
          const exampleEmbed = {
            color: 0x0099ff,
            title: 'Hostname:',
            author: {
              name: 'Monitoring',
              icon_url: 'https://i.imgur.com/0dqdq3m.jpeg',
            },
            description: info.Hostname.toString() + ' | ' + info.Platform.toString(),
            fields: [
              {
                name: 'Uptime:',
                value: info.Uptime.toString() + ' min',
              },
              {
                name: 'Aktualne zużycie procesora:',
                value: (Math.round(info.CPU_usage * 100) / 100).toString() + ' %',
              },
              {
                name: 'Ogólna zajętość dysku:',
                value: (Math.round(info.Disk_p * 100) / 100).toString() + ' %',
              },
              {
                name: 'Zajętość RAM:',
                value: (Math.round(info.RAM_p * 100) / 100).toString() + ' %',
              },
            ],
          };
          message.reply({ embeds: [exampleEmbed] });
        }
        });
      });
    
      req.on('error', error => {
        console.error(error);
      });
      
      req.end();
    }
  }

  if (message.content.startsWith("!")){
    if (message.content.substring(1) === "stats"){

    }
  }
});

client.login(TOKEN);
