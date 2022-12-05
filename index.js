
//DashBoard
const navigationContainer = document.querySelector(".navigationContainer")
const FaBell = document.querySelector(".fa-bell")
const addBtn = document.querySelector(".addBtn");
let navigationItem =  [
    {name: "Notes", logo: "fa-solid fa-note-sticky"},
    {name: "Create new note", logo: "fa-solid fa-plus"}
]

const Item = () => {
    for(let i = 0; i<navigationItem.length; i++){
        navigationContainer.innerHTML += `
        <li class="navigationItem">
            <i class="${navigationItem[i].logo}"></i>
            <p>${navigationItem[i].name}</p>
        </li>`
    }
    var navigationItem1 = document.querySelectorAll(".navigationItem")
    navigationItem1[0].classList.add("active")

    navigationItem1[1].addEventListener("click", () => {
        Addtitle.value = ""
        Addsubject.value = ''
        addNewNote.style.opacity = "1"
        addNewNote.style.zIndex = "10000000"
        resultContainer.innerHTML = '';
        autoCompleteInput.value = '';
    })

}



let NoteItems = [
    {id: 1, date: "25 June, 2017",title: "Meeting", detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quos dolorum. Nobis quod voluptate perspiciatis." , dataCategory: "projects"},
    {id: 2, date: "2 September, 2022",title: "Movie", detail: "............................" , dataCategory: "personal"},
    {id: 3, date: "13, January, 2023",title: "Exam Date", detail: "Eng Chapter1-5, Math-Chapter 4-9, Physic Chapter 9" , dataCategory: "projects"},
    {id: 4, date: "20, July, 2018",title: "Ninja", detail: "the best movie in 2013 and get alot of reward" , dataCategory: "projects"},
    // {id: 5, date: "1 May, 2015",title: "Programming", detail: "Noone can replace me do you believe that is true" , dataCategory: "personal"},
    // {id: 6, date: "12 October, 2016",title: "Meeting2", detail: "I'm good at sing but now I'm programing the daily note app" , dataCategory: "personal"},
]

Item();

const noteContainer = document.querySelector(".noteContainer")
const noteDetailView = document.querySelector(".noteDetailView")
const DateView = document.querySelector(".dateView")
const TitleView = document.querySelector(".titleView");
const DetailView = document.querySelector(".detailView");
let open = 0;
const noteDetailViewShow = () => {
    if(open === 0){
        noteDetailView.style.opacity = "1";
        noteDetailView.style.zIndex = "9999999"
        open = 1;
    }else{
        noteDetailView.style.opacity = "0";
        noteDetailView.style.zIndex = "-1";
        open = 0;
    }
}
let indexChecker;
const ShowItems = () => {
    noteContainer.innerHTML = `
    <div class="addNoteItem">
    <i class="fa-solid fa-circle-plus"></i>
    <p>Create</p>
    </div>`

    const addNoteItem = document.querySelector(".addNoteItem");
        addNoteItem.addEventListener("click", () => {
        Addtitle.value = ""
        Addsubject.value = ''
        addNewNote.style.opacity = "1"
        addNewNote.style.zIndex = "1000000"
        resultContainer.innerHTML = '';
        autoCompleteInput.value = '';
    })

    for(let i=0; i<NoteItems.length; i++){
        // noteContainer.innerHTML +=
        // <div class="noteItem" data-category="${NoteItems[i].dataCategory}">
        //     <p class="date">${NoteItems[i].date}</p>
        //     <h3 class="title">${NoteItems[i].title}</h3>
        //     <p class="detail">${NoteItems[i].detail}</p>
        // </div>`
        // <i class="fa-solid fa-circle-xmark"></i>

        let noteItem = document.createElement("div");
        noteItem.classList.add("noteItem");
        var date = document.createElement("p")
        const innerContainer = document.createElement("div");
        innerContainer.classList.add("innerContainer");
        date.classList.add("date");
        var title = document.createElement("h3")
        title.classList.add("title");
        var detail = document.createElement("p")
        detail.classList.add("detail");
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-circle-xmark")
        const filterAttribute = document.createAttribute("data-category");
        filterAttribute.value = NoteItems[i].dataCategory;
        noteItem.setAttributeNode(filterAttribute)
        var changeDateandDetail = () => {
            date.textContent = NoteItems[i].date;
            title.textContent = NoteItems[i].title;
            detail.textContent = NoteItems[i].detail;
        }
        changeDateandDetail();
        innerContainer.append(date, title, detail);
        noteItem.append(deleteIcon, innerContainer);
        noteContainer.append(noteItem)
        innerContainer.addEventListener("click", () => {
            noteDetailViewShow();
            DateView.innerHTML = NoteItems[i].date;
            TitleView.innerHTML = NoteItems[i].title;
            DetailView.innerHTML = NoteItems[i].detail;
            indexChecker = i;
        })

        const deleteNote = document.querySelectorAll(".fa-circle-xmark");
        deleteNote[i].addEventListener("click", () => {
            NoteItems.splice(i, 1)
            console.log(i)
            ShowItems();
            open = 1;
            noteDetailViewShow();
        })

    }
}
ShowItems();
const changeString = () => {
    NoteItems[indexChecker].date = DateView.textContent;
    NoteItems[indexChecker].title = TitleView.textContent;
    NoteItems[indexChecker].detail = DetailView.textContent;
}
const backSpace = document.querySelector(".fa-arrow-right-long");
backSpace.addEventListener("click", () => {
    noteDetailViewShow();
    // NoteItems[indexChecker].date = '';
    // NoteItems[indexChecker].title = "";
    // NoteItems[indexChecker].detail = "";
    DateView.innerHTML = DateView.value;
    TitleView.innerHTML = TitleView.value;
    DetailView.innerHTML = DetailView.value;
    NoteItems[indexChecker] = {date: NoteItems[indexChecker].date, title: TitleView.textContent, detail: DetailView.textContent , dataCategory: "projects"},
    ShowItems();
    console.log(DateView.innerHTML)

})
const Xmark = document.querySelector(".fa-xmark");
const addNewNote = document.querySelector(".addNewNote")
Xmark.addEventListener("click", () => {
    addNewNote.style.opacity = "0"
    addNewNote.style.zIndex = "-1"
    Addtitle.innerHTML = ''
    Addsubject.innerHTML = ''
    ShowItems();
})



//Filter Items
const filterContainer = document.querySelector(".filter")
let filterBtns = filterContainer.children;
let totalFilterBtn = filterBtns.length;
let totalNoteItems = NoteItems.length;

for(let i = 0; i<totalFilterBtn; i++){
    filterBtns[i].addEventListener("click", function(){
        filterContainer.querySelector(".active").classList.remove("active")
        this.classList.add("active")

        const filterValue = this.getAttribute("data-filter")
        const noteItemToShow = document.querySelectorAll(".noteItem");

        for(let k=0; k<totalNoteItems; k++){
            if(filterValue === noteItemToShow[k].getAttribute("data-category")){
                noteItemToShow[k].classList.add("show")
                noteItemToShow[k].classList.remove("hide")
            }else{
                noteItemToShow[k].classList.remove("show")
                noteItemToShow[k].classList.add("hide")
            }
            if(filterValue === "all"){
                noteItemToShow[k].classList.add("show")
                noteItemToShow[k].classList.remove("hide")
            }
        }
    })
}
const Addtitle = document.querySelector(".Addtitle");
const Addsubject = document.querySelector(".Addsubject")
addBtn.addEventListener("click", () => {
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let todayDate = new Date();
    let day = todayDate.getDate();
    let month = monthNames[todayDate.getMonth()];
    let year = todayDate.getFullYear();
    let finalDate = `${day} ${month}, ${year}`
    NoteItems = [
        ...NoteItems,
        {id: NoteItems.length + 1 ,date: finalDate,title: Addtitle.value, detail: Addsubject.value , dataCategory: "personal"},
    ]
    ShowItems();
        addNewNote.style.opacity = "0"
        addNewNote.style.zIndex = "-1"
})

// autoComplete

const autoCompleteInput = document.querySelector(".autoCompleteInput");
autoCompleteInput.style.display = "block";
const autoCompleteOverlay = document.querySelector(".autoCompleteOverlay");
const resultContainer = document.querySelector(".resultContainer");
let filteredProduct = [];
const buildUI = () => {

    
    autoCompleteInput.addEventListener("keyup", (event) => {
    
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter" 
      ){
        navigateAndSelectProduct(event.key)
        return;
      }
    
      resultContainer.innerHTML = "";
      const searchText = event.target.value.toLowerCase();
      if (searchText.length === 0){
        return;
      }
      filteredProduct = NoteItems.filter((product) => {
        return product.title.toLowerCase().includes(searchText);
       });

       const hasToShowProduct = filteredProduct.length > 0;
       if (hasToShowProduct){
        for(let i = 0; i < filteredProduct.length; i++){
            const productName = document.createElement("p")
            productName.classList.add("items")
            productName.id = filteredProduct[i].id;
            productName.textContent = filteredProduct[i].title;
            resultContainer.append(productName)
            productName.addEventListener("click", () => {
                noteDetailViewShow();
                DateView.innerHTML = NoteItems[productName.id -1].date;
                TitleView.innerHTML = NoteItems[productName.id -1].title;
                DetailView.innerHTML = NoteItems[productName.id -1].detail;
                resultContainer.innerHTML = '';
                autoCompleteInput.value = '';
            })
        }
        }else{
            resultContainer.innerHTML = '';
            const productName = document.createElement("p")
            productName.textContent = "No Content...."
            resultContainer.append(productName)
        }
    })
    
    let indexToSelect = -1;
    const navigateAndSelectProduct = (key) => {
      if ( key === "ArrowDown"){
        if (indexToSelect === filteredProduct.length - 1){
          indexToSelect = -1;
          deSelectProduct() ;
          return;
        }
        indexToSelect += 1;
        const productItemContainerToSelect = selectProduct(indexToSelect);
        if (indexToSelect > 0){
          deSelectProduct()
        }
        productItemContainerToSelect.classList.add("selected");
    
        }else if( key === "ArrowUp"){
            if (indexToSelect === -1){
            return;
            }
            if (indexToSelect === 0){
            deSelectProduct()
            indexToSelect = -1; 
            return;
            }
            indexToSelect -= 1;
            deSelectProduct();
            const productItemContainerToSelect = selectProduct(indexToSelect);
            productItemContainerToSelect.classList.add("selected");
        }else{
            const enterProduct = selectProduct(indexToSelect);
            noteDetailViewShow();
            DateView.innerHTML = NoteItems[enterProduct.id -1].date;
            TitleView.innerHTML = NoteItems[enterProduct.id -1].title;
            DetailView.innerHTML = NoteItems[enterProduct.id -1].detail;
            resultContainer.innerHTML = '';
            autoCompleteInput.value = '';
        }

    }
    const selectProduct = (index) => {
      const productIdToSelect = filteredProduct[index].id.toString();
      const productItemContainerToSelect = document.getElementById(productIdToSelect);
      productItemContainerToSelect.style.backgroundColor = "#7c96e2"
      return productItemContainerToSelect;
    }
    const deSelectProduct = () => {
      const productToDeselect = document.getElementsByClassName("selected")[0];
      productToDeselect.style.backgroundColor = "rgb(188, 204, 221)";
      productToDeselect.classList.remove("selected");
    }
  }

autoCompleteInput.addEventListener("focus", () => {
    buildUI();
})

const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click" , () => {
    document.body.classList.toggle("dark-theme");
    themeBtn.classList.toggle("lightbulb");

    const getCurrentTheme = () => document.body.classList.contains("dark-theme") ? "dark" : "light";
    const getCurrentIcon = () => themeBtn.classList.contains("lightbulb") ? "lightbulb" : "moon";

    localStorage.setItem("saved-theme" , getCurrentTheme());
    localStorage.setItem("saved-icon" , getCurrentIcon());

    const savedTheme = localStorage.getItem("saved-theme");
    const savedIcon = localStorage.getItem("saved-icon");


    if(savedTheme){
        document.body.classList[savedTheme === "dark" ? 'add' : 'remove']("dark-theme");
        document.classList[savedIcon === "lightbulb" ? 'add' : 'remove']("lightbulb");
    }
})
