let form=document.querySelector("form")
let search_input=document.querySelector(".search-input")
let todos_ul=document.querySelector(".todos")
let template=document.querySelector("template").content
// let id=0
let todos=[]
let locals=getItem("todos")
todos=locals?JSON.parse(locals): []
const handleRenderTodo  =arr=>{
    todos_ul.innerHTML=null
    if(arr?.length){
       
        
         for(let i=0;i<arr.length;i++){
            let clone=template.cloneNode(true)
            let value=clone.querySelector   (".value-todo")
            value.value=arr[i].name
            let checked=clone.querySelector(".check")
            checked.dataset.id=arr[i].id
            checked.checked=arr[i].isTrudsed
            checked.addEventListener("change",handleChange)
            let edit_btn=clone.querySelector(".edit")
            edit_btn.dataset.id=arr[i].id
            let delet_btn=clone.querySelector(".delet")
            delet_btn.dataset.id=arr[i].id
            todos_ul.appendChild(clone)
         }
    }
}
const handleSub=event=>{
    event.preventDefault()
    const data =new FormData(event.target)
if(search_input.value.length>2){
    let todo={
        name:data.get("creat"),
        id:uuid.v4(),
        isTrudsed:false
    }
    todos=[...todos,todo]
    handleRenderTodo(todos)
    setItem("todos",todos)
    search_input.value=null
}


}
form.addEventListener("submit",handleSub)
window.addEventListener("click",event=>{
    if(
        event.target.closest(".delet")){
let id=event.target.dataset.id
let filter=todos.filter((item)=>item.id!==id)
handleRenderTodo(filter)
setItem("todos",filter)
        }else if(   event.target.classList.contains("edit")){
            let id=event.target.dataset.id
            let idx=todos.findIndex (item=>item.id===id)
            let value=prompt("yangilamoqchimisiz",todos[idx].name)
            todos[idx].name=value
            handleRenderTodo(todos)
            setItem("todos",todos)
        } 
     } )
     function handleChange(event){
        let id=event.target.dataset.id
        let idx=todos.findIndex (item=>item.id===id)
        if(todos[idx].isTrudsed===false){
            
            todos[idx].isTrudsed=true
            
        }else{
            todos[idx].isTrudsed=false
        }
        handleRenderTodo(todos)
        setItem("todos",todos)
     }
handleRenderTodo(JSON.parse(getItem("todos")))