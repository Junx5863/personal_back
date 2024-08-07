


document.addEventListener('DOMContentLoaded', function() {
    const addGameForm = document.getElementById('addGameForm');
    addGameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addGame();
    });
});



const addGame = async () => {
    const stock = document.getElementById('stock').value;
    const name = document.getElementById('gameTitle').value;
    const price = document.getElementById('gamePrice').value;
    const status = document.getElementById('gameStock').value;
    const category = document.getElementById('gameGenre').value;
    const platform = document.getElementById('gamePlatform').value;
    const dateRelease = document.getElementById('gameReleaseDate').value;
    const description = document.getElementById('gameDescription').value;

    const data = {
        name,
        price,
        platform,
        dateRelease,
        status,
        stock,
        category,
        description
    };

    const response = await fetch('http://localhost:3000/api/v1/product/add_new_game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.status === 201) {
        alert('Game added successfully');
    } else {
        alert('An error occurred');
    }

}