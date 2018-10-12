const SteamUser = require('steam-user')
let client = new SteamUser()

const logOnOptions = {
    accountName: process.env.hesapadı,
    password: process.env.şifre
}

client.logOn(logOnOptions)

client.on('loggedOn', () => {
    console.log('Basariyla Giriş Yapildi')
    client.setPersona(SteamUser.Steam.EPersonaState.Online)
	client.gamesPlayed(227300)
})
