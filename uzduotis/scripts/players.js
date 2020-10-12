window.players = {
    rows: {
        current: null,
        rows: [],
        getRow: function (whereKey = '') {

        },
        updateRow: function (playerName, serverName) {

            const playersData = [];

            players.fetch(serverName).forEach(serverPlayers => {
                if (serverPlayers.login == playerName) {

                    serverPlayers.device_os = prompt("Please enter device OS and press OK:"),
                    serverPlayers.login = prompt("Please enter login and press OK:"),
                    serverPlayers.name = prompt("Please enter name and press OK:"),
                    serverPlayers.status = prompt("Please enter status and press OK:"),
                    serverPlayers.level = prompt("Please enter level and press OK:"),
                    serverPlayers.coins = prompt("Please enter amount of coins and press OK:");

                    console.log('Logsystem >> ' + `players.rows.updateRow(${playerName}, ${serverName})`, serverPlayers);
                }
                playersData.push(serverPlayers);
            });

            requests.post(serverName.toString(), 'players.json', playersData);
        },
        deleteRow: function (whereKey = '') {

        }
    },

    fetch: function (servers) {
        const playersArray = players.rows.rows;

        servers.forEach(serverName => {

            let playersData = requests.get(serverName, 'players.json');

            playersData.forEach(serverPlayers => {

                playersArray.push(serverPlayers);
            });
        });

        console.log('Logsystem >> ' + "players.fetch()", playersArray);
        return playersArray;
    },

    getActiveServerPlayers: function (servers) {
        const objectsArray = [];

        this.fetch(servers).forEach(serverPlayers => {
            if (serverPlayers.status == "active" && objectsArray.indexOf(serverPlayers.name) === -1) {
                objectsArray.push(serverPlayers.name);
            }
        });

        console.log('Logsystem >> ' + "players.getActiveServerPlayers()", objectsArray);
        return objectsArray;
    },

    getBanServerPlayers: function (servers) {
        const playersArray = [];

        this.fetch(servers).forEach(serverPlayers => {
            if (serverPlayers.status == "banned" && playersArray.indexOf(serverPlayers.name) === -1) {
                playersArray.push(serverPlayers.name);
            }
        });

        console.log('Logsystem >> ' + "players.getBanServerPlayers()", playersArray);
        return playersArray;
    },

    getNegativeCoinServerPlayers: function (servers) {
        const playersArray = [];

        this.fetch(servers).forEach(serverPlayers => {
            if (serverPlayers.coins < 0 && playersArray.indexOf(serverPlayers.name) === -1) {
                playersArray.push(serverPlayers.name);
            }
        });

        console.log('Logsystem >> ' + "players.getNegativeCoinServerPlayers()", playersArray);
        return playersArray;
    },

    setPlayerCoinsToZero: function (playerName, serverName) {

        const playersData = [];

        this.fetch(serverName).forEach(serverPlayers => {
            if (serverPlayers.coins < 0 && serverPlayers.login == playerName) {
                serverPlayers.coins = 0;

                console.log('Logsystem >> ' + `players.setPlayerCoinsToZero(${playerName}, ${serverName})`, serverPlayers.coins);
            }

            playersData.push(serverPlayers);
        });

        requests.post(serverName.toString(), 'players.json', playersData);
    },

}