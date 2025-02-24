document.getElementById('file').addEventListener('change', function(event) {
    const fileName = event.target.files[0] ? event.target.files[0].name : 'Имя файла...';
    document.getElementById('file-name').textContent = fileName;
});

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', this.action, true);

    xhr.upload.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
            const percentComplete = event.loaded / event.total;
            const progress = document.getElementById('progress');
            progress.value = percentComplete;
        }
    });

    xhr.addEventListener('load', function() {
        if (xhr.status === 200 || xhr.status === 201) {
            alert('Файл успешно загружен!');
        } else {
            alert('Ошибка при загрузке файла: ' + xhr.status + ' ' + xhr.statusText);
        }
    });

    xhr.addEventListener('error', function() {
        alert('Ошибка сети.');
    });

    xhr.send(formData);
});
