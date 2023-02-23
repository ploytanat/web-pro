document.getElementById("title").innerHTML = "Dad's Joke";

function loadDadJoke(success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.response);
        success(res.joke);
    } else if (this.readyState == 4) {
        const res = JSON.parse(this.response);
        error(res.message);
    }
  };
  xhttp.open("GET", "https://icanhazdadjoke.com/", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}
const ul = document.getElementById("content")

loadDadJoke((joke) => {
    let li = document.createElement("LI")
    li.innerText = joke
    ul.append(li)
    loadDadJoke((joke) => {
        let li = document.createElement("LI")
        li.innerText = joke
        ul.append(li)
        loadDadJoke((joke) => {
            let li = document.createElement("LI")
            li.innerText = joke
            ul.append(li)
            document.getElementById("help_text").innerHTML = "Do you like the jokes?";
            document.getElementById("help_text").style.color = 'blue';
        }, (msg) => {
            document.getElementById("help_text").innerHTML = msg;
            document.getElementById("help_text").style.color = 'red';
        });
    }, (msg) => {
        document.getElementById("help_text").innerHTML = msg;
        document.getElementById("help_text").style.color = 'red';
    });
}, (msg) => {
    document.getElementById("help_text").innerHTML = msg;
    document.getElementById("help_text").style.color = 'red';
});


