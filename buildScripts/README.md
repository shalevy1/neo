# Command-Line Interface
In case you want to create an App (workspace) based on neo.mjs, you don't need to clone this repository.</br>
Please take a look at the <a href="https://github.com/neomjs/create-app">create-app repository</a> (npx neo-app).

This guide explains the different scripts (programs) which are included inside the
<a href="../package.json">package.json</a>.</br>
They are important for working on the framework code base.

You can run each script inside your terminal. E.g.:
> npm run build-all

Make sure to call them on the top-level folder (the one containing the package.json).

In case you want to pass program options, please use the node based calls instead. E.g.:
> node ./buildScripts/buildAll.js -h

All programs which are using options also have the visual inquirer interface in place.</br>
So it is up to you if you prefer adding the options manually (e.g. for adding them into your own CI),</br>
or selecting them without memorising the shortcuts.

You will notice that most programs are using the -f (framework) option here.
The reason is that you can call them inside your neo.mjs workspaces as well,
where the framework is included as a node module, but needs to deploy to a top-level dist folder.

## Content
1. <a href="#build-all">build-all</a>
2. <a href="#build-all-questions">build-all-questions</a>
3. <a href="#build-my-apps">build-my-apps</a>
4. <a href="#build-themes">build-themes</a>
5. <a href="#build-threads">build-threads</a>
6. <a href="#create-app">create-app</a>
7. <a href="#generate-docs-json">generate-docs-json</a>
8. <a href="#server-start">server-start</a>

## build-all
> node ./buildScripts/buildAll.js -f -n

It is strongly recommended to run this program after each git pull on this repo.

```
Options:
  -V, --version            output the version number
  -i, --info               print environment debug info
  -e, --env <name>         "all", "dev", "prod"
  -l, --npminstall <name>  "yes", "no"
  -f, --framework          
  -n, --noquestions        
  -p, --parsedocs <name>   "yes", "no"
  -t, --themes <name>      "yes", "no"
  -w, --threads <name>     "yes", "no"
  -h, --help               display help for command
```

The build-all program is using the -n (noquestions) option.
Take a look at the next section for details on those.

1. The program starts with a npm install(-l option).
2. It builds the themes next (-t option) => <a href="#build-themes">build-themes</a>.
3. It builds the threads (-w option) => <a href="#build-threads">build-threads</a>.</br>
(-w is a shortcut for "workers", since -t was already taken.)
4. It parses the docs comments (-p option) => <a href="#generate-docs-json">generate-docs-json</a>.

You can disable each step using the program options.

build-all will delegate the env, framework & noquestions options to build-themes & build-threads.

You can use the -e (environment) option in case you want to limit the build either to dist/development
or dist/production. 

Source code: <a href="./buildAll.js">build-all</a>

## build-all-questions
> node ./buildScripts/buildAll.js -f

This entry point is running the build-all program without passing options,
so we can select them using the inquirer interface.

Let us take a look at the different steps.

1. We pick the -l option:
<img src="https://raw.githubusercontent.com/neomjs/pages/master/resources/images/guides/buildAll_1.png">
2. We pick the -e option:
<img src="https://raw.githubusercontent.com/neomjs/pages/master/resources/images/guides/buildAll_2.png">
3. We pick the -t option:
<img src="https://raw.githubusercontent.com/neomjs/pages/master/resources/images/guides/buildAll_3.png">
4. We pick the -w option:
<img src="https://raw.githubusercontent.com/neomjs/pages/master/resources/images/guides/buildAll_4.png">
5. We pick the -p option:
<img src="https://raw.githubusercontent.com/neomjs/pages/master/resources/images/guides/buildAll_5.png">

## build-my-apps
> node ./buildScripts/webpack/buildMyApps.js -f

```
Options:
  -V, --version      output the version number
  -i, --info         print environment debug info
  -a, --apps <name>  "all", "Covid", "RealWorld", "RealWorld2", "SharedCovid", "SharedCovidChart", "SharedCovidGallery",
                     "SharedCovidHelix", "SharedCovidMap", "SharedDialog", "SharedDialog2", "Website"
  -e, --env <name>   "all", "dev", "prod"
  -f, --framework    
  -n, --noquestions  
  -h, --help         display help for command
```

Source code: <a href="./webpack/buildMyApps.js">build-my-apps</a>

## build-themes
> node ./buildScripts/webpack/buildThemes.js -f

```
Options:
  -V, --version         output the version number
  -i, --info            print environment debug info
  -c, --cssVars <name>  "all", "true", "false"
  -e, --env <name>      "all", "dev", "prod"
  -f, --framework       
  -n, --noquestions     
  -t, --themes <name>   "all", "dark", "light"
  -h, --help            display help for command
```

Source code: <a href="./webpack/buildThemes.js">build-themes</a>

## build-threads
> node ./buildScripts/webpack/buildThreads.js -f

```
Options:
  -V, --version         output the version number
  -i, --info            print environment debug info
  -e, --env <name>      "all", "dev", "prod"
  -f, --framework       
  -n, --noquestions     
  -t, --threads <name>  "all", "app", "data", "main", "vdom"
  -h, --help            display help for command
```

Source code: <a href="./webpack/buildThreads.js">build-threads</a>

## create-app
> node ./buildScripts/createApp.js

```
Options:
  -V, --version                  output the version number
  -i, --info                     print environment debug info
  -a, --appName <name>           
  -m, --mainThreadAddons <name>  Comma separated list of AmCharts, AnalyticsByGoogle, HighlightJS, LocalStorage,
                                 MapboxGL, Markdown, Siesta, Stylesheet.
                                 Defaults to Stylesheet
  -t, --themes <name>            "all", "dark", "light"
  -u, --useSharedWorkers <name>  "yes", "no"
  -h, --help                     display help for command
```

Source code: <a href="./buildScripts/createApp.js">create-app</a>

## generate-docs-json
> node ./buildScripts/docs/jsdocx.js

Source code: <a href="./docs/jsdocx.js">generate-docs-json</a>

## server-start
> webpack-dev-server --open