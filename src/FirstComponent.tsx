
import {
    Component
} from './types';

import { h } from './reactHelper';

const FirstComponent: Component = {
    name: 'FirstComponent',
    // eslint-disable-next-line react/display-name
    view: model => <div>Hello {model.name}!</div>,
    init: () => ( {
        name: 'Monster Hunter'
    } )
};

export default FirstComponent;
