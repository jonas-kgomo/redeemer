chrome.runtime.onInstalled.addListener( async () => {



    // const groupTags = document.getElementById('group');
    // chrome.tabGroups.query(query, (tabs) => {
    //     groupTags.innerHTML = tabs.map( e => { return `<div>${e.groupId}</div>`;})
    // });
 


 });

document.addEventListener('DOMContentLoaded', () => {


    const openList = document.getElementById('upload');
    const dialogBox = document.getElementById('demo');
    const dialogList = document.getElementById('list'); 
//  const data = { totalTabs: dialogBox.innerText, savedTabs: dialogList.innerHTML};
    const saveList = document.getElementById('save');
    const saveLinks = document.getElementById('open');
    const date = new Date().getDate().toString();
    const month = new Date().getMonth().toString();
    // access to other windows
    const query = {windowType:'normal'};
  // gets json fillers
  function saveTabs(text, filename){
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click()
    }

//   function getCurrentTab() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
//     tab = tab[0];
//     return tab;
//   });
// }  

function newTab() {
 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 let actualJSON = JSON.parse(response)
 loadJSON(function(response) {
  // Parse JSON string into object
  let actualJSON = JSON.parse(response);
 });
  for(var i=0; i<actual_JSON.length; i++) { 
  chrome.tabs.create({url : actual_JSON[i].Tabs.url}, function(tab) { 
      console.log('google script injected'+ tab + url);
  });
}
};





 //    saveList.addEventListener('click', () => saveTabs(JSON.stringify({Total: tabs.length, Tabs: {...tabs.map(e=> e.url)}}), "data.json"));    


   chrome.tabs.query(query, (tabs) => {
        dialogBox.innerHTML = "Total Tabs : " + tabs.length ;
        dialogList.innerHTML = tabs.map( e => 
          { return `<div class="case" display="flex"> 
                   <div > <img src="${e.favIconUrl}"  width="20px" /> </div>
                   <div display="block"> 
                   ${e.title.replace("Home /", "").replace("Home |", "")} 
                   <p style="color:slategray"> ${e.url.split('/').slice(1)[1]} </p> 
                  </div>
                  </div>`;
          }).join('');
        // exporting button   
        saveList.addEventListener('click', () => saveTabs(JSON.stringify(
          {Total: tabs.length, 
           Tabs:  [...tabs.map( e =>  ({url: e.url, title: e.title}))]
          }, null, ' '), "re-" + date + "-" + month +  ".json"));
        saveLinks.innerHTML = "You currently have " + tabs.length + " URLS  open";
        // opening a new link
        openList.addEventListener('click', () => newTab().tab); 

 
      });

 
});

