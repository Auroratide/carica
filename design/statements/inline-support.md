# Inline Support

Carica can be used entirely inline, with no dependence on the rest of the document or an external context.

```html
<carica-head>
  <carica-hair src="https://some.cdn/long.svg" />
  <carica-mouth src="https://some.cdn/smile.svg" />
</carica-head>
```

This is meant to be the simplest way to use Carica and the easiest way to get started. Additionally, it follows the design of native HTML elements which are self-contained by default.

## Mechanisms

**Model sources can be provided directly to the element as an attribute.** Semantically, doing so is a declaration by the developer that "the model at `smile.svg` is a mouth".

**Colors can be provided directly to the element as an attribute.** Although other mechanisms may exist for customizing colors, such as via CSS or the `style` attribute, doing so through new attributes confers some benefits:

* Attributes provide _semantic opportunity_, e.g. "This character has red hair".
* Attributes are an _abstraction_ over the implementation, meaning it does not matter if under the hood the color is a CSS variable, an SVG fill, or a PNG filter.
* Attributes do not require inherent understanding of HTML, and can therefore be described in XML documents.
