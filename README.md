# Bootstrap Stylist

The main purpose of this project is to provide easy way to re-skin [Twitter Bootstrap](http://www.getbootstrap.com) elements. To achieve this **Bootstrap Stylist** will generate a single HTML page with all the visually important Bootstrap elements. After opening `public/index.html` (default page including all elements) in your browser it will be automatically updated with **Live Reload** every time you will change the Bootstrap styles.

## Description

It is based on usage of [Grunt](http://gruntjs.com/) tasks. The external libraries are fetched by [Bower](http://sindresorhus.com/bower-components/) first. All the Bootstrap elements are written in [Jade](http://jade-lang.com/) as separate files so it will be easy to include only elements you want to see. You can also very easily create new HTML pages with different element sets. After running `grunt` it will watch Bootstrap [LESS](http://lesscss.org/) files (also Jade templates) and after a change will be defected it will recompile your assets and it will also automatically reload your page opened in a browser. Finally after you will be happy with your changes you can run the `grunt release` task and Bootstrap Stylist will create the same zip package as you would normally get if you would download the Bootstrap from original site. It will also include the `stylist_sheet.html` with the elements overview - the CSS and JavaScript are embedded into the HTML and the background images are converted to base64. You can check an example in the `example` folder.

## How to use it

This tool requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this tool with this command:

```shell
npm install
```

Once the plugins have been successfully installed, you can run following command to start:

```shell
grunt
```

The **Twitter Bootstrap** `LESS` files are located in:

```shell
assets/less/bootstrap
```

Each element exists as a separate `Jade` template in:

```shell
assets/jade/fragments
```

If you want to create new elements page the easiest way is to copy the `assets/jade/index.jade` and then change it. After you ran `grunt` task it will crete the new HTML file with the same name as you `jade` file in the `public` folder.

To release your custom Bootstrap package run:

```shell
grunt release
```

Your new zip package will be placed in `release` folder. The timestamp will be automatically added to the archive name.

## Credits

Bootstrap Stylist is a project by **Michal Srch**.