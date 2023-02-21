import { memo, useEffect, useState } from 'react'
import { MovieCard } from './MovieCard'
import { api } from '../services/api'

interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}
interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}
interface GenerProps {
  selectedGenreId: number
  selectedGenre: GenreResponseProps
}

export function ContentComponent({ selectedGenreId, selectedGenre }: GenerProps) {
  const [movies, setMovies] = useState<MovieProps[]>([])

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data)
      })
  }, [selectedGenreId])

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export const Content = memo(ContentComponent, (prevProps, nextProps)=>{
  /* comparando as propriedades para saber se deve ser re-renderizado */
  return Object.is(prevProps.selectedGenre, nextProps.selectedGenre)
})
