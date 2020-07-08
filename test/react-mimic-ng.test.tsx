/* eslint-env jest */

import {
    wait,
    setupComponentTest
} from './utils';

import {
    useEffect,
    useState,
    createElement,
    memo,
    Fragment
} from 'react';
import { render } from 'react-dom';

const h = createElement as { Fragment?: Function };
h.Fragment = Fragment;

const printStack = [] as string[];

////////////////////////////////
// No Property Widget
////////////////////////////////
const NoPropWidget = ( props: unknown ): JSX.Element => {
    useEffect( () => {
        printStack.push( 'NoPropWidget:prop changed' );
    }, [ props ] );

    return <div>No Prop Widget</div>;
};
NoPropWidget.displayName = 'NoPropWidget';

const NoPropContainer = (): JSX.Element => {
    const setState = useState( {} )[1];

    return (
        <div>
            <NoPropWidget />
            <button id='button1' onClick={() => void setState( {} )}>button1</button>
        </div>
    );
};
NoPropContainer.displayName = 'NoPropContainer';

////////////////////////////////
// Constant Property Widget
////////////////////////////////
const ConstantWidget = ( props: { value: string } ): JSX.Element => {
    useEffect( () => {
        printStack.push( 'ConstantWidget:prop changed' );
    }, [ props ] );

    useEffect( () => {
        printStack.push( 'ConstantWidget:prop.value changed' );
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
        printStack.push( 'ChangeWidget:prop changed' );
    }, [ props ] );

    useEffect( () => {
        printStack.push( 'ChangeWidget:prop.scope changed' );
    }, [ props.scope ] );

    useEffect( () => {
        printStack.push( 'ChangeWidget:prop.scope.subScope changed' );
    }, [ props.scope.subScope ] );

    useEffect( () => {
        printStack.push( 'ChangeWidget:prop.scope.subScope.value changed' );
    }, [ props.scope.subScope.value ] );

    const [ _, setState ] = useState( {} );

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

////////////////////////////////
// Memo Widget
////////////////////////////////
const MemoWidget = memo( ( props: { value: string; obj: { [key: string]: string } } ): JSX.Element => {
    useEffect( () => {
        printStack.push( 'MemoWidget:prop changed' );
    }, [ props ] );

    useEffect( () => {
        printStack.push( 'MemoWidget:prop.value changed' );
    }, [ props.value ] );

    useEffect( () => {
        printStack.push( 'MemoWidget:prop.obj.value changed' );
    }, [ props.obj.value ] );

    return <div>{props.value as string}</div>;
} );
MemoWidget.displayName = 'MemoWidget';

const MemoContainer = (): JSX.Element => {
    const [ state, setState ] = useState( {
        value: 'value',
        obj: {
            value: 'obj.value'
        }
    } );

    return (
        <div>
            <MemoWidget value={state.value} obj={state.obj} />
            <button id='changeValue' onClick={(): void => {
                setState( { ...state, value: 'value1' } );
            }}>changeValue</button>
            <button id='objectMutation' onClick={(): void => {
                state.obj.value = 'obj.value2';
                setState( { ...state } );
            }}>objectMutation</button>
        </div>
    );
};
MemoContainer.displayName = 'MemoContainer';

/////////////////////////////////////////////////////////////
interface NgScope {
    [key: string]: any;
    $digest?: Function;
    $apply?: Function;
    $parent?: NgScope;
}

const useScope = ( props: object ): NgScope => {
    const [ $scope, setScope ]: [ NgScope, Function ] = useState( {
        ...props
    } );

    // $scope.$digest
    $scope.$digest = (): void => setScope( { ...$scope } );

    // $scope.apply
    // https://stackoverflow.com/questions/35826219/angular-scope-digest-vs-scope-apply
    $scope.$apply = ( callback: Function ) => {
        let r = $scope;
        while( r.$parent ) {
            r = r.$parent;
        }

        callback && callback();

        r.$digest();
    };

    return $scope;
};

const ChildComponent = ( props: any ): JSX.Element => {
    const $scope = useScope( props );

    return (
        <>
            <code id='childText'>Child: { $scope.prop.value }</code>
            <button id='clickDigest' onClick={
                (): void => $scope.prop.value++ && $scope.$digest()
            }>+1 and digest</button>
            <button id='clickApply' onClick={
                (): void => $scope.prop.value++ && $scope.$apply()
            }>+1 and apply</button>
        </>
    );
};
ChildComponent.displayName = 'ChildComponent';

const ParentComponent = ( props: any ): JSX.Element => {
    const $scope = useScope( props );
    return (
        <>
            <code id='parentText'>Parent: { $scope.prop.value }</code>
            <ChildComponent prop={$scope.prop} $parent={$scope}></ChildComponent>
        </>
    );
};
ParentComponent.displayName = 'ParentComponent';

describe( 'mimic angularJS by react', () => {
    const fixture = setupComponentTest();

    afterEach( () => {
        printStack.splice( 0, printStack.length );
    } );

    it( 'Test useEffect on no prop widget', async() => {
        render( <ParentComponent prop={{ value:7 }} />, fixture.container );

        // init
        await wait();
        expect( fixture.container.innerHTML ).toEqual( [
            '<code id="parentText">Parent: 7</code>',
            '<code id="childText">Child: 7</code>',
            '<button id="clickDigest">+1 and digest</button>',
            '<button id="clickApply">+1 and apply</button>'
        ].join( '' ) );


        // click digest
        const buttonDigest = document.getElementById( 'clickDigest' );
        buttonDigest.click();
        await wait();
        expect( fixture.container.innerHTML ).toEqual( [
            '<code id="parentText">Parent: 7</code>',
            '<code id="childText">Child: 8</code>',
            '<button id="clickDigest">+1 and digest</button>',
            '<button id="clickApply">+1 and apply</button>'
        ].join( '' ) );

        // click apply
        const buttonApply = document.getElementById( 'clickApply' );
        buttonApply.click();
        await wait();
        expect( fixture.container.innerHTML ).toEqual( [
            '<code id="parentText">Parent: 9</code>',
            '<code id="childText">Child: 9</code>',
            '<button id="clickDigest">+1 and digest</button>',
            '<button id="clickApply">+1 and apply</button>'
        ].join( '' ) );
    } );
} );
