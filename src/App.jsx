import { useEffect, useMemo, useState } from 'react'
import './App.css'

const CAT_API_URL = 'https://api.freeapi.app/api/v1/public/cats/cat/random'

function getValue(data, keys) {
  for (const key of keys) {
    if (data?.[key] !== undefined && data?.[key] !== null && data?.[key] !== '') {
      return data[key]
    }
  }
  return null
}

function getLifespan(data, breed) {
  const direct = getValue(data, ['life_span', 'lifespan', 'lifeSpan'])
  if (direct) return direct

  const singleBreed = getValue(breed, ['life_span', 'lifespan', 'lifeSpan'])
  if (singleBreed) return singleBreed

  const breedSpans = (data?.breeds || [])
    .map((item) => getValue(item, ['life_span', 'lifespan', 'lifeSpan']))
    .filter(Boolean)

  if (breedSpans.length > 0) {
    return [...new Set(breedSpans)].join(', ')
  }

  return 'Not listed for this cat'
}

function App() {
  const [cat, setCat] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cardData = useMemo(() => {
    if (!cat) {
      return {
        name: 'Mystery Cat',
        description: 'A tiny break of joy is loading...',
        origin: 'Unknown',
        lifespan: 'Not listed for this cat',
        size: null,
      }
    }

    const breed = cat?.breeds?.[0] || cat?.breed || {}

    return {
      name: getValue(breed, ['name']) || getValue(cat, ['name']) || 'Mystery Cat',
      description:
        getValue(breed, ['description', 'temperament', 'alt_description']) ||
        getValue(cat, ['description']) ||
        'No description available for this cat yet.',
      origin: getValue(breed, ['origin', 'country']) || getValue(cat, ['origin']) || 'Unknown',
      lifespan: getLifespan(cat, breed),
      size: cat?.width && cat?.height ? `${cat.width} x ${cat.height}` : null,
    }
  }, [cat])

  const fetchRandomCat = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(CAT_API_URL, {
        method: 'GET',
        headers: { accept: 'application/json' },
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.message || `Request failed with status ${response.status}`)
      }

      const data = payload?.data
      const imageUrl = getValue(data, ['url', 'image', 'imageUrl'])

      if (!imageUrl) {
        throw new Error('API responded but no cat image URL was found.')
      }

      setCat({ ...data, imageUrl })
    } catch (err) {
      setError(err?.message || 'Failed to fetch cat data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomCat()
  }, [])

  return (
    <main className="app">
      <section className="card-wrap">
        <article className="cat-card">
          <header className="card-head">
            <h1>Meow of the Moment</h1>
          </header>

          <div className="image-frame" role="status" aria-live="polite">
            {loading ? (
              <p className="placeholder">Fetching a fluffy friend...</p>
            ) : error ? (
              <p className="placeholder error">{error}</p>
            ) : (
              <img src={cat?.imageUrl} alt={cardData.name} />
            )}
          </div>

          <div className="card-tag">
            <strong>{cardData.name}</strong>
          </div>

          <section className="card-note">
            <p>
              <span>PROFILE:</span> {cardData.description}
            </p>
          </section>

          <ul className="card-meta">
            <div className='meta-info'>
            <li>
              <span>Origin</span>
              <strong>{cardData.origin}</strong>
            </li>
            <li>
              <span>Lifespan</span>
              <strong>{cardData.lifespan}</strong>
            </li>
            </div>
            {cardData.size ? (
              <li>
                <span>Image Size</span>
                <strong>{cardData.size}</strong>
              </li>
            ) : null}
          </ul>

          <button type="button" onClick={fetchRandomCat} disabled={loading}>
            {loading ? 'Loading...' : 'Draw New Cat Card'}
          </button>
        </article>
      </section>
    </main>
  )
}

export default App
