/* eslint-env jest */

import {
    wait,
    setupComponentTest,
    getSupportedFrameworks
} from './utils';
import SyncActionExample from './components/SyncActionExample';

const createApp = getSupportedFrameworks().vue3;

describe( 'vue3 features', () => {
    const fixture = setupComponentTest();

    // not sure how vue still supports reactivity when dom node is not attached on document???
    it( 'SyncActionExample (vue with invalid setup)', async() => {
        const containerElem = fixture.container;
        fixture.app = createApp( SyncActionExample ).mount( containerElem );
        expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 7</div><button>+1</button></div>' );

        const buttonElem = containerElem.getElementsByTagName( 'button' )[0];
        buttonElem.click();
        await wait();

        expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 8</div><button>+1</button></div>' );
    } );
} );

