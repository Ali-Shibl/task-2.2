const inputData=document.getElementById('inputdata')
const iconAdd=document.getElementById('add')
const iconEdit=document.getElementById('edit')
const inputSearch=document.getElementById('search')
const data=[]

// اول لما افتح يروح يشوف في داتا ولا لا لو فيه داتا يحطها ف الاراي ويعرضها 
if (localStorage.getItem('items') != null) {
    
    data=JSON.parse(localStorage.getItem('items'))
        displayData(data)
} 

// add
iconAdd.addEventListener('click',()=>{
   
       data.push(inputData.value)
      localStorage.setItem('items',JSON.stringify(data))
      displayData(data)
      clear()
showToast('add success','alert-success')
      
})
// clear input
function clear() {
  inputData.value =""
}


// alert
function showToast(term,style) {
    let toast=document.createElement('div')
      toast.classList.add('alert',style,'p-2' ,'my-2' )
      toast.innerHTML=`${term} <i class="fa-regular fa-circle-check ms-4"></i>`
      document.getElementById('alert').append(toast)  
      setTimeout(()=>{
        toast.remove()
      },1500)
}


// displayData
function displayData(arr) {
let cartona=''

    for (let i = 0; i < arr.length; i++) {
       cartona+=`
           <li class='my-2'>${arr[i]} <button class="btn btn-danger btn-sm ms-3" onclick='deleteLi(${i})'>delete</button><button class="btn btn-warning btn-sm mx-3" onclick='editLi(${i})'>edit</button><button class="btn btn-success btn-sm" onclick='completeLi(${i})'>complete</button></li>
       `
    }
    document.getElementById('rowData').innerHTML=cartona;
}

// delete
function deleteLi(num){
  data.splice(num,1)
  displayData(data)    
  localStorage.setItem('items',JSON.stringify(data))
  iconEdit.classList.add('d-none')
  iconAdd.classList.remove('d-none')
  showToast('delete item success','alert-danger')

}

// edit
let numberEdit;
function editLi(num){
    numberEdit=num
  iconEdit.classList.remove('d-none')
  iconAdd.classList.add('d-none')
  inputData.value = data[num]
}
iconEdit.addEventListener('click',()=>{
    data[numberEdit]=inputData.value
    displayData(data)
    localStorage.setItem('items',JSON.stringify(data))
    iconEdit.classList.add('d-none')
    iconAdd.classList.remove('d-none')
    clear()
    showToast('edit item success','alert-warning')
})


// search
inputSearch.addEventListener('input',()=>{
    let resultSearch=[]
for (let i = 0; i < data.length; i++) {
   
    if (data[i].toLowerCase().includes(inputSearch.value.toLowerCase())) {
      resultSearch.push(data[i])

    }

    displayData(resultSearch)
}
})


// complete
function completeLi(num){
document.getElementById('rowData').children[num].classList.add('text-decoration-line-through')
}
