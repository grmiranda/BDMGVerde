$remove = new Vue({
    el: '#main-content',
    delimiters: ['{$', '$}'],
    data: {
        remover: ''
    },
    methods: {

        removerPro() {
            $remove.remover = true;
            
        },
    }

})