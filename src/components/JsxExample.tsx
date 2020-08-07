// import { createElment } from 'react';
import type { H } from '@/types';
import { defineComponent } from '@/utils';

type CallBack = () => void;
interface ButtonInput {
    action?: CallBack;
    content: string;
}

const createJsxExample = ( h: H ) =>
    ( { action, content }: ButtonInput ): JSX.Element =>
        <button onClick={action}>{content}</button>;
// JsxExample.displayName = 'JsxExample';

const JsxExample2 = defineComponent<{
    action?: Function;
    content: string;
}>( {
    name: 'JsxExample2',
    view: h =>
        ( { props }: { props: ButtonInput } ): JSX.Element =>
            createJsxExample( h )( props )
} );

const JsxExample3 = defineComponent<{
    action?: CallBack;
}>( {
    name: 'JsxExample3',
    init: () => ( {
        content: 'JsxExample3'
    } ),
    render: h => ( ctx ): JSX.Element =>
        createJsxExample( h )( ctx as ButtonInput )
} );


export default defineComponent( {
    name: 'ViewExample',
    view: h => (): JSX.Element =>
        <>
            {createJsxExample( h )( {
                action: (): void => console.log( 'createJsxExample' ),
                content: 'createJsxExample'
            } )}
            {JsxExample2.view( h )( { props: {
                action: (): void => console.log( 'JsxExample2.view' ),
                content: 'JsxExample2.view'
            } } )}
            <JsxExample2 action={(): void => console.log( 'JsxExample2' )} content='JsxExample2' />
            {JsxExample3.render( h )( {
                action: (): void => console.log( 'JsxExample3.render' ),
                content: 'JsxExample3.render'
            } )}
            <JsxExample3 action={(): void => console.log( 'JsxExample3' )} />
        </>
} );


