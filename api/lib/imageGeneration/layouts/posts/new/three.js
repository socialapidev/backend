const three = `<html>
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
        font-family: 'Open Sans';
    }

    h1 {
        font-weight: 700;
        font-size: 5vh;
    }

    h4 {
        font-weight: 400;
        font-size: 2.7vh;
    }

    .left {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        height: 70vh;
        width: 50vw;
        padding: 4vw 4vw 2.5vw 4vw;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 4vh;
        overflow: hidden;
    }

    .right {
        position: absolute;
        top: 0;
        right: 0;
        height: 70vh;
        width: 50vw;
        object-fit: cover;
    }

    .right img {
        width: 100%;
        height: 100%;
        object-fit:cover;
    }

    .bottom {
        position: absolute;
        bottom: 0;
        width: 100vw;
        height: 30vh;
        background-color: {{ primaryColor }};
    }

    .website {
        position: absolute;
        bottom: 5vh;
        left: 0;
        right: 0;
        width: 100vw;
        height: fit-content;
        text-align: center;
        color: #fff;
    }

    .website h4 {
        font-size: 3.5vh;
    }


</style>
<body>
    <div class="main">
        <div class="left">
            <h1>{{ title }}</h1>
            <h4>{{ caption }}</h4>
        </div>
        <div class="right">
            <img src="{{ backgroundUrl }}" alt="">
        </div>
        <div class="bottom"></div>
        <div class="website">
            <h4>{{ url }}</h4>
        </div>
    </div>
</body>
</html>`

module.exports = {
    three
}