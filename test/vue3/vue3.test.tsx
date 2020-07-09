/* eslint-env jest */

import {
    Model
} from '@/types';

import {
    wait,
    setupComponentTest,
    getSupportedFrameworks
} from '../utils';

import SyncActionExample from '../components/SyncActionExample';

import {
    h,
    createApp as createVueApp,
    reactive,
    onUpdated,
    watch,
    SetupContext
} from 'vue';

const createApp = getSupportedFrameworks().vue3;

describe( 'vue3 features', () => {
    const fixture = setupComponentTest();

    // not sure how vue still supports reactivity when dom node is not attached on document???
    it( 'SyncActionExample (vue with invalid setup)', async() => {
        const containerElem = document.createElement( 'div' );
        fixture.app = createApp( SyncActionExample ).mount( containerElem );
        expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 7</div><button>+1</button></div>' );

        const buttonElem = containerElem.getElementsByTagName( 'button' )[0];
        buttonElem.click();
        await wait();

        expect( containerElem.innerHTML ).toEqual( '<div><div>current number: 8</div><button>+1</button></div>' );
    } );

    it( 'different attr watch behavior', async() => {
        const ctx = {
            printStack: [] as string[],
            changeLiteralProp: null as Function,
            changeObjectProp: null as Function
        };

        // child component
        const Child = {
            name: 'Widget',
            inheritAttrs: false,
            setup: ( _: never, context: SetupContext ): { (): JSX.Element } => {
                const attrs = context.attrs as { [key: string]: Model};

                // watch attrs.literal
                watch( () => attrs.literal,
                    () => ctx.printStack.push( 'literal updated' ) );

                // watch attrs.obj.value
                watch( (): string => attrs.obj.value as string,
                () => ctx.printStack.push( 'obj.value updated' ) );

                onUpdated( () => ctx.printStack.push( 'onUpdated triggered' ) );

                return (): JSX.Element => h( 'div', null, 'hi' );
            }
        };

        const Parent = {
            name: 'Example',
            inheritAttrs: false,
            setup: (): { (): JSX.Element } => {
               const model = reactive( {
                   literal: 'literal',
                   obj: {
                       value: 'value'
                   }
               } );

               ctx.changeLiteralProp = (): void  => void ( model.literal = 'literal_update' );
               ctx.changeObjectProp = (): void  => void ( model.obj.value = 'value_update' );

               return (): JSX.Element => h( Child, {
                   literal: model.literal,
                   obj: model.obj
               } );
            }
        };

        const containerElem = fixture.container;
        createVueApp( Parent ).mount( containerElem );

        await wait();
        expect( ctx.printStack ).toEqual( [] );

        // change literal prop => no 'literal updated' but 'onUpdated triggered'
        ctx.changeLiteralProp();
        await wait();
        expect( ctx.printStack ).toEqual( [ 'onUpdated triggered' ] );
        ctx.printStack.splice( 0, ctx.printStack.length );

        // change object prop => 'obj.value updated', but no 'onUpdated triggered'
        ctx.changeObjectProp();
        await wait();
        expect( ctx.printStack ).toEqual( [ 'obj.value updated' ] );
        ctx.printStack.splice( 0, ctx.printStack.length );
    } );
} );

