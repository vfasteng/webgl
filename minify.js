const fs=require('fs')
//const glob=require('./../glob.js')
const {minify}=require('terser')


module.exports=async function(source){








    let glarr=[]



    var letter1 = 65
    var letter2 = null
    var storage = {}
    
    try{
      //var {letter1,letter2,storage}=JSON.parse(fs.readFileSync('./build/cache.json').toString())
    }catch(e){}
    
    const register = (param) => {
      if(['function','if','while','for','of','Float32Array','Uint8Array','Uint16Array','get','set','window','gm','replace','RegExp','push','add','classList','fetch',
    'innerHTML','value','setTimeout','eval','querySelector','createElement','length','substring','switch','canvas','value','return','await','async',
'const','var','let','new','else','case','swith','try','catch','console','log','undefined','null','true','false','Object','assign','window','history',
'location','addEventListener','prototype','get','set','this','setTimeout','document','querySelector','createElement','assign','append','forEach','indexOf',
'map','splice','split','push','pop','join','Math','sin','cos','PI','tan','classList','add','remove','childNodes','nodeName','inndeHTML','a-zA-Z0-9',
'a-zA-Z','a-z','A-Z','zA','keys','values','map','filer','exec','match','requestAnimationFrame','pathname','hash','break','continue','getContext',
'tan','hypot','width','height','Image','random','round','includes','onload','src','JSON','stringify','parse','then','getAttributeNames',
'getAttribute','removeAttribute','spellcheck','class','bind','scrollTop','scrollLeft','style','important','require','node','setAttribute','getAttribute',
'body','innerWidth','innerHeight','io','in','i'].includes(param)){
        return param
      }
      if(glarr.includes(param)){
          return param
      }
        if (storage[param] !== undefined) {
            return storage[param]
        }
        letter1++
        if (65 + ('Z'.charCodeAt(0) - 64) === letter1) {
            letter1 += 6
        }
        if (letter1 > 122) {
            letter2 = !letter2 ? 66 : (letter2 + 1)
            letter1 = 66
        }
        let word = (letter2 ? String.fromCharCode(letter2) : '') + String.fromCharCode(letter1)
        console.log(word, param)
        storage[param] = word
        return word
    }


















   function shadersGet(names){

        let files=fs.readdirSync('./shaders/')
        console.log(files)
    
        const sources={}
        for(const file of files){
    
          let shader=fs.readFileSync('./shaders/'+file).toString()
    
    
          let matches22=shader.match(/(mat4|vec3|vec2|float|int|sampler2D|sampler) ([a-zA-Z0-9\_]+)/gm)
          console.log('shaders',matches22)
          //const defines={}
          if(matches22){
          matches22=matches22.map(def=>def.replace(/(mat4|vec3|vec2|float|int|sampler2D|sampler)/gm,'').trim())
          console.log('shaders',matches22)
          //let index=incrementString('a')
          }
    
          for(const def of matches22){
            shader=shader.replace(new RegExp(def,'gm'),register(def))
          }
          sources[file]=shader
    
          fs.writeFileSync('./shaders.min/'+file,shader)
        }
        /*let buffer=JSON.stringify(sources)
        buffer=Uint8Array.from(Array.from(buffer).map(letter => letter.charCodeAt(0)));
        buffer=new Uint8Array(buffer).map(n=>n<<1)
        buffer=new Uint8Array(buffer)
        fs.writeFileSync('./cache/shaders.bin',buffer)
   */
        //return buffer
    
      }
      //shaders()


      





























let nodearr=[]
source=source.replace(/node\(\'[a-zA-Z0-9\_\-\.]+\'/gm,match=>{
    match=match.substring(6,match.length-1)
    console.log('node',match)
    if(!nodearr.includes(match)){
        nodearr.push(match)
    }
    return 'node('+nodearr.indexOf(match)
})









let nameCache2={}

      var options = {
        parse: {},
        compress: {
            hoist_props :false,
            keep_fargs :false,
            dead_code :true,
            drop_console: true,
            ecma: 2015,
            expression :true,
            passes: 200,
            inline: 10,
            properties: true,
            pure_getters :true,
            unsafe: false,
        },
        mangle: {
          toplevel: true,
          properties: false,/*{
            keep_quoted: true,
          },*/
          eval :true,
        },
        sourceMap: true,
        ecma: 2015,
        enclose: true,
        keep_classnames: true,
        keep_fnames: true,
        nameCache: nameCache2,
        toplevel: true,
      }

      //source=source.substring(0,source.length-1)

      //var min=await minify(source,options)
      //source=min.code






source=source.replace(/gl\.[a-zA-Z0-9\_\-]+/gm,match=>{
    const glname=match.replace('gl.','')
    if(!glarr.includes(glname)){
        glarr.push(glname)
    }
    return match
})




var mathes=source.match(new RegExp('([\\ \\(\\,\\[\\=\\-\\+\/\\*\\^\\.\\:\\!\\\']{1})([a-zA-Z\\_]{1}[a-zA-Z0-9\\_\\-]+)(?![a-zA-Z0-9]{1})','gm'))??[]
mathes=mathes.map(m=>m.substring(1))
const names=[]
mathes.map(m=>{
    if(!names.includes(m)){
        names.push(m)
    }
})
console.log(names)
//source=source.replace(new RegExp('([\\ \\(\\,\\[\\=\\-\\+\/\\*\\^\\.\\:\\!]{1})('+key+')(?![a-zA-Z0-9]{1})','gm'),'$1'+defines[key])




//fs.writeFileSync('./cache/test.min.js',source)

shadersGet(names)

names.map(name=>{
    source=source.replace(new RegExp('(?!\/)([\\ \\(\\,\\[\\=\\-\\+\/\\*\\^\\.\\:\\!\\\']{1})('+name+')(?![a-zA-Z0-9\\"]{1})','gm'),'$1'+register(name))
})

//fs.writeFileSync('./test.min.js',source)


var min=await minify(source,options)
source=min.code

//fs.writeFileSync('./dist/index.min.js',source)

return source;

}