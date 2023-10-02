const form = document.getElementById('ResetearForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>{
        obj[key]=value});
    fetch('/api/sessions/resetPassword',{
        method:'POST',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then((response) => response.json())
    .then( result =>{
        console.log(result);
        if(result.status==200){
            console.log("Contraseña restaurada");
            console.log(result.status);
        }else{
            console.log({status: result.status, message: result.error});
        }
        console.log( document.cookie )})
});