import { defineComponent, getFormInput } from '@/utils';
import { FormEvent } from 'react';

interface Fields {
    [key: string]: {
        name: string;
        type: string;
        check: ( value: string ) => string;
    };
}

const Field = defineComponent( {
    name: 'Field',
    init: () => ( {} ),
    view: h => ( { props: { id, field }, dispatch, model } ): JSX.Element =>
        <div>
            <label htmlFor={id}>{field.name}:</label>
            <input type={field.type} id={id} name={id} onChange={
                e => void dispatch( {
                        path: 'value',
                        value: e.target.value
                    } )
            }></input>
            <code style={{ color: 'red' }}>{field.check( model.value )}</code>
        </div>
} );

const Form = defineComponent( {
    name: 'Form',
    view: h => ( { props } ): JSX.Element =>
        <form onSubmit={( e: FormEvent ): void => {
            // if put it here, means we want to wrap event
            e.preventDefault();
            props.action( getFormInput( e.target as Element ) );
        }}>
            {Object.entries( props.fields as Fields ).map(
                ( [ k, field ] ) => <Field key={k} id={k} field={field} />
            )}
            <button type='submit'>submit</button>
        </form>
} );

export default defineComponent( {
    name: 'FormExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <Form fields={model.fields} action={actions.updateResult} />
            <pre>Result: {model.result}</pre>
        </>,
    init: () => ( {
        fields: {
            name: {
                name: 'name',
                type: 'text',
                check: ( v ): string => v || v === undefined ? '' : 'cannot be empty'
            },
            desc: {
                name: 'desc',
                type: 'text',
                check: ( v ): string => v || v === undefined ? '' : 'cannot be empty'
            }
        } as Fields
    } ),
    actions: {
        updateResult: ( { dispatch }, formValues ): void => dispatch( {
            path: 'result',
            value: JSON.stringify( formValues, null, 2 )
        } )
    }
} );
