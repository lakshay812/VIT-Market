let adds=document.getElementsByClassName('plus');
let subtracts=document.getElementsByClassName('minus');
let numbers=document.getElementsByClassName('seat-count');
for(let add of adds){
add.addEventListener('click',async(req,res)=>{
    let carId=add.getAttribute('car-id');
    
    try{
    changeCount(carId,'+')

    let response = await axios({
        method: 'post', 
        url: `/car/${carId}/add`,
        headers : {'X-Requested-With' : 'XMLHttpRequest'}
    })
    

     

    }
    catch(e){
        changeCount(carId,'-')
        alert("You are not the creater of the ride");
        console.log(e.message);
    }
})}
for(let subtract of subtracts){
    subtract.addEventListener('click',async(req,res)=>{
        let carId=subtract.getAttribute('car-id');
        
        try{
        changeCount(carId,'-')
    
        let response = await axios({
            method: 'post', 
            url: `/car/${carId}/minus`,
            headers : {'X-Requested-With' : 'XMLHttpRequest'}
        })}
        catch(e){
            changeCount(carId,'+');
            alert("You are not the creater of the ride");
            console.log(e.message);
        }
    
})}
 
function changeCount(id,action){
        for(let number of numbers){
            if(number.getAttribute('car-id')== id){
                if(action=='+'){
                    number.innerHTML=eval(`${number.innerHTML}+1`)
                    break;
                }
                else{
                    number.innerHTML=eval(`${number.innerHTML}-1`)
                    break;
                }
            }
        }
}
