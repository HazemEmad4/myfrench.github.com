async function Start(){
    if(!navigator.onLine){
        window.alert("Check Internet Connection!");
        return false;
    }
    var unit = localStorage.getItem('unit');
    var type = localStorage.getItem('type');
    var grade = localStorage.getItem('grade');
    var code = localStorage.getItem('code');
    var name = localStorage.getItem('name');
    var n = localStorage.getItem('n');
    var quiz_name = localStorage.getItem('quiz_name');

    let request = await fetch(`https://arugatu.000webhostapp.com/index.php?func=MrsOpen&code=333&grade=${grade}&quizname=${quiz_name}`);
    let MrsOpen = await request.text();

    let request2 = await fetch(`https://arugatu.000webhostapp.com/index.php?func=CanEnter&code=${code}&username=${name}&quiz=${quiz_name}`);
    let CanEnter = await request2.text();

    quiz_name = `${quiz_name}-${grade}`;
    let  TorF =  (MrsOpen === "True" && CanEnter === "True");
    if(TorF === true && type === 'g'){
        var request3 = await fetch("https://hazememad4.github.io/");
        var all_quizes_as_text = await request3.text();
        var data = JSON.parse(all_quizes_as_text);
        data = data[quiz_name];

        document.getElementById('u-p').innerHTML = `Unit ${unit} - Quiz ${n}`;
        if(Object.keys(data).length === 0){
            window.location.href = '../main.html';
        }
    }else{
        window.location.href = '../main.html';
    }
}

function Part1 (){
    
}