import { defineComponent } from '@/utils';

export const printStack = [] as string[];

const ChildComponent = defineComponent( {
    name: 'ChildComponent',
    view: h => ( { ref, actions } ): JSX.Element =>
        <button id='button' ref={ref( 'el' )} onClick={actions.handleClick}>click me!</button>,
    mount: ( { ref } ) => {
        ref.el.addEventListener( 'click', () => {
            printStack.push( 'Native click event for ChildComponent.' );
        } );
    },
    actions: {
        handleClick: (): void => {
            printStack.push( 'Framework click event for ChildComponent.' );
        }
    }
} );

const ParentComponent = defineComponent( {
    name: 'ParentComponent',
    view: h => ( { ref, actions } ): JSX.Element =>
        <div ref={ref( 'el' )} onClick={actions.handleClick}>
            <ChildComponent />
        </div>,
    mount: ( { ref } ) => {
        ref.el.addEventListener( 'click', () => {
            printStack.push( 'Native click event for ParentComponent.' );
        } );
    },
    actions: {
        handleClick: (): void => {
            printStack.push( 'Framework click event for ParentComponent.' );
        }
    }
} );

export default defineComponent( {
    name: 'EventExample',
    view: h => ( { ref, actions } ): JSX.Element =>
        <div ref={ref( 'el' )} onClick={actions.handleClick}>
            <ParentComponent />
        </div>,
    mount: ( { ref } ) => {
        ref.el.addEventListener( 'click', () => {
            printStack.push( 'Native click event for EventExample.' );
        } );
    },
    actions: {
        handleClick: (): void => {
            printStack.push( 'Framework click event for EventExample.' );
        }
    }
} );
