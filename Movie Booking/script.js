const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

//Save selected movie index and price
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
    
}

//Update Total and Count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => {  //To convert nodeValues to array we are using spread operators here.
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));  //We can't store values other than strings in the local storage
    // console.log(seatsIndex)
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;

    total.innerText = ticketPrice * selectedSeatsCount;
}

//Movie Select Event
movieSelect.addEventListener('change',(e) => {
    ticketPrice = parseInt(e.target.value);
    // console.log(e.target.selectedIndex)   //Remember this
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
})


//Seat select Event
container.addEventListener('click',(e) => {
    // console.log(e.target.classList.contains('seat'))

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})