function log_in(form){
    event.preventDefault();
    if(!navigator.onLine){
        window.alert("Check Internet Connection!");
        return false;
    }
    var x = true;
    var code = form.code.value;
    var username = form.username.value;
    if (code.length === 0){
        document.getElementById('code_error').innerHTML = "Code is required!";
        document.getElementById('code').style = "margin-bottom: 0px"; 
        document.getElementById('code_error').style = "height: 1px;"; 
        document.getElementById('code_error').style = "font-size: 1px;"; 
        document.getElementById('code_error').style = "color: rgb(255, 0, 0)";
        x = false;
    }
    if (username.length === 0){
        document.getElementById('username_error').innerHTML = "Username is required!";
        document.getElementById('username').style.marginBottom = "0px";
        x = false;
        
    }
    if(x === true){
        try{    
            var request = new XMLHttpRequest();
            request.open("GET", `https://arugatu.000webhostapp.com/index.php?func=SignIn&code=${code}&name=${username}`);
            request.send();
            request.onreadystatechange = async function () {
            if (this.readyState === 4 && this.status === 200) {
                if(this.responseText === "Failed"){
                    document.getElementById('title').style.margin = "0px 0px 0px 0px";
                    document.getElementById("fail").innerHTML = "Incorrected Data";
                    document.getElementById("fail").style.display = "block";
                    console.log(navigator.onLine);
                }
                if(this.responseText === "Success"){
                    try{
                        localStorage.setItem('grade',code[code.length-1]);
                        localStorage.setItem('code',code);
                        localStorage.setItem('name',username);
                        let request2 = await  fetch(`https://arugatu.000webhostapp.com/index.php?func=MrsData&code=${code[0]}${code[1]}${code[2]}`);
                        let teacher = await request2.text();
                        localStorage.setItem('teacher',teacher);
                        window.location.href="main.html";
                    }catch(e){window.alert("Check Internet Connection!");return false;}
                }
            }
            };

        }catch(e){}
    }

}
async function Rtli(){
    try{
        var name = await localStorage.getItem('name');
        var code = await localStorage.getItem('code');
        if(code != null){
            document.getElementById('code').value = code;
        }
        if(name != null){
            document.getElementById('username').value = name;
            
        }
    }catch(e){}
}