document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.querySelector('.grid-container');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalContent = document.querySelector('.modal-content');

    // Function to fetch data from the API and display in the modal
    function displayModalContent(itemData) {
        modalContent.innerHTML = `
            <h3>Title: ${itemData.title}</h3>
            <p>ID: ${itemData.id}</p>
            <p>User ID: ${itemData.userId}</p>
            <p>Body: ${itemData.body}</p>
        `;
    }

    // Function to show the modal
    function showModal() {
        modalOverlay.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    // Function to handle grid item click
    function handleItemClick(itemData) {
        displayModalContent(itemData);
        showModal();
    }

    // Event listener to open the modal on grid item click
    async function fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();

            data.slice(0, 6).forEach(item => {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.innerText = `Item ${item.id}`;
                gridItem.addEventListener('click', () => handleItemClick(item));
                gridContainer.appendChild(gridItem);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Event listener to close the modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Event listener to close the modal when clicking outside the modal content
    modalOverlay.addEventListener('click', event => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Fetch data from the API and render the grid items
    fetchData();
});
