// import { createElment } from 'react';
import type { H } from '@/types';
import { defineComponent } from '@/utils';

const createJsxExample = ( h: H ) =>
    ( { name }: { name: string } ): JSX.Element => <div>{name}</div>;
// JsxExample.displayName = 'JsxExample';

const JsxExample2 = defineComponent<{
    name: string;
}>( {
    name: 'JsxExample2',
    view: h => ( { props: { name } }: { props: { name: string } } ): JSX.Element => <div>{name}</div>
} );

export default defineComponent( {
    name: 'ViewExample',
    view: h => ( { model } ): JSX.Element =>
        <>
            {createJsxExample( h )( model as { name: string } )}
            {JsxExample2.view( h )( { props: model as { name: string } } )}
            <JsxExample2 name={model.name as string} />
        </>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
} );


