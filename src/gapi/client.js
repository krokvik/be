const https = require("https");
const url = require('url');

class GoogleApiClient {
    constructor (authHeader) {
        this.authHeader = authHeader;
    }

    getProfile(next, err) {
        const requestUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
        
        const options = Object.assign(
            {
                headers: {
                    "Authorization": this.authHeader,
                    "Content-Type": "application/json"
                }
            },
            url.parse(requestUrl)
        );

        https.get(options, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                console.log(body);
                next(JSON.parse(body));
            });
        });
    }

    getActivity(startTimestamp, endTimestamp)
    {

    }
}

module.exports = GoogleApiClient
