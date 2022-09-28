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

function check_list(id){
    const checkbox = document.getElementById(`flexCheck${id}`)
    const labelCheck = document.getElementById(`flexLabel${id}`)
    labelCheck.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

    checkbox.addEventListener('change', function(){
        if (checkbox.checked){
            labelCheck.style.textDecoration = 'line-through'
            wedding_list[id][1] = true
            var temp = JSON.parse(localStorage.getItem(id))
            temp[1] = true
            localStorage.setItem(id, JSON.stringify(temp))
        } else {
            labelCheck.style.textDecoration = 'none'
            wedding_list[id][1] = false
            var temp = JSON.parse(localStorage.getItem(id))
            temp[1] = false
            localStorage.setItem(id, JSON.stringify(temp))
        }
    })

    wedding_list[id][1] = true
    var temp = JSON.parse(localStorage.getItem(id))
    temp[1] = true
    localStorage.setItem(id, JSON.stringify(temp))
}

function display_list(sign){
	var all_list = document.getElementById("list-group")
	all_list.innerHTML = ""
	
    if(sign === '*'){
        Object.keys(wedding_list).forEach(list => {
            if(wedding_list[list][1] == true){
                all_list.innerHTML += `
                    <div class="form-check" id="list-item${list}">
                        <input class="form-check-input col-2" type="checkbox" value="" checked id="flexCheck${list}" onclick="check_list(${list})">
                        <label class="form-check-label col-8" for="flexCheckDefault" id="flexLabel${list}">
                            ${wedding_list[list][0]}
                        </label>
                        <span class="col-2"><a href="#" onclick="delete_list(${list})"><i class="fa-solid fa-xmark"></i></a></span>
                    </div>
                `
                check_list(list) //necessary to call because if load it will save check without click button
            }else{
                all_list.innerHTML += `
                    <div class="form-check" id="list-item${list}">
                        <input class="form-check-input col-2" type="checkbox" value="" id="flexCheck${list}" onclick="check_list(${list})">
                        <label class="form-check-label col-8" for="flexCheckDefault" id="flexLabel${list}">
                            ${wedding_list[list][0]}
                        </label>
                        <span class="col-2"><a onclick="delete_list(${list})"><i class="fa-solid fa-xmark"></i></a></span>
                    </div>
                ` 
            }
        });
    }else if(sign == 1){
        Object.keys(wedding_list).forEach(list => {
            if(wedding_list[list][1] == true){
                all_list.innerHTML += `
                    <div class="form-check" id="list-item${list}">
                        <input class="form-check-input col-2" type="checkbox" value="" checked id="flexCheck${list}" onclick="check_list(${list})">
                        <label class="form-check-label col-8" for="flexCheckDefault" id="flexLabel${list}">
                            ${wedding_list[list][0]}
                        </label>
                        <span class="col-2"><a href="#" onclick="delete_list(${list})"><i class="fa-solid fa-xmark"></i></a></span>
                    </div>
                `
                check_list(list)
            }else{
                
            }
        });
    }else if(sign == 0){
        Object.keys(wedding_list).forEach(list => {
            if(wedding_list[list][1] == false){
                all_list.innerHTML += `
                    <div class="form-check" id="list-item${list}">
                        <input class="form-check-input col-2" type="checkbox" value="" id="flexCheck${list}" onclick="check_list(${list})">
                        <label class="form-check-label col-8" for="flexCheckDefault" id="flexLabel${list}">
                            ${wedding_list[list][0]}
                        </label>
                        <span class="col-2"><a href="#" onclick="delete_list(${list})"><i class="fa-solid fa-xmark"></i></a></span>
                    </div>
                `
            }
        });
    }else{

    }
	
}

function display_all(sign){
    display_list(sign)
    document.getElementById('all').classList.add('active')
    document.getElementById('checked').classList.remove('active')
    document.getElementById('uncheck').classList.remove('active')
    }

function display_checked(sign){
    display_list(sign)
    document.getElementById('checked').classList.add('active')
    document.getElementById('uncheck').classList.remove('active')
    document.getElementById('all').classList.remove('active')
}

function display_onGo(sign){
    display_list(sign)
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
            display_list(sign)
            inputText.value = ''
        }else if((exist[0] == true) && (wedding_list[exist[1]][1] == true)){
            if (key in wedding_list){
                key = key+1
            }
            wedding_list[key] = [list, false]
            localStorage.setItem(key, JSON.stringify(wedding_list[key]))
            display_list(sign)
            inputText.value = ''
        }else{
            alert("Your task is already on checklist")
        }
    }else{

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
        }else{
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