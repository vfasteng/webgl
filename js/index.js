{

    node('init',function(){


        node('CubesScene')()


    })

    window.addEventListener('DOMContentLoaded', () => {
        node('init')()
    })

}

