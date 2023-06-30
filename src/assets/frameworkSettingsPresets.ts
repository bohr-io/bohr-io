export default {
  "Angular": {
    "buildCommand": "ng build",
    "rootDirectory": "./",
    "outputDirectory": "./dist",
    "installCommand": "npm install",
    "developmentCommand": "ng serve --port $PORT"
  },
  "Astro": {
    "buildCommand": "npm run build",
    "rootDirectory": "./",
    "outputDirectory": "./dist",
    "installCommand": "npm install",
    "developmentCommand": "astro dev --port $PORT"
  },
  "Brunch": {
    "buildCommand": "brunch build --production",
    "rootDirectory": "./",
    "outputDirectory": "./public",
    "installCommand": "npm install",
    "developmentCommand": "brunch watch --server --port $PORT"
  },
  "Docusaurus": {
    "buildCommand": "npm run build",
    "rootDirectory": "./",
    "outputDirectory": "./build",
    "installCommand": "npm install",
    "developmentCommand": "docusaurus start --port $PORT"
  },
  "Eleventy": {
    "buildCommand": "npx @11ty/eleventy",
    "rootDirectory": "./",
    "outputDirectory": "./_site",
    "installCommand": "npm install",
    "developmentCommand": "npx @11ty/eleventy --serve --watch --port $PORT"
  },
  "Ember.js": {
    "buildCommand": "ember build",
    "rootDirectory": "./",
    "outputDirectory": "./dist",
    "installCommand": "npm install",
    "developmentCommand": "ember serve --port $PORT"
  },
  "Gatsby.js": {
    "buildCommand": "npx gatsby build",
    "rootDirectory": "./",
    "outputDirectory": "./public",
    "installCommand": "npm install",
    "developmentCommand": "npx gatsby develop --port $PORT"
  },
  "Gridsome": {
    "buildCommand": "gridsome build",
    "rootDirectory": "./",
    "outputDirectory": "./dist",
    "installCommand": "npm install",
    "developmentCommand": "gridsome develop -p $PORT"
  },
  "Hugo": {
    "buildCommand": "hugo",
    "rootDirectory": "./",
    "outputDirectory": "./public",
    "installCommand": "",
    "developmentCommand": "hugo server -D -w -p $PORT"
  },
  "Jekyll": {
    "buildCommand": "jekyll build",
    "rootDirectory": "./",
    "outputDirectory": "./_site",
    "installCommand": "npm install",
    "developmentCommand": "bundle exec jekyll serve --watch --port $PORT"
  },
  "Next.js": {
    "buildCommand": "next build && next export",
    "rootDirectory": "./",
    "outputDirectory": "./out",
    "installCommand": "npm install",
    "developmentCommand": "next dev --port $PORT"
  },
  "UmiJS": {
    "buildCommand": "umi build",
    "rootDirectory": "./",
    "outputDirectory": "./dist",
    "installCommand": "npm install",
    "developmentCommand": "umi dev --port $PORT"
  },
  "Vue.js": {
    "buildCommand": "npm run build",
    "rootDirectory": "./",
    "outputDirectory": "./public",
    "installCommand": "npm install",
    "developmentCommand": "vue-cli-service serve --port $PORT"
  }
}