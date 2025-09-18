export function playSound(file:string){
    const audio = new Audio(file);
    audio.play().catch((err)=>{
        console.warn("autoplay bloked:",err);
    })
}