import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Scanner() {
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const [selectedImage, setSelectedImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setError('')

    const imageUrl = URL.createObjectURL(file)

    setSelectedImage({
      file: file,
      preview: imageUrl,
    })
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview)
    }

    setSelectedImage(null)
    setError('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleScan = async () => {console.log("SCAN BUTTON CLICKED")
  if (!selectedImage) return

  setIsScanning(true)
  setError('')

  try {
    const formData = new FormData()

    formData.append('file', selectedImage.file)

    const response = await fetch(
      'http://127.0.0.1:8000/api/analyze',
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Failed to analyze image')
    }

    const data = await response.json()

    console.log('Backend response:', data)

    navigate('/results', {
      state: {
        ocrData: data,
        image: selectedImage.preview,
      },
    })

  } catch (error) {
    console.error(error)

    setError(
      'Could not connect to the server. Make sure the backend is running.'
    )
  } finally {
    setIsScanning(false)
  }
}

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Navigation */}
      <nav className="flex h-[72px] items-center border-b border-white/10 px-6 sm:px-10">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
            ⚖
          </div>

          <span className="text-[17px] font-semibold">
            CompliCheck
          </span>
        </Link>

      </nav>


      {/* Main */}
      <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-6 py-16">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-[10%] top-[15%] h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[130px]" />

          <div className="absolute bottom-[10%] right-[10%] h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[130px]" />

        </div>


        {/* Scanner */}
        <div className="relative w-full max-w-[850px]">

          {/* Heading */}
          <div className="mb-10 text-center">

            <p className="mb-4 font-mono text-xs tracking-[0.22em] text-white/35">
              PRODUCT SCANNER
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Check your product label.
            </h1>

            <p className="mx-auto mt-5 max-w-[600px] text-base leading-7 text-white/45 sm:text-lg">
              Upload a clear image of your packaged commodity
              label. We'll extract the declarations and check
              them against the applicable rules.
            </p>

          </div>


          {/* Upload area */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-3">

            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[22px] border border-dashed border-white/15 px-6 py-12 text-center">

              {!selectedImage ? (

                <>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl">
                    ↑
                  </div>

                  <h2 className="text-xl font-medium">
                    Upload product label
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                    Choose a JPG, JPEG, PNG or WEBP image
                    containing the product label.
                  </p>

                  <button
                    type="button"
                    onClick={handleChooseFile}
                    className="mt-7 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-white/85"
                  >
                    Choose image
                  </button>
                </>

              ) : (

                <>
                  {/* Image */}
                  <div className="relative w-full max-w-[500px] overflow-hidden rounded-2xl border border-white/10 bg-black">

                    <img
                      src={selectedImage.preview}
                      alt="Selected product label"
                      className="max-h-[350px] w-full object-contain"
                    />

                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                        <div className="text-center">

                          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

                          <p className="text-sm font-medium">
                            Sending to server...
                          </p>

                        </div>

                      </div>
                    )}

                  </div>


                  {/* File information */}
                  <div className="mt-5">

                    <p className="text-sm font-medium">
                      {selectedImage.file.name}
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      {(selectedImage.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                  </div>


                  {/* Buttons */}
                  {!isScanning && (
                    <div className="mt-6 flex flex-wrap justify-center gap-3">

                      <button
                        type="button"
                        onClick={handleChooseFile}
                        className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/10"
                      >
                        Change image
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="rounded-full border border-red-400/20 px-6 py-3 text-sm font-medium text-red-300 transition hover:bg-red-400/10"
                      >
                        Remove
                      </button>

                    </div>
                  )}

                </>
              )}

            </div>

          </div>


          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />


          {/* Error */}
          {error && (
            <p className="mt-5 text-center text-sm text-red-300">
              {error}
            </p>
          )}


          {/* Scan */}
          <div className="mt-7 flex justify-center">

            <button
              type="button"
              disabled={!selectedImage || isScanning}
              onClick={handleScan}
              className={`rounded-full px-8 py-3.5 text-sm font-medium transition ${
                selectedImage && !isScanning
                  ? 'bg-white text-black hover:bg-white/85'
                  : 'cursor-not-allowed bg-white/10 text-white/25'
              }`}
            >
              {isScanning ? 'Analyzing label...' : 'Scan product'}
            </button>

          </div>


          <p className="mt-5 text-center text-xs text-white/25">
            Supported formats: JPG, JPEG, PNG, WEBP
          </p>

        </div>

      </main>

    </div>
  )
}

export default Scanner