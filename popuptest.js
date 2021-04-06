function saveSession() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    if (addhtml()) {
      var urlArray = [];
      tabs.forEach(function(tab) {
        urlArray.push(tab.url);
      });
      localStorage.setItem(getCounter(), JSON.stringify(urlArray));
      console.log(localStorage.getItem(getCounter()));
      console.log(getCounter());
      localStorage.setItem("counter", getCounter()+1);
      // closePopup();
    };
  });
}

function addhtml() {
  var sessionName = window.prompt("Name of session:", "Leaf");
  if (sessionName !== null) {
    let bigButt = document.createElement("button");
    let smallButt = document.createElement("button");
    bigButt.setAttribute("class", "big-button");
    smallButt.setAttribute("class", "small-button");
    bigButt.setAttribute("id", getCounter());
    smallButt.setAttribute("id", getCounter());
    bigButt.textContent = sessionName;
    smallButt.textContent = "X";
    document.querySelector("#sessions-chunk").append(bigButt, smallButt);
    console.log(bigButt, smallButt);
    localStorage.setItem("htmlchunk", document.querySelector("#sessions-chunk").outerHTML);
    console.log(localStorage.getItem("htmlchunk"));
    return true;
  } else {
    return false;
  };
}

function reopenSession() {
  let num = this.id;
  var urlArray = JSON.parse(localStorage.getItem(num));
  urlArray.forEach(function(urlSession) {
    chrome.tabs.create({url: urlSession});
  });
}

function deleteSession() {
  let num = this.id.split("small")[0];
  if (confirm(`This session will be irreversibly wiped. Proceed?`)) {
    localStorage.removeItem(num);
    document.querySelector(`[id=big${CSS.escape(num)}]`).remove();
    document.querySelector(`[id=small${CSS.escape(num)}]`).remove();
    localStorage.setItem("htmlchunk", document.querySelector("#sessions-chunk").outerHTML);
  };
}

function clickAttacher() {
  var arrBig = document.querySelectorAll(".big-button");
  var arrSmall = document.querySelectorAll(".small-button");
  for (var i = 0; i<arrBig.length; i++) {
    arrBig[i].addEventListener("click", reopenSession);
    arrSmall[i].addEventListener("click", deleteSession);
  };
}

function getCounter() {
  return parseInt(localStorage.getItem("counter"));
}

function closePopup() {
  let pop = window.self;
  pop.opener = window.self;
  pop.close();
}

document.addEventListener("DOMContentLoaded", function() {
  if (!getCounter()) {
    localStorage.setItem("counter", 1);
  } else {
    document.querySelector("#sessions-chunk").innerHTML = localStorage.getItem("htmlchunk");
  };
  document.querySelector("#saveCurrentWindow").addEventListener("click", saveSession);
  clickAttacher();
  document.querySelector("#reset").addEventListener("click", function() {
    if (confirm("All sessions will be irreversibly wiped. Proceed?")) {
      localStorage.clear();
      closePopup();
    }
  });
});