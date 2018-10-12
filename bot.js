const SteamUser = require('steam-user')
const Discord = require('discord.js')
const request = require('request')
const speedTest = require('speedtest-net')
const cpuStat = require("cpu-stat")
const pc = require('pc')
const os = require('os')
let client = new SteamUser()
let webhook = new Discord.WebhookClient('497492439238574100', 'nx6IDPF1GTpFUGOdhIbUK1Te2cFmOqgWdTmGsLvW2iCW9eRqT22yYU9EOOy32zc2ylAN');
let ayarlar = require('./ayarlar.json')
let prefix = ayarlar.prefix
let test = speedTest({maxTime: 5000})
const moment = require("moment")
require("moment-duration-format")

const logOnOptions = {
    accountName: ayarlar.hesapadı,
    password: ayarlar.sifre
}

client.logOn(logOnOptions)

client.on('loggedOn', () => {
    console.log('Basariyla Giriş Yapildi')
    client.setPersona(SteamUser.Steam.EPersonaState.Online)
	client.gamesPlayed(`BETA / !!yardım / ${ayarlar.version}`)
	webhook.send('Basariyla Steam Bot Baslatildi')
})

client.on("friendMessage", function(steamID, message, args) {
    if (message == prefix + 'yardım') {
        client.chatMessage(steamID, `⚙️ Merhaba, Komutlarıma Hosgeldin
►!!döviz - Döviz Kurunu  Gösterir
►!!atatürk - Atatürk Resimleri Atar
►!!espri - Espri Patlatir
►!!ping - Pingimi Gösterir
►!!i - İstatistikleri Gösterir`);
    }
	if (message == prefix + 'ping') {
		client.chatMessage(steamID, '⏲ | Bekleniliyor')
		test.on('data', data => {
        client.chatMessage(steamID, `Pingim ${data.server.ping}ms`);
		});
    }
	if (message == prefix + 'i') {
		let osType = os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else if (osType === 'Windows_NT') osType = 'Windows'
		else osType = os.type();
	let cpuLol;
	    client.chatMessage(steamID, '⏲ | Bekleniliyor')
		test.on('data', data => {
        client.chatMessage(steamID, `ℹ İstatistikler
➡Genel
 📡 Ping: ${data.server.ping}ms
➡Versionlar
 Botun Sürümü: ${ayarlar.version}
 node.js Sürümü: ${process.version}
➡RAM
 💻 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB** / **${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
`);
		})
    }
	if (message === prefix + 'döviz') {
		    request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
        if (error) return client.chatMessage(steamID, '❌ Bir hata oluştu, daha sonra tekrar deneyin.');
        else if (!error) {
            var info = JSON.parse(body);
            if (info) {
			 request('https://www.doviz.com/api/v1/currencies/GBP/latest', function (error, response, body) {
        if (error) return client.chatMessage(steamID, '❌ Bir hata oluştu, daha sonra tekrar deneyin.');
        else if (!error) {
            var sterlin = JSON.parse(body);
            if (sterlin) {
				request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
        if (error) return client.chatMessage(steamID, '❌ Bir hata oluştu, daha sonra tekrar deneyin.');
        else if (!error) {
            var euro = JSON.parse(body);
            if (euro) {
				client.chatMessage(steamID, `💵 Dolar Aliş: ${info.selling}₺ Dolar Satiş ${info.buying}₺
💶 Euro Aliş ${euro.selling}₺ Euro Satiş ${euro.buying}₺
💷 Sterlin Aliş ${sterlin.selling}₺ Sterlin Satiş ${sterlin.buying}₺`)
		}}
        })
    };
        }
		})}}
    });
	}
	if (message == prefix + 'gönder') {
		let yazi = args[0]
		if (!yazi) return client.chatMessage(steamID, '❌ Lütfen Yapımcıya Göndereceğiniz Mesaji Yaziniz')
        client.chatMessage(steamID, '✔ Basariyla Mesajiniz Yapimciya İletildi')
	    client.chatMessage(ayarlar.sahipid, `📮 Mesajiniz Var
Size ${steamID} (https://steamcommunity.com/profiles/${steamID}) ID'lı Kişi Mesaj Gönderdi
Mesaj: ${yazi}`)
    }
	if (message == prefix + 'espri') {
		    request('http://api.eggsybot.xyz/espri', function (error, response, body) {
        if (error) return client.chatMessage(steamID, '❌ Bir hata oluştu, daha sonra tekrar deneyin.')
        else if (!error) {
            var info = JSON.parse(body);
            client.chatMessage(steamID, info.soz);
        }
    });
    }
	if (message === prefix + 'atatürk') {
		    request('http://api.eggsybot.xyz/ataturk', function (error, response, body) {
        if (error) return client.chatMessage('Bir hata oluştu, daha sonra tekrar deneyin.');
        else if (!error) {
            var info = JSON.parse(body);
            if (info) {
				client.chatMessage(steamID, info.link)
            }
        }
    });
	}
});

client.on('friendRelationship', (steamid, relationship) => {
  if (relationship === 2) {
    client.addFriend(steamid);
    client.chatMessage(steamid, '💖 Merhaba, Beni Eklediğin için Teşekkür Ederim');
  }
});