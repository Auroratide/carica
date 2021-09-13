# Carica

**Carica** lets you embed characters into web pages! This library provides a number of semantic elements that help build interesting people from scratch. This can be useful for:

* Providing illustrations for colorfully teaching interesting topics
* Animating stories you have always wanted to tell
* Creating concept art for roleplaying games
* And many other things. Let your creativity run free!

## Disclaimer!

Carica is in its early phases (prior to version 1.0), and as such many things are subject to change. The goal is to define a set of standards that are flexible and intuitive as possible, granting the greatest sense of ease for both creating new Caricas and the models that compose them.

## A Quick Example

This image of Janet...

<img src="example-library/janet.svg" alt="A girl with brown hair and blue eyes."  height="256" />

...was made using this HTML:

```html
<carica-character class="janet" alt="A girl with brown hair and blue eyes."
  color-skin="#fff0e0"
  color-hair="#cb803f" color-hair-dark="#8e5225"
  color-iris="#2d5e94"
>
  <carica-head>
    <carica-hair src="hair/medium.svg"></carica-hair>
    <carica-eyes src="eyes/neutral.svg"></carica-eyes>
    <carica-eyebrows src="eyebrows/neutral.svg"></carica-eyebrows>
    <carica-eyelashes src="eyelashes/neutral.svg"></carica-eyelashes>
    <carica-mouth src="mouths/smile.svg"></carica-mouth>
  </carica-head>
</carica-character>
```

## Installation

You can import Carica through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/carica/lib/define.js"></script>
```

Or, you may install Carica through NPM and include it as part of your build process:

```
npm i @auroratide/carica
```

```js
import '@auroratide/carica/lib/define.js`
```

## Using Carica

Carica is basically a collection of custom HTML elements.

Each element takes a **`src`** attribute indicating what actual model to draw to the screen.

```html
<carica-hair src="hair/medium.svg"></carica-hair>
```

You can then customize the colors of that SVG's materials using **`color-*`** attributes. This is covered in greater detail below (see [Customizing Colors](#customizing-colors)), but for now since we know the hair SVG is composed of the "hair" material, we can change the color with `color-hair`:

```html
<carica-hair color-hair="red" src="hair/medium.svg"></carica-hair>
```

And finally, to make the shape accessible to everyone, the **`alt`** attribute is used to provide a textual representation.

```html
<carica-hair alt="red medium-length hair" color-hair="red" src="hair/medium.svg"></carica-hair>
```

Building a Carica is as simple as assembling the different parts together and putting them under a single `carica-character` element!

```html
<carica-character alt="A girl with red hair">
  <carica-hair alt="red medium-length hair" color-hair="red" src="hair/medium.svg"></carica-hair>
</carica-character>
```

### Available Tags

**`<carica-entity />`** is the most basic tag available and represents any visible model. All other tags are based off `<carica-entity />` but carry more semantic value:

* **`<carica-character />`**: Represents a character such as a person; generally should contain all the parts belonging to a single character
* **`<carica-head />`**: Represents the head of a character; generally should contain all the parts of a head, including hair and facial expressions
* **`<carica-hair />`**: Represents hair on a character, including the hair on top of the head or even facial hair
* **`<carica-mouth />`**: Represents a character's mouth
* **`<carica-eyes />**: Represents the eyes of a character
* **`<carica-eyebrows />`**: Represents the eyebrows above a character's eyes
* **`<carica-eyelashes />`**: Represents eyelashes on a character's eyes, if any

Technically, all tags are _optional_ on a carica; for instance, a carica which does not have pronounced eyelashes does not need to specify a `<carica-eyelashes />` element.

Since all the above tags are entites, they all share the same attributes:

* **`src`**: The source SVG model to use; only `carica-head` has a default model
* **`alt`**: The textual replacement for a carica, mostly useful for assistive technologies
* **`color-*`**: A flexible set of attributes allowing you to define colors in-line; see [Customizing Colors](#customizing-colors)

### Customizing Colors

Each carica model is composed shapes, and each shape defines a **material** and a **shade**.

* The **material** of a shape is its primary composition, and can be thought of as the shape's main color.
* The **shade** is a variation of the material, such as "dark", or "light". A shape which does not specify a shade just uses the material's base color.

A single model can have shapes of different materials within it. For example, hair models usually just consist of shapes with the "hair" material, but it's possible for a hair model to have an in-built bow with material "hairbow" or "clothing".

<small>Unfortunately, at the moment the only way to know what materials compose a model is to look at the model's source code.</small>

The primary way to customize colors is through the inline `color-*` attributes. The asterisk is replaced with the material and shade you want to customize. Some examples:

* `color-hair="red"` makes all shapes with the `hair` material red.
* `color-skin="brown"` makes all shapes with the `skin` material brown.
* `color-hair-dark="darkred"` makes all shapes with the `hair` material and `dark` shade a dark red color.

It is also possible to use CSS to customize colors. Each material/shade combo is exposed as a CSS variable and as shadow parts. The following two CSS definitions will make dark hair into a dark red color.

```css
.janet carica-hair {
  --color-hair-dark: darkred;
}

.janet ::part(hair dark) {
  fill: darkred;
}
```

### Carica Models

The `src` attribute lets you specify SVGs for the parts, but... what SVGs do you use?

At the moment there are very few models available, but the intent is to design the library in such a way that authoring new reusable models is easy.

For now, the only models that exist can be found here:

* [Auroratide Carica Models](https://github.com/Auroratide/carica-models)

## Authoring New Carica Models

It's honestly a bit early to author new models, as the details of how it should be done are still subject to change.

At the moment, [Auroratide Carica Models](https://github.com/Auroratide/carica-models) can be used as examples for how models may look. The important notes are:

* Each model should define the Carica namespace:
```xml
<svg ... xmlns:carica="https://auroratide.com/carica">
```
* Layers are defined with `carica:layer`.
* Material and shade are defined with `carica:material` and `carica:shade` respectively.
