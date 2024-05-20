const two = `<html>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
<style>
    *  {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
       }

    body {
        width: 2000px;
        height: 2000px;
        overflow: hidden;
    }

    .main {
        display: flex;
        position: relative;
        width: 100vw;
        height: 100vh;
        min-width: none;
    }

    .image {
        position: absolute;
        top: 0;
        left: 0;
        height: 65vw;
        width: 65vw;
        object-fit: cover;
        z-index: 2;
    }

    .square {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 65vw;
        width: 65vw;
        background-color: {{ primaryColor }};
        z-index: 3;
    }

    .logo {
        position: absolute;
        top: 9vw;
        right: 9vw;
        height: 10vw;
        width: auto;
    }

    .text {
        width: 65vw;
        height: 65vh;
        margin-left: 40vw;
        margin-top: 37.5vh;
        z-index: 5;
        font-family: 'Open Sans';
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 2vh;
        padding: 0 2vw 2vw 0;
    }

    .text h1 {
        text-transform: uppercase;
        font-size: 5.5vw;
    }

    .text h4 {
        font-size: 3vw;
    }

</style>
<body>
    <div class="main">
        <img class="image" src="{{ backgroundUrl }}" alt="">
        <div class="square"></div>
        <img class="logo" src="{{ logoUrl }}" alt="">
        <div class="text">
            <h1>{{ title }}</h1>
            <h4>{{ caption }}</h4>
        </div>
    </div>
</body>
</html>`

module.exports = {
    two
}