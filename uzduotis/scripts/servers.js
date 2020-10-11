window.servers = {
    rows: {
        available: [],
        current: "production",
        rows: {
            production: {
                url: "/data/production/",
                name: "Production Server",
                status: "enabled"
            },
            staging: {
                url: "/data/staging/",
                name: "Staging Server",
                status: "enabled"
            },
            dev: {
                url: "/data/staging/",
                name: "Staging Server",
                status: "disabled"
            }
        },
        getRow: function (whereKey = '') {

        },
        updateRow: function (object) {

        },
        deleteRow: function (whereKey = '') {

        }
    },
    getAvailableServers: function () {
       
        const servers = this.rows.rows;
        const available_servers = this.rows.available;
        let key;

        for (key in servers) {
            if (servers.hasOwnProperty(key) && servers[key]["status"] == "enabled") {
                if (available_servers.indexOf(key) === -1) {
                    available_servers.push(key);
                }
            }
        }

        logssystem.log("servers.getAvailableServers()", available_servers);
        return available_servers;
    }

};
