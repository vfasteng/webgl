const fs=require('fs')

module.exports=function(scanDir){

    let files=[]

    function checkPath(dir){

          console.log(dir)

          
          if(dir.indexOf('/.')>-1){
              return
          }else{
              if(dir.match(/[a-zA-Z0-9]{1}\.[a-zA-Z0-9]+/)){
                  files.push(dir)
              }else{

                  let filesList= fs.readdirSync(dir)
                  filesList.map(file=>{

                          checkPath(dir+'/'+file)

                  })

              }
          }

      }

      checkPath(scanDir)

      console.log(files)

      return files
  }
