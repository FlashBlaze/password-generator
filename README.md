# Password Generator [![Build Status](https://travis-ci.com/FlashBlaze/password-generator.svg?branch=master)](https://travis-ci.com/FlashBlaze/password-generator)

A simple password generator and manager using

- React
- Redux
- Antd
- Firebase

## Installation and Running app

1. Clone the repo: `git clone https://github.com/FlashBlaze/password-generator.git`
2. Go to password-generator: `cd password-generator` and install dependencies: `npm install`
3. Go to [Firebase Console](https://console.firebase.google.com) and create a project
4. Create a Firebase web app and replace the `firebase config` object with the given object
5. Go to Authentication and under Sign-in method, enable Google
6. Create database in test mode and create 3 collections with collection ids: `masterPasswords`, `passwords` and `users`
7. Install firebase cli globally: `npm i -g firebase-cli` and follow the instructions given [here](https://firebase.google.com/docs/hosting/quickstart)
8. Run `npm run start` to start the project

## Current Implementation

1. Anyone can create a random password without signing in.
2. The user has the option to sign in using Google account.
3. If the user signs in, then the user is asked to create a master password. Currently there are no criterias regarding length, the type of characters required, etc.
4. The master password is then hashed using [bcrypt](https://www.npmjs.com/package/bcryptjs) and stored in Firebase.
5. To encrypt the various passwords entered, master password along with the uid of the user (which is unique and generated by Google when signed in using OAuth) is used.
6. This encrypted password is then stored in Firebase along with the website's name.
7. Before retrieving passwords, the user is asked to enter the master password for verification and then the passwords are decrypted on the client side.

## What's next

My previous goals and planned features/todos can be found in [Projects](https://github.com/FlashBlaze/password-generator/projects). You are free to open a pull request.
