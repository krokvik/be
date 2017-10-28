const https = require("https");
const url = require('url');

class GoogleApiClient {
    constructor (authHeader) {
        this.authHeader = authHeader;
    }

    requestOptions(requestUrl) {
        console.log('Calling ' + requestUrl);
        return Object.assign(
            {
                headers: {
                    "Authorization": this.authHeader,
                    "Content-Type": "application/json"
                }
            },
            url.parse(requestUrl)
        );
    }

    retrieveResponseCallback(next) {
        return res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                console.log(body);
                next(JSON.parse(body));
            });
        };
    }

    getProfile(next) {
        https.get(
            this.requestOptions("https://www.googleapis.com/oauth2/v1/userinfo"),
            this.retrieveResponseCallback(next)
        );
    }

    getActivity(startTimestamp, endTimestamp, next) {
        var postreq = https.request(
            Object.assign(
                {method: 'POST'},
                this.requestOptions("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate?fields=bucket")
            ),            
            this.retrieveResponseCallback(next)
        );
        postreq.write(JSON.stringify({
            "aggregateBy": [
                {"dataTypeName": "com.google.step_count.delta"},
            ],
            "endTimeMillis": endTimestamp,
            "startTimeMillis": startTimestamp
        }));
        postreq.end();
    }
}

module.exports = GoogleApiClient
