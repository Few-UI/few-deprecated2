/* eslint-disable @typescript-eslint/no-namespace */

/**
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#locally-scoped-jsx-namespaces
 *
 * For now:
 * - tsconfig
 *   - "jsx": "preserve",
 *   - "jsxFactory": "h",
 * - we can do /** @jsx h *\/ too
 * - Element has conflict with ElementClass factory function practice, that is why
 *   vue set Element as {}
 */
import { createElement } from 'react';
import { ComponentDef } from '../types';
namespace Few {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Element {
        // (): number;
        // (): JSX.Element;
    }

    export interface ElementClass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: () => JSX.Element;
    }
}

export type { Few as JSX };

/**
 * dummy h function
 * @param type component definition
 * @returns anything
 */
export function h( type: ComponentDef ): JSX.Element {
    type;
    return createElement( 'div' );
}

// https://github.com/microsoft/TypeScript/issues/23762
// eslint-disable-next-line no-redeclare
export namespace h {
    // line below is used implicitly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export import JSX = Few;
}

const FunctionComponent = ( { value }: { value: number } ): Few.Element => ( { a: value } );

const Function2 = ( { value }: { value: number } ): number => value + 1;

const RenderFn = ( { name }: { name: string } ): JSX.Element => createElement( 'div', null, name );

// Class following Element Class Pattern. Object doesn't work
class MyComponent {
    render(): JSX.Element {
        this;
        return createElement( 'div' );
    }
}

// Factory function example
const MyFactoryFunction = (): Few.ElementClass => ( {
    render: (): JSX.Element => {
        return createElement( 'div' );
    }
} );

type TestElem = Few.Element | JSX.Element;

const Example = (): TestElem =>
    <>
        <FunctionComponent value={3} />
        <RenderFn name='5' />
        <Function2 value={5} />
        <MyComponent />
        <MyFactoryFunction />
    </>;
Example.displayName = 'Example';
