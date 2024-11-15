const CATEGORIES = [
    { name: 'technology', color: '#3b82f6'},
    { name: 'science', color: '#16a34a'},
    { name: 'finance', color: '#ef4444'},
    { name: 'society', color: '#eab308'},
    { name: 'entertainment', color: '#db2777'},
    { name: 'health', color: '#14b8a6'},
    { name: 'history', color: '#f97316'},
    { name: 'news', color: '#8b5cf6'},
];

const FACT = [
    {
        id: 1,
        text: 'Em Tom nu nha',
        source: 'https://www.facebook.com/pta.0412',
        category: 'society',
        done: 10,
        loading: 5,
        wait: 1,
        createin: 2022
    },
    {
        id: 2,
        text: 'Anh Gau thong minh nha',
        source: 'https://www.facebook.com/lhs.0309/',
        category: 'society',
        done: 100,
        loading: 50,
        wait: 0,
        createin: 2022
    }
]

// const calcFact = (param) => param <= new Date().getFullYear() 
//     ? new Date().getFullYear() - param 
//     : `Impossible year. Year needs to be less or equal ${new Date().getFullYear()}`;
// console.log(calcFact(20));

// const fact = ['Le Ha Son la so 1 me luon roi', 2024, 'an cut ham em Tom', true];
// console.log(fact);
// console.log(fact[0]);
// console.log(fact.length);
// const [text, abc, cds] = fact;
// console.log(abc);

// const objectFact = {
//     text: "Con cho Tom nay nua",
//     category: "dit me em Tom nua noi nhieu",
//     creatIn: 2022,
//     isCorrect: true,
//     creatSum: function() {
//         return `The fact is ${this.text} is from ${this.category.toUpperCase()}`;
//     }
// };
// console.log(objectFact.text);
// const {category, isCorrect} = objectFact;
// console.log(category);
// console.log(objectFact.creatSum());

// [2, 4, 6, 8].forEach(function (params) {
//     console.log(params);
// })
// const papa = [2, 4, 6, 8].map(function (params) {
//     return params*10;
// })
// const pame = [2, 4, 6, 8].map((params) => params*10);
// console.log(papa);
// console.log(pame);