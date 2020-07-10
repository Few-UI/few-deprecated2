import { defineComponent, getFormInput } from '@/utils';

const Form = defineComponent( {
    name: 'Form',
    view: h => ( { props } ): JSX.Element =>
        <form onSubmit={props.onSubmit}>
            <input name='name'></input>
            <button type='submit'>submit</button>
        </form>

} );

export default defineComponent( {
    name: 'FormExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <Form onSubmit={actions.updateResult}></Form>
            <div>Result: {model.name}</div>
        </>,
    actions: {
        updateResult: ( { dispatch }, e ): void => {
            e.preventDefault();
            dispatch( { path: 'name', value: getFormInput( e.target ).name } );
        }
    }
} );
