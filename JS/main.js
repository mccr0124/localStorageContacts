const key = "mccr0124";
let contact = [];

const init=function(){
    let defContact = [{"id":1,"fullname":"David McCreath","email":"david@email.com","phone":"5555555555"}];
    if (!localStorage.getItem(key)){
            contact = defContact;
            localStorage.setItem(key,JSON.stringify(contact));
    }

    displayContacts();
    
}

const addForm=function(){
    document.querySelector('.nav').classList="nav hidden";
    document.querySelector('.form').classList="form active";
    document.querySelector('.submit').addEventListener('click',addContact);
}

const addContact=function(){
    let fullname = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let id = Math.floor(Math.random()*10000);
    let addContact = {id,fullname,email,phone};
        contact.push(addContact);
        localStorage.setItem(key,JSON.stringify(contact));
        document.querySelector('.nav').classList="nav active";
        document.querySelector('.form').classList="form hidden";
    displayContacts();
}

const removeContact=function(ev){
    ev.preventDefault();
    let id = ev.target.getAttribute('id');
    contact = contact.filter((contacts)=>{
        return !(contacts.id == id);
    });
    localStorage.setItem(key,JSON.stringify(contact));
    displayContacts();
}

const editContact=function(){
}

const displayContacts=function(){
    let contactObj = JSON.parse(localStorage.getItem(key));
    let contactList = document.getElementById('contactList');
    let df = new DocumentFragment();
    contactList.innerHTML = "";
    console.log(contactObj);
    contactObj.forEach((contactObj) => {
        let li=document.createElement('li');
        let h3=document.createElement('h3');
        let email=document.createElement('p');
        let phone=document.createElement('p');
        let btnDel = document.createElement('button');
        let btnEd = document.createElement('button');
        h3.textContent= contactObj.fullname;
        email.textContent="Email Address: "+contactObj.email;
        phone.textContent="Phone Number: "+contactObj.phone;
        btnDel.setAttribute('id',contactObj.id);
        btnDel.textContent="Delete";
        btnDel.addEventListener('click',removeContact);
        btnEd.setAttribute('id',contactObj.id);
        btnEd.textContent="Edit";
        btnEd.addEventListener('click',editContact);
        li.appendChild(h3);
        li.appendChild(email);
        li.appendChild(phone);
        li.appendChild(btnDel);
        li.appendChild(btnEd);
        df.appendChild(li);
    });
    contactList.appendChild(df);
}

document.getElementById('add').addEventListener('click', addForm);
addEventListener('DOMContentLoaded',init);