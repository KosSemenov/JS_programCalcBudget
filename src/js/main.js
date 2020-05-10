"use strict";


let btn = document.getElementById('start'),
    budget = document.getElementsByClassName('budget-value')[0],
    dayBudget = document.getElementsByClassName('daybudget-value')[0],
    level = document.getElementsByClassName('level-value')[0],
    expenses = document.getElementsByClassName('expenses-value')[0],
    optionalExpenses = document.getElementsByClassName('optionalexpenses-value')[0],
    income = document.getElementsByClassName('income-value')[0],
    monthSavings = document.getElementsByClassName('monthsavings-value')[0],
    yearSavings = document.getElementsByClassName('yearsavings-value')[0],

    input = document.getElementsByClassName('expenses-item'),
    btnApprove = document.getElementsByTagName('button')[0],
    btnOptionalApprove = document.getElementsByTagName('button')[1],
    btnCalc = document.getElementsByTagName('button')[2],
    optExpItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    money, 
    time;


    let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false,
    };


btnApprove.disabled = true;
btnOptionalApprove.disabled = true;
btnCalc.disabled = true;



btn.addEventListener('click', function() {
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = prompt("Ваш бюджет?", ""); 
    }
     appData.budget = money;
     appData.timeData = time;
     budget.textContent = money.toFixed();
     yearValue.value = new Date(Date.parse(time)).getFullYear();
     monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
     dayValue.value = new Date(Date.parse(time)).getDate();

    btnApprove.disabled = false;
    btnOptionalApprove.disabled = false;
    btnCalc.disabled = false;
});

btnApprove.addEventListener('click', function() {
    let sum = 0; 
    for (let i = 0; i < input.length; i++) {
        let a = input[i].value,
            b = input[++i].value;
    
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }
    expenses.textContent = sum;
});

btnOptionalApprove.addEventListener('click', function() {
    for (let i = 0; i <= optExpItem.length; i++) {
        let questionOptExpenses = optExpItem[i].value;
        appData.optionalExpenses[i] = questionOptExpenses;
        optionalExpenses.textContent += appData.optionalExpenses[i] + ' ';
    }
});

btnCalc.addEventListener('click', function() {

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expenses.textContent) / 30).toFixed();
        dayBudget.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
        level.textContent = "Это минимальный уровень достатка!";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        level.textContent = "Это средний уровень достатка!";
    } else if (appData.moneyPerDay > 2000) {
        level.textContent = "Это высокий уровень достатка!";
    } else {
        level.textContent = "Ошибочка...!";
    }
    } else {
        level.textContent = "Ошибочка...! Начните с 'Начать расчет' ";
    }
});

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    income.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});




