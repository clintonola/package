const tableLinksBody = document.getElementById('tableLinksBody');

async function getWeblinks() {
    fetch('/getWeblinks')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach(function(link) {
                const row = tableLinksBody.insertRow();
                const checkbox = row.insertCell(0);
                checkbox.innerHTML = '<input type="checkbox" />';
                const name = row.insertCell(1);
                name.innerHTML = link.name;
                const url = row.insertCell(2);
                url.innerHTML = `<a href=https://${link.url} >link</a>`;
            })
    });
}

getWeblinks();