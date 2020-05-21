import {
    ComponentDef,
    Component
} from './types';


const ThirdComponent: ComponentDef = {
    name: 'ThirdComponent',
    // eslint-disable-next-line react/display-name
    view: ( { model, dispatch, h }: Component ) =>
        <div>
            <div>Hello {model.name}!</div>
            <button onClick={() => dispatch( 'name', 'Monster Hunter' )}>set name</button>
        </div>,
    init: () => ( {
    } )
};

export default ThirdComponent;
