import { api } from '../services/api'
import { memo, useEffect, useState } from 'react'
import { Button } from './Button'

interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}
interface SideBarprops {
  handleClickButton: (id: number) => void
  selectedGenreId: number
}

export function SideBarComponent({ handleClickButton, selectedGenreId }: SideBarprops) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data)
    })
  }, [])

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}
export const SideBar = memo(SideBarComponent, (prevProps, nextProps)=>{
  /* comparando as propriedades para saber se deve ser re-renderizado */
  return Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId)
})
