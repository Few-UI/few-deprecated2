import { ComponentDef } from '../../src/types';
import { defineComponent } from '../../src/utils';

export default defineComponent( {
    name: 'AsyncActionExample',
    init: () => ( {} ),
    actions: {
        setValue1: ( { dispatch } ) => void dispatch( { path: 'value1', value: 'value1' } ),
        setValue2: ( { dispatch } ) => void dispatch( { path: 'value2', value: 'value2' } ),
        setValue3: ( { dispatch } ) => void setTimeout( () => dispatch( { path: 'value3', value: 'value3' } ), 3000 )
    },
    view: h => ( { model, actions } ): JSX.Element =>
        <div>
            <button id='button1' onClick={actions.setValue1}>value1</button>
            <div id='value1'>{model.value1}</div>
            <button id='button2' onClick={actions.setValue2}>value2</button>
            <div id='value2'>{model.value2}</div>
            <button id='button3' onClick={actions.setValue3}>value3</button>
            <div id='value3'>{model.value3}</div>
        </div>
} as ComponentDef );
