{

    
    /*attrs*/
    
    /*systemDefs*/
    
    node('load',async function load(uri,type){
        const promise=await fetch(uri)
        const text=await promise[type??"text"]()
        return text
    })
    
    node('F32A',function(array){
      return new Float32Array(array)
    })
    
    node('U16A',function(array){
      return new Uint16Array(array)
    })
    
    node('assign',function(target,obj){
      return Object.assign(target,obj)
    })
    

}

