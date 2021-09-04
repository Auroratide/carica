import 'https://unpkg.com/prismjs@v1.24/components/prism-core.min.js'
import 'https://unpkg.com/prismjs@v1.24/components/prism-markup.js'

const template = document.createElement('template')
template.innerHTML = `
    <style>
        * {
            box-sizing: border-box;
        }

        :host {
            display: grid;
            grid-template-columns: 100%;
            grid-gap: 1rem;
            align-items: flex-start;
        }

        figure {
            position: relative;
            background-color: #ffffff;
            margin: 0 auto;
            width: 100%;
            max-width: 20rem;
            /* aspect-ratio: 1; Not supported in safari */
        }

        figure::before {
            /* force 1:1 aspect ratio */
            content: '';
            float: left;
            padding-top: 100%;
        }

        code {
            font-family: var(--code-font);
        }

        pre {
            flex: 1;
            overflow: auto;
            margin: 0;
        }

        pre code {
            display: block;
            line-height: 1.5em;
            border: 0.0625rem solid hsl(var(--color-primary));
            border-left-width: 0.375rem;
            padding: 0 1em;
            overflow: auto;
            background: var(--color-fg);
            background-image: linear-gradient(transparent 50%, hsla(var(--color-primary), 0.06) 50%);
            background-size: 3em 3em;
            border-radius: 0;
        }

        .token.tag {
            color: var(--code-tagname);
        }

        .token.attr-name {
            color: var(--code-keyword);
        }

        .token.attr-value,
        .token.attr-value .punctuation:not(.attr-equals) {
            color: var(--code-string);
        }

        .token.punctuation {
            color: var(--code-base);
        }

        @media screen and (min-width: 50rem) {
            :host {
                grid-template-columns: 25rem 1fr;
            }

            figure {
                max-width: none;
            }
        }
    </style>

    <slot name="template"></slot>
    <figure></figure>
    <pre><code></code></pre>
`

export class CaricaDemo extends HTMLElement {
    static elementName = 'carica-demo'

    constructor() {
        super()

        this
            .attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const code = this.shadowRoot.querySelector('slot[name="template"]').assignedNodes()[0]
        const formattedCode = window.Prism.highlight(this._unindent(code.innerHTML), window.Prism.languages.markup, 'markup')

        this.shadowRoot.querySelector('figure').appendChild(code.content.cloneNode(true))
        this.shadowRoot.querySelector('code').innerHTML = formattedCode
    }

    _unindent = (code) => {
        const lines = code.split('\n')
        if (lines[0].match(/^\s*$/))
            lines.shift()
        if (lines[lines.length - 1].match(/^\s*$/))
            lines.pop()
        
        const indentSize = lines[0].match(/^\s*/)[0].length
        
        return lines.map(line => line.substring(indentSize)).join('\n')
    }
}

window.customElements.define(CaricaDemo.elementName, CaricaDemo)
