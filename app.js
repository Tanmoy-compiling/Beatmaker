 class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio=document.querySelector(".kick-sound");
        this.snareAudio=document.querySelector(".snare-sound");
        this.hihatAudio=document.querySelector(".hihat-sound");
        this.playBtn = document. querySelector(".play");
        this.index=0;
        this.bpm = 150;
        this.isPlaying = null;
        this.currentKick = "allSounds/kick-classic.wav";
        this.currentSnare = "allSounds/snare-acoustic01.wav";
        this.currentHihat = "allSounds/hihat-acoustic01.wav";
        this.selects = document.querySelectorAll('select');
        this.mutebtns =  document.querySelectorAll(".mute");
        this.tempoSlider=document.querySelector(".tempo-slider");
    }

    activePad(){
        this.classList.toggle('active');
    }

    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over the pads
        activeBars.forEach(bar =>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

            if(bar.classList.contains("active")){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime= 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        if(!this.isPlaying){
            this.isPlaying =setInterval(() => {
                this.repeat();
            },interval);
        }
        else{
            clearInterval(this.isPlaying);
            this.isPlaying=null;
        }
    }

    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText="Play";
            this.playBtn.classList.add("active");
        }else{
            this.playBtn.innerText="Stop";
            this.playBtn.classList.remove("active");
        }
    }

    changeSound(event){
        const selectionName =event.target.name;
        const selectionValue = event.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;

            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;

            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        } 
    }
    mute(event){
        const muteIndex=event.target.getAttribute("data-track");
        event.target.classList.toggle("active");
        if(event.target.classList.contains("active")){
            switch(muteIndex){
                case "1":
                    this.kickAudio.volume=0;
                    break;
                
                
                case "2":
                    this.snareAudio.volume=0;
                    break;
                
                
                case "3":
                    this.hihatAudio.volume=0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case "1":
                    this.kickAudio.volume=1;
                    break;
                
                
                case "2":
                    this.snareAudio.volume=1;
                    break;
                
                
                case "3":
                    this.hihatAudio.volume=1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText=document.querySelector(".tempo-nr");
        this.bpm = e.target.value;
        tempoText.innerText=e.target.value;
    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying =  null;
        const playBtn=document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        }
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click',drumKit.activePad)
    pad.addEventListener('animationend',function(){
        this.style.animation = "";
    })
});

drumKit.playBtn.addEventListener('click',function(){
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change',function(event){
        drumKit.changeSound(event);
    })
});

drumKit.mutebtns.forEach(btn => {
    btn.addEventListener("click",function(event){
        drumKit.mute(event);
    })
});

drumKit.tempoSlider.addEventListener('input',function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change',function(e){
    drumKit.updateTempo(e);
});

