# Schedj Install Guide

## Step 1: Install npm

### Ubuntu

[Install guide for Ubuntu 18.0.4](https://github.com/nodesource/distributions/blob/master/README.md)

```sh
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -sudo apt-get install -y nodejs
```

### Mac

[Install guide for Mac OSX](https://treehouse.github.io/installation-guides/mac/node-mac.html)

If you do not already have Homebrew installed, install [Homebrew](https://treehouse.github.io/installation-guides/mac/homebrew). Then type:

```sh
brew update
brew install node
```

To test Node and npm installation, these commands will show the versions if you've installed properly:

```sh
node -v
npm -v
```


## Step 2: Install Expo

### On Ubuntu and Mac

[Expo install guide](https://docs.expo.io/versions/latest/introduction/installation/)

```sh
npm install -g expo-cli
```

### On your Android or iOS device

[Expo for Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US)

[Expo for iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8)


## Step 3: Clone git repositories

### Back end

```sh
git clone https://github.com/Schedj/schedj-backend.git
```

### Front end

```sh
git clone https://github.com/Schedj/schedj-frontend.git
```


## Step 4: CD to directories and install npm

Open two terminals simultaneously.

In back end terminal:

```sh
cd YOURPATH/schedj-backend/
npm install
```
In front end terminal:

```sh
cd YOURPATH/schedj-frontend/
npm install
```


## Step 5: Run front and back end

In back end terminal:
```sh
npm start
```
In front end terminal:
```sh
npm start
```

On your mobile device:

* Scan the QR code available on the front end terminal, or on at http://localhost:19002/

* The app should now be running in your mobile device

* If you're on Mac, you can also run the app on your computer via Xcode Simulator
