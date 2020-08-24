const serversUrl = "https://raw.githubusercontent.com/5aitama/Koala/master/servers.json";
const contactUrl = "https://twitter.com/5aitama1";

const labelStatusTitle = document.getElementById("status").children.item(0);
const labelStatusDescription = document.getElementById("status").children.item(1);

var serverUrl = "";
/**
 * Update the status descripton text
 * @param {string} text 
 */
function UpdateStatusDesc(text)
{
    labelStatusDescription.textContent = text;
}

/**
 * Update the status title text
 * @param {string} text 
 */
function UpdateStatusTitle(text, isError = false)
{
    if(!isError)
        labelStatusTitle.textContent = text;
    else
        labelStatusTitle.innerHTML = `<span style="color: red;">${text}</span>`;
}

/**
 * Show/Hide the progress bar
 * @param {boolean} isVisible 
 */
function SetProgressBarVisibility(isVisible = true)
{
    document.getElementsByClassName("progress-bar")[0].setAttribute("style", `opacity: ${isVisible ? 1 : 0};`);
}

UpdateStatusDesc("Get servers list...");

fetch(serversUrl)
    .then(function(response) {
        if(!response.ok)
            throw("Response not ok :(");
        
        response.json()
            .then(async value => {

                UpdateStatusDesc("Connect to server...")
                const servers = value.servers;

                for(let addr of servers) {
                    try {
                        var response = await PromiseTimeout(fetch(addr), 3000);
                        
                        if(!response.ok)
                            throw new Error("Response not ok");

                        serverUrl = addr;
                        break;
                    } 
                    catch(error) {
                        console.log(`Can't connect to "${addr}" : ${error}`);
                    }
                };

                if(serverUrl === "")
                {
                    SetProgressBarVisibility(false);
                    UpdateStatusTitle("ERROR", true);
                    labelStatusDescription.innerHTML = `Can't connect to any servers ! Please contact <a href="${contactUrl}">5aitama</a> !`;
                    return;
                }
                console.log(`Available address is ${serverUrl}`);
            })
            .catch(error => {
                UpdateStatusTitle("ERROR", true);
                labelStatusDescription.innerHTML = `Can't parse servers list ! Please contact <a href="${contactUrl}">5aitama</a> !`;
                console.log(error);
            });
    })
    .catch(function(error) {
        UpdateStatusTitle("ERROR", true);
        labelStatusDescription.innerHTML = `Can't get servers list ! Please contact <a href="${contactUrl}">5aitama</a> !`;
        console.log(error);
    });

function PromiseTimeout(promise, ms = 3000) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("Timeout"));
        }, ms)
        promise.then(resolve, reject);
    });
}

const _host = "http://127.0.0.1:8080/rest/1.0/";
const _link = "https://1fichier.com/?rpe11lnbrba2x1dkgnyc&af=2298654&af=22123";

UnrestrictCheck(_host, _link)
    .then(response => {
        console.log(response);
        if(response.supported !== 1)
        {
            console.log("link unsuported...");
            return;
        }

        UnrestrictLink(_host, _link)
            .then(res => {
                console.log(res);
            });
    })
    .catch(err => {
        console.log(err);
    });