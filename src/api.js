axios.post('http://127.0.0.1:8000/uploadEmailConfig/', data)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
