# Materials and Shades

Model authors can provide customization access points by supplying **material** and **shade** information onto SVG elements.

* A material is the primary component of the svg shape; it can be thought of as the primary color given completely neutral lighting.
* A shade is a variation of the material given some additional context, such as lighting or position.

They are provided on an SVG with the `carica:material` and `carica:shade` attributes respectively:

```xml
<path
  carica:material="hair"
  carica:shade="dark"
  d="" />
```

## Rational

The material/shade data has two main goals:

* Provide a model author the ability to express _what_ certain shapes are...
* ...so that developers can customize in terms of those identities rather than the low-level shapes.

Multiple parts on a single carica might represent hair, such as an eyebrow and a beard. Rather than customize each part individually, it would be nice if one could instead customize "hair", and all shapes whose material is "hair" take on those characteristics.

The existence of "shade" allows for the customization of all shapes with a particular shade independent of the material.

Finally, this is better than directly defining CSS variables in the form of `var(--css-variable-name)` directly in the SVG since doing so can be unintuitive and difficult for model authors in their tools.

## Inheritance

Material and shade are inherited from parent elements if specified. For example:

```xml
<g carica:material="iris">
  <path d="" />
  <path carica:shade="dark" d="" />
</g>
```

In this case, both `path` elements inherit the "iris" material from the `g` element. Only the second `path` has the "dark" shade.

Inheritance makes it simpler for model authors to specify a material for a set of shapes, rather than having to do so for each individual shape, of which there may be many.

## Customization Options

For use in Carica, materials and shades can be customized in three different ways.

Color attributes of the form `color-*` on carica elements directly declaratively specify the colors of materials and shades.

```html
<carica-character color-hair="red"></carica-character>
```

* `color-*` was chosen since materials can take on any name. In a way, this mirrors the way `data-*` attributes are defined.
* `color-{material}-{shade}` in particular was chosen for ease of use, as opposed to introducing an underscore somewhere in the name or squishing everything into one word.

Materials and shades are set as CSS variables, and can therefore be customized that way.

```css
carica-character {
    --color-hair: red;
}
```

* `--color-{material}-{shade}` is used to match the attribute format, for consistency.
* The word "color" is used, as opposed to "fill", to decouple the variable from its implementation details.

Finally, each material is specified as a part and can be selected for in CSS. Parts offer the greatest degree of flexibility, allowing developers to adjust any aspect of a shape with the provided material.

```css
::part(hair-material dark-shade) {
    fill: darkred;
}
```

* `{name}-{type}` allows these names not to potentially conflict with similar names of other potential shape data, such as layers.

## No Standard Materials

There are deliberately no defined standard materials and/or shades. This grants model authors the greatest latitude in determining the level of detail in their models.
