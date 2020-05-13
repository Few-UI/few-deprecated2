// https://vuejsdevelopers.com/2020/03/16/vue-js-tutorial/
// https://github.com/vuejs/rfcs/blob/master/active-rfcs/0008-render-function-api-change.md

import Vue from 'vue';

const h = Vue.h;

const FirstComponent = {
    //template: '<div>Hello Vue!</div>'
    name: 'test',
    render() {
        return <div>Hello Vue</div>;
    }
};

const App = {
    template: '<first-component />',
    setup() {
    const count = Vue.ref( 0 );
    const inc = () => {
      count.value++;
    };
    return {
      count,
      inc
    };
    },
    components: {
        'first-component': FirstComponent
    },
    name: 'app'
};

export default App;
