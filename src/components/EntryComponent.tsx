import { defineComponent } from '@/utils';
import ViewExample from './ViewExample';
import XComponentExample from './XComponentExample';
import FormExample from '../../test/components/FormExample';

export default defineComponent( {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    // https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking
    view: h => (): JSX.Element =>
        <>
            <ViewExample />
            <FormExample />
        </>
} );
