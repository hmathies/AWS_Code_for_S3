exports.handler = (event, context, callback) => {
  const updateConfig = args => {
    const { id } = args;
    const { event } = args;
    const key = `dashboard/config/${id}.json`;
    return new Promise((resolve, reject) => {
      delete event.data.org;
      const params = { Bucket: bucket, Key: key };
      const config = personalizer.genCode({ ...args.config, ...event.data });
      console.log({ config: JSON.stringify(config) });
      const upload = Object.assign({}, params);
      upload.Body = JSON.stringify(config);
      s3.upload(upload, (err, data) => {
        if (err) reject(new Error(`Error writing config data: ${err}`));
        else resolve(data);
      });
    });
  };

  const getAccountConfig = credentials => {
    const key = "dashboard/config/accounts.json";
    const params = { Bucket: bucket, Key: key };
    return new Promise((resolve, reject) => {
      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const result = JSON.parse(data.Body.toString());
          resolve({ credentials, config: result });
        }
      });
    });
  };

  const sendResponse = response => {
    callback(null, {
      statusCode: "200",
      body: JSON.stringify({ data: response }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  };

  let id;
  let action;
  let personalizer;
  switch (event.httpMethod) {
    case "OPTIONS":
      callback(null, {
        statusCode: "200",
        body: "",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With, X-CSRF-Token"
        }
      });
      break;
    case "GET":
      personalizer = require("./modules/personalizer/personalizer.js")({
        event,
        aws
      });
      const auth = require("./modules/auth.js");
      action = event.queryStringParameters.a;
      id = event.queryStringParameters.o;
      // console.log({query:event.queryStringParameters})
      switch (action) {
        case "getConfig":
          getConfig(id)
            .then(args => {
              sendResponse(args.config);
            })
            .catch(sendResponse);
          break;
        case "login":
          getAccountConfig({
            username: event.queryStringParameters.username,
            password: event.queryStringParameters.password
          })
            .then(auth.authenticate)
            .then(sendResponse)
            .catch(sendResponse);
          break;
        case "updateConfig":
          break;
        case "getProfiles":
          // get listing of profiles grouped into buckets, along with bucket metrics
          getConfig(id)
            .then(personalizer.getProfiles)
            .then(sendResponse)
            .catch(sendResponse);
          break;
        case "getProfile":
          // get profile details for a specific profile_id
          getConfig(id)
            .then(personalizer.getProfile)
            .then(sendResponse)
            .catch(sendResponse);
          break;
      }
      break;
    case "POST":
      event.data = event.body;
      id = event.data.org;
      console.log(`id: ${JSON.stringify(id)}`);
      personalizer = require("./modules/personalizer/personalizer.js")({
        event,
        aws
      });
      const actionArg = event.data.action;
      action = actionArg;
      switch (action) {
        case "upload":
          getConfig(id).then(personalizer.upload);
          break;
        default:
          getConfig(id)
            .then((args, event) => {
              updateConfig(...args, event);
            })
            .then(sendResponse)
            .catch(sendResponse);
          break;
      }
      break;
  }
};
