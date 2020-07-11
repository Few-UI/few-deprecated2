import { defineComponent, getFormInput } from '@/utils';
import { FormEvent } from 'react';

const TestForm = defineComponent( {
    name: 'TestForm',
    view: h => ( { props } ): JSX.Element =>
        <form onSubmit={ ( e: FormEvent ): void => {
                // if put it here, means we want to wrap event
                e.preventDefault();
                props.action( getFormInput( e.target as Element ) );
            }}>
            {
                Object.entries( props.fields ).map( ( [ k, v ] ) =>
                    <div  key={k}>
                        <label htmlFor={k}>{( v as any ).name}:</label>
                        <input type={( v as any ).type} id={k} name={k}></input>
                    </div>
                )
            }
            <button type='submit'>submit</button>
        </form>
} );

export default defineComponent( {
    name: 'FormExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <TestForm action={actions.updateResult} fields={model.fields}></TestForm>
            <pre>Result: {model.result}</pre>
        </>,
    init: () => ( {
        fields: {
            name: {
                name: 'name',
                type: 'text'
            },
            desc: {
                name: 'desc',
                type: 'text'
            }
        }
    } ),
    actions: {
        updateResult: ( { dispatch }, formValues ): void => dispatch( {
            path: 'result',
            value: JSON.stringify( formValues, null, 2 )
        } )
    }
} );
