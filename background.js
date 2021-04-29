chrome.runtime.onInstalled.addListener( async () => {
    const groupTags = document.getElementById('group');
    chrome.tabGroups.query(query, (tabs) => {
        groupTags.innerHTML = tabs.map( e => { return `<div>${e.groupId}</div>`;})
    });
 });

document.addEventListener('DOMContentLoaded', () => {
    const dialogBox = document.getElementById('demo');
    const dialogList = document.getElementById('list'); 
//  const data = { totalTabs: dialogBox.innerText, savedTabs: dialogList.innerHTML};
    const saveList = document.getElementById('save');
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
        saveList.addEventListener('click', () => saveTabs(JSON.stringify(
          {Total: tabs.length, 
           Tabs:  [...tabs.map( e =>  ({url: e.url, title: e.title}))]
          }, null, ' '), "re-" + date + "-" + month +  ".json"));
  
 
      });
});

