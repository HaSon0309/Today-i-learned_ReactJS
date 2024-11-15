const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factslist = document.querySelector(".facts-list");

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
    },
    {
        id: 3,
        text: 'BinZ in da house, nang co hay biet rang nay cha me nang biet chung ta. Carm men nhau lau roi lieu cos thu tha',
        source: 'https://vi.wikipedia.org/wiki/Binz_(rapper)',
        category: 'technology',
        done: 100,
        loading: 50,
        wait: 0,
        createin: 2022
    }
]

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

console.log(CATEGORIES.find((cat) => cat.name === "society").color)

factslist.innerHTML = "";

// Load data from Supabase
loadFacts();
async function loadFacts() {
    const res = await fetch("https://wjcxvsmeviuuwfpthwlg.supabase.co/rest/v1/facts", {
        headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3h2c21ldml1dXdmcHRod2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NDA0MzQsImV4cCI6MjA0NjMxNjQzNH0.DZPwMffgkU4ruiZvXaj1TCaZttt8LS-waTw9x0-Zh8k",
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3h2c21ldml1dXdmcHRod2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NDA0MzQsImV4cCI6MjA0NjMxNjQzNH0.DZPwMffgkU4ruiZvXaj1TCaZttt8LS-waTw9x0-Zh8k"
        }
    });
    const data = await res.json();
    // console.log(data);
    // const filterData = data.filter((fact) => fact.category === 'society')


    creatFactlist(data);
}

function creatFactlist(dataarray) {
    const htmlArr = dataarray.map((params) => 
        `<li class="fact">
            <p>${params.text}
                <a class="source" href="${params.source}" target="_blank">{Source}</a></p>
            <span class="tag" style="background-color: ${CATEGORIES.find((cat) => cat.name === params.category).color};">${params.category}</span>
        </li>`);
    const html = htmlArr.join("");
    factslist.insertAdjacentHTML("afterbegin", html);
}

btn.addEventListener("click", function() {
    if(form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.textContent = "Close";
    } else {
        form.classList.add("hidden");
        btn.textContent = "Share a fact";
    }
})

// const allCategories = CATEGORIES.map((params) => params.name);
// console.log(allCategories);
// const allFacts = FACT.map((params) => params.)