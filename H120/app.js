var unit_word = "";

function card_clicked(n){
    if(n === 1){
        localStorage.setItem("unit_word", "Grammer");
        localStorage.setItem("type", "g");
    }
    if(n === 2){
        localStorage.setItem("unit_word", "Situations");
        localStorage.setItem("type", "s");
    }
    
    if(n === 3){
        localStorage.setItem("unit_word", "Production");
        localStorage.setItem("type", "p");
    }

    if(n === 4){
        localStorage.setItem("unit_word", "E-mail");
        localStorage.setItem("type", "e");
    }

    if(n === 5){
        localStorage.setItem("unit_word", "Comprehension");
        localStorage.setItem("type", "c");
    }
    window.location.href="unit_page.html";
    event.preventDefault();
}

function Start(){
    var unit_word = localStorage.getItem("unit_word");
    document.getElementById('title').innerHTML = `${unit_word}`;
    event.preventDefault();
}

function Start2(){
    var unit_word = localStorage.getItem("unit_word");
    document.getElementById('title').innerHTML = unit_word;
    event.preventDefault();
}

function card2_clicked(n){
    if(n === 1){
        localStorage.setItem("unit","1");
    }
    if(n === 2){
        localStorage.setItem("unit","2");
    }
    if(n === 3){
        localStorage.setItem("unit","3");
    }
    window.location.href="quiz_page.html";
    event.preventDefault();
}

async function card3_clicked(n){
    event.preventDefault();
    try{
        if(!navigator.onLine){
            window.alert("Check Internet Connection!");
            return false;
        }
        document.getElementById('loading').style.display = "inline";
        var unit = localStorage.getItem('unit');
        var type = localStorage.getItem('type');
        var grade = localStorage.getItem('grade');
        var code = localStorage.getItem('code');
        var name = localStorage.getItem('name');
        var quiz_name = `unit${unit}${type}${n}`;
        localStorage.setItem('quiz_name',quiz_name);
        localStorage.setItem('n',n);

        let request = await fetch(`https://arugatu.000webhostapp.com/index.php?func=MrsOpen&code=333&grade=${grade}&quizname=${quiz_name}`);
        let MrsOpen = await request.text();

        let request2 = await fetch(`https://arugatu.000webhostapp.com/index.php?func=CanEnter&code=${code}&username=${name}&quiz=${quiz_name}`);
        let CanEnter = await request2.text();
        document.getElementById('loading').style.display = "none";

        let  TorF =  (MrsOpen === "True" && CanEnter === "True");

        if(TorF === true){
            var request3 = await fetch("https://hazememad4.github.io/");
            var all_quizes_as_text = await request3.text();
            var data = JSON.parse(all_quizes_as_text);
            if(type === 'g'){
                window.location.href = "quizes/g.html";
            }
            if(type === 's'){
                window.location.href = "quizes/s.html";
            }
            if(type === 'c'){
                window.location.href = "quizes/c.html";
            }
            if(type === 'e'){
                window.location.href = "quizes/e.html";
            }
            if(type === 'p'){
                window.location.href = "quizes/p.html";
            }
        }
        
    }catch(e){
        document.getElementById('loading').style.display = "none";
    }
}

async function Set_names(){
    try{
        if(!navigator.onLine){
            window.alert("Check Internet Connection!");
            return false;
        }
        var name = await localStorage.getItem('name');
        var code = await localStorage.getItem('code');
        var req = await fetch(`https://arugatu.000webhostapp.com/index.php?func=SignIn&code=${code}&name=${name}`);
        var res = await req.text();
        if(res === "Success"){
            document.getElementById('s_name').innerHTML =  await localStorage.getItem('name');
            document.getElementById('t_name').innerHTML =  await localStorage.getItem('teacher');
        }else{
            window.location.href = "log_in.html";
        }
    
    }catch(e){}
}

