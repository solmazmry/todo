// const form =document.querySelector('form')
// const img =document.querySelector('img')
// const card= document.querySelector(".card")
// const img= document.querySelector("img")


// card.addEventListener("click",e=>{
//     alert("card clicked")
// })

// img.addEventListener('click',e=>{
//     e.stopPropagation()
//     alert('img clicked')
// })

// //elementin default gorduyu ishi dayandirir
// form.addEventListener('submit',(e)=>{  
// e.preventDefault()
// })
// // containerin aldigi funksiyalari dayandirmaq 
// img.addEventListener('click',(e)=>{
// e.stopPropagation()
// })


const form= document.querySelector('form')
const name= document.querySelector('#name')
const description= document.querySelector('#description')
const tbody= document.querySelector('tbody')
const submitBtn= document.querySelector('#submit-btn')
const idInput= document.querySelector('#id')
const search= document.querySelector('#search')
const file = document.querySelector('#file')





let data =[]
let files = []
const  deleteTodo=(id)=>{
data =data.filter(item => item.id !==id)
renderData()

Toastify({
    text:`Successfully ${idInput.value?'updated':'added'}`,
    duration: 1000,
    close: true,
    position: "right", 
    stopOnFocus: true, 
    style:{
        background:'red',
    }
  }).showToast();
}


const updateTodo=(id)=>{
const todo =data.find(item=> item.id ===id)
name.value=todo.name
description.value=todo.value
submitBtn.textContent='Edit'
idInput.value=id
}


const renderData =(todoData=data)=>{
    let innnerHTML=''
    todoData.forEach( (item,index)=>{
      let flie=''
      item.files.forEach(x => {
        file += `<img width="100px" height="100px" src="${x}"/>`
    })
    
     innnerHTML+= `<tr>
     <td>${index+1}</td>
     <td>${item.name}</td>
    <td>${item.description}</td>
    <td>${file}</td>
     <td>${item.createdAt}</td> 
     <td> ${item.updateAt ||'-'}</td> 
     <td>
     <button class="btn btn-danger" onclick="deleteTodo(${item.id})" >Delete</button>
     <button class="btn btn-primary" onclick="updateTodo(${item.id})" >Update</button>
     </td> 
    </tr>`
    })

tbody.innerHTML=innnerHTML

}



form.addEventListener('submit',e => {
  e.preventDefault()
  if(!name.value || !description.value) {
      if(!name.value) {
          name.classList.add('is-invalid')
      }else {
          name.classList.remove('is-invalid')
      }
      if(!description.value) {
          description.classList.add('is-invalid')
      }else {
          description.classList.remove('is-invalid')
      }
  }
  else {
      if(idInput.value) {
          const index = data.findIndex(item => item.id === Number(idInput.value))
          const todo = data.find(item => item.id === Number(idInput.value))
          data[index] = {
              ...todo,
              name:name.value,
              description:description.value,
              updatedAt:new Date()
          }
          idInput.value = ''
          submitBtn.textContent = 'Add'
      }else {
          data.push({
              id: (data[data.length - 1]?.id || 0) + 1,
              name:name.value,
              description:description.value,
              files,
              createdAt:new Date(),
              updatedAt:null
          })
      }
      name.classList.remove('is-invalid')
      description.classList.remove('is-invalid')
      renderData()

      name.value = ''
      description.value = ''
      Toastify({
          text: `Successfully ${idInput.value ? 'updated' : 'added'}`,
          duration: 1000,
          close: true,
          position: "right",
          stopOnFocus: true,
      }).showToast();
      console.log(data)
  }
})

search.addEventListener('keyup',e=>{
  const value =e.target.value.toLowerCase()
  const newData =data.filter(item=> item.name.toLowerCase().includes(value) || item.description.toLowerCase().includes(value))
 renderData(newData)

})
file.addEventListener('change',e => {
  files = Array.from(e.target.files).map(item => {
      return URL.createObjectURL(item)
  })
})
