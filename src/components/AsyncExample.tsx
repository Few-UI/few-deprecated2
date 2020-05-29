import {
    ComponentDef
} from '../types';


const AsyncExample: ComponentDef = {
    name: 'AsyncExample',
    init: () => ( {} ),
    actions: {
        setValue1: ( { dispatch } ) => void dispatch( 'value1', 'value1' ),
        setValue2: ( { dispatch } ) => void dispatch( 'value2', 'value2' ),
        setValue3: ( { dispatch } ) => void setTimeout( () => dispatch( 'value3', 'value3' ), 5000 )
    },
    // eslint-disable-next-line react/display-name
    view: ( { model, actions, h } ) =>
        <div>
            <button onClick={() => void actions.setValue1()}>value1</button>
            <div>{model.value1}</div>
            <button onClick={() => void actions.setValue2()}>value2</button>
            <div>{model.value2}</div>
            <button onClick={() => void actions.setValue3()}>value3</button>
            <div>{model.value3}</div>
        </div>
};

export default AsyncExample;
