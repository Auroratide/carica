# Named Colors

People tend to share a set of common colors. These common colors can be specified in the color attributes to quickly provide a decent color scheme when full customization is not required.

```html
<carica-character color-hair="hair:blonde"></carica-character>
```

Named colors are identified by the presence of a colon in the name.

## Standard Colors

Standard colors are provided for skin, hair, and eyes, since these materials are nearly universal amongst humans.

### Skin

Provided skin colors are based on the [Fitzpatrick Scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale). The scale focuses on cancer risk due to the presence of absence of melanin and has good modern usage.

The alternative [Von Luschan Scale](https://en.wikipedia.org/wiki/Von_Luschan%27s_chromatic_scale) has many more shades specified, but has been deemed superceded by the Fitzpatrick scale.

* `skin:tone-1`
* `skin:tone-2`
* `skin:tone-3`
* `skin:tone-4`
* `skin:tone-5`
* `skin:tone-6`

### Hair

Provided hair colors are based on colloquially broad categories.

* `hair:black`
* `hair:brown`
* `hair:auburn`
* `hair:red`
* `hair:blonde`
* `hair:grey`
* `hair:white`

### Eyes

Provided eye colors are based on colloquially broad categories.

Although the [Martin-Schultz Scale](https://en.wikipedia.org/wiki/Martin%E2%80%93Schultz_scale) ranks colors from 1-16 based on color, it is too fine-grained for Carica's needs. The approximate Martin-Schultz scale numbers are provided below for some reference.

* `eyes:blue` (1, 2)
* `eyes:grey` (3, 4, 5)
* `eyes:green` (6, 7, 8)
* `eyes:hazel` (9)
* `eyes:amber` (10, 11)
* `eyes:brown` (12, 13)
* `eyes:black` (14, 15, 16)

## Mechanism

A named color applies color to a material and some of its common shades in order to simplify the usage.

Named colors work using CSS variables of the following format:

```
--named-{name}-{shade}
```

This format allows a named color to apply to different shades, and it further allows developers/authors to define their own color schemes.

## Custom Colors

Developers and authors are able to define their own colors through CSS variables using the mechanism as described.

## Implementation Notes

Predefined colors **must** contain a colon in the name. This is to prevent collision with HTML's standard colors.
