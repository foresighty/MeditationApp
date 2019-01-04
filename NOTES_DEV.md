# Mediation App

## Dev specific notes

### Simulators

- Menu for iOS devtools - Command D
- Menu for Android devtools - Command M

- Fixing red screen of death
  - Noted at: [Github: react-devtools 3.5.0 breaks new project #22863](https://github.com/facebook/react-native/issues/22863)
  - Add the following to package.json

```
"resolutions": {
    "react-devtools-core": "3.4.3"
}
```

Then run

```
yarn start --reset-cache
```

### Packages
