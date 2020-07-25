import { defineComponent, wait } from '@/utils';

const mockAsyncCall = async(): Promise<string> => ( ( await wait( 500 ), 'Monster Hunter' ) );

const asyncH = ( h: Function, promise: Promise<any> ): any => {
    return h( defineComponent( {
        name: 'dummy',
        init: async() => ( {
            content: 'loading...'
        } ),
        mount: async( { dispatch } ) => void dispatch( { path: 'content', value: await promise } ),
        view: h => ( { model } ): JSX.Element => <>{model.content}</>
    } ) );
};

export default defineComponent( {
    name: 'AsyncViewExample',
    view: h => ( { model } ): JSX.Element => <div>Hello {asyncH( h, mockAsyncCall() )}!</div>
} );
