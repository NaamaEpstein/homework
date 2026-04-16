function play() {
    const h = document.getElementById("input").value;
    document.getElementById("title").innerText = "שלום ל" + h;
}

function playel() {
    const d = document.getElementById("inputDear").value;
    const t = document.getElementById("inputText").value;
    const f = document.getElementById("inputFrom").value;
    const colorT = document.getElementById("inputColorText").value;
    const colorB = document.getElementById("inputColorBackGround").value;

    document.getElementById("Dear").innerText = d;
    document.getElementById("text").innerText = t;
    document.getElementById("From").innerText = f;
    document.getElementById("div2").style.backgroundColor = colorB;
    document.getElementById("Dear").style.color = colorT;
    document.getElementById("text").style.color = colorT;
    document.getElementById("From").style.color = colorT;
}