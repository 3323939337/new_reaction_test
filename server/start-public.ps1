$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$port = if ($env:PORT) { $env:PORT } else { "401" }

Set-Location $root

function Find-Cloudflared {
  $command = Get-Command cloudflared -ErrorAction SilentlyContinue
  if ($command) {
    return $command.Source
  }

  $candidates = @(
    (Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\cloudflared.exe"),
    (Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\Cloudflare.cloudflared_Microsoft.Winget.Source_8wekyb3d8bbwe\cloudflared.exe"),
    "C:\Program Files\cloudflared\cloudflared.exe",
    "C:\Program Files (x86)\cloudflared\cloudflared.exe"
  )

  foreach ($candidate in $candidates) {
    if (Test-Path $candidate) {
      return $candidate
    }
  }

  return $null
}

$cloudflared = Find-Cloudflared

if (-not $cloudflared) {
  Write-Host ""
  Write-Host "cloudflared is not installed." -ForegroundColor Yellow
  Write-Host "Run this once, then retry npm run public:" -ForegroundColor Yellow
  Write-Host "  npm run install:cloudflared" -ForegroundColor Cyan
  Write-Host ""
  exit 1
}

Write-Host "Building app..." -ForegroundColor Cyan
npm run build

$existing = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($existing) {
  Write-Host "Local service already running on port $port." -ForegroundColor Yellow
} else {
  Write-Host "Starting local service on port $port..." -ForegroundColor Cyan
  $envBlock = "`$env:PORT='$port'; node server/static-server.js"
  Start-Process -FilePath powershell `
    -ArgumentList "-NoProfile", "-Command", $envBlock `
    -WorkingDirectory $root `
    -WindowStyle Hidden
  Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "Starting Cloudflare public tunnel..." -ForegroundColor Cyan
Write-Host "Send the https://*.trycloudflare.com URL printed below to other people." -ForegroundColor Green
Write-Host "Keep this terminal open while they use the site." -ForegroundColor Green
Write-Host ""

& $cloudflared tunnel --url "http://localhost:$port"
