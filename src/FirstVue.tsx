import Vue from 'vue';

const FirstComponent = {
    template: '<div>Hello Vue!</div>'
};

const App = {
    template: '<button @click="inc">Clicked {{ count }} times.</button>',
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
        aaa: null
    },
    name: 'app'
};

export default App;
