# Influent Dashboard

Steps to set up the repo:

1) Make sure you have [git](https://git-scm.com/downloads) and [node](https://nodejs.org/en/download/) installed.
    hint: on Mac, you can use the Homebrew package manager. Install with:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install git
brew install node@8
```

2) Create and navigate into new Influent folder.
    ```
    mkdir -p /dev/Influent/repos
    cd /dev/Influent/repos
    ```

3) Clone repo using https or ssh method.
`git clone git@bitbucket.org:influentmetrics/influent-dashboard.git`
or
`git clone https://YOUR_BITBUCKET_USERNAME@bitbucket.org/influentmetrics/influent-dashboard.git`

4) Enter repo folder:
    ```
    cd influent-dashboard
    ```
3a) Create a client_id.json file in influent-dashboard/api (credentials must come from administrator)

5) Install npm tools:
```
npm install
npm install -g eslint
npm install -g forever
```

6) Set up VS Code, by adding these settings (gear in lower right -> Settings):
``` json
    "editor.detectIndentation": false,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "jsx"
    ],
    "eslint.alwaysShowStatus": true,
```

7) You should see files within the repo that are red, which indicates the linting is working.

8) You need to grab the api_credentials.json file, which you can download [here](https://drive.google.com/open?id=1ckXoFCQbueg2yqcsZlVm2Is2Ucam6Lez), and place it in the `./api/` folder.

9) Create log folder in influent-dashboard root with `mkdir log`

10) Startup servers from influent-dashboard root folder:
`npm run all`

11) Point your web browser to:`http://localhost:4000/dashboard/importer`. If you see a login screen, you're in great shape!

12) To stop all servers, run:
`npm run stopall`
