{

    node('init',function(){


        node('Render2DScene')()

        //node('TriangulationScene')()

        node('CubesScene')()


    })

    /*window.addEventListener('DOMContentLoaded', () => {
        node('init')()
    })*/

    node('init')()

}

