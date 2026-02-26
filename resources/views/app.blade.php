<!DOCTYPE html>
<html>
<head>
    @vite('resources/js/app.tsx')
    @inertiaHead
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <main id="app" data-page="{{ json_encode($page) }}"></main>
</body>
</html>