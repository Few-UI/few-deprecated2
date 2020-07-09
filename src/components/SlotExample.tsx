import { defineComponent } from '@/utils';

const MyButton = defineComponent( {
    name: 'MyButton',
    view: h => ( { children } ): JSX.Element =>
        <button>
            {children}
        </button>
} );

export default defineComponent( {
    name: 'SlotExample',
    // h( 'div', null, 'current number: ', model.name ) is working too, but
    // it is not friendly for jsbeautify
    // https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking
    view: h => (): JSX.Element =>
        <MyButton>
            <div>div1</div>
            <div>div2</div>
        </MyButton>
} );
