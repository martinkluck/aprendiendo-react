import { useMemo, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'

function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email)
    //setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const handleReset = async () => {
    await refetch()
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0 ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase())) : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.NAME]: (user: User) => user.name.first,
      [SortBy.LAST]: (user: User) => user.name.last,
      [SortBy.COUNTRY]: (user: User) => user.location.country
    }
    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <>
      <h1>Prueba Técnica</h1>
      <Results />
      <header>
        <button onClick={toggleColors}>
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Resetear estado</button>
        <input type="text" placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />
      </header>
      <main>
        {users.length > 0 &&
          <UserList changeSorting={handleChangeSort} handleDelete={handleDelete} showColors={showColors} users={sortedUsers} />}
        {isLoading && <p>Cargando...</p>}
        {isError && <p>Ha ocurrido un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage && <button onClick={() => fetchNextPage()}>Cargar mas resultados</button>}
      </main>
    </>
  )
}

export default App
