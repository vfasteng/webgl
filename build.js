const fs=require('fs')
const files=require('./files.js')




let script

for(const file of files){
  if(file===undefined){

  }else{
    script+=(fs.readFileSync('.'+file).toString());
  }
}

fs.writeFileSync('./index.js',script)
