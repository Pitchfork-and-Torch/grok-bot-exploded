Add-Type -AssemblyName System.Drawing
$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::FromArgb(255, 5, 5, 5))
$hull = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 243, 238, 230))
$g.FillEllipse($hull, 220, 120, 420, 420)
$spec = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(110, 255, 255, 255))
$g.FillEllipse($spec, 280, 170, 150, 110)
$eye = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 20, 20, 20))
function Draw-Capsule($x, $y) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($x, $y, 36, 36, 90, 180)
  $path.AddArc(($x + 52), $y, 36, 36, 270, 180)
  $path.CloseFigure()
  $g.FillPath($eye, $path)
  $path.Dispose()
}
Draw-Capsule 330 300
Draw-Capsule 470 300
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 200, 212, 232), 2)
$g.DrawEllipse($pen, 760, 180, 90, 90)
$g.DrawEllipse($pen, 900, 250, 40, 40)
$g.DrawBezier($pen, 780, 270, 840, 340, 900, 360, 980, 300)
$font = New-Object System.Drawing.Font "Arial", 36, ([System.Drawing.FontStyle]::Regular)
$small = New-Object System.Drawing.Font "Arial", 16
$ink = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 252, 252, 252))
$muted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 158, 158, 158))
$g.DrawString("ORB//TEARDOWN", $font, $ink, 72, 64)
$g.DrawString("Exploded technical study. Not an official SpaceXAI product.", $small, $muted, 72, 540)
$png = Join-Path $PSScriptRoot "..\public\og.png"
$jpg = Join-Path $PSScriptRoot "..\public\og.jpg"
$bmp.Save($png, [System.Drawing.Imaging.ImageFormat]::Png)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$enc = New-Object System.Drawing.Imaging.EncoderParameters 1
$enc.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]90)
$bmp.Save($jpg, $codec, $enc)
$g.Dispose()
$bmp.Dispose()
Write-Output "og $w x $h"
