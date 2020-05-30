import {
    ComponentDef
} from '../../src/types';

const AsyncActionExample: ComponentDef = {
    name: 'AsyncActionExample',
    init: () => ( {} ),
    actions: {
        setValue1: ( { dispatch } ) => void dispatch( 'value1', 'value1' ),
        setValue2: ( { dispatch } ) => void dispatch( 'value2', 'value2' ),
        setValue3: ( { dispatch } ) => void setTimeout( () => dispatch( 'value3', 'value3' ), 3000 )
    },
    // eslint-disable-next-line react/display-name
    view: ( { model, actions, h } ) =>
        <div>
            <button id='button1' onClick={() => void actions.setValue1()}>value1</button>
            <div id='value1'>{model.value1}</div>
            <button id='button2' onClick={() => void actions.setValue2()}>value2</button>
            <div id='value2'>{model.value2}</div>
            <button id='button3' onClick={() => void actions.setValue3()}>value3</button>
            <div id='value3'>{model.value3}</div>
        </div>
};

export default AsyncActionExample;
