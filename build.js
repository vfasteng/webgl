const fs=require('fs')
const files=require('./public/files.js')
const minify=require('./minify.js')


async function build(){

    let script=''

    for(const file of files){
      if(file.indexOf('.js')>-1){
        script+=fs.readFileSync('.'+file).toString()+'\n\n'
      }
    }

    fs.writeFileSync('./dist/index.js',script)

    fs.writeFileSync('./dist/index.min.js',await minify(script))


}


build()