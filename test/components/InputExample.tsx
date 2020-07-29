import { defineComponent } from '@/utils';

export default defineComponent( {
    name: 'ViewExample',
    init: () => ( {
        value: '',
        currNum: 7
    } ),
    actions: {
        reset: ( { dispatch } ) => void
            dispatch( { path: 'value', value: '' } )
    },
    view: h => ( { model, actions, dispatch } ): JSX.Element =>
        <>
            <div>
                <input id='text' value={model.value as string} onChange={
                    e => void dispatch( { path: 'value', value: e.target.value } )
                } />
                <button id='reset' onClick={actions.reset}>reset</button>
                <code id='data'>{model.value}</code>
            </div>
            <div id='plusPanel'>
                <div>{model.currNum}</div>
                <button id='plus' onClick={
                    () => void dispatch( { path: 'currNum', value: ( model.currNum as number ) + 1 } )
                }>+1</button>
            </div>
        </>
} );
