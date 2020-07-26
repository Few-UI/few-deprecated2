// https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input

import { defineComponent } from '@/utils';
import { FormEvent } from 'react';
import './FormExample.scss';

// Form: Types
export interface Field {
    name: string;
    type: 'number' | 'string' | 'boolean';
    check?: ( value: string ) => string;
    required?: boolean;
    value?: any;
}
export interface Fields {
    [key: string]: Field;
}

// Form: Utils
const mapFieldToInput = ( type: string, value: any ): any => {
    switch( type ) {
        case 'number':
            return {
                type: 'number',
                value: value || ''
            };
        case 'boolean':
            return {
                type: 'checkbox',
                checked: value || false
            };
        case 'string':
        default:
            return {
                type: 'text',
                value: value || ''
            };
    }
};

const getInputValue = ( elem: HTMLInputElement ): any => {
    if( elem.type === 'checkbox' ) {
        return elem.checked;
    }
    return elem.value;
};

const getFormInput = ( elem: Element ): { [key: string]: any } => {
    const res = {} as { [key: string]: any };
    // TODO: not consider custom element for now
    if ( elem.tagName === 'FORM' ) {
        const nodeList = ( elem as HTMLFormElement ).elements;
        for ( let i = 0; i < nodeList.length; i++ ) {
            const node = nodeList[i] as HTMLInputElement;

            // only supports naming input
            if( node.nodeName === 'INPUT' && node.name ) {
                res[node.name] = getInputValue( node );
            }
        }
    }
    return res;
};

// Form: Components
const Field = defineComponent( {
    name: 'Field',
    init: ( { props: { field } } ) => ( {
        value: field.value
    } ),
    view: h => ( { props: { id, field }, model, dispatch } ): JSX.Element =>
        <div>
            <label htmlFor={id}>{field.name}{field.required ? '*' : ''}: </label>
            <input id={id} name={id} {...mapFieldToInput( field.type, model.value )} onChange={e => void dispatch( {
                path: 'value',
                value: getInputValue( e.target )
            } )} required={field.required} />
            { field.required ?
                <span className='validity'></span> :
                <code style={{ color: 'red' }}>{field.check && field.check( model.value )}</code>
            }
        </div>
} );

export const Form = defineComponent( {
    name: 'Form',
    view: h => ( { props } ): JSX.Element =>
        <form onSubmit={( e: FormEvent ) => void
            ( e.preventDefault(), props.action( getFormInput( e.target as Element ) ) )
        }>
            {Object.entries( props.fields as Fields ).map(
                ( [ key, field ] ) => <Field key={key} id={key} field={field} />
            )}
            <button id='submit' type='submit'>submit</button>
        </form>
} );

// Form: Example
export default defineComponent( {
    name: 'FormExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <Form fields={model.fields} action={actions.updateResult} />
            <pre id='form-request'>Form Request: {model.result}</pre>
        </>,
    init: () => ( {
        fields: {
            name: {
                name: 'name',
                type: 'string',
                required: true
            },
            age: {
                name: 'age',
                type: 'number',
                check: ( v ): string => v || v === undefined ? '' : 'cannot be empty'
            },
            test: {
                name: 'test',
                type: 'boolean'
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
