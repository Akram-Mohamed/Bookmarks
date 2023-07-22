var siteName=document.querySelector('#site-name')
var siteUrl=document.querySelector('#site-url')
var boxInfo=document.querySelector('.box-info ');
var showDataHolder=document.getElementById('shown-data');
var closeIco=document.querySelector(".fa-xmark");
var siteNameRegex=/^\w{3,}(\s+\w+)*$ /;
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = new RegExp('^(https?:\\/\\/)?'+ // protocol
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
var submitBtn=document.getElementById("btn-submit")

var allSites;
var updatedIndex;


siteName.addEventListener('input',function () {validateInputs(siteName,nameRegex)});
siteUrl.addEventListener('input',function () { validateInputs(siteUrl,urlRegex)});
closeIco.addEventListener('click',hideLayer);
document.addEventListener('click',function (e) {
    if (e.target==boxInfo) {
        hideLayer() 
    }
})
document.addEventListener('keydown',function (e) {

    if (e.code=='Escape') {
        hideLayer() 
    } 
})
    if (localStorage.getItem('Bookmarks')!=null) { allSites=JSON.parse(localStorage.getItem('Bookmarks')) ;   }
    else{  allSites=[]  }

    displayData();

// displayData function
function displayData() {
    var container="";
    for (var i = 0; i < allSites.length; i++) {
        container+=`
        <tr>
        <td>${i+1}</td>
        <td> ${ allSites[i].name}</td>
         <td > 
                        <button id="${i}" class="btn-style visit" index="${i}">
                                <svg  class="svgIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/> </svg>                              
                                Explore
                        </button> 

          </td>
          <td>  <button class=" btn-style del" onclick="deleteBookmark(${i})" >   <i class="fa-solid fa-trash-can" ></i>Delete </button>  </td>
    </tr>
        `
    }

    showDataHolder.innerHTML=container;
}
// adding new book mark 
submitBtn.addEventListener('click',function () {
    if (  siteName.classList.contains('is-valid')&&
           siteUrl.classList.contains('is-valid')
       )
    {
        site={
            name:siteName.value,
            url:siteUrl.value
          }
          allSites.push(site);
      localStorage.setItem("Bookmarks",JSON.stringify(allSites))
      console.log(localStorage.getItem("Bookmarks"));
        clear()
        displayData();
    } 
    else {
        boxInfo.classList.replace('d-none','d-flex')
    }

});


function clear() {
    siteName.value="";
    siteUrl.value="";
}

function deleteBookmark(index) {
    allSites.splice(index,1);
    displayData();
    localStorage.setItem("Bookmarks",JSON.stringify(allSites));
  
}


function validateInputs(element,regex) {

         if ( regex.test( element.value)) {
            element.classList.add('is-valid')
            element.classList.remove('is-invalid')
        }
     
        else{
            element.classList.remove('is-valid')
            element.classList.add('is-invalid')
        }
}

function hideLayer() {
    boxInfo.classList.replace('d-flex','d-none')
  
  }

//define this here after display to have links to get
  var visitBtns = document.querySelectorAll('.visit');

// try to open linke from btn without adding any anchor 
//first checking if the var has data then we check on the link validity to make sure it's correct before open it



  if (visitBtns) 
    {   
        for (var k = 0; k < visitBtns.length; k++) {
            visitBtns[k].addEventListener("click", function (e) {
                 visitWebsite(e);
            });
            }
    }

function visitWebsite(e) {
     open(allSites[e.target.id].url)  
}


