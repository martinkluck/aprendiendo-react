import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/UserList'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async (page: number) => {
  return await fetch(`https://randomuser.me/api/?seed=midudev&results=10&page=${page}`).then(res => {
    if (!res.ok) throw new Error('Error al obtener usuarios') // Forma correcta de manejar errores en fetch
    return res.json()
  })
    .then(res => res.results)
}

function App() {
  const { isLoading, isError, data: users = [] } = useQuery(['users'], async () => await fetchUsers(1))
  
  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetchUsers(currentPage)
      .then(users => {
        setUsers(prevUsers => {
          const newUsers = prevUsers.concat(users)
          prevUsers.concat(newUsers)
          originalUsers.current = newUsers
          return newUsers
        })
      })
      .catch(error => {
        console.log(error)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [currentPage])

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
        {!isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && <button onClick={() => setCurrentPage(currentPage + 1)}>Cargar mas resultados</button>}
      </main>
    </>
  )
}

export default App
