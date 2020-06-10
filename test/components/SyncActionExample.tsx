import { ComponentDef } from '../../src/types';

export default {
    name: 'SyncActionExample',
    init: () => ( {
        value: 7
    } ),
    // elm style of upedate
    actions: {
        plusOne: ( { model, dispatch } ) => void dispatch( 'value', model.value as number + 1 )
    },
    view: h => ( { model, actions } ): JSX.Element =>
        <div>
            <div>current number: {model.value}</div>
            {/*
                https://github.com/apollographql/react-apollo/issues/1841
                h function has loose signature as Functon, which doesn't have
                issue above
            */}
            <button onClick={actions.plusOne}>+1</button>
        </div>
} as ComponentDef;
