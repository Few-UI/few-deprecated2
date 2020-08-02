import type { RenderFunction } from '@/types';
import { defineComponent } from '@/utils';

const Widget = ( { name }: { name: string} ): JSX.Element =>
    <div>Hi {name}</div>;
Widget.displayName = 'Widget';

const Slot = ( props: {
    children: number;
} ): JSX.Element => <div>{props.children}</div>;
Slot.displayName = 'Slot';

const Widget2 = ( { name }: { name: string} ): JSX.Element =>
    <div>Hi {name}</div>;
Widget2.displayName = 'Widget2';

const Example = (): JSX.Element =>
    <>
        <Slot>{3}</Slot>
    </>;
Example.displayName = 'Example';

export default Example;
