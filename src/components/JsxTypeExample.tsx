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
namespace Few {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Element {
        // (): number;
    }

    export interface ElementClass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: any;
    }
}

export type { Few as JSX };

/**
 * dummy h function
 * @returns anything
 */
export function h( /*...*/ ): Few.Element {
    return {
        a: 5
    };
}

/**
 * Class following Element Class Pattern
 * Note: object doesn't work
 */
class MyComponent {
    render: () => 3
}

/**
 * Factory function example
 * @returns object in ElementClass pattern
 */
function MyFactoryFunction(): Few.ElementClass {
    return {
        render: (): number => {
            return 3;
        }
    };
}

// https://github.com/microsoft/TypeScript/issues/23762
// eslint-disable-next-line no-redeclare
export namespace h {
    // line below is used implicitly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export import JSX = Few;
}

const FunctionComponent = (): Few.Element => ( { a: 5 } );

const Function2 = (): number => 5;

const Example = (): Few.Element =>
    <>
        <FunctionComponent />
        <Function2 />
        <MyComponent />
        <MyFactoryFunction />
    </>;
Example.displayName = 'Example';
