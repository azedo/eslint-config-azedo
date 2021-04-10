# Eslint Config

Opinionated eslint defaults for js/node repositories. If you need to check the documentation in order to overwrite some rules in your repository, go to https://eslint.org/docs/rules/ and have a look.

## How to use it?

1. Add the config as a `devDependencies` package of your repo.
```bash
npm i --legacy-peer-deps git+https://github.com/azedo/eslint-config-azedo --save-dev
```

2. Install the peerDependencies of this project on your repo (where you will be using this config) using our automated script.
```bash
# Run this on your project's main folder (root folder)
./node_modules/eslint-config-azedo/utils/setup.js

# You can also use the node command if you prefer (you don't need to!)
node node_modules/eslint-config-azedo/utils/setup.js
```

3. You need to import this config in your `.eslintrc` to enable them. *By default the *react configs* are enabled, but you can also use the *node configs* in case you prefer! To do so, just change the bellow extends to `eslint-config-azedo/node-config`*
```javascript
module.exports = {
  extends: ['eslint-config-azedo']
}
```

4. Don't forget to add a script in your `package.json` file to run these rules against your codebase.
```json
"scripts": {
   "lint": "eslint '*/**/*.{js,ts,tsx}' --fix"
}
```

5. That's it. Now you should be able to run these rules whenever you want.

6. One suggestion is that you add the script above `lint` in your repo:
   - As a `pre-push` hook (with husky):
   ```json
    "husky": {
      "hooks": {
        "pre-push": "npm run lint"
      }
    }
   ```
   - And/or as a step in your CI pipelines
   ```yaml
   linting:
     stage: codeQuality
     script:
       - npm run lint
   ```

7. One last thing. Feel free to customize these rules in your repository by overwriting them in the `.eslintrc` file or adding more rules that are necessary (or make more sense) for your codebase.

## Known issues
- If you can't use the automated script (because you already had the package in your repo), delete the `node_modules` folder from your repo and install this config package again!
```bash
# On your project's main folder (root folder), type - PLEASE BE CAREFUL WITH THIS RM COMMAND!!!!!
rm -rf node_modules

# Then, in the same main folder (root folder), install the project's dependencies again (since they should already be in package.json, just run the global npm install command)
npm i
```
