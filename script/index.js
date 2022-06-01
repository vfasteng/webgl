{

    node('init',async function(){


        const engine=await node('engine')()


        //node('Render2DScene')()

        //node('TriangulationScene')()

        node('CubesScene')(engine)


        node('StickmanScene')(engine)


    })

    /*window.addEventListener('DOMContentLoaded', () => {
        node('init')()
    })*/

    node('init')()

}

