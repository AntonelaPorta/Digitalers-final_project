const editForm = document.getElementById('editForm')
const createForm = document.getElementById('createForm')

/*Loader*/
document.addEventListener('readystatechange', () => {
    const loader = document.querySelector('.loader-page')

    if(loader){
        setTimeout(() => {
            loader.classList.remove('loader-page')
        }, 200);
    }
})

/*Validacion Formularios EDIT y CREATE*/
if(editForm || createForm) {
    const form = document.querySelector('.needs-validation')

    form.addEventListener('submit', event => {
        if (!form.checkValidity() ) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    })

}