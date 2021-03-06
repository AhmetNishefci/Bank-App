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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? movements.slice().sort((a, b) => {
        return a - b;
      })
    : movements;

  movs.forEach((e, i) => {
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

const calcAndDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((a, e) => {
    return a + e;
  }, 0);
  labelBalance.textContent = `${acc.balance} \u20AC`;
};

const calcAndDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((e) => {
      return e > 0;
    })
    .reduce((a, e) => {
      return a + e;
    }, 0);
  labelSumIn.textContent = `${incomes}\u20AC`;

  const outcome = acc.movements
    .filter((e) => {
      return e < 0;
    })
    .reduce((a, e) => {
      return a + e;
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}\u20AC`;

  const interest = acc.movements
    .filter((e) => {
      return e > 0;
    })
    .map((e) => {
      return (e * acc.interestRate) / 100;
    })
    .filter((e) => {
      return e >= 1;
    })
    .reduce((a, e) => {
      return a + e;
    }, 0);
  labelSumInterest.textContent = `${interest}\u20AC`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);

  calcAndDisplayBalance(acc);

  calcAndDisplaySummary(acc);
};

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

let currentAccount;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find((e) => {
    return e.username === inputLoginUsername.value;
  });
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    inputLoginUsername.value = inputLoginPin.value = "";

    containerApp.style.opacity = 100;

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferTo = accounts.find((e) => {
    return e.username === inputTransferTo.value;
  });
  inputTransferTo.value = inputTransferAmount.value = "";

  if (
    amount > 0 &&
    transferTo &&
    currentAccount.balance >= amount &&
    transferTo?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((e) => {
      return e >= amount * 0.1;
    })
  ) {
    currentAccount.movements.push(amount);
  }
  inputLoanAmount.value = "";
  updateUI(currentAccount);
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex((e) => {
      return e.username === currentAccount.username;
    });
    console.log(index);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// const convertTitleCase = function (title) {
//   const exceptions = ["a"];

//   const titleCase = title
//     .toLowerCase()
//     .split(" ")
//     .map((e) => {
//       return exceptions.includes(e) ? e : e[0].toUpperCase() + e.slice(1);
//     })
//     .join(" ");
//   return titleCase;
// };

// console.log(convertTitleCase("this is a nice title"));

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach((e) => {
  return (e.recFood = Math.trunc(e.weight ** 0.75 * 28));
});

console.log(dogs);

const SarahDog = dogs.find((e) => {
  return e.owners.includes("Sarah");
});

console.log(
  `Sarah dog is eating too ${
    SarahDog.curFood > SarahDog.recFood ? `much` : `too little`
  }`
);
