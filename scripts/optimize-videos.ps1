$ErrorActionPreference = 'Stop'

$ffmpeg = (Resolve-Path "tools\ffmpeg_expand\ffmpeg-8.1-essentials_build\bin\ffmpeg.exe").Path

$targets = @(
  @{ In = "video-source/c2.mp4"; Out = "public/c2-web.mp4" },
  @{ In = "video-source/c3.mp4"; Out = "public/c3-web.mp4" },
  @{ In = "video-source/c4.mp4"; Out = "public/c4-web.mp4" }
)

foreach ($target in $targets) {
  Write-Host "Compressing $($target.In) -> $($target.Out)"

  & $ffmpeg -y `
    -i $target.In `
    -vf "fps=24,scale='min(960,iw)':-2:flags=lanczos" `
    -c:v libx264 `
    -preset slow `
    -crf 32 `
    -c:a aac `
    -b:a 96k `
    -movflags +faststart `
    $target.Out
}

Write-Host "Done."
