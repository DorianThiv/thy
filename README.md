# THY Angular Lib.

Personnal library.

Will improve as NPM package.

## Create Angular project

``` ng new <appName> --directory=client --style=scss --skip-git=true ```

## Add as submodule

``` git submodule add https://github.com/DorianThiv/thy.git ```

## Required modules

``` npm install @angular/cdk @angular/material angular-split file-saver highcharts highcharts-angular material-design-icons ngx-color-picker xml-js @progress/kendo-angular-intl  ```

* `angular-split`
* `file-saver`
* `highcharts`
* `highcharts-angular`
* `material-design-icons`
* `ngx-color-picker`
* `xml-js`
* `@progress/kendo-angular-intl`

## Style

Add this line style import to `style.scss` : 

``` @import 'src/app/shared/thy/thy-styles/thy-style.scss'; ```

In `angular.json` add styles.

```
"styles": [
    "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
    "node_modules/material-design-icons/iconfont/material-icons.css",
    "src/styles.scss"
],
```


