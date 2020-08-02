import { defineComponent } from '@/utils';

export default defineComponent( {
    name: 'ViewExample',
    view: h => ( { model } ): JSX.Element =>
        <>
            <div>Hello </div>
            <div>{model.name}!</div>
        </>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
} );
