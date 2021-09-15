# Transform Attributes

Translations, rotations, and scale can be applied as attributes to an entity.

```html
<carica-mouth translate-x="10" scale="2" rotation="15deg" />
```

## Attributes

* `translate-x`
* `translate-y`
* `scale`
* `scale-x`
* `scale-y`
* `rotation`

Separate translation properties allow programmatic animations to not require parsing. Scale has a non-suffixed version to represent that the x and y scales are the same.

## Units

By default, units are in percentage (%) placed on each `svg` layer.

* Percentage units are consistent across scales and across view boxes.
* Placement on the `svg` layer allows the use of other CSS units if desired.

## Inheritance

A transform applies to the entity and all the entity's children. In the following example:

```html
<carica-head translate-x="10">
    <carica-hair translate-x="5" />
</carica-head>
```

The hair has a total translation of 15%, 10 from the head and 5 from itself. This model is consistent with transforms on parent-child relations in other contexts, including HTML itself.

### Mechanism

Child elements must be notified when parent element transforms are modified. This should be done from parent-to-child rather than child-from-parent for both performance and algorithmic simplicity.

## CSS Transform Property

Due to the layering strategy, direct utilization of the CSS transform property is discourged. CSS such as the below:

```css
carica-head {
    transform: rotate(20deg);
}
```

Turns the head into its own [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context). As a new stacking context, all `z-index` values within the head become localized to the head.

The consequence is if the head has hair that's supposed to be behind the body and more hair in front of the body, then either both instances will become in front of the body or both will be moved behind.

Therefore, the `transform` CSS property can **only** be applied to the layers defining `z-index`, which is in the shadow dom and therefore inaccessible. It was considered to grant these elements a shadow part:

```css
carica-head::part(transform) {
    transform: rotate(20deg);
}
```

But this has a major problem: Child transformations override parent transformations, which makes stacking transformations painful.

A solution is to provide a new `g` element for each layer in the hierarchy:

* `head`
  * `shadow`
    * `g` - head
  * `hair`
    * `shadow`
      * `g` - head
        * `g` - hair

For which the problem becomes coming up with a reasonable part name for each g-layer so they do not conflict. The simplest approach is to handle this with the attributes and animate with Javascript.
