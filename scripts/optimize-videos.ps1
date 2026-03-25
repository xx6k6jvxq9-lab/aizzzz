$ErrorActionPreference = 'Stop'

$ffmpeg = (Resolve-Path "tools\ffmpeg_expand\ffmpeg-8.1-essentials_build\bin\ffmpeg.exe").Path

$targets = @(
  @{ In = "video-source/c2.mp4"; Out = "public/c2-web.mp4"; Poster = "public/c2-poster.webp"; PosterTime = "00:00:03.200" },
  @{ In = "video-source/c3.mp4"; Out = "public/c3-web.mp4"; Poster = "public/c3-poster.webp"; PosterTime = "00:00:02.800" },
  @{ In = "video-source/c4.mp4"; Out = "public/c4-web.mp4"; Poster = "public/c4-poster.webp"; PosterTime = "00:00:02.000" }
)

foreach ($target in $targets) {
  Write-Host "Compressing $($target.In) -> $($target.Out)"

  & $ffmpeg -y `
    -i $target.In `
    -vf "fps=24,scale='min(1280,iw)':-2:flags=lanczos" `
    -c:v libx264 `
    -preset slow `
    -crf 29 `
    -c:a aac `
    -b:a 112k `
    -movflags +faststart `
    $target.Out

  Write-Host "Extracting poster $($target.In) -> $($target.Poster)"

  & $ffmpeg -y `
    -ss $target.PosterTime `
    -i $target.In `
    -frames:v 1 `
    -vf "scale='min(1280,iw)':-2:flags=lanczos" `
    -c:v libwebp `
    -quality 82 `
    -compression_level 6 `
    $target.Poster
}

Write-Host "Extracting poster video-source/c1.mp4 -> public/c1-poster.webp"

& $ffmpeg -y `
  -ss "00:00:01.600" `
  -i "video-source/c1.mp4" `
  -frames:v 1 `
  -vf "scale='min(1280,iw)':-2:flags=lanczos" `
  -c:v libwebp `
  -quality 82 `
  -compression_level 6 `
  "public/c1-poster.webp"

Write-Host "Done."
