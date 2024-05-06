let cars=document.getElementsByClassName('part2');
for(let car of cars){
    
    let car_id=car.getAttribute('product_id');
    car.addEventListener('click',()=>{
        window.location.replace(`/car/${car_id}`)
    })
}