/* eslint-env jest */

import {
    wait,
    enableMockTimer
} from './utils';

import { useEffect, useState, createElement as h } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

const printStatck = [] as string[];

////////////////////////////////
// Constant Property Widget
////////////////////////////////
const ConstantWidget = ( props: { value: string } ): JSX.Element => {
    useEffect( () => {
        printStatck.push( 'ConstantWidget:prop changed' );
    }, [ props ] );

    useEffect( () => {
        printStatck.push( 'ConstantWidget:prop.value changed' );
    }, [ props.value ] );

    return <div>{props.value as string}</div>;
};
ConstantWidget.displayName = 'ConstantWidget';

const ConstantContainer = (): JSX.Element => {
    const setState = useState( {} )[1];

    return (
        <div>
            <ConstantWidget value='8' />
            <button id='button1' onClick={() => void setState( {} )}>button1</button>
        </div>
    );
};
ConstantContainer.displayName = 'ConstantContainer';

////////////////////////////////
// Immutable Property Change
////////////////////////////////
const ChangeWidget = ( props: { scope: { subScope: { value: string } } } ): JSX.Element => {
    useEffect( () => {
        printStatck.push( 'ChangeWidget:prop changed' );
    }, [ props ] );

    useEffect( () => {
        printStatck.push( 'ChangeWidget:prop.scope changed' );
    }, [ props.scope ] );

    useEffect( () => {
        printStatck.push( 'ChangeWidget:prop.scope.subScope changed' );
    }, [ props.scope.subScope ] );

    useEffect( () => {
        printStatck.push( 'ChangeWidget:prop.scope.subScope.value changed' );
    }, [ props.scope.subScope.value ] );

    const [ state, setState ] = useState( {} );

    return (
        <div>
            <div>{props.scope.subScope.value as string}</div>
            <button id='changeWidget' onClick={(): void => {
                setState( {} );
            }}>changeWidget</button>
        </div>
    );
};
ChangeWidget.displayName = 'ChangeWidget';

const ChangeContainer = (): JSX.Element => {
    const [ state, setState ] = useState( {
        scope: {
            subScope: {
                value: 'aa'
            }
        }
    } );

    return (
        <div>
            <ChangeWidget scope={state.scope} />
            <button id='changeState' onClick={(): void => {
                setState( { ...state } );
            }}>changeState</button>
            <button id='changeScope' onClick={(): void => {
                state.scope = { ...state.scope };
                setState( { ...state } );
            }}>changeScope</button>
            <button id='changeSubScope' onClick={(): void => {
                state.scope.subScope = { ...state.scope.subScope };
                setState( { ...state } );
            }}>changeSubScope</button>
            <button id='changeValue' onClick={(): void => {
                state.scope.subScope.value = 'bb';
                setState( { ...state } );
            }}>changeValue</button>
        </div>
    );
};
ChangeContainer.displayName = 'ChangeContainer';

describe( `PropExample test on ${name}`, () => {
    let containerElem: HTMLElement;

    beforeEach( () => {
        containerElem = document.createElement( 'div' );
        document.body.appendChild( containerElem );
    } );

    afterEach( () => {
        unmountComponentAtNode( containerElem );
        document.body.removeChild( containerElem );
        printStatck.splice( 0, printStatck.length );
    } );

    it( 'Test useEffect on constant prop', async() => {
        render( <ConstantContainer />, containerElem );

        // init
        await wait();
        expect( printStatck ).toEqual( [
            'ConstantWidget:prop changed',
            'ConstantWidget:prop.value changed'
        ] );
        printStatck.splice( 0, printStatck.length );

        // click
        const button = document.getElementById( 'button1' );
        button.click();
        await wait();

        expect( printStatck ).toEqual( [
            'ConstantWidget:prop changed'
        ] );
    } );

    it( 'Test useEffect for changeState on ChangeContainer', async() => {
        render( <ChangeContainer />, containerElem );

        // init
        await wait();
        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed',
            'ChangeWidget:prop.scope changed',
            'ChangeWidget:prop.scope.subScope changed',
            'ChangeWidget:prop.scope.subScope.value changed'
        ] );
        printStatck.splice( 0, printStatck.length );

        // click
        const button = document.getElementById( 'changeState' );
        button.click();
        await wait();

        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed'
        ] );
    } );

    it( 'Test useEffect for changeScope on ChangeContainer', async() => {
        render( <ChangeContainer />, containerElem );

        // init
        await wait();
        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed',
            'ChangeWidget:prop.scope changed',
            'ChangeWidget:prop.scope.subScope changed',
            'ChangeWidget:prop.scope.subScope.value changed'
        ] );
        printStatck.splice( 0, printStatck.length );

        // click
        const button = document.getElementById( 'changeScope' );
        button.click();
        await wait();

        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed',
            'ChangeWidget:prop.scope changed'
        ] );
    } );

    it( 'Test useEffect for changeSubScope on ChangeContainer', async() => {
        render( <ChangeContainer />, containerElem );

        // init
        await wait();
        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed',
            'ChangeWidget:prop.scope changed',
            'ChangeWidget:prop.scope.subScope changed',
            'ChangeWidget:prop.scope.subScope.value changed'
        ] );
        printStatck.splice( 0, printStatck.length );

        // click
        const button = document.getElementById( 'changeSubScope' );
        button.click();
        await wait();

        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed',
            'ChangeWidget:prop.scope.subScope changed'
        ] );
    } );

    it( 'Test useEffect for changeValue on ChangeContainer', async() => {
        render( <ChangeContainer />, containerElem );

        // init
        await wait();
        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed',
            'ChangeWidget:prop.scope changed',
            'ChangeWidget:prop.scope.subScope changed',
            'ChangeWidget:prop.scope.subScope.value changed'
        ] );
        printStatck.splice( 0, printStatck.length );

        // click
        const button = document.getElementById( 'changeValue' );
        button.click();
        await wait();

        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed',
            'ChangeWidget:prop.scope.subScope.value changed'
        ] );
    } );

    it( 'Test useEffect for changeWidget on ChangeWidget', async() => {
        render( <ChangeContainer />, containerElem );

        // init
        await wait();
        expect( printStatck ).toEqual( [
            'ChangeWidget:prop changed',
            'ChangeWidget:prop.scope changed',
            'ChangeWidget:prop.scope.subScope changed',
            'ChangeWidget:prop.scope.subScope.value changed'
        ] );
        printStatck.splice( 0, printStatck.length );

        // click
        const button = document.getElementById( 'changeWidget' );
        button.click();
        await wait();

        expect( printStatck ).toEqual( [
        ] );
    } );
} );
