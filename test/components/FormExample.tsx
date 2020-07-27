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

export interface User {
    name: string;
    age: number;
    isAdmin: boolean;
}

const getUserFields = (): Fields => {
    return {
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
        isAdmin: {
            name: 'isAdmin',
            type: 'boolean'
        }
    } as Fields;
};

export const createUserFields = ( curr?: User ): Fields => {
    const schema = getUserFields();
    Object.entries( curr || {} ).forEach( ( [ k, v ] ) => {
        schema[k].value = v;
    } );
    return schema;
};

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
    } else if ( elem.type === 'number' ) {
        return Number( elem.value );
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
    watchers: ( { props, actions } ) => {
        return [ {
            watch: props.field,
            action: actions.reset
        } ];
    },
    actions: {
        reset: ( { dispatch, props } ): void => {
            dispatch( { path: 'value', value: props.field.value } );
        }
    },
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
    init: ( { props } ) => ( {
        fields: props.fields
    } ),
    actions: {
        reset: ( { dispatch, model } ): void => {
            const newVal = Object.entries( model.fields ).reduce( ( sum, [ k, v ] ) => {
                sum[k] = { ...v };
                return sum;
            }, {} as Fields );
            dispatch( { path: 'fields', value: newVal } );
        }
    },
    view: h => ( { props, model, actions } ): JSX.Element =>
        <form onSubmit={( e: FormEvent ) => void
            ( e.preventDefault(), props.action( getFormInput( e.target as Element ) ) )
        } onReset={( e: FormEvent ) => void
            ( e.preventDefault(), actions.reset() )
        }>
            {Object.entries( model.fields as Fields ).map(
                ( [ key, field ] ) => <Field key={key} id={key} field={field} />
            )}
            <button id='submit' type='submit'>submit</button>
            <button id='reset' type='reset'>reset</button>
        </form>
} );

// Form: Example
export default defineComponent( {
    name: 'FormExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <Form fields={createUserFields()} action={actions.updateResult} />
            <pre id='form-request'>Form Request: {model.result}</pre>
        </>,
    actions: {
        updateResult: ( { dispatch }, formValues ): void => dispatch( {
            path: 'result',
            value: JSON.stringify( formValues, null, 2 )
        } )
    }
} );
