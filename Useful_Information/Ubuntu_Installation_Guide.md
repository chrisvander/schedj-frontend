# Step 1: Install npm

https://github.com/nodesource/distributions/blob/master/README.md

Ubuntu 18.0.4

```sh
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -sudo apt-get install -y nodejs
```


# Step 2: Install Expo

https://docs.expo.io/versions/latest/introduction/installation/

```sh
npm install -g expo-cli
```

On your Android or IOS device

https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US

https://itunes.apple.com/us/app/expo-client/id982107779?mt=8


# Step 3: Clone git repositories

back end

```sh
git clone https://github.com/Schedj/schedj-backend.git
```

front end

```sh
git clone https://github.com/Schedj/schedj-frontend.git
```


# Step 4: CD to directories and install npm

Open two terminals

In back end terminal

```sh
cd YOURPATH/schedj-backend/
npm install
```
In front end terminal

```sh
cd YOURPATH/schedj-frontend/
npm install
```


# Step 5: Run front and back end

In back end terminal
```sh
npm start
```
In front end terminal
```sh
npm start
```

On Your mobile device

1. scan the QR code available on the frontend, or on at http://localhost:19002/

The app should now be running in your mobile device















