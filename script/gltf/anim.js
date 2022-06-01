    {
    
        function lerp(input, target, percent) {
            input += (target - input)*percent;
            return input
        }
        function lerpVec(input, target, percent) {
            return input.map((p,i)=>lerp(input[i], target[i], percent))
        }
        
       
        
        
        node('animSkin',function(delta){

            return
        
        
                if(!this.animData){
                    this.animData = {}
                }
        
        
                if(!this['animations']||!this.animations.length){
                    return
                }
        
                const skin=this['skins'][0]
        
                    const animation=this.animations[0]
        
        
        
                    this.animData.frame = this.animData.frame??0
                    this.animData.percent=this.animData.percent??0.0;
                    this.animData.frames=this.animData.frames??0
                    this.animData.time=this.animData.time??0
        
                
                    const frametime=0.035
        
                    this.animData.percent=this.animData.time/frametime
                    this.animData.time+=delta
        
                    const calcPercent=()=>{
                    while(this.animData.percent>frametime){
                        this.animData.frame++
                        this.animData.time=0
                        this.animData.percent=0
                    }
                    }
                    if(this.animData.frame>this.animData.frames){
                    this.animData.frame=0
                    calcPercent()
                    }
                    if(this.animData.time>frametime){
                    calcPercent()
                    }
                    
        
            for(const channel of animation['channels']){
                    const target=channel['target']
                    const joint=this.nodes[target['node']]
                    const sampler=animation['samplers'][channel['sampler']]
                    
                    const fname={'translation':'position','rotation':'rotation','scale':'scale',}[channel.target['path']]
                    const len=(fname==='rotation')?4:3
        
        
                    const accessor=this.accessors[sampler['output']].array
                    
                    if(!this.animData.frames){
                        this.animData.frames=accessor.length/len
                    }
                
                    if(fname==='rotation'){
                        var value=[accessor[(this.animData.frame*len)+0],accessor[(this.animData.frame*len)+1],accessor[(this.animData.frame*len)+2],accessor[(this.animData.frame*len)+3]]
                    }else{
                        var value=[accessor[(this.animData.frame*len)+0],accessor[(this.animData.frame*len)+1],accessor[(this.animData.frame*len)+2]]
                    }
        
                    let fromVal=[value[0],value[1],value[2],value[3],]
                
                    const newVal=lerpVec(fromVal, value, this.animData.percent)
        
                    joint.source[fname]=newVal
                    }
        
        
        })
    
    }
    
    