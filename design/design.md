# Carica Design Documentation

Carica is a set of custom HTML elements for constructing expressive characters from different primitive models.

More technically, Carica is an XML **[domain specific language](https://www.martinfowler.com/dsl.html)** (DSL), with a domain centered on the decomposition of person-features into modular components. As a DSL, design and architecture are highly important in order to achieve the following goals:

* **Accuracy**: Carica's model of the domain should align with most people's own mental models.
* **Ease**: The easiest way to use Carica should be the right way to use Carica. This is often called the [Pit of Success](https://blog.codinghorror.com/falling-into-the-pit-of-success/).
* **Flexibility**: Common use should be easy, and advanced use should be possible. The design should accommodate many unforeseen usage scenarios while remaining firmly within its domain.
* **Growth**: As knowledge of Carica's usage expands, so will its features. As such, Carica should be built to account for its future evolution.

The documents in this folder represent design statements and opportunities over time, for the effect of creating intent behind decisions then and upcoming.

## Principles

Design is grounded in principles.

### Every element and attribute carries semantic value

The [HTML Living Standard](https://html.spec.whatwg.org/#semantics-2) makes it clear that its elements and attributes carry semantic value.

<blockquote cite="https://html.spec.whatwg.org/#semantics-2">
  <p>Elements, attributes, and attribute values in HTML are defined (by this specification) to have certain meanings (semantics).</p>
  <p>These definitions allow HTML processors, such as web browsers or search engines, to present and use documents and applications in a wide variety of contexts that the author might not have considered.</p>
</blockquote>

Doing so has allowed tools such as Assistive Technologies to present documents in more useful ways than just straight text could. Semantics are therefore important for far more than just presentation.

It is Carica's opinion that the purpose of [custom elements](https://html.spec.whatwg.org/#custom-elements) is to **create new semantics** not available in native HTML, moreso than to create bundles of functionality.

### Caricas are accessible by default

[Accessibility is important](https://webaim.org/intro/). Rather than thinking of accessibility as catering to people with disabilities, it is better to think of it as making something available to everyone regardless of ability.

"Accessible by default" means building Carica in such a way that in the absence of any other accessibility practices, a Carica presents itself correctly to as many forms of web access as possible; a Carica on a web page should certainly not create problems for these technologies.

### Authoring models can be done with common tools

Another dimension to Carica is the ability for artists to create new basic models for developers to use. Crucially, it is important to recognize that artists are not necessarily developers, nor are developers necessarily artists.

As such, drawing new models should be entirely possible without touching a single line of code. Common tools, such as Inkscape, should be sufficient for authoring all the aspects necessarily for a model to work within Carica's framework.