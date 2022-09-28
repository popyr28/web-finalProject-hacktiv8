wedding_list = {}

function load_storage(){
    if(localStorage.length > 0){
        keys = Object.keys(localStorage)
        for (i = 0; i < keys.length; i++){
            wedding_list[keys[i]] = JSON.parse(localStorage.getItem(keys[i]))
        }
    }else{
        wedding_list = {}
    }

    display_all('*')
}

function getLocal(val, id){
    var temp = JSON.parse(localStorage.getItem(id))
    temp[1] = val
    localStorage.setItem(id, JSON.stringify(temp))
}

function check_list(id){
    const checkbox = document.getElementById(`flexCheck${id}`)
    const labelCheck = document.getElementById(`flexLabel${id}`)
    labelCheck.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

    checkbox.addEventListener('change', function(){
        if (checkbox.checked){
            labelCheck.style.textDecoration = 'line-through'
            wedding_list[id][1] = true
            getLocal(true, id)
        } else {
            labelCheck.style.textDecoration = 'none'
            wedding_list[id][1] = false
            getLocal(false, id)
        }
    })

    wedding_list[id][1] = true
    getLocal(true, id)
}

function display_list(index_sign, sign){
	var all_list = document.getElementById("list-group")
	all_list.innerHTML = ""
    if(sign === '*'){
        index_sign.forEach(key => {
            all_list.innerHTML += `
                <div class="form-check" id="list-item${key[0]}">
                    <input class="form-check-input col-2" type="checkbox" value="" ${key[1]} id="flexCheck${key[0]}" onclick="check_list(${key[0]})">
                    <label class="form-check-label col-8" for="flexCheckDefault" id="flexLabel${key[0]}">
                        ${wedding_list[key[0]][0]}
                    </label>
                    <span class="col-2"><a onclick="delete_list(${key[0]})"><i class="fa-solid fa-xmark"></i></a></span>
                </div>
            `
            key[1] == "checked" ? check_list(key[0]): ""
        })
    }else{
        console.log("masuk else");
        index_sign.forEach(key => {
            all_list.innerHTML += `
                <div class="form-check" id="list-item${key}">
                    <input class="form-check-input col-2" type="checkbox" value="" ${sign} id="flexCheck${key}" onclick="check_list(${key})">
                    <label class="form-check-label col-8" for="flexCheckDefault" id="flexLabel${key}">
                        ${wedding_list[key][0]}
                    </label>
                    <span class="col-2"><a onclick="delete_list(${key})"><i class="fa-solid fa-xmark"></i></a></span>
                </div>
            `
            sign == "checked" ? check_list(key) : ""
        })
    }
}

function isChecked(val){
    var listConvert = Object.keys(wedding_list).map((key) => [Number(key), wedding_list[key]]);
    const index_arr = []
    if (val == "all"){
        listConvert.forEach(word => {
            word[1][1] == true ? index_arr.push([word[0], "checked"]) : index_arr.push([word[0], ""])
        })
    } else {
        const result = listConvert.filter(item => item[1][1] == val);
        result.forEach(item => {
            index_arr.push(item[0])
        })
    }
    return index_arr
}

function display_all(sign){
    var index_arr = isChecked("all")
    display_list(index_arr, sign)
    document.getElementById('all').classList.add('active')
    document.getElementById('checked').classList.remove('active')
    document.getElementById('uncheck').classList.remove('active')
    }

function display_checked(sign){
    var index_arr = isChecked(true)
    console.log("true"+index_arr);
    display_list(index_arr, sign)
    document.getElementById('checked').classList.add('active')
    document.getElementById('uncheck').classList.remove('active')
    document.getElementById('all').classList.remove('active')
}

function display_onGo(sign){
    var index_arr = isChecked(false)
    console.log("false"+index_arr);
    display_list(index_arr, sign)
    document.getElementById('uncheck').classList.add('active')
    document.getElementById('checked').classList.remove('active')
    document.getElementById('all').classList.remove('active')
}

function isExist(item){
    var hasVal = [false, 0];
    var len = Object.keys(wedding_list).length
    for (i = 0; i < len; i++){
        if (item == wedding_list[i][0]){
            hasVal = [true, i]
            break
        }
    } 
    return hasVal
}

function add_list(sign){
	var list = document.getElementById("checklist").value
    var inputText = document.getElementById("checklist")
    var key = Object.keys(wedding_list).length
    exist = isExist(list)
    if(list != ""){
        if(exist[0] == false){
            if (key in wedding_list){
                key = key+1
            }
            wedding_list[key] = [list, false]
            localStorage.setItem(key, JSON.stringify(wedding_list[key]))
            display_all(sign)
            inputText.value = ''
        } else if((exist[0] == true) && (wedding_list[exist[1]][1] == true)){
            if (key in wedding_list){
                key = key+1
            }
            wedding_list[key] = [list, false]
            localStorage.setItem(key, JSON.stringify(wedding_list[key]))
            display_all(sign)
            inputText.value = ''
        } else {
            alert("Your task is already on checklist")
        }
    } else {
        
    }
}

function shift_list(){
	key = 0
	var len = Object.keys(wedding_list).length
	for(key = 0; key < len; key++){
        if (!(key in wedding_list)){
			list = wedding_list[key+1]
			localStorage.setItem(key, JSON.stringify(list))
            wedding_list[key] = list
            delete wedding_list[key+1]
			localStorage.removeItem(key+1)
        } else {
            continue
        }
    }
}

function delete_list(id){
    key = id
    delete wedding_list[key]
    localStorage.removeItem(key)
    shift_list()
    display_all('*')
}

load_storage()