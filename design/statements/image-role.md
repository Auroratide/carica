# Image Role

Carica entities are images. An entire entity, even if composed of sub-entities, can be thought of as one visual unit with a distinct label.

```html
<carica-character alt="Replacement text."></carica-character>
```

This design statement is in service to accessibility. Most people will process a Carica as one object, and so assistive technologies should do so as well. Developers can therefore provide a textual alternative in much the same way as they can with an `img` element.

* If sub-entities also define alternative text, only the topmost will be considered for labeling. This provides developers the greatest control over how a carica is read by assistive technology.
* If alt text is not defined, then the carica is considered a decorative image and will remain unlabeled.

## Implementation

Carica entities should be assigned the [`img` ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Role_Img), unless specified otherwise by the developer. Alt text will be set into `aria-label`.

Although the HTML Standard has provision for [Element Internals](https://html.spec.whatwg.org/#element-internals), allowing custom elements to have intrinsic semantics, it is not implemented consistently across browsers nor interpretted consistently across assistive technologies.

## Not the `figure` role

The [figure role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Figure_Role) was not chosen since the internals of a carica entity are not always important for understanding the entity as a whole. The primary difference between `img` and `figure` is whether such internals are important, and hence `img` was chosen.

Practically, screen readers will dive into each sub-entity of an entity when the `figure` role is used, which can be incredibly verbose. Such details are likely only necessary when actually building a carica with an editor, in which case the developer can manually supply the role.
