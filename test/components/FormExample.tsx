// https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input

import { defineComponent, getInputValue } from '@/utils';
import { Field } from './FieldExample';
import type { Props, ComponentDef, ComponentElement } from '@/types';

// Form: Types
export interface Fields {
    [key: string]: Field;
}

export interface User {
    name: string;
    age: number;
    isAdmin: boolean;
}

const getUserFields = (): Fields => ( {
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
} as Fields );

// Form: Utils
const getFormInput = ( elem: Element ): Props => {
    const res = {} as Props;
    // TODO: not consider custom element for now
    if ( elem.tagName === 'FORM' ) {
        const nodeList = ( elem as HTMLFormElement ).elements;
        for ( let i = 0; i < nodeList.length; i++ ) {
            const node = nodeList[i] as HTMLInputElement;

            // only supports naming input
            if ( node.nodeName === 'INPUT' && node.name ) {
                res[node.name] = getInputValue( node );
            }
        }
    }
    return res;
};

const createFormFields = ( fields: Fields, values?: Props ): Fields =>
    Object.entries( fields || {} ).reduce( ( sum, [ k, v ] ) => {
        sum[k] = {
            ...v,
            value: values && values[k]
        };
        return sum;
    }, {} as Fields );

// Form: Components
// props.fields is one time input, high order component here will be more
// approperate than 'prop'
const FormTemplate = {
    name: 'Form',
    actions: {
        reset: ( { dispatch, model } ) => void
            dispatch( { path: 'fields', value: createFormFields( model.fields as Fields ) } )
    },
    view: h => ( { props, model, actions } ): JSX.Element =>
        <form onSubmit={e => void
            ( e.preventDefault(), props.action( getFormInput( e.target as Element ) ) )
        } onReset={e => void
            ( e.preventDefault(), actions.reset() )
        }>
            {Object.entries( model.fields as Fields ).map(
                ( [ key, field ] ) => <Field key={key} id={key} field={field} />
            )}
            <button id='submit' type='submit'>submit</button>
            <button id='reset' type='reset'>reset</button>
        </form>
} as ComponentDef;

export const createForm = ( fields: Fields ): ComponentElement => defineComponent( {
    ...FormTemplate,
    init: ( { props: { values } } ) => ( {
        fields: createFormFields( fields, values )
    } )
} );

export const BaseForm = defineComponent( {
    ...FormTemplate,
    init: ( { props: { fields, values } } ) => ( {
        fields: createFormFields( fields, values )
    } )
} );

export const UserForm = createForm( getUserFields() );

// Form: Example
export default defineComponent( {
    name: 'FormExample',
    view: h => ( { model, actions } ): JSX.Element =>
        <>
            <UserForm action={actions.updateResult} />
            <pre id='form-request'>Form Request: {model.result}</pre>
        </>,
    actions: {
        updateResult: ( { dispatch }, formValues ) => void
            dispatch( { path: 'result', value: JSON.stringify( formValues, null, 2 ) } )
    }
} );
