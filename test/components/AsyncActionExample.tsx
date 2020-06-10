import { ComponentDef } from '../../src/types';

export default {
    name: 'AsyncActionExample',
    init: () => ( {} ),
    actions: {
        setValue1: ( { dispatch } ) => void dispatch( 'value1', 'value1' ),
        setValue2: ( { dispatch } ) => void dispatch( 'value2', 'value2' ),
        setValue3: ( { dispatch } ) => void setTimeout( () => dispatch( 'value3', 'value3' ), 3000 )
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
} as ComponentDef;
