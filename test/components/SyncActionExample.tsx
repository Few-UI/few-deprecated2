import {
    ComponentDef
} from '../../src/types';

const SyncActionExample: ComponentDef = {
    name: 'SyncActionExample',
    init: () => ( {
        value: 7
    } ),
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( 'value', model.value as number + 1 )
    },
    // eslint-disable-next-line react/display-name
    view: ( { model, actions, h } ) =>
        <div>
            <div>current number: {model.value}</div>
            {/*
                https://github.com/apollographql/react-apollo/issues/1841
                h function has loose signature as Functon, which doesn't have
                issue above
            */}
            <button onClick={actions.plusOne}>+1</button>
        </div>
};

export default SyncActionExample;
