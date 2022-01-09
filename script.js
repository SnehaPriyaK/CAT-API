//Get the location to display cat images
const result=document.querySelector('.cat-list');
result.innerHTML=`<div class="spinner-border text-primary" role="status">
<span class="sr-only">Loading...</span>
</div>`;

//Get the search box
let searchBox=document.querySelector("#search-box");
searchBox.value='';
let cats, textEntered;

//funtion to get the cat data
async function getData(searchText){
    try{
        if(searchText){
            const res=await fetch(`https://cataas.com/api/cats?tags=${searchText}`)
            const jsonResult=await res.json();
            return jsonResult; 
        }
        else{
            const res=await fetch('https://cataas.com/api/cats')
            const jsonResult=await res.json(); 
            return jsonResult; 
        }
             
    }
    catch(error){
        console.log(error)
    }
}

//function to display the result
async function displayData(){
    cats= await getData(textEntered);
    if(cats.length!==0){
        cats.forEach((cat,id)=>{
            if(id===0){
                result.innerHTML =`
                <div class="card">
                <a href="https://cataas.com/cat/${cat.id}" data-lightbox="example-1"><img class ="list" src="https://cataas.com/cat/${cat.id}" alt="cat" width="300" height="200"></a>
                </div>
                `;
            }
            else{
                result.innerHTML +=`
                <div class="card ">
                <a href="https://cataas.com/cat/${cat.id}" data-lightbox="example-1"><img class ="list" src="https://cataas.com/cat/${cat.id}" alt="cat" width="300" height="200"></a>
                </div>
                `;
            }
        });
    }
    else{
        result.innerHTML='No matched data for your search'
    }
}

//Action to be performed when data entered in search bar
searchBox.addEventListener("keyup", async function(){
    textEntered= searchBox.value;
    result.innerHTML=`<div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
    </div>`; 
    displayData();
    });

    hello=()=>{
        console.log("hello")
    }
displayData();