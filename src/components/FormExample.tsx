import { defineComponent, getFormInput } from '@/utils';

const Form = defineComponent( {
    name: 'Form',
    view: h => ( { props } ): JSX.Element =>
        <form onSubmit={ ( e: any ) => {
                e.preventDefault();
                props.onSubmit( getFormInput( e.target ) );
            }}>
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
        updateResult: ( { dispatch }, values ): void => {
            dispatch( {
                path: 'name',
                value: values.name
            } );
        }
    }
} );
