

/*Loader*/
document.addEventListener('readystatechange', () => {
    const loader = document.querySelector('.loader-page')

    if(loader){
        setTimeout(() => {
            loader.classList.remove('loader-page')
        }, 300)
    }
})

