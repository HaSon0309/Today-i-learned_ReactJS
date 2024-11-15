import { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css';

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

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [curCate, setCurCate] = useState("all");

  useEffect(function() {
    setIsLoading(true);

    let query = supabase.from('facts').select('*');
    if(curCate !== "all"){
      query = query.eq("category", curCate);
    }

    async function getFacts() {
      const { data: facts, error } = await query;
      setFacts(facts);
      setIsLoading(false);
    }
    getFacts()
  }, [curCate])

  return (
    <>
    <Header showForm={showForm} setShowForm={setShowForm} />

    {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}
    
    <main className="main">
    <CategoryFilter setCurCate={setCurCate} />
      {isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} />}
      
    </main>
    </>
  );
}

function Loader() {
  return <p className="loading">Loading...</p>
}

function Header({showForm, setShowForm}) {
  return (<header className="header">
  <div className="logo">
      <img src="logo.png" alt="logo" width="65" height="65"/>
      <h1>Today i learned</h1>
  </div>
  <button className="btn btn-large btn-open" onClick={() => setShowForm((check) => !check)}>{showForm ? "Close" : "Share a fact"}</button>
</header>)
}

function isValidURL(string) {
  let url;
  try{
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({setFacts, setShowForm}) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUpLoad, setIsUpLoad] = useState(false);
  const textLength = text.length;

  async function handleSubmit(params) {
    // 1. Prevent browser reload
    params.preventDefault();
    console.log(text, source, category);
    // 2. Check if data is valid, create a new FACT
    if(text && isValidURL(source) && category && textLength <= 200) {
      // 3. Create a new FACT
      // const newFact = {
      //   id: Math.random(),
      //   text,
      //   source,
      //   category,
      //   done: 0,
      //   loading: 0,
      //   wait: 0,
      //   createin: new Date().getFullYear()
      // }
      setIsUpLoad(true);
      const {data: newFact, error} = await supabase.from("facts").insert([{text, source, category}]).select();
      setIsUpLoad(false)
      // 4. Add to the section tag
      if(!error) setFacts((params) => [newFact[0], ...params]);
      // 5. reset input field
      setText("");
      setSource("");
      setCategory("");
      // 6. close the form
      setShowForm(false);
    }
      
  }

  return <form action="" className="fact-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Write something: " value={text} onChange={(params) => setText(params.target.value)} disabled={isUpLoad} />
      <span>{200 - textLength}</span>
      <input type="text" placeholder="Source: " value={source} onChange={(params) => setSource(params.target.value)} disabled={isUpLoad} />
      <select name="" id="" value={category} onChange={(params) => setCategory(params.target.value)} disabled={isUpLoad}>
        <option value="">CHOOSE CATEGORY</option>
        {CATEGORIES.map((params) => 
          <option key={params.name} value={params.name}>{params.name.toUpperCase()}</option>
        )}
      </select>
      <button className="btn btn-large" disabled={isUpLoad}>POST</button>
  </form>
}

function CategoryFilter({setCurCate}) {
  return <aside>
    <ul>
      <li className="category">
        <button className="btn btn-all" onClick={() => setCurCate("all")}>ALL</button>
      </li>

      {CATEGORIES.map((params) => 
      <li key={params.name} className="category">
        <button className="btn btn-category" style={{backgroundColor: params.color}} onClick={() => setCurCate(params.name)}>{params.name}</button>
      </li>)}
    </ul>
  </aside>
}

function FactList({facts, setFacts}) {
  
  if(facts.length === 0){
    return <p className="loading">No fact about this category</p>
  }
  return <section>
    <ul className="facts-list">
      {facts.map((params) => <Fact key={params.id} params={params} setFacts={setFacts} />)}
    </ul>
  </section>
}

function Fact({params, setFacts}){

  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = params.done + params.loading < params.wait;

  async function handleVote(columnName){
    setIsUpdating(true);
    const {data: updatedFact, error} = await supabase.from("facts").update({[columnName]: params[columnName] + 1}).eq("id", params.id).select();
    setIsUpdating(false);
    if(!error) setFacts((param) => param.map((f) => f.id === params.id ? updatedFact[0] : f))
  }

  return (<li className="fact">
  <p>{isDisputed ? <span className='disputed'>[⛔DISPUTED]</span> : null}{params.text}
  <a className="source" href={params.source} target="_blank">Source</a></p>
  <span className="tag" style={{backgroundColor: CATEGORIES.find((cat) => cat.name === params.category).color}}>{params.category}</span>
  <div className="vote-button">
      <button onClick={() => handleVote("done")} disabled={isUpdating}>✅ <b>{params.done}</b></button>
      <button onClick={() => handleVote("loading")} disabled={isUpdating}>☯️ <b>{params.loading}</b></button>
      <button onClick={() => handleVote("wait")} disabled={isUpdating}>❎ <b>{params.wait}</b></button>
  </div>
</li>)
}

export default App;