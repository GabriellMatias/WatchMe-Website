import { useCallback, useEffect, useState } from 'react'

import './styles/global.scss'

import './styles/sidebar.scss'
import './styles/content.scss'
import { SideBar } from './components/SideBar'
import { Content } from './components/Content'
import { api } from './services/api'

interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1)

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps,
  )

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data)
      })
  }, [selectedGenreId])

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id)
  },[])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* selected gener e o usestade comum entre esses dois child
      entao passa apenas ele como uma funcao normal, presta atencao nas interfaces
      nao da para exportar elas, tem que recriar em cada componente de acordo com 
      a necessidade */}
      <SideBar
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />
      <Content
        selectedGenre={selectedGenre}
        selectedGenreId={selectedGenreId}
      />
    </div>
  )
}
