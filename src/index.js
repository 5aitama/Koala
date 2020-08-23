const serversUrl = "https://raw.githubusercontent.com/5aitama/Koala/master/servers.json";

fetch(serversUrl)
    .then(function(response) {
        if(!response.ok)
            throw("Response not ok :(");
        
        response.json()
            .then(async value => {
                const servers = value.servers;
                let availableAddr = "";

                for(let addr of servers) {
                    try {
                        var response = await PromiseTimeout(fetch(addr), 3000);

                        if(!response.ok)
                            throw new Error("Response not ok");

                        availableAddr = addr;
                        break;
                    } 
                    catch(error) {
                        console.log(`Can't connect to "${addr}" : ${error}`);
                    }
                };

                console.log(`Available address is ${availableAddr}`);
            });
    })
    .catch(function(error) {
        console.log(error);
    })

function PromiseTimeout(promise, ms = 3000) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("Timeout"));
        }, ms)
        promise.then(resolve, reject);
    });
}