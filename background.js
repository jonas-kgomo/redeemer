chrome.runtime.onInstalled.addListener( async () => {

  // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
  // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
  // runtime.
 let url = chrome.runtime.getURL("popup.html");

 let tab = await chrome.tabs.create({ url });

  chrome.tabs.query({windowType:'normal'}, function(tabs) {
     console.log('Number of open tabs in all normal browser windows:',tabs.length);
 }); 

 document.getElementById("demo").innerHTML = "tabs";


  // Finally, let's log the ID of the newly created tab using a template literal.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  //
  // To view this log message, open chrome://extensions, find "Hello, World!", and click the
  // "service worker" link in th card to open DevTools.
  console.log(`Created tab ${tab.id}`);
});

document.addEventListener('DOMContentLoaded', () => {
    const dialogBox = document.getElementById('demo');
    const dialogList = document.getElementById('list');
    //const query = { active: true, currentWindow: true };
 //   const tabItems = tabs.map(e => { return `<li> + ${e.title} + </li>`;});

    const query = {windowType:'normal'};

    chrome.tabs.query(query, (tabs) => {
        dialogBox.innerHTML = "Total: " + tabs.length ;
        dialogList.innerHTML = "List"+ tabs.map( e => { return `<div display="block"> + ${e.title} + </div>`;});
        //"List" + tabs[0].title;
    });
});



// function readMe(){
//   document.body.style.backgroundColor = 'red';

// }

// chrome.action.onClicked.addListener((tab) =>  {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id }, 
//     function: readMe 
//   });
// });

