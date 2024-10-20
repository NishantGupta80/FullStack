const apis = [
    'https://jsonplaceholder.typicode.com/posts/1', 
    'https://jsonplaceholder.typicode.com/posts/2', 
    'https://jsonplaceholder.typicode.com/posts/3/invalid url'  
];

const buttons = document.querySelectorAll('.btn');
const popup = document.getElementById('popup');
const retryButton = document.getElementById('retry');
let currentApiIndex = null;

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentApiIndex = index;
        fetchApi(index);
    });
});

retryButton.addEventListener('click', () => {
    fetchApi(currentApiIndex);
});

function fetchApi(index) {
    fetch(apis[index])
        .then(response => {
            if (!response.ok) {
                throw new Error('API Error');
            }
            return response.json();
        })
        .then(data => {
            console.log('API data:', data);
            alert('Data fetched successfully!');
        })
        .catch(error => {
            console.error('API fetch error:', error);
     
            alert('Failed to fetch data');
            
            
        });
}

function showPopup() {
    popup.style.display = 'block';
}

function hidePopup() {
    popup.style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        hidePopup();
    }
});