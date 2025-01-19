//TODO: REPLACE TEXTAREA
//https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
const textTarea = document.getElementById("textTarea");
const openFile = document.getElementById("openFile");
const saveButton = document.getElementById("saveButton");
const fileNameInput = document.getElementById("fileName");
const openModal = document.getElementById("openModal");
const containerModal = document.getElementById("containerModal");
const dropArea = document.getElementById("dropArea");

const loadFile = (file)=>{
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e)=>{
        textTarea.value = e.target.result;
        fileNameInput.value = file.name;
    } 
    containerModal.classList.add("hide");
}

const handlerDropFile = (e)=>{
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    loadFile(file);
    
}

const downloadFile = (urlFile,fileName) =>{
    const a = document.createElement("a");
    a.href = urlFile;
    a.style.display = "none";
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

dropArea.addEventListener("dragover",(e)=> e.preventDefault());
dropArea.addEventListener("drop",handlerDropFile)

openModal.addEventListener("click",(e)=>{
    containerModal.classList.remove("hide");
})

containerModal.addEventListener("click",(e)=>{
    if(e.target.id === "containerModal"){
        containerModal.classList.add("hide");
    }
})

openFile.addEventListener("change",(e)=>{
    const file = e.target.files[0];
    fileNameInput.value = file.name;
    loadFile(file);
})

textTarea.addEventListener("dragover",(e)=> e.preventDefault());
textTarea.addEventListener("drop",handlerDropFile);
/* textTarea.addEventListener("keypress",(e)=>{
    //console.log('Caret at: ', e.target.selectionStart)
    console.log(textTarea.childNodes);
}) */

saveButton.addEventListener("click",(e)=>{
    const file = new File([textTarea.value],"foo.txt");
    const urlFile = URL.createObjectURL(file,{
        type: "text/plan"
    });

    downloadFile(urlFile,fileNameInput.value)
})

