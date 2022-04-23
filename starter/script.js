"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

///////////////////////////////////////////
///////////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach((e, i) => {
    const type = e > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
      <div class="movements__value">${e}\u20AC</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

const calcAndDisplayBalance = function (movements) {
  const balance = movements.reduce((a, e) => {
    return a + e;
  }, 0);
  labelBalance.textContent = `${balance} \u20AC`;
};
calcAndDisplayBalance(account1.movements);

const calcAndDisplaySummary = function (movements) {
  const incomes = movements
    .filter((e) => {
      return e > 0;
    })
    .reduce((a, e) => {
      return a + e;
    }, 0);
  labelSumIn.textContent = `${incomes}\u20AC`;

  const outcome = movements
    .filter((e) => {
      return e < 0;
    })
    .reduce((a, e) => {
      return a + e;
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}\u20AC`;

  const interest = movements
    .filter((e) => {
      return e > 0;
    })
    .map((e) => {
      return (e * 1.2) / 100;
    })
    .filter((e) => {
      return e >= 1;
    })
    .reduce((a, e) => {
      return a + e;
    }, 0);
  labelSumInterest.textContent = `${interest}\u20AC`;
};

calcAndDisplaySummary(account1.movements);

const createUserNames = function (accs) {
  accs.forEach((e) => {
    e.username = e.owner
      .toLowerCase()
      .split(" ")
      .map((e) => {
        return e[0];
      })
      .join("");
  });
};
createUserNames(accounts);

// const maxValue = movements.reduce((a, e, i) => {
//   if (movements[i] > a) {
//     a = movements[i];
//   }
//   return a;
// }, movements[0]);

// console.log(maxValue);

const dogAges = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map((e) => {
//     if (e <= 2) {
//       return 2 * e;
//     } else {
//       return 16 + e * 4;
//     }
//   });
//   console.log(humanAges);
//   const adults = humanAges.filter((e) => {
//     return e >= 18;
//   });
//   console.log(adults);
//   const avgAgeOfAdults =
//     adults.reduce((a, e) => {
//       return a + e;
//     }, 0) / adults.length;
//   console.log(avgAgeOfAdults);
// };
// calcAverageHumanAge(dogAges);

const calcAverageHumanAge = (ages) => {
  return ages
    .map((e, i, arr) => {
      if (e <= 2) {
        return 2 * e;
      } else {
        return 16 + e * 4;
      }
    })
    .filter((e, i, arr) => {
      return e >= 18;
    })
    .reduce((a, e, i, arr) => {
      return a + e / arr.length;
    }, 0);
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);