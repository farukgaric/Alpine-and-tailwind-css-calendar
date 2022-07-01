const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.addEventListener('alpine:init', () => {
    Alpine.data('calendar', () => ({
        today : new Date(),
        date : new Date(),
        monthDates : null,

        init() {
            this.$watch('monthDates', () =>{
                this.indicateToday();
            });
            this.monthDays();
        },

        monthHeader() {
            const year = this.date.getFullYear();
            const month = months[this.date.getMonth()];  //getMonths() and Date considers january as 0

            return `${year} - ${month}`;
        },

        monthDays() {
            const year = this.date.getFullYear();
            const month = this.date.getMonth();

            // determine starting day of month
            const startDay = new Date(year, month, 1).getDay();

             // create array of leading null dates as needed
            const leadingDates = [...Array(startDay).fill(null)];  //To addadd null values

            const numMonthDays = this.daysInMonth(month + 1, year);
            const dates = [...Array(numMonthDays).keys()].map((day) => day + 1);

            this.monthDates = leadingDates.concat(dates);
        },

        indicateToday() {
            document.querySelector('.today')?.classList.remove('today');
      
            if (this.isToday()) {
              document
                .querySelector(`[data-day="${this.today.getDate()}"]`)     //https://alpinejs.dev/magics/id#basic-usage
                .classList.add('today');
            }
        },


        daysInMonth(month, year) {
            return new Date(year,month,0).getDate(); //Similarly, if any parameter underflows, it "borrows" from the higher positions. For example, new Date(2020, 5, 0) will return May 31st, 2020.
        },

        changeMonth(direction) {
            const newMonth = new Date(
              this.date.setMonth(this.date.getMonth() + direction, 1)
            );
      
            this.date =
              newMonth.getFullYear() === this.today.getFullYear() &&
              newMonth.getMonth() === this.today.getMonth()
                ? new Date(this.today)
                : newMonth;
      
            this.monthDays();
          },

          isToday() {
            // console.log(this.date,this.today)
            return this.date.valueOf() === this.today.valueOf();
          },
     })
    )
})