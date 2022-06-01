{


    const directives=node('directives')



    directives.push({selector:"click",callback:click})


    function click(element,scope,attr){


        //console.log(element,scope)
        //node('registerDirective')(element)

        element.addEventListener("click",function(event){


            (function(){
                eval(attr)
            }).bind(scope)()

        })


    }


}