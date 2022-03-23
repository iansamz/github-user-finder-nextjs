import { useEffect, useRef, useState } from 'react';
import { Loading } from './components/Loading';
import Navbar from './components/Navbar';
import SearchBar from './components/Search/SearchBar';
import SelectOptions from './components/Search/SelectOptions';
import GithubUsers from './components/GithubUsers';
import Pagination from './components/Pagination';


const sortOptions = [
  { name: 'Best Match', sort: '', order: '' },
  { name: 'Most Followers', sort: 'followers', order: 'desc' },
  { name: 'Fewest Followers', sort: 'followers', order: 'asc' },
  { name: 'Most Recently Joined', sort: 'joined', order: 'desc' },
  { name: 'Least Recently Joined', sort: 'joined', order: 'asc' },
  { name: 'Most Repositories', sort: 'repositories', order: 'desc' },
  { name: 'Least Repositories', sort: 'repositories', order: 'asc' },
]

const reposOptions = [
  { name: 'Repositories', repositories: '' },
  { name: '10 > Repos', repositories: 10 },
  { name: '50 > Repos', repositories: 50 },
  { name: '100 > Repos', repositories: 100  },
]

const followersOptions = [
  { name: 'Followers', followers: '' },
  { name: '10 > Repos', followers: 10 },
  { name: '50 > Repos', followers: 50 },
  { name: '100 > Repos', followers: 100  },
]



function App() {

  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)
  

  const [searchText, setSearchText] = useState('iansamz')
  const userRef = useRef<(HTMLInputElement | null)>(null)

  const [sort, setSort] = useState(sortOptions[0])
  const [repos, setRepos] = useState(reposOptions[0])
  const [followers, setFollowers] = useState(followersOptions[0])

  const onSearch = () => {
    if(userRef.current) {
      setSearchText(userRef.current.value);
    }
  }

  const onEnter = (e: KeyboardEvent) => {
    if(e.key ==='Enter'){
      onSearch()
    }
  }

  useEffect(() => {
    setLoading(true)

    const url = `https://api.github.com/search/users?q=${searchText === '' ? 'iansamz' : searchText}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [searchText]);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-all">
      {/* Navbar */}
      <Navbar />

      {/* Search Bar */}
      <SearchBar 
        userRef={userRef}
        onSearch={onSearch}
        onEnter={onEnter}
      />

      {/* TODO Search Options */}
      {/* <div 
        className="align-items justify-between mx-auto mt-5 flex max-w-sm pb-2 md:max-w-4xl transition  duration-300 ease-in">
        <SelectOptions
          options={sortOptions}
          setSelected={setSort}
          selected={sort}
        />
        <SelectOptions
          options={reposOptions}
          setSelected={setRepos}
          selected={repos}
        />
        <SelectOptions
          options={followersOptions}
          setSelected={setFollowers}
          selected={followers}
        />
      </div> */}

      {loading 
        ? <Loading /> 
        :<>

          {/* Github Users */}
          <GithubUsers data={data} />

          {/* Pagination */}
          <Pagination />
        </>
      }
    </div>
  );
}

export default App;
