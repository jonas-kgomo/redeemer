chrome.runtime.onInstalled.addListener(async () => {
  // const groupTags = document.getElementById('group');
  // chrome.tabGroups.query(query, (tabs) => {
  //     groupTags.innerHTML = tabs.map( e => { return `<div>${e.groupId}</div>`;})
  // });
});

document.addEventListener("DOMContentLoaded", () => {
  const openList = document.getElementById("upload");
  const dialogBox = document.getElementById("demo");
  const dialogList = document.getElementById("list");
  const saveList = document.getElementById("save");
  const saveLinks = document.getElementById("open");
  const date = new Date().getDate().toString();
  const month = new Date().getMonth().toString();
  const fakeImp = document.getElementById("fake");
  const importOrig = document.getElementById("importOrig");
  // access to other windows
  const query = { windowType: "normal" };
  // gets json fillers
  function saveTabs(text, filename) {
    var a = document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    a.setAttribute("download", filename);
    a.click();
  }

  function importFun(e) {
    var files = e.target.files,
      reader = new FileReader();
    // JSON.parse(reader)
    reader.onloadend = function (e) {
      var res = e.target.result;
      //    convert text into json
      var re = JSON.parse(JSON.stringify(res));

      //  convert object to array
      var arr = Object.values(JSON.parse(re));
      // convert second object Tabs to array
      var total = arr[0];
      var tabsarr = arr[1];

       for (var i = 0; i < total; i++) {
         chrome.tabs.create({ url: Object.values(tabsarr[i])[0] }, function () {
           saveLinks.innerHTML = "You currently have " + tabsarr[i];
         });
       
       }
    //  alert(tabsarr);
    };
    reader.readAsText(files[0]);
  }

  //    saveList.addEventListener('click', () => saveTabs(JSON.stringify({Total: tabs.length, Tabs: {...tabs.map(e=> e.url)}}), "data.json"));

  chrome.tabs.query(query, (tabs) => {
    dialogBox.innerHTML = "Total Tabs : " + tabs.length;
    dialogList.innerHTML = tabs
      .map((e) => {
        return `<div class="case" display="flex"> 
                   <div > <img src="${e.favIconUrl}"  width="20px" /> </div>
                   <div display="block"> 
                   ${e.title.replace("Home /", "").replace("Home |", "")} 
                   <p style="color:slategray"> ${
                     e.url.split("/").slice(1)[1]
                   } </p> 
                  </div>
                  </div>`;
      })
      .join("");
    // exporting button
    saveList.addEventListener("click", () =>
      saveTabs(
        JSON.stringify(
          {
            Total: tabs.length,
            Tabs: [...tabs.map((e) => ({ url: e.url, title: e.title }))],
          },
          null,
          " "
        ),
        "re-" + date + "-" + month + ".json"
      )
    );
    saveLinks.innerHTML = "You currently have " + tabs.length + " URLS  open";
    // opening a new link
    openList.addEventListener("click", () => importFun());
    importOrig.addEventListener("change", importFun, false);
    fakeImp.addEventListener("click", () => importOrig.click());
    //    openList.addEventListener('click', () => _newTab());
  });
});
