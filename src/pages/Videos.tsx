import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Play, Plus, Trash2, X, ExternalLink, Loader2 } from 'lucide-react'

interface Video {
  id: string
  title: string
  url: string
  category: string
  thumbnail?: string
}

function Videos() {
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('chinese-videos')
    return saved ? JSON.parse(saved) : []
  })
  const [showAdd, setShowAdd] = useState(false)
  const [newVideo, setNewVideo] = useState({ title: '', url: '', category: 'Basics' })
  const [fetchingThumb, setFetchingThumb] = useState(false)
  
  const categories = ['Basics', 'Pinyin', 'Vocabulary', 'Dialogue', 'Culture']

  // Auto-fetch thumbnail from TikTok oEmbed API
  const fetchThumbnail = async (url: string): Promise<string | null> => {
    try {
      const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
      const res = await fetch(oembedUrl)
      if (!res.ok) return null
      const data = await res.json()
      // TikTok oEmbed returns thumbnail_url
      return data.thumbnail_url || data.cover_image_url || null
    } catch {
      return null
    }
  }

  const handleAddVideo = async () => {
    if (!newVideo.title || !newVideo.url) {
      alert('Please fill in title and URL')
      return
    }

    setFetchingThumb(true)

    // Try to auto-fetch thumbnail from TikTok
    const fetchedThumb = await fetchThumbnail(newVideo.url)
    const thumbnail = fetchedThumb ?? undefined

    const video: Video = {
      id: Date.now().toString(),
      title: newVideo.title,
      url: newVideo.url,
      category: newVideo.category,
      thumbnail: thumbnail,
    }

    const updated = [...videos, video]
    setVideos(updated)
    localStorage.setItem('chinese-videos', JSON.stringify(updated))
    setNewVideo({ title: '', url: '', category: 'Basics' })
    setFetchingThumb(false)
    setShowAdd(false)
  }

  const handleDeleteVideo = (id: string) => {
    if (!confirm('Delete this video?')) return
    const updated = videos.filter(v => v.id !== id)
    setVideos(updated)
    localStorage.setItem('chinese-videos', JSON.stringify(updated))
  }

  const getVideosByCategory = (category: string) => {
    return videos.filter(v => v.category === category)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">← Back</Button>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-red-600">Video Lessons</h1>
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">FREE</span>
            </div>
            <Button onClick={() => setShowAdd(true)} className="bg-red-500 hover:bg-red-600 text-white text-sm">
              <Plus className="w-4 h-4 mr-1" />Add
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-500 text-sm mb-6">Click any video to watch on TikTok</p>

        {/* Add Video Modal */}
        {showAdd && (
          <div 
            className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-[9999]"
            onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}
          >
            <div className="bg-white rounded-lg w-full max-w-md mx-4 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Add Video</h2>
                <button onClick={() => setShowAdd(false)}><X className="w-5 h-5" /></button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g. Learn Chinese Greetings"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">TikTok URL *</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://www.tiktok.com/@user/video/..."
                    value={newVideo.url}
                    onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                  >
                    {categories.map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                </div>
                <p className="text-xs text-blue-500 flex items-center gap-1">
                  ✨ Cover image will be fetched automatically from TikTok
                </p>
                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
                  <Button 
                    onClick={handleAddVideo} 
                    disabled={fetchingThumb}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {fetchingThumb ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Fetching...
                      </>
                    ) : (
                      'Add Video'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Categories */}
        {categories.map(category => {
          const categoryVideos = getVideosByCategory(category)
          if (categoryVideos.length === 0) return null

          return (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">{category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categoryVideos.map(video => (
                  <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="block group">
                    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      {/* Cover Area */}
                      <div className="relative overflow-hidden rounded-t-lg" style={{ aspectRatio: '9/16', maxHeight: '280px' }}>
                        {video.thumbnail ? (
                          <>
                            <img src={video.thumbnail} alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                // Fallback: hide broken image
                                ;(e.target as HTMLImageElement).style.display = 'none'
                              }}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-pink-100 to-red-100 flex flex-col items-center justify-center">
                            <svg className="w-10 h-10 text-red-400 mb-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29.04.58.11.86.21V9.5a6.36 6.36 0 00-.9-.07A6.34 6.34 0 002.8 15.78 6.34 6.34 0 009.14 22a6.34 6.34 0 006.34-6.34V8.85a8.27 8.27 0 004.76 1.52v-3.4a4.84 4.84 0 01-.65-.28z"/>
                            </svg>
                            <span className="text-xs text-gray-400">No preview</span>
                          </div>
                        )}
                        
                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 text-red-500 ml-1" fill="currentColor" />
                          </div>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteVideo(video.id); }}
                          className="absolute top-1.5 right-1.5 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Watch hint */}
                        <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="w-3 h-3" /> Watch on TikTok
                        </div>
                      </div>
                      
                      <CardContent className="p-2.5">
                        <h3 className="font-medium text-sm text-gray-800 line-clamp-2 leading-tight">{video.title}</h3>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )
        })}

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="text-center py-16">
            <Play className="w-14 h-14 text-gray-200 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">No videos yet</h3>
            <p className="text-gray-400 text-sm mb-4">Add your first TikTok learning video!</p>
            <Button onClick={() => setShowAdd(true)} className="bg-red-500 hover:bg-red-600 text-white">
              <Plus className="w-4 h-4 mr-1" /> Add Your First Video
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Videos
