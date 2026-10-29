# PowerShell script to simulate realistic traffic across the portfolio website
# Runs continuously or for a specified count to keep Prometheus & Grafana graphs moving

param(
    [int]$Iterations = 30,
    [int]$DelaySeconds = 2
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🚀 Simulating Portfolio Live Traffic for Prometheus & Grafana" -ForegroundColor Cyan
Write-Host "Iterations: $Iterations | Interval: ${DelaySeconds}s" -ForegroundColor Cyan
Write-Host "Endpoints: /api/health, /api/projects, /api/skills, /api/messages" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$endpoints = @(
    "http://localhost:5000/api/health",
    "http://localhost:5000/api/projects",
    "http://localhost:5000/api/skills",
    "http://localhost:5000/api/projects/sample-id-test"
)

for ($i = 1; $i -le $Iterations; $i++) {
    $timestamp = Get-Date -Format "HH:mm:ss"
    
    # Standard read endpoints
    foreach ($ep in $endpoints) {
        try {
            $resp = Invoke-WebRequest -Uri $ep -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
            Write-Host "[$timestamp] [$($resp.StatusCode)] GET $ep" -ForegroundColor Green
        } catch {
            Write-Host "[$timestamp] [404] Expected 404 on $ep" -ForegroundColor Yellow
        }
    }

    # Simulate contact submission every 3 iterations
    if ($i % 3 -eq 0) {
        $body = @{
            name = "Live Visitor $i"
            email = "visitor$i@devops-demo.edu"
            message = "Automated viva demo feedback message #$i"
        } | ConvertTo-Json

        try {
            $postResp = Invoke-WebRequest -Uri "http://localhost:5000/api/messages" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 2
            Write-Host "[$timestamp] [$($postResp.StatusCode)] POST /api/messages" -ForegroundColor Magenta
        } catch {
            Write-Host "[$timestamp] Error POSTing message: $_" -ForegroundColor Red
        }
    }

    Start-Sleep -Seconds $DelaySeconds
}

Write-Host "`n✅ Traffic simulation batch completed. Check Grafana & Prometheus dashboards!" -ForegroundColor Cyan

