const title = document.getElementById('title')
const desc = document.getElementById('desc')
const titleInputUpdate = document.getElementById("titleUpdate");
const descInputUpdate = document.getElementById("descUpdate");
const idInputUpdate = document.getElementById("idUpdate");
const titleInputNew = document.getElementById("titleNew");
const descInputNew = document.getElementById("descNew");

function del(id) {
    fetch('/tickets', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: id
            })
        })
        .then(res => {
            if (res.ok)
                return res.json()
        })
        .then(response => {
            window.location.reload();
        })
        .catch(error => console.error(error))
}

function upd() {
    fetch('/tickets', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: idInputUpdate.value,
                title: titleInputUpdate.value,
                desc: descInputUpdate.value
            })
        })
        .then(res => {
            if (res.ok) {
                //return res.json()
            }
        })
        .then(response => {
            window.location.reload();
        })
}

function post() {
    fetch('/tickets', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: titleInputNew.value,
                desc: descInputNew.value
            })
        })
        .then(res => {
            if (res.ok) {
                //return res.json()
            }
        })
        .then(response => {
            window.location.reload();
        })
}

function edt(singleTicket) {
    if (singleTicket) {
        document.getElementById("titleUpdate").value = singleTicket.dataset.tixtitle;
        document.getElementById("descUpdate").value = singleTicket.dataset.tixdesc;
        idInputUpdate.value = singleTicket.dataset.tixid;
    }

}