import {
    ComponentDef
} from '../../src/types';


const ViewExample: ComponentDef = {
    name: 'ViewExample',
    // eslint-disable-next-line react/display-name
    view: h => ( props, { model, actions } ) =>
        <div>
            <input id='text' value={model.name as string} onChange={actions.updateName} />
            <div id='result'>{model.name}</div>
        </div>,
    init: () => ( {
        name: 'Monster Hunter'
    } ),
    actions: {
        updateName: ( { dispatch }, e ): void => {
            dispatch( 'name', e.target.value );
        }
    }
};

export default ViewExample;
