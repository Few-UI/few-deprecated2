
const Widget = ( { name }: { name: string} ): JSX.Element =>
    <div>Hi {name}</div>;
Widget.displayName = 'Widget';

const Slot = ( props: {
    children: number;
} ): JSX.Element => <div>{props.children}</div>;
Slot.displayName = 'Slot';

const Example = (): JSX.Element => <Slot>rstrs</Slot>;
