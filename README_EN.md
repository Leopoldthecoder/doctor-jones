# Doctor Jones
> After all, we should all respect [w3c/clreq](https://github.com/w3c/clreq)

[中文文档](./README.md)

`doctor-jones` is a tool set designed for formatting Chinese texts, especially when mixed with Western texts, based on [w3c/clreq](https://github.com/w3c/clreq) and other best practices.

Here "formatting" means:

* Adding a halfwidth space between a Chinese character and an alphabet / number
* Removing unnecessary halfwidth space between a fullwidth punctuation and an alphabet / number
* Replacing halfwidth punctuations with fullwidth ones
* Replacing quotation marks `“”` `‘’` with `「」` `『』`
* Normalizing ellipses to `……`
* Removing successive exclamation marks
* Replacing fullwidth brackets around numbers with halfwidth ones

Note that these formats only take effects on texts with at least one Chines character. And all the above formats can be turned off using options.

As a tool set, `doctor-jones` includes:

* [ ] An `npm` package which takes a string and returns the formatted output (almost done)
* [ ] A `webpack` loader which formats your string literals in `.js`, `.ts`, `.jsx`, `.tsx`, `.vue` files (WIP🚧)
* [ ] A ready-to-use website where you can paste some text and get the formatted output, aka. `doctor-jones-as-a-service`, or `DJAAS` (in plan)
* [ ] A `vscode` plugin and a `WebStorm` plugin which format your code on save (in plan)

Currently this project is in a very early stage.
