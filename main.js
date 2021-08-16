opperations = [add, multiple, minus, pow];
opperationsString = [' + ', ' * ', ' - ', '^'];

function add(a,b) { return a + b }
function multiple(a,b) { return a * b }
function minus(a,b) { return a - b }
function pow(a, b) { return Math.pow(a,b) }

class Func{
    constructor (calculations){
        this.calculations = [];
        this.calculationsStr = [];
        this.consts = []
        let last_num = 10;
        for (let i=0; i<calculations; ++i){
            let num = Math.floor(Math.random() * 4)
            while (last_num == num || (last_num == 0 || last_num == 2) && (num == 0 || num == 2))
                num = Math.floor(Math.random() * 4)

            last_num = num;
            
            this.calculations.push(opperations[num]);
            this.calculationsStr.push(opperationsString[num]);

            this.consts.push(Math.floor(Math.random() * 10))
            while(this.consts[i] == 0 || (this.consts[i] == 1 && (num == 1 || num == 3)))
                this.consts[i] = Math.floor(Math.random() * 10)

            if (this.calculations[i] == pow)
                this.consts[i] = 2;
        }
    }
    calculate(n){
        let ans = n;
        for (let i=0; i<this.calculations.length; ++i){
            ans = this.calculations[i](ans, this.consts[i]);
        }
        return ans;
    }
    string(){
        let ans = "";
        for (let i=0; i<this.calculations.length; ++i)
            ans += "("
        ans += "n";
        for(let i=0; i<this.calculations.length; ++i){
            ans += this.calculationsStr[i];
            ans += this.consts[i] + ")";
        }
        return ans;
    }
}

//console.log((new func(3)).string())

let panel = document.getElementById("panel");
let level = document.getElementById("level");

level.value = 2;
var func, numbersShowing;
NextProblem();
function NextProblem(){
    let comment = document.getElementById("comment");
    comment.innerHTML = "";
    document.getElementById("input").value = "";
    func = new Func(Number(level.value));
    numbersShowing = 7;

    panel.innerHTML = "";

    for (let n=1; n<=numbersShowing; ++n){
        let value = func.calculate(n);
        let htmlStr = '<span id="num">' + value + '</span>';
        panel.innerHTML += htmlStr;
    }
    panel.innerHTML += '<span id="num"> ? </span>';
}



function submit() {
    let input = document.getElementById("input").value;
    let comment = document.getElementById("comment");
    let correctAnswer = func.calculate(numbersShowing + 1).toString()
    let result = input == correctAnswer;


    panel.innerHTML = "";
    for (let n=1; n<=numbersShowing; ++n){
        let value = func.calculate(n);
        let htmlStr = '<span id="num">' + value + '</span>';
        panel.innerHTML += htmlStr;
    }


    if (result){
        panel.innerHTML += '<span id="num" style="color:blue;">' + correctAnswer + ' </span>';
    } else {
        panel.innerHTML += '<span id="num" style="color:red;">' + correctAnswer + ' </span>';
    }
    comment.innerHTML = "a(n) = " + func.string();
}

