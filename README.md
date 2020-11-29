# Eslint Config

Opinionated eslint defaults for js/node repositories. If you need to check the documentation in order to overwrite some rules in your repository, go to https://eslint.org/docs/rules/ and have a look.

## How to use it?

1. Add the config as a `devDependency` package of your repo in your `package.json` file.
```json
{
   "devDependencies": {
      "@fcg/eslint-config": "git+http://assets_git:as_rani_ablaze_bad_terrible@git.frontiercargroup.org/eduardo/eslint-config"
   }
}
```

2. Install all the other dependencies for this config project.
```bash
npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier
```

*Check the current versions in the package.json file*

3. You need to import this config in your `.eslintrc` to enable them.
```javascript
module.exports = {
  extends: ['@fcg/eslint-config']
}
```

4. Don't forget to add a script in your `package.json` file to run these rules against your codebase.
```json
"scripts": {
   "lint": "eslint '*/**/*.{js,ts,tsx}' --fix"
}
```

5. That's it. Now you should be able to run these rules whenever you want.

6. One suggestion is that you add the scrpt above `lint` in your repo:
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
