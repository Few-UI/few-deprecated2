import { ComponentDef } from '../types';

import ViewExample from './ViewExample';
import PropExample from '../../test/components/PropExample';
// import DispatchInitExample from './DispatchInitExample';

export default {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    // https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking
    view: h => (): JSX.Element =>
        <div>
            {/*
            // @ts-ignore */}
            <ViewExample />
            {/*
            // @ts-ignore */}
            <PropExample firstName='Final' lastName='Fantasy' />
        </div>,
    init: () => ( {} )
} as ComponentDef;

/*
const h = '3';
const Test = ( props: object ) => ( {
    type: 'button',
    props: null as object,
    key: 3
} );
<Test />;
*/
