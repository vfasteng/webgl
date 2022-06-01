{

    
    /*attrs*/
    
    /*systemDefs*/
    node('assign',function(target,from){
      return Object.assign(target,from)
    })
    
    node('load',async function load(uri,type){
        const promise=await fetch(uri)
        const text=await promise[type??"text"]()
        return text
    })

    node('U8A',function(array){
      return new Uint8Array(array)
    })
    
    node('F32A',function(array){
      return new Float32Array(array)
    })
    
    node('U16A',function(array){
      return new Uint16Array(array)
    })
    

}

