import { expect } from '@open-wc/testing'
import { SvgResource } from './SvgResource'
import { FetchSvgResource } from './FetchSvgResource'
import { InMemorySvgResource } from './InMemorySvgResource'

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

const withInMemory = (tests: (createResource: () => Promise<SvgResource>) => void) => {
    tests(async () => {
        const resource = new InMemorySvgResource()

        const svgContents = await fetch(TEST_SVG).then(res => res.text())
        const template = document.createElement('template')
        template.innerHTML = svgContents
        resource.add(TEST_SVG, template)

        resource.add(NOT_AN_SVG, document.createElement('template'))

        return resource
    })
}

const withFetch = (tests: (createResource: () => Promise<SvgResource>) => void) => {    
    tests(async () => {
        return new FetchSvgResource()
    })
}

describe('SvgResource', () => {
    const tests = (createResource: () => Promise<SvgResource>) => {
        it('resource exists', async () => {
            const resource = await createResource()

            const result = await resource.svg(TEST_SVG)
            expect(result.getAttribute('viewBox')).to.equal('0 0 1 2')
        })

        it('resource does not exist', async () => {
            const resource = await createResource()

            return expectRejection('Not Found', resource.svg(MISSING_SVG))
        })

        it('resource not an svg', async () => {
            const resource = await createResource()

            return expectRejection('Invalid Type', resource.svg(NOT_AN_SVG))
        })
    }

    describe('in memory', () => withInMemory(tests))
    describe('fetch', () => withFetch(tests))
})
