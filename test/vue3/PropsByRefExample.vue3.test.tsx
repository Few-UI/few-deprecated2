/* eslint-env jest */

import {
    wait,
    setupComponentTest,
    getSupportedFrameworks
} from '../utils';

import Component from '../components/PropByRefExample';

const createApp = getSupportedFrameworks().vue3;

describe( 'Test property by ref in react', () => {
    const fixture = setupComponentTest( true );
    it( 'Test property by ref in react', async() => {
        const containerElem = fixture.container;
        fixture.app = createApp( Component ).mount( containerElem );
        expect( containerElem.innerHTML ).toEqual( [
            '<div>X: 0, Y: 0</div>',
            '<button id="clickOnSub">+1 in Stateful Component</button>',
            '<div>X: 0, Y: 0</div>',
            '<button id="clickOnParent">+1 in Stateless Component</button>'
        ].join( '' ) );

        // In react, clickOnSub only update UI on Sub
        const buttonOnSub = document.getElementById( 'clickOnSub' );
        buttonOnSub.click();
        await wait();
        expect( containerElem.innerHTML ).toEqual( [
            '<div>X: 1, Y: 0</div>',
            '<button id="clickOnSub">+1 in Stateful Component</button>',
            '<div>X: 1, Y: 0</div>',
            '<button id="clickOnParent">+1 in Stateless Component</button>'
        ].join( '' ) );

        // In react, clickOnParent only update all instead of last one implicitly by ref
        const buttonOnParent = document.getElementById( 'clickOnParent' );
        buttonOnParent.click();
        await wait();
        expect( containerElem.innerHTML ).toEqual( [
            '<div>X: 2, Y: 0</div>',
            '<button id="clickOnSub">+1 in Stateful Component</button>',
            '<div>X: 2, Y: 0</div>',
            '<button id="clickOnParent">+1 in Stateless Component</button>'
        ].join( '' ) );
    } );
} );
