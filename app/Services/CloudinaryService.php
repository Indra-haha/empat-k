<?php

namespace App\Services;

use Cloudinary\Cloudinary;

class CloudinaryService
{
    protected $cloudName;
    protected $apiKey;
    protected $apiSecret;
    protected $baseUrl;
    protected $cloudinary;

    public function __construct()
    {
        $this->cloudName = config('cloudinary.cloud_name');
        $this->apiKey = config('cloudinary.api_key');
        $this->apiSecret = config('cloudinary.api_secret');
        $this->baseUrl = "https://res.cloudinary.com/{$this->cloudName}/image/upload";

        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => $this->cloudName,
                'api_key' => $this->apiKey,
                'api_secret' => $this->apiSecret,
            ],
        ]);
    }

    /**
     * Generate Signed URL untuk file PRIVATE
     * Hanya untuk public_id (bukan URL lengkap)
     */

    public function getSignedUrl($publicId, $expiresInSeconds = 300)
    {
        if (!$publicId)
            return null;

        // Jangan tambah/kurangi prefix, pakai apa adanya
        $publicId = preg_replace('/\.(jpg|jpeg|png|gif|webp)$/i', '', $publicId);

        $expiresAt = time() + $expiresInSeconds;
        $stringToSign = "expires_at={$expiresAt}&public_id={$publicId}{$this->apiSecret}";
        $signature = substr(hash('sha256', $stringToSign), 0, 8);

        return "https://res.cloudinary.com/{$this->cloudName}/image/private/s--{$signature}--/{$publicId}?expires_at={$expiresAt}";
    }

    public static function getUrl(?string $path): string
    {
        if (!$path) {
            return '';
        }

        // Jika sudah URL lengkap, return langsung
        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        $cloudName = config('cloudinary.cloud_name', 'empat-k');

        // Ambil base name: hapus random string dan ekstensi
        // Contoh: "ivan--cindy-7608.png_ejhdxf.webp" -> "ivan--cindy-7608"
        $baseName = basename($path);
        $baseName = preg_replace('/\.(png|jpg|jpeg|gif)_[a-z0-9]+\.webp$/i', '', $baseName);
        $baseName = preg_replace('/\.(png|jpg|jpeg|gif|webp)$/i', '', $baseName);

        // Return URL dengan format dasar (Cloudinary akan cari sendiri file-nya)
        return "https://res.cloudinary.com/{$cloudName}/image/upload/{$baseName}";
    }

    public function upload($filePath, $options = [])
    {
        return $this->cloudinary->uploadApi()->upload($filePath, $options);
    }

    public function getAuthenticatedImageUrl(string $publicId): string
    {
        return $this->cloudinary
            ->image($publicId)
            ->delivery('authenticated')
            ->toUrl();
    }
}
