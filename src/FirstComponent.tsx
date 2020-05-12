
import {
    Component
} from './types';

import { h, createComponent } from './reactHelper';

const FirstComponent: Component = {
    init: () => ( {
        name: 'MonsterHunter'
    } ),
    // eslint-disable-next-line react/display-name
    view: model => <div>Hello {model.name}</div>,
    name: 'FirstComponent'
};


export default createComponent( FirstComponent );
