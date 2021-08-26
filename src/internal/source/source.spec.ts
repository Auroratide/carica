import { expect } from '@open-wc/testing'
import { CaricaSource } from './CaricaSource'
import { ExternalSource } from './ExternalSource'
import { InvalidSource } from './InvalidSource'
import { MissingSource } from './MissingSource'
import { StaticSource } from './StaticSource'

const expectRejection = (message: string, promise: Promise<any>) =>
    promise
        .then(() => {
            throw new Error('Promise was fulfilled when it should have been rejected.')
        }).catch((reason: Error) => {
            expect(reason.message).to.contain(message)
        })

const directory = () => {
    if (typeof __dirname === 'undefined') {
        // This is an implementation detail of WTR used to dynamically get file locations
        // The purpose is to allow this file to be refactored and moved without needing
        // to change internal constants, but obviously there is a risk this config
        // can disappear in the future.
        const file: string = (window as any).__WTR_CONFIG__.testFile
        return file.substring(0, file.lastIndexOf('/'))
    } else {
        return __dirname
    }
}

const TEST_SVG = `${directory()}/testing.svg`
const MISSING_SVG = `${directory()}/missing.svg`
const NOT_AN_SVG = `${directory()}/not-an-svg.js`

const cases = (name: string, c: {[caseName: string]: () => Promise<CaricaSource>}, test: (source: CaricaSource) => Promise<any>) => {
    Object.entries(c).forEach(([caseName, source]) => {
        it(`${name} (${caseName})`, async () => {
            return test(await source())
        })
    })
}

describe('source', () => {

    cases('resource exists', {

        static: async () => {
            const svgContents = await fetch(TEST_SVG).then(res => res.text())
            const template = document.createElement('template')
            template.innerHTML = svgContents
            return new StaticSource(template)
        },

        external: async () => new ExternalSource(TEST_SVG),

    }, async (source: CaricaSource) => {
        const result = await source.get()

        expect(result?.firstElementChild?.getAttribute('viewBox')).to.equal('0 0 1 2')
    })

    cases('resource does not exist', {

        static: async () => new MissingSource(),

        external: async () => new ExternalSource(MISSING_SVG),
        
    }, async (source: CaricaSource) => {
        return expectRejection('Not Found', source.get())
    })

    cases('resource not an svg', {

        static: async () => new InvalidSource(),

        external: async () => new ExternalSource(NOT_AN_SVG),
        
    }, async (source: CaricaSource) => {
        return expectRejection('Invalid Type', source.get())
    })

})