import { h as createElement, reactive } from 'vue';

import Vue from 'vue/dist/vue';
import {
    ComponentDef
} from './types';


import lodashSet from 'lodash-es/set';

/**
 * Virtual DOM API as h
 *
 * bridge tsc jsx to vue3
 * https://www.ctolib.com/topics-143214.html
 *
 * @param type component type
 * @param props component properties
 * @param children child components
 * @returns virtual DOM component
 */
export const h = ( type: string, props?: Vue.VNodeProps | null, ...children: Vue.VNodeArrayChildren ): Vue.VNode => {
    return createElement( type, props, children );
};

/**
 * create platform specific component from few component
 * @param component few component
 * @returns platform specific component
 */
export const createComponent = ( component: ComponentDef ): Vue.Component => (
    {
        // in Vue render is deined as loose as 'Function'
        // in typeScript by default JSX returns JSX.Element
        // so here even for Vue we use JSX.Element
        render: ( vm ): JSX.Element => component.view( vm ),
        setup: (): object => {
            const vm = {
                model: reactive( component.init() ),
                dispatch: ( path, value ): void => {
                    lodashSet( vm.model, path, value );
                },
                h
            };
            return vm;
        }
    }
);


