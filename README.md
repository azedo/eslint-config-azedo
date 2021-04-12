# Eslint Config

Opinionated eslint defaults for js/node repositories. If you need to check the documentation in order to overwrite some rules in your repository, go to <https://eslint.org/docs/rules/> and have a look.

## How to use it?

1. If you don't already have a `package.json` file, create one with `npm init`.

2. Then you need to install the packages needed by the config

```bash
npx install-peerdeps --dev eslint-config-azedo
```

3. Now, if you have a look at your `package.json` file, you can see that it has a bunch of new packages under `devDependencies`

4. Next you need to import this config in your `.eslintrc` in order to use them. (The `react config` is enabled by default, but in case you want to use the `node config` just change the extends string to `eslint-config-azedo/node-config`)

```javascript
module.exports = {
  extends: ['eslint-config-azedo']
}
```

5. You can also use our automated script in order to create the `.eslintrs.js`, `.prettierrc.js` and `vscode/settings.json` files (they will not be replaced in case you already have them!)

```bash
# Run this on your project's main folder (root folder)
./node_modules/eslint-config-azedo/utils/setup.js

# You can also use the node command if you prefer (you don't need to!)
node node_modules/eslint-config-azedo/utils/setup.js
```

5. Lastly, don't forget to add a script in your `package.json` file to run these rules against your codebase.

```json
"scripts": {
   "lint": "eslint '*/**/*.{js,jsx,ts,tsx}' --fix"
}
```

6. **And that's it!** Now you should be able to run these rules whenever you want.

7. One suggestion is that you add the script above `lint` in your repo:
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

8. One last thing. Feel free to customize these rules in your repository by overwriting them in the `.eslintrc` file or adding more rules that are necessary (or make more sense) for your codebase.

## Known issues

- If you can't use the automated script (because you already had the package in your repo), delete the `node_modules` folder from your repo and install this config package again!

```bash
# On your project's main folder (root folder), type - PLEASE BE CAREFUL WITH THIS RM COMMAND!!!!!
rm -rf node_modules

# Then, in the same main folder (root folder), install the project's dependencies again (since they should already be in package.json, just run the global npm install command)
npm i
```
