new Vue({
    el: '#app',
    data() {
        return {
           jsonOutput: "",
           file: "",
           loading: false,
           copied: false,
           error: ""
        }
    },
    methods: {
        convertFile() {
            this.jsonOutput = ""
            this.loading = true

            this.file = this.$refs.file.files[0]

            let formData = new FormData();
            formData.append('file', this.file);
            
            axios.post( '/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(result => {

                if(result.data.error) {
                    this.error = result.data.error.message
                    setTimeout(() => {
                        this.error = ""
                    }, 3000)
                } else {
                    this.jsonOutput = JSON.stringify(result.data, undefined, 4);
                }
                
                this.loading = false
            })
        },
        copyJson() {
            const textarea = document.getElementById('jsonData')
            textarea.select()
            document.execCommand('copy')
            window.getSelection().removeAllRanges()
            this.copied = true
            setTimeout(() => {
                this.copied = false
            }, 1000)
        }
    }
})