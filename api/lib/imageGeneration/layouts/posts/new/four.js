const four = `<html>
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
    }

    .main {
        display: flex;
        position: relative;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
        padding: 12.5vw;
        font-family: 'Open Sans';
    }

    .main img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .square {
        position: absolute;
        top: 0; left:0; right: 0; bottom: 0;
        height: 70%;
        width: 70%;
        background-color: {{ primaryColor }};
        opacity: 0.7;
        margin: auto;
    }

    .text {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 5vw;
        z-index: 3;
        font-family: 'Open Sans';
        font-size: 3vw;
        color: #fff;
    }

    .website {
        position: absolute;
        width: 100vw;
        height: fit-content;
        bottom: 5vh;
        left: 0;
        right: 0;
        text-align: center;
        color: #fff;
    }

</style>
<body>
    <div class="main">
        <img src="{{ backgroundUrl }}" alt="">
        <div class="square"></div>
        <div class="text">
            <h1>{{ title }}</h1>
        </div>
        <div class="website">
            <h4>{{ website }}</h4>
        </div>
    </div>
</body>
</html>`

module.exports = {
    four
}