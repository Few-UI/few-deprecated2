import { defineComponent } from '@/utils';
import './Field.scss';

export interface Field {
    name: string;
    type: 'number' | 'string' | 'boolean';
    check?: ( value: string ) => string;
    required?: boolean;
    value?: any;
}

export const getInputValue = ( elem: HTMLInputElement ): any => {
    if ( elem.type === 'checkbox' ) {
        return elem.checked;
    } else if ( elem.type === 'number' ) {
        return Number( elem.value );
    }
    return elem.value;
};

const mapFieldToInput = ( type: string, value: any ): any => {
    switch ( type ) {
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

export const Field = defineComponent( {
    name: 'Field',
    init: ( { props: { field } } ) => ( {
        value: field.value
    } ),
    actions: {
        reset: ( { dispatch, props } ) => void
            dispatch( { path: 'value', value: props.field.value } )
    },
    watchers: ( { props, actions } ) => [
        {
            watch: props.field,
            action: actions.reset
        }
    ],
    view: h => ( { props: { id, field }, model, dispatch } ): JSX.Element =>
        <div>
            <label htmlFor={id}>{field.name}{field.required ? '*' : ''}: </label>
            <input id={id} name={id} {...mapFieldToInput( field.type, model.value )} onChange={e => void
                dispatch( { path: 'value', value: getInputValue( e.target ) } )
            } required={field.required} />
            {field.required ?
                <span className='validity'></span> :
                <code style={{ color: 'red' }}>{field.check && field.check( model.value )}</code>
            }
        </div>
} );


export default defineComponent( {
    name: 'FieldExample',
    init: () => ( {
        currNum: 7,
        field: {
            name: 'age',
            type: 'number',
            check: ( v ): string => v || v === undefined ? '' : 'cannot be empty'
        } as Field
    } ),
    actions: {
        reset: ( { model, dispatch } ) => void
            dispatch( { path: 'field', value: { ...( model.field as Field ) } } )
    },
    view: h => ( { model, dispatch, actions } ): JSX.Element =>
        <>
            <div>
                <Field id='age' field={model.field as Field}></Field>
                <button id='reset' onClick={actions.reset}>reset</button>
            </div>
            <div id='plusPanel'>
                <div>{model.currNum}</div>
                <button id='plus' onClick={() => void
                    dispatch( { path: 'currNum', value: ( model.currNum as number ) + 1 } )
                }>+1</button>
            </div>
        </>
} );
