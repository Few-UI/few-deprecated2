import { defineComponent } from '@/utils';
import ViewExample from './ViewExample';
import FormEditExample from '../../test/components/FormEditExample';
import AsyncViewExample from './AsyncViewExample';
import FormExample from '../../test/components/FormExample';
import FieldExample from '../../test/components/FieldExample';
import InputExample from '../../test/components/InputExample';

export default defineComponent( {
    name: 'EntryComponent',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    // https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking
    view: h => (): JSX.Element =>
        <>
            <ViewExample />
            <FieldExample />
            <InputExample />
            <FormExample />
            <FormEditExample />
            {/*
            <AsyncViewExample />
            */}
        </>
} );
