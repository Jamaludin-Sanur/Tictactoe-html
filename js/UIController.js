let tictactoe = null;

$(document).ready(function () {
    showFormModal(true);
});

const generateBoard = (rows, cols) => {
    let allCell = '';
    for (let row = 0; row < rows; row++) {
        allCell += '<div class="row">'
        for (let col = 0; col < cols; col++) {
            allCell += `<span class="cell" data-row="${row}" data-col="${col}" onClick="onClickBoardCell(event)">+</span>`;
        }
        allCell += '</div>'
    }
    document.getElementById('board').innerHTML = allCell;
}

const onClickNewGame = () => {
    // Get Inputs
    const maxRow = document.getElementById("inputRows").value;
    const maxCol = document.getElementById("inputCols").value;
    const maxPlayer = document.getElementById("inputPlayers").value;

    // Validation
    if (!maxRow || isNaN(maxRow) || Number(maxRow) < 2) return alert("Rows must grater than 2")
    if (!maxCol || isNaN(maxCol) || Number(maxRow) < 2) return alert("Columns must grater than 2")
    if (!maxPlayer || isNaN(maxPlayer) || Number(maxPlayer) < 2) return alert("Players must grater than 1")

    // Initialize Tictactoe
    tictactoe = new TicTacToe(maxPlayer, maxRow, maxCol);

    // Generate board cell
    generateBoard(maxRow, maxCol);

    // Update Game Info
    updateGameInfo();

    // Hide modal
    showFormModal(false)
}

const onClickBoardCell = (evt) => {
    // Get dom data
    const dom = evt.target;
    const row = dom.getAttribute("data-row");
    const column = dom.getAttribute("data-col");

    // Validation
    if (dom.classList.contains("cell-selected")) return;

    // Update UI cell
    dom.classList.add("cell-selected");
    dom.innerHTML = tictactoe.currentPlayer;

    // Player Move
    const playerWin = tictactoe.playerMove(row, column);

    // Update UI player-turn
    updateGameInfo()

    // Show Result
    if (playerWin >= 0) {
        showResult(playerWin)
    }
}

const updateGameInfo = () => {
    document.getElementById("labelMaxPlayer").innerHTML = tictactoe.maxPlayer;
    document.getElementById("labelCurrentPlayer").innerHTML = tictactoe.currentPlayer;
}

const showFormModal = (isVisible) => {
    $('#modal-form').modal(isVisible ? 'show' : 'hide');
    $('#result').modal('hide');
}

const showResult = (playerWin) => {
    if (playerWin === 0) {
        $('#result-text').html(`
            <h3>Draw</h3>
        `);
    } else {
        $('#result-text').html(`
            <h3>Congratulations</h3>
            <h5>Player ${playerWin} Win</h5>
        `);
    }
    $('#result').modal('show');
}