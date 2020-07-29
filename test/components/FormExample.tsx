// https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input

import { defineComponent } from '@/utils';
import { FormEvent } from 'react';
import { Field, getInputValue } from './FieldExample';
import { ComponentDef } from '@/types';

// Form: Types
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
// props.fields is one time input, high order component here will be more
// approperate than 'prop'
const FormTemplate = {
    name: 'Form',
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
} as ComponentDef;

export const Form = defineComponent( {
    ...FormTemplate,
    init: ( { props } ) => ( {
        fields: props.fields
    } )
} );

export const createForm = ( fields: Fields ): any => defineComponent( {
    ...FormTemplate,
    init: () => ( {
        fields: fields
    } )
} );

export const UserForm = createForm( createUserFields() );

// Form: Example
export default defineComponent( {
    name: 'FormExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <UserForm action={actions.updateResult} />
            <pre id='form-request'>Form Request: {model.result}</pre>
        </>,
    actions: {
        updateResult: ( { dispatch }, formValues ): void => dispatch( {
            path: 'result',
            value: JSON.stringify( formValues, null, 2 )
        } )
    }
} );
