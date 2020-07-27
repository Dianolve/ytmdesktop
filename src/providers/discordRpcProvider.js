const clientId = '495666957501071390'
/*const RPC = require('discord-rpc')
const startTimestamp = new Date()
var client

var _isStarted

function isStarted() {
    return _isStarted
}

function _setIsStarted(value) {
    _isStarted = value
}

function start() {
    client = new RPC.Client({ transport: 'ipc' })

    client.on('ready', () => {
        _setIsStarted(true)
    })

    client.login({ clientId }).catch(() => {
        if (!isStarted()) {
            setTimeout(function() {
                // console.log('trying to connect')
                start()
            }, 10000)
        }
    })

    client.on('disconnected', () => {
        _setIsStarted(false)
        start()
    })
}

function stop() {
    client.destroy()
    _setIsStarted(false)
}

function setActivity(info) {
    if (isStarted() && info.track.title) {
        var now = Date.now()
        client
            .setActivity({
                details: info.track.title,
                state: info.track.author,
                startTimestamp: now + info.player.seekbarCurrentPosition * 1000,
                endTimestamp:
                    now +
                    (info.track.duration - info.player.seekbarCurrentPosition) *
                        1000,
                largeImageKey: 'ytm_logo_512',
                smallImageKey: info.player.isPaused
                    ? 'discordrpc-pause'
                    : 'discordrpc-play',
                instance: false,
            })
            .catch(err => {
                console.log(err)
            })
    }
}*/

const Discord = require('discord-game')

const isRequireDiscord = true
Discord.create(clientId, isRequireDiscord).then(_setIsStarted(true))

const activity = {
    details: info.track.title,
    state: info.track.author,
    assets: {
        largeImage: 'ytm_logo_512',
        samllImage: info.player.isPaused
            ? 'discordrpc-pause'
            : 'discordrpc-play',
    },
    timestamps: {
        startAt: now + info.player.seekbarCurrentPosition * 1000,
        endAt:
            now +
            (info.track.duration - info.player.seekbarCurrentPosition) * 1000,
    },
    secrets: {
        match: 'match',
        join: 'join',
        spectate: 'spectate',
    },
    party: {
        id: 'id',
        currentSize: 1,
        maxSize: 5,
    },
}
Discord.Activity.update(activity).then(function () {
    console.log('Rich Presence updated')
})

setInterval(function () {
    Discord.runCallback()
}, 1000 / 60)

module.exports = {
    isStarted: isStarted,
    start: start,
    stop: stop,
    setActivity: setActivity,
}
