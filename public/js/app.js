console.log("Client Side JS is loaded")

//Fetch is only used in client side javascript
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{  //This callback runs when json data arrives
        console.log(data)
    })
})



//the browser refreshes after you hit the submit button but to prevent that 
//We will be using preventDefault() on event object in the call back
//So that we could do whatever we want
const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')


//Event listner name along with the callback function
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address=searchElement.value
    document.querySelector('.cl1').textContent = "Loading...."
    //Using fetch for weather app
    fetch(`/weather?address=${address}`).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                document.querySelector('.cl1').textContent = "An error occured for given address while fetching" 
                console.log("An error occured for given address while fetching")
            }
            else{
                document.querySelector('.cl1').textContent = data["address"]+" has temperature of "+data["forecast"]+" degreeC"
                console.log(data)
            }
        })
    })
})