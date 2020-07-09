import { ComponentDef } from '@/types';
import { defineComponent } from '@/utils';
import ViewExample from './ViewExample';
// import PropsSubscriptionExample from '../../test/components/PropsSubscriptionExample';

export default defineComponent( {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    // https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking
    view: h => (): JSX.Element =>
        <div>
            <ViewExample />
        </div>,
    init: () => ( {} )
} as ComponentDef );


/*
const h = '3';
const Test = ( props: object ) => ( {
    type: 'button',
    props: null as object,
    key: 3
} );
<Test />;
*/
